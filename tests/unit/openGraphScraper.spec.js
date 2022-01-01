const chardet = require('chardet');
const iconv = require('iconv-lite');
const nock = require('nock');
const ogs = require('../../index');
const charset = require('../../lib/charset');

const basicHTML = `
  <html>
    <head>
      <meta charset="utf-8">
      <meta property="og:description" content="test description">
      <meta property="og:title" content="test page">
      <meta property="foo" content="bar">
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

describe('return ogs', function () {
  afterEach(function () {
    sandbox.restore();
    nock.cleanAll();
  });

  context('should be able to hit site and find OG title info', function () {
    it('using just a url', function () {
      nock('http://www.test.com')
        .get('/')
        .reply(200, basicHTML);

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(Buffer.from(basicHTML, 'utf8'));
        });
    });

    it('with html', function () {
      return ogs({ html: basicHTML })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql(null);
          expect(data.response.body).to.be.eql(basicHTML);
        });
    });

    it('when site is not on blacklist', function () {
      nock('http://www.test.com')
        .get('/')
        .reply(200, basicHTML);

      return ogs({ url: 'www.test.com', blacklist: ['testtest.com'] })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(Buffer.from(basicHTML, 'utf8'));
        });
    });

    it('with encoding set to null (this has been deprecated, but should still work)', function () {
      nock('http://www.test.com')
        .get('/')
        .reply(200, Buffer.from(encodingHTML, 'utf8'));

      return ogs({ url: 'www.test.com', encoding: null })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.charset).to.be.eql(null);
          expect(data.result.ogTitle).to.be.eql('тестовая страница');
          expect(data.result.ogDescription).to.be.eql('привет тестовая страница<');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(Buffer.from(encodingHTML, 'utf8'));
        });
    });

    it('when there is more then one image', function () {
      nock('http://www.test.com')
        .get('/')
        .reply(200, multipleImageHTML);

      return ogs({ url: 'www.test.com' })
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
          expect(data.response.body).to.be.eql(Buffer.from(multipleImageHTML, 'utf8'));
        });
    });

    it('when meta description exist while og description does not', function () {
      nock('http://www.test.com')
        .get('/')
        .reply(200, metaDescriptionHTML);

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.ogDescription).to.be.eql('test description from meta');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(Buffer.from(metaDescriptionHTML, 'utf8'));
        });
    });

    it('as a browser', function () {
      nock('http://www.test.com')
        .get('/')
        .reply(200, basicHTML);

      process.browser = true;
      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(Buffer.from(basicHTML, 'utf8'));
        });
    });

    it('using onlyGetOpenGraphInfo', function () {
      nock('http://www.test.com')
        .get('/')
        .reply(200, metaDescriptionHTML);

      return ogs({ url: 'www.test.com', onlyGetOpenGraphInfo: true })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql(undefined);
          expect(data.result.describe).to.be.eql(undefined);
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(Buffer.from(metaDescriptionHTML, 'utf8'));
        });
    });

    it('when there is a og:image:secure_url tag', function () {
      const secureUrlHTML = `
        <html>
          <head>
            <meta property="og:image:secure_url" content="test1.png">
          </head>
          <body></body>
        </html>`;

      nock('http://www.test.com')
        .get('/')
        .reply(200, secureUrlHTML);

      process.browser = true;

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogImage).to.be.eql({
            url: 'test1.png', width: null, height: null, type: 'png',
          });
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(Buffer.from(secureUrlHTML, 'utf8'));
        });
    });

    it('when there is a og:image:url tag', function () {
      const secureUrlHTML = `
        <html>
          <head>
            <meta property="og:image:url" content="test1.png">
          </head>
          <body></body>
        </html>`;

      nock('http://www.test.com')
        .get('/')
        .reply(200, secureUrlHTML);

      process.browser = true;

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogImage).to.be.eql({
            url: 'test1.png', width: null, height: null, type: 'png',
          });
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(Buffer.from(secureUrlHTML, 'utf8'));
        });
    });

    context('when charset and chardet are unknown', function () {
      beforeEach(async function () {
        nock('http://www.test.com')
          .get('/')
          .reply(200, basicHTML);
        sandbox.stub(chardet, 'detect').returns(false);
        sandbox.stub(charset, 'find').returns(false);
      });
      it('using promises', function () {
        return ogs({ url: 'www.test.com' })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.response.body).to.be.eql(Buffer.from(basicHTML, 'utf8'));
          });
      });
    });

    it('when passing in a custom tag', function () {
      nock('http://www.test.com')
        .get('/')
        .reply(200, basicHTML);

      return ogs({
        url: 'www.test.com',
        customMetaTags: [{
          multiple: false,
          property: 'foo',
          fieldName: 'fooTag',
        }],
      })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.fooTag).to.be.eql('bar');
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(Buffer.from(basicHTML, 'utf8'));
        });
    });
  });

  context('should return the proper error data', function () {
    it('when the request sends a ENOTFOUND error', function () {
      nock('http://www.testerror.com').persist().get('/')
        .replyWithError({
          message: 'server error',
          code: 'ENOTFOUND',
        });

      return ogs({ url: 'www.testerror.com', retry: { limit: 0 } })
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

    it('when the request sends a EHOSTUNREACH error', function () {
      nock('http://www.testerror.com').persist().get('/')
        .replyWithError({
          message: 'server error',
          code: 'EHOSTUNREACH',
        });

      return ogs({ url: 'www.testerror.com', retry: { limit: 0 } })
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

    it('when the request sends a ENETUNREACH error', function () {
      nock('http://www.testerror.com').persist().get('/')
        .replyWithError({
          message: 'server error',
          code: 'ENETUNREACH',
        });

      return ogs({ url: 'www.testerror.com', retry: { limit: 0 } })
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

    it('when the request sends a ERR_INVALID_URL error', function () {
      nock('http://www.testerror.com').persist().get('/')
        .replyWithError({
          message: 'server error',
          code: 'ERR_INVALID_URL',
        });

      return ogs({ url: 'www.testerror.com', retry: { limit: 0 } })
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

    it('when the request sends a EINVAL error', function () {
      nock('http://www.testerror.com').persist().get('/')
        .replyWithError({
          message: 'server error',
          code: 'EINVAL',
        });

      return ogs({ url: 'www.testerror.com', retry: { limit: 0 } })
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

    it('when the request sends a ETIMEDOUT error', function () {
      nock('http://www.testerror-ETIMEDOUT.com').persist().get('/')
        .replyWithError({
          message: 'server error',
          code: 'ETIMEDOUT',
        });

      return ogs({ url: 'www.testerror-ETIMEDOUT.com', retry: { limit: 0 } })
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

    it('when the request sends a Response code 401 error', function () {
      nock('http://www.testerror-401.com').persist().get('/')
        .replyWithError({
          message: 'Response code 401',
          code: '401',
        });

      return ogs({ url: 'www.testerror-401.com', retry: { limit: 0 } })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('Response code 401');
          expect(data.result.errorDetails.toString()).to.eql('RequestError: Response code 401');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
        });
    });

    it('when the request sends a Response code 500 error', function () {
      nock('http://www.testerror-500.com').persist().get('/')
        .replyWithError({
          message: 'Response code 500',
          code: '500',
        });

      return ogs({ url: 'www.testerror-500.com', retry: { limit: 0 } })
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

    it('when an server sends back nothing', function () {
      nock('http://www.test.com').get('/').reply(200);

      return ogs({ url: 'www.test.com', retry: { limit: 0 } })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('Page not found');
          expect(data.result.errorDetails.toString()).to.eql('Error: Page not found');
          expect(data.result.requestUrl).to.eql('www.test.com');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
        });
    });

    it('when an server error occurres', function () {
      nock('http://www.testerror-500error.com').persist().get('/')
        .replyWithError({
          message: 'Server has returned a 400/500 error code',
          code: '500',
        });

      return ogs({ url: 'www.testerror-500error.com', retry: { limit: 0 } })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('Server has returned a 400/500 error code');
          expect(data.result.errorDetails.toString()).to.eql('RequestError: Server has returned a 400/500 error code');
          expect(data.result.requestUrl).to.eql('www.testerror-500error.com');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
        });
    });

    it('when trying to hit a non html pages', function () {
      return ogs({ url: 'www.test.com/test.png', retry: { limit: 0 } })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.success).to.be.eql(false);
          expect(data.result.error).to.eql('Must scrape an HTML page');
          expect(data.result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
          expect(data.result.requestUrl).to.be.eql('www.test.com/test.png');
          expect(data.response).to.be.eql(undefined);
        });
    });

    it('when trying to hit a non html pages and has params', function () {
      return ogs({ url: 'www.test.com/test.pdf?123', retry: { limit: 0 } })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.success).to.be.eql(false);
          expect(data.result.error).to.eql('Must scrape an HTML page');
          expect(data.result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
          expect(data.result.requestUrl).to.be.eql('www.test.com/test.pdf?123');
          expect(data.response).to.be.eql(undefined);
        });
    });

    it('when trying to hit a blacklist site', function () {
      return ogs({ url: 'www.test.com/test', blacklist: ['test.com'], retry: { limit: 0 } })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.success).to.be.eql(false);
          expect(data.result.error).to.eql('Host name has been black listed');
          expect(data.result.errorDetails.toString()).to.eql('Error: Host name has been black listed');
          expect(data.result.requestUrl).to.be.eql('www.test.com/test');
          expect(data.response).to.be.eql(undefined);
        });
    });

    it('when trying to hit a empty url', function () {
      return ogs({ url: '', retry: { limit: 0 } })
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

    it('when trying to hit a URL and you are passing in a HTML page', function () {
      return ogs({ url: 'www.test.com', html: basicHTML, retry: { limit: 0 } })
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

    it('when iconv throws a error', function () {
      const error = new Error('Page not found');
      sandbox.stub(iconv, 'decode').throws(error);
      nock('http://www.test.com').persist().get('/').reply(200, Buffer.from(basicHTML, 'utf8'));

      return ogs({ url: 'www.test.com', retry: { limit: 0 } })
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
