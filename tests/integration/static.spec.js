const { expect } = require('chai');
const ogs = require('../../index');

describe('static', function () {
  it('airbnb', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/airbnb' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.alAndroidAppName).to.be.eql('Airbnb');
        expect(result.alAndroidPackage).to.be.eql('com.airbnb.android');
        expect(result.alAndroidUrl).to.be.eql('airbnb://d/listing?id=2250401&ref=monorail_deep_link');
        expect(result.alIosAppName).to.be.eql('Airbnb');
        expect(result.alIosAppStoreId).to.be.eql('401626263');
        expect(result.alIosUrl).to.be.eql('airbnb://d/listing?id=2250401&ref=monorail_deep_link');
        expect(result.alWebUrl).to.be.eql('https://www.airbnb.com/rooms/2250401');
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
        expect(result.twitterUrl).to.be.eql('https://www.airbnb.com/rooms/2250401');
        expect(result.ogImage).to.be.eql({
          url: 'https://a1.muscache.com/im/pictures/43670185/606e6e19_original.jpg?aki_policy=x_large',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://a1.muscache.com/im/pictures/43670185/606e6e19_original.jpg?aki_policy=x_large',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/airbnb');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'alAndroidAppName',
          'alAndroidPackage',
          'alAndroidUrl',
          'alIosAppName',
          'alIosAppStoreId',
          'alIosUrl',
          'alWebUrl',
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
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('arstechnica', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/arstechnica' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('Google Pixel review: The best Android phone, even if it is a little pricey');
        expect(result.twitterDescription).to.be.eql('Unbeatable software and support with a great camera, wrapped in a familiar exterior.');
        expect(result.twitterSite).to.be.eql('@arstechnica');
        expect(result.ogSiteName).to.be.eql('Ars Technica');
        expect(result.twitterCreator).to.be.eql('@RonAmadeo');
        expect(result.ogUrl).to.be.eql('http://arstechnica.com/gadgets/2016/10/google-pixel-review-bland-pricey-but-still-best-android-phone/');
        expect(result.ogTitle).to.be.eql('Google Pixel review: The best Android phone, even if it is a little pricey');
        expect(result.ogDescription).to.be.eql('Unbeatable software and support with a great camera, wrapped in a familiar exterior.');
        expect(result.twitterUrl).to.be.eql('http://arstechnica.com/gadgets/2016/10/google-pixel-review-bland-pricey-but-still-best-android-phone/');
        expect(result.ogLocale).to.be.eql('en-us');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogImage).to.be.eql({
          url: 'https://cdn.arstechnica.net/wp-content/uploads/2016/10/pixel-feature-640x320.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://cdn.arstechnica.net/wp-content/uploads/2016/10/pixel-feature-640x320.jpg',
          width: '640',
          height: '320',
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/arstechnica');
        expect(result.charset).to.be.eql('utf8');
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
          'charset',
          'twitterCard',
          'twitterCreator',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('battlefield', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/battlefield' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
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
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'http://media-www-battlefieldwebcore.spark.ea.com/content/battlefield-portal/en_US/_global_/_jcr_content/ccm/componentwrapper_1/components/opengraph/ogImage.img.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/battlefield');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
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
  it('bestbuy', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/bestbuy' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('Apple - iPhone 6s 64GB - Space Gray (Verizon)');
        expect(result.ogType).to.be.eql('product');
        expect(result.ogUrl).to.be.eql('/site/apple-iphone-6s-64gb-space-gray-verizon/4447801.p?skuId=4447801');
        expect(result.ogSiteName).to.be.eql('Best Buy');
        expect(result.ogDescription).to.be.eql('4.7-inch (diagonal) Retina HD display with 1334-by-750 resolution; 3D Touch; A9 chip with M9 motion coprocessor');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@BestBuy');
        expect(result.ogDate).to.be.eql('08/10/2016');
        expect(result.twitterCreator).to.be.eql('@BestBuy');
        expect(result.twitterTitle).to.be.eql('Apple - iPhone 6s 64GB - Space Gray (Verizon)');
        expect(result.ogLocale).to.be.eql('en-us');
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
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
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
  it('bjango', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/bjango' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('iStat Menus');
        expect(result.ogLocale).to.be.eql('en-us');
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/bjango');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogTitle',
          'ogLocale',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('bloomberg', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/bloomberg' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.alAndroidAppName).to.be.eql('Bloomberg');
        expect(result.alAndroidPackage).to.be.eql('com.bloomberg.android.plus');
        expect(result.alAndroidUrl).to.be.eql('bloomberg://www.bloomberg.com/news/articles/2020-06-11/sony-reveals-playstation-5-games-ahead-of-holiday-release?utm_medium=applink&utm_source=facebook');
        expect(result.ogDescription).to.be.eql('Sony Corp. unveiled the PlayStation 5 game console and an array of new games from the virtual stage Thursday, showcasing for the first time what its next-generation software will look like ahead of a holiday season showdown against Microsoft Corp.’s Xbox.');
        expect(result.ogSiteName).to.be.eql('Bloomberg.com');
        expect(result.ogTitle).to.be.eql('Sony Reveals PlayStation 5 Games Ahead of Holiday Release');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogDate).to.be.eql('2020-06-11T20:21:29.693Z');
        expect(result.ogUrl).to.be.eql('https://www.bloomberg.com/news/articles/2020-06-11/sony-reveals-playstation-5-games-ahead-of-holiday-release');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterDescription).to.be.eql('Sony Corp. unveiled the PlayStation 5 game console and an array of new games from the virtual stage Thursday, showcasing for the first time what its next-generation software will look like ahead of a holiday season showdown against Microsoft Corp.’s Xbox.');
        expect(result.twitterSite).to.be.eql('@technology');
        expect(result.twitterTitle).to.be.eql('Sony Reveals PlayStation 5 Games Ahead of Holiday Release');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql({
          url: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/igYmwLRm2sYw/v0/1200x800.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/igYmwLRm2sYw/v0/1200x800.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.ogAudioSecureURL).to.be.eql('https://assets.bwbx.io/s3/readings/QBS8ZSDWRGG71591924612662.mp3');
        expect(result.ogAudioType).to.be.eql('audio/mpeg');
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/bloomberg');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'alAndroidAppName',
          'alAndroidPackage',
          'alAndroidUrl',
          'ogDate',
          'ogAudioSecureURL',
          'ogAudioType',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogLocale',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('businesstoday', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/businesstoday' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@BT_India');
        expect(result.ogDate).to.be.eql('2020-06-10T10:13:00+05:30');
        expect(result.twitterCreator).to.be.eql('@BT_India');
        expect(result.twitterTitle).to.be.eql('Madhu Kapur, family withdraw case against Yes Bank');
        expect(result.ogUrl).to.be.eql('https://www.businesstoday.in/current/corporate/madhu-kapur-family-withdraw-case-against-yes-bank/story/406469.html');
        expect(result.twitterUrl).to.be.eql('https://www.businesstoday.in/current/corporate/madhu-kapur-family-withdraw-case-against-yes-bank/story/406469.html');
        expect(result.twitterDescription).to.be.eql("Madhu Kapur in her suit had sought various reliefs including recognition of the family's right to participate in the management of the bank");
        expect(result.ogImage).to.be.eql({
          url: 'https://akm-img-a-in.tosshub.com/sites/btmt/images/stories/yesbankoffice_505_101918105940_051519023753_160320102938_170320101641_100620101027.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://akm-img-a-in.tosshub.com/sites/btmt/images/stories/yesbankoffice_505_101918105940_051519023753_160320102938_170320101641_100620101027.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.ogTitle).to.be.eql('Madhu Kapur, family withdraw case against Yes Bank');
        expect(result.ogDescription).to.be.eql("Madhu Kapur in her suit had sought various reliefs including recognition of the family's right to participate in the management of the bank");
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/businesstoday');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogTitle',
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
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('cbronline', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/cbronline' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogLocale).to.be.eql('en_GB');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogDate).to.be.eql('June 04, 2020 1:32 pm');
        expect(result.ogTitle).to.be.eql('Undertaking Cyber Security Due Diligence in M&A Transactions');
        expect(result.ogDescription).to.be.eql('“Undertaking a detailed evaluation of all IT systems and network endpoints in the target enterprise will be vital for enabling the M&A team to identify how to effectively operationalise the');
        expect(result.ogUrl).to.be.eql('https://www.cbronline.com/opinion/cyber-security-due-diligence-in-mergers');
        expect(result.ogSiteName).to.be.eql('Computer Business Review');
        expect(result.articleTag).to.be.eql("Sidebar Editor's Pick");
        expect(result.articleSection).to.be.eql('Business');
        expect(result.articlePublishedTime).to.be.eql('2020-06-04T13:14:28+01:00');
        expect(result.articleModifiedTime).to.be.eql('2020-06-04T13:32:55+01:00');
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.twitterDescription).to.be.eql("Robust cyber security due diligence ahead of M&A activity can save huge headaches down the line, notes Bitglass's CTO.");
        expect(result.twitterTitle).to.be.eql('Undertaking Cyber Security Due Diligence in M&A Transactions');
        expect(result.ogImage).to.be.eql({
          url: 'https://www.cbronline.com/wp-content/uploads/2020/06/technology-4256272_1920.jpg',
          width: '1920',
          height: '1281',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://www.cbronline.com/wp-content/uploads/2020/06/technology-4256272_1920.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/cbronline');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleModifiedTime',
          'articlePublishedTime',
          'articleSection',
          'articleTag',
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
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('cio', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/cio' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('The state of cloud computing in 2020');
        expect(result.ogDescription).to.be.eql('As cloud adoption hits another growth spurt, companies are discovering the power of mixing and matching cloud services into solutions that address almost any business need');
        expect(result.ogType).to.be.eql('article');
        expect(result.author).to.be.eql('Eric Knorr');
        expect(result.ogSiteName).to.be.eql('InfoWorld');
        expect(result.dcDateIssued).to.be.eql('2020-06-08T03:00-05:00');
        expect(result.ogDate).to.be.eql('2020-06-08T03:00-0700');
        expect(result.ogUrl).to.be.eql('https://www.infoworld.com/article/3561329/the-state-of-cloud-computing-in-2020.html');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@infoworld');
        expect(result.twitterDescription).to.be.eql('As cloud adoption hits another growth spurt, companies are discovering the power of mixing and matching cloud services into solutions that address almost any business need');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogLogo).to.be.eql('https://idge.staticworld.net/ifw/IFW_logo_social_300x300.png');
        expect(result.ogImage).to.be.eql({
          url: 'https://images.idgesg.net/images/article/2020/06/intro_ts_cloud__by-akinbostanci-getty-images-100847825-large.jpg',
          width: '1200',
          height: '800',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://images.idgesg.net/images/article/2020/06/intro_ts_cloud__by-akinbostanci-getty-images-100847825-large.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/cio');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'author',
          'ogDate',
          'dcDateIssued',
          'ogDescription',
          'ogImage',
          'ogLogo',
          'ogSiteName',
          'ogTitle',
          'ogLocale',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('cloudpro', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/cloudpro' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('Cloud Pro');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogUrl).to.be.eql('https://www.cloudpro.co.uk/go/8550');
        expect(result.ogTitle).to.be.eql('Outreach: The startup that came back from the brink');
        expect(result.ogDescription).to.be.eql('How a cash strapped recruitment company became a unicorn with a new business model');
        expect(result.twitterCard).to.be.eql('photo');
        expect(result.twitterSite).to.be.eql('@cloudprouk');
        expect(result.twitterSiteId).to.be.eql('267718709');
        expect(result.twitterTitle).to.be.eql('Outreach: The startup that came back from the brink');
        expect(result.twitterDescription).to.be.eql('How a cash strapped recruitment company became a unicorn with a new business model');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterUrl).to.be.eql('https://www.cloudpro.co.uk/hr/8550/outreach-the-startup-that-came-back-from-the-brink');
        expect(result.ogImage).to.be.eql({
          url: 'https://cdn1.cloudpro.co.uk/sites/cloudprod7/files/2020/05/outreach_founding_members.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://cdn1.cloudpro.co.uk/sites/cloudprod7/files/2020/05/outreach_founding_members.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/cloudpro');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogLocale',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterSiteId',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('cnet', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/cnet' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.author).to.be.eql('Roger Cheng');
        expect(result.ogSiteName).to.be.eql('CNET');
        expect(result.ogTitle).to.be.eql('5G glossary: From spectrum to small cell to MIMO');
        expect(result.ogDescription).to.be.eql("Here's what you need to at least sound like you know what you're talking about when it comes to the next-gen mobile network.");
        expect(result.ogType).to.be.eql('article');
        expect(result.ogUrl).to.be.eql('https://www.cnet.com/how-to/5g-glossary-everything-from-spectrum-to-small-cell-to-mimo/');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.ogDate).to.be.eql('2020-06-01T05:00:00-0700');
        expect(result.twitterTitle).to.be.eql('5G glossary: From spectrum to small cell to MIMO');
        expect(result.twitterDescription).to.be.eql("Here's what you need to at least sound like you know what you're talking about when it comes to the next-gen mobile network.");
        expect(result.twitterSite).to.be.eql('@CNET');
        expect(result.twitterCreator).to.be.eql('@RogerWCheng');
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/cnet');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterUrl).to.be.eql('https://www.cnet.com/how-to/5g-glossary-everything-from-spectrum-to-small-cell-to-mimo/');
        expect(result.ogImage).to.be.eql({
          url: 'https://cnet3.cbsistatic.com/img/0IjS4wIUDkC77PSDb-eyF0aZNw8=/756x567/2020/01/22/931a3fa2-4e0e-4def-bdc2-448926f8da02/5g-phone-2.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://cnet3.cbsistatic.com/img/0IjS4wIUDkC77PSDb-eyF0aZNw8=/756x567/2020/01/22/931a3fa2-4e0e-4def-bdc2-448926f8da02/5g-phone-2.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/cnet');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'author',
          'ogDescription',
          'articlePublisher',
          'ogDate',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogLocale',
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
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('crn', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/crn' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogDescription).to.be.eql('The acquisition brings NetApp cloud compute optimization technology to go with its storage optimization capabilities.');
        expect(result.author).to.be.eql('Joseph F. Kovar');
        expect(result.ogUrl).to.be.eql('https://www.crn.com/news/cloud/netapp-buying-spot-to-tie-public-cloud-compute-storage-optimization');
        expect(result.articlePublishedTime).to.be.eql('June 03, 2020, 06:46 PM EDT');
        expect(result.ogSiteName).to.be.eql('CRN');
        expect(result.ogDate).to.be.eql('PT0H0M188.565S'); // TODO: look into this
        expect(result.ogType).to.be.eql('article');
        expect(result.ogTitle).to.be.eql('NetApp Buying Spot To Tie Public Cloud Compute, Storage Optimization');
        expect(result.ogImage).to.be.eql({
          url: 'https://www.crn.com/resources/025e-0f90fd4ccc09-53e1753b72f0-1000/netapp_anthony_lye.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/crn');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articlePublishedTime',
          'author',
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('computerworld', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/computerworld' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('Healthcare Data Protection and Privacy Prognosis—Still Critical but New Treatment is Available');
        expect(result.ogDescription).to.be.eql('My healthcare data is what I want protected the most (intimate details about my family’s health, where we live, and financial information). Anything and everything a hacker could want! It is safe? As a data security professional and citizen, I know the answer is not good.');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogDate).to.be.eql('2016-04-15T13:52-0700');
        expect(result.dcDateIssued).to.be.eql('2016-04-15T13:52-05:00');
        expect(result.author).to.be.eql('Robert Shields');
        expect(result.ogSiteName).to.be.eql('Computerworld');
        expect(result.ogUrl).to.be.eql('https://www.computerworld.com/article/3057179/healthcare-data-protection-and-privacy-prognosis-still-critical-but-new-treatment-is-available.html');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@computerworld');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterDescription).to.be.eql('My healthcare data is what I want protected the most (intimate details about my family’s health, where we live, and financial information). Anything and everything a hacker could want! It is safe? As a data security professional and citizen, I know the answer is not good.');
        expect(result.ogImage).to.be.eql({
          url: 'https://images.techhive.com/images/article/2016/04/blog-31_apr15_image-1-100656409-orig.jpg',
          width: '1000',
          height: '667',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://images.techhive.com/images/article/2016/04/blog-31_apr15_image-1-100656409-orig.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/computerworld');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'author',
          'dcDateIssued',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogLocale',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('darkreading', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/darkreading' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql("DDoS Attack Mitigation: Don't Sacrifice Speed for Security");
        expect(result.ogType).to.be.eql('article');
        expect(result.ogUrl).to.be.eql('https://www.darkreading.com/attacks-breaches/ddos-attack-mitigation-dont-sacrifice-speed-for-security/d/d-id/1337917');
        expect(result.ogSiteName).to.be.eql('Dark Reading');
        expect(result.ogDescription).to.be.eql("Why common strategies for stopping DDoS attacks sometimes cause the same slowdowns they're trying to prevent.");
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.twitterSite).to.be.eql('@DarkReading');
        expect(result.twitterTitle).to.be.eql("DDoS Attack Mitigation: Don't Sacrifice Speed for Security");
        expect(result.twitterDescription).to.be.eql("Why common strategies for stopping DDoS attacks sometimes cause the same slowdowns they're trying to prevent.");
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql({
          url: 'https://twimgs.com/nojitter/darkreading/dr-logo.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://twimgs.com/nojitter/darkreading/dr-logo.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/darkreading');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogLocale',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('discourse', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/discourse' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('Coding Horror Discussion');
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.ogUrl).to.be.eql('https://discourse.codinghorror.com/t/the-raspberry-pi-has-revolutionized-emulation/4462/29');
        expect(result.ogTitle).to.be.eql('The Raspberry Pi Has Revolutionized Emulation');
        expect(result.twitterTitle).to.be.eql('The Raspberry Pi Has Revolutionized Emulation');
        expect(result.ogDescription).to.be.eql('Check out Pico-8 for new "fantasy console" goodness.  Works great with Raspberry Pi Zero, 2, 3, etc.');
        expect(result.twitterDescription).to.be.eql('Check out Pico-8 for new "fantasy console" goodness.  Works great with Raspberry Pi Zero, 2, 3, etc.');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterUrl).to.be.eql('https://discourse.codinghorror.com/t/the-raspberry-pi-has-revolutionized-emulation/4462/29');
        expect(result.ogImage).to.be.eql({
          url: 'https://discourse-cdn.codinghorror.com/user_avatar/discourse.codinghorror.com/adam_sommer/100/74278_1.png',
          width: null,
          height: null,
          type: 'png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://discourse-cdn.codinghorror.com/user_avatar/discourse.codinghorror.com/adam_sommer/100/74278_1.png',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/discourse');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogUrl',
          'ogLocale',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('docs', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/docs' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('Bay Area Guide to Mission Series/Banners');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogSiteName).to.be.eql('Google Docs');
        expect(result.ogUrl).to.be.eql('https://docs.google.com/document/d/1GnsFxQZWERvB5A2cYnmpmNzgH_zAtUsUMQ-th1em2jQ/edit?usp=sharing&usp=embed_facebook');
        expect(result.ogDescription).to.be.eql('Guide to Ingress Mission Series/Banners in the Greater SF Bay Area contributors: @katranrocks (Kate Magary), @strandit (Bryant Durrell), @hiryu (Brett Allen), @011101000101001 (Florian Sauer), @FlyingRobot (Timothy Appel), @freddd123 (Austin), @jookwarrior (Andy), @VeIocipractor (TZ), @phthoruth ...');
        expect(result.ogImage).to.be.eql({
          url: 'https://lh4.googleusercontent.com/mRveTQA06RV1oCWNnA6CiDyPwMd5Uz0pTdTIzLR3NdTENlixSZCN17Ry2zUiYXHX6ZanMA=w1200-h630-p',
          width: '1200',
          height: '630',
          type: null,
        });
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('ebay', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/ebay' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogDescription).to.be.eql('Add style without losing comfort with this 3-person outdoor sofa. Made out of weather resistant wicker on an aluminum frame, it will endure in any of your outdoor spaces. The synthetic resin wicker provides a durable exterior, while still preserving its classic yet modern appearance. | eBay!');
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.ogType).to.be.eql('ebay-objects:item');
        expect(result.twitterDescription).to.be.eql('Add style without losing comfort with this 3-person outdoor sofa. Made out of weather resistant wicker on an aluminum frame, it will endure in any of your outdoor spaces. The synthetic resin wicker provides a durable exterior, while still preserving its classic yet modern appearance. | eBay!');
        expect(result.twitterSite).to.be.eql('@eBay');
        expect(result.ogDate).to.be.eql('Aug 24, 2016');
        expect(result.ogSiteName).to.be.eql('eBay');
        expect(result.ogUrl).to.be.eql('http://www.ebay.com/itm/Outdoor-Wicker-Patio-Furniture-Sofa-3-Seater-Luxury-Comfort-Brown-Wicker-Couch-/381228738769');
        expect(result.twitterTitle).to.be.eql('Outdoor Wicker Patio Furniture Sofa 3 Seater Luxury Comfort Brown Wicker Couch');
        expect(result.ogTitle).to.be.eql('Outdoor Wicker Patio Furniture Sofa 3 Seater Luxury Comfort Brown Wicker Couch  | eBay');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql({
          url: 'http://i.ebayimg.com/images/i/381228738769-0-1/s-l1000.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'http://i.ebayimg.com/images/i/381228738769-0-1/s-l1000.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/ebay');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogLocale',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('economictimes', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/economictimes' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.alAndroidAppName).to.be.eql('The Economic Times');
        expect(result.alAndroidUrl).to.be.eql('etandroidapp://articleshow/76152443');
        expect(result.alIosAppName).to.be.eql(' The Economic Times App');
        expect(result.alIosAppStoreId).to.be.eql('474766725');
        expect(result.alIosUrl).to.be.eql('etapp://articleshow/76152443');
        expect(result.ogTitle).to.be.eql('Lockdown led to 30% surge in resumes from job seekers: Recruitment firms');
        expect(result.ogSiteName).to.be.eql('The Economic Times');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogUrl).to.be.eql('https://economictimes.indiatimes.com/jobs/lockdown-led-to-30-surge-in-resumes-from-job-seekers-recruitment-firms/articleshow/76152443.cms');
        expect(result.ogDescription).to.be.eql('Placement firm TeamLease Services has received 22,367 resumes in May from hospitality sectors alone, up a staggering 444 per cent from 4,109 in the previous month. Professionals who are proactively looking out have either been handed out pink slips or are facing job threats as their companies take the restructuring route, said executives aware of the matter.');
        expect(result.articlePublishedTime).to.be.eql('2020-06-02T14:05:00.000Z');
        expect(result.articleTag).to.be.eql('Corona');
        expect(result.articleModifiedTime).to.be.eql('2020-06-03T12:41:00.000Z');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@EconomicTimes');
        expect(result.twitterTitle).to.be.eql('Lockdown led to 30% surge in resumes from job seekers: Recruitment firms');
        expect(result.twitterDescription).to.be.eql('Placement firm TeamLease Services has received 22,367 resumes in May from hospitality sectors alone, up a staggering 444 per cent from 4,109 in the previous month. Professionals who are proactively looking out have either been handed out pink slips or are facing job threats as their companies take the restructuring route, said executives aware of the matter.');
        expect(result.twitterAppNameiPhone).to.be.eql('The Economic Times App');
        expect(result.twitterAppIdiPhone).to.be.eql('474766725');
        expect(result.twitterAppUrliPhone).to.be.eql('etapp://articleshow/76152443');
        expect(result.twitterAppNameGooglePlay).to.be.eql('The Economic Times App');
        expect(result.twitterAppIdGooglePlay).to.be.eql('com.et.reader.activities');
        expect(result.twitterAppUrlGooglePlay).to.be.eql('etandroidapp://articleshow/76152443');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterUrl).to.be.eql('https://economictimes.indiatimes.com/jobs/lockdown-led-to-30-surge-in-resumes-from-job-seekers-recruitment-firms/articleshow/76152443.cms');
        expect(result.ogImage).to.be.eql({
          url: 'https://img.etimg.com/thumb/msid-76152431,width-1070,height-580,imgsize-380461,overlay-economictimes/photo.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://img.etimg.com/thumb/msid-76152431,width-1070,height-580,imgsize-380461,overlay-economictimes/photo.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/economictimes');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'alAndroidAppName',
          'alAndroidUrl',
          'alIosAppName',
          'alIosAppStoreId',
          'alIosUrl',
          'articleModifiedTime',
          'articlePublishedTime',
          'articleTag',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogLocale',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterAppIdGooglePlay',
          'twitterAppIdiPhone',
          'twitterAppNameGooglePlay',
          'twitterAppNameiPhone',
          'twitterAppUrlGooglePlay',
          'twitterAppUrliPhone',
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
  it('entrepreneur', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/entrepreneur' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('Entrepreneur');
        expect(result.articleAuthor).to.be.eql('Matthew Humphries');
        expect(result.ogTitle).to.be.eql('Origami-Inspired Robot Gripper Could Pack Your Groceries');
        expect(result.ogDescription).to.be.eql('By taking inspiration from origami, this robot gripper can safely pick up and hold delicate objects while at the same time lift more than 100x its own weight.');
        expect(result.ogUrl).to.be.eql('https://www.entrepreneur.com/article/330171');
        expect(result.ogType).to.be.eql('article');
        expect(result.articlePublishedTime).to.be.eql('2019-03-14T14:35:12Z');
        expect(result.articleModifiedTime).to.be.eql('2019-03-14@14:35:13 UTC');
        expect(result.articleTag).to.be.eql('Technology,Robots');
        expect(result.ogDate).to.be.eql('2019-03-14@14:35:13 UTC');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@Entrepreneur');
        expect(result.twitterTitle).to.be.eql('Origami-Inspired Robot Gripper Could Pack Your Groceries');
        expect(result.twitterDescription).to.be.eql('By taking inspiration from origami, this robot gripper can safely pick up and hold delicate objects while at the same time lift more than 100x its own weight.');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterUrl).to.be.eql('https://www.entrepreneur.com/article/330171');
        expect(result.ogImage).to.be.eql({
          url: 'https://assets.entrepreneur.com/content/3x2/2000/20190314142224-origami-inspired-robot.jpeg',
          width: '2000',
          height: '1333',
          type: 'jpeg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://assets.entrepreneur.com/content/3x2/2000/20190314142224-origami-inspired-robot.jpeg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/EntMagazine');
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/entrepreneur');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleAuthor',
          'articleModifiedTime',
          'articlePublishedTime',
          'articlePublisher',
          'articleTag',
          'ogDate',
          'ogDescription',
          'ogLocale',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
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
  it('etsy', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/etsy' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.alAndroidAppName).to.be.eql('Etsy');
        expect(result.alAndroidPackage).to.be.eql('com.etsy.android');
        expect(result.alAndroidUrl).to.be.eql('etsy://listing/230389421?ref=applinks_android');
        expect(result.alIosAppName).to.be.eql('Etsy');
        expect(result.alIosAppStoreId).to.be.eql('477128284');
        expect(result.alIosUrl).to.be.eql('etsy://listing/230389421?ref=applinks_ios');
        expect(result.ogSiteName).to.be.eql('Etsy');
        expect(result.ogLocale).to.be.eql('en_US');
        expect(result.ogTitle).to.be.eql('Agents of Shield decal sticker for car, truck, laptop in ANY COLOR die cut vinyl');
        expect(result.ogType).to.be.eql('etsymarketplace:item');
        expect(result.ogUrl).to.be.eql('https://www.etsy.com/listing/230389421/agents-of-shield-decal-sticker-for-car?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share');
        expect(result.ogDescription).to.be.eql('Die cut sticker is cut in the shape of the graphic with no background and all one color.  Available in several colors and a variety of sizes. Please rely on dimensions listed or measure area where you will be applying the decal. Select options from drop down menus. Agents of Shield Hydra logo also available: https://www.etsy.com/your/shops/InfernoDecals/tools/listings/230718253  Sizes listed are in inches. (1 inch = 2.54 centimeters)  Made from quality outdoor vinyl that is water proof, UV resistant and rated to last 6 years outdoors and longer indoors. Self adhesive vinyl is removable and does not damage hard surfaces or vehicle paint. Not reuseable or repositionable. Can be applied to any clean smooth surface such as vehicle body, window, laptop, water bottle, mirror, helmet, guitar etc.  Ships in cardboard mailer or with cardboard inside envelope to protect from damage during shipping. Easy to install, comes with full instructions included. How to install vinyl decals: 1. Clean the area thoroughly with rubbing alcohol or soap and water. Do not use Windex or similar products, it will leave a residue behind that will prevent the sticker from adhering well. 2. Prepare the sticker for application by firmly rubbing a squeegee or credit card across the clear transfer tape. This removes any air bubbles that may have formed and makes the sticker cling to the transfer tape. 3. Peel the white paper backing off the sticker. If the sticker clings to the backing, slowly replace the paper backing and repeat Step 2. 4. Slowly lower the sticker onto the surface and rub it in place firmly with a squeegee or credit card. Wait 10 minutes or more. For best results, wait 24 hours before moving to the next step. 5. Slowly peel the clear transfer tape off at an angle. Be careful not to pull the sticker off the surface. If sticker pulls away from the surface repeat Step 4.  *Use a pin to poke any air bubbles in the center and push the air out through the hole. *For best results do not apply a sticker in extreme hot or cold temperatures.');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('Agents of Shield decal sticker for car, truck, laptop in ANY COLOR die cut vinyl');
        expect(result.twitterDescription).to.be.eql('Die cut sticker is cut in the shape of the graphic with no background and all one color.  Available in several colors and a variety of sizes. Please rely on dimensions listed or measure area where you will be applying the decal. Select options from drop down menus. Agents of Shield Hydra logo also available: https://www.etsy.com/your/shops/InfernoDecals/tools/listings/230718253  Sizes listed are in inches. (1 inch = 2.54 centimeters)  Made from quality outdoor vinyl that is water proof, UV resistant and rated to last 6 years outdoors and longer indoors. Self adhesive vinyl is removable and does not damage hard surfaces or vehicle paint. Not reuseable or repositionable. Can be applied to any clean smooth surface such as vehicle body, window, laptop, water bottle, mirror, helmet, guitar etc.  Ships in cardboard mailer or with cardboard inside envelope to protect from damage during shipping. Easy to install, comes with full instructions included. How to install vinyl decals: 1. Clean the area thoroughly with rubbing alcohol or soap and water. Do not use Windex or similar products, it will leave a residue behind that will prevent the sticker from adhering well. 2. Prepare the sticker for application by firmly rubbing a squeegee or credit card across the clear transfer tape. This removes any air bubbles that may have formed and makes the sticker cling to the transfer tape. 3. Peel the white paper backing off the sticker. If the sticker clings to the backing, slowly replace the paper backing and repeat Step 2. 4. Slowly lower the sticker onto the surface and rub it in place firmly with a squeegee or credit card. Wait 10 minutes or more. For best results, wait 24 hours before moving to the next step. 5. Slowly peel the clear transfer tape off at an angle. Be careful not to pull the sticker off the surface. If sticker pulls away from the surface repeat Step 4.  *Use a pin to poke any air bubbles in the center and push the air out through the hole. *For best results do not apply a sticker in extreme hot or cold temperatures.');
        expect(result.twitterAppNameiPhone).to.be.eql('Etsy');
        expect(result.twitterAppUrliPhone).to.be.eql('etsy://listing/230389421?ref=TwitterProductCard');
        expect(result.twitterAppIdiPhone).to.be.eql('477128284');
        expect(result.twitterAppNameiPad).to.be.eql('Etsy');
        expect(result.twitterAppUrliPad).to.be.eql('etsy://listing/230389421?ref=TwitterProductCard');
        expect(result.twitterAppIdiPad).to.be.eql('477128284');
        expect(result.twitterAppNameGooglePlay).to.be.eql('Etsy');
        expect(result.twitterAppUrlGooglePlay).to.be.eql('etsy://listing/230389421?ref=TwitterProductCard');
        expect(result.twitterAppIdGooglePlay).to.be.eql('com.etsy.android');
        expect(result.twitterSite).to.be.eql('@Etsy');
        expect(result.ogImage).to.be.eql({
          url: 'https://img0.etsystatic.com/058/0/10499963/il_570xN.759424778_ojd8.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://img0.etsystatic.com/058/0/10499963/il_570xN.759424778_ojd8.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/etsy');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'alAndroidAppName',
          'alAndroidPackage',
          'alAndroidUrl',
          'alIosAppName',
          'alIosAppStoreId',
          'alIosUrl',
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
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('facebook', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/facebook' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('Facebook');
        expect(result.ogUrl).to.be.eql('https://www.facebook.com/');
        expect(result.ogLocale).to.be.eql('en_US');
        expect(result.ogImage).to.be.eql({
          url: 'https://www.facebook.com/images/fb_icon_325x325.png',
          width: null,
          height: null,
          type: 'png',
        });
        expect(result.ogTitle).to.be.eql('Facebook - Log In or Sign Up');
        expect(result.ogDescription).to.be.eql('Create an account or log into Facebook. Connect with friends, family and other people you know. Share photos and videos, send messages and get updates.');
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/facebook');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
          'ogLocale',
          'ogSiteName',
          'ogTitle',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('fastcompany', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/fastcompany' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogType).to.be.eql('article');
        expect(result.ogTitle).to.be.eql('The internet’s favorite psychiatrist has a game plan for your mental health');
        expect(result.ogUrl).to.be.eql('https://www.fastcompany.com/90514725/the-internets-favorite-psychiatrist-has-a-game-plan-for-your-mental-health');
        expect(result.ogLocale).to.be.eql('en_US');
        expect(result.ogDescription).to.be.eql('Renowned psychiatrist Dr. Jessica Clemons, MD gained popularity for helping to normalize the conversation around mental health, particularly in the black community.\n');
        expect(result.ogSiteName).to.be.eql('Fast Company');
        expect(result.ogDate).to.be.eql('2020-06-11T10:00:03Z');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('The internet’s favorite psychiatrist has a game plan for your mental health');
        expect(result.twitterDescription).to.be.eql('Renowned psychiatrist Dr. Jessica Clemons, MD gained popularity for helping to normalize the conversation around mental health, particularly in the black community.\n');
        expect(result.twitterSite).to.be.eql('@fastcompany');
        expect(result.articlePublishedTime).to.be.eql('2020-06-11T06:00:03');
        expect(result.articleModifiedTime).to.be.eql('2020-06-11T09:47:11');
        expect(result.author).to.be.eql('KC Ifeanyi');
        expect(result.articleTag).to.be.eql('audio');
        expect(result.twitterUrl).to.be.eql('https://www.fastcompany.com/90514725/the-internets-favorite-psychiatrist-has-a-game-plan-for-your-mental-health');
        expect(result.ogImage).to.be.eql({
          url: 'https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2020/06/p-2-dr-jess-clemons-creative-conversation.jpg',
          width: '1280',
          height: '720',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2020/06/p-2-dr-jess-clemons-creative-conversation.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/FastCompany');
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/fastcompany');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleModifiedTime',
          'articlePublishedTime',
          'articlePublisher',
          'articleTag',
          'author',
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
  it('forbes', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/forbes' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.author).to.be.eql('Adam Hurly');
        expect(result.articleSection).to.be.eql('Shopping');
        expect(result.articleAuthor).to.be.eql('Adam Hurly');
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/forbes');
        expect(result.ogTitle).to.be.eql('The Best Men’s Colognes For Gifting');
        expect(result.ogSiteName).to.be.eql('Forbes');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogUrl).to.be.eql('https://www.forbes.com/sites/forbes-personal-shopper/2020/06/10/best-mens-colognes-and-fragrances/');
        expect(result.ogDescription).to.be.eql("The best scents for gifting — even if it's a gift to yourself — are universally appealing but also unique. ");
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@forbes');
        expect(result.ogDate).to.be.eql('2020-06-10');
        expect(result.twitterTitle).to.be.eql('The Best Men’s Colognes For Gifting');
        expect(result.twitterDescription).to.be.eql("The best scents for gifting — even if it's a gift to yourself — are universally appealing but also unique. ");
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql({
          url: 'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ee10f96298ad300068f3c9a%2F0x0.jpg%3FcropX1%3D0%26cropX2%3D1080%26cropY1%3D326%26cropY2%3D933',
          width: null,
          height: null,
          type: null,
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ee10f96298ad300068f3c9a%2F0x0.jpg%3FcropX1%3D0%26cropX2%3D1080%26cropY1%3D326%26cropY2%3D933',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/forbes');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleAuthor',
          'articleSection',
          'articlePublisher',
          'author',
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogLocale',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('fortune', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/fortune' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogUrl).to.be.eql('https://fortune.com/2020/06/10/coronavirus-deaths-us-covid-19-killed-more-americans-korean-war-vietnam-iraq-persian-gulf-combined-how-many-died/');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogTitle).to.be.eql('The coronavirus has now killed more Americans than every war since the start of the Korean War—combined');
        expect(result.ogDescription).to.be.eql('COVID-19 has claimed 112,311 U.S. lives. That’s higher than the 104,404 troops who died in every war since the start of the Korean War in 1950.');
        expect(result.ogSiteName).to.be.eql('Fortune');
        expect(result.ogDate).to.be.eql('2020-06-10T19:30:00-04:00');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('The coronavirus has now killed more Americans than every war since the start of the Korean War—combined');
        expect(result.twitterDescription).to.be.eql('COVID-19 has claimed 112,311 U.S. lives. That’s higher than the 104,404 troops who died in every war since the start of the Korean War in 1950.');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterUrl).to.be.eql('https://fortune.com/2020/06/10/coronavirus-deaths-us-covid-19-killed-more-americans-korean-war-vietnam-iraq-persian-gulf-combined-how-many-died/');
        expect(result.ogImage).to.be.eql({
          url: 'https://content.fortune.com/wp-content/uploads/2020/06/nolvi-u-s-deaths-from-wars-and-major-pandemics-4.png?resize=1200,600',
          width: null,
          height: null,
          type: 'png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://content.fortune.com/wp-content/uploads/2020/06/nolvi-u-s-deaths-from-wars-and-major-pandemics-4.png?resize=1200,600',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/fortune');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogLocale',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('foursquare', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/foursquare' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.alAndroidAppName).to.be.eql('Foursquare');
        expect(result.alAndroidPackage).to.be.eql('com.joelapenna.foursquared');
        expect(result.alAndroidUrl).to.be.eql('foursquare://venues/4ed4896c775b45f6ed7b0182');
        expect(result.alIpadAppName).to.be.eql('Foursquare');
        expect(result.alIpadAppStoreId).to.be.eql('306934924');
        expect(result.alIpadUrl).to.be.eql('foursquare://venues/4ed4896c775b45f6ed7b0182');
        expect(result.alIphoneAppName).to.be.eql('Foursquare');
        expect(result.alIphoneAppStoreId).to.be.eql('306934924');
        expect(result.alIphoneUrl).to.be.eql('foursquare://venues/4ed4896c775b45f6ed7b0182');
        expect(result.alWebShouldFallback).to.be.eql('false');
        expect(result.alWindowsPhoneAppId).to.be.eql('26cf3302-469f-e011-986b-78e7d1fa76f8');
        expect(result.alWindowsPhoneAppName).to.be.eql('Foursquare');
        expect(result.alWindowsPhoneUrl).to.be.eql('foursquare://venues/4ed4896c775b45f6ed7b0182');
        expect(result.ogTitle).to.be.eql('The Baxter Inn');
        expect(result.ogDescription).to.be.eql('Whisky Bar in Sydney, NSW');
        expect(result.ogUrl).to.be.eql('https://foursquare.com/v/the-baxter-inn/4ed4896c775b45f6ed7b0182');
        expect(result.ogType).to.be.eql('playfoursquare:venue');
        expect(result.ogSiteName).to.be.eql('Foursquare');
        expect(result.twitterSite).to.be.eql('@foursquare');
        expect(result.twitterCreator).to.be.eql('@foursquare');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterDescription).to.be.eql('Whisky Bar in Sydney, NSW');
        expect(result.twitterTitle).to.be.eql('The Baxter Inn');
        expect(result.twitterAppNameiPhone).to.be.eql('Foursquare');
        expect(result.twitterAppIdiPhone).to.be.eql('306934924');
        expect(result.twitterAppUrliPhone).to.be.eql('foursquare://venues/4ed4896c775b45f6ed7b0182');
        expect(result.twitterAppNameiPad).to.be.eql('Foursquare');
        expect(result.twitterAppIdiPad).to.be.eql('306934924');
        expect(result.twitterAppUrliPad).to.be.eql('foursquare://venues/4ed4896c775b45f6ed7b0182');
        expect(result.twitterAppNameGooglePlay).to.be.eql('Foursquare');
        expect(result.twitterAppIdGooglePlay).to.be.eql('com.joelapenna.foursquared');
        expect(result.twitterAppUrlGooglePlay).to.be.eql('foursquare://venues/4ed4896c775b45f6ed7b0182');
        expect(result.ogImage).to.be.eql({
          url: 'https://irs2.4sqi.net/img/general/600x600/13692844_gLU3tu6y4S6bcPDyiS1y9GU9ZkghXDaMJE9xFnPuVmo.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://irs2.4sqi.net/img/general/600x600/13692844_gLU3tu6y4S6bcPDyiS1y9GU9ZkghXDaMJE9xFnPuVmo.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.twitterUrl).to.be.eql('https://foursquare.com/v/the-baxter-inn/4ed4896c775b45f6ed7b0182');
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/foursquare');
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
          'alWebShouldFallback',
          'alWindowsPhoneAppId',
          'alWindowsPhoneAppName',
          'alWindowsPhoneUrl',
          'ogDescription',
          'ogImage',
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
          'twitterCreator',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('geektime', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/geektime' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('GeekTime');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogTitle).to.be.eql('Duckface can saves lives: Binah.ai raises $13.5M to monitor health condition through selfies');
        expect(result.ogDescription).to.be.eql('Israeli startup Binah.ai technology tracks vital-sign measurements from selfies. As the pandemic calls for more remote everything, the company’s tech is already being used in a Canadian hospital');
        expect(result.ogUrl).to.be.eql('https://www.geektime.com/duckface-can-saves-lives-binah-ai-raises-13-5m-to-monitor-health-condition-through-selfies/');
        expect(result.articlePublishedTime).to.be.eql('2020-06-11T15:58:33.000Z');
        expect(result.articleModifiedTime).to.be.eql('2020-06-11T15:58:33.000Z');
        expect(result.articleTag).to.be.eql('startups');
        expect(result.ogDate).to.be.eql('2020-06-11');
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/geektimecoil');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('Duckface can saves lives: Binah.ai raises $13.5M to monitor health condition through selfies');
        expect(result.twitterDescription).to.be.eql('Israeli startup Binah.ai technology tracks vital-sign measurements from selfies. As the pandemic calls for more remote everything, the company’s tech is already being used in a Canadian hospital');
        expect(result.twitterSite).to.be.eql('@geektimecoil');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql({
          url: 'https://www.geektime.com/content/images/2020/06/binah-1578304795.png',
          width: '940',
          height: '626',
          type: 'png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://www.geektime.com/content/images/2020/06/binah-1578304795.png',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.twitterUrl).to.be.eql('https://www.geektime.com/duckface-can-saves-lives-binah-ai-raises-13-5m-to-monitor-health-condition-through-selfies/');
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/geektime');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'articleModifiedTime',
          'articlePublishedTime',
          'articlePublisher',
          'articleTag',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogLocale',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
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
  it('inc', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/inc' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogType).to.be.eql('article');
        expect(result.ogSiteName).to.be.eql('Inc.com');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@Inc');
        expect(result.ogTitle).to.be.eql('Reopening? Learn How to Help Your Employees Feel  Safe Psychologically');
        expect(result.ogDescription).to.be.eql("You can provide all the PPE you want, but it's also crucial that your employees are emotionally secure in their workplace.");
        expect(result.ogUrl).to.be.eql('https://www.inc.com/brit-morse/reopening-workplace-help-employees-feel-safe-psychologically.html');
        expect(result.twitterCreator).to.be.eql('britnmorse');
        expect(result.twitterTitle).to.be.eql('Reopening? Learn How to Help Your Employees Feel  Safe Psychologically');
        expect(result.twitterDescription).to.be.eql("You can provide all the PPE you want, but it's also crucial that your employees are emotionally secure in their workplace.");
        expect(result.twitterUrl).to.be.eql('https://www.inc.com/brit-morse/reopening-workplace-help-employees-feel-safe-psychologically.html');
        expect(result.articlePublishedTime).to.be.eql('2020-06-11 05:00:00');
        expect(result.articleSection).to.be.eql('Safeguards');
        expect(result.articleAuthor).to.be.eql('Brit Morse');
        expect(result.ogImage).to.be.eql({
          url: 'https://www.incimages.com/uploaded_files/image/1024x576/GettyImages-1223427650_430893.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://www.incimages.com/uploaded_files/image/1024x576/GettyImages-1223427650_430893.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/inc');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleAuthor',
          'articlePublishedTime',
          'articleSection',
          'ogDescription',
          'ogImage',
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
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('insta', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/insta' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.alAndroidAppName).to.be.eql('Instagram');
        expect(result.alAndroidPackage).to.be.eql('com.instagram.android');
        expect(result.alAndroidUrl).to.be.eql('https://www.instagram.com/p/BG0m4IDGaqk/');
        expect(result.alIosAppName).to.be.eql('Instagram');
        expect(result.alIosAppStoreId).to.be.eql('389801252');
        expect(result.alIosUrl).to.be.eql('instagram://media?id=1275815577152760484');
        expect(result.ogSiteName).to.be.eql('Instagram');
        expect(result.ogTitle).to.be.eql('Instagram photo by Minaal • Jun 19, 2016 at 4:04am UTC');
        expect(result.ogDescription).to.be.eql('See this Instagram photo by @minaalofficial • 105 likes');
        expect(result.ogUrl).to.be.eql('https://www.instagram.com/p/BG0m4IDGaqk/');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogType).to.be.eql('instapp:photo');
        expect(result.ogImage).to.be.eql({
          url: 'https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/13355676_1724260121146276_372407195_n.jpg?ig_cache_key=MTI3NTgxNTU3NzE1Mjc2MDQ4NA%3D%3D.2',
          width: null,
          height: null,
          type: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/insta');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'alAndroidAppName',
          'alAndroidPackage',
          'alAndroidUrl',
          'alIosAppName',
          'alIosAppStoreId',
          'alIosUrl',
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
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('itunes', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/itunes' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('Pokémon GO on the App Store');
        expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
        expect(result.ogSiteName).to.be.eql('App Store');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogDate).to.be.eql('2016-07-07 00:39:49 Etc/GMT');
        expect(result.twitterTitle).to.be.eql('Pokémon GO on the App Store');
        expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
        expect(result.twitterSite).to.be.eql('@AppStore');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.ogUrl).to.be.eql('https://itunes.apple.com/us/app/pokemon-go/id1094591345?mt=8');
        expect(result.ogImage).to.be.eql({
          url: 'http://is5.mzstatic.com/image/thumb/Purple71/v4/97/0a/71/970a71f1-9c94-cc61-c960-304191a8dc42/source/1200x630bf.jpg',
          width: '1200',
          height: '630',
          type: 'image/jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'http://is5.mzstatic.com/image/thumb/Purple71/v4/97/0a/71/970a71f1-9c94-cc61-c960-304191a8dc42/source/1200x630bf.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/itunes');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogLocale',
          'ogSiteName',
          'ogTitle',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('jewishbusinessnews', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/jewishbusinessnews' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogLocale).to.be.eql('en_US');
        expect(result.ogType).to.be.eql('article');
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/jbusinessnews/?ref=bookmarks');
        expect(result.ogTitle).to.be.eql('Israeli Student At The Technion Develops Self-Healing Artificial Electronic Skin - Jewish Business News');
        expect(result.ogDescription).to.be.eql('Technion doctoral Muhammad Khatib, inspired biological healing process of the human skin, decided to adapt his elastomer into an autonomous self-healing system.');
        expect(result.ogUrl).to.be.eql('https://jewishbusinessnews.com/2020/06/11/israeli-student-at-the-technion-develops-self-healing-artificial-electronic-skin/');
        expect(result.ogSiteName).to.be.eql('Jewish Business News');
        expect(result.articleTag).to.be.eql('Technion – Israel Institute of Technology');
        expect(result.articleSection).to.be.eql('World');
        expect(result.ogDate).to.be.eql('2020-06-11T20:29:48+03:00');
        expect(result.articlePublishedTime).to.be.eql('2020-06-11T15:51:41+03:00');
        expect(result.articleModifiedTime).to.be.eql('2020-06-11T20:29:48+03:00');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterDescription).to.be.eql('Technion doctoral Muhammad Khatib, inspired biological healing process of the human skin, decided to adapt his elastomer into an autonomous self-healing system.');
        expect(result.twitterTitle).to.be.eql('Israeli Student At The Technion Develops Self-Healing Artificial Electronic Skin - Jewish Business News');
        expect(result.twitterSite).to.be.eql('@JewishBusinessNews');
        expect(result.twitterCreator).to.be.eql('@JewishBusinessNews');
        expect(result.twitterUrl).to.be.eql('https://jewishbusinessnews.com/2020/06/11/israeli-student-at-the-technion-develops-self-healing-artificial-electronic-skin/');
        expect(result.ogImage).to.be.eql({
          url: 'https://jewishbusinessnews.com/wp-content/uploads/2020/06/Technion-skin-like-material-the-heal-itself-e1591896385138.jpg',
          width: '640',
          height: '628',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://jewishbusinessnews.com/wp-content/uploads/2020/06/Technion-skin-like-material-the-heal-itself-e1591896385138.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/jewishbusinessnews');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleModifiedTime',
          'articlePublishedTime',
          'articlePublisher',
          'articleSection',
          'articleTag',
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
          'twitterCard',
          'twitterCreator',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('kickstarter', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/kickstarter' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('LVL – The First Wearable Hydration Monitor');
        expect(result.ogType).to.be.eql('kickstarter:project');
        expect(result.ogUrl).to.be.eql('https://www.kickstarter.com/projects/lactate-threshold/lvl-the-first-wearable-hydration-monitor');
        expect(result.ogSiteName).to.be.eql('Kickstarter');
        expect(result.ogDescription).to.be.eql('LVL is a wearable hydration monitor that gives you the complete picture of your health by also tracking activity, sleep, mood and HR.');
        expect(result.ogLocale).to.be.eql('en_US');
        expect(result.ogLocaleAlternate).to.be.eql('fr_FR');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.ogDate).to.be.eql('2016-10-26T23:00:00-04:00');
        expect(result.twitterSite).to.be.eql('@kickstarter');
        expect(result.twitterSiteId).to.be.eql('16186995');
        expect(result.twitterTitle).to.be.eql('LVL – The First Wearable Hydration Monitor');
        expect(result.twitterDescription).to.be.eql('LVL is a wearable hydration monitor that gives you the complete picture of your health by also tracking activity, sleep, mood and HR.');
        expect(result.twitterAppIdiPhone).to.be.eql('596961532');
        expect(result.twitterAppNameiPhone).to.be.eql('Kickstarter');
        expect(result.twitterUrl).to.be.eql('https://www.kickstarter.com/projects/lactate-threshold/lvl-the-first-wearable-hydration-monitor');
        expect(result.twitterAppUrliPhone).to.be.eql('ksr://www.kickstarter.com/projects/1655571865/361230638?app_banner=1&ref=category_featured');
        expect(result.ogImage).to.be.eql({
          url: 'https://ksr-ugc.imgix.net/assets/013/622/325/ba3e0c3ba83ec7a7f6621d52f78773b9_original.jpg?w=1536&h=864&fit=fill&bg=000000&v=1473713981&auto=format&q=92&s=06bc55ef9203f6b52b87f7bf978ae915',
          width: '1536',
          height: '1152',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://ksr-ugc.imgix.net/assets/013/622/325/ba3e0c3ba83ec7a7f6621d52f78773b9_original.jpg?w=640&h=360&fit=fill&bg=000000&v=1473713981&auto=format&q=92&s=468b71562ed1d30cbf4aa9f9a1d7be1a',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/kickstarter');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogLocale',
          'ogLocaleAlternate',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterAppIdiPhone',
          'twitterAppNameiPhone',
          'twitterAppUrliPhone',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterSiteId',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('latimes', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/latimes' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('Dow sinks 1,800 as virus cases rise, deflating optimism');
        expect(result.ogUrl).to.be.eql('https://www.latimes.com/business/story/2020-06-11/stocks-wall-street-coronavirus');
        expect(result.ogDescription).to.be.eql("The Dow Jones industrial average sank more than 1,800 points and the Standard & Poor's 500 dropped 5.9% in its worst day since mid-March, when stocks had a number of harrowing falls as the virus lockdowns began.");
        expect(result.ogSiteName).to.be.eql('Los Angeles Times');
        expect(result.ogType).to.be.eql('article');
        expect(result.articleAuthor).to.be.eql('https://www.latimes.com/people/associated-press');
        expect(result.articlePublishedTime).to.be.eql('2020-06-11T14:26:01.674');
        expect(result.articleSection).to.be.eql('Business');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterDescription).to.be.eql("The Dow Jones industrial average sank more than 1,800 points and the Standard & Poor's 500 dropped 5.9% in its worst day since mid-March, when stocks had a number of harrowing falls as the virus lockdowns began.");
        expect(result.twitterSite).to.be.eql('@latimes');
        expect(result.twitterTitle).to.be.eql('Dow sinks 1,800 as virus cases rise, deflating optimism');
        expect(result.ogLocale).to.be.eql('en-US');
        expect(result.ogImage).to.be.eql({
          url: 'https://ca-times.brightspotcdn.com/dims4/default/f10ff16/2147483647/strip/true/crop/2048x1075+0+89/resize/1200x630!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff2%2F6c%2F8f7e89b7eb2a7ecc01f245e3ec0b%2Fla-1502459693-4svslqel7u-snap-image',
          width: '1200',
          height: '630',
          type: 'image/jpeg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://ca-times.brightspotcdn.com/dims4/default/3d21428/2147483647/strip/true/crop/2048x1152+0+51/resize/1200x675!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff2%2F6c%2F8f7e89b7eb2a7ecc01f245e3ec0b%2Fla-1502459693-4svslqel7u-snap-image',
          width: null,
          height: null,
          alt: 'FILE - In this Oct. 8, 2014, file photo, a Wall Street address is carved in the side of a building in New York. Stocks are opening modestly higher on Wall Street, Friday, Aug. 11, 2017, led by gains in technology companies and banks. (AP Photo/Mark Lennihan, File)',
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/latimes');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleAuthor',
          'articlePublishedTime',
          'articleSection',
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
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('leandata', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/leandata' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogType).to.be.eql('article');
        expect(result.ogDate).to.be.eql('2020-06-10');
        expect(result.ogTitle).to.be.eql('Accelerate Growth with Revenue Operations ');
        expect(result.ogUrl).to.be.eql('https://learn.leandata.com/routing-rules-leandatas-sales-and-marketing-blog/accelerate-growth-with-revenue-operations');
        expect(result.ogDescription).to.be.eql('Thinking in terms of revenue operations can dramatically accelerate growth. Here are four companies that have leveraged revenue operations for revenue growth.');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('Accelerate Growth with Revenue Operations ');
        expect(result.twitterDescription).to.be.eql('Thinking in terms of revenue operations can dramatically accelerate growth. Here are four companies that have leveraged revenue operations for revenue growth.');
        expect(result.ogImage).to.be.eql({
          url: 'https://content.cdntwrk.com/files/aHViPTYzMTAyJmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzVlZTBmZjM3ODNiOTUucG5nJnZlcnNpb249MDAwMCZzaWc9MjYxMjQxMTVmOGViODcwMzE4YzVkYjkyZTUzNWRiZDE%253D',
          width: '500',
          height: '272',
          type: null,
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://content.cdntwrk.com/files/aHViPTYzMTAyJmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzVlZTBmZjM3ODNiOTUucG5nJnZlcnNpb249MDAwMCZzaWc9MjYxMjQxMTVmOGViODcwMzE4YzVkYjkyZTUzNWRiZDE%253D',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/leandata');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('learnxinyminutes', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/learnxinyminutes' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogUrl).to.be.eql('https://learnxinyminutes.com/docs/standard-ml/');
        expect(result.ogTitle).to.be.eql('Learn Standard ML in Y Minutes');
        expect(result.ogImage).to.be.eql([
          {
            url: 'https://i.creativecommons.org/l/by-sa/3.0/88x31.png',
            width: null,
            height: null,
            type: 'png',
          },
        ]);
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/learnxinyminutes');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogImage',
          'ogTitle',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('lifehacker', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/lifehacker' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.author).to.be.eql('Kristin Wong');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogDate).to.be.eql('2016-08-16T17:00:00+10:00');
        expect(result.ogTitle).to.be.eql('Some Bill Providers Automatically Update Your Credit Card When You Get A New One');
        expect(result.ogDescription).to.be.eql('When you get a new credit card, you typically have to go through the process of updating your automatic bill pay information. Some services, though, will update automatically. So how do they know your new credit card number?...');
        expect(result.ogUrl).to.be.eql('http://www.lifehacker.com.au/2016/08/some-bill-providers-automatically-update-your-credit-card-when-you-get-a-new-one/');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@LifehackerAU');
        expect(result.ogImage).to.be.eql({
          url: 'https://i.kinja-img.com/gawker-media/image/upload/t_original/ittdz6udygdrrkbv8eey.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://i.kinja-img.com/gawker-media/image/upload/t_original/ittdz6udygdrrkbv8eey.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/lifehacker');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'author',
          'ogDate',
          'ogDescription',
          'ogLocale',
          'ogImage',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterImage',
          'twitterSite',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('macrumors', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/macrumors' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogLocale).to.be.eql('en_US');
        expect(result.ogSiteName).to.be.eql('MacRumors');
        expect(result.ogTitle).to.be.eql("Apple Announces July 10 Release Date for Upcoming Tom Hanks WWII Film 'Greyhound'");
        expect(result.ogType).to.be.eql('article');
        expect(result.ogDate).to.be.eql('2020-06-11T13:06:23-07:00');
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/MacRumors/');
        expect(result.ogUrl).to.be.eql('https://www.macrumors.com/2020/06/11/apple-tv-plus-greyhound-july-10/');
        expect(result.ogDescription).to.be.eql('Apple today shared the first trailer for "Greyhound," a WWII movie that stars Tom Hanks as George Krause, a career naval officer given...');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@macrumors');
        expect(result.twitterCreator).to.be.eql('@julipuli');
        expect(result.twitterTitle).to.be.eql("Apple Announces July 10 Release Date for Upcoming Tom Hanks WWII Film 'Greyhound'");
        expect(result.twitterDescription).to.be.eql('Apple today shared the first trailer for "Greyhound," a WWII movie that stars Tom Hanks as George Krause, a career naval officer given...');
        expect(result.ogImage).to.be.eql({
          url: 'https://images.macrumors.com/article-new/2020/05/greyhoundappletvplus.jpg',
          width: '1920',
          height: '795',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://images.macrumors.com/article-new/2020/05/greyhoundappletvplus.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/macrumors');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articlePublisher',
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
  it('mashable', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/mashable' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogUrl).to.be.eql('https://mashable.com/article/biden-open-letter-facebook-mark-zuckerberg-election/');
        expect(result.ogTitle).to.be.eql('Indignant Joe Biden pens strongly worded letter to Mark Zuckerberg');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogSiteName).to.be.eql('Mashable');
        expect(result.ogDate).to.be.eql('2020-06-11 17:50:52 UTC');
        expect(result.ogArticleModifiedTime).to.be.eql('2020-06-11T19:14:58Z');
        expect(result.ogArticlePublishedTime).to.be.eql('2020-06-11T17:50:52Z');
        expect(result.ogArticlePublisher).to.be.eql('https://www.facebook.com/mashable');
        expect(result.ogDescription).to.be.eql("Biden wants to talk to Facebook's manager. ");
        expect(result.twitterTitle).to.be.eql('Indignant Joe Biden pens strongly worded letter to Mark Zuckerberg');
        expect(result.twitterDescription).to.be.eql("Biden wants to talk to Facebook's manager. ");
        expect(result.twitterSite).to.be.eql('@mashable');
        expect(result.twitterCreator).to.be.eql('@mashable');
        expect(result.twitterCard).to.be.eql('player');
        expect(result.author).to.be.eql('Jack Morse');
        expect(result.twitterUrl).to.be.eql('https://mashable.com/article/biden-open-letter-facebook-mark-zuckerberg-election/');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql({
          url: 'https://mondrian.mashable.com/2020%252F06%252F11%252Ffe%252Fc525cae5298a4f55a62c603880b80465.d3c99.png%252F1200x630.png?signature=4ujkwZwJuqUP8Yu5IGDifLN0rbA=',
          width: null,
          height: null,
          type: 'png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://mondrian.mashable.com/uploads%252Fstory%252Fthumbnail%252F115752%252Fc525cae5-298a-4f55-a62c-603880b80465.png%252F640x360.png?signature=76mpWTpXEQXAcTrYyJprDKjClwg=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.twitterPlayer).to.be.eql({
          width: '435', height: '245', stream: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/mashable');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogLocale',
          'author',
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'ogArticleModifiedTime',
          'ogArticlePublishedTime',
          'ogArticlePublisher',
          'twitterCard',
          'twitterCreator',
          'twitterDescription',
          'twitterImage',
          'twitterPlayer',
          'twitterSite',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('medium', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/medium' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.alAndroidAppName).to.be.eql('Medium');
        expect(result.alAndroidPackage).to.be.eql('com.medium.reader');
        expect(result.alAndroidUrl).to.be.eql('medium://p/105fc835a170');
        expect(result.alIosAppName).to.be.eql('Medium');
        expect(result.alIosAppStoreId).to.be.eql('828256236');
        expect(result.alIosUrl).to.be.eql('medium://p/105fc835a170');
        expect(result.alWebUrl).to.be.eql('https://medium.com/mobility-insights/a-brief-history-of-robotics-105fc835a170');
        expect(result.twitterAppNameiPhone).to.be.eql('Medium');
        expect(result.twitterAppIdiPhone).to.be.eql('828256236');
        expect(result.ogSiteName).to.be.eql('Medium');
        expect(result.ogType).to.be.eql('article');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.articlePublishedTime).to.be.eql('2019-10-23T17:16:52.729Z');
        expect(result.ogTitle).to.be.eql('A Brief History of Robotics');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterTitle).to.be.eql('A Brief History of Robotics');
        expect(result.twitterSite).to.be.eql('@beyond1435');
        expect(result.twitterAppUrliPhone).to.be.eql('medium://p/105fc835a170');
        expect(result.ogDescription).to.be.eql('How the automotive industry bankrolled robotics development');
        expect(result.twitterDescription).to.be.eql('How the automotive industry bankrolled robotics development');
        expect(result.ogUrl).to.be.eql('https://medium.com/mobility-insights/a-brief-history-of-robotics-105fc835a170');
        expect(result.articleAuthor).to.be.eql('https://medium.com/@christiansaur');
        expect(result.author).to.be.eql('Christian Saur');
        expect(result.ogImage).to.be.eql({
          url: 'https://miro.medium.com/freeze/max/480/1*11wZiPlVMyZkQhkFlv3GpQ.gif',
          width: null,
          height: null,
          type: 'gif',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://miro.medium.com/freeze/max/480/1*11wZiPlVMyZkQhkFlv3GpQ.gif',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/medium');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'alAndroidAppName',
          'alAndroidPackage',
          'alAndroidUrl',
          'alIosAppName',
          'alIosAppStoreId',
          'alIosUrl',
          'alWebUrl',
          'articleAuthor',
          'articlePublishedTime',
          'author',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogLocale',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterAppIdiPhone',
          'twitterAppNameiPhone',
          'twitterAppUrliPhone',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('michaelkors', function () {
    return ogs({
      url: 'https://jshemas.github.io/openGraphScraperPages/michaelkors',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.author).to.be.eql('Michael Kors');
      expect(result.ogType).to.be.eql('product');
      expect(result.ogTitle).to.be.eql('Mirabel Suede Sandal  | Michael Kors');
      expect(result.ogDescription).to.be.eql('Exclusively Ours in Michael Kors stores and on michaelkors.com until 7/30/16. Geometric cutouts lend captivating flair to our Mirabel sandals in sumptuous suede. Anchored by a block heel and swingy tassel laces, they look especially chic grounding midi hemlines and cropped denim.');
      expect(result.ogUrl).to.be.eql('https://web.archive.org/web/20161126090544/http://www.michaelkors.com/mirabel-suede-sandal/_/R-US_40T6MBMS1S');
      expect(result.ogSiteName).to.be.eql('Michael Kors');
      expect(result.ogLocale).to.be.eql('en');
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
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'author',
        'ogLocale',
        'ogAvailability',
        'ogTitle',
        'ogType',
        'ogUrl',
        'ogDescription',
        'ogPriceAmount',
        'ogPriceCurrency',
        'ogSiteName',
        'ogImage',
        'requestUrl',
        'charset',
        'success',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('mulesoft', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/mulesoft' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('MuleSoft');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogUrl).to.be.eql('https://www.mulesoft.com/contact');
        expect(result.ogTitle).to.be.eql('1-415-229-2009');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogDescription).to.be.eql('Contact us to see how we can help transform your company with the agility to unlock data, unleash innovation and connect with success.');
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/mulesoft');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogLocale',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('newegg', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/newegg' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogUrl).to.be.eql('http://www.newegg.com/Product/Product.aspx?Item=N82E16828840014');
        expect(result.ogTitle).to.be.eql('XYZprinting da Vinci 2.0 Duo FFF (Fused Filament Fabrication) ABS/PLA Dual Nozzle 3D Printer-Newegg.com');
        expect(result.ogDescription).to.be.eql('Buy XYZprinting da Vinci 2.0 Duo FFF &#40;Fused Filament Fabrication&#41; ABS&#47;PLA Dual Nozzle 3D Printer with fast shipping and top-rated customer service.Once you know, you Newegg&#33;');
        expect(result.ogImage).to.be.eql([
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/logo_424x210.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/new_tab_business.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A68V_8a313a86-01bb-4eb1-84a0-3d85263980ed.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A8N1_68bd60ed-48bc-498e-b13b-b7c053caa855.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_AAWD_d4515325-3a9d-409d-9539-866d60db451d.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A16C_f9f20f69-a5d1-4a5c-b480-fc8ffa6c7621.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A1CZ_8a524ef6-6df1-4ca2-9751-158eee9a7b25.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A7YS_2fb077d7-4439-4d58-9a27-e4e7cb494e86.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A33T_2dbc6016-cd8e-4908-bbfe-b017586e99b4.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A8DP_6f0bb325-1287-43c5-8bef-3329c2cd573d.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A544_88bde28c-ef46-4244-8c93-2c8c1a5674c6.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A8UA_cd283435-0ea8-4eb6-b6bf-f304a04ea42a.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A019_021ac5cb-f270-4c09-8bf5-771fb3fd76bf.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/Marketing_Place/Seller_logo/Seller_A3G6_6a3223fb-8363-40d8-b7ba-e46ab051e980.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/whiteEgg.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/brandimage/Brand106236.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/ProductImage/28-840-014-16.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/ProductImageCompressAll35/28-840-014-16.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/ProductImageCompressAll35/28-840-014-15.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/ProductImageCompressAll35/28-840-014-13.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/ProductImageCompressAll35/28-840-014-14.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/loading16.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/ProductImageCompressAll/28-840-014-16.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/001_080916.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/g01_080916.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/g02_080916.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/g03_080916.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/28-840-017_080916.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/28-840-078_080916.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/28-840-095_080916.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/28-840-014_080916.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/28-840-025_080916.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/28-840-094_080916.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/BizIntell/item/28/840/28-840-014/28-840-014_080916.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/loading16.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/loading16.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/email.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/btn_subscribe-disabled.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/btn_subscribe.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/PayPal89x25.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/none.gif',
            width: null,
            height: '0',
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/awards_04.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/blue-seal-newegginc.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/inc500.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/none.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/none.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/loading16.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/none.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/none.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'http://images10.newegg.com/WebResource/Themes/2005/Nest/Gomeznone69.gif',
            width: '0',
            height: '0',
            type: 'gif',
          },
        ]);
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/newegg');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
          'ogLocale',
          'ogTitle',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('npm', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/npm' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogDescription).to.be.eql('Convert a string to a valid safe filename');
        expect(result.ogTitle).to.be.eql('filenamify');
        expect(result.ogUrl).to.be.eql('https://www.npmjs.com/package/filenamify');
        expect(result.ogSiteName).to.be.eql('npm');
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.twitterTitle).to.be.eql('npm: filenamify');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterUrl).to.be.eql('https://www.npmjs.com/package/filenamify');
        expect(result.twitterDescription).to.be.eql('Convert a string to a valid safe filename');
        expect(result.ogImage).to.be.eql({
          url: 'https://www.npmjs.com/static/images/touch-icons/open-graph.png',
          width: null,
          height: null,
          type: 'png',
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/npm');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogLocale',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterTitle',
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('prnewswire', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/prnewswire' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.author).to.be.eql('Ideanomics');
        expect(result.ogDate).to.be.eql('2020-06-11T16:25:00-04:00');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@PRNewswire');
        expect(result.twitterTitle).to.be.eql('Ideanomics Announces Reduction of Debt Holders as Part of Growth Plans');
        expect(result.twitterDescription).to.be.eql('/PRNewswire/ -- Ideanomics (NASDAQ: IDEX) ("Ideanomics" or the "Company") is pleased to announce the second-stage of debt conversion, with the noteholders of...');
        expect(result.ogTitle).to.be.eql('Ideanomics Announces Reduction of Debt Holders as Part of Growth Plans');
        expect(result.ogType).to.be.eql('website');
        expect(result.ogDescription).to.be.eql('/PRNewswire/ -- Ideanomics (NASDAQ: IDEX) ("Ideanomics" or the "Company") is pleased to announce the second-stage of debt conversion, with the noteholders of...');
        expect(result.ogUrl).to.be.eql('https://www.prnewswire.com/news-releases/ideanomics-announces-reduction-of-debt-holders-as-part-of-growth-plans-301074797.html');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql({
          url: 'https://mma.prnewswire.com/media/738482/Ideanomics_Logo.jpg?p=facebook',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://mma.prnewswire.com/media/738482/Ideanomics_Logo.jpg?p=twitter',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/prnewswire');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'author',
          'ogDate',
          'ogDescription',
          'ogLocale',
          'ogImage',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('reddit', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/reddit' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('reddit');
        expect(result.ogUrl).to.be.eql('https://www.reddit.com/r/news/comments/4p1enj/uk_man_tried_to_kill_trump_court_papers/');
        expect(result.ogDescription).to.be.eql('4910 points and 7055 comments so far on reddit');
        expect(result.ogTitle).to.be.eql("'UK man' tried to kill Trump: court papers • /r/news");
        expect(result.twitterSite).to.be.eql('reddit');
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.ogDate).to.be.eql('2016-06-20T22:36:28+00:00');
        expect(result.twitterTitle).to.be.eql("'UK man' tried to kill Trump: court papers • /r/news");
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql({
          url: 'https://www.redditstatic.com/icon.png',
          width: null,
          height: null,
          type: 'png',
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/reddit');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'ogDescription',
          'ogImage',
          'ogLocale',
          'ogSiteName',
          'ogTitle',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('reuters', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/reuters' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.author).to.be.eql('Joshua Franklin');
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/Reuters');
        expect(result.ogLocale).to.be.eql('en_US');
        expect(result.ogSiteName).to.be.eql('U.S.');
        expect(result.ogArticleAuthor).to.be.eql('Joshua Franklin');
        expect(result.ogArticleModifiedTime).to.be.eql('2020-06-12T00:17:43+0000');
        expect(result.ogArticlePublishedTime).to.be.eql('2020-06-12T00:17:43+0000');
        expect(result.ogArticleSection).to.be.eql('Business');
        expect(result.ogArticleTag).to.be.eql('US,PALANTIR,IPO,EXCLUSIVE,Security Listings / Delistings,Company News,Software and IT Services (TRBC),Exclusive,Initial Public Offerings,New Issues,Equity Financing,Software (TRBC),Major News,Enterprise Reporting,Technology / Media / Telecoms,United States');
        expect(result.ogTitle).to.be.eql('Palantir close to registering for stock market debut: sources');
        expect(result.ogUrl).to.be.eql('https://www.reuters.com/article/us-palantir-ipo-exclusive-idUSKBN23I3GB');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogDescription).to.be.eql('Data mining firm Palantir Technologies Inc is aiming to file confidentially with U.S. regulators to go public in the coming weeks, emboldened by the strong performance of other initial public offerings (IPOs), people familiar with the matter said.');
        expect(result.twitterSite).to.be.eql('@Reuters');
        expect(result.twitterCreator).to.be.eql('@Reuters');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('Palantir close to registering for stock market debut: sources');
        expect(result.twitterDescription).to.be.eql('Data mining firm Palantir Technologies Inc is aiming to file confidentially with U.S. regulators to go public in the coming weeks, emboldened by the strong performance of other initial public offerings (IPOs), people familiar with the matter said.');
        expect(result.ogImage).to.be.eql({
          url: 'https://s2.reutersmedia.net/resources/r/?m=02&d=20200611&t=2&i=1521971063&w=1200&r=LYNXMPEG5A254',
          width: null,
          height: null,
          type: null,
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://s2.reutersmedia.net/resources/r/?m=02&d=20200611&t=2&i=1521971063&w=1200&r=LYNXMPEG5A254',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/reuters');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'author',
          'articlePublisher',
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
          'ogArticleAuthor',
          'ogArticleModifiedTime',
          'ogArticlePublishedTime',
          'ogArticleSection',
          'ogArticleTag',
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
  it('rottentomatoes', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/rottentomatoes' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('Inception');
        expect(result.ogType).to.be.eql('video.movie');
        expect(result.ogUrl).to.be.eql('https://www.rottentomatoes.com/m/inception/');
        expect(result.ogDate).to.be.eql('2010-07-15T17:00:00-07:00');
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.twitterSite).to.be.eql('@rottentomatoes');
        expect(result.twitterTitle).to.be.eql('Inception');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql([
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/logos/rtlogo.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/logos/rtlogo.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/actor.default.tmb.gif',
            width: null,
            height: null,
            type: 'gif',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/user.none.tmb.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/user.none.tmb.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/user.none.tmb.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/user.none.tmb.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/user.none.tmb.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/user.none.tmb.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://staticv2.rottentomatoes.com/static/images/redesign/user.none.tmb.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
        ]);
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/rottentomatoes');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'ogImage',
          'ogTitle',
          'ogLocale',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
          'twitterCard',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('smile', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/smile' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogUrl).to.be.eql('https://www.amazon.com/Node-js-Right-Way-Server-Side-JavaScript/dp/1937785734');
        expect(result.ogTitle).to.be.eql('Node.js the Right Way: Practical, Server-Side JavaScript That Scales: Jim Wilson: 9781937785734: Amazon.com: Books');
        expect(result.ogDescription).to.be.eql('Node.js the Right Way: Practical, Server-Side JavaScript That Scales [Jim Wilson] on Amazon.com. *FREE* shipping on qualifying offers. Get to the forefront of server-side JavaScript programming by writing compact, robust, fast, networked Node applications that scale. Ready to take JavaScript beyond the browser');
        expect(result.ogImage).to.be.eql([
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/global-sprite_bluebeacon-32-v1._CB295592523_.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/kindle/merch/kcp/apple-horizontal-iconv2._CB339188008_.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/kindle/merch/kcp/google-horizontal-iconv2._CB339188010_.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/kindle/merch/kcp/windows-horizontal-iconv2._CB339188004_.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/kindle/merch/kcp/amazon-horizontal-icon._CB349235913_.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/kindle-apps/buttons/sendMeLinkMedium._CB341573398_.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/digital/sitb/sticker/sitb-sticker-v3-small._CB341765094_.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/msx/isbn-example._CB304561077_.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/kindle/kindle-device-phone-36px._CB297183290_.png',
            width: null,
            height: '16',
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/img16/student/productalert/1005981_student_titlecase_productalert_600X50._CB280689958_.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/subsamazon/merch/2016-10/ConsumerReports/CR75px._SS75_CB277290398_.png',
            width: '75',
            height: '75',
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51wP%2B%2BgnRTL._SX258_BO1,204,203,200_.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51wP%2B%2BgnRTL._AC_UL115_.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51-U0v0J8DL._AC_UL115_.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51ZwZCpn5dL._AC_UL115_.jpg',
            width: null,
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51-U0v0J8DL._AC_UL160_SR122,160_.jpg',
            width: '122',
            height: '160',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51ZwZCpn5dL._AC_UL160_SR126,160_.jpg',
            width: '126',
            height: '160',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51oxddyLhqL._AC_UL160_SR130,160_.jpg',
            width: '130',
            height: '160',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/41pINoeZygL._AC_UL160_SR130,160_.jpg',
            width: '130',
            height: '160',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/5166ztxOm9L._AC_UL160_SR123,160_.jpg',
            width: '123',
            height: '160',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51gzqnIpxQL._AC_UL160_SR123,160_.jpg',
            width: '123',
            height: '160',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/icons/icon_1x1_sl.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/img15/books/icon/27400_icon_140x140_16._SS75_CB289514780_.png',
            width: '75',
            height: '75',
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/icons/icon_1x1_sl.png',
            width: null,
            height: null,
            type: 'png',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51wP%2B%2BgnRTL._SL500_PIsitb-sticker-arrow-big,TopRight,35,-73_OU01_AA130_.jpg',
            width: '130',
            height: null,
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51-U0v0J8DL._AC_UL70_SR70,70_.jpg',
            width: '70',
            height: '70',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/81sPjexfGqL._AC_UL70_SR70,70_.jpg',
            width: '70',
            height: '70',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/51F2KSDxGwL._AC_UL70_SR70,70_.jpg',
            width: '70',
            height: '70',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/41SzsmJa9uL._AC_UL70_SR70,70_.jpg',
            width: '70',
            height: '70',
            type: 'jpg',
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/G/01/personalization/ybh/loading-4x-gray._CB317976265_.gif',
            width: null,
            height: null,
            type: 'gif',
          },
        ]);
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/smile');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDescription',
          'ogImage',
          'ogTitle',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('techcrunch', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/techcrunch' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('TechCrunch');
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/techcrunch');
        expect(result.ogTitle).to.be.eql('HackerRank Makes Technical Recruiting More Transparent – TechCrunch');
        expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
        expect(result.ogUrl).to.be.eql('https://social.techcrunch.com/2016/01/12/hackerrank-jobs-takes-the-mystery-out-of-technical-recruiting/');
        expect(result.ogType).to.be.eql('article');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@techcrunch');
        expect(result.ogDate).to.be.eql('2020-06-12T00:21:20');
        expect(result.twitterTitle).to.be.eql('HackerRank Makes Technical Recruiting More Transparent');
        expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
        expect(result.ogLocale).to.be.eql('en-US');
        expect(result.twitterCreator).to.be.eql('@fredericl');
        expect(result.ogImage).to.be.eql({
          url: 'https://techcrunch.com/wp-content/uploads/2015/08/10-interviewed.png?w=720',
          width: null,
          height: null,
          type: 'png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://techcrunch.com/wp-content/uploads/2015/08/10-interviewed.png?w=720',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/techcrunch');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articlePublisher',
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
  it('ted', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/ted' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.alAndroidAppName).to.be.eql('TED');
        expect(result.alAndroidPackage).to.be.eql('com.ted.android');
        expect(result.alAndroidUrl).to.be.eql('ted://playlists/321/talks_to_form_better_habits?source=facebook');
        expect(result.alIosAppName).to.be.eql('TED');
        expect(result.alIosAppStoreId).to.be.eql('376183339');
        expect(result.alIosUrl).to.be.eql('ted://playlists/321/talks_to_form_better_habits?source=facebook');
        expect(result.author).to.be.eql('TED');
        expect(result.ogTitle).to.be.eql('8 TED Talks to form better habits');
        expect(result.ogDescription).to.be.eql("There's never a bad time to start a good habit. Let these talks set the framework for a healthier, happier life.");
        expect(result.ogType).to.be.eql('video.other');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterSite).to.be.eql('@tedtalks');
        expect(result.twitterAppIdiPhone).to.be.eql('376183339');
        expect(result.twitterAppIdiPad).to.be.eql('376183339');
        expect(result.twitterAppIdGooglePlay).to.be.eql('com.ted.android');
        expect(result.twitterAppNameiPad).to.be.eql('TED');
        expect(result.twitterAppNameiPhone).to.be.eql('TED');
        expect(result.twitterAppNameGooglePlay).to.be.eql('TED');
        expect(result.twitterAppUrliPad).to.be.eql('ted://playlists/321/talks_to_form_better_habits?source=twitter');
        expect(result.twitterAppUrliPhone).to.be.eql('ted://playlists/321/talks_to_form_better_habits?source=twitter');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogUrl).to.be.eql('https://www.ted.com/playlists/321/talks_to_form_better_habits?utm_campaign=social&utm_medium=referral&utm_source=facebook.com&utm_content=playlist&utm_term=social-science');
        expect(result.ogImage).to.be.eql({
          url: 'https://pi.tedcdn.com/r/pf.tedcdn.com/images/playlists/talks_to_form_better_habits_1200x627.jpg?c=1050%2C550&w=1050',
          width: '1050',
          height: '550',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://pi.tedcdn.com/r/pf.tedcdn.com/images/playlists/talks_to_form_better_habits_1200x627.jpg?c=1050%2C550&w=1050',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/ted');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'alAndroidAppName',
          'alAndroidPackage',
          'alAndroidUrl',
          'alIosAppName',
          'alIosAppStoreId',
          'alIosUrl',
          'author',
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
          'twitterAppIdiPad',
          'twitterAppIdiPhone',
          'twitterAppNameGooglePlay',
          'twitterAppNameiPad',
          'twitterAppNameiPhone',
          'twitterAppUrliPad',
          'twitterAppUrliPhone',
          'twitterCard',
          'twitterImage',
          'twitterSite',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('thinkgeek', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/thinkgeek' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogSiteName).to.be.eql('ThinkGeek');
        expect(result.ogType).to.be.eql('product');
        expect(result.ogTitle).to.be.eql('Citizen Playing Cards');
        expect(result.articlePublisher).to.be.eql('ThinkGeek');
        expect(result.ogDescription).to.be.eql('Whether you perform with them or just break out the occasional flourish in a friendly poker game, Citizen Playing Cards will impress people with their elegance. The tuck case features a combination of gold foil, hot stamping, and bronze foil.');
        expect(result.ogUrl).to.be.eql('http://www.thinkgeek.com/product/jjip/?cpg=fbl_jjip');
        expect(result.articleAuthor).to.be.eql('ThinkGeek');
        expect(result.twitterSite).to.be.eql('@thinkgeek');
        expect(result.twitterCreator).to.be.eql('@thinkgeek');
        expect(result.twitterTitle).to.be.eql('Citizen Playing Cards');
        expect(result.twitterDescription).to.be.eql('Whether you perform with them or just break out the occasional flourish in a friendly poker game, Citizen Playing Cards will impress people with their elegance. The tuck case features a combination of gold foil, hot stamping, and bronze foil.');
        expect(result.twitterCard).to.be.eql('product');
        expect(result.twitterUrl).to.be.eql('http://www.thinkgeek.com/product/jjip');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql({
          url: 'http://www.thinkgeek.com/images/products/zoom/jjip_citizen_playing_cards.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'http://www.thinkgeek.com/images/products/zoom/jjip_citizen_playing_cards.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/thinkgeek');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleAuthor',
          'articlePublisher',
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
          'twitterUrl',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('vox', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/vox' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.author).to.be.eql('Theodore Schleifer');
        expect(result.articlePublishedTime).to.be.eql('2020-06-11T17:03:32-04:00');
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/Vox');
        expect(result.articleModifiedTime).to.be.eql('2020-06-11T17:03:32-04:00');
        expect(result.ogDescription).to.be.eql('The Twitter CEO’s plan to give away $1 billion shows charity is not as hard as billionaires say it is.');
        expect(result.ogSiteName).to.be.eql('Vox');
        expect(result.ogDate).to.be.eql('2020-06-11T21:03:32');
        expect(result.ogTitle).to.be.eql('Inside Jack Dorsey’s radical experiment for billionaires to give away their money');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogUrl).to.be.eql('https://www.vox.com/recode/2020/6/11/21287395/jack-dorsey-start-small-billionaire-philanthropy-coronavirus-twitter-square-kaepernick-rihanna');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('Inside Jack Dorsey’s radical experiment for billionaires to give away their money');
        expect(result.twitterDescription).to.be.eql('The Twitter CEO’s plan to give away $1 billion shows charity is not as hard as billionaires say it is.');
        expect(result.twitterSite).to.be.eql('voxdotcom');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.twitterUrl).to.be.eql('https://www.vox.com/recode/2020/6/11/21287395/jack-dorsey-start-small-billionaire-philanthropy-coronavirus-twitter-square-kaepernick-rihanna');
        expect(result.ogImage).to.be.eql({
          url: 'https://cdn.vox-cdn.com/thumbor/PP5h21sGbjyDt0BoZYKpdNUsFFs=/0x0:4746x2485/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/20030444/524250960.jpg.jpg',
          width: '1200',
          height: '630',
          type: 'jpg',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://cdn.vox-cdn.com/thumbor/OR6JkRz2SCfX5Ecx6JSCVWk5vs0=/0x0:4746x2373/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/20030444/524250960.jpg.jpg',
          width: null,
          height: null,
          alt: 'Jack Dorsey Sydney Photo Shoot',
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/vox');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleModifiedTime',
          'articlePublishedTime',
          'articlePublisher',
          'author',
          'ogDate',
          'ogLocale',
          'ogDescription',
          'ogImage',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'charset',
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
  it('w3', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/w3' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('JSON-LD 1.0');
        expect(result.ogDate).to.be.eql('2014-01-16');
        expect(result.ogLocale).to.be.eql('en');
        expect(result.ogImage).to.be.eql([
          {
            url: 'linked-data-graph.png',
            width: null,
            height: null,
            type: 'png',
          },
        ]);
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/w3');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogDate',
          'ogImage',
          'ogTitle',
          'ogLocale',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
  it('xkcd', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/xkcd' })
      .then(function (data) {
        const { error, result, response } = data;
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('xkcd: Regular Expressions');
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/xkcd');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogTitle',
          'requestUrl',
          'success',
          'charset',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
  });
});
