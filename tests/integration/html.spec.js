const ogs = require('../../index');

const HTML_STRING = `
<html>
<head>
  <meta property="og:title" content="Test page"/>
</head>
<body></body>
</html>
`;

describe('html', function () {
  it('pass in HTML string', function (done) {
    ogs({
      html: HTML_STRING,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.ogTitle).to.be.eql('Test page');
      expect(result.requestUrl).to.be.eql(null);
      expect(response).to.be.an('object').and.to.not.be.empty;
      done();
    });
  });
  it('Invalid Call - Can\'t request URL and pass in HTML string', function (done) {
    ogs({
      url: 'https://upload.wikimedia.org/wikipedia/commons.jpg',
      html: HTML_STRING,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('https://upload.wikimedia.org/wikipedia/commons.jpg');
      expect(result.error).to.eql('Must specify either `url` or `html`, not both');
      expect(result.errorDetails.toString()).to.eql('Error: Must specify either `url` or `html`, not both');
      expect(response).to.eql(undefined);
      done();
    });
  });
  it('Invalid Call - Not a HTML page', function (done) {
    ogs({
      url: 'https://upload.wikimedia.org/wikipedia/commons.jpg',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('https://upload.wikimedia.org/wikipedia/commons.jpg');
      expect(result.error).to.eql('Must scrape an HTML page');
      expect(result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
      expect(response).to.eql(undefined);
      done();
    });
  });
});
