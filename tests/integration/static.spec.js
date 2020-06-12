const ogs = require('../../index');

describe('static', function () {
  it('airbnb', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/airbnb' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.description).to.be.eql('Entire home/apt for $220. A cute boutique studio located on arguably the best street in Chelsea. A block from the Highline, endless Galleries and Restaurants, the wonderful ...');
        expect(result.ogSiteName).to.be.eql('Airbnb');
        expect(result.ogTitle).to.be.eql('Bright, Chelsea Studio - Apartments for Rent in New York');
        expect(result.ogType).to.be.eql('airbedandbreakfast:listing');
        expect(result.ogUrl).to.be.eql('https://www.airbnb.com/rooms/2250401');
        expect(result.ogDescription).to.be.eql('Apartment in New York, United States. A cute boutique studio located on arguably the best street in Chelsea. A block from the Highline, endless Galleries and Restaurants, the wonderful Chelsea Market and the lively Meatpacking District.  1 Ave from the A-C-E subway and just blocks fro...');
        expect(result.ogLocale).to.be.eql('en_US');
        expect(result.twitterCard).to.be.eql('photo');
        expect(result.twitterTitle).to.be.eql('Bright, Chelsea Studio - Apartments for Rent in New York');
        expect(result.twitterSite).to.be.eql('@airbnb');
        expect(result.twitterAppNameiPhone).to.be.eql('Airbnb');
        expect(result.twitterAppNameiPad).to.be.eql('Airbnb');
        expect(result.twitterAppNameGooglePlay).to.be.eql('Airbnb');
        expect(result.twitterAppIdiPhone).to.be.eql('401626263');
        expect(result.twitterAppIdiPad).to.be.eql('401626263');
        expect(result.twitterAppIdGooglePlay).to.be.eql('com.airbnb.android');
        expect(result.twitterAppUrliPhone).to.be.eql('airbnb://rooms/2250401');
        expect(result.twitterAppUrliPad).to.be.eql('airbnb://rooms/2250401');
        expect(result.twitterAppUrlGooglePlay).to.be.eql('airbnb://rooms/2250401');
        expect(result.ogImage).to.be.eql({
          url: 'https://a1.muscache.com/im/pictures/43670185/606e6e19_original.jpg?aki_policy=x_large',
          width: null,
          height: null,
          type: null,
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://a1.muscache.com/im/pictures/43670185/606e6e19_original.jpg?aki_policy=x_large',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/airbnb');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'description',
          'ogDescription',
          'ogImage',
          'ogLocale',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
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
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      })
      .catch(function (error) {
        console.log('error:', error);
        expect().fail('this should not happen');
      });
  });
  it('arstechnica', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/arstechnica' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.description).to.be.eql('Unbeatable software and support with a great camera, wrapped in a familiar exterior.');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('Google Pixel review: The best Android phone, even if it is a little pricey');
        expect(result.twitterDescription).to.be.eql('Unbeatable software and support with a great camera, wrapped in a familiar exterior.');
        expect(result.twitterSite).to.be.eql('@arstechnica');
        expect(result.ogSiteName).to.be.eql('Ars Technica');
        expect(result.twitterCreator).to.be.eql('@RonAmadeo');
        expect(result.ogUrl).to.be.eql('http://arstechnica.com/gadgets/2016/10/google-pixel-review-bland-pricey-but-still-best-android-phone/');
        expect(result.ogTitle).to.be.eql('Google Pixel review: The best Android phone, even if it is a little pricey');
        expect(result.ogDescription).to.be.eql('Unbeatable software and support with a great camera, wrapped in a familiar exterior.');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogImage).to.be.eql({
          url: 'https://cdn.arstechnica.net/wp-content/uploads/2016/10/pixel-feature-640x320.jpg',
          width: null,
          height: null,
          type: null,
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://cdn.arstechnica.net/wp-content/uploads/2016/10/pixel-feature-640x320.jpg',
          width: '640',
          height: '320',
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/arstechnica');
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
          'twitterCreator',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      })
      .catch(function (error) {
        console.log('error:', error);
        expect().fail('this should not happen');
      });
  });
  it('battlefield', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/battlefield' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.description).to.be.eql('Buy Battlefield 1 on Xbox One, PlayStation 4, or Origin for PC. ');
        expect(result.ogUrl).to.be.eql('https://www.battlefield.com/buy/battlefield-1');
        expect(result.ogSiteName).to.be.eql('Battlefield');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogTitle).to.be.eql('Buy Battlefield 1 – Battlefield Official Site');
        expect(result.twitterTitle).to.be.eql('Buy Battlefield 1 – Battlefield Official Site');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.ogDescription).to.be.eql('Buy Battlefield 1 on Xbox One, PlayStation 4, or Origin for PC. ');
        expect(result.twitterDescription).to.be.eql('Buy Battlefield 1 on Xbox One, PlayStation 4, or Origin for PC. ');
        expect(result.twitterSite).to.be.eql('@battlefield');
        expect(result.twitterCreator).to.be.eql('@battlefield');
        expect(result.ogImage).to.be.eql({
          url: 'http://media-www-battlefieldwebcore.spark.ea.com/content/battlefield-portal/en_US/_global_/_jcr_content/ccm/componentwrapper_1/components/opengraph/ogImage.img.jpg',
          width: null,
          height: null,
          type: null,
        });
        expect(result.twitterImage).to.be.eql({
          url: 'http://media-www-battlefieldwebcore.spark.ea.com/content/battlefield-portal/en_US/_global_/_jcr_content/ccm/componentwrapper_1/components/opengraph/ogImage.img.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/battlefield');
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
          'twitterCreator',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      })
      .catch(function (error) {
        console.log('error:', error);
        expect().fail('this should not happen');
      });
  });
  it('bestbuy', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/bestbuy' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.description).to.be.eql('4.7-inch (diagonal) Retina HD display with 1334-by-750 resolution; 3D Touch; A9 chip with M9 motion coprocessor');
        expect(result.ogTitle).to.be.eql('Apple - iPhone 6s 64GB - Space Gray (Verizon)');
        expect(result.ogType).to.be.eql('product');
        expect(result.ogUrl).to.be.eql('/site/apple-iphone-6s-64gb-space-gray-verizon/4447801.p?skuId=4447801');
        expect(result.ogSiteName).to.be.eql('Best Buy');
        expect(result.ogDescription).to.be.eql('4.7-inch (diagonal) Retina HD display with 1334-by-750 resolution; 3D Touch; A9 chip with M9 motion coprocessor');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@BestBuy');
        expect(result.twitterCreator).to.be.eql('@BestBuy');
        expect(result.twitterTitle).to.be.eql('Apple - iPhone 6s 64GB - Space Gray (Verizon)');
        expect(result.twitterDescription).to.be.eql('4.7-inch (diagonal) Retina HD display with 1334-by-750 resolution; 3D Touch; A9 chip with M9 motion coprocessor');
        expect(result.ogImage).to.be.eql({
          url: 'http://pisces.bbystatic.com//image2/BestBuy_US/images/products/4447/4447801_sa.jpg;maxHeight=210;maxWidth=210',
          width: null,
          height: null,
          type: null,
        });
        expect(result.twitterImage).to.be.eql({
          url: 'http://pisces.bbystatic.com//image2/BestBuy_US/images/products/4447/4447801_sa.jpg;maxHeight=210;maxWidth=210',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/bestbuy');
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
          'twitterCreator',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      })
      .catch(function (error) {
        console.log('error:', error);
        expect().fail('this should not happen');
      });
  });
  it('bjango', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/bjango.html' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.description).to.be.eql(undefined); // TODO: look into this
        expect(result.ogTitle).to.be.eql('iStat Menus');
        expect(result.ogImage).to.be.eql([
          {
            url: '/images/mac/istatmenus5/header-text.svg',
            width: null,
            height: null,
            type: 'svg',
          },
          {
            url: '/images/mac/istatmenus5/header-text-simple.svg',
            width: null,
            height: null,
            type: 'svg',
          },
          {
            url: '/images/mac/istatmenus5/heading-istatmenus.svg',
            width: null,
            height: null,
            type: 'svg',
          },
          {
            url: '/images/mac/istatmenus5/header-network.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: '/images/mac/istatmenus5/header-cpu.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: '/images/mac/istatmenus5/image-newdesign.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: '/images/mac/istatmenus5/image-perapp.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: '/images/mac/istatmenus5/image-lightmap.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
        ]);
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/bjango.html');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'description',
          'ogImage',
          'ogTitle',
          'requestUrl',
          'success',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      })
      .catch(function (error) {
        console.log('error:', error);
        expect().fail('this should not happen');
      });
  });
  it('cloudinary', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/cloudinary' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.description).to.be.eql('Cloudinary');
        expect(result.ogTitle).to.be.eql('Cloudinary - Pricing');
        expect(result.ogDescription).to.be.eql('Cloudinary');
        expect(result.ogImage).to.be.eql([
          {
            url: 'http://res-1.cloudinary.com/cloudinary/image/asset/dpr_2.0/logo-e0df892053afd966cc0bfe047ba93ca4.png',
            width: '172',
            height: '38',
            type: 'png',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: null,
            height: null,
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: null,
            height: null,
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: null,
            height: null,
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: null,
            height: null,
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: null,
            height: null,
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: null,
            height: null,
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: null,
            height: null,
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: '22',
            height: '22',
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: '22',
            height: '22',
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: '22',
            height: '22',
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: '22',
            height: '22',
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: '22',
            height: '22',
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: '22',
            height: '22',
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            width: '22',
            height: '22',
            type: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          },
          {
            url: 'http://res-3.cloudinary.com/cloudinary/image/asset/dpr_2.0/logo-white-f1a9f401b60dd17a7629e663523b150e.png',
            width: '172',
            height: '38',
            type: 'png',
          },
        ]);
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/cloudinary');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'description',
          'ogDescription',
          'ogImage',
          'ogTitle',
          'requestUrl',
          'success',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      })
      .catch(function (error) {
        console.log('error:', error);
        expect().fail('this should not happen');
      });
  });
});
