import { expect } from 'chai';
import sinon from 'sinon';

import chardet from 'chardet';
import { MockAgent, setGlobalDispatcher } from 'undici';
import { encode } from 'iconv-lite';
import ogs from '../../index';

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
const mockAgent = new MockAgent();

describe('return ogs', function () {
  beforeEach(function () {
    setGlobalDispatcher(mockAgent);
    mockAgent.disableNetConnect();
  });

  afterEach(function () {
    sandbox.restore();
    mockAgent.enableNetConnect();
  });

  context('should be able to hit site and find OG title info', function () {
    it('using just a url', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, basicHTML);

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(basicHTML);
          expect(data.response).to.be.a('response');
        });
    });

    it('with html', function () {
      return ogs({ html: basicHTML })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.response).to.be.eql({ body: basicHTML });
          expect(data.html).to.be.eql(basicHTML);
        });
    });

    it('when site is not on blacklist', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, basicHTML);

      return ogs({ url: 'www.test.com', blacklist: ['testtest.com'] })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(basicHTML);
          expect(data.response).to.be.a('response');
        });
    });

    it('with encoding set to null (this has been deprecated, but should still work)', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, Buffer.from(encodingHTML, 'utf8'));

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.charset).to.be.eql('UTF-8');
          expect(data.result.ogTitle).to.be.eql('тестовая страница');
          expect(data.result.ogDescription).to.be.eql('привет тестовая страница<');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(encodingHTML);
          expect(data.response).to.be.a('response');
        });
    });

    it('when there is more then one image', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, multipleImageHTML);

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.ogImage).to.be.eql([{
            url: 'test1.png',
            type: 'png',
          }, {
            url: 'test2.png',
            type: 'png',
          }]);
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(multipleImageHTML);
          expect(data.response).to.be.a('response');
        });
    });

    it('when meta description exist while og description does not', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, metaDescriptionHTML);

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.ogDescription).to.be.eql('test description from meta');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(metaDescriptionHTML);
          expect(data.response).to.be.a('response');
        });
    });

    it('using onlyGetOpenGraphInfo', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, metaDescriptionHTML);

      return ogs({ url: 'www.test.com', onlyGetOpenGraphInfo: true })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql(undefined);
          expect(data.result.ogDescription).to.be.eql(undefined);
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(metaDescriptionHTML);
          expect(data.response).to.be.a('response');
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

      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, secureUrlHTML);

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogImage).to.be.eql([{
            url: 'test1.png', type: 'png',
          }]);
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(secureUrlHTML);
          expect(data.response).to.be.a('response');
        });
    });

    it('when there is a meta property tag but it has no content', function () {
      const missingContentHTML = `
        <html>
          <head>
            <meta property="og:title">
          </head>
        </html>`;

      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, missingContentHTML);

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.result.ogTitle).to.not.exist;
          expect(data.html).to.be.eql(missingContentHTML);
          expect(data.response).to.be.a('response');
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

      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, secureUrlHTML);

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogImage).to.be.eql([{
            url: 'test1.png', type: 'png',
          }]);
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(secureUrlHTML);
          expect(data.response).to.be.a('response');
        });
    });

    context('when charset and chardet are unknown', function () {
      beforeEach(async function () {
        mockAgent.get('http://www.test.com')
          .intercept({ path: '/' })
          .reply(200, basicHTML);
        sandbox.stub(chardet, 'detect').returns(false);
      });
      it('using promises', function () {
        return ogs({ url: 'www.test.com' })
          .then(function (data) {
            expect(data.result.success).to.be.eql(true);
            expect(data.result.ogTitle).to.be.eql('test page');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com');
            expect(data.html).to.be.eql(basicHTML);
            expect(data.response).to.be.a('response');
          });
      });
    });

    it('when passing in a custom tag', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, basicHTML);

      return ogs({
        url: 'www.test.com',
        customMetaTags: [{
          multiple: false,
          property: 'foo',
          fieldName: 'fooTag',
        }, {
          multiple: false,
          property: 'bar',
          fieldName: 'barTag',
        }],
      })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.customMetaTags?.fooTag).to.be.eql('bar');
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(basicHTML);
          expect(data.response).to.be.a('response');
        });
    });

    it('when passing in a custom tag and nothing is found', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, basicHTML);

      return ogs({
        url: 'www.test.com',
        customMetaTags: [{
          multiple: false,
          property: 'bar',
          fieldName: 'barTag',
        }],
      })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.customMetaTags).to.be.undefined;
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(basicHTML);
          expect(data.response).to.be.a('response');
        });
    });
  });

  context('should return the proper error data', function () {
    it('when an server error occurres but the request still works - 400', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(400);

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('400 Bad Request');
          expect(data.result.errorDetails.toString()).to.eql('Error: 400 Bad Request');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a Response code 401 error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(401, {
          message: 'Response code 401',
          code: '401',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('401 Unauthorized');
          expect(data.result.errorDetails.toString()).to.eql('Error: 401 Unauthorized');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a 403 error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(403, {
          message: '403 Forbidden',
          code: '403',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('403 Forbidden');
          expect(data.result.errorDetails.toString()).to.eql('Error: 403 Forbidden');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a ENOTFOUND error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(404, {
          message: 'server error',
          code: 'ENOTFOUND',
        });

      return ogs({ url: 'www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('404 Not Found');
          expect(data.result.errorDetails.toString()).to.eql('Error: 404 Not Found');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a 408 error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(408, {
          message: '408 Request Timeout',
          code: '408',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('408 Request Timeout');
          expect(data.result.errorDetails.toString()).to.eql('Error: 408 Request Timeout');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a 410 error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(410, {
          message: '410 Gone',
          code: '410',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('410 Gone');
          expect(data.result.errorDetails.toString()).to.eql('Error: 410 Gone');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a general error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(418, {
          message: '418 I\'m a teapot',
          code: '418',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('Server has returned a 400/500 error code');
          expect(data.result.errorDetails.toString()).to.eql('Error: Server has returned a 400/500 error code');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a Response code 500 error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(500, {
          message: 'Response code 500',
          code: '500',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('500 Internal Server Error');
          expect(data.result.errorDetails.toString()).to.eql('Error: 500 Internal Server Error');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a 502 error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(502, {
          message: '502 Bad Gateway',
          code: '502',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('502 Bad Gateway');
          expect(data.result.errorDetails.toString()).to.eql('Error: 502 Bad Gateway');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a 503 error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(503, {
          message: '503 Service Unavailable',
          code: '503',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('503 Service Unavailable');
          expect(data.result.errorDetails.toString()).to.eql('Error: 503 Service Unavailable');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when the request sends a 504 error', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(504, {
          message: '504 Gateway Timeout',
          code: '504',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('504 Gateway Timeout');
          expect(data.result.errorDetails.toString()).to.eql('Error: 504 Gateway Timeout');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when an server sends back nothing', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200);

      return ogs({ url: 'www.test.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
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

    it('when an server sends back nothing, not even a buffer', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, '');

      return ogs({ url: 'www.test.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
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
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(500, {
          message: '500 Internal Server Error',
          code: '500',
        });

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('500 Internal Server Error');
          expect(data.result.errorDetails.toString()).to.eql('Error: 500 Internal Server Error');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when an server error occurres but the request still works - 500', function () {
      mockAgent.get('http://www.testerror.com')
        .intercept({ path: '/' })
        .reply(500);

      return ogs({ url: 'http://www.testerror.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.error).to.eql('500 Internal Server Error');
          expect(data.result.errorDetails.toString()).to.eql('Error: 500 Internal Server Error');
          expect(data.result.success).to.eql(false);
          expect(data.response).to.be.eql(undefined);
          expect(data.html).to.be.eql(undefined);
        });
    });

    it('when trying to hit a non html pages', function () {
      return ogs({ url: 'www.test.com/test.png' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
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

    it('when trying to hit a non html pages based on content-type', function () {
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, { }, { headers: { 'content-type': 'foo' } });
      return ogs({ url: 'http://www.test.com' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
        })
        .catch(function (data) {
          expect(data.error).to.be.eql(true);
          expect(data.result.success).to.be.eql(false);
          expect(data.result.error).to.eql('Page must return a header content-type with text/');
          expect(data.result.errorDetails.toString()).to.eql('Error: Page must return a header content-type with text/');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response).to.be.eql(undefined);
        });
    });

    it('when trying to hit a non html pages and has params', function () {
      return ogs({ url: 'www.test.com/test.pdf?123' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
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
      return ogs({ url: 'www.test.com/test', blacklist: ['test.com'] })
        .then(function () {
          expect('').to.be.eql('this should not happen');
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
      return ogs({ url: '' })
        .then(function () {
          expect('').to.be.eql('this should not happen');
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
      return ogs({ url: 'www.test.com', html: basicHTML })
        .then(function () {
          expect('').to.be.eql('this should not happen');
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

  context('when the character encoding is not UTF-8', function () {
    it('using just a url', function () {
      const html = `
      <html>
        <head>
          <meta charset="shift_jis">
          <meta property="og:description" content="OG説明">
          <meta property="og:title" content="OGタイトル">
          <meta property="foo" content="バー">
        </head>
        <body>
          <h1>こんにちは</h1>
          <img width="360" src="test.png" alt="テスト画像">
          <img width="360" alt="テスト画像2">
        </body>
      </html>
      `;
      const htmlBuffer = encode(html, 'shift_jis');
      mockAgent.get('http://www.test.com')
        .intercept({ path: '/' })
        .reply(200, htmlBuffer);

      return ogs({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogTitle).to.be.eql('OGタイトル');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.html).to.be.eql(html);
          expect(data.response).to.be.a('response');
        });
    });
  });
});
