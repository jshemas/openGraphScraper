const got = require('got');
const openGraphScraper = require('../../lib/openGraphScraper');

const basicHTML = '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>';

const sandbox = sinon.createSandbox();

describe('openGraphScraper', function () {
  afterEach(function () {
    sandbox.restore();
  });

  context('should be able to hit site and find OG title info', function () {
    beforeEach(async function () {
      sandbox.stub(got, 'get').resolves({ body: basicHTML });
    });
    it('using callbacks', function (done) {
      openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
        expect(error).to.be.eql(false);
        expect(result.success).to.be.eql(true);
        expect(result.ogImage).to.be.eql([]);
        expect(result.ogTitle).to.be.eql('test page');
        expect(result.requestUrl).to.be.eql('http://www.test.com');
        expect(response.body).to.be.eql(basicHTML);
        done();
      });
    });
    it('using promises', function () {
      return openGraphScraper({ url: 'www.test.com' })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogImage).to.be.eql([]);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(basicHTML);
        })
        .catch(function () {
          expect().fail('this should not happen');
        });
    });
  });

  context('should be able hit when site is not on blacklist', function () {
    beforeEach(async function () {
      sandbox.stub(got, 'get').resolves({ body: basicHTML });
    });
    it('using callbacks', function (done) {
      openGraphScraper({ url: 'www.test.com', blacklist: ['testtest.com'] }, function (error, result, response) {
        expect(error).to.be.eql(false);
        expect(result.success).to.be.eql(true);
        expect(result.ogImage).to.be.eql([]);
        expect(result.ogTitle).to.be.eql('test page');
        expect(result.requestUrl).to.be.eql('http://www.test.com');
        expect(response.body).to.be.eql(basicHTML);
        done();
      });
    });
    it('using promises', function () {
      return openGraphScraper({ url: 'www.test.com', blacklist: ['testtest.com'] })
        .then(function (data) {
          expect(data.result.success).to.be.eql(true);
          expect(data.result.ogImage).to.be.eql([]);
          expect(data.result.ogTitle).to.be.eql('test page');
          expect(data.result.requestUrl).to.be.eql('http://www.test.com');
          expect(data.response.body).to.be.eql(basicHTML);
        })
        .catch(function () {
          expect().fail('this should not happen');
        });
    });
  });

  context('should return the proper error data', function () {
    context('when an server error occurres', function () {
      beforeEach(async function () {
        sandbox.stub(got, 'get').resolves({ statusCode: 500 });
      });
      it('using callbacks', function (done) {
        openGraphScraper({ url: 'www.test.com' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Server has returned a 400/500 error code');
          expect(result.errorDetails.toString()).to.eql('Error: Server has returned a 400/500 error code');
          expect(result.requestUrl).to.be.eql('http://www.test.com');
          expect(response).to.be.eql(undefined);
          done();
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
      it('using callbacks', function (done) {
        openGraphScraper({ url: 'www.test.com/test.png' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Must scrape an HTML page');
          expect(result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
          expect(result.requestUrl).to.be.eql('http://www.test.com/test.png');
          expect(response).to.be.eql(undefined);
          done();
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
      it('using callbacks', function (done) {
        openGraphScraper({ url: 'www.test.com/test', blacklist: ['test.com'] }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Host Name Has Been Black Listed');
          expect(result.errorDetails.toString()).to.eql('Error: Host Name Has Been Black Listed');
          expect(result.requestUrl).to.be.eql('http://www.test.com/test');
          expect(response).to.be.eql(undefined);
          done();
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
            expect(data.result.error).to.eql('Host Name Has Been Black Listed');
            expect(data.result.errorDetails.toString()).to.eql('Error: Host Name Has Been Black Listed');
            expect(data.result.requestUrl).to.be.eql('http://www.test.com/test');
            expect(data.response).to.be.eql(undefined);
          });
      });
    });

    context('when trying to hit a empty url', function () {
      it('using callbacks', function (done) {
        openGraphScraper({ url: '' }, function (error, result, response) {
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.error).to.eql('Invalid URL');
          expect(result.errorDetails.toString()).to.eql('Error: Invalid URL');
          expect(result.requestUrl).to.be.eql('');
          expect(response).to.be.eql(undefined);
          done();
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
  });
});
