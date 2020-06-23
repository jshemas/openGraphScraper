const ogs = require('../../index');

describe('image', function () {
  it('Test Flickr Image - Should Return correct Open Graph Info', function () {
    return ogs({
      url: 'https://jshemas.github.io/openGraphScraperPages/flickr',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogSiteName).to.be.eql('Flickr');
      expect(result.twitterAppNameiPhone).to.be.eql('Flickr');
      expect(result.twitterAppIdiPhone).to.be.eql('328407587');
      expect(result.twitterSite).to.be.eql('@flickr');
      expect(result.ogTitle).to.be.eql('Heimgarten');
      expect(result.ogDescription).to.be.eql('____________________ Press "L" to view on black Press "F" to favor Share, if you like :)    You can leave a comment, if you like :)    Not to use or publish without permission! © Christoph Wagner Photographie');
      expect(result.ogType).to.be.eql('article');
      expect(result.ogUrl).to.be.eql('https://www.flickr.com/photos/travelgraph/18791678505/');
      expect(result.ogLocale).to.be.eql('en-us');
      expect(result.twitterCard).to.be.eql('photo');
      expect(result.twitterDescription).to.be.eql('____________________ Press "L" to view on black Press "F" to favor Share, if you like :)    You can leave a comment, if you like :)    Not to use or publish without permission! © Christoph Wagner Photographie');
      expect(result.twitterAppUrliPhone).to.be.eql('flickr://flickr.com/photos/travelgraph/18791678505/');
      expect(result.ogImage).to.be.eql({
        url: 'https://c1.staticflickr.com/1/499/18791678505_5886fefcf7_b.jpg',
        width: '1024',
        height: '375',
        type: 'jpg',
      });
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/flickr');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogSiteName',
        'ogTitle',
        'ogType',
        'ogUrl',
        'requestUrl',
        'success',
        'twitterAppIdiPhone',
        'twitterAppNameiPhone',
        'twitterAppUrliPhone',
        'twitterCard',
        'twitterDescription',
        'twitterSite',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('Test getting the description and images from meta tags', function () {
    return ogs({
      url: 'https://jshemas.github.io/openGraphScraperPages/twitter.html',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.success).to.be.eql(true);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/twitter.html');
      expect(result.ogTitle).to.be.eql('Twitter. It\'s what\'s happening.');
      expect(result.ogDescription).to.be.eql('From breaking news and entertainment to sports and politics, get the full story with all the live commentary.');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogUrl).to.be.eql('https://web.archive.org/web/20170608000236/https://twitter.com/i/hello');
      expect(result.ogImage.length).to.be.eql(48);
      let imageFound = false;
      for (let i = 0; i < result.ogImage.length; i += 1) {
        if (result.ogImage[i].url === '/static/images/toolbar/wayback-toolbar-logo.png') {
          imageFound = true;
        }
      }
      expect(imageFound).to.be.eql(true);
      expect(result).to.have.all.keys(
        'ogDescription',
        'ogImage',
        'ogTitle',
        'ogLocale',
        'requestUrl',
        'ogUrl',
        'success',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
});
