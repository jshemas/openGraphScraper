import type { ErrorResult, OpenGraphScraperOptions, SuccessResult } from './lib/types';
/**
 * `open-graph-scraper` uses [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for http requests
 * for scraping Open Graph and Twitter Card info off a website.
 *
 * @param {object} options - The options used by Open Graph Scraper
 * @param {boolean|string[]} [options.onlyGetOpenGraphInfo] - Only fetch open graph info and don't fall back on
 * anything else.
 * @param {object} [options.customMetaTags] - Here you can define custom meta tags you want to scrape.
 * @param {object} [options.fetchOptions] - Sets the options used by fetch for the http requests
 * @param {object} [options.urlValidatorSettings] - Sets the options used by validator.js for testing the URL
 * @param {string[]} [options.blacklist] - Pass in an array of sites you don't want ogs to run on.
 * @param {string} [options.html] - You can pass in an HTML string to run ogs on it. (use without options.url)
 * @param {number} [options.timeout] - Number of seconds before the fetch request ends. (default is 10 seconds)
 * @param {string} options.url - URL of the site. (Required)
 * @returns {Promise} Promise Object with the Open Graph results
 */
declare function run(options: OpenGraphScraperOptions): Promise<ErrorResult | SuccessResult>;
export = run;
