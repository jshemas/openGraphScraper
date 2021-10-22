const chardet = require('chardet');
const iconv = require('iconv-lite');
const got = require('got');

const charset = require('./charset');
const { extractMetaTags } = require('./extract');

/*
 * request and results formatter
 * @param string options - options the user has set
 */
exports.requestAndResultsFormatter = async (options) => {
  const requestUrl = options.url;
  delete options.url; // setting options.url messes with got

  // limit the size of the content we fetch when performing the request
  // from https://github.com/sindresorhus/got/blob/main/documentation/examples/advanced-creation.js#L40
  const gotClient = got.extend({
    handlers: [
      (requestOptions, next) => {
        const { downloadLimit, uploadLimit } = requestOptions;
        const promiseOrStream = next(requestOptions);

        // A destroy function that supports both promises and streams
        const destroy = (message) => {
          if (requestOptions.isStream) {
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

        if (typeof uploadLimit === 'number') {
          promiseOrStream.on('uploadProgress', (progress) => {
            if (progress.transferred > uploadLimit && progress.percent !== 1) {
              destroy(`Exceeded the upload limit of ${uploadLimit} bytes`);
            }
          });
        }

        return promiseOrStream;
      },
    ],
  });

  return gotClient.get(requestUrl, options)
    .then((response) => {
      options.url = requestUrl;
      let formatBody = response.body;

      if (response && response.statusCode && (response.statusCode.toString().substring(0, 1) === '4' || response.statusCode.toString().substring(0, 1) === '5')) {
        throw new Error('Server has returned a 400/500 error code');
      } else if (response.body === undefined) {
        throw new Error('Page not found');
      }

      const char = charset.find(response.headers, formatBody, options.peekSize) || chardet.detect(formatBody);
      if (char && typeof formatBody === 'object') {
        // eslint-disable-next-line no-useless-catch
        try {
          formatBody = iconv.decode(formatBody, char);
        } catch (exception) {
          throw exception;
        }
      } else {
        formatBody = formatBody.toString();
      }

      const ogObject = extractMetaTags(formatBody, options);

      if (!options.onlyGetOpenGraphInfo) {
        ogObject.charset = charset.find(response.headers, formatBody, options.peekSize);
      }
      ogObject.requestUrl = options.url;
      ogObject.success = true;

      // setting response.rawBody to the parsed body since response.body is a buffer
      response.rawBody = formatBody;

      return { ogObject, response };
    })
    .catch((error) => {
      options.url = requestUrl;
      if (error instanceof Error) throw error;
      throw new Error(error);
    });
};
