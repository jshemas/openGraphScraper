const openGraphScraper = require('./lib/openGraphScraper');

/*
 * run
 * @param string options - options the user has set
 * @param function callback and promise
 */
exports.run = async (options, callback) => {
  const hasCallback = typeof callback === 'function';
  if (hasCallback) {
    let results;
    try {
      results = await openGraphScraper(options);
    } catch (exception) {
      const returnError = {
        success: false,
        requestUrl: options.url,
        error: exception.message,
        errorDetails: exception,
      };
      return callback(true, returnError);
    }
    return callback(false, results.ogObject, results.response);
  }
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
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
      reject(returnError);
      return;
    }
    const returnValues = {
      error: false,
      result: results.ogObject,
      response: results.response,
    };
    resolve(returnValues);
  });
};

module.exports = (options, callback) => exports.run(options, callback);
