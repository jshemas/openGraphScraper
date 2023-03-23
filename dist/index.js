"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len, import/no-import-module-exports */
const openGraphScraper_1 = require("./lib/openGraphScraper");
/**
 * `open-graph-scraper` uses [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for http requests
 * for scraping Open Graph and Twitter Card info off a website.
 *
 * @param {object} options - The options used by Open Graph Scraper
 * @param {boolean} [options.allMedia] - By default, OGS will only send back the first image/video it finds.
 * @param {boolean} [options.ogImageFallback] - Fetch other images if no open graph ones are found.
 * @param {boolean} [options.onlyGetOpenGraphInfo] - Only fetch open graph info and don't fall back on anything else.
 * @param {object} [options.customMetaTags] - Here you can define custom meta tags you want to scrape.
 * @param {object} [options.fetchOptions] - Sets the options used by fetch for the http requests
 * @param {object} [options.validatorSettings] - Sets the options used by validator.js for testing the URL
 * @param {string[]} [options.blacklist] - Pass in an array of sites you don't want ogs to run on.
 * @param {string} [options.html] - You can pass in an HTML string to run ogs on it. (use without options.url)
 * @param {number} [options.timeout] - Number of seconds before the fetch request ends. (default is 10 seconds)
 * @param {string} options.url - URL of the site. (Required)
 * @returns {Promise} Promise Object with the Open Graph results
 */
async function run(options) {
    let results;
    try {
        results = await (0, openGraphScraper_1.default)(options);
    }
    catch (error) {
        const exception = error;
        const returnError = {
            error: true,
            result: {
                success: false,
                requestUrl: options.url,
                error: exception.message,
                errorDetails: exception,
            },
            response: undefined,
            html: undefined,
        };
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw returnError;
    }
    const returnSuccess = {
        error: false,
        result: results.ogObject,
        response: results.response,
        html: results.html,
    };
    return returnSuccess;
}
exports.default = run;
module.exports = run;
