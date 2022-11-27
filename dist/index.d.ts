export = run;
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
 * @returns {Promise<{error: boolean, result: object, response: object}>} Object with the Open Graph results with the given page
 *
 */
declare function run(options: {
    url: string;
    html?: string;
    blacklist?: string[];
    onlyGetOpenGraphInfo?: boolean;
    ogImageFallback?: boolean;
    customMetaTags?: customMetaTags[];
    allMedia?: boolean;
    peekSize?: number;
    downloadLimit?: number;
    urlValidatorSettings?: validatorSettings;
}): Promise<{
    error: boolean;
    result: object;
    response: object;
}>;
declare namespace run {
    export { customMetaTags, validatorSettings };
}
type customMetaTags = {
    /**
     * - is there more than one of these tags on a page (normally this is false)
     */
    multiple: boolean;
    /**
     * - meta tag name/property attribute
     */
    property: string;
    /**
     * - name of the result variable
     */
    fieldName: string;
};
/**
 * You can find the `isUrl` settings details at https://github.com/validatorjs/validator.js
 */
type validatorSettings = {
    protocols: string[];
    require_tld: boolean;
    require_protocol: boolean;
    require_host: boolean;
    require_valid_protocol: boolean;
    allow_underscores: boolean;
    host_whitelist: boolean;
    host_blacklist: boolean;
    allow_trailing_dot: boolean;
    allow_protocol_relative_urls: boolean;
    disallow_auth: boolean;
};
//# sourceMappingURL=index.d.ts.map