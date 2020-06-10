const cheerio = require('cheerio');

const fallback = require('../../lib/fallback');

const basicHTML = `
  <html>
    <head>
      <meta property="og:description" content="test description">
      <meta property="og:title" content="test page">
      <meta name="description" content="fall back description">
      <title>fall back title</title>
    </head>
    <body>
      <h1>hello test page</h1>
      <img height="200" width="300" src="fallback.png" alt="test1">
      <img src="fallback2.png" alt="test2">
      <img alt="test3">
    </body>
  </html>`;

describe('fall backs', function () {
  it('should use fall backs when there is no og info found', function () {
    let ogObject = {};
    const options = {};
    const $ = cheerio.load(basicHTML);
    ogObject = fallback(ogObject, options, $);

    expect(ogObject.ogImage).to.be.eql([
      {
        url: 'fallback.png', width: '300', height: '200', type: 'png',
      },
      {
        url: 'fallback2.png', width: null, height: null, type: 'png',
      },
    ]);
    expect(ogObject.ogTitle).to.be.eql('fall back title');
    expect(ogObject.ogDescription).to.be.eql('fall back description');
    expect(ogObject).to.have.all.keys(
      'ogImage',
      'ogTitle',
      'ogDescription',
    );
  });

  it('should not use fall backs when there is og info found', function () {
    let ogObject = { ogTitle: 'test page', ogDescription: 'test description', ogImage: 'test.png' };
    const options = {};
    const $ = cheerio.load(basicHTML);
    ogObject = fallback(ogObject, options, $);


    expect(ogObject.ogImage).to.be.eql('test.png');
    expect(ogObject.ogTitle).to.be.eql('test page');
    expect(ogObject.ogDescription).to.be.eql('test description');
    expect(ogObject).to.have.all.keys(
      'ogImage',
      'ogTitle',
      'ogDescription',
    );
  });
});
