const ogs = require('../../index');

describe('allMedia', function () {
  it('if more then one media tags are found, return the first one', function () {
    return ogs({
      url: 'https://jshemas.github.io/openGraphScraperPages/yelp',
      allMedia: false,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alIosAppName).to.be.eql('Yelp');
      expect(result.alIosAppStoreId).to.be.eql('284910350');
      expect(result.alIosUrl).to.be.eql('https://www.yelp.com/biz/boba-guys-san-francisco-4?utm_campaign=biz_details&utm_medium=organic&utm_source=apple');
      expect(result.ogDescription).to.be.eql('Specialties: High-quality bubble milk teas made with next-level quality ingredients like organic milk, homemade syrup, and homemade almond jelly. Home of the original Horchata Boba and Tea Frescas. Established in 2011.  We started Boba Guys…');
      expect(result.ogSiteName).to.be.eql('Yelp');
      expect(result.ogTitle).to.be.eql('Boba Guys - Mission - San Francisco, CA');
      expect(result.ogType).to.be.eql('yelpyelp:business');
      expect(result.ogDate).to.be.eql('2016-10-09');
      expect(result.ogUrl).to.be.eql('https://www.yelp.com/biz/boba-guys-san-francisco-4');
      expect(result.twitterCard).to.be.eql('summary');
      expect(result.twitterSite).to.be.eql('@yelp');
      expect(result.twitterAppNameiPhone).to.be.eql('Yelp');
      expect(result.twitterAppNameiPad).to.be.eql('Yelp');
      expect(result.twitterAppNameGooglePlay).to.be.eql('Yelp');
      expect(result.twitterAppIdiPhone).to.be.eql('id284910350');
      expect(result.twitterAppIdiPad).to.be.eql('id284910350');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.yelp.android');
      expect(result.twitterAppUrliPhone).to.be.eql('yelp:///biz/18TtLS_JtiS2OH30FLqNrw?utm_campaign=default&utm_source=twitter-card');
      expect(result.twitterAppUrliPad).to.be.eql('yelp:///biz/18TtLS_JtiS2OH30FLqNrw?utm_campaign=default&utm_source=twitter-card');
      expect(result.twitterAppUrlGooglePlay).to.be.eql('intent://yelp.com/biz/18TtLS_JtiS2OH30FLqNrw?utm_source=twitter-card#Intent;scheme=http;package=com.yelp.android;end;');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogImage).to.be.eql({
        url: 'https://s3-media2.fl.yelpcdn.com/bphoto/FE1lCskaigmVupQGk86T4g/o.jpg',
        width: '2000',
        height: '1300',
        type: 'jpg',
      });
      expect(result.twitterImage).to.be.eql({
        url: 'https://s3-media1.fl.yelpcdn.com/bphoto/FE1lCskaigmVupQGk86T4g/258s.jpg',
        width: null,
        height: null,
        alt: null,
      });
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/yelp');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'alIosAppName',
        'alIosAppStoreId',
        'alIosUrl',
        'ogDate',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogSiteName',
        'ogTitle',
        'ogType',
        'ogUrl',
        'requestUrl',
        'success',
        'charset',
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
        'twitterImage',
        'twitterSite',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('if more then one media tags are found, return all of them', function () {
    return ogs({
      url: 'https://jshemas.github.io/openGraphScraperPages/yelp',
      allMedia: true,
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alIosAppName).to.be.eql('Yelp');
      expect(result.alIosAppStoreId).to.be.eql('284910350');
      expect(result.alIosUrl).to.be.eql('https://www.yelp.com/biz/boba-guys-san-francisco-4?utm_campaign=biz_details&utm_medium=organic&utm_source=apple');
      expect(result.ogDescription).to.be.eql('Specialties: High-quality bubble milk teas made with next-level quality ingredients like organic milk, homemade syrup, and homemade almond jelly. Home of the original Horchata Boba and Tea Frescas. Established in 2011.  We started Boba Guys…');
      expect(result.ogSiteName).to.be.eql('Yelp');
      expect(result.ogTitle).to.be.eql('Boba Guys - Mission - San Francisco, CA');
      expect(result.ogType).to.be.eql('yelpyelp:business');
      expect(result.ogDate).to.be.eql('2016-10-09');
      expect(result.ogUrl).to.be.eql('https://www.yelp.com/biz/boba-guys-san-francisco-4');
      expect(result.twitterCard).to.be.eql('summary');
      expect(result.twitterSite).to.be.eql('@yelp');
      expect(result.twitterAppNameiPhone).to.be.eql('Yelp');
      expect(result.twitterAppNameiPad).to.be.eql('Yelp');
      expect(result.twitterAppNameGooglePlay).to.be.eql('Yelp');
      expect(result.twitterAppIdiPhone).to.be.eql('id284910350');
      expect(result.twitterAppIdiPad).to.be.eql('id284910350');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.yelp.android');
      expect(result.twitterAppUrliPhone).to.be.eql('yelp:///biz/18TtLS_JtiS2OH30FLqNrw?utm_campaign=default&utm_source=twitter-card');
      expect(result.twitterAppUrliPad).to.be.eql('yelp:///biz/18TtLS_JtiS2OH30FLqNrw?utm_campaign=default&utm_source=twitter-card');
      expect(result.twitterAppUrlGooglePlay).to.be.eql('intent://yelp.com/biz/18TtLS_JtiS2OH30FLqNrw?utm_source=twitter-card#Intent;scheme=http;package=com.yelp.android;end;');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogImage).to.be.eql([{
        url: 'https://s3-media2.fl.yelpcdn.com/bphoto/FE1lCskaigmVupQGk86T4g/o.jpg',
        width: '2000',
        height: '1300',
        type: 'jpg',
      }, {
        url: 'https://s3-media2.fl.yelpcdn.com/assets/srv0/seo_metadata/e98ed5a1460f/assets/img/logos/yelp_og_image.png',
        width: '576',
        height: '576',
        type: 'png',
      }]);
      expect(result.twitterImage).to.be.eql([{
        url: 'https://s3-media1.fl.yelpcdn.com/bphoto/FE1lCskaigmVupQGk86T4g/258s.jpg',
        width: null,
        height: null,
        alt: null,
      }]);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/yelp');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'alIosAppName',
        'alIosAppStoreId',
        'alIosUrl',
        'ogDate',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogSiteName',
        'ogTitle',
        'ogType',
        'ogUrl',
        'requestUrl',
        'success',
        'charset',
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
        'twitterImage',
        'twitterSite',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
});
