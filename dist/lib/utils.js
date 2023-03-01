"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gotClient = exports.optionSetupAndSplit = exports.removeNestedUndefinedValues = exports.isThisANonHTMLUrl = exports.isImageTypeValid = exports.findImageTypeFromUrl = exports.validateAndFormatURL = exports.isUrlValid = void 0;
const validator = require("validator");
/**
 * Checks if URL is valid
 *
 * @param {string} url - url to be checked
 * @param {string} urlValidatorSettings - settings used by validator
 * @return {boolean} boolean value if the url is valid
 *
 */
function isUrlValid(url, urlValidatorSettings) {
    return typeof url === 'string' && url.length > 0 && validator.isURL(url, urlValidatorSettings);
}
exports.isUrlValid = isUrlValid;
/**
 * Forces url to start with http:// if it doesn't
 *
 * @param {string} url - url to be updated
 * @return {string} url that starts with http
 *
 */
const coerceUrl = (url) => (/^(f|ht)tps?:\/\//i.test(url) ? url : `http://${url}`);
/**
 * Validates and formats url
 *
 * @param {string} url - url to be checked and formatted
 * @param {string} urlValidatorSettings - settings used by validator
 * @return {string} proper url or null
 *
 */
function validateAndFormatURL(url, urlValidatorSettings) {
    return { url: isUrlValid(url, urlValidatorSettings) ? coerceUrl(url) : null };
}
exports.validateAndFormatURL = validateAndFormatURL;
/**
 * Finds the image type from a given url
 *
 * @param {string} url - url to be checked
 * @return {string} image type from url
 *
 */
function findImageTypeFromUrl(url) {
    let type = url.split('.').pop();
    [type] = type.split('?');
    return type;
}
exports.findImageTypeFromUrl = findImageTypeFromUrl;
/**
 * Checks if image type is valid
 *
 * @param {string} type - type to be checked
 * @return {boolean} boolean value if type is value
 *
 */
function isImageTypeValid(type) {
    const validImageTypes = ['apng', 'bmp', 'gif', 'ico', 'cur', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'tif', 'tiff', 'webp'];
    return validImageTypes.includes(type);
}
exports.isImageTypeValid = isImageTypeValid;
/**
 * Checks if URL is a non html page
 *
 * @param {string} url - url to be checked
 * @return {boolean} boolean value if url is non html
 *
 */
function isThisANonHTMLUrl(url) {
    const invalidImageTypes = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.3gp', '.avi', '.mov', '.mp4', '.m4v', '.m4a', '.mp3', '.mkv', '.ogv', '.ogm', '.ogg', '.oga', '.webm', '.wav', '.bmp', '.gif', '.jpg', '.jpeg', '.png', '.webp', '.zip', '.rar', '.tar', '.tar.gz', '.tgz', '.tar.bz2', '.tbz2', '.txt', '.pdf'];
    const extension = findImageTypeFromUrl(url);
    return invalidImageTypes.some((type) => `.${extension}`.includes(type));
}
exports.isThisANonHTMLUrl = isThisANonHTMLUrl;
/**
 * find and delete nested undefs
 *
 * @param {object} object - object to be cleaned
 * @return {object} object without nested undefs
 *
 */
function removeNestedUndefinedValues(object) {
    Object.entries(object).forEach(([key, value]) => {
        if (value && typeof value === 'object')
            removeNestedUndefinedValues(value);
        else if (value === undefined)
            delete object[key];
    });
    return object;
}
exports.removeNestedUndefinedValues = removeNestedUndefinedValues;
/**
 * split the options object into ogs and got option objects
 *
 * @param {object} options - options that need to be split
 * @return {object} object with nested options for ogs and got
 *
 */
function optionSetupAndSplit(options) {
    const ogsOptions = {
        allMedia: false,
        customMetaTags: [],
        downloadLimit: 1000000,
        ogImageFallback: true,
        onlyGetOpenGraphInfo: false,
        peekSize: 1024,
        urlValidatorSettings: {
            protocols: ['http', 'https'],
            require_tld: true,
            require_protocol: false,
            require_host: true,
            require_port: false,
            require_valid_protocol: true,
            allow_underscores: false,
            allow_trailing_dot: false,
            allow_protocol_relative_urls: false,
            allow_fragments: true,
            allow_query_components: true,
            validate_length: true,
        },
        ...options,
    };
    const gotOptions = {
        decompress: true,
        followRedirect: true,
        headers: {},
        maxRedirects: 10,
        ...options,
    };
    // remove any OGS options from gotOptions since this will cause errors in got
    delete gotOptions.allMedia;
    delete gotOptions.blacklist;
    delete gotOptions.customMetaTags;
    delete gotOptions.downloadLimit;
    delete gotOptions.ogImageFallback;
    delete gotOptions.onlyGetOpenGraphInfo;
    delete gotOptions.peekSize;
    delete gotOptions.urlValidatorSettings;
    return { ogsOptions, gotOptions };
}
exports.optionSetupAndSplit = optionSetupAndSplit;
/**
 * gotClient - limit the size of the content we fetch when performing the request
 * from https://github.com/sindresorhus/got/blob/main/documentation/examples/advanced-creation.js
 *
 * @param {string} downloadLimit - the download limit, will close connection once it is reached
 * @return {function} got client with download limit
 *
 */
async function gotClient(downloadLimit) {
    // https://github.com/sindresorhus/got/issues/1789
    // eslint-disable-next-line import/no-unresolved
    const { got } = await import('got');
    return got.extend({
        handlers: [
            (options, next) => {
                const promiseOrStream = next(options);
                const destroy = (message) => {
                    if (options.isStream) {
                        // @ts-ignore
                        promiseOrStream.destroy(new Error(message));
                        return;
                    }
                    // @ts-ignore
                    promiseOrStream.cancel(message);
                };
                if (typeof downloadLimit === 'number') {
                    promiseOrStream.on('downloadProgress', (progress) => {
                        if (progress.transferred > downloadLimit && progress.percent !== 1) {
                            destroy(`Exceeded the download limit of ${downloadLimit} bytes`);
                        }
                    });
                }
                return promiseOrStream;
            },
        ],
    });
}
exports.gotClient = gotClient;
