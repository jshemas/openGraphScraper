const got = require('got');
const openGraphScraper = require('../../lib/openGraphScraper');

const basicHTML = `
  <html>
    <head>
      <title>test page</title>
      <meta charset="utf-8">
      <meta property="og:description" content="test description">
    </head>
    <body>
      <h1>hello test page</h1>
      <img width="360" src="test.png" alt="test">
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

describe('openGraphScraper', function () {
  afterEach(function () {
    sandbox.restore();
  });

  context('should be able to hit site and find OG title info', function () {
    context('using just a url', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
      });
      it('using callbacks', function () {
        openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
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
          })
          .catch(function () {
            expect().fail('this should not happen');
          });
      });
    });

    context('with html', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
      });
      it('using callbacks', function () {
        openGraphScraper({ html: basicHTML }, function (error, result, response) {
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
          })
          .catch(function () {
            expect().fail('this should not happen');
          });
      });
    });

    context('when site is not on blacklist', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
      });
      it('using callbacks', function () {
        openGraphScraper({ url: 'www.test.com', blacklist: ['testtest.com'] }, function (error, result, response) {
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
          })
          .catch(function () {
            expect().fail('this should not happen');
          });
      });
    });

    context('with encoding set to null and withCharset set to true', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: Buffer.from(encodingHTML, 'utf8') });
      });
      it('using callbacks', function () {
        openGraphScraper({ url: 'www.test.com', encoding: null, withCharset: true }, function (error, result, response) {
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
        return openGraphScraper({ url: 'www.test.com', encoding: null, withCharset: true })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.charset).to.be.eql(null);
            expect(data.result.ogTitle).to.be.eql('тестовая страница');
            expect(data.result.ogDescription).to.be.eql('привет тестовая страница<');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(Buffer.from(encodingHTML, 'utf8'));
          })
          .catch(function () {
            expect().fail('this should not happen');
          });
      });
    });

    context('with withCharset set to true', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
      });
      it('using callbacks', function () {
        openGraphScraper({ url: 'www.test.com', withCharset: true }, function (error, result, response) {
          expect(error).to.be.eql(false);
          expect(result.success).to.be.eql(true);
          expect(result.ogTitle).to.be.eql('test page');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response.body).to.be.eql(basicHTML);
        });
      });
      it('using promises', function () {
        return openGraphScraper({ url: 'www.test.com', withCharset: true })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(basicHTML);
          })
          .catch(function () {
            expect().fail('this should not happen');
          });
      });
    });

    context('as a browser', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ body: basicHTML });
      });
      it('using callbacks', function () {
        process.browser = true;
        openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
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
          })
          .catch(function () {
            expect().fail('this should not happen');
          });
      });
    });
  });

  context('should return the proper error data', function () {
    context('when an server error occurres', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ statusCode: 500 });
      });
      it('using callbacks', function () {
        openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
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
        openGraphScraper({ url: 'www.test.com/test.png' }, function (error, result, response) {
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

    context('when trying to hit a blacklist site', function () {
      it('using callbacks', function () {
        openGraphScraper({ url: 'www.test.com/test', blacklist: ['test.com'] }, function (error, result, response) {
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
        openGraphScraper({ url: '' }, function (error, result, response) {
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
        openGraphScraper({ url: 'www.test.com', html: basicHTML }, function (error, result, response) {
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
  });
});
