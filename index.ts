/* eslint-disable max-len, import/no-import-module-exports */
import setOptionsAndReturnOpenGraphResults from './lib/openGraphScraper';
import type {
  OpenGraphScraperOptions,
  OgObject,
} from './lib/types';

/**
 * `open-graph-scraper` uses [got](https://github.com/sindresorhus/got) for requests and most of
 * [got's options](https://github.com/sindresorhus/got/blob/main/documentation/2-options.md)
 * should work as `open-graph-scraper` options.
 *
 * @param {object} options - The options used by Open Graph Scraper
 * @param {string} options.url - URL of the site. (Required)
 * @param {string} [options.html] - You can pass in an HTML string to run ogs on it. (use without options.url)
 * @param {string[]} [options.blacklist] - Pass in an array of sites you don't want ogs to run on.
 * @param {boolean} [options.onlyGetOpenGraphInfo] - Only fetch open graph info and don't fall back on anything else.
 * @param {boolean} [options.ogImageFallback] - Fetch other images if no open graph ones are found.
 * @param {object} [options.customMetaTags] - Here you can define custom meta tags you want to scrape.
 * @param {boolean} [options.allMedia] - By default, OGS will only send back the first image/video it finds.
 * @param {number | false} [options.downloadLimit] - Maximum size of the content downloaded from the server, in bytes.
 * @param {object} [options.ValidatorSettings] - Sets the options used by validator.js for testing the URL
 * @param {boolean} [options.decompress] - Set the accept-encoding to `gzip, deflate, br` (default: `true`).
 * @param {boolean} [options.followRedirect] - Defines if redirect responses should be followed automatically. (default: `true`).
 * @param {Object<string, string>} [options.headers] - An object containing request headers. Useful for setting the user-agent.
 * @param {number} [options.maxRedirects] - If exceeded, the request will be aborted and a MaxRedirectsError will be thrown. (default: `10`).
 * @param {object} [options.retry] - Number of times `og`s will retry the request (default: `2`).
 * @param {object} [options.timeout] - Timeout of the request.
 * @returns {Promise} Promise Object with the Open Graph results
 */
export default async function run(options: OpenGraphScraperOptions): Promise<ErrorResult | SuccessResult> {
  let results;
  try {
    results = await setOptionsAndReturnOpenGraphResults(options);
  } catch (error) {
    const exception = error as Error;
    const returnError:ErrorResult = {
      error: true,
      result: {
        success: false,
        requestUrl: options.url,
        error: exception.message,
        errorDetails: exception,
      },
      response: undefined,
    };
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw returnError;
  }
  const returnSuccess: SuccessResult = {
    error: false,
    result: results.ogObject,
    response: results.response,
  };
  return returnSuccess;
}

module.exports = run;

type SuccessResult = {
  error: false;
  result: OgObject;
  response: object;
};

type ErrorResult = {
  error: true;
  result: OgObject;
  response: undefined;
};
