const validator = require('validator');

/*
 * validate inputs
 * @param string var - input
 */
const validateInputs = (input) => {
  // eslint-disable-next-line no-restricted-globals
  if (!(input === null || typeof input === 'undefined' || !input || input.length < 1 || !isNaN(input))) return true;
  return false;
};

/*
 * validate isUrlValid
 * @param string var - input
 */
const isUrlValid = (url) => validator.isURL(url, [{
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
 * validate url - all urls must have http:// in front of them
 * @param string var - the url we want to scrape
 */
const validateUrl = (inputUrl) => {
  let returnUrl = inputUrl;
  if (!/^(f|ht)tps?:\/\//i.test(returnUrl)) returnUrl = `http://${returnUrl}`;
  return returnUrl;
};

/*
 * validate timeout - how long should we wait for a request
 * @param number var - the time we want to wait
 */
const validateTimeout = (inputTimeout) => {
  if (typeof inputTimeout === 'string' || inputTimeout instanceof String) return false;
  if (!/^\d{1,10}$/.test(inputTimeout)) return false;
  return true;
};

/*
 * validate
 * @param string var - user input url and timeout
 */
exports.validate = (inputUrl, inputTimeout) => {
  let returnInputUrl = null;
  let returnInputTimeout = 2000; // time defaults to 2000ms

  if (validateInputs(inputUrl) && isUrlValid(inputUrl)) returnInputUrl = validateUrl(inputUrl);

  if (validateTimeout(inputTimeout)) returnInputTimeout = inputTimeout;

  return { returnInputUrl, returnInputTimeout };
};

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
