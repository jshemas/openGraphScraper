/* eslint-disable promise/no-callback-in-promise */
const app = require('../index');

const HTML_STRING = `
<html>
<head>
  <meta property="og:title" content="Test page"/>
</head>
<body></body>
</html>
`;

describe('GET OG', function () {
  it('Valid Call - ogp.me should return open graph data', function (done) {
    app({
      url: 'http://ogp.me/',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://ogp.me/');
      expect(result.data.ogTitle).to.be.eql('Open Graph protocol');
      expect(result.data.ogType).to.be.eql('website');
      expect(result.data.ogUrl).to.be.eql('http://ogp.me/');
      expect(result.data.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
      expect(result.data.ogImage.url).to.be.eql('http://ogp.me/logo.png');
      expect(result.data.ogImage.width).to.be.eql('300');
      expect(result.data.ogImage.height).to.be.eql('300');
      expect(result.data.ogImage.type).to.be.eql('image/png');
      expect(response).to.be.an('object');
      done();
    });
  });
  it('Valid Call - ogp.me should return open graph data - promise version', function (done) {
    app({ url: 'http://ogp.me/' })
      .then(function (result) {
        console.log('result:', result);
        expect(result.success).to.be.eql(true);
        expect(result.requestUrl).to.be.eql('http://ogp.me/');
        expect(result.data.ogTitle).to.be.eql('Open Graph protocol');
        expect(result.data.ogType).to.be.eql('website');
        expect(result.data.ogUrl).to.be.eql('http://ogp.me/');
        expect(result.data.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
        expect(result.data.ogImage.url).to.be.eql('http://ogp.me/logo.png');
        expect(result.data.ogImage.width).to.be.eql('300');
        expect(result.data.ogImage.height).to.be.eql('300');
        expect(result.data.ogImage.type).to.be.eql('image/png');
        done();
      })
      .catch(function (error) {
        console.log('error:', error);
        expect(error).to.be.eql(false);
        done();
      });
  });
  it('Valid Call - http', function (done) {
    app({
      url: 'http://www.wikipedia.org/',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Valid Call - https', function (done) {
    app({
      url: 'https://www.wikipedia.org/',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Valid Call - no protocol', function (done) {
    app({
      url: 'www.wikipedia.org/',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Valid Call - no protocol and no wwww', function (done) {
    app({
      url: 'wikipedia.org/',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Valid Call - protocol with no wwww', function (done) {
    app({
      url: 'http://wikipedia.org/',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Valid Call - blacklist', function (done) {
    app({
      url: 'https://www.wikipedia.org/',
      blacklist: ['www.test.com', 'www.wikipedia.org'],
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.error).to.be.eql('Host Name Has Been Black Listed');
      done();
    });
  });
  it('Valid Call - blacklist with no match', function (done) {
    app({
      url: 'https://www.wikipedia.org/',
      blacklist: ['www.test.com', 'www.google.org'],
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Valid Call - blacklist empty', function (done) {
    app({
      url: 'https://www.wikipedia.org/',
      blacklist: [],
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://www.wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Invalid Call - fake page', function (done) {
    app({
      url: 'http://testtesttest4564568.com',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('http://testtesttest4564568.com');
      expect(result.error).to.be.eql('Page Not Found');
      done();
    });
  });
  it('Invalid Call - empty url', function (done) {
    app({
      url: '',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('');
      expect(result.error).to.be.eql('Invalid URL');
      done();
    });
  });
  it('Invalid Call - empty options', function (done) {
    app({}, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.error).to.be.eql('Invalid URL');
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql(undefined);
      done();
    });
  });
  it('Valid Call - timeout set to 2000', function (done) {
    app({
      url: 'http://www.wikipedia.org/',
      timeout: 2000,
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Valid Call - timeout set to empty string', function (done) {
    app({
      url: 'http://www.wikipedia.org/',
      timeout: '',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Valid Call - timeout number is a string', function (done) {
    app({
      url: 'http://www.wikipedia.org/',
      timeout: '2000',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Valid Call - time is just a string of chars', function (done) {
    app({
      url: 'http://www.wikipedia.org/',
      timeout: 'sdsdds',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.data.ogTitle).to.be.eql('Wikipedia');
      expect(result.data.ogDescription).to.be.eql('Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.');
      expect(result.data.ogImage[0].url).to.be.eql('portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
      done();
    });
  });
  it('Invalid Call - url is just a number', function (done) {
    app({
      url: 23233,
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('http://23233');
      expect(result.error).to.be.eql('Page Not Found');
      done();
    });
  });
  it('Invalid Call - url is a string of numbers', function (done) {
    app({
      url: '2323233',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('http://2323233');
      expect(result.error).to.be.eql('Page Not Found');
      done();
    });
  });
  it('Invalid Call - url is a string of words', function (done) {
    app({
      url: 'this is a test',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('http://this is a test');
      expect(result.error).to.be.eql('Page Not Found');
      done();
    });
  });
  it('Invalid Call - response code is 404', function (done) {
    app({
      url: 'https://github.com/jshemas/notOpenGraphScraper',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('https://github.com/jshemas/notOpenGraphScraper');
      expect(result.error).to.be.eql('Page Not Found');
      done();
    });
  });
  it('Valid Call - only get open graph info', function (done) {
    app({
      url: 'http://www.wikipedia.org/',
      onlyGetOpenGraphInfo: true,
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://www.wikipedia.org/');
      expect(result.data).to.be.eql({});
      done();
    });
  });
  it('Valid Call - test getting the description from meta tags', function (done) {
    app({
      url: 'https://jshemas.github.io/openGraphScraperPages/twitter.html',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/twitter.html');
      expect(result.data.ogTitle).to.be.eql('Twitter. It\'s what\'s happening.');
      expect(result.data.ogDescription).to.be.eql('From breaking news and entertainment to sports and politics, get the full story with all the live commentary.');
      let imageFound = false;
      for (let i = 0; i < result.data.ogImage.length; i += 1) {
        if (result.data.ogImage[i].url === '/static/images/toolbar/wayback-toolbar-logo.png') {
          imageFound = true;
        }
      }
      expect(imageFound).to.be.eql(true);
      done();
    });
  });
  it('Valid Call - testing 304 page', function (done) {
    app({
      url: 'http://www.wemeanbusinesslondon.com/blog/2016/5/10/the-entrepreneur-spiration-series-going-nuts-for-pip-nut',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://www.wemeanbusinesslondon.com/blog/2016/5/10/the-entrepreneur-spiration-series-going-nuts-for-pip-nut');
      expect(result.data.ogSiteName).to.be.eql('WE MEAN BUSINESS | LONDON');
      expect(result.data.ogTitle).to.be.eql('The Entrepreneur-spiration Series: Going nuts for Pip & Nut — WE MEAN BUSINESS | LONDON');
      expect(result.data.ogUrl).to.be.eql('http://www.wemeanbusinesslondon.com/blog/2016/5/10/the-entrepreneur-spiration-series-going-nuts-for-pip-nut');
      expect(result.data.ogType).to.be.eql('article');
      expect(result.data.ogDescription).to.be.a('string');
      expect(result.data.twitterTitle).to.be.eql('The Entrepreneur-spiration Series: Going nuts for Pip &amp; Nut — WE MEAN BUSINESS | LONDON');
      expect(result.data.twitterCard).to.be.eql('summary');
      expect(result.data.twitterDescription).to.be.a('string');
      expect(result.data.ogImage.url).to.be.eql('http://static1.squarespace.com/static/56365f8ae4b0bcd8401ca823/563b8ecde4b075b4124bc9b8/5732300cc6fc085da9e6da16/1584829128507/unnamed.jpg?format=1500w');
      expect(result.data.ogImage.width).to.be.eql('1280');
      expect(result.data.ogImage.height).to.be.eql('779');
      expect(result.data.ogImage.type).to.be.eql(null);
      expect(result.data.twitterImage.url).to.be.eql('http://static1.squarespace.com/static/56365f8ae4b0bcd8401ca823/563b8ecde4b075b4124bc9b8/5732300cc6fc085da9e6da16/1584829128507/unnamed.jpg?format=1500w');
      expect(result.data.twitterImage.width).to.be.eql(null);
      expect(result.data.twitterImage.height).to.be.eql(null);
      expect(result.data.twitterImage.alt).to.be.eql(null);
      done();
    });
  });
  it('Valid Call - should contain array of images', function (done) {
    app({
      url: 'http://ogp.me',
      allMedia: true,
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://ogp.me');
      expect(result.data.ogTitle).to.be.eql('Open Graph protocol');
      expect(result.data.ogType).to.be.eql('website');
      expect(result.data.ogUrl).to.be.eql('http://ogp.me/');
      expect(result.data.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
      expect(result.data.ogImage[0].url).to.be.eql('http://ogp.me/logo.png');
      expect(result.data.ogImage[0].width).to.be.eql('300');
      expect(result.data.ogImage[0].height).to.be.eql('300');
      expect(result.data.ogImage[0].type).to.be.eql('image/png');
      done();
    });
  });
  it('Valid Call - Test Youtube Video - Should Return correct Open Graph Info', function (done) {
    app({
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.data.ogSiteName).to.be.eql('YouTube');
      expect(result.data.ogUrl).to.be.eql('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.data.ogType).to.be.eql('video.other');
      expect(result.data.twitterCard).to.be.eql('player');
      expect(result.data.twitterSite).to.be.a('string');
      expect(result.data.twitterAppNameiPhone).to.be.eql('YouTube');
      expect(result.data.twitterAppIdiPhone).to.be.eql('544007664');
      expect(result.data.twitterAppNameiPad).to.be.eql('YouTube');
      expect(result.data.twitterAppIdiPad).to.be.eql('544007664');
      expect(result.data.twitterAppNameGooglePlay).to.be.eql('YouTube');
      expect(result.data.twitterAppIdGooglePlay).to.be.eql('com.google.android.youtube');
      expect(result.data.twitterAppUrlGooglePlay).to.be.eql('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.data.ogImage.url).to.be.eql('https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg');
      expect(result.data.ogImage.width).to.be.eql('1280');
      expect(result.data.ogImage.height).to.be.eql('720');
      expect(result.data.ogImage.type).to.be.eql(null);
      expect(result.data.ogVideo.url).to.be.eql('https://www.youtube.com/embed/dQw4w9WgXcQ');
      expect(result.data.ogVideo.width).to.be.eql('1280');
      expect(result.data.ogVideo.height).to.be.eql('720');
      expect(result.data.ogVideo.type).to.be.eql('text/html');
      expect(result.data.twitterImage.url).to.be.eql('https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg');
      expect(result.data.twitterImage.width).to.be.eql(null);
      expect(result.data.twitterImage.height).to.be.eql(null);
      expect(result.data.twitterImage.alt).to.be.eql(null);
      expect(result.data.twitterPlayer.url).to.be.eql('https://www.youtube.com/embed/dQw4w9WgXcQ');
      expect(result.data.twitterPlayer.width).to.be.eql('1280');
      expect(result.data.twitterPlayer.height).to.be.eql('720');
      expect(result.data.twitterPlayer.stream).to.be.eql(null);
      done();
    });
  });
  // it looks like Twitch removed all of open graph, skip test for now
  it.skip('Valid Call - Test Twitch.tv Video - Should Return correct Open Graph Info', function (done) {
    app({
      url: 'https://www.twitch.tv/warcraft/v/78039967',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://www.twitch.tv/warcraft/v/78039967');
      expect(result.data.ogSiteName).to.be.eql('Twitch');
      expect(result.data.ogTitle).to.be.eql('World Quests and Demon Invasions Q&A with Jeremy Feasel');
      expect(result.data.ogDescription).to.be.eql('Warcraft - Twitch');
      expect(result.data.ogUrl).to.be.eql('https://www.twitch.tv/videos/78039967');
      expect(result.data.ogType).to.be.eql('video');
      expect(result.data.twitterTitle).to.be.eql('World Quests and Demon Invasions Q&A with Jeremy Feasel');
      expect(result.data.twitterDescription).to.be.eql('Warcraft - Twitch');
      expect(result.data.twitterCard).to.be.eql('player');
      expect(result.data.twitterAppNameGooglePlay).to.be.eql('Twitch');
      expect(result.data.twitterAppIdGooglePlay).to.be.eql('tv.twitch.android.app');
      expect(result.data.twitterAppNameiPhone).to.be.eql('Twitch');
      expect(result.data.twitterAppIdiPhone).to.be.eql('id460177396');
      expect(result.data.twitterAppUrliPhone).to.be.eql('twitch://stream/warcraft');
      expect(result.data.twitterAppNameiPad).to.be.eql('Twitch');
      expect(result.data.twitterAppIdiPad).to.be.eql(undefined);
      expect(result.data.twitterAppUrliPad).to.be.eql('twitch://stream/warcraft');
      expect(result.data.ogImage.url).to.be.eql('https://static-cdn.jtvnw.net/s3_vods/294d4c5c42_warcraft_22339636096_485121236/thumb/thumb0-480x320.jpg');
      expect(result.data.ogImage.width).to.be.eql(null);
      expect(result.data.ogImage.height).to.be.eql(null);
      expect(result.data.ogImage.type).to.be.eql(null);
      expect(result.data.ogVideo.url).to.be.eql('http://player.twitch.tv/?video=v78039967&player=facebook&autoplay=true');
      expect(result.data.ogVideo.width).to.be.eql('620');
      expect(result.data.ogVideo.height).to.be.eql('378');
      expect(result.data.ogVideo.type).to.be.eql('text/html');
      expect(result.data.twitterImage.url).to.be.eql('https://static-cdn.jtvnw.net/s3_vods/294d4c5c42_warcraft_22339636096_485121236/thumb/thumb0-480x320.jpg');
      expect(result.data.twitterImage.width).to.be.eql(null);
      expect(result.data.twitterImage.height).to.be.eql(null);
      expect(result.data.twitterImage.alt).to.be.eql(null);
      expect(result.data.twitterPlayer.url).to.be.eql('https://player.twitch.tv/?video=v78039967&player=twitter&autoplay=false');
      expect(result.data.twitterPlayer.width).to.be.eql('640');
      expect(result.data.twitterPlayer.height).to.be.eql('360');
      expect(result.data.twitterPlayer.stream).to.be.eql(null);
      done();
    });
  });
  it('Valid Call - Test Flickr Image - Should Return correct Open Graph Info', function (done) {
    app({
      url: 'https://jshemas.github.io/openGraphScraperPages/flickr',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/flickr');
      expect(result.data.ogSiteName).to.be.eql('Flickr');
      expect(result.data.twitterAppNameiPhone).to.be.eql('Flickr');
      expect(result.data.twitterAppIdiPhone).to.be.eql('328407587');
      expect(result.data.twitterSite).to.be.eql('@flickr');
      expect(result.data.ogTitle).to.be.eql('Heimgarten');
      expect(result.data.ogDescription).to.be.eql('____________________ Press "L" to view on black Press "F" to favor Share, if you like :)    You can leave a comment, if you like :)    Not to use or publish without permission! © Christoph Wagner Photographie');
      expect(result.data.ogType).to.be.eql('article');
      expect(result.data.ogUrl).to.be.eql('https://www.flickr.com/photos/travelgraph/18791678505/');
      expect(result.data.twitterCard).to.be.eql('photo');
      expect(result.data.twitterDescription).to.be.eql('____________________ Press "L" to view on black Press "F" to favor Share, if you like :)    You can leave a comment, if you like :)    Not to use or publish without permission! © Christoph Wagner Photographie');
      expect(result.data.twitterAppUrliPhone).to.be.eql('flickr://flickr.com/photos/travelgraph/18791678505/');
      expect(result.data.ogImage.url).to.be.eql('https://c1.staticflickr.com/1/499/18791678505_5886fefcf7_b.jpg');
      expect(result.data.ogImage.width).to.be.eql('1024');
      expect(result.data.ogImage.height).to.be.eql('375');
      expect(result.data.ogImage.type).to.be.eql(null);
      done();
    });
  });
  it('Valid Call - Test Forbes Article Redirect - Should Return correct Open Graph Info', function (done) {
    app({
      url: 'https://www.forbes.com/sites/kenkam/2017/09/28/3-stocks-like-apple-was-10-years-ago-tesla-nvidia-and-alibaba/#2636f6c2f0fa',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://www.forbes.com/sites/kenkam/2017/09/28/3-stocks-like-apple-was-10-years-ago-tesla-nvidia-and-alibaba/#2636f6c2f0fa');
      expect(result.data.ogSiteName).to.be.eql('Forbes');
      expect(result.data.twitterSite).to.be.eql('@forbes');
      expect(result.data.ogTitle).to.be.eql('3 Stocks Like Apple Was 10 Years Ago: Tesla, Nvidia And Alibaba');
      expect(result.data.ogUrl).to.be.eql('https://www.forbes.com/sites/kenkam/2017/09/28/3-stocks-like-apple-was-10-years-ago-tesla-nvidia-and-alibaba/');
      expect(result.data.ogDescription).to.be.eql('When Apple launched the iPhone 10 years ago the stock was at $22 and Wall Street considered it overvalued. Today it trades at $153. If you are looking for stocks like Apple for the next 10 years, take a close look at Tesla, Nvidia, and Alibaba.');
      expect(result.data.ogType).to.be.eql('article');
      expect(result.data.twitterCard).to.be.eql('summary_large_image');
      expect(result.data.twitterTitle).to.be.eql('3 Stocks Like Apple Was 10 Years Ago: Tesla, Nvidia And Alibaba');
      expect(result.data.twitterDescription).to.be.eql('When Apple launched the iPhone 10 years ago the stock was at $22 and Wall Street considered it overvalued. Today it trades at $153. If you are looking for stocks like Apple for the next 10 years, take a close look at Tesla, Nvidia, and Alibaba.');
      expect(result.data.twitterCreator).to.be.eql('@MarketocracyInc');
      expect(result.data.ogImage.url).to.be.a('string');
      expect(result.data.ogImage.width).to.be.eql(null);
      expect(result.data.ogImage.height).to.be.eql(null);
      expect(result.data.ogImage.type).to.be.eql(null);
      expect(result.data.twitterImage.url).to.be.a('string');
      expect(result.data.twitterImage.width).to.be.eql(null);
      expect(result.data.twitterImage.height).to.be.eql(null);
      expect(result.data.twitterImage.alt).to.be.eql(null);
      done();
    });
  });
  it('Valid Call - Test Name Cheap Page That Dose Not Have content-type=text/html - Should Return correct Open Graph Info', function (done) {
    app({
      url: 'https://www.namecheap.com/',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://www.namecheap.com/');
      expect(result.data.ogTitle).to.be.eql('Buy domain name - Cheap domain names from $1.37 - Namecheap');
      done();
    });
  });
  it('Valid Call - Test NYTimes Article Redirect - Should Return correct Open Graph Info', function (done) {
    app({
      url: 'https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html?_r=0',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html?_r=0');
      expect(result.data.twitterAppNameGooglePlay).to.be.eql('NYTimes');
      expect(result.data.twitterAppIdGooglePlay).to.be.eql('com.nytimes.android');
      expect(result.data.twitterAppUrlGooglePlay).to.be.eql('nyt://article/d07123d7-f6dc-5370-97cb-86dd6aa0b0de');
      expect(result.data.ogUrl).to.be.eql('https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html');
      expect(result.data.ogType).to.be.eql('article');
      expect(result.data.ogTitle).to.be.eql('Gallery Hopes to Sell Kanye West’s ‘Famous’ Sculpture for $4 Million');
      expect(result.data.ogDescription).to.be.eql('The Los Angeles gallery Blum & Poe, which hosted the ‘Famous’ exhibition, is projecting a hefty price tag for the work.');
      expect(result.data.twitterSite).to.be.eql('@nytimes');
      expect(result.data.twitterTitle).to.be.eql('Gallery Hopes to Sell Kanye West’s ‘Famous’ Sculpture for $4 Million');
      expect(result.data.twitterDescription).to.be.eql('The Los Angeles gallery Blum & Poe, which hosted the ‘Famous’ exhibition, is projecting a hefty price tag for the work.');
      expect(result.data.twitterCard).to.be.eql('summary_large_image');
      expect(result.data.ogImage.url).to.be.eql('https://static01.nyt.com/images/2016/09/02/arts/01KANYE1-web/01KANYE1-web-facebookJumbo.jpg');
      expect(result.data.ogImage.width).to.be.eql(null);
      expect(result.data.ogImage.height).to.be.eql(null);
      expect(result.data.ogImage.type).to.be.eql(null);
      expect(result.data.twitterImage.url).to.be.eql('https://static01.nyt.com/images/2016/09/02/arts/01KANYE1-web/01KANYE1-web-videoSixteenByNineJumbo1600.jpg');
      expect(result.data.twitterImage.width).to.be.eql(null);
      expect(result.data.twitterImage.height).to.be.eql(null);
      done();
    });
  });
  // TODO: for some reason this is failing in travis-ci but not locally
  it.skip('Valid Call - vimeo.com should return open graph data', function (done) {
    app({
      url: 'https://vimeo.com/232889838',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.data.ogSiteName).to.be.eql('Vimeo');
      expect(result.data.ogUrl).to.be.eql('https://vimeo.com/232889838');
      expect(result.data.ogType).to.be.eql('video');
      expect(result.data.ogTitle).to.be.a('string');
      expect(result.data.ogDescription).to.be.a('string');
      expect(result.data.twitterCard).to.be.eql('player');
      expect(result.data.twitterSite).to.be.eql('@vimeo');
      expect(result.data.twitterTitle).to.be.a('string');
      expect(result.data.twitterDescription).to.be.a('string');
      expect(result.data.twitterAppNameiPhone).to.be.eql('Vimeo');
      expect(result.data.twitterAppIdiPhone).to.be.eql('425194759');
      expect(result.data.twitterAppUrliPhone).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.data.twitterAppNameiPad).to.be.eql('Vimeo');
      expect(result.data.twitterAppIdiPad).to.be.eql('425194759');
      expect(result.data.twitterAppUrliPad).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.data.twitterAppNameGooglePlay).to.be.eql('Vimeo');
      expect(result.data.twitterAppIdGooglePlay).to.be.eql('com.vimeo.android.videoapp');
      expect(result.data.twitterAppUrlGooglePlay).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      // expect(result.data.ogImage.url).to.be.eql('https://i.vimeocdn.com/video/659221704_1280x720.jpg');
      expect(result.data.ogImage.width).to.be.eql('1280');
      expect(result.data.ogImage.height).to.be.eql('720');
      expect(result.data.ogImage.type).to.be.eql('image/jpg');
      expect(result.data.ogVideo.url).to.be.eql('https://player.vimeo.com/video/232889838?autoplay=1');
      expect(result.data.ogVideo.width).to.be.eql('1280');
      expect(result.data.ogVideo.height).to.be.eql('720');
      expect(result.data.ogVideo.type).to.be.eql('text/html');
      // expect(result.data.twitterImage.url).to.be.eql('https://i.vimeocdn.com/video/659221704_1280x720.jpg');
      expect(result.data.twitterImage.width).to.be.eql(null);
      expect(result.data.twitterImage.height).to.be.eql(null);
      expect(result.data.twitterImage.alt).to.be.eql(null);
      expect(result.data.twitterPlayer.url).to.be.eql('https://player.vimeo.com/video/232889838');
      expect(result.data.twitterPlayer.width).to.be.eql('1280');
      expect(result.data.twitterPlayer.height).to.be.eql('720');
      expect(result.data.twitterPlayer.stream).to.be.eql(null);
      done();
    });
  });
  it('Valid Call - michaelkors should return open graph data', function (done) {
    app({
      url: 'https://jshemas.github.io/openGraphScraperPages/michaelkors',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.data.ogType).to.be.eql('product');
      expect(result.data.ogTitle).to.be.eql('Mirabel Suede Sandal  | Michael Kors');
      expect(result.data.ogDescription).to.be.eql('Exclusively Ours in Michael Kors stores and on michaelkors.com until 7/30/16. Geometric cutouts lend captivating flair to our Mirabel sandals in sumptuous suede. Anchored by a block heel and swingy tassel laces, they look especially chic grounding midi hemlines and cropped denim.');
      expect(result.data.ogUrl).to.be.eql('https://web.archive.org/web/20161126090544/http://www.michaelkors.com/mirabel-suede-sandal/_/R-US_40T6MBMS1S');
      expect(result.data.ogSiteName).to.be.eql('Michael Kors');
      expect(result.data.ogPriceAmount).to.be.eql('80.00');
      expect(result.data.ogPriceCurrency).to.be.eql('USD');
      expect(result.data.ogAvailability).to.be.eql('InStock');
      expect(result.data.ogImage.url).to.be.eql('http://michaelkors.scene7.com/is/image/MichaelKors/40T6MBMS1S-0001_IS');
      expect(result.data.ogImage.width).to.be.eql('400');
      expect(result.data.ogImage.height).to.be.eql('400');
      expect(result.data.ogImage.type).to.be.eql(null);
      done();
    });
  });
  it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info - Twitter Site', function (done) {
    app({
      url: 'https://jshemas.github.io/openGraphScraperPages/twitter-dev',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/twitter-dev');
      expect(result.data.twitterTitle).to.be.eql('Twitter Developers');
      expect(result.data.twitterCard).to.be.eql('summary');
      expect(result.data.twitterDescription).to.be.eql('The Twitter platform connects your website or application with the worldwide conversation happening on Twitter.');
      expect(result.data.twitterImage.url).to.contain('https://web.archive.org/web/20160303190414im_/https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png');
      expect(result.data.ogSiteName).to.be.eql('Twitter Developers');
      expect(result.data.ogTitle).to.be.eql('Twitter Developers');
      expect(result.data.ogUrl).to.be.eql('https://web.archive.org/web/20160303190414im_/https://dev.twitter.com/');
      expect(result.data.ogType).to.be.eql('website');
      expect(result.data.ogImage.url).to.contain('https://web.archive.org/web/20160303190414im_/https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png');
      done();
    });
  });
  it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info - Github Site', function (done) {
    app({
      url: 'https://jshemas.github.io/openGraphScraperPages/github',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/github');
      expect(result.data.ogUrl).to.be.eql('https://web.archive.org/web/20170113081103/https://github.com/');
      expect(result.data.ogSiteName).to.be.eql('GitHub');
      expect(result.data.ogTitle).to.be.eql('Build software better, together');
      expect(result.data.ogDescription).to.be.a('string');
      expect(result.data.ogImage.url).to.be.eql('https://web.archive.org/web/20170113081103im_/https://assets-cdn.github.com/images/modules/open_graph/github-logo.png');
      expect(result.data.ogImage.width).to.be.eql('1200');
      expect(result.data.ogImage.height).to.be.eql('1200');
      expect(result.data.ogImage.type).to.be.eql('image/png');
      done();
    });
  });
  it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info - Atom Site', function (done) {
    app({
      url: 'https://jshemas.github.io/openGraphScraperPages/atom.html',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/atom.html');
      expect(result.data.ogUrl).to.be.eql('https://web.archive.org/web/20170913111314/https://atom.io/');
      expect(result.data.ogSiteName).to.be.eql('Atom');
      expect(result.data.ogTitle).to.be.eql('A hackable text editor for the 21st Century');
      expect(result.data.ogDescription).to.be.eql('At GitHub, we’re building the text editor we’ve always wanted: hackable to the core, but approachable on the first day without ever touching a config file. We can’t wait to see what you build with it.');
      expect(result.data.ogType).to.be.eql('website');
      expect(result.data.twitterCard).to.be.eql('summary_large_image');
      expect(result.data.twitterSite).to.be.eql('@AtomEditor');
      expect(result.data.twitterCreator).to.be.eql('@github');
      expect(result.data.twitterTitle).to.be.eql('Atom');
      expect(result.data.twitterDescription).to.be.eql('A hackable text editor for the 21st Century');
      expect(result.data.ogImage.url).to.be.eql('https://web.archive.org/web/20170913111314im_/http://og.github.com/atom-mark/atom-mark@1200x630.png');
      expect(result.data.ogImage.width).to.be.eql('1200');
      expect(result.data.ogImage.height).to.be.eql('630');
      expect(result.data.ogImage.type).to.be.eql(null);
      expect(result.data.twitterImage.url).to.be.eql('https://web.archive.org/web/20170913111314im_/http://og.github.com/atom-logo/atom-logo@1200x630.png');
      expect(result.data.twitterImage.width).to.be.eql('1200');
      expect(result.data.twitterImage.height).to.be.eql('630');
      expect(result.data.twitterImage.alt).to.be.eql(null);
      done();
    });
  });
  it('Valid Call - Utf-8 charset - Should Return correct Open Graph Info + charset info', function (done) {
    app({
      url: 'http://ogp.me/',
      withCharset: true,
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('http://ogp.me/');
      expect(result.data.charset).to.be.eql('utf8');
      done();
    });
  });
  it('Valid Call - windows-1251 charset - Should Return correct Open Graph Info + charset info', function (done) {
    app({
      url: 'http://www.gazeta.ru/',
      encoding: null,
      withCharset: true,
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      // sometimes we get ESOCKETTIMEDOUT errors, vars just try again
      if (error === true) {
        console.log('found error, trying agine');
        app({
          url: 'http://www.gazeta.ru/',
          encoding: null,
          withCharset: true,
        }, function (callTwoError, callTwoResult) {
          console.log('error:', callTwoError);
          console.log('result:', callTwoResult);
          expect(callTwoError).to.be.eql(false);
          expect(callTwoResult.success).to.be.eql(true);
          expect(callTwoResult.requestUrl).to.be.eql('http://www.gazeta.ru/');
          expect(callTwoResult.data.charset).to.be.eql('windows-1251');
          expect(callTwoResult.data.ogTitle).to.be.eql('Главные новости - Газета.Ru');
          done();
        });
      } else {
        expect(error).to.be.eql(false);
        expect(result.success).to.be.eql(true);
        expect(result.requestUrl).to.be.eql('http://www.gazeta.ru/');
        expect(result.data.charset).to.be.eql('windows-1251');
        expect(result.data.ogTitle).to.be.eql('Главные новости - Газета.Ru');
        done();
      }
    });
  });
  it('Valid Call - legacy no charset - Should Return correct Open Graph Info + charset info', function (done) {
    app({
      url: 'https://jshemas.github.io/openGraphScraperPages/rakuten',
      encoding: null,
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/rakuten');
      expect(result.data.ogTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
      done();
    });
  });
  it('Invalid Call - Encoding not recognized', function (done) {
    app({
      url: 'http://www.tnnbar.org.tw/',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      // sometimes we get ESOCKETTIMEDOUT errors, vars just try again
      if (error === true) {
        console.log('found error, trying agine');
        app({
          url: 'http://www.tnnbar.org.tw/',
        }, function (callTwoError, callTwoResult) {
          console.log('error:', callTwoError);
          console.log('result:', callTwoResult);
          expect(callTwoError).to.be.eql(true);
          expect(callTwoResult.success).to.be.eql(false);
          expect(callTwoResult.requestUrl).to.be.eql('http://www.tnnbar.org.tw/');
          expect(callTwoResult.error).to.be.eql('Page Not Found');
          done();
        });
      } else {
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('http://www.tnnbar.org.tw/');
        expect(result.error).to.be.eql('Page Not Found');
        done();
      }
    });
  });
  it('Invalid Call - Not a HTML page', function (done) {
    app({
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Overlook_Hong_Kong_Island_north_coast,_Victoria_Harbour_and_Kowloon_from_middle_section_of_Lugard_Road_at_daytime_(enlarged_version_and_better_contrast,_revised).jpg',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('https://upload.wikimedia.org/wikipedia/commons/a/a2/Overlook_Hong_Kong_Island_north_coast,_Victoria_Harbour_and_Kowloon_from_middle_section_of_Lugard_Road_at_daytime_(enlarged_version_and_better_contrast,_revised).jpg');
      expect(result.error).to.be.eql('Must scrape an HTML page');
      done();
    });
  });
  it('Invalid Call - Can\'t request URL and pass in HTML string', function (done) {
    app({
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Overlook_Hong_Kong_Island_north_coast,_Victoria_Harbour_and_Kowloon_from_middle_section_of_Lugard_Road_at_daytime_(enlarged_version_and_better_contrast,_revised).jpg',
      html: HTML_STRING,
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(true);
      expect(result.success).to.be.eql(false);
      expect(result.requestUrl).to.be.eql('https://upload.wikimedia.org/wikipedia/commons/a/a2/Overlook_Hong_Kong_Island_north_coast,_Victoria_Harbour_and_Kowloon_from_middle_section_of_Lugard_Road_at_daytime_(enlarged_version_and_better_contrast,_revised).jpg');
      expect(result.error).to.be.eql('Must specify either `url` or `html`, not both');
      done();
    });
  });
  it('Valid Call - pass in HTML string', function (done) {
    app({
      html: HTML_STRING,
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.data.ogTitle).to.be.eql('Test page');
      done();
    });
  });
  // TODO: looks like amazon is now blocking these kinds of calls... getting a robot check page
  it.skip('Valid Call - should get array of images back', function (done) {
    app({
      url: 'https://www.amazon.com/Anatomy-Story-Becoming-Master-Storyteller/dp/0865479933',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.data.ogImage.length).to.be.above(10);
      let imageFound = false;
      for (let i = 0; i < result.data.ogImage.length; i += 1) {
        if (result.data.ogImage[i].url === 'https://images-na.ssl-images-amazon.com/images/G/01/vse/Discovery/vse_play_icon_2x.png') {
          imageFound = true;
        }
      }
      expect(imageFound).to.be.eql(true);
      done();
    });
  });
  it('Valid Call - spotify album should return music:album and associated tags', function (done) {
    app({
      url: 'https://open.spotify.com/album/5EBGCvO6upi3GNknMVe9x9',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/album/5EBGCvO6upi3GNknMVe9x9');
      expect(result.data.ogType).to.be.eql('music.album');
      expect(result.data.musicMusician[0]).to.be.eql('https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.data.musicReleaseDate).to.be.eql('2018-06-01');
      expect(result.data.musicSong).to.be.an('object');
      expect(result.data.musicSong.url).to.be.an('string');
      expect(result).to.be.an('object');
      done();
    });
  });
  it('Valid Call - spotify artist should return music:musician', function (done) {
    app({
      url: 'https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.data.ogType).to.be.eql('music.musician');
      expect(result).to.be.an('object');
      done();
    });
  });
  it('Valid Call - spotify track should return music:song and associated tags', function (done) {
    app({
      url: 'https://open.spotify.com/track/3p6fkbeZDIVqapfdgQe6fm',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/track/3p6fkbeZDIVqapfdgQe6fm');
      expect(result.data.ogType).to.be.eql('music.song');
      expect(result.data.musicMusician[0]).to.be.eql('https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.data.musicDuration).to.be.eql('196');
      expect(result.data.musicReleaseDate).to.be.eql('2016-06-10');
      expect(result.data.musicAlbum[0]).to.be.eql('https://open.spotify.com/album/4xM1pUHZp9HsuKNxyOQDR0');
      expect(result.data.musicAlbumTrack).to.be.eql('4');
      expect(result).to.be.an('object');
      done();
    });
  });
  it('Valid Call - spotify playlist should return music:playlist and associated tags', function (done) {
    app({
      url: 'https://open.spotify.com/user/mjaschmidt/playlist/4BSIiLTu7qzDZLDdkHaty9?si=9UCDOCPGQZKf9jkCBwDOMg',
    }, function (error, result) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/user/mjaschmidt/playlist/4BSIiLTu7qzDZLDdkHaty9?si=9UCDOCPGQZKf9jkCBwDOMg');
      expect(result.data.ogType).to.be.eql('music.playlist');
      expect(result.data.musicSong).to.be.an('object');
      expect(result.data.musicSong.url).to.be.an('string');
      expect(result).to.be.an('object');
      done();
    });
  });
});
