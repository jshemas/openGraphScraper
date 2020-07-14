const validator = require('validator');

/*
 * validates the url
 * @param string var - the url we want to scrape
 */
exports.isUrlValid = (url) => typeof url === 'string' && url.length > 0 && validator.isURL(url, [{
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
}]);

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
exports.validate = (url, timeout) => ({
  url: this.isUrlValid(url) ? coerceUrl(url) : null,
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
 * removeNestedUndefinedValues
 * @param string type - image type
 */
exports.removeNestedUndefinedValues = (object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (value && typeof value === 'object') this.removeNestedUndefinedValues(value);
    else if (value === undefined) delete object[key];
  });
  return object;
};
