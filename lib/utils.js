const validator = require('validator');

/*
 * validates the url
 * @param string var - the url we want to scrape
 */
exports.isUrlValid = (url, urlValidatorSettings) => typeof url === 'string' && url.length > 0 && validator.isURL(url, urlValidatorSettings);

/*
 * forces url to start with http://
 * @param string var - the url we want to scrape
 */
const coerceUrl = (url) => (/^(f|ht)tps?:\/\//i.test(url) ? url : `http://${url}`);

/*
 * validates url
 * @param string var - user input url
 */
exports.validate = (url, urlValidatorSettings) => ({
  url: this.isUrlValid(url, urlValidatorSettings) ? coerceUrl(url) : null,
});

/*
 * findImageTypeFromUrl
 * @param string url - image url
 */
exports.findImageTypeFromUrl = (url) => {
  let type = url.split('.').pop();
  [type] = type.split('?');
  return type;
};

/*
 * isImageTypeValid
 * @param string type - image type
 */
exports.isImageTypeValid = (type) => {
  const validImageTypes = ['apng', 'bmp', 'gif', 'ico', 'cur', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'tif', 'tiff', 'webp'];
  return validImageTypes.includes(type);
};

/*
 * isThisANonHTMLPage
 * @param string url - url of site
 */
exports.isThisANonHTMLUrl = (url) => {
  const invalidImageTypes = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.3gp', '.avi', '.mov', '.mp4', '.m4v', '.m4a', '.mp3', '.mkv', '.ogv', '.ogm', '.ogg', '.oga', '.webm', '.wav', '.bmp', '.gif', '.jpg', '.jpeg', '.png', '.webp', '.zip', '.rar', '.tar', '.tar.gz', '.tgz', '.tar.bz2', '.tbz2', '.txt', '.pdf'];
  const extension = this.findImageTypeFromUrl(url);
  return invalidImageTypes.some((type) => `.${extension}`.includes(type));
};

/*
 * removeNestedUndefinedValues
 * @param object object - an object
 */
exports.removeNestedUndefinedValues = (object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (value && typeof value === 'object') this.removeNestedUndefinedValues(value);
    else if (value === undefined) delete object[key];
  });
  return object;
};

/*
 * optionSplit
 * @param object object - the options given to OGS
 */
exports.optionSetupAndSplit = (options) => {
  const ogsOptions = {
    allMedia: false,
    customMetaTags: [],
    downloadLimit: 1000000,
    ogImageFallback: true,
    onlyGetOpenGraphInfo: false,
    peekSize: 1024,
    urlValidatorSettings: {
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
    },
    ...options,
  };
  const gotOptions = {
    decompress: true,
    followRedirect: true,
    headers: {},
    maxRedirects: 10,
    responseType: 'buffer',
    ...options,
  };

  if (gotOptions.encoding === null) {
    // eslint-disable-next-line no-console
    console.log('Setting `options.encoding` to `null` has been deprecated. You should no longer need to do this.');
    gotOptions.encoding = 'utf8';
  }

  if (process.browser) {
    gotOptions.decompress = false;
  }

  // remove any OGS options from gotOptions since this will cause errors in got
  delete gotOptions.allMedia;
  delete gotOptions.blacklist;
  delete gotOptions.customMetaTags;
  delete gotOptions.downloadLimit;
  delete gotOptions.ogImageFallback;
  delete gotOptions.onlyGetOpenGraphInfo;
  delete gotOptions.peekSize;
  delete gotOptions.urlValidatorSettings;

  return { ogsOptions, gotOptions };
};

/*
 * gotClient
 * limit the size of the content we fetch when performing the request
 * from https://github.com/sindresorhus/got/blob/main/documentation/examples/advanced-creation.js
 */
exports.gotClient = async (downloadLimit) => {
  // https://github.com/sindresorhus/got/issues/1789
  // eslint-disable-next-line import/no-unresolved
  const { got } = await import('got');

  return got.extend({
    handlers: [
      (options, next) => {
        const promiseOrStream = next(options);

        const destroy = (message) => {
          if (options.isStream) {
            promiseOrStream.destroy(new Error(message));
            return;
          }
          promiseOrStream.cancel(message);
        };

        if (typeof downloadLimit === 'number') {
          promiseOrStream.on('downloadProgress', (progress) => {
            if (progress.transferred > downloadLimit && progress.percent !== 1) {
              destroy(`Exceeded the download limit of ${downloadLimit} bytes`);
            }
          });
        }

        return promiseOrStream;
      },
    ],
  });
};
