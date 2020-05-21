const puppeteer = require('puppeteer');
var charset = require('./charset');
var cheerio = require('cheerio');
var fields = require('./fields');
var iconv = require('iconv-lite');
var chardet = require('chardet');
var media = require('./media');
var utils = require('./utils');

module.exports = async (options) => {
  if (options.html) {
    if (options.url) {
      return {
        error: 'Must specify either `url` or `html`, not both',
        success: false,
        requestUrl: options.url,
        errorDetails: 'Must specify either `url` or `html`, not both'
      };
    }

    let ogInfo = extractMetaTags(options.html, options);
    return {
      success: true,
      requestUrl: options.url,
      data: ogInfo
    };
  }

  var validate = utils.validate(options.url, options.timeout);
  if (!validate.returnInputUrl) {
    return {
      error: 'Invalid URL',
      success: false,
      requestUrl: options.url,
      errorDetails: 'Invalid URL'
    };
  }

  options.url = validate.returnInputUrl;
  options.timeout = validate.returnInputTimeout;

  // trying to limit non html pages
  if (utils.endsWith(options.url, '.jpg') ||
    utils.endsWith(options.url, '.jpeg') ||
    utils.endsWith(options.url, '.png') ||
    utils.endsWith(options.url, '.zip') ||
    utils.endsWith(options.url, '.pdf')) {
    return {
      error: 'Must scrape an HTML page',
      success: false,
      requestUrl: options.url,
      errorDetails: 'Must scrape an HTML page'
    };
  }

  // see if site is black listed
  if (options.blacklist && options.blacklist.length > 0) {
    for (var i = 0; i < options.blacklist.length; i++) {
      if (options.url.indexOf(options.blacklist[i]) !== -1) {
        return {
          error: 'Host Name Has Been Black Listed',
          success: false,
          requestUrl: options.url,
          errorDetails: 'Host Name Has Been Black Listed'
        };
      }
    }
  }

  // TODO: do i need to set some kind of encoding, like utf8? (options.encoding)
  // TODO: do i need to still support cookie jar? (options.jar)
  // TODO: remove options.followAllRedirects/options.maxRedirect, it looks like it will always followAllRedirects
  const browser = await puppeteer.launch({});
  var page = await browser.newPage();

  await page.setRequestInterception(true);
  await page.on('request', request => {
    // TODO: need to add options.headers here
    const headers = Object.assign({}, request.headers(), {
      'Accept-Encoding': 'gzip'
    });
    request.continue({headers});
  });

  try {
    const response = await page.goto(options.url, {waitUntil: 'networkidle2', timeout: options.timeout});

    let bodyHTML = await page.evaluate(() => document.documentElement.innerHTML);
    await browser.close();

    const peekSize = options.peekSize || 1024;
    const responseHeaders = response.headers();
    if (options.encoding === null) {
      var char = charset(responseHeaders, bodyHTML, peekSize) || chardet.detect(bodyHTML);
      if (char) {
        try {
          bodyHTML = iconv.decode(bodyHTML, char);
        } catch (error) {
          return {
            error: 'Error while finding charset',
            success: false,
            requestUrl: options.url,
            errorDetails: error
          };
        }
      } else {
        bodyHTML = bodyHTML.toString();
      }
    }

    let ogInfo = extractMetaTags(bodyHTML, options);
    if (options.withCharset) {
      ogInfo.charset = charset(responseHeaders, bodyHTML, peekSize);
    }

    return {
      success: true,
      requestUrl: options.url,
      data: ogInfo
    };
  } catch (error) {
    // add error case for 400's/500's what happens?

    let ogsObject = {
      error: 'Page Not Found',
      success: false,
      requestUrl: options.url,
      errorDetails: error
    };

    console.log('------');
    console.log('error.message:', error.message);
    console.log('------');

    if (error.message.startsWith('net::ERR_NAME_NOT_RESOLVED')) {
      ogsObject = {
        error: 'Page Not Found',
        success: false,
        requestUrl: options.url,
        errorDetails: error
      };
    } else if (error.message.startsWith('Navigation timeout of')) {
      ogsObject = {
        error: 'Time Out',
        success: false,
        requestUrl: options.url,
        errorDetails: error
      };
    }

    await browser.close();
    return ogsObject;
  }
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
