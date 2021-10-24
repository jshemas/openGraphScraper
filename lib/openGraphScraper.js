const { extractMetaTags } = require('./extract');
const { requestAndResultsFormatter } = require('./request');
const utils = require('./utils');

/*
 * set options and return open graph results
 * @param string options - options the user has set
 * @param function callback
 */
const setOptionsAndReturnOpenGraphResults = async (options) => {
  options.customMetaTags = options.customMetaTags || []; // setting customMetaTags up here because of HTML

  if (options.html) {
    if (options.url) throw new Error('Must specify either `url` or `html`, not both');
    const ogObject = extractMetaTags(options.html, options);
    ogObject.requestUrl = null;
    ogObject.success = true;
    return { ogObject, response: { body: options.html } };
  }

  if (!options.urlValidatorSettings) {
    // set the default URL validator Settings
    options.urlValidatorSettings = {
      protocols: ['http', 'https'],
      require_tld: true,
      require_protocol: false,
      require_host: true,
      require_valid_protocol: true,
      allow_underscores: false,
      host_whitelist: false,
      host_blacklist: false,
      allow_trailing_dot: false,
      allow_protocol_relative_urls: false,
      disallow_auth: false,
    };
  }

  const validate = utils.validate(options.url, options.timeout, options.urlValidatorSettings);

  if (!validate.url) throw new Error('Invalid URL');

  options.url = validate.url;
  options.timeout = validate.timeout;
  options = {
    decompress: true,
    peekSize: 1024,
    followRedirect: true,
    maxRedirects: 10,
    retry: 2,
    onlyGetOpenGraphInfo: false,
    ogImageFallback: true,
    allMedia: false,
    headers: {},
    responseType: 'buffer',
    agent: null,
    downloadLimit: 1000000,
    ...options,
  };

  if (options.encoding === null) {
    // eslint-disable-next-line no-console
    console.log('Setting `options.encoding` to `null` has been deprecated. You should no longer need to do this.');
    options.encoding = 'utf8';
  }

  if (process.browser) {
    options.decompress = false;
  }

  // trying to limit non html pages
  if (utils.isThisANonHTMLUrl(options.url)) throw new Error('Must scrape an HTML page');

  if (options.blacklist && options.blacklist.some((blacklistedHostname) => options.url.includes(blacklistedHostname))) {
    throw new Error('Host name has been black listed');
  }

  try {
    const results = await requestAndResultsFormatter(options);
    return results;
  } catch (exception) {
    if (exception && (exception.code === 'ENOTFOUND' || exception.code === 'EHOSTUNREACH' || exception.code === 'ENETUNREACH')) {
      throw new Error('Page not found');
    } else if (exception && (exception.code === 'ERR_INVALID_URL' || exception.code === 'EINVAL')) {
      throw new Error('Page not found');
    } else if (exception && exception.code === 'ETIMEDOUT') {
      throw new Error('Time out');
    } else if (exception && exception.message && exception.message.startsWith('Response code 4')) {
      throw new Error('Page not found');
    } else if (exception && exception.message && exception.message.startsWith('Response code 5')) {
      throw new Error('Web server is returning error');
    } else if (exception && exception.message && exception.message === 'Promise was canceled') {
      throw new Error(`Exceeded the download limit of ${options.downloadLimit} bytes`);
    }
    if (exception instanceof Error) throw exception;
    throw new Error('Page not found');
  }
};

module.exports = setOptionsAndReturnOpenGraphResults;
