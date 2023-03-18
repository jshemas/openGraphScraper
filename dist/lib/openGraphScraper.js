"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extract_1 = require("./extract");
const request_1 = require("./request");
const utils = require("./utils");
/**
 * sets up options for the fetch request and calls extract on html
 *
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
async function setOptionsAndReturnOpenGraphResults(ogsOptions) {
    const { options } = utils.optionSetup(ogsOptions);
    if (options.html) {
        if (options.url)
            throw new Error('Must specify either `url` or `html`, not both');
        const ogObject = (0, extract_1.default)(options.html, options);
        ogObject.requestUrl = null;
        ogObject.success = true;
        return { ogObject, response: { body: options.html } };
    }
    const formattedUrl = utils.validateAndFormatURL(options.url, options.urlValidatorSettings);
    if (!formattedUrl.url)
        throw new Error('Invalid URL');
    options.url = formattedUrl.url;
    // trying to limit non html pages
    if (utils.isThisANonHTMLUrl(options.url))
        throw new Error('Must scrape an HTML page');
    // eslint-disable-next-line max-len
    if (options.blacklist && options.blacklist.some((blacklistedHostname) => options.url.includes(blacklistedHostname))) {
        throw new Error('Host name has been black listed');
    }
    try {
        const { body, response } = await (0, request_1.default)(options);
        const ogObject = (0, extract_1.default)(body, options);
        ogObject.requestUrl = options.url;
        ogObject.success = true;
        return { ogObject, response };
    }
    catch (exception) {
        if (exception && (exception.code === 'ENOTFOUND' || exception.code === 'EHOSTUNREACH' || exception.code === 'ENETUNREACH')) {
            throw new Error('Page not found');
        }
        else if (exception && (exception.code === 'ERR_INVALID_URL' || exception.code === 'EINVAL')) {
            throw new Error('Page not found');
        }
        else if (exception && exception.code === 'ETIMEDOUT') {
            throw new Error('Time out');
        }
        else if (exception && exception.message && exception.message.startsWith('Response code 5')) {
            throw new Error('Web server is returning error');
        }
        else if (exception && exception.message && exception.message === 'Promise was canceled') {
            throw new Error(`Exceeded the download limit of ${options.downloadLimit} bytes`);
        }
        if (exception instanceof Error)
            throw exception;
        throw new Error('Page not found');
    }
}
exports.default = setOptionsAndReturnOpenGraphResults;
