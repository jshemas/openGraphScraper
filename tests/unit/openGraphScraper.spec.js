const got = require('got');
const openGraphScraper = require('../../lib/openGraphScraper');

const sandbox = sinon.createSandbox();

describe('openGraphScraper', function () {
  afterEach(function () {
    sandbox.restore();
  });
  describe('run', function () {
    it('should be able to hit site and find OG info', function (done) {
      sandbox.stub(got, 'get').resolves({ body: '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>' });
      process.browser = true;
      openGraphScraper({
        url: 'www.test.com',
      }, function (error, result) {
        expect(error).to.be.eql(false);
        expect(result.success).to.be.eql(true);
        expect(result.data.ogTitle).to.be.eql('test page');
        done();
      });
    });
    it('should be able to hit site and find OG info - promise version', function () {
      sandbox.stub(got, 'get').resolves({ body: '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>' });
      process.browser = false;
      return openGraphScraper({ url: 'www.test.com' })
        .then(function (result) {
          expect(result.success).to.be.eql(true);
          expect(result.data.ogTitle).to.be.eql('test page');
        })
        .catch(function (error) {
          expect(error).to.be.eql(false);
        });
    });
    it('should return the response data when an error occurred - promise version', function () {
      process.browser = false;
      sandbox.stub(got, 'get').resolves({ statusCode: 404 });
      return openGraphScraper({ url: 'www.test.com' })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (error) {
          expect(error).to.eql({
            error: 'Page Not Found',
            errorDetails: 'Server Has Ran Into A Error',
            requestUrl: 'http://www.test.com',
            response: {
              statusCode: 404,
            },
            success: false,
          });
        });
    });
    it('should not be able to hit non html pages', function (done) {
      openGraphScraper({
        url: 'www.test.com/test.png',
      }, function (error, result) {
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.error).to.be.eql('Must scrape an HTML page');
        done();
      });
    });
    it('should not be able to hit non html pages - promise version', function () {
      return openGraphScraper({ url: 'www.test.com.png' })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (error) {
          expect(error).to.eql({
            error: 'Must scrape an HTML page',
            success: false,
            requestUrl: 'http://www.test.com.png',
            errorDetails: 'Must scrape an HTML page',
          });
        });
    });
    it('should not be able to hit a black list site', function (done) {
      openGraphScraper({
        url: 'www.test.com/test',
        blacklist: ['test.com'],
      }, function (error, result) {
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.error).to.be.eql('Host Name Has Been Black Listed');
        done();
      });
    });
    it('should be able hit when site is not on blacklist', function (done) {
      sandbox.stub(got, 'get').resolves({ body: '<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>' });
      openGraphScraper({
        url: 'www.test.com/test',
        blacklist: ['testtest.com'],
      }, function (error, result) {
        expect(error).to.be.eql(false);
        expect(result.success).to.be.eql(true);
        expect(result.data.ogTitle).to.be.eql('test page');
        done();
      });
    });
    it('should not be able to hit a bad url', function (done) {
      openGraphScraper({
        url: '',
      }, function (error, result) {
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.error).to.be.eql('Invalid URL');
        done();
      });
    });
  });
});
