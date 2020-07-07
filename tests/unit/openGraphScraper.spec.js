const got = require('got');
const chardet = require('chardet');
const iconv = require('iconv-lite');
const openGraphScraper = require('../../index');
const charset = require('../../lib/charset');

const basicHTML = `
  <html>
    <head>
      <meta charset="utf-8">
      <meta property="og:description" content="test description">
      <meta property="og:title" content="test page">
    </head>
    <body>
      <h1>hello test page</h1>
      <img width="360" src="test.png" alt="test">
      <img width="360" alt="test2">
    </body>
  </html>`;

const multipleImageHTML = `
  <html>
    <head>
      <title>test page</title>
      <meta property="og:image" content="test1.png">
      <meta property="og:image" content="test2.png">
    </head>
    <body>
      <h1>hello test page</h1>
    </body>
  </html>`;

const metaDescriptionHTML = `
  <html>
    <head>
      <title>test page</title>
      <meta name="description" content="test description from meta">
    </head>
    <body>
      <h1>hello test page</h1>
    </body>
  </html>`;

const encodingHTML = `
  <html>
    <head>
      <title>тестовая страница</title>
      <meta property="og:description" content="привет тестовая страница<">
    </head>
    <body>
      <h1>привет тестовая страница<</h1>
    </body>
  </html>`;

const sandbox = sinon.createSandbox();

