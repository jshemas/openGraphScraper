"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * performs the fetch request and formats the body for ogs
 *
 * @param {object} gotOptions - options for got
 * @param {object} ogsOptions - options for ogs
 * @return {object} formatted request body and response
 *
 */
async function requestAndResultsFormatter(gotOptions, ogsOptions) {
    return fetch(ogsOptions.url)
        .then(async (response) => {
        if (response && response.headers && response.headers['content-type'] && !response.headers['content-type'].includes('text/')) {
            throw new Error('Page must return a header content-type with text/');
        }
        if (response && response.status && (response.status.toString().substring(0, 1) === '4' || response.status.toString().substring(0, 1) === '5')) {
            throw new Error('Server has returned a 400/500 error code');
        }
        const body = await response.text();
        if (body === undefined || body === '') {
            throw new Error('Page not found');
        }
        return { body, response };
    })
        .catch((error) => {
        if (error instanceof Error) {
            if (error.message === 'fetch failed')
                throw error.cause;
            throw error;
        }
        throw new Error(error);
    });
}
exports.default = requestAndResultsFormatter;
