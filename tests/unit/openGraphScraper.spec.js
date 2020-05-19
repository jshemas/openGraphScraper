'use strict';

var expect = require('expect.js');
var sinon = require('sinon');
var mockery = require('mockery');
var sandbox = sinon.sandbox.create();

describe('openGraphScraper', function () {
  afterEach(function () {
    sandbox.restore();
  });
  describe('run', function () {
    var requestStub;
    var openGraphScraper;
    beforeEach(function (done) {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
      });
      requestStub = sinon.stub();
      mockery.registerMock('node-fetch', requestStub);
      openGraphScraper = require('../../lib/openGraphScraper');
      done();
    });
    afterEach(function (done) {
      mockery.disable();
      done();
    });
    it('should be able to hit site and find OG info', function (done) {
      process.browser = true;
      requestStub.resolves({status: 200, textConverted: function () { return Promise.resolve('<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>'); }});
      openGraphScraper({'url': 'www.test.com'},
        function (error, result) {
          expect(error).to.be(false);
          expect(result.success).to.be(true);
          expect(result.data.ogTitle).to.be('test page');
          done();
        });
    });
    it('should be able to hit site and find OG info - promise version', function () {
      process.browser = false;
      requestStub.resolves({status: 200, textConverted: function () { return Promise.resolve('<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>'); }});
      return openGraphScraper({'url': 'www.test.com'}).then(function (result) {
        expect(result.success).to.be(true);
        expect(result.data.ogTitle).to.be('test page');
      })
        .catch(function (error) {
          expect(error).to.be(false);
        });
    });
    it('should return the response data when an error occurred - promise version', function () {
      process.browser = false;
      requestStub.resolves({status: 404, textConverted: function () { return Promise.resolve('<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>'); }});
      return openGraphScraper({'url': 'www.test.com'})
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (error) {
          expect(error.success).to.be(false);
          expect(error.errorDetails.error).to.be('Server Has Ran Into A Error');
          expect(error.response.status).to.be(404);
        });
    });
    it('should not be able to hit non html pages', function (done) {
      openGraphScraper({
        'url': 'www.test.com/test.png'
      }, function (error, result) {
        expect(error).to.be(true);
        expect(result.success).to.be(false);
        expect(result.error).to.be('Must scrape an HTML page');
        done();
      });
    });
    it('should not be able to hit non html pages - promise version', function () {
      return openGraphScraper({'url': 'www.test.com.png'})
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function (error) {
          expect(error).to.eql({
            error: 'Must scrape an HTML page',
            success: false,
            requestUrl: 'http://www.test.com.png',
            errorDetails: 'Must scrape an HTML page'
          });
        });
    });
    it('should not be able to hit a black list site', function (done) {
      openGraphScraper({
        'url': 'www.test.com/test',
        'blacklist': ['test.com']
      }, function (error, result) {
        expect(error).to.be(true);
        expect(result.success).to.be(false);
        expect(result.error).to.be('Host Name Has Been Black Listed');
        done();
      });
    });
    it('should be able hit when site is not on blacklist', function (done) {
      requestStub.resolves({status: 200, textConverted: function () { return Promise.resolve('<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>'); }});
      openGraphScraper({
        'url': 'www.test.com/test',
        'blacklist': ['testtest.com']
      }, function (error, result) {
        expect(error).to.be(false);
        expect(result.success).to.be(true);
        expect(result.data.ogTitle).to.be('test page');
        done();
      });
    });
    it('should not be able to hit a bad url', function (done) {
      openGraphScraper({
        'url': ''
      }, function (error, result) {
        expect(error).to.be(true);
        expect(result.success).to.be(false);
        expect(result.error).to.be('Invalid URL');
        done();
      });
    });
  });
});
