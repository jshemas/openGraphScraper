const openGraphScraper = require('./lib/openGraphScraper');

/**
 * Open Graph Scraper
 *
 * @param {object} options - The options used by Open Graph Scraper
 * @return {object} object with results with the of given page
 *
 */
const run = async (options) => {
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

module.exports = run;
