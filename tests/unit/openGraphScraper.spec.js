'use strict';

const expect = require('expect.js');
const sinon = require('sinon');
const mockery = require('mockery');
const sandbox = sinon.sandbox.create();

describe('openGraphScraper', function () {
  afterEach(function () {
    sandbox.restore();
  });
  describe('run', function () {
    let requestStub;
    let openGraphScraper;
    beforeEach(function () {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
      });
      requestStub = sinon.stub();
      mockery.registerMock('request', requestStub);
      openGraphScraper = require('../../lib/openGraphScraper');
    });
    after(function () {
      mockery.disable();
    });
    it('should be able to hit site and find OG info', function (done) {
      process.browser = true;
      requestStub.yields(null, {statusCode: 200}, Buffer.from('<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 'utf8'));
      openGraphScraper({
        'url': 'www.test.com'
      }, function (error, result, response) {
        expect(error).to.be(false);
        expect(result.success).to.be(true);
        expect(result.data.ogTitle).to.be('test page');
        done();
      });
    });
    it('should be able to hit site and find OG info - promise version', function (done) {
      process.browser = false;
      requestStub.yields(null, {statusCode: 200}, Buffer.from('<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 'utf8'));
      openGraphScraper({'url': 'www.test.com'})
        .then(function (result) {
          expect(result.success).to.be(true);
          expect(result.data.ogTitle).to.be('test page');
          done();
        })
        .catch(function (error) {
          console.log('error:', error);
          expect(error).to.be(false);
        });
    });
    it('should not be able to hit non html pages', function (done) {
      openGraphScraper({
        'url': 'www.test.com/test.png'
      }, function (error, result, response) {
        expect(error).to.be(true);
        expect(result.success).to.be(false);
        expect(result.error).to.be('Must scrape an HTML page');
        done();
      });
    });
    it('should not be able to hit non html pages - promise version', function (done) {
      openGraphScraper({'url': 'www.test.com.png'})
        .then(function (result) {
          expect(result.success).to.be(false);
          done();
        })
        .catch(function (error) {
          expect(error).to.be(true);
          done();
        });
    });
    it('should not be able to hit a black list site', function (done) {
      openGraphScraper({
        'url': 'www.test.com/test',
        'blacklist': ['test.com']
      }, function (error, result, response) {
        expect(error).to.be(true);
        expect(result.success).to.be(false);
        expect(result.error).to.be('Host Name Has Been Black Listed');
        done();
      });
    });
    it('should be able hit when site is not on blacklist', function (done) {
      requestStub.yields(null, {statusCode: 200}, Buffer.from('<html><head><title>test page</title></head><body><h1>hello test page</h2></body></html>', 'utf8'));
      openGraphScraper({
        'url': 'www.test.com/test',
        'blacklist': ['testtest.com']
      }, function (error, result, response) {
        expect(error).to.be(false);
        expect(result.success).to.be(true);
        expect(result.data.ogTitle).to.be('test page');
        done();
      });
    });
    it('should not be able to hit a bad url', function (done) {
      openGraphScraper({
        'url': ''
      }, function (error, result, response) {
        expect(error).to.be(true);
        expect(result.success).to.be(false);
        expect(result.error).to.be('Invalid URL');
        done();
      });
    });
  });
});
