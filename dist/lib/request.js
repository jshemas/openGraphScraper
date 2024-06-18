"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const undici_1 = require("undici");
const iconv_lite_1 = require("iconv-lite");
const cheerio_1 = require("cheerio");
const chardet_1 = __importDefault(require("chardet"));
/**
 * checks if an element exists
 */
const doesElementExist = (selector, attribute, $) => ($(selector).attr(attribute) && ($(selector).attr(attribute)?.length || 0) > 0);
/**
 * gets the charset of the html
 */
function getCharset(body, buffer, $) {
    if (doesElementExist('meta', 'charset', $)) {
        return $('meta').attr('charset');
    }
    if (doesElementExist('head > meta[name="charset"]', 'content', $)) {
        return $('head > meta[name="charset"]').attr('content');
    }
    if (doesElementExist('head > meta[http-equiv="content-type"]', 'content', $)) {
        const content = $('head > meta[http-equiv="content-type"]').attr('content') || '';
        const charsetRegEx = /charset=([^()<>@,;:"/[\]?.=\s]*)/i;
        if (charsetRegEx.test(content)) {
            const charsetRegExExec = charsetRegEx.exec(content);
            if (charsetRegExExec !== null && charsetRegExExec[1])
                return charsetRegExExec[1];
        }
    }
    if (body) {
        return chardet_1.default.detect(Buffer.from(buffer));
    }
    return 'utf-8';
}
/**
 * performs the fetch request and formats the body for ogs
 *
 * @param {object} options - options for ogs
 * @return {object} formatted request body and response
 *
 */
async function requestAndResultsFormatter(options) {
    let body;
    let response;
    try {
        response = await (0, undici_1.fetch)(options.url || '', {
            signal: AbortSignal.timeout((options.timeout || 10) * 1000),
            headers: { Origin: options.url, Accept: 'text/html' },
            ...options.fetchOptions,
        });
        const bodyArrayBuffer = await response.arrayBuffer();
        const bodyText = Buffer.from(bodyArrayBuffer).toString('utf-8');
        const charset = getCharset(bodyText, bodyArrayBuffer, (0, cheerio_1.load)(bodyText)) || 'utf-8';
        if (charset.toLowerCase() === 'utf-8') {
            body = bodyText;
        }
        else {
            body = (0, iconv_lite_1.decode)(Buffer.from(bodyArrayBuffer), charset);
        }
        if (response && response.headers && response.headers.get('content-type') && !response.headers.get('content-type')?.includes('text/')) {
            throw new Error('Page must return a header content-type with text/');
        }
        if (response && response.status && (response.status.toString().substring(0, 1) === '4' || response.status.toString().substring(0, 1) === '5')) {
            switch (response.status) {
                case 400:
                    throw new Error('400 Bad Request');
                case 401:
                    throw new Error('401 Unauthorized');
                case 403:
                    throw new Error('403 Forbidden');
                case 404:
                    throw new Error('404 Not Found');
                case 408:
                    throw new Error('408 Request Timeout');
                case 410:
                    throw new Error('410 Gone');
                case 500:
                    throw new Error('500 Internal Server Error');
                case 502:
                    throw new Error('502 Bad Gateway');
                case 503:
                    throw new Error('503 Service Unavailable');
                case 504:
                    throw new Error('504 Gateway Timeout');
                default:
                    throw new Error('Server has returned a 400/500 error code');
            }
        }
        if (body === undefined || body === '') {
            throw new Error('Page not found');
        }
    }
    catch (error) {
        if (error instanceof Error && error.message === 'fetch failed')
            throw error.cause;
        throw error;
    }
    return { body, response };
}
exports.default = requestAndResultsFormatter;
