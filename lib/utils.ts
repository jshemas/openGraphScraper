import validator from 'validator';
import type { ValidatorSettings, OpenGraphScraperOptions } from './types';

/**
 * Checks if URL is valid
 *
 * @param {string} url - url to be checked
 * @param {string} urlValidatorSettings - settings used by validator
 * @return {boolean} boolean value if the url is valid
 *
 */
export function isUrlValid(url: string, urlValidatorSettings: ValidatorSettings): boolean {
  return typeof url === 'string' && url.length > 0 && validator.isURL(url, urlValidatorSettings);
}

/**
 * Forces url to start with http:// if it doesn't
 *
 * @param {string} url - url to be updated
 * @return {string} url that starts with http
 *
 */
const coerceUrl = (url: string): string => (/^(f|ht)tps?:\/\//i.test(url) ? url : `http://${url}`);

/**
 * Validates and formats url
 *
 * @param {string} url - url to be checked and formatted
 * @param {string} urlValidatorSettings - settings used by validator
 * @return {string} proper url or null
 *
 */
export function validateAndFormatURL(url: string, urlValidatorSettings: ValidatorSettings): { url: string | null } {
  return { url: isUrlValid(url, urlValidatorSettings) ? coerceUrl(url) : null };
}

/**
 * Finds the image type from a given url
 *
 * @param {string} url - url to be checked
 * @return {string} image type from url
 *
 */
export function findImageTypeFromUrl(url: string): string {
  let type: string = url.split('.').pop() || '';
  [type] = type.split('?');
  return type;
}

/**
 * Checks if image type is valid
 *
 * @param {string} type - type to be checked
 * @return {boolean} boolean value if type is value
 *
 */
export function isImageTypeValid(type: string): boolean {
  const validImageTypes: string[] = ['apng', 'bmp', 'gif', 'ico', 'cur', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'tif', 'tiff', 'webp'];
  return validImageTypes.includes(type);
}

/**
 * Checks if URL is a non html page
 *
 * @param {string} url - url to be checked
 * @return {boolean} boolean value if url is non html
 *
 */
export function isThisANonHTMLUrl(url: string): boolean {
  const invalidImageTypes: string[] = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.3gp', '.avi', '.mov', '.mp4', '.m4v', '.m4a', '.mp3', '.mkv', '.ogv', '.ogm', '.ogg', '.oga', '.webm', '.wav', '.bmp', '.gif', '.jpg', '.jpeg', '.png', '.webp', '.zip', '.rar', '.tar', '.tar.gz', '.tgz', '.tar.bz2', '.tbz2', '.txt', '.pdf'];
  const extension: string = findImageTypeFromUrl(url);
  return invalidImageTypes.some((type: string): boolean => `.${extension}`.includes(type));
}

/**
 * Find and delete nested undefs
 *
 * @param {object} object - object to be cleaned
 * @return {object} object without nested undefs
 *
 */
export function removeNestedUndefinedValues(object: { [key: string]: any }): { [key: string]: any } {
  Object.entries(object).forEach(([key, value]) => {
    if (value && typeof value === 'object') removeNestedUndefinedValues(value);
    else if (value === undefined) delete object[key];
  });
  return object;
}

/**
 * Split the options object into ogs and got option objects
 *
 * @param {object} options - options that need to be split
 * @return {object} object with nested options for ogs and got
 *
 */
export function optionSetup(ogsOptions: OpenGraphScraperOptions): { options: OpenGraphScraperOptions } {
  const options: OpenGraphScraperOptions = {
    customMetaTags: [],
    ogImageFallback: true,
    onlyGetOpenGraphInfo: false,
    urlValidatorSettings: {
      allow_fragments: true,
      allow_protocol_relative_urls: false,
      allow_query_components: true,
      allow_trailing_dot: false,
      allow_underscores: false,
      protocols: ['http', 'https'],
      require_host: true,
      require_port: false,
      require_protocol: false,
      require_tld: true,
      require_valid_protocol: true,
      validate_length: true,
    },
    ...ogsOptions,
  };

  return { options };
}
