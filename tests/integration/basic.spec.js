const ogs = require('../../index');

describe('basic', function () {
  it('using callbacks should return valid data', function () {
    return ogs({
      url: 'http://ogp.me/',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.description).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
      expect(result.ogTitle).to.be.eql('Open Graph protocol');
      expect(result.ogType).to.be.eql('website');
      expect(result.ogUrl).to.be.eql('http://ogp.me/');
      expect(result.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
      expect(result.ogImage).to.be.eql({
        url: 'http://ogp.me/logo.png',
        width: '300',
        height: '300',
        type: 'image/png',
      });
      expect(result.requestUrl).to.be.eql('http://ogp.me/');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys('description', 'ogTitle', 'ogType', 'ogUrl', 'ogDescription', 'ogImage', 'requestUrl', 'success');
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('using promises should return valid data', function () {
    return ogs({ url: 'http://ogp.me/' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.description).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
        expect(result.ogTitle).to.be.eql('Open Graph protocol');
        expect(result.ogType).to.be.eql('website');
        expect(result.ogUrl).to.be.eql('http://ogp.me/');
        expect(result.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
        expect(result.ogImage).to.be.eql({
          url: 'http://ogp.me/logo.png',
          width: '300',
          height: '300',
          type: 'image/png',
        });
        expect(result.requestUrl).to.be.eql('http://ogp.me/');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys('description', 'ogTitle', 'ogType', 'ogUrl', 'ogDescription', 'ogImage', 'requestUrl', 'success');
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('Test Name Cheap Page That Dose Not Have content-type=text/html - Should Return correct Open Graph Info', function () {
    return ogs({
      url: 'https://www.namecheap.com/',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.ogTitle).to.be.eql('Buy domain name - Cheap domain names from $1.37 - Namecheap');
      expect(result.ogDescription).to.be.eql('Namecheap offers cheap domain names with the most reliable service. Buy domain names with Namecheap and see why over 2 million customers trust us with over 10 million domains!');
      expect(result.ogImage).to.be.an('array').and.to.not.be.empty;
      expect(result.requestUrl).to.be.eql('https://www.namecheap.com/');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys('description', 'ogTitle', 'ogDescription', 'ogImage', 'requestUrl', 'success');
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  // travis will return a 'Response code 403 (Forbidden)' error on this page
  it.skip('vimeo.com should return open graph data', function () {
    return ogs({
      url: 'https://vimeo.com/232889838',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.description).to.be.eql('A painter with dozens of pieces but only one subject—his ex-wife.   From our Rashomon issue: https://go.topic.com/2xkCAtR  Directed by Jessica Beshir.  •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••  Topic…');
      expect(result.ogSiteName).to.be.eql('Vimeo');
      expect(result.ogUrl).to.be.eql('https://vimeo.com/232889838');
      expect(result.ogType).to.be.eql('video');
      expect(result.ogTitle).to.be.eql('Heroin');
      expect(result.ogDescription).to.be.eql('A painter with dozens of pieces but only one subject—his ex-wife.   From our Rashomon issue: https://go.topic.com/2xkCAtR  Directed by Jessica Beshir.  •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••  Topic…');
      expect(result.twitterCard).to.be.eql('player');
      expect(result.twitterSite).to.be.eql('@vimeo');
      expect(result.twitterTitle).to.be.eql('Heroin');
      expect(result.twitterDescription).to.be.eql('A painter with dozens of pieces but only one subject—his ex-wife.   From our Rashomon issue: https://go.topic.com/2xkCAtR  Directed by Jessica Beshir.  •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••  Topic…');
      expect(result.twitterAppNameiPhone).to.be.eql('Vimeo');
      expect(result.twitterAppIdiPhone).to.be.eql('425194759');
      expect(result.twitterAppUrliPhone).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.twitterAppNameiPad).to.be.eql('Vimeo');
      expect(result.twitterAppIdiPad).to.be.eql('425194759');
      expect(result.twitterAppUrliPad).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.twitterAppNameGooglePlay).to.be.eql('Vimeo');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.vimeo.android.videoapp');
      expect(result.twitterAppUrlGooglePlay).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.ogImage).to.be.eql({
        url: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F659221704_1280x720.jpg&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png',
        width: '1280',
        height: '720',
        type: 'image/jpg',
      });
      expect(result.ogVideo).to.be.eql({
        url: 'https://player.vimeo.com/video/232889838?autoplay=1',
        width: '1280',
        height: '720',
        type: 'text/html',
      });
      expect(result.twitterImage).to.be.eql({
        url: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F659221704_1280x720.jpg&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png',
        width: null,
        height: null,
        alt: null,
      });
      expect(result.twitterPlayer).to.be.eql({
        url: 'https://player.vimeo.com/video/232889838',
        width: '1280',
        height: '720',
        stream: null,
      });
      expect(result.requestUrl).to.be.eql('https://vimeo.com/232889838');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'description',
        'ogDescription',
        'ogImage',
        'ogSiteName',
        'ogTitle',
        'ogType',
        'ogUrl',
        'ogVideo',
        'requestUrl',
        'success',
        'twitterAppIdGooglePlay',
        'twitterAppIdiPad',
        'twitterAppIdiPhone',
        'twitterAppNameGooglePlay',
        'twitterAppNameiPad',
        'twitterAppNameiPhone',
        'twitterAppUrlGooglePlay',
        'twitterAppUrliPad',
        'twitterAppUrliPhone',
        'twitterCard',
        'twitterDescription',
        'twitterImage',
        'twitterPlayer',
        'twitterSite',
        'twitterTitle',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('michaelkors should return open graph data', function () {
    return ogs({
      url: 'https://jshemas.github.io/openGraphScraperPages/michaelkors',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.author).to.be.eql('Michael Kors');
      expect(result.description).to.be.eql('Exclusively Ours in Michael Kors stores and on michaelkors.com until 7/30/16. Geometric cutouts lend captivating flair to our Mirabel sandals in sumptuous suede. Anchored by a block heel and swingy tassel laces, they look especially chic grounding midi hemlines and cropped denim.');
      expect(result.ogType).to.be.eql('product');
      expect(result.ogTitle).to.be.eql('Mirabel Suede Sandal  | Michael Kors');
      expect(result.ogDescription).to.be.eql('Exclusively Ours in Michael Kors stores and on michaelkors.com until 7/30/16. Geometric cutouts lend captivating flair to our Mirabel sandals in sumptuous suede. Anchored by a block heel and swingy tassel laces, they look especially chic grounding midi hemlines and cropped denim.');
      expect(result.ogUrl).to.be.eql('https://web.archive.org/web/20161126090544/http://www.michaelkors.com/mirabel-suede-sandal/_/R-US_40T6MBMS1S');
      expect(result.ogSiteName).to.be.eql('Michael Kors');
      expect(result.ogPriceAmount).to.be.eql('80.00');
      expect(result.ogPriceCurrency).to.be.eql('USD');
      expect(result.ogAvailability).to.be.eql('InStock');
      expect(result.ogImage).to.be.eql({
        url: 'http://michaelkors.scene7.com/is/image/MichaelKors/40T6MBMS1S-0001_IS',
        width: '400',
        height: '400',
        type: null,
      });
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/michaelkors');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys('author', 'description', 'ogAvailability', 'ogTitle', 'ogType', 'ogUrl', 'ogDescription', 'ogPriceAmount', 'ogPriceCurrency', 'ogSiteName', 'ogImage', 'requestUrl', 'success');
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
});
