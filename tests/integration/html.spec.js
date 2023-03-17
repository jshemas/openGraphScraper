const { expect } = require('chai');
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
  it('pass in HTML string', function () {
    return ogs({ html: HTML_STRING }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.ogTitle).to.be.eql('Test page');
      expect(result.requestUrl).to.be.eql(null);
      expect(result.charset).to.be.eql('ISO-8859-1');
      expect(result).to.have.all.keys(
        'charset',
        'ogTitle',
        'requestUrl',
        'success',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('Invalid Call - Can\'t request URL and pass in HTML string', function () {
    return ogs({
      url: 'https://upload.wikimedia.org/wikipedia/commons.jpg',
      html: HTML_STRING,
    })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('https://upload.wikimedia.org/wikipedia/commons.jpg');
        expect(result.error).to.eql('Must specify either `url` or `html`, not both');
        expect(result.errorDetails.toString()).to.eql('Error: Must specify either `url` or `html`, not both');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
  it('Invalid Call - Not a HTML page', function () {
    return ogs({
      url: 'https://upload.wikimedia.org/wikipedia/commons.jpg',
    })
      .then(function () {
        expect().fail('this should not happen');
      })
      .catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('https://upload.wikimedia.org/wikipedia/commons.jpg');
        expect(result.error).to.eql('Must scrape an HTML page');
        expect(result.errorDetails.toString()).to.eql('Error: Must scrape an HTML page');
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
