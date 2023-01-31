const openGraphScraper = require('./lib/openGraphScraper');
// import openGraphScraper from './lib/openGraphScraper';
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
export default run;
