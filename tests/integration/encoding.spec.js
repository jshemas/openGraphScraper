const ogs = require('../../index');

describe('encoding', function () {
  context('should return correct Open Graph Info + charset info', function () {
    it('when charset is windows-1251', function () {
      return ogs({
        url: 'http://www.gazeta.ru/',
        encoding: null,
        withCharset: true,
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogDescription).to.be.eql('Главные новости дня из Москвы и регионов, информационная лента новостей, новости России и мира, события дня и последнего часа, аналитика, комментарии, видео.');
        expect(result.twitterDescription).to.be.eql('Главные новости дня из Москвы и регионов, информационная лента новостей, новости России и мира, события дня и последнего часа, аналитика, комментарии, видео.');
        expect(result.ogTitle).to.be.eql('Главные новости - Газета.Ru');
        expect(result.ogType).to.be.eql('website');
        expect(result.ogSiteName).to.be.eql('Газета.Ru');
        expect(result.ogLocale).to.be.eql('ru');
        expect(result.ogUrl).to.be.eql('https://www.gazeta.ru/');
        expect(result.ogDate).to.be.an('string').and.to.not.be.empty;
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterTitle).to.be.eql('Первая полоса');
        expect(result.twitterSite).to.be.eql('@gazetaru');
        expect(result.twitterCreator).to.be.eql('@gazetaru');
        expect(result.twitterAppNameiPhone).to.be.eql('Газета.Ru');
        expect(result.twitterAppIdiPhone).to.be.eql('401707326');
        expect(result.twitterAppUrliPhone).to.be.eql('https://www.gazeta.ru/');
        expect(result.twitterAppNameiPad).to.be.eql('Газета.Ru HD');
        expect(result.twitterAppIdiPad).to.be.eql('486481873');
        expect(result.twitterAppUrliPad).to.be.eql('https://www.gazeta.ru/');
        expect(result.twitterAppNameGooglePlay).to.be.eql('Газета.Ru');
        expect(result.twitterAppIdGooglePlay).to.be.eql('ru.ideast.gazeta');
        expect(result.twitterAppUrlGooglePlay).to.be.eql('https://www.gazeta.ru/');
        expect(result.twitterUrl).to.be.eql('https://www.gazeta.ru/');
        expect(result.ogImage).to.be.eql({
          url: 'https://www.gazeta.ru/nm2015/i/Logo_red_sqare_250.png',
          width: '250',
          height: '250',
          type: 'png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://www.gazeta.ru/nm2015/i/Logo_red_sqare_250.png',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.charset).to.be.eql('windows-1251');
        expect(result.requestUrl).to.be.eql('http://www.gazeta.ru/');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'charset',
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
        return expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('when charset is utf-8 - signanthealth', function () {
      return ogs({
        url: 'https://signanthealth.com/careers/',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogLocale).to.be.eql('en_US');
        expect(result.articleModifiedTime).to.be.eql('2020-05-14T14:04:23+00:00');
        expect(result.ogType).to.be.eql('article');
        expect(result.ogTitle).to.be.eql('Careers | Signant Health');
        expect(result.articlePublisher).to.be.eql('https://www.facebook.com/signanthealth/');
        expect(result.ogDescription).to.be.eql('If you’re looking to join an exciting and fast-paced organization, consider Signant Health. We offer rewarding personal and career advancement as well as competitive compensation and benefits.');
        expect(result.ogUrl).to.be.eql('https://www.signanthealth.com/company/careers/');
        expect(result.ogSiteName).to.be.eql('Signant Health');
        expect(result.twitterCard).to.be.eql('summary_large_image');
        expect(result.twitterCreator).to.be.eql('@SignantHealth');
        expect(result.twitterSite).to.be.eql('@SignantHealth');
        expect(result.requestUrl).to.be.eql('https://signanthealth.com/careers/');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'articleModifiedTime',
          'articlePublisher',
          'ogDescription',
          'ogLocale',
          'ogSiteName',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
          'twitterCard',
          'twitterCreator',
          'twitterSite',
        );
        return expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('when charset is utf-8 - ogp', function () {
      return ogs({
        url: 'http://ogp.me/',
        withCharset: true,
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
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
        expect(result.charset).to.be.eql('utf8');
        expect(result.requestUrl).to.be.eql('http://ogp.me/');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'charset',
          'ogDescription',
          'ogImage',
          'ogTitle',
          'ogType',
          'ogUrl',
          'requestUrl',
          'success',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('legacy no charset', function () {
      return ogs({
        url: 'https://jshemas.github.io/openGraphScraperPages/rakuten',
        encoding: null,
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(result.ogDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(result.ogUrl).to.be.eql('https://web.archive.org/web/20170913045814/https://www.rakuten.co.jp/');
        expect(result.ogLocale).to.be.eql('ja');
        expect(result.ogType).to.be.eql('website');
        expect(result.ogSiteName).to.be.eql('楽天市場');
        expect(result.twitterCard).to.be.eql('summary');
        expect(result.twitterSite).to.be.eql('@RakutenJP');
        expect(result.twitterTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(result.twitterDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(result.ogImage).to.be.eql({
          url: 'https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png',
          width: null,
          height: null,
          type: 'png',
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://r.r10s.jp/com/img/home/top/ogp.png',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/rakuten');
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
          'twitterCard',
          'twitterDescription',
          'twitterImage',
          'twitterSite',
          'twitterTitle',
        );
        expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('encoding not recognized', function () {
      return ogs({
        url: 'http://www.tnnbar.org.tw/',
        encoding: null,
        withCharset: true,
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('http://www.tnnbar.org.tw/');
        expect(result.error).to.eql("Encoding not recognized: 'zh_tw' (searched as: 'zhtw')");
        expect(result.errorDetails.toString()).to.eql("Error: Encoding not recognized: 'zh_tw' (searched as: 'zhtw')");
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        return expect(response).to.eql(undefined);
      });
    });
  });
});
