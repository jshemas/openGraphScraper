'use strict';

const app = require('../index');
const expect = require('expect.js');

describe('GET OG', function () {
  this.timeout(10000); // should wait at least ten seconds before failing
  it('Valid Call - ogp.me should return open graph data', function (done) {
    app({
      'url': 'http://ogp.me/'
    }, function (err, result, response) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Open Graph protocol');
      expect(result.data.ogType).to.be('website');
      expect(result.data.ogUrl).to.be('http://ogp.me/');
      expect(result.data.ogDescription).to.be('The Open Graph protocol enables any web page to become a rich object in a social graph.');
      expect(result.data.ogImage.url).to.be('http://ogp.me/logo.png');
      expect(result.data.ogImage.width).to.be('300');
      expect(result.data.ogImage.height).to.be('300');
      expect(result.data.ogImage.type).to.be('image/png');
      expect(response).to.be.an('object');
      done();
    });
  });
  it('Valid Call - ogp.me should return open graph data - promise version', function (done) {
    app({'url': 'http://ogp.me/'})
      .then(function (result) {
        console.log('result:', result);
        expect(result.success).to.be(true);
        expect(result.data.ogTitle).to.be('Open Graph protocol');
        expect(result.data.ogType).to.be('website');
        expect(result.data.ogUrl).to.be('http://ogp.me/');
        expect(result.data.ogDescription).to.be('The Open Graph protocol enables any web page to become a rich object in a social graph.');
        expect(result.data.ogImage.url).to.be('http://ogp.me/logo.png');
        expect(result.data.ogImage.width).to.be('300');
        expect(result.data.ogImage.height).to.be('300');
        expect(result.data.ogImage.type).to.be('image/png');
        done();
      })
      .catch(function (err) {
        console.log('err:', err);
        expect(err).to.be(false);
      });
  });
  it('Valid Call - http', function (done) {
    app({
      'url': 'http://www.wikipedia.org/'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Wikipedia');
      done();
    });
  });
  it('Valid Call - https', function (done) {
    app({
      'url': 'https://www.wikipedia.org/'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Wikipedia');
      done();
    });
  });
  it('Valid Call - no protocol', function (done) {
    app({
      'url': 'www.wikipedia.org/'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Wikipedia');
      done();
    });
  });
  it('Valid Call - no protocol and no wwww', function (done) {
    app({
      'url': 'wikipedia.org/'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Wikipedia');
      done();
    });
  });
  it('Valid Call - protocol with no wwww', function (done) {
    app({
      'url': 'http://wikipedia.org/'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Wikipedia');
      done();
    });
  });
  it('Invalid Call - fake page', function (done) {
    app({
      'url': 'http://testtesttest4564568.com'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(true);
      expect(result.success).to.be(false);
      expect(result.err).to.be('Page Not Found');
      done();
    });
  });
  it('Invalid Call - empty url', function (done) {
    app({
      'url': ''
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(true);
      expect(result.success).to.be(false);
      expect(result.err).to.be('Invalid URL');
      done();
    });
  });
  it('Invalid Call - empty options', function (done) {
    app({}, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(true);
      expect(result.err).to.be('Invalid URL');
      expect(result.success).to.be(false);
      done();
    });
  });
  it('Valid Call - timeout set to 2000', function (done) {
    app({
      'url': 'http://www.wikipedia.org/',
      'timeout': 2000
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Wikipedia');
      done();
    });
  });
  it('Valid Call - timeout set to empty string', function (done) {
    app({
      'url': 'http://www.wikipedia.org/',
      'timeout': ''
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Wikipedia');
      done();
    });
  });
  it('Valid Call - timeout number is a string', function (done) {
    app({
      'url': 'http://www.wikipedia.org/',
      'timeout': '2000'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Wikipedia');
      done();
    });
  });
  it('Valid Call - time is just a string of chars', function (done) {
    app({
      'url': 'http://www.wikipedia.org/',
      'timeout': 'sdsdds'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('Wikipedia');
      done();
    });
  });
  it('Invalid Call - url is just a number', function (done) {
    app({
      'url': 23233
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(true);
      expect(result.success).to.be(false);
      expect(result.err).to.be('Page Not Found');
      done();
    });
  });
  it('Invalid Call - url is a string of numbers', function (done) {
    app({
      'url': '2323233'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(true);
      expect(result.success).to.be(false);
      expect(result.err).to.be('Page Not Found');
      done();
    });
  });
  it('Invalid Call - url is a string of words', function (done) {
    app({
      'url': 'this is a testt'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(true);
      expect(result.success).to.be(false);
      expect(result.err).to.be('Page Not Found');
      done();
    });
  });
  it('Invalid Call - response code is 404', function (done) {
    app({
      'url': 'https://github.com/jshemas/notOpenGraphScraper'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(true);
      expect(result.success).to.be(false);
      expect(result.err).to.be('Page Not Found');
      done();
    });
  });
  it('Valid Call - only get open graph info', function (done) {
    app({
      'url': 'http://www.wikipedia.org/',
      'onlyGetOpenGraphInfo': true
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data).to.be.empty();
      done();
    });
  });
  it('Valid Call - test getting the description from meta tags', function (done) {
    app({
      'url': 'https://twitter.com/'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle.length > 0).to.be(true);
      expect(result.data.ogDescription.length > 0).to.be(true);
      done();
    });
  });
  it('Valid Call - testing 304 page', function (done) {
    app({
      'url': 'http://www.wemeanbusinesslondon.com/blog/2016/5/10/the-entrepreneur-spiration-series-going-nuts-for-pip-nut'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('The Entrepreneur-spiration Series: Going nuts for Pip & Nut');
      done();
    });
  });
  it('Valid Call - should contain array of images', function (done) {
    app({
      'url': 'http://ogp.me',
      'allMedia': true
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogImage[0].url).to.be('http://ogp.me/logo.png');
      expect(result.data.ogImage[0].width).to.be('300');
      expect(result.data.ogImage[0].height).to.be('300');
      expect(result.data.ogImage[0].type).to.be('image/png');
      done();
    });
  });
  it('Valid Call - Test Youtube Video - Should Return correct Open Graph Info', function (done) {
    app({
      'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogSiteName).to.be('YouTube');
      expect(result.data.ogTitle).to.be('Rick Astley - Never Gonna Give You Up');
      expect(result.data.ogUrl).to.be('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.data.ogDescription).to.be('Rick Astley - Never Gonna Give You Up (Official Music Video) - Listen On Spotify: http://smarturl.it/AstleySpotify Download Rick\'s Number 1 album "50" - http...');
      expect(result.data.ogType).to.be('video');
      expect(result.data.ogImage.url).to.be('https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg');
      expect(result.data.ogVideo.url).to.be('https://www.youtube.com/embed/dQw4w9WgXcQ');
      expect(result.data.ogVideo.type).to.be('text/html');
      expect(result.data.ogVideo.width).to.be('1280');
      expect(result.data.ogVideo.height).to.be('720');
      done();
    });
  });
  it('Valid Call - Test Twitch.tv Video - Should Return correct Open Graph Info', function (done) {
    app({
      'url': 'https://www.twitch.tv/warcraft/v/78039967'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogSiteName).to.be('Twitch');
      expect(result.data.ogType).to.be('video');
      expect(result.data.ogImage.url).to.be('https://static-cdn.jtvnw.net/s3_vods/294d4c5c42_warcraft_22339636096_485121236/thumb/thumb0-480x320.jpg');
      expect(result.data.ogVideo.url).to.be('http://player.twitch.tv/?video=v78039967&player=facebook&autoplay=true');
      expect(result.data.ogVideo.type).to.be('text/html');
      expect(result.data.ogVideo.width).to.be('620');
      expect(result.data.ogVideo.height).to.be('378');
      done();
    });
  });
  it('Valid Call - Test Flickr Image - Should Return correct Open Graph Info', function (done) {
    app({
      'url': 'https://www.flickr.com/photos/travelgraph/18791678505/in/gallery-flickr-72157663638192642/'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogSiteName).to.be('Flickr');
      expect(result.data.ogTitle).to.be('Heimgarten');
      expect(result.data.ogUrl).to.be('https://www.flickr.com/photos/travelgraph/18791678505/');
      expect(result.data.ogType).to.be('article');
      expect(result.data.ogImage.url).to.be('https://c1.staticflickr.com/1/499/18791678505_5886fefcf7_b.jpg');
      expect(result.data.ogImage.width).to.be('1024');
      expect(result.data.ogImage.height).to.be('375');
      done();
    });
  });
  it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info - Twitter Site', function (done) {
    app({
      'url': 'https://jshemas.github.io/openGraphScraperPages/twitter-dev'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.twitterTitle).to.be('Twitter Developers');
      expect(result.data.twitterCard).to.be('summary');
      expect(result.data.twitterDescription).to.be('The Twitter platform connects your website or application with the worldwide conversation happening on Twitter.');
      expect(result.data.twitterImage.url).to.contain('https://web.archive.org/web/20160303190414im_/https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png');
      expect(result.data.ogSiteName).to.be('Twitter Developers');
      expect(result.data.ogTitle).to.be('Twitter Developers');
      expect(result.data.ogUrl).to.be('https://web.archive.org/web/20160303190414im_/https://dev.twitter.com/');
      expect(result.data.ogType).to.be('website');
      expect(result.data.ogImage.url).to.contain('https://web.archive.org/web/20160303190414im_/https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png');
      done();
    });
  });
  it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info - Github Site', function (done) {
    app({
      'url': 'https://jshemas.github.io/openGraphScraperPages/github'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogUrl).to.be('https://web.archive.org/web/20170113081103/https://github.com/');
      expect(result.data.ogSiteName).to.be('GitHub');
      expect(result.data.ogTitle).to.be('Build software better, together');
      expect(result.data.ogDescription).to.be.a('string');
      expect(result.data.ogImage.url).to.be('https://web.archive.org/web/20170113081103im_/https://assets-cdn.github.com/images/modules/open_graph/github-logo.png');
      expect(result.data.ogImage.width).to.be('1200');
      expect(result.data.ogImage.height).to.be('1200');
      expect(result.data.ogImage.type).to.be('image/png');
      done();
    });
  });
  it('Valid Call - Test Twitter Tags - Should Return correct Open Graph Info + Some Twitter Info - Atom Site', function (done) {
    app({
      'url': 'https://atom.io'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogUrl).to.be('https://atom.io/');
      expect(result.data.ogSiteName).to.be('Atom');
      expect(result.data.ogTitle).to.be('A hackable text editor for the 21st Century');
      expect(result.data.ogDescription).to.be('At GitHub, we’re building the text editor we’ve always wanted: hackable to the core, but approachable on the first day without ever touching a config file. We can’t wait to see what you build with it.');
      expect(result.data.ogType).to.be('website');
      expect(result.data.twitterCard).to.be('summary_large_image');
      expect(result.data.twitterSite).to.be('@AtomEditor');
      expect(result.data.twitterCreator).to.be('@github');
      expect(result.data.twitterTitle).to.be('Atom');
      expect(result.data.twitterDescription).to.be('A hackable text editor for the 21st Century');
      expect(result.data.ogImage.url).to.be('http://og.github.com/atom-mark/atom-mark@1200x630.png');
      expect(result.data.ogImage.width).to.be('1200');
      expect(result.data.ogImage.height).to.be('630');
      expect(result.data.ogImage.type).to.be(null);
      expect(result.data.twitterImage.url).to.be('http://og.github.com/atom-logo/atom-logo@1200x630.png');
      expect(result.data.twitterImage.width).to.be('1200');
      expect(result.data.twitterImage.height).to.be('630');
      expect(result.data.twitterImage.alt).to.be(null);
      done();
    });
  });
  it('Valid Call - Utf-8 charset - Should Return correct Open Graph Info + charset info', function (done) {
    app({
      'url': 'http://ogp.me/',
      'withCharset': true
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.charset).to.be('utf8');
      done();
    });
  });
  it('Valid Call - windows-1251 charset - Should Return correct Open Graph Info + charset info', function (done) {
    app({
      'url': 'http://www.gazeta.ru/',
      'encoding': null,
      'withCharset': true
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.charset).to.be('windows-1251');
      expect(result.data.ogTitle).to.be('Главные новости - Газета.Ru');
      done();
    });
  });
  it('Valid Call - legacy no charset - Should Return correct Open Graph Info + charset info', function (done) {
    app({
      'url': 'https://jshemas.github.io/openGraphScraperPages/rakuten',
      'encoding': null
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(false);
      expect(result.success).to.be(true);
      expect(result.data.ogTitle).to.be('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
      done();
    });
  });
  it('Invalid Call - Not a HTML page', function (done) {
    app({
      'url': 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Overlook_Hong_Kong_Island_north_coast,_Victoria_Harbour_and_Kowloon_from_middle_section_of_Lugard_Road_at_daytime_(enlarged_version_and_better_contrast,_revised).jpg'
    }, function (err, result) {
      console.log('err:', err);
      console.log('result:', result);
      expect(err).to.be(true);
      expect(result.success).to.be(false);
      expect(result.err).to.be('Must scrape an HTML page');
      done();
    });
  });
});
