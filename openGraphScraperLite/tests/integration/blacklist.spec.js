const ogs = require('../../index');

describe('blacklist', function () {
  it('when website is on the blacklist', function () {
    return ogs({
      url: 'https://www.wikipedia.org/',
      blacklist: ['www.test.com', 'www.wikipedia.org'],
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.error).to.eql('Host name has been black listed');
      expect(result.errorDetails.toString()).to.eql('Error: Host name has been black listed');
      expect(result).to.have.all.keys(
        'error',
        'errorDetails',
        'requestUrl',
        'success',
      );
      expect(response).to.eql(undefined);
    });
  });
  it('when website is not on the blacklist', function () {
    return ogs({
      url: 'https://www.wikipedia.org/',
      blacklist: ['www.test.com', 'www.google.org'],
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogLocale).to.be.eql('mul');
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'ogDescription',
        'ogLocale',
        'ogTitle',
        'requestUrl',
        'success',
        'charset',
      );
      expect(response).to.be.an('Response').and.to.not.be.empty;
    });
  });
  it('when blacklist empty', function () {
    return ogs({
      url: 'https://www.wikipedia.org/',
      blacklist: [],
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogLocale).to.be.eql('mul');
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'ogDescription',
        'ogTitle',
        'ogLocale',
        'requestUrl',
        'success',
        'charset',
      );
      expect(response).to.be.an('Response').and.to.not.be.empty;
    });
  });
});
