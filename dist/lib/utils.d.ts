import type { CustomMetaTags, OgObjectInteral, OpenGraphScraperOptions, ValidatorSettings } from './types';
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
 * Find and delete nested undefs
 *
 * @param {object} object - object to be cleaned
 * @return {object} object without nested undefs
 *
 */
export declare function removeNestedUndefinedValues(object: {
    [key: string]: any;
}): OgObjectInteral;
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
