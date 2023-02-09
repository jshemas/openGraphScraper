"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAndResultsFormatter = void 0;
const chardet = require("chardet");
const iconv = require("iconv-lite");
const utils_1 = require("./utils");
const charset = require("./charset");
/**
 * performs the got request and formats the body for ogs
 *
 * @param {object} gotOptions - options for got
 * @param {object} ogsOptions - options for ogs
 * @return {object} formatted request body and response
 *
 */
async function requestAndResultsFormatter(gotOptions, ogsOptions) {
    const got = await (0, utils_1.gotClient)(ogsOptions.downloadLimit);
    return got(gotOptions)
        .then((response) => {
        let requestBody = response.body;
        if (response && response.headers && response.headers['content-type'] && !response.headers['content-type'].includes('text/')) {
            throw new Error('Page must return a header content-type with text/');
        }
        if (response && response.statusCode && (response.statusCode.toString().substring(0, 1) === '4' || response.statusCode.toString().substring(0, 1) === '5')) {
            throw new Error('Server has returned a 400/500 error code');
        }
        if (requestBody === undefined || requestBody === '') {
            throw new Error('Page not found');
        }
        const char = charset.find(response.headers, requestBody, ogsOptions.peekSize) || chardet.detect(requestBody);
        if (char && typeof requestBody === 'object') {
            requestBody = iconv.decode(requestBody, char);
        }
        else {
            requestBody = requestBody.toString();
        }
        if (!requestBody) {
            throw new Error('Page not found');
        }
        return { requestBody, response };
    })
        .catch((error) => {
        if (error instanceof Error)
            throw error;
        throw new Error(error);
    });
}
exports.requestAndResultsFormatter = requestAndResultsFormatter;
;
