const ogs = require('../../index');

describe('url', function () {
  it('http', function (done) {
    ogs({
      url: 'http://www.wikipedia.org/',
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
  it('https', function (done) {
    ogs({
      url: 'https://www.wikipedia.org/',
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
  it('no protocol', function (done) {
    ogs({
      url: 'www.wikipedia.org/',
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
  it('no protocol and no wwww', function (done) {
    ogs({
      url: 'wikipedia.org/',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogImage).to.be.eql([{ url: 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png' }]);
      expect(result.requestUrl).to.be.eql('http://wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
      done();
    });
  });
  it('protocol with no wwww', function (done) {
    ogs({
      url: 'http://wikipedia.org/',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Wikipedia');
      expect(result.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.ogImage).to.be.eql([{ url: 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png' }]);
      expect(result.requestUrl).to.be.eql('http://wikipedia.org/');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
      done();
    });
  });
  it('fake page', function (done) {
    ogs({
      url: 'http://testtesttest4564568.com',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('http://testtesttest4564568.com');
      expect(result.error).to.eql('Page Not Found');
      expect(result.errorDetails.toString()).to.eql('Error: Page Not Found');
      expect(response).to.eql(undefined);
      done();
    });
  });
  it('empty url', function (done) {
    ogs({
      url: '',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('');
      expect(result.error).to.eql('Invalid URL');
      expect(result.errorDetails.toString()).to.eql('Error: Invalid URL');
      expect(response).to.eql(undefined);
      done();
    });
  });
  it('empty options', function (done) {
    ogs({}, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.eql(undefined);
      expect(result.error).to.eql('Invalid URL');
      expect(result.errorDetails.toString()).to.eql('Error: Invalid URL');
      expect(response).to.eql(undefined);
      done();
    });
  });
  it('url is just a number', function (done) {
    ogs({
      url: 23233,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('http://23233');
      expect(result.error).to.eql('Page Not Found');
      expect(result.errorDetails.toString()).to.eql('Error: Page Not Found');
      expect(response).to.eql(undefined);
      done();
    });
  });
  it('url is a string of numbers', function (done) {
    ogs({
      url: '2323233',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('http://2323233');
      expect(result.error).to.eql('Page Not Found');
      expect(result.errorDetails.toString()).to.eql('Error: Page Not Found');
      expect(response).to.eql(undefined);
      done();
    });
  });
  it('url is a string of words', function (done) {
    ogs({
      url: 'this is a test',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('http://this is a test');
      expect(result.error).to.eql('Page Not Found');
      expect(result.errorDetails.toString()).to.eql('Error: Page Not Found');
      expect(response).to.eql(undefined);
      done();
    });
  });
});
