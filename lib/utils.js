/*
 * validate inputs
 * @param string var - input
 * @param function callback
 */
const validateInputs = (input) => {
  if (!(input === null || typeof input === 'undefined' || !input || input.length < 1)) return true;
  return false;
};

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

  if (validateInputs(inputUrl)) returnInputUrl = validateUrl(inputUrl);

  if (validateInputs(inputUrl) && validateTimeout(inputTimeout)) returnInputTimeout = inputTimeout;

  return { returnInputUrl, returnInputTimeout };
};
