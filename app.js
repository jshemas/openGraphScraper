var request = require('request'),
  cheerio = require('cheerio'),
  charset = require('charset'),
  iconv = require('iconv-lite'),
  url = require('url'),
  _ = require('lodash'),
  jschardet = require('jschardet');

module.exports = function (options, callback) {
  return exports.info(options, callback);
};

var fieldsArray = [
  {
    multiple: false,
    property: 'og:title',
    fieldName: 'ogTitle'
  },
  {
    multiple: false,
    property: 'og:type',
    fieldName: 'ogType'
  },
  {
    multiple: true,
    property: 'og:image',
    fieldName: 'ogImage'
  },
  {
    multiple: true,
    property: 'og:image:url',
    fieldName: 'ogImageURL'
  },
  {
    multiple: true,
    property: 'og:image:secure_url',
    fieldName: 'ogImageSecureURL'
  },
  {
    multiple: true,
    property: 'og:image:width',
    fieldName: 'ogImageWidth'
  },
  {
    multiple: true,
    property: 'og:image:height',
    fieldName: 'ogImageHeight'
  },
  {
    multiple: true,
    property: 'og:image:type',
    fieldName: 'ogImageType'
  },
  {
    multiple: false,
    property: 'og:url',
    fieldName: 'ogUrl'
  },
  {
    multiple: false,
    property: 'og:audio',
    fieldName: 'ogAudio'
  },
  {
    multiple: false,
    property: 'og:audio:url',
    fieldName: 'ogAudioURL'
  },
  {
    multiple: false,
    property: 'og:audio:secure_url',
    fieldName: 'ogAudioSecureURL'
  },
  {
    multiple: false,
    property: 'og:audio:type',
    fieldName: 'ogAudioType'
  },
  {
    multiple: false,
    property: 'og:description',
    fieldName: 'ogDescription'
  },
  {
    multiple: false,
    property: 'og:determiner',
    fieldName: 'ogDeterminer'
  },
  {
    multiple: false,
    property: 'og:locale',
    fieldName: 'ogLocale'
  },
  {
    multiple: false,
    property: 'og:locale:alternate',
    fieldName: 'ogLocaleAlternate'
  },
  {
    multiple: false,
    property: 'og:site_name',
    fieldName: 'ogSiteName'
  },
  {
    multiple: true,
    property: 'og:video',
    fieldName: 'ogVideo'
  },
  {
    multiple: true,
    property: 'og:video:url', // An alternative to 'og:video'
    fieldName: 'ogVideo'
  },
  {
    multiple: true,
    property: 'og:video:secure_url',
    fieldName: 'ogVideoSecureURL'
  },
  {
    multiple: true,
    property: 'og:video:width',
    fieldName: 'ogVideoWidth'
  },
  {
    multiple: true,
    property: 'og:video:height',
    fieldName: 'ogVideoHeight'
  },
  {
    multiple: true,
    property: 'og:video:type',
    fieldName: 'ogVideoType'
  },
  {
    multiple: false,
    property: 'twitter:card',
    fieldName: 'twitterCard'
  },
  {
    multiple: false,
    property: 'twitter:site',
    fieldName: 'twitterSite'
  },
  {
    multiple: false,
    property: 'twitter:site:id',
    fieldName: 'twitterSiteId'
  },
  {
    multiple: false,
    property: 'twitter:creator',
    fieldName: 'twitterCreator'
  },
  {
    multiple: false,
    property: 'twitter:creator:id',
    fieldName: 'twitterCreatorId'
  },
  {
    multiple: false,
    property: 'twitter:title',
    fieldName: 'twitterTitle'
  },
  {
    multiple: false,
    property: 'twitter:description',
    fieldName: 'twitterDescription'
  },
  {
    multiple: true,
    property: 'twitter:image',
    fieldName: 'twitterImage'
  },
  {
    multiple: true,
    property: 'twitter:image:height',
    fieldName: 'twitterImageHeight'
  },
  {
    multiple: true,
    property: 'twitter:image:width',
    fieldName: 'twitterImageWidth'
  },
  {
    multiple: true,
    property: 'twitter:image:src',
    fieldName: 'twitterImageSrc'
  },
  {
    multiple: true,
    property: 'twitter:image:alt',
    fieldName: 'twitterImageAlt'
  },
  {
    multiple: true,
    property: 'twitter:player',
    fieldName: 'twitterPlayer'
  },
  {
    multiple: true,
    property: 'twitter:player:width',
    fieldName: 'twitterPlayerWidth'
  },
  {
    multiple: true,
    property: 'twitter:player:height',
    fieldName: 'twitterPlayerHeight'
  },
  {
    multiple: true,
    property: 'twitter:player:stream',
    fieldName: 'twitterPlayerStream'
  },
  {
    multiple: false,
    property: 'twitter:app:name:iphone',
    fieldName: 'twitterAppNameiPhone'
  },
  {
    multiple: false,
    property: 'twitter:app:id:iphone',
    fieldName: 'twitterAppIdiPhone'
  },
  {
    multiple: false,
    property: 'twitter:app:url:iphone',
    fieldName: 'twitterAppUrliPhone'
  },
  {
    multiple: false,
    property: 'twitter:app:name:ipad',
    fieldName: 'twitterAppNameiPad'
  },
  {
    multiple: false,
    property: 'twitter:app:id:ipad',
    fieldName: 'twitterAppIdiPad'
  },
  {
    multiple: false,
    property: 'twitter:app:url:ipad',
    fieldName: 'twitterAppUrliPad'
  },
  {
    multiple: false,
    property: 'twitter:app:name:googleplay',
    fieldName: 'twitterAppNameGooglePlay'
  },
  {
    multiple: false,
    property: 'twitter:app:id:googleplay',
    fieldName: 'twitterAppIdGooglePlay'
  },
  {
    multiple: false,
    property: 'twitter:app:url:googleplay',
    fieldName: 'twitterAppUrlGooglePlay'
  }
];

