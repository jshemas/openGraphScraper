const chardet = require('chardet');
const iconv = require('iconv-lite');
const { gotClient } = require('./utils');

const charset = require('./charset');

/**
 * performs the got request and formats the body for ogs
 *
 * @param {object} gotOptions - options for got
 * @param {object} ogsOptions - options for ogs
 * @return {object} formatted request body and response
 *
 */
exports.requestAndResultsFormatter = async (gotOptions, ogsOptions) => {
  const got = await gotClient(ogsOptions.downloadLimit);

  return got(gotOptions)
    .then((response) => {
      let requestBody = response.body;

      if (response && response.headers && response.headers['content-type'] && !response.headers['content-type'].includes('text/')) {
        throw new Error('Page must return a header content-type with text/');
      }

      if (response && response.statusCode && (response.statusCode.toString().substring(0, 1) === '4' || response.statusCode.toString().substring(0, 1) === '5')) {
        throw new Error('Server has returned a 400/500 error code');
      } else if (response.body === undefined) {
        throw new Error('Page not found');
      }

      const char = charset.find(response.headers, requestBody, ogsOptions.peekSize) || chardet.detect(requestBody);
      if (char && typeof requestBody === 'object') {
        // eslint-disable-next-line no-useless-catch
        try {
          requestBody = iconv.decode(requestBody, char);
        } catch (exception) {
          throw exception;
        }
      } else {
        requestBody = requestBody.toString();
      }

      if (!requestBody) {
        throw new Error('Page not found');
      }

      return { requestBody, response };
    })
    .catch((error) => {
      if (error instanceof Error) throw error;
      throw new Error(error);
    });
};
