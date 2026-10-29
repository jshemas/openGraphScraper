import { lookup as dnsLookup } from 'node:dns';
import {
  Agent, fetch, Headers, type RequestInit,
} from 'undici';
import { decode } from 'iconv-lite';
import { CheerioAPI, load } from 'cheerio';
import chardet from 'chardet';
import type { OpenGraphScraperOptions } from './types';
import { assertPublicUrl, isPublicAddress } from './isPublicAddress';
import { isBlacklistedUrl } from './utils';

const redirectStatuses = new Set([301, 302, 303, 307, 308]);

function createRequestDispatcher() {
  const dispatcher = new Agent({
    connect: {
      lookup(hostname, options, callback) {
        dnsLookup(hostname, { all: true, verbatim: true }, (error, addresses) => {
          if (error) {
            callback(error, '', 0);
            return;
          }
          if (addresses.some(({ address }) => !isPublicAddress(address))) {
            callback(Object.assign(new Error('Requests to hosts resolving to non-public IP addresses are not allowed'), {
              code: 'EACCES',
            }), '', 0);
            return;
          }

          let family: number | undefined;
          switch (options.family) {
            case 'IPv4':
              family = 4;
              break;
            case 'IPv6':
              family = 6;
              break;
            case undefined:
              family = undefined;
              break;
            default:
              family = options.family;
          }
          const matchingAddresses = addresses.filter(({ family: addressFamily }) => (
            family === undefined || family === 0 || addressFamily === family
          ));
          if (matchingAddresses.length === 0) {
            callback(Object.assign(new Error('No public IP addresses found for host'), { code: 'ENOTFOUND' }), '', 0);
            return;
          }
          if (options.all) {
            callback(null, matchingAddresses);
            return;
          }

          const address = matchingAddresses[0];
          if (!address) {
            callback(Object.assign(new Error('No public IP addresses found for host'), { code: 'ENOTFOUND' }), '', 0);
            return;
          }
          callback(null, address.address, address.family);
        });
      },
    },
  });
  return { dispatcher, close: () => dispatcher.close() };
}

async function fetchWithPublicDestinationGuard(url: string, options: RequestInit, blacklist: string[] = []) {
  const redirectMode = options.redirect ?? 'follow';
  async function fetchRedirect(currentUrl: string, redirects: number, requestOptions: RequestInit): Promise<Response> {
    if (isBlacklistedUrl(currentUrl, blacklist)) {
      throw new Error('Host name has been black listed');
    }
    await assertPublicUrl(currentUrl);
    const response = await fetch(currentUrl, { ...requestOptions, redirect: 'manual' });
    const location = response.headers.get('location');
    if (!location || !redirectStatuses.has(response.status)) return response;
    if (redirectMode === 'manual') return response;
    if (redirectMode === 'error') {
      await response.body?.cancel();
      throw new Error('Request was redirected');
    }
    if (redirects >= 20) {
      await response.body?.cancel();
      throw new Error('Maximum redirect count exceeded');
    }

    const nextUrl = new URL(location, currentUrl).toString();
    const nextOptions: RequestInit = { ...requestOptions };
    const headers = new Headers(requestOptions.headers);
    const currentOrigin = new URL(currentUrl).origin;
    const nextOrigin = new URL(nextUrl).origin;

    if (currentOrigin !== nextOrigin) {
      headers.delete('authorization');
      headers.delete('cookie');
      headers.delete('cookie2');
      headers.delete('host');
      headers.delete('proxy-authorization');
    }

    const method = (requestOptions.method ?? 'GET').toUpperCase();
    if (((response.status === 301 || response.status === 302) && method === 'POST')
      || (response.status === 303 && method !== 'GET' && method !== 'HEAD')) {
      nextOptions.method = 'GET';
      delete nextOptions.body;
      headers.delete('content-encoding');
      headers.delete('content-language');
      headers.delete('content-location');
      headers.delete('content-type');
    }

    nextOptions.headers = headers;
    await response.body?.cancel();
    return fetchRedirect(nextUrl, redirects + 1, nextOptions);
  }

  return fetchRedirect(url, 0, options);
}

