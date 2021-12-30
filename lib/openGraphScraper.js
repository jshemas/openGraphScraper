const { extractMetaTags } = require('./extract');
const { requestAndResultsFormatter } = require('./request');
const utils = require('./utils');

/*
 * set options and return open graph results
 * @param string options - options the user has set
 * @param function callback
 */
const setOptionsAndReturnOpenGraphResults = async (options) => {
  const { ogsOptions, gotOptions } = utils.optionSetupAndSplit(options);

  if (ogsOptions.html) {
    if (ogsOptions.url) throw new Error('Must specify either `url` or `html`, not both');
    const ogObject = extractMetaTags(ogsOptions.html, ogsOptions);
    ogObject.requestUrl = null;
    ogObject.success = true;
    return { ogObject, response: { body: ogsOptions.html } };
  }

  const validate = utils.validate(ogsOptions.url, ogsOptions.urlValidatorSettings);

  if (!validate.url) throw new Error('Invalid URL');

  ogsOptions.url = validate.url;
  gotOptions.url = validate.url;

  // trying to limit non html pages
  if (utils.isThisANonHTMLUrl(ogsOptions.url)) throw new Error('Must scrape an HTML page');

  // eslint-disable-next-line max-len
  if (ogsOptions.blacklist && ogsOptions.blacklist.some((blacklistedHostname) => ogsOptions.url.includes(blacklistedHostname))) {
    throw new Error('Host name has been black listed');
  }

  try {
    const results = await requestAndResultsFormatter(gotOptions, ogsOptions);
    return results;
  } catch (exception) {
    if (exception && (exception.code === 'ENOTFOUND' || exception.code === 'EHOSTUNREACH' || exception.code === 'ENETUNREACH')) {
      throw new Error('Page not found');
    } else if (exception && (exception.code === 'ERR_INVALID_URL' || exception.code === 'EINVAL')) {
      throw new Error('Page not found');
    } else if (exception && exception.code === 'ETIMEDOUT') {
      throw new Error('Time out');
    } else if (exception && exception.message && exception.message.startsWith('Response code 5')) {
      throw new Error('Web server is returning error');
    } else if (exception && exception.message && exception.message === 'Promise was canceled') {
      throw new Error(`Exceeded the download limit of ${ogsOptions.downloadLimit} bytes`);
    }
    if (exception instanceof Error) throw exception;
    throw new Error('Page not found');
  }
};

module.exports = setOptionsAndReturnOpenGraphResults;
