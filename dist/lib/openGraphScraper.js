"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extract_1 = require("./extract");
const request_1 = require("./request");
const charset_1 = require("./charset");
const utils = require("./utils");
/**
 * sets up options for the got request and calls extract on html
 *
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
async function setOptionsAndReturnOpenGraphResults(options) {
    const { ogsOptions, gotOptions } = utils.optionSetupAndSplit(options);
    if (ogsOptions.html) {
        if (ogsOptions.url)
            throw new Error('Must specify either `url` or `html`, not both');
        const ogObject = (0, extract_1.default)(ogsOptions.html, ogsOptions);
        ogObject.requestUrl = null;
        ogObject.success = true;
        return { ogObject, response: { body: ogsOptions.html } };
    }
    const formattedUrl = utils.validateAndFormatURL(ogsOptions.url, ogsOptions.urlValidatorSettings);
    if (!formattedUrl.url)
        throw new Error('Invalid URL');
    ogsOptions.url = formattedUrl.url;
    gotOptions.url = formattedUrl.url;
    // trying to limit non html pages
    if (utils.isThisANonHTMLUrl(ogsOptions.url))
        throw new Error('Must scrape an HTML page');
    // eslint-disable-next-line max-len
    if (ogsOptions.blacklist && ogsOptions.blacklist.some((blacklistedHostname) => ogsOptions.url.includes(blacklistedHostname))) {
        throw new Error('Host name has been black listed');
    }
    try {
        const { decodedBody, response } = await (0, request_1.default)(gotOptions, ogsOptions);
        const ogObject = (0, extract_1.default)(decodedBody, ogsOptions);
        if (!ogsOptions.onlyGetOpenGraphInfo) {
            ogObject.charset = (0, charset_1.default)(response.headers, decodedBody, ogsOptions.peekSize);
        }
        ogObject.requestUrl = ogsOptions.url;
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
            throw new Error(`Exceeded the download limit of ${ogsOptions.downloadLimit} bytes`);
        }
        if (exception instanceof Error)
            throw exception;
        throw new Error('Page not found');
    }
}
exports.default = setOptionsAndReturnOpenGraphResults;
