const ogs = require('../../index');

describe('statusCode', function () {
  context('when the site returns', function () {
    // TODO: This is now returning a header content-type of `text/plain`, will need to find a new site to test 200s
    // it('200', function () {
    //   return ogs({
    //     url: 'http://httpstat.us/200',
    //     timeout: 10000,
    //   }, function (error, result, response) {
    //     console.log('error:', error);
    //     console.log('result:', result);
    //     expect(error).to.be.eql(false);
    //     expect(result.charset).to.be.eql(null);
    //     expect(result.success).to.be.eql(true);
    //     expect(result.requestUrl).to.be.eql('http://httpstat.us/200');
    //     expect(result).to.have.all.keys(
    //       'requestUrl',
    //       'success',
    //       'charset',
    //     );
    //     expect(response).to.be.an('object').and.to.not.be.empty;
    //   });
    // });
    it('403', function () {
      return ogs({
        url: 'http://httpstat.us/403',
        timeout: 10000,
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('http://httpstat.us/403');
        expect(result.error).to.eql('Page not found');
        expect(result.errorDetails.toString()).to.eql('Error: Page not found');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
    });
    it('500', function () {
      return ogs({
        url: 'http://httpstat.us/500',
        timeout: 10000,
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('http://httpstat.us/500');
        expect(result.error).to.eql('Web server is returning error');
        expect(result.errorDetails.toString()).to.eql('Error: Web server is returning error');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
    });
  });
});
