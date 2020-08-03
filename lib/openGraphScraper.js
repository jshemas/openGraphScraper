const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const chardet = require('chardet');
const request = require('got');
const media = require('./media');
const fallback = require('./fallback');
const fields = require('./fields');
const charset = require('./charset');
const utils = require('./utils');

/*
 * extract meta tags from html string
 * @param string body - html string
 * @param string options - options the user has set
 */
const extractMetaTags = (body, options) => {
  let ogObject = {};
  const $ = cheerio.load(body);
  const metaFields = fields.concat(options.customMetaTags);

  // find all of the open graph info in the meta tags
  $('meta').each((index, meta) => {
    if (!meta.attribs || (!meta.attribs.property && !meta.attribs.name)) return;
    const property = meta.attribs.property || meta.attribs.name;
    const content = meta.attribs.content || meta.attribs.value;
    metaFields.forEach((item) => {
      if (property.toLowerCase() === item.property.toLowerCase()) {
        if (!item.multiple) {
          ogObject[item.fieldName] = content;
        } else if (!ogObject[item.fieldName]) {
          ogObject[item.fieldName] = [content];
        } else if (Array.isArray(ogObject[item.fieldName])) {
          ogObject[item.fieldName].push(content);
        }
      }
    });
  });

  // set ogImage to ogImageSecureURL/ogImageURL if there is no ogImage
  if (!ogObject.ogImage && ogObject.ogImageSecureURL) {
    ogObject.ogImage = ogObject.ogImageSecureURL;
  } else if (!ogObject.ogImage && ogObject.ogImageURL) {
    ogObject.ogImage = ogObject.ogImageURL;
  }

  // formats the multiple media values
  ogObject = media.mediaSetup(ogObject, options);

  // if onlyGetOpenGraphInfo isn't set, run the open graph fallbacks
  if (!options.onlyGetOpenGraphInfo) {
    ogObject = fallback(ogObject, options, $);
  }

  // removes any undefs
  ogObject = utils.removeNestedUndefinedValues(ogObject);

  return ogObject;
};

/*
 * request and results formatter
 * @param string options - options the user has set
 * @param function callback
 */
const requestAndResultsFormatter = async (options) => {
  const requestUrl = options.url;
  delete options.url; // setting options.url messes with got

  return request.get(requestUrl, options)
    .then((response) => {
      options.url = requestUrl;
      let formatBody = response.body;

      if (response && response.statusCode && (response.statusCode.toString().substring(0, 1) === '4' || response.statusCode.toString().substring(0, 1) === '5')) {
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
        ogObject.charset = charset.find(response.headers, formatBody, options.peekSize);
      }
      ogObject.requestUrl = options.url;
      ogObject.success = true;

      return { ogObject, response };
    })
    .catch((error) => {
      options.url = requestUrl;
      if (error instanceof Error) throw error;
      throw new Error(error);
    });
};

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

  const validate = utils.validate(options.url, options.timeout);

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
    }
    if (exception instanceof Error) throw exception;
    throw new Error('Page not found');
  }
};

module.exports = setOptionsAndReturnOpenGraphResults;
