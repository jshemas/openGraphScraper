const ogs = require('../../index');

describe('redirect', function () {
  context('should return correct Open Graph Info', function () {
    it('nytimes page', function () {
      return ogs({
        url: 'https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html?_r=0',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.alAndroidUrl).to.be.eql('nyt://article/d07123d7-f6dc-5370-97cb-86dd6aa0b0de');
        expect(result.alAndroidPackage).to.be.eql('com.nytimes.android');
        expect(result.alAndroidAppName).to.be.eql('NYTimes');
        expect(result.alIphoneUrl).to.be.eql('nytimes://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html');
        expect(result.alIphoneAppStoreId).to.be.eql('284862083');
        expect(result.alIphoneAppName).to.be.eql('NYTimes');
        expect(result.alIpadUrl).to.be.eql('nytimes://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html');
        expect(result.alIpadAppStoreId).to.be.eql('357066198');
        expect(result.alIpadAppName).to.be.eql('NYTimes');
        expect(result.ogUrl).to.be.eql('https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html');
        expect(result.ogType).to.be.eql('article');
        expect(result.articleSection).to.be.eql('Arts');
        expect(result.articleTag).to.be.eql('Blum & Poe (Los Angeles, Calif)');
        expect(result.articleModifiedTime).to.be.eql('2016-09-01T17:37:39.000Z');
        expect(result.articlePublishedTime).to.be.eql('2016-09-01T01:34:35.000Z');
        expect(result.ogTitle).to.be.eql('Gallery Hopes to Sell Kanye West’s ‘Famous’ Sculpture for $4 Million (Published 2016)');
        expect(result.ogDescription).to.be.eql('The Los Angeles gallery Blum & Poe, which hosted the ‘Famous’ exhibition, is projecting a hefty price tag for the work.');
        expect(result.twitterTitle).to.be.eql('Gallery Hopes to Sell Kanye West’s ‘Famous’ Sculpture for $4 Million (Published 2016)');
        expect(result.twitterDescription).to.be.eql('The Los Angeles gallery Blum & Poe, which hosted the ‘Famous’ exhibition, is projecting a hefty price tag for the work.');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterAppNameGooglePlay).to.be.eql('NYTimes');
        expect(result.twitterAppIdGooglePlay).to.be.eql('com.nytimes.android');
        expect(result.twitterAppUrlGooglePlay).to.be.eql('nyt://article/d07123d7-f6dc-5370-97cb-86dd6aa0b0de');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterSite).to.be.eql('@nytimes');
        expect(result.twitterUrl).to.be.eql('https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html');
        expect(result.ogImage).to.be.eql({
          url: 'https://static01.nyt.com/images/2016/09/02/arts/01KANYE1-web/01KANYE1-web-facebookJumbo.jpg?year=2016&h=550&w=1050&s=f15e16ac34e5bf83b85e4497c724e7bd5ba43994e780f23119610eba47cd726d&k=ZQJBKqZ0VN',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://static01.nyt.com/images/2016/09/02/arts/01KANYE1-web/01KANYE1-web-videoSixteenByNineJumbo1600.jpg?year=2016&h=901&w=1600&s=a5f74a00775cb159c1978e3d3c89d7ea7f176aec59f6565fad3c377cf3b1bd7b&k=ZQJBKqZ0VN&tw=1',
          width: null,
          height: null,
          alt: 'Kim Kardashian West at the “Famous” exhibition at Blum & Poe in Los Angeles last week. The gallery is planning to sell the sculpture for a hefty price tag.',
        });
        expect(result.requestUrl).to.be.eql('https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html?_r=0');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'alAndroidAppName',
          'alAndroidPackage',
          'alAndroidUrl',
          'alIpadAppName',
          'alIpadAppStoreId',
          'alIpadUrl',
          'alIphoneAppName',
          'alIphoneAppStoreId',
          'alIphoneUrl',
          'articleModifiedTime',
          'articlePublishedTime',
          'articleSection',
          'articleTag',
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogLocale',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterAppIdGooglePlay',
          'twitterAppNameGooglePlay',
          'twitterAppUrlGooglePlay',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('forbes page', function () {
      return ogs({
        url: 'https://www.forbes.com/sites/kenkam/2017/09/28/3-stocks-like-apple-was-10-years-ago-tesla-nvidia-and-alibaba/#2636f6c2f0fa',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('3 Stocks Like Apple Was 10 Years Ago: Tesla, Nvidia And Alibaba');
        expect(result.ogSiteName).to.be.eql('Forbes');
        expect(result.articleAuthor).to.be.eql('Ken Kam');
        expect(result.articleSection).to.be.eql('Markets');
        expect(result.author).to.be.eql('Ken Kam');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogUrl).to.be.eql('https://www.forbes.com/sites/kenkam/2017/09/28/3-stocks-like-apple-was-10-years-ago-tesla-nvidia-and-alibaba/');
        expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@forbes');
        expect(result.twitterCreator).to.be.eql('@MarketocracyInc');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterTitle).to.be.eql('3 Stocks Like Apple Was 10 Years Ago: Tesla, Nvidia And Alibaba');
        expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/forbes');
        expect(result.ogImage).to.be.eql({
          url: 'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F825671570%2F0x0.jpg%3Ffit%3Dscale',
          width: null,
          height: null,
          type: null,
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F825671570%2F0x0.jpg%3Ffit%3Dscale',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://www.forbes.com/sites/kenkam/2017/09/28/3-stocks-like-apple-was-10-years-ago-tesla-nvidia-and-alibaba/#2636f6c2f0fa');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'articleAuthor',
          'articleSection',
          'articlePublisher',
          'author',
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
          'twitterCard',
          'twitterCreator',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
  });
});
