import type { CustomMetaTags, OgObjectInternal, OpenGraphScraperOptions, ValidatorSettings } from './types';
export declare const defaultUrlValidatorSettings: {
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
 * Checks if URL is valid
 *
 * @param {string} url - url to be checked
 * @param {string} urlValidatorSettings - settings used by validator
 * @return {boolean} boolean value if the url is valid
 *
 */
export declare function isUrlValid(url: string, urlValidatorSettings: ValidatorSettings): boolean;
/**
 * Validates and formats url
 *
 * @param {string} url - url to be checked and formatted
 * @param {string} urlValidatorSettings - settings used by validator
 * @return {string} proper url or null
 *
 */
export declare function validateAndFormatURL(url: string, urlValidatorSettings: ValidatorSettings): {
    url: string | null;
};
/**
 * Finds the image type from a given url
 *
 * @param {string} url - url to be checked
 * @return {string} image type from url
 *
 */
export declare function findImageTypeFromUrl(url: string): string;
/**
 * Checks if image type is valid
 *
 * @param {string} type - type to be checked
 * @return {boolean} boolean value if type is value
 *
 */
export declare function isImageTypeValid(type: string): boolean;
/**
 * Checks if URL is a non html page
 *
 * @param {string} url - url to be checked
 * @return {boolean} boolean value if url is non html
 *
 */
export declare function isThisANonHTMLUrl(url: string): boolean;
/**
 * Find and delete nested undefineds
 *
 * @param {object} object - object to be cleaned
 * @return {object} object without nested undefineds
 *
 */
export declare function removeNestedUndefinedValues(object: Record<string, any>): OgObjectInternal;
/**
 * Split the options object into ogs and got option objects
 *
 * @param {object} options - options that need to be split
 * @return {object} object with nested options for ogs and got
 *
 */
export declare function optionSetup(ogsOptions: OpenGraphScraperOptions): {
    options: OpenGraphScraperOptions;
};
/**
 * Checks if image type is valid
 *
 * @param {string} type - type to be checked
 * @return {boolean} boolean value if type is value
 *
 */
export declare function isCustomMetaTagsValid(customMetaTags: CustomMetaTags[]): boolean;
/**
 * Unescape script text.
 *
 * Certain websites escape script text within script tags, which can
 * interfere with `JSON.parse()`. Therefore, we need to unescape it.
 *
 * Known good escape sequences:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape#uhhhh
 *
 * ```js
 * JSON.parse('"\\u2611"'); // '☑'
 * ```
 *
 * Known bad escape sequences:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape#xhh
 *
 * ```js
 * JSON.parse('"\\x26"'); // '&'
 * ```
 *
 * @param {string} scriptText - the text of the script tag
 * @returns {string} unescaped script text
 */
export declare function unescapeScriptText(scriptText: string): string;
