"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openGraphScraper = require('./lib/openGraphScraper');
async function run(options) {
    let results;
    try {
        results = await openGraphScraper(options);
    }
    catch (error) {
        const exception = error;
        const returnError = {
            error: true,
            result: {
                success: false,
                requestUrl: options.url,
                error: exception.message,
                errorDetails: exception,
            },
            response: undefined
        };
        throw returnError;
    }
    const returnSuccess = {
        error: false,
        result: results.ogObject,
        response: results.response,
    };
    return returnSuccess;
}
exports.default = run;
module.exports = run;
