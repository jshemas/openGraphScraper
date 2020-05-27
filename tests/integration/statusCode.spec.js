const ogs = require('../../index');

describe('statusCode', function () {
  context('when the site returns', function () {
    it('200', function (done) {
      ogs({
        url: 'http://httpstat.us/200',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.success).to.be.eql(true);
        expect(result.requestUrl).to.be.eql('http://httpstat.us/200');
        expect(response).to.be.an('object').and.to.not.be.empty;
        done();
      });
    });
    it('403', function (done) {
      ogs({
        url: 'http://httpstat.us/403',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('http://httpstat.us/403');
        expect(result.error).to.eql('Page not found');
        expect(result.errorDetails.toString()).to.eql('Error: Page not found');
        expect(response).to.eql(undefined);
        done();
      });
    });
    it('500', function (done) {
      ogs({
        url: 'http://httpstat.us/500',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('http://httpstat.us/500');
        expect(result.error).to.eql('Web server is returning error');
        expect(result.errorDetails.toString()).to.eql('Error: Web server is returning error');
        expect(response).to.eql(undefined);
        done();
      });
    });
  });
});