describe('return openGraphScraper', function () {
  afterEach(function () {
    sandbox.restore();
  });

  context('should be able to hit site and find OG title info', function () {
    context('using just a url', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogTitle).to.be.eql('test page');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(basicHTML);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(basicHTML);
          });
      });
    });

    context('with html', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
      });
      it('using callbacks', function () {
        return openGraphScraper({ html: basicHTML }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogTitle).to.be.eql('test page');
          expect(result.requestUrl).to.be.eql(null);
          expect(response.body).to.be.eql(basicHTML);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ html: basicHTML })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.requestUrl).to.be.eql(null);
            expect(data.response.body).to.be.eql(basicHTML);
          });
      });
    });

    context('when site is not on blacklist', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com', blacklist: ['testtest.com'] }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogTitle).to.be.eql('test page');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(basicHTML);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com', blacklist: ['testtest.com'] })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(basicHTML);
          });
      });
    });

    context('with encoding set to null', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: Buffer.from(encodingHTML, 'utf8') });
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com', encoding: null }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.charset).to.be.eql(null);
          expect(result.ogTitle).to.be.eql('тестовая страница');
          expect(result.ogDescription).to.be.eql('привет тестовая страница<');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(Buffer.from(encodingHTML, 'utf8'));
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com', encoding: null })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.charset).to.be.eql(null);
            expect(data.result.ogTitle).to.be.eql('тестовая страница');
            expect(data.result.ogDescription).to.be.eql('привет тестовая страница<');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(Buffer.from(encodingHTML, 'utf8'));
          });
      });
    });

    context('when there is more then one image', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: multipleImageHTML });
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogTitle).to.be.eql('test page');
          expect(result.ogImage).to.be.eql({
            url: 'test1.png',
            width: null,
            height: null,
            type: 'png',
          });
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(multipleImageHTML);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.ogImage).to.be.eql({
              url: 'test1.png',
              width: null,
              height: null,
              type: 'png',
            });
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(multipleImageHTML);
          });
      });
    });

    context('when meta description exist while og description does not', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: metaDescriptionHTML });
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogTitle).to.be.eql('test page');
          expect(result.ogDescription).to.be.eql('test description from meta');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(metaDescriptionHTML);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.ogDescription).to.be.eql('test description from meta');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(metaDescriptionHTML);
          });
      });
    });

    context('as a browser', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
      });
      it('using callbacks', function () {
        process.browser = true;
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogTitle).to.be.eql('test page');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(basicHTML);
        });
      });
      it('using promises', function () {
        process.browser = true;
        return openGraphScraper({ url: 'www.test.com' })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(basicHTML);
          });
      });
    });

    context('using onlyGetOpenGraphInfo', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: metaDescriptionHTML });
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com', onlyGetOpenGraphInfo: true }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogTitle).to.be.eql(undefined);
          expect(result.describe).to.be.eql(undefined);
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(metaDescriptionHTML);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com', onlyGetOpenGraphInfo: true })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql(undefined);
            expect(data.result.describe).to.be.eql(undefined);
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(metaDescriptionHTML);
          });
      });
    });

    context('when there is a og:image:secure_url tag', function () {
      const secureUrlHTML = `
        <html>
          <head>
            <meta property="og:image:secure_url" content="test1.png">
          </head>
          <body></body>
        </html>`;
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: secureUrlHTML });
      });
      it('using callbacks', function () {
        process.browser = true;
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogImage).to.be.eql({
            url: 'test1.png', width: null, height: null, type: 'png',
          });
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(secureUrlHTML);
        });
      });
      it('using promises', function () {
        process.browser = true;
        return openGraphScraper({ url: 'www.test.com' })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogImage).to.be.eql({
              url: 'test1.png', width: null, height: null, type: 'png',
            });
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(secureUrlHTML);
          });
      });
    });

    context('when there is a og:image:url tag', function () {
      const secureUrlHTML = `
        <html>
          <head>
            <meta property="og:image:url" content="test1.png">
          </head>
          <body></body>
        </html>`;
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: secureUrlHTML });
      });
      it('using callbacks', function () {
        process.browser = true;
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogImage).to.be.eql({
            url: 'test1.png', width: null, height: null, type: 'png',
          });
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(secureUrlHTML);
        });
      });
      it('using promises', function () {
        process.browser = true;
        return openGraphScraper({ url: 'www.test.com' })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogImage).to.be.eql({
              url: 'test1.png', width: null, height: null, type: 'png',
            });
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(secureUrlHTML);
          });
      });
    });

    context('when charset and chardet are unknown', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
        sandbox.stub(chardet, 'detect').returns(false);
        sandbox.stub(charset, 'find').returns(false);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com', runChar: true }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogTitle).to.be.eql('test page');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(basicHTML);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com', runChar: true })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(basicHTML);
          });
      });
    });
  });

  context('should return the proper error data', function () {
    context('when the request sends a ENOTFOUND error', function () {
      beforeEach(async function () {
        const error = new Error('server error');
        error.code = 'ENOTFOUND';
        sandbox.stub(got, 'get').throws(error);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Page not found');
          expect(result.errorDetails.toString()).to.eql('Error: Page not found');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Page not found');
            expect(data.result.errorDetails.toString()).to.eql('Error: Page not found');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when the request sends a EHOSTUNREACH error', function () {
      beforeEach(async function () {
        const error = new Error('server error');
        error.code = 'EHOSTUNREACH';
        sandbox.stub(got, 'get').throws(error);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Page not found');
          expect(result.errorDetails.toString()).to.eql('Error: Page not found');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Page not found');
            expect(data.result.errorDetails.toString()).to.eql('Error: Page not found');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when the request sends a ENETUNREACH error', function () {
      beforeEach(async function () {
        const error = new Error('server error');
        error.code = 'ENETUNREACH';
        sandbox.stub(got, 'get').throws(error);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Page not found');
          expect(result.errorDetails.toString()).to.eql('Error: Page not found');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Page not found');
            expect(data.result.errorDetails.toString()).to.eql('Error: Page not found');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when the request sends a ERR_INVALID_URL error', function () {
      beforeEach(async function () {
        const error = new Error('server error');
        error.code = 'ERR_INVALID_URL';
        sandbox.stub(got, 'get').throws(error);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Page not found');
          expect(result.errorDetails.toString()).to.eql('Error: Page not found');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Page not found');
            expect(data.result.errorDetails.toString()).to.eql('Error: Page not found');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when the request sends a EINVAL error', function () {
      beforeEach(async function () {
        const error = new Error('server error');
        error.code = 'EINVAL';
        sandbox.stub(got, 'get').throws(error);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Page not found');
          expect(result.errorDetails.toString()).to.eql('Error: Page not found');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Page not found');
            expect(data.result.errorDetails.toString()).to.eql('Error: Page not found');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when the request sends a ETIMEDOUT error', function () {
      beforeEach(async function () {
        const error = new Error('server error');
        error.code = 'ETIMEDOUT';
        sandbox.stub(got, 'get').throws(error);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Time out');
          expect(result.errorDetails.toString()).to.eql('Error: Time out');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Time out');
            expect(data.result.errorDetails.toString()).to.eql('Error: Time out');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when the request sends a Response code 401 error', function () {
      beforeEach(async function () {
        const error = new Error('Response code 401');
        sandbox.stub(got, 'get').throws(error);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Page not found');
          expect(result.errorDetails.toString()).to.eql('Error: Page not found');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Page not found');
            expect(data.result.errorDetails.toString()).to.eql('Error: Page not found');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when the request sends a Response code 500 error', function () {
      beforeEach(async function () {
        const error = new Error('Response code 500');
        sandbox.stub(got, 'get').throws(error);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Web server is returning error');
          expect(result.errorDetails.toString()).to.eql('Error: Web server is returning error');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Web server is returning error');
            expect(data.result.errorDetails.toString()).to.eql('Error: Web server is returning error');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when an server sends back nothing', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({});
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Page not found');
          expect(result.errorDetails.toString()).to.eql('Error: Page not found');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Page not found');
            expect(data.result.errorDetails.toString()).to.eql('Error: Page not found');
            expect(data.result.requestUrl).to.eql('http://www.test.com');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when an server error occurres', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ statusCode: 500 });
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Server has returned a 400/500 error code');
          expect(result.errorDetails.toString()).to.eql('Error: Server has returned a 400/500 error code');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Server has returned a 400/500 error code');
            expect(data.result.errorDetails.toString()).to.eql('Error: Server has returned a 400/500 error code');
            expect(data.result.requestUrl).to.eql('http://www.test.com');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when trying to hit a non html pages', function () {
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com/test.png' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Must scrape an HTML page');
          expect(result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
          expect(result.requestUrl).to.be.eql('http://www.test.com/test.png');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'http://www.test.com/test.png' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.success).to.be.eql(false);
            expect(data.result.error).to.eql('Must scrape an HTML page');
            expect(data.result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com/test.png');
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when trying to hit a non html pages and has params', function () {
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com/test.pdf?123' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Must scrape an HTML page');
          expect(result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
          expect(result.requestUrl).to.be.eql('http://www.test.com/test.pdf?123');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'http://www.test.com/test.pdf?123' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.success).to.be.eql(false);
            expect(data.result.error).to.eql('Must scrape an HTML page');
            expect(data.result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com/test.pdf?123');
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when trying to hit a blacklist site', function () {
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com/test', blacklist: ['test.com'] }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Host name has been black listed');
          expect(result.errorDetails.toString()).to.eql('Error: Host name has been black listed');
          expect(result.requestUrl).to.be.eql('http://www.test.com/test');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com/test', blacklist: ['test.com'] })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.success).to.be.eql(false);
            expect(data.result.error).to.eql('Host name has been black listed');
            expect(data.result.errorDetails.toString()).to.eql('Error: Host name has been black listed');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com/test');
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when trying to hit a empty url', function () {
      it('using callbacks', function () {
        return openGraphScraper({ url: '' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Invalid URL');
          expect(result.errorDetails.toString()).to.eql('Error: Invalid URL');
          expect(result.requestUrl).to.be.eql('');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: '' })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.success).to.be.eql(false);
            expect(data.result.error).to.eql('Invalid URL');
            expect(data.result.errorDetails.toString()).to.eql('Error: Invalid URL');
            expect(data.result.requestUrl).to.be.eql('');
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when trying to hit a URL and you are passing in a HTML page', function () {
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com', html: basicHTML }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Must specify either `url` or `html`, not both');
          expect(result.errorDetails.toString()).to.eql('Error: Must specify either `url` or `html`, not both');
          expect(result.requestUrl).to.be.eql('www.test.com');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com', html: basicHTML })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Must specify either `url` or `html`, not both');
            expect(data.result.errorDetails.toString()).to.eql('Error: Must specify either `url` or `html`, not both');
            expect(data.result.requestUrl).to.eql('www.test.com');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when iconv throws a error', function () {
      beforeEach(async function () {
        const error = new Error('Page not found');
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
        sandbox.stub(iconv, 'decode').throws(error);
      });
      it('using callbacks', function () {
        return openGraphScraper({ url: 'www.test.com', runChar: true }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Page not found');
          expect(result.errorDetails.toString()).to.eql('Error: Page not found');
          expect(response).to.be.eql(undefined);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com', runChar: true })
          .then(function () {
            expect().fail('this should not happen');
          })
          .catch(function (data) {
            expect(data.error).to.be.eql(true);
            expect(data.result.error).to.eql('Page not found');
            expect(data.result.errorDetails.toString()).to.eql('Error: Page not found');
            expect(data.result.success).to.eql(false);
            expect(data.response).to.be.eql(undefined);
          });
      });
    });
  });
});
