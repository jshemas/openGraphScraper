/* eslint-disable max-len */

/**
 * The options used by Open Graph Scraper
 *
 * @typeParam {string} url - URL of the site. (Required)
 * @typeParam {string} [html] - You can pass in an HTML string to run ogs on it. (use without options.url)
 * @typeParam {string[]} [blacklist] - Pass in an array of sites you don't want ogs to run on.
 * @typeParam {boolean} [onlyGetOpenGraphInfo] - Only fetch open graph info and don't fall back on anything else.
 * @typeParam {boolean} [ogImageFallback] - Fetch other images if no open graph ones are found.
 * @typeParam {object} [customMetaTags] - Here you can define custom meta tags you want to scrape.
 * @typeParam {boolean} [allMedia] - By default, OGS will only send back the first image/video it finds.
 * @typeParam {number} [peekSize] - Sets the peekSize for the request.
 * @typeParam {number | false} [downloadLimit] - Maximum size of the content downloaded from the server, in bytes.
 * @typeParam {object} [ValidatorSettings] - Sets the options used by validator.js for testing the URL
 * @typeParam {boolean} [decompress] - Set the accept-encoding to `gzip, deflate, br` (default: `true`).
 * @typeParam {boolean} [followRedirect] - Defines if redirect responses should be followed automatically. (default: `true`).
 * @typeParam {Object<string, string>} [headers] - An object containing request headers. Useful for setting the user-agent.
 * @typeParam {number} [maxRedirects] - If exceeded, the request will be aborted and a MaxRedirectsError will be thrown. (default: `10`).
 * @typeParam {object} [retry] - Number of times `og`s will retry the request (default: `2`).
 * @typeParam {object} [timeout] - Timeout of the request.
 */
export type OpenGraphScraperOptions = {
  allMedia?: boolean;
  blacklist?: string[];
  customMetaTags?: CustomMetaTags[];
  decompress?: boolean;
  downloadLimit?: number | false;
  followRedirect?: boolean;
  headers?: {
    [x: string]: string;
  };
  html?: string;
  maxRedirects?: number;
  ogImageFallback?: boolean;
  onlyGetOpenGraphInfo?: boolean;
  peekSize?: number;
  retry?: object;
  timeout?: object;
  url: string;
  urlValidatorSettings?: ValidatorSettings;
};

/**
 * Options for isURL method in Validator.js
 *
 * @typeParam allow_protocol_relative_urls - if set as true protocol relative URLs will be allowed
 * @typeParam protocols - valid protocols can be modified with this option
 * @typeParam require_host - if set as false isURL will not check if host is present in the URL
 * @typeParam require_port - if set as true isURL will check if port is present in the URL
 * @typeParam require_protocol - if set as true isURL will return false if protocol is not present in the URL
 * @typeParam require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option
 * @typeParam validate_length - if set as false isURL will skip string length validation (IE maximum is 2083)
 *
 */
export type ValidatorSettings = {
  allow_fragments: boolean;
  allow_protocol_relative_urls: boolean;
  allow_query_components: boolean;
  allow_trailing_dot: boolean;
  allow_underscores: boolean;
  protocols: string[];
  require_host: boolean;
  require_port: boolean;
  require_protocol: boolean;
  require_tld: boolean;
  require_valid_protocol: boolean;
  validate_length: boolean;
};

/**
 * The type for user defined custom meta tags you want to scrape.
 *
 * @typeParam {boolean} multiple - is there more than one of these tags on a page (normally this is false)
 * @typeParam {string} property - meta tag name/property attribute
 * @typeParam {string} fieldName - name of the result variable
 */
type CustomMetaTags = {
  fieldName: string;
  multiple: boolean;
  property: string;
};

export type TwitterImageObject = {
  alt?: string;
  height?: string | number;
  url: string;
  width?: string | number;
};

export type TwitterPlayerObject = {
  height?: string | number;
  stream?: string;
  url?: string;
  width?: string | number;
};

export type ImageObject = {
  height?: string | number;
  type: string;
  url: string;
  width?: string | number;
};