/**
 * checks if an element exists
 */
const doesElementExist = (selector:string, attribute:string, $: CheerioAPI) => (
  $(selector).attr(attribute) && ($(selector).attr(attribute)?.length ?? 0) > 0
);

/**
 * gets the charset of the html
 */
function getCharset(body: string, buffer: ArrayBuffer, $: CheerioAPI) {
  if (doesElementExist('meta', 'charset', $)) {
    return $('meta').attr('charset');
  }
  if (doesElementExist('head > meta[name="charset"]', 'content', $)) {
    return $('head > meta[name="charset"]').attr('content');
  }
  if (doesElementExist('head > meta[http-equiv="content-type"]', 'content', $)) {
    const content = $('head > meta[http-equiv="content-type"]').attr('content') ?? '';
    const charsetRegEx = /charset=([^()<>@,;:"/[\]?.=\s]*)/i;

    if (charsetRegEx.test(content)) {
      const charsetRegExExec = charsetRegEx.exec(content);
      if (charsetRegExExec?.[1]) return charsetRegExExec[1];
    }
  }
  if (body) {
    return chardet.detect(Buffer.from(buffer));
  }

  return 'utf-8';
}

/**
 * performs the fetch request and formats the body for ogs
 *
 * @param {object} options - options for ogs
 * @return {object} formatted request body and response
 *
 */
export default async function requestAndResultsFormatter(options: OpenGraphScraperOptions) {
  let body;
  let response;
  const requestDispatcher = createRequestDispatcher();
  try {
    // eslint-disable-next-line no-control-regex
    const isLatin1 = /^[\u0000-\u00ff]{0,}$/;

    let url = options.url ?? '';
    if (!isLatin1.test(url)) url = encodeURI(url);

    response = await fetchWithPublicDestinationGuard(url, {
      signal: AbortSignal.timeout((options.timeout ?? 10) * 1000),
      ...options.fetchOptions,
      dispatcher: requestDispatcher.dispatcher,
      headers: { Origin: url, Accept: 'text/html', ...options.fetchOptions?.headers },
    }, options.blacklist);

    const bodyArrayBuffer = await response.arrayBuffer();
    const bodyText = Buffer.from(bodyArrayBuffer).toString('utf-8');
    const charset = getCharset(bodyText, bodyArrayBuffer, load(bodyText)) ?? 'utf-8';
    if (charset.toLowerCase() === 'utf-8') {
      body = bodyText;
    } else {
      body = decode(Buffer.from(bodyArrayBuffer), charset);
    }

    const contentType = response?.headers?.get('content-type')?.toLowerCase();
    if (contentType && !contentType.includes('text/')) {
      throw new Error('Page must return a header content-type with text/');
    }
    if (response?.status && (response.status.toString().startsWith('4') || response.status.toString().startsWith('5'))) {
      switch (response.status) {
        case 400:
          throw new Error('400 Bad Request');
        case 401:
          throw new Error('401 Unauthorized');
        case 403:
          throw new Error('403 Forbidden');
        case 404:
          throw new Error('404 Not Found');
        case 408:
          throw new Error('408 Request Timeout');
        case 410:
          throw new Error('410 Gone');
        case 429:
          throw new Error('429 Too Many Requests');
        case 500:
          throw new Error('500 Internal Server Error');
        case 502:
          throw new Error('502 Bad Gateway');
        case 503:
          throw new Error('503 Service Unavailable');
        case 504:
          throw new Error('504 Gateway Timeout');
        default:
          throw new Error('Server has returned a 400/500 error code');
      }
    }

    if (body === undefined || body === '') {
      throw new Error('Page not found');
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'fetch failed') throw error.cause;
    throw error;
  } finally {
    await requestDispatcher.close();
  }

  return { body, response };
}
