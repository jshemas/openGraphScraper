const openGraphScraper = require('./lib/openGraphScraper');

/*
 * run
 * @param string options - options the user has set
 * @param function promise
 */
exports.run = async (options) => {
  let results;
  try {
    results = await openGraphScraper(options);
  } catch (exception) {
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
  return {
    error: false,
    result: results.ogObject,
    response: results.response,
  };
};

module.exports = (options) => exports.run(options);
