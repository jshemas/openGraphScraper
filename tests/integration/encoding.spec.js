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
        // sometimes we get ESOCKETTIMEDOUT errors, vars just try again
        if (error === true) {
          console.log('found error, trying agine');
          return ogs({
            url: 'http://www.gazeta.ru/',
            encoding: null,
            withCharset: true,
          // eslint-disable-next-line no-shadow
          }, function (error, result, response) {
            console.log('error:', error);
            console.log('result:', result);
            expect(error).to.be.eql(false);
            expect(result.ogDescription).to.be.eql('Главные новости дня из Москвы и регионов, информационная лента новостей, новости России и мира, события дня и последнего часа, аналитика, комментарии, видео.');
            expect(result.twitterDescription).to.be.eql('Главные новости дня из Москвы и регионов, информационная лента новостей, новости России и мира, события дня и последнего часа, аналитика, комментарии, видео.');
            expect(result.ogTitle).to.be.eql('Главные новости - Газета.Ru');
            expect(result.ogType).to.be.eql('website');
            expect(result.ogSiteName).to.be.eql('Газета.Ru');
            expect(result.ogUrl).to.be.eql('https://www.gazeta.ru/');
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
            expect(result.ogImage).to.be.eql({
              url: 'https://www.gazeta.ru/nm2015/i/Logo_red_sqare_250.png',
              width: '250',
              height: '250',
              type: null,
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
            return expect(response).to.be.an('object').and.to.not.be.empty;
          });
        }
        expect(error).to.be.eql(false);
        expect(result.ogDescription).to.be.eql('Главные новости дня из Москвы и регионов, информационная лента новостей, новости России и мира, события дня и последнего часа, аналитика, комментарии, видео.');
        expect(result.twitterDescription).to.be.eql('Главные новости дня из Москвы и регионов, информационная лента новостей, новости России и мира, события дня и последнего часа, аналитика, комментарии, видео.');
        expect(result.ogTitle).to.be.eql('Главные новости - Газета.Ru');
        expect(result.ogType).to.be.eql('website');
        expect(result.ogSiteName).to.be.eql('Газета.Ru');
        expect(result.ogUrl).to.be.eql('https://www.gazeta.ru/');
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
        expect(result.ogImage).to.be.eql({
          url: 'https://www.gazeta.ru/nm2015/i/Logo_red_sqare_250.png',
          width: '250',
          height: '250',
          type: null,
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
        return expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('when charset is utf-8', function () {
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
          type: null,
        });
        expect(result.twitterImage).to.be.eql({
          url: 'https://r.r10s.jp/com/img/home/top/ogp.png',
          width: null,
          height: null,
          alt: null,
        });
        expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/rakuten');
        expect(result.success).to.be.eql(true);
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
        // sometimes we get ESOCKETTIMEDOUT errors, vars just try again
        if (error === false) {
          console.log('error not found, trying again');
          return ogs({
            url: 'http://www.tnnbar.org.tw/',
            encoding: null,
            withCharset: true,
          // eslint-disable-next-line no-shadow
          }, function (error, result, response) {
            console.log('error:', error);
            console.log('result:', result);
            expect(error).to.be.eql(true);
            expect(result.success).to.be.eql(false);
            expect(result.requestUrl).to.be.eql('http://www.tnnbar.org.tw/');
            expect(result.error).to.eql("Encoding not recognized: 'zh_tw' (searched as: 'zhtw')");
            expect(result.errorDetails.toString()).to.eql("Error: Encoding not recognized: 'zh_tw' (searched as: 'zhtw')");
            return expect(response).to.eql(undefined);
          });
        }
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('http://www.tnnbar.org.tw/');
        expect(result.error).to.eql("Encoding not recognized: 'zh_tw' (searched as: 'zhtw')");
        expect(result.errorDetails.toString()).to.eql("Error: Encoding not recognized: 'zh_tw' (searched as: 'zhtw')");
        return expect(response).to.eql(undefined);
      });
    });
  });
});