var mediaMapperTwitterImage = function (item) {
  return {
    url: item[0],
    width: item[1],
    height: item[2],
    alt: item[3]
  };
};

var mediaMapperTwitterPlayer = function (item) {
  return {
    url: item[0],
    width: item[1],
    height: item[2],
    stream: item[3]
  };
};

var mediaMapper = function (item) {
  return {
    url: item[0],
    width: item[1],
    height: item[2],
    type: item[3]
  };
};

var mediaSorter = function (a, b) {
  if (!(a.url && b.url)) {
    return 0;
  }

  var aRes = a.url.match(/\.(\w{2,5})$/),
    aExt = (aRes && aRes[1].toLowerCase()) || null;
  var bRes = b.url.match(/\.(\w{2,5})$/),
    bExt = (bRes && bRes[1].toLowerCase()) || null;

  if (aExt === 'gif' && bExt !== 'gif') {
    return -1;
  } else if (aExt !== 'gif' && bExt === 'gif') {
    return 1;
  } else {
    return Math.max(b.width, b.height) - Math.max(a.width, a.height);
  }
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
  this.validateVars(options.url, options.timeout, function (inputUrl, inputTimeout) {
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
  });
};

/*
 * validate var
 * @param string var - user input
 * @param function callback
 */
exports.validateVars = function (inputUrl, inputTimeout, callback) {
  var returnInputUrl = null,
    returnInputTimeout = 2000; // time defaults to 2000ms

  if (!(inputUrl === null || typeof inputUrl === 'undefined' || !inputUrl || inputUrl.length < 1)) {
    returnInputUrl = this.validateUrl(inputUrl);
  }

  if (!(inputTimeout === null || typeof inputTimeout === 'undefined' || !inputTimeout || typeof inputTimeout !== 'number' || inputTimeout.length < 1) && this.validateTimeout(inputTimeout)) {
    returnInputTimeout = inputTimeout;
  }

  callback(returnInputUrl, returnInputTimeout);
};

/*
 * validate url - all urls must have http:// in front of them
 * @param string var - the url we want to scrape
 * @param function callback
 */
exports.validateUrl = function (inputUrl) {
  if (!/^(f|ht)tps?:\/\//i.test(inputUrl)) {
    inputUrl = 'http://' + inputUrl;
  }
  return inputUrl;
};

/*
 * validate timeout - how long should we wait for a request
 * @param number var - the time we want to wait
 * @param function callback
 */
exports.validateTimeout = function (inputTimeout) {
  if (!/^\d{1,10}$/.test(inputTimeout)) {
    return false;
  }
  return true;
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
        fieldsArray.forEach(function (item) {
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
        .map(mediaMapper).sort(mediaSorter);

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
        .map(mediaMapper).sort(mediaSorter);

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
        .map(mediaMapperTwitterImage).sort(mediaSorter);

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
        .map(mediaMapperTwitterPlayer).sort(mediaSorter);

      // Delete temporary fields
      fieldsArray.filter(function (item) {
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
