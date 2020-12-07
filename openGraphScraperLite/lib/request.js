const chardet = require('chardet');
const iconv = require('iconv-lite');
const request = require('ky-universal');

const charset = require('../../lib/charset');
const { extractMetaTags } = require('../../lib/extract');

/*
 * request and results formatter
 * @param string options - options the user has set
 */
exports.requestAndResultsFormatter = async (options) => {
  const requestUrl = options.url;

  const response = await request.get(requestUrl, options);
  let formatBody = await response.buffer();

  if (response && response.status && (response.status.toString().substring(0, 1) === '4' || response.status.toString().substring(0, 1) === '5')) {
    throw new Error('Server has returned a 400/500 error code');
  } else if (response.body === undefined) {
    throw new Error('Page not found');
  }

  const char = charset.find(response.headers, formatBody, options.peekSize) || chardet.detect(formatBody);
  if (char && typeof formatBody === 'object') {
    // eslint-disable-next-line no-useless-catch
    try {
      formatBody = iconv.decode(formatBody, char);
    } catch (exception) {
      throw exception;
    }
  } else {
    formatBody = formatBody.toString();
  }

  const ogObject = extractMetaTags(formatBody, options);

  if (!options.onlyGetOpenGraphInfo) {
    ogObject.charset = char;
  }
  ogObject.requestUrl = options.url;
  ogObject.success = true;

  return { ogObject, response };
};
