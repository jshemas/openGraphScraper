'use strict';

var charset = require('./charset');
var cheerio = require('cheerio');
var fields = require('./fields');
var iconv = require('iconv-lite');
var chardet = require('chardet');
var media = require('./media');
var request = require('request');
var url = require('url');
var utils = require('./utils');

/*
 * run
 * @param string options - options the user has set
 * @param function callback and promise
 */
exports.run = function (options, callback) {
  var hasCallback = typeof callback === 'function';
  return new Promise(function (resolve, reject) {
    setOptionsAndReturnOpenGraphResults(options, function (error, info, response) {
      if (error) {
        if (hasCallback) return callback(error, info, response);
        return reject(info);
      }
      if (hasCallback) return callback(error, info, response);
      return resolve(info);
    });
  });
};

/*
 * set options and return open graph results
 * @param string options - options the user has set
 * @param function callback
 */
var setOptionsAndReturnOpenGraphResults = function (options, callback) {
  if (options.html) {
    if (options.url) {
      return callback(true, { error: 'Must specify either `url` or `html`, not both', success: false, requestUrl: options.url, errorDetails: 'Must specify either `url` or `html`, not both' }, null);
    }
    var ogObject = extractMetaTags(options.html, options);
    return callback(false, { data: ogObject, success: true }, null);
  }

  var validate = utils.validate(options.url, options.timeout);

  if (validate.returnInputUrl) {
    options.url = validate.returnInputUrl;
    options.timeout = validate.returnInputTimeout;
    options.headers = Object.assign({
      'user-agent': 'request.js'
    }, options.headers);
    options.gzip = true;
    options.encoding = options.encoding || null;
    options.jar = options.jar || false;
    options.followAllRedirects = options.followAllRedirects || true;
    options.maxRedirects = options.maxRedirects || 20;

    if (process.browser) {
      options.gzip = false;
      options.protocol = url.parse(options.url).protocol;
    }

    // trying to limit non html pages
    if (utils.endsWith(validate.returnInputUrl, '.jpg') ||
      utils.endsWith(validate.returnInputUrl, '.jpeg') ||
      utils.endsWith(validate.returnInputUrl, '.png') ||
      utils.endsWith(validate.returnInputUrl, '.zip') ||
      utils.endsWith(validate.returnInputUrl, '.pdf')) {
      return callback(true, { error: 'Must scrape an HTML page', success: false, requestUrl: options.url, errorDetails: 'Must scrape an HTML page' }, null);
    }

    // see if site is black listed
    if (options.blacklist && options.blacklist.length > 0) {
      for (var i = 0; i < options.blacklist.length; i++) {
        if (options.url.indexOf(options.blacklist[i]) !== -1) {
          return callback(true, { error: 'Host Name Has Been Black Listed', success: false, requestUrl: options.url, errorDetails: 'Host Name Has Been Black Listed' }, null);
        }
      }
    }

    return requestAndResultsFormatter(options, function (error, results, response) {
      if (results) {
        return callback(false, { data: results, success: true, requestUrl: options.url }, response);
      }
      if (error && (error.code === 'ENOTFOUND' || error.code === 'EHOSTUNREACH')) {
        return callback(true, { error: 'Page Not Found', success: false, requestUrl: options.url, errorDetails: error, response: response }, response);
      } else if (error && error.code === 'ETIMEDOUT') {
        return callback(true, { error: 'Time Out', success: false, requestUrl: options.url, errorDetails: error, response: response }, response);
      }
      return callback(true, { error: 'Page Not Found', success: false, requestUrl: options.url, errorDetails: error, response: response }, response);
    });
  }

  return callback(true, { error: 'Invalid URL', success: false, requestUrl: options.url, errorDetails: 'Invalid URL' }, null);
};

/*
 * request and results formatter
 * @param string options - options the user has set
 * @param function callback
 */
var requestAndResultsFormatter = function (options, callback) {
  var peekSize = options.peekSize || 1024;

  request(options, function (error, response, body) {
    var formatBody = body;
    if (error) {
      return callback(error, null, response);
    } else if (response && response.statusCode && (response.statusCode.toString().substring(0, 1) === '4' || response.statusCode.toString().substring(0, 1) === '5')) {
      return callback('Server Has Ran Into A Error', null, response);
    }
    if (options.encoding === null) {
      var char = charset(response.headers, formatBody, peekSize) || chardet.detect(formatBody);
      if (char) {
        try {
          formatBody = iconv.decode(formatBody, char);
        } catch (ex) {
          return callback(ex, null, response);
        }
      } else {
        formatBody = formatBody.toString();
      }
    }

    var ogObject = extractMetaTags(formatBody, options);
    if (options.withCharset) {
      ogObject.charset = charset(response.headers, formatBody, peekSize);
    }
    return callback(null, ogObject, response);
  });
};

/*
 * extract meta tags from html string
 * @param string body - html string
 * @param string options - options the user has set
 */
var extractMetaTags = function (body, options) {
  var ogObject = {};
  var $ = cheerio.load(body);
  var meta = $('meta');
  var keys = Object.keys(meta);

  keys.forEach(function (key) {
    if (!(meta[key].attribs && (meta[key].attribs.property || meta[key].attribs.name))) {
      return;
    }
    var property = meta[key].attribs.property || meta[key].attribs.name;
    var content = meta[key].attribs.content || meta[key].attribs.value;
    fields.forEach(function (item) {
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
  ogObject.ogImage = ogObject.ogImage ? ogObject.ogImage : (ogObject.ogImageURL ? ogObject.ogImageURL : (ogObject.ogImageSecureURL ? ogObject.ogImageSecureURL : []));
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
    // eslint-disable-next-line no-undefined
    var ogImageFallback = options.ogImageFallback === undefined ? true : options.ogImageFallback;
    if (!ogObject.ogImage && ogImageFallback) {
      ogObject.ogImage = [];
      var supportedImageExts = ['jpg', 'jpeg', 'png'];
      // TODO: need to clean this up
      // eslint-disable-next-line consistent-return
      $('img').map(function (i, elem) {
        if ($(elem).attr('src') && $(elem).attr('src').length > 0 && supportedImageExts.indexOf($(elem).attr('src').split('.').pop()) !== -1) {
          ogObject.ogImage.push({
            url: $(elem).attr('src')
          });
          return false;
        }
      });
    }
  }

  // remove ogObject.ogImage is there is nothing found
  if (ogObject.ogImage === []) {
    delete ogObject.ogImage;
  }

  return ogObject;
};

module.exports = function (options, callback) {
  return exports.run(options, callback);
};
