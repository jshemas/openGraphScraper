'use strict';

var request = require('request'),
  cheerio = require('cheerio'),
  charset = require('charset'),
  iconv = require('iconv-lite'),
  url = require('url'),
  _ = require('lodash'),
  jschardet = require('jschardet');

const fields = require('./fields');
const utils = require('./utils');
const media = require('./media');

module.exports = function (options, callback) {
  return exports.info(options, callback);
};

/*
 * Promised info
 */
exports.info = function (options, callback) {
  var that = this;
  return new Promise(function (resolve, reject) {
    var hasCallback = typeof callback === 'function';
    var done = function (error, info, response) {
      if (error) {
        if (hasCallback) {
          callback(error, info, response);
        }
        return reject(error, response);
      }
      if (hasCallback) {
        callback(error, info, response);
      }
      return resolve(info, response);
    };
    that.getInfo(options, done);
  })
    .catch(function (error) {
      if (error) console.log('Open Graph Error: ', error);
      // there was a error passed back
    });
};

/*
 * get info
 * @param string url - user input of url
 * @param function callback
 */
exports.getInfo = function (options, callback) {
  var error = false,
    returnResult = {},
    that = this;

  let validate = utils.validate(options.url, options.timeout);
  let inputUrl = validate.returnInputUrl;
  let inputTimeout = validate.returnInputTimeout;

  if (inputUrl) {
    options.url = inputUrl;
    options.timeout = inputTimeout;
    options.headers = Object.assign({
      'user-agent': 'request.js'
    }, options.headers);
    options.gzip = true;
    options.encoding = options.encoding || null;
    if (process.browser) {
      options.gzip = false;
      options.protocol = url.parse(options.url).protocol;
    }
    options.jar = request.jar();
    that.getOG(options, function (err, results, response) {
      if (results) {
        returnResult = {
          data: results,
          success: true
        };
      } else {
        if (err && (err.code === 'ENOTFOUND' || err.code === 'EHOSTUNREACH')) {
          error = true;
          returnResult = {
            err: 'Page Not Found',
            success: false,
            errorDetails: err
          };
        } else if (err && err.code === 'ETIMEDOUT') {
          error = true;
          returnResult = {
            err: 'Time Out',
            success: false,
            errorDetails: err
          };
        } else if (err && err === 'Must scrape an HTML page') {
          error = true;
          returnResult = {
            err: 'Must scrape an HTML page',
            success: false,
            errorDetails: err
          };
        } else {
          error = true;
          returnResult = {
            err: 'Page Not Found',
            success: false,
            errorDetails: err
          };
        }
      }
      callback(error, returnResult, response);
    });
  } else {
    callback(true, {
      success: false,
      err: 'Invalid URL'
    });
  }
};

/*
 * getOG - scrape that url!
 * @param string url - the url we want to scrape
 * @param function callback
 */
