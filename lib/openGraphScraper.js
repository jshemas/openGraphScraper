/* eslint-disable no-param-reassign */

const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const chardet = require('chardet');
const request = require('got');
const url = require('url');
const media = require('./media');
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
  const meta = $('meta');
  const keys = Object.keys(meta);

  keys.forEach((key) => {
    if (!(meta[key].attribs && (meta[key].attribs.property || meta[key].attribs.name))) {
      return;
    }
    const property = meta[key].attribs.property || meta[key].attribs.name;
    const content = meta[key].attribs.content || meta[key].attribs.value;
    fields.forEach((item) => {
      if (property === item.property) {
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

  // set the ogImage or fallback to ogImageURL or ogImageSecureURL
  // TODO: need to clean this up
  // eslint-disable-next-line no-nested-ternary
  ogObject.ogImage = ogObject.ogImage
    ? ogObject.ogImage
    // eslint-disable-next-line no-nested-ternary
    : (ogObject.ogImageURL ? ogObject.ogImageURL : (ogObject.ogImageSecureURL ? ogObject.ogImageSecureURL : []));
  if (!ogObject.ogImage || !ogObject.ogImage.length) {
    delete ogObject.ogImage;
  }

  // sets up all the media stuff
  ogObject = media.mediaSetup(ogObject, options);

  // Check for 'only get open graph info'
  if (!options.onlyGetOpenGraphInfo) {
    // Get title tag if og title was not provided
    if (!ogObject.ogTitle && $('head > title').text() && $('head > title').text().length > 0) {
      ogObject.ogTitle = $('head > title').text();
    }
    // Get meta description tag if og description was not provided
    if (!ogObject.ogDescription && $('head > meta[name="description"]').attr('content') && $('head > meta[name="description"]').attr('content').length > 0) {
      ogObject.ogDescription = $('head > meta[name="description"]').attr('content');
    }
    // Get first image as og:image if there is no og:image tag.
    const ogImageFallback = options.ogImageFallback === undefined ? true : options.ogImageFallback;
    if (!ogObject.ogImage && ogImageFallback) {
      ogObject.ogImage = [];
      const supportedImageExts = ['jpg', 'jpeg', 'png'];
      // TODO: need to clean this up
      $('img').map((i, elem) => {
        if ($(elem).attr('src') && $(elem).attr('src').length > 0 && supportedImageExts.indexOf($(elem).attr('src').split('.').pop()) !== -1) {
          ogObject.ogImage.push({
            url: $(elem).attr('src'),
          });
        }
        return false;
      });
    }
  }

  // remove ogObject.ogImage is there is nothing found
  if (ogObject.ogImage && ogObject.ogImage.length === 0) {
    delete ogObject.ogImage;
  }

  return ogObject;
};

/*
 * request and results formatter
 * @param string options - options the user has set
 * @param function callback
 */
const requestAndResultsFormatter = async (options) => {
  const peekSize = options.peekSize || 1024;
  const requestUrl = options.url;
  delete options.url;

  return request.get(requestUrl, options)
    .then((response) => {
      options.url = requestUrl;
      let formatBody = response.body;
      if (response && response.statusCode && (response.statusCode.toString().substring(0, 1) === '4' || response.statusCode.toString().substring(0, 1) === '5')) {
        throw new Error('Server has returned a 400/500 error code');
      } else if (response.body === undefined) {
        throw new Error('Page not found');
      }
      if (options.runChar) {
        const char = charset(response.headers, formatBody, peekSize) || chardet.detect(formatBody);
        if (char) {
          // eslint-disable-next-line no-useless-catch
          try {
            formatBody = iconv.decode(formatBody, char);
          } catch (exception) {
            throw exception;
          }
        } else {
          formatBody = formatBody.toString();
        }
      }

      const ogObject = extractMetaTags(formatBody, options);
      if (options.withCharset) {
        ogObject.charset = charset(response.headers, formatBody, peekSize);
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
  if (options.html) {
    if (options.url) {
      throw new Error('Must specify either `url` or `html`, not both');
    }
    const ogObject = extractMetaTags(options.html, options);
    ogObject.requestUrl = null;
    ogObject.success = true;
    return { ogObject, response: { body: options.html } };
  }

  const validate = utils.validate(options.url, options.timeout);

  if (!validate.returnInputUrl) throw new Error('Invalid URL');

  options.url = validate.returnInputUrl;
  options.timeout = validate.returnInputTimeout;
  options.decompress = options.decompress || true;
  options.followAllRedirects = options.followAllRedirects || true;
  options.maxRedirects = options.maxRedirects || 20;
  options.retry = options.retry || 2;

  if (options.encoding === null) {
    options.runChar = true;
    options.encoding = 'utf8';
    options.responseType = 'buffer';
  } else {
    options.encoding = options.encoding || 'utf8';
  }

  if (process.browser) {
    options.decompress = false;
    options.protocol = url.parse(options.url).protocol;
  }

  // trying to limit non html pages
  if (validate.returnInputUrl.includes('.jpg')
    || validate.returnInputUrl.includes('.jpeg')
    || validate.returnInputUrl.includes('.png')
    || validate.returnInputUrl.includes('.mp3')
    || validate.returnInputUrl.includes('.zip')
    || validate.returnInputUrl.includes('.pdf')) {
    throw new Error('Must scrape an HTML page');
  }

  // see if site is black listed
  if (options.blacklist && options.blacklist.length > 0) {
    for (let i = 0; i < options.blacklist.length; i += 1) {
      if (options.url.indexOf(options.blacklist[i]) !== -1) {
        throw new Error('Host name has been black listed');
      }
    }
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
      results = await setOptionsAndReturnOpenGraphResults(options);
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
  // eslint-disable-next-line no-async-promise-executor, promise/avoid-new
  return new Promise(async (resolve, reject) => {
    let results;
    try {
      results = await setOptionsAndReturnOpenGraphResults(options);
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
      return reject(returnError);
    }
    const returnValues = {
      error: false,
      result: results.ogObject,
      response: results.response,
    };
    return resolve(returnValues);
  });
};

module.exports = (options, callback) => exports.run(options, callback);
