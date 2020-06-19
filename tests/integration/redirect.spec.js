const ogs = require('../../index');

describe('redirect', function () {
  context('should return correct Open Graph Info', function () {
    it('wemeanbusinesslondon page', function () {
      return ogs({
        url: 'http://www.wemeanbusinesslondon.com/blog/2016/5/10/the-entrepreneur-spiration-series-going-nuts-for-pip-nut',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('WE MEAN BUSINESS | LONDON');
        expect(result.ogTitle).to.be.eql('The Entrepreneur-spiration Series: Going nuts for Pip & Nut — WE MEAN BUSINESS | LONDON');
        expect(result.ogUrl).to.be.eql('http://www.wemeanbusinesslondon.com/blog/2016/5/10/the-entrepreneur-spiration-series-going-nuts-for-pip-nut');
        expect(result.ogType).to.be.eql('article');
        expect(result.description).to.be.an('string').and.to.not.be.empty;
        expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
        expect(result.twitterTitle).to.be.eql('The Entrepreneur-spiration Series: Going nuts for Pip &amp; Nut — WE MEAN BUSINESS | LONDON');
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
        expect(result.ogImage).to.be.eql({
          url: 'http://static1.squarespace.com/static/56365f8ae4b0bcd8401ca823/563b8ecde4b075b4124bc9b8/5732300cc6fc085da9e6da16/1584829128507/unnamed.jpg?format=1500w',
          width: '1280',
          height: '779',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'http://static1.squarespace.com/static/56365f8ae4b0bcd8401ca823/563b8ecde4b075b4124bc9b8/5732300cc6fc085da9e6da16/1584829128507/unnamed.jpg?format=1500w',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('http://www.wemeanbusinesslondon.com/blog/2016/5/10/the-entrepreneur-spiration-series-going-nuts-for-pip-nut');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'description',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('nytimes page', function () {
      return ogs({
        url: 'https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html?_r=0',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogUrl).to.be.eql('https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html');
        expect(result.ogType).to.be.eql('article');
        expect(result.articleSection).to.be.eql('Arts');
        expect(result.articleTag).to.be.eql('Blum & Poe (Los Angeles, Calif)');
        expect(result.robots).to.be.eql('noarchive');
        expect(result.ogTitle).to.be.eql('Gallery Hopes to Sell Kanye West’s ‘Famous’ Sculpture for $4 Million');
        expect(result.description).to.be.eql('The Los Angeles gallery Blum & Poe, which hosted the ‘Famous’ exhibition, is projecting a hefty price tag for the work.');
        expect(result.ogDescription).to.be.eql('The Los Angeles gallery Blum & Poe, which hosted the ‘Famous’ exhibition, is projecting a hefty price tag for the work.');
        expect(result.twitterTitle).to.be.eql('Gallery Hopes to Sell Kanye West’s ‘Famous’ Sculpture for $4 Million');
        expect(result.twitterDescription).to.be.eql('The Los Angeles gallery Blum & Poe, which hosted the ‘Famous’ exhibition, is projecting a hefty price tag for the work.');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterAppNameGooglePlay).to.be.eql('NYTimes');
        expect(result.twitterAppIdGooglePlay).to.be.eql('com.nytimes.android');
        expect(result.twitterAppUrlGooglePlay).to.be.eql('nyt://article/d07123d7-f6dc-5370-97cb-86dd6aa0b0de');
        expect(result.twitterSite).to.be.eql('@nytimes');
        expect(result.ogImage).to.be.eql({
          url: 'https://static01.nyt.com/images/2016/09/02/arts/01KANYE1-web/01KANYE1-web-facebookJumbo.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://static01.nyt.com/images/2016/09/02/arts/01KANYE1-web/01KANYE1-web-videoSixteenByNineJumbo1600.jpg',
          width: null,
          height: null,
          alt: 'Kim Kardashian West at the “Famous” exhibition at Blum & Poe in Los Angeles last week. The gallery is planning to sell the sculpture for a hefty price tag.',
        });
        expect(result.requestUrl).to.be.eql('https://www.nytimes.com/2016/09/01/arts/design/gallery-hopes-to-sell-kanye-wests-famous-sculpture-for-4-million.html?_r=0');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleSection',
          'articleTag',
          'description',
          'ogDescription',
          'ogImage',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'robots',
          'success',
          'twitterAppIdGooglePlay',
          'twitterAppNameGooglePlay',
          'twitterAppUrlGooglePlay',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
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
        expect(result.articleSection).to.be.eql('Investing');
        expect(result.author).to.be.eql('Ken Kam');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogUrl).to.be.eql('https://www.forbes.com/sites/kenkam/2017/09/28/3-stocks-like-apple-was-10-years-ago-tesla-nvidia-and-alibaba/');
        expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
        expect(result.description).to.be.an('string').and.to.not.be.empty;
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@forbes');
        expect(result.twitterCreator).to.be.eql('@MarketocracyInc');
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
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleAuthor',
          'articleSection',
          'articlePublisher',
          'author',
          'description',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
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
