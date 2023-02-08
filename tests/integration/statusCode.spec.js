const ogs = require('../../dist/index');

describe('statusCode', function () {
  context('when the site returns', function () {
    it('403', function () {
      return ogs({
        url: 'http://httpstat.us/403',
        timeout: {
          request: 10000,
        },
      })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function ({ error, result, response }) {
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.requestUrl).to.be.eql('http://httpstat.us/403');
          expect(result.error).to.eql('Response code 403 (Forbidden)');
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
        timeout: {
          request: 10000,
        },
      })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function ({ error, result, response }) {
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
