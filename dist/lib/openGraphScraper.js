"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extract_1 = __importDefault(require("./extract"));
const request_1 = __importDefault(require("./request"));
const utils_1 = require("./utils");
/**
 * sets up options for the fetch request and calls extract on html
 *
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
async function setOptionsAndReturnOpenGraphResults(ogsOptions) {
    const { options } = (0, utils_1.optionSetup)(ogsOptions);
    if (options.html && options.url)
        throw new Error('Must specify either `url` or `html`, not both');
    if (options.html) {
        const ogObject = (0, extract_1.default)(options.html, options);
        ogObject.success = true;
        return { ogObject, response: { body: options.html }, html: options.html };
    }
    const formattedUrl = (0, utils_1.validateAndFormatURL)(options.url || '', (options.urlValidatorSettings || utils_1.defaultUrlValidatorSettings));
    if (!formattedUrl.url)
        throw new Error('Invalid URL');
    if (!(0, utils_1.isCustomMetaTagsValid)(options.customMetaTags || []))
        throw new Error('Invalid Custom Meta Tags');
    options.url = formattedUrl.url;
    // trying to limit non html pages
    if ((0, utils_1.isThisANonHTMLUrl)(options.url))
        throw new Error('Must scrape an HTML page');
    // eslint-disable-next-line max-len
    if (options.blacklist && options.blacklist.some((blacklistedHostname) => options.url?.includes(blacklistedHostname))) {
        throw new Error('Host name has been black listed');
    }
    try {
        const { body, response } = await (0, request_1.default)(options);
        const ogObject = (0, extract_1.default)(body, options);
        ogObject.requestUrl = options.url;
        return { ogObject, response, html: body };
    }
    catch (exception) {
        if (exception && (exception.code === 'ENOTFOUND' || exception.code === 'EHOSTUNREACH' || exception.code === 'ENETUNREACH')) {
            throw new Error('Page not found');
        }
        else if (exception && (exception.name === 'AbortError')) {
            throw new Error('The operation was aborted due to timeout');
        }
        if (exception instanceof Error)
            throw exception;
        throw new Error('Page not found');
    }
}
exports.default = setOptionsAndReturnOpenGraphResults;
