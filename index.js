const openGraphScraper = require('./lib/openGraphScraper');

/**
 * @typedef {object} customMetaTags
 * @property {boolean} multiple - is there more than one of these tags on a page (normally this is false)
 * @property {string} property - meta tag name/property attribute
 * @property {string} fieldName - name of the result variable
 */

/**
 * You can find the `isUrl` settings details at https://github.com/validatorjs/validator.js
 * @typedef {object} validatorSettings
 * @property {string[]} protocols
 * @property {boolean} require_tld
 * @property {boolean} require_protocol
 * @property {boolean} require_host
 * @property {boolean} require_valid_protocol
 * @property {boolean} allow_underscores
 * @property {boolean} host_whitelist
 * @property {boolean} host_blacklist
 * @property {boolean} allow_trailing_dot
 * @property {boolean} allow_protocol_relative_urls
 * @property {boolean} disallow_auth
 */

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
 * @param {customMetaTags[]} [options.customMetaTags] - Here you can define custom meta tags you want to scrape.
 * @param {boolean} [options.allMedia] - By default, OGS will only send back the first image/video it finds.
 * @param {number} [options.peekSize] - Sets the peekSize for the request.
 * @param {number} [options.downloadLimit] - Maximum size of the content downloaded from the server, in bytes.
 * @param {validatorSettings} [options.urlValidatorSettings] - Sets the options used by validator.js for testing the URL
 * @returns {{error: boolean, result: object, response: object}} Object with the Open Graph results with the given page
 *
 */
const run = async (options) => {
  let results;
  try {
    results = await openGraphScraper(options);
  } catch (exception) {
    const returnError = {
      error: true,
      result: {
        success: false,
        requestUrl: options.url,
        error: exception.message,
        errorDetails: exception,
      },
    };
    throw returnError;
  }
  return {
    error: false,
    result: results.ogObject,
    response: results.response,
  };
};

module.exports = run;
