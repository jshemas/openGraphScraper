const ogs = require('../../index');

describe('timeout', function () {
  it('set to 2000', function (done) {
    ogs({
      url: 'http://www.wikipedia.org/',
      timeout: 2000,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogImage).to.be.eql([{ url: 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png' }]);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
      done();
    });
  });
  it('set to 20', function (done) {
    ogs({
      url: 'http://www.wikipedia.org/',
      timeout: 20,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.error).to.eql('Time out');
      expect(result.errorDetails.toString()).to.eql('Error: Time out');
      expect(response).to.eql(undefined);
      done();
    });
  });
  it('set to empty string', function (done) {
    ogs({
      url: 'http://www.wikipedia.org/',
      timeout: '',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogImage).to.be.eql([{ url: 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png' }]);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
      done();
    });
  });
  it('set to a number string', function (done) {
    ogs({
      url: 'http://www.wikipedia.org/',
      timeout: '2000',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogImage).to.be.eql([{ url: 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png' }]);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
      done();
    });
  });
  it('set to some random chars', function (done) {
    ogs({
      url: 'http://www.wikipedia.org/',
      timeout: 'sdsdds',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogImage).to.be.eql([{ url: 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png' }]);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
      done();
    });
  });
});
