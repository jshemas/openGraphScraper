import { fetch } from 'undici';
import { decode } from 'iconv-lite';
import { CheerioAPI, load } from 'cheerio';
import chardet from 'chardet';
import type { OpenGraphScraperOptions } from './types';

/**
 * checks if an element exists
 */
const doesElementExist = (selector:string, attribute:string, $: CheerioAPI) => (
  $(selector).attr(attribute) && ($(selector).attr(attribute)?.length || 0) > 0
);

/**
 * gets the charset of the html
 */
function getCharset(body: string, buffer: Uint8Array, $: CheerioAPI) {
  if (doesElementExist('meta', 'charset', $)) {
    return $('meta').attr('charset');
  }
  if (doesElementExist('head > meta[name="charset"]', 'content', $)) {
    return $('head > meta[name="charset"]').attr('content');
  }
  if (doesElementExist('head > meta[http-equiv="content-type"]', 'content', $)) {
    const content = $('head > meta[http-equiv="content-type"]').attr('content');
    const charsetRegEx = /charset=([^()<>@,;:"/[\]?.=\s]*)/i;
    return charsetRegEx.test(content) ? charsetRegEx.exec(content)[1] : 'UTF-8';
  }
  if (body) {
    return chardet.detect(buffer);
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
  try {
    response = await fetch(
      options.url || '',
      {
        signal: AbortSignal.timeout((options.timeout || 10) * 1000),
        headers: { Origin: options.url, Accept: 'text/html' },
        ...options.fetchOptions,
      },
    );

    const bodyText = await response.clone().text();
    const bodyArrayBuffer = await response.clone().arrayBuffer();
    const charset = getCharset(bodyText, bodyArrayBuffer, load(bodyText));
    if (charset.toLowerCase() === 'utf-8') {
      body = bodyText;
    } else {
      body = decode(Buffer.from(bodyArrayBuffer), charset);
    }

    if (response && response.headers && response.headers.get('content-type') && !response.headers.get('content-type')?.includes('text/')) {
      throw new Error('Page must return a header content-type with text/');
    }
    if (response && response.status && (response.status.toString().substring(0, 1) === '4' || response.status.toString().substring(0, 1) === '5')) {
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
