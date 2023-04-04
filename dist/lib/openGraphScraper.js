"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extract_1 = __importDefault(require("./extract"));
const request_1 = __importDefault(require("./request"));
const utils = __importStar(require("./utils"));
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
        ogObject.success = true;
        return { ogObject, response: { body: options.html }, html: options.html };
    }
    const formattedUrl = utils
        .validateAndFormatURL(options.url, (options.urlValidatorSettings || utils.defaultUrlValidatorSettings));
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