exports.getOG = function (options, callback) {
  var peekSize = options.peekSize || 1024;
  var ogImageFallback = options.ogImageFallback === undefined ? true : options.ogImageFallback;
  request(options, function (err, response, body) {
    if (err) {
      callback(err, null, response);
    } else if (response && response.statusCode && (response.statusCode.toString().substring(0, 1) === '4' || response.statusCode.toString().substring(0, 1) === '5')) {
      callback(new Error('Error from server'), null, response);
    } else if (!(response && response.headers && response.headers['content-type'] && response.headers['content-type'].indexOf('text/html') !== -1)) {
      callback('Must scrape an HTML page', null, response);
    } else {
      if (options.encoding === null) {
        var char = charset(response.headers, body, peekSize) || jschardet.detect(body).encoding;
        if (char) {
          body = iconv.decode(body, char);
        } else {
          body = body.toString();
        }
      }
      var $ = cheerio.load(body),
        meta = $('meta'),
        keys = Object.keys(meta),
        ogObject = {};

      if (options.withCharset) {
        ogObject.charset = charset(response.headers, body, peekSize);
      }

      keys.forEach(function (key) {
        if (!(meta[key].attribs && (meta[key].attribs.property || meta[key].attribs.name))) {
          return;
        }
        var property = meta[key].attribs.property || meta[key].attribs.name,
          content = meta[key].attribs.content;
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
      ogObject.ogImage = ogObject.ogImage ? ogObject.ogImage : (ogObject.ogImageURL ? ogObject.ogImageURL : (ogObject.ogImageSecureURL ? ogObject.ogImageSecureURL : []));
      if (!ogObject.ogImage || !ogObject.ogImage.length) {
        delete ogObject['ogImage'];
      }

      /* Combine image/width/height/type
        and sort for priority */
      if (ogObject.ogImage || ogObject.ogImageWidth || ogObject.twitterImageHeight || ogObject.ogImageType) {
        ogObject.ogImage = ogObject.ogImage ? ogObject.ogImage : [null];
        ogObject.ogImageWidth = ogObject.ogImageWidth ? ogObject.ogImageWidth : [null];
        ogObject.ogImageHeight = ogObject.ogImageHeight ? ogObject.ogImageHeight : [null];
        ogObject.ogImageType = ogObject.ogImageType ? ogObject.ogImageType : [null];
      }
      var ogImages = _.zip(ogObject.ogImage,
        ogObject.ogImageWidth,
        ogObject.ogImageHeight,
        ogObject.ogImageType)
        .map(media.mediaMapper).sort(media.mediaSorter);

      /* Combine video/width/height/type
        and sort for priority */
      if (ogObject.ogVideo || ogObject.ogVideoWidth || ogObject.ogVideoHeight || ogObject.ogVideoType) {
        ogObject.ogVideo = ogObject.ogVideo ? ogObject.ogVideo : [null];
        ogObject.ogVideoWidth = ogObject.ogVideoWidth ? ogObject.ogVideoWidth : [null];
        ogObject.ogVideoHeight = ogObject.ogVideoHeight ? ogObject.ogVideoHeight : [null];
        ogObject.ogVideoType = ogObject.ogVideoType ? ogObject.ogVideoType : [null];
      }
      var ogVideos = _.zip(ogObject.ogVideo,
        ogObject.ogVideoWidth,
        ogObject.ogVideoHeight,
        ogObject.ogVideoType)
        .map(media.mediaMapper).sort(media.mediaSorter);

      /* Combine twitter image/width/height/alt
        and sort for priority */
      if (ogObject.twitterImageSrc || ogObject.twitterImage || ogObject.twitterImageWidth || ogObject.twitterImageHeight || ogObject.twitterImageAlt) {
        ogObject.twitterImage = ogObject.twitterImage ? ogObject.twitterImage : ogObject.twitterImageSrc;
        ogObject.twitterImage = ogObject.twitterImage ? ogObject.twitterImage : [null];
        ogObject.twitterImageWidth = ogObject.twitterImageWidth ? ogObject.twitterImageWidth : [null];
        ogObject.twitterImageHeight = ogObject.twitterImageHeight ? ogObject.twitterImageHeight : [null];
        ogObject.twitterImageAlt = ogObject.twitterImageAlt ? ogObject.twitterImageAlt : [null];
      }
      var twitterImages = _.zip(ogObject.twitterImage,
        ogObject.twitterImageWidth,
        ogObject.twitterImageHeight,
        ogObject.twitterImageAlt)
        .map(media.mediaMapperTwitterImage).sort(media.mediaSorter);

      /* Combine twitter player/width/height/stream
        and sort for priority */
      if (ogObject.twitterPlayer || ogObject.twitterPlayerWidth || ogObject.twitterPlayerHeight || ogObject.twitterPlayerStream) {
        ogObject.twitterPlayer = ogObject.twitterPlayer ? ogObject.twitterPlayer : [null];
        ogObject.twitterPlayerWidth = ogObject.twitterPlayerWidth ? ogObject.twitterPlayerWidth : [null];
        ogObject.twitterPlayerHeight = ogObject.twitterPlayerHeight ? ogObject.twitterPlayerHeight : [null];
        ogObject.twitterPlayerStream = ogObject.twitterPlayerStream ? ogObject.twitterPlayerStream : [null];
      }
      var twitterPlayers = _.zip(ogObject.twitterPlayer,
        ogObject.twitterPlayerWidth,
        ogObject.twitterPlayerHeight,
        ogObject.twitterPlayerStream)
        .map(media.mediaMapperTwitterPlayer).sort(media.mediaSorter);

      // Delete temporary fields
      fields.filter(function (item) {
        return item.multiple;
      }).forEach(function (item) {
        delete ogObject[item.fieldName];
      });

      // Select the best image
      if (ogImages.length) {
        if (options.allMedia) {
          ogObject.ogImage = ogImages;
        } else {
          ogObject.ogImage = ogImages[0];
        }
      }

      // Select the best video
      if (ogVideos.length) {
        if (options.allMedia) {
          ogObject.ogVideo = ogVideos;
        } else {
          ogObject.ogVideo = ogVideos[0];
        }
      }

      // Select the best twitter image
      if (twitterImages.length) {
        if (options.allMedia) {
          ogObject.twitterImage = twitterImages;
        } else {
          ogObject.twitterImage = twitterImages[0];
        }
      }

      // Select the best player
      if (twitterPlayers.length) {
        if (options.allMedia) {
          ogObject.twitterPlayer = twitterPlayers;
        } else {
          ogObject.twitterPlayer = twitterPlayers[0];
        }
      }

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
        if (!ogObject.ogImage && ogImageFallback) {
          var supportedImageExts = ['jpg', 'jpeg', 'png'];
          $('img').each(function (i, elem) {
            if ($(elem).attr('src') && $(elem).attr('src').length > 0 && supportedImageExts.indexOf($(elem).attr('src').split('.').pop()) !== -1) {
              ogObject.ogImage = {
                url: $(elem).attr('src')
              };
              return false;
            }
          });
        }
      }
      // console.log('ogObject',ogObject);
      callback(null, ogObject, response);
    }
  });
};
