const validator = require('validator');

/*
 * validate inputs
 * @param string var - input
 * @param function callback
 */
const validateInputs = (input) => {
  // eslint-disable-next-line no-restricted-globals
  if (!(input === null || typeof input === 'undefined' || !input || input.length < 1 || !isNaN(input))) return true;
  return false;
};

/*
 * validate isUrlValid
 * @param string var - input
 * @param function callback
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
 * @param function callback
 */
const validateUrl = (inputUrl) => {
  let returnUrl = inputUrl;
  if (!/^(f|ht)tps?:\/\//i.test(returnUrl)) returnUrl = `http://${returnUrl}`;
  return returnUrl;
};

/*
 * validate timeout - how long should we wait for a request
 * @param number var - the time we want to wait
 * @param function callback
 */
const validateTimeout = (inputTimeout) => {
  if (typeof inputTimeout === 'string' || inputTimeout instanceof String) return false;
  if (!/^\d{1,10}$/.test(inputTimeout)) return false;
  return true;
};

/*
 * validate
 * @param string var - user input url and timeout
 * @param function callback
 */
exports.validate = (inputUrl, inputTimeout) => {
  let returnInputUrl = null;
  let returnInputTimeout = 2000; // time defaults to 2000ms

  if (validateInputs(inputUrl) && isUrlValid(inputUrl)) returnInputUrl = validateUrl(inputUrl);

  if (validateTimeout(inputTimeout)) returnInputTimeout = inputTimeout;

  return { returnInputUrl, returnInputTimeout };
};
