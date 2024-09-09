import { fetch } from 'undici';
import { decode } from 'iconv-lite';
import { CheerioAPI, load } from 'cheerio';
import chardet from 'chardet';
import type { OpenGraphScraperOptions } from './types';

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

function shouldEncode(value: string) {
  const regex = /[^\x00-\x7F]/;
  return regex.test(value);
}

export default async function requestAndResultsFormatter(options: OpenGraphScraperOptions) {
  let body;
  let response;

  let url = options.url ?? ''

  if (shouldEncode(url)) {
    url = encodeURIComponent(url)
  } 

  try {
    response = await fetch(
      url ?? '',
      {
        signal: AbortSignal.timeout((options.timeout ?? 10) * 1000),
        ...options.fetchOptions,
        headers: { Origin: options.url ?? '', Accept: 'text/html', ...options.fetchOptions?.headers },
      },
    );

    const bodyArrayBuffer = await response.arrayBuffer();
    const bodyText = Buffer.from(bodyArrayBuffer).toString('utf-8');
    const charset = getCharset(bodyText, bodyArrayBuffer, load(bodyText)) ?? 'utf-8';
    if (charset.toLowerCase() === 'utf-8') {
      body = bodyText;
    } else {
      body = decode(Buffer.from(bodyArrayBuffer), charset);
    }

    if (response?.headers?.get('content-type') && !response.headers.get('content-type')?.includes('text/')) {
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
  }

  return { body, response };
}
