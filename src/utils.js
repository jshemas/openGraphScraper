'use strict';

/*
 * ends with
 * @param string input - user input url
 * @param string suffix - what might be at the end of the input
 * @param function callback
 */
exports.endsWith = function (input, suffix) {
  return input.indexOf(suffix, input.length - suffix.length) !== -1;
};

/*
 * validate
 * @param string var - user input url and timeout
 * @param function callback
 */
exports.validate = function (inputUrl, inputTimeout) {
  let returnInputUrl = null;
  let returnInputTimeout = 2000; // time defaults to 2000ms

  if (validateInputs(inputUrl)) returnInputUrl = validateUrl(inputUrl);

  if (validateInputs(inputUrl) && validateTimeout(inputTimeout)) returnInputTimeout = inputTimeout;

  return {returnInputUrl, returnInputTimeout};
};

/*
 * validate inputs
 * @param string var - input
 * @param function callback
 */
const validateInputs = function (input) {
  if (!(input === null || typeof input === 'undefined' || !input || input.length < 1)) return true;
  return false;
};

/*
 * validate url - all urls must have http:// in front of them
 * @param string var - the url we want to scrape
 * @param function callback
 */
const validateUrl = function (inputUrl) {
  if (!/^(f|ht)tps?:\/\//i.test(inputUrl)) inputUrl = 'http://' + inputUrl;
  return inputUrl;
};

/*
 * validate timeout - how long should we wait for a request
 * @param number var - the time we want to wait
 * @param function callback
 */
const validateTimeout = function (inputTimeout) {
  if (!/^\d{1,10}$/.test(inputTimeout)) return false;
  return true;
};
