const ogs = require('../../index');

// http://httpstat.us keeps going offline, we need to fine a replacement
describe.skip('statusCode', function () {
  context('when the site returns', function () {
    it('403', function () {
      return ogs({ url: 'http://httpstat.us/403' })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function ({ error, result, response }) {
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.requestUrl).to.be.eql('http://httpstat.us/403');
          expect(result.error).to.eql('Server has returned a 400/500 error code');
          expect(result.errorDetails.toString()).to.eql('Error: Server has returned a 400/500 error code');
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
      return ogs({ url: 'http://httpstat.us/500' })
        .then(function () {
          expect().fail('this should not happen');
        })
        .catch(function ({ error, result, response }) {
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(true);
          expect(result.success).to.be.eql(false);
          expect(result.requestUrl).to.be.eql('http://httpstat.us/500');
          expect(result.error).to.eql('Server has returned a 400/500 error code');
          expect(result.errorDetails.toString()).to.eql('Error: Server has returned a 400/500 error code');
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
