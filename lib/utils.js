const validator = require('validator');
const got = require('got');

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
 * validate timeout - how long should we wait for a request
 * @param number var - the time we want to wait
 */
const isTimeoutValid = (timeout) => typeof timeout === 'number' && /^\d{1,10}$/.test(timeout);

/*
 * validates url and timeout
 * @param string var - user input url and timeout
 */
exports.validate = (url, timeout, urlValidatorSettings) => ({
  url: this.isUrlValid(url, urlValidatorSettings) ? coerceUrl(url) : null,
  timeout: isTimeoutValid(timeout) ? timeout : 2000,
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
 * gotClient
 * limit the size of the content we fetch when performing the request
 * from https://github.com/sindresorhus/got/blob/main/documentation/examples/advanced-creation.js
 */
exports.gotClient = got.extend({
  handlers: [
    (options, next) => {
      const { downloadLimit } = options;
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
