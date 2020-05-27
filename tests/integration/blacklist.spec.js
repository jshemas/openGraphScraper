const ogs = require('../../index');

describe('blacklist', function () {
  it('when website is on the blacklist', function (done) {
    ogs({
      url: 'https://www.wikipedia.org/',
      blacklist: ['www.test.com', 'www.wikipedia.org'],
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.error).to.eql('Host Name Has Been Black Listed');
      expect(result.errorDetails.toString()).to.eql('Error: Host Name Has Been Black Listed');
      expect(response).to.eql(undefined);
      done();
    });
  });
  it('when website is not on the blacklist', function (done) {
    ogs({
      url: 'https://www.wikipedia.org/',
      blacklist: ['www.test.com', 'www.google.org'],
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogImage).to.be.eql([{ url: 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png' }]);
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
      done();
    });
  });
  it('when blacklist empty', function (done) {
    ogs({
      url: 'https://www.wikipedia.org/',
      blacklist: [],
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogImage).to.be.eql([{ url: 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png' }]);
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
      done();
    });
  });
});
