"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * performs the fetch request and formats the body for ogs
 *
 * @param {object} options - options for ogs
 * @return {object} formatted request body and response
 *
 */
async function requestAndResultsFormatter(options) {
    let body;
    let clonedResponse;
    try {
        const response = await fetch(options.url, options.fetchOptions);
        clonedResponse = response.clone();
        if (response && response.headers && response.headers['content-type'] && !response.headers['content-type'].includes('text/')) {
            throw new Error('Page must return a header content-type with text/');
        }
        if (response && response.status && (response.status.toString().substring(0, 1) === '4' || response.status.toString().substring(0, 1) === '5')) {
            throw new Error('Server has returned a 400/500 error code');
        }
        body = await response.text();
        if (body === undefined || body === '') {
            throw new Error('Page not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'fetch failed')
                throw error.cause;
            throw error;
        }
        throw new Error(error);
    }
    return { body, response: clonedResponse };
}
exports.default = requestAndResultsFormatter;
