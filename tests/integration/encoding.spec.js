const ogs = require('../../index');

describe('encoding', function () {
  context('should return correct Open Graph Info + charset info', function () {
    it('when charset is windows-1251', function () {
      this.timeout(30000);
      return ogs({
        url: 'http://www.gazeta.ru/',
        timeout: 30000,
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
        expect(result.charset).to.be.eql('windows-1251');
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
        expect(result.articleModifiedTime).to.be.eql('2020-07-13T18:21:57+00:00');
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
        expect(result.charset).to.be.eql('utf8');
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
          'charset',
          'twitterCard',
          'twitterCreator',
          'twitterSite',
        );
        return expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
    it('when charset is utf-8 - ogp', function () {
      return ogs({
        url: 'https://ogp.me/',
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('Open Graph protocol');
        expect(result.ogType).to.be.eql('website');
        expect(result.ogUrl).to.be.eql('https://ogp.me/');
        expect(result.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
        expect(result.ogImage).to.be.eql({
          url: 'https://ogp.me/logo.png',
          width: '300',
          height: '300',
          type: 'image/png',
        });
        expect(result.charset).to.be.eql('utf8');
        expect(result.requestUrl).to.be.eql('https://ogp.me/');
        expect(result.charset).to.be.eql('utf8');
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
    // TODO: should find a new use case that always resultes in this failing
    it('encoding not recognized', function () {
      this.timeout(30000);
      return ogs({
        url: 'http://www.tnnbar.org.tw/',
        timeout: 30000,
      }, function (error, result, response) {
        console.log('error:', error);
        console.log('result:', result);
        if (error) {
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
            'charset',
          );
          return expect(response).to.eql(undefined);
        }
        expect(error).to.be.eql(false);
        expect(result.ogTitle).to.be.eql('台南律師公會');
        expect(result.ogImage.length).to.be.eql(3);
        expect(result.ogLocale).to.be.eql('zh-TW');
        expect(result.charset).to.be.eql('utf8');
        expect(result.requestUrl).to.be.eql('http://www.tnnbar.org.tw/');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'charset',
          'ogImage',
          'ogLocale',
          'ogTitle',
          'requestUrl',
          'success',
        );
        return expect(response).to.be.an('object').and.to.not.be.empty;
      });
    });
  });
  context('static websites', function () {
    it('360', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/360' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('360直击恶意软件“虎穴狼巢”，再爆大型非法获取隐私事件-安全资讯-360官网');
          expect(result.ogImage).to.be.eql([
            {
              url: 'https://p2.ssl.qhimg.com/t010b24b058c4437785.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'https://p2.ssl.qhimg.com/t01b807e29a3b0c7153.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'https://p2.ssl.qhimg.com/t018cc20cb079beab73.png',
              width: null,
              height: null,
              type: 'png',
            },
          ]);
          expect(result.ogLocale).to.be.eql('zh-cmn-Hans');
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/360');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogImage',
            'ogLocale',
            'ogTitle',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('aliexpress', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/aliexpress' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.alAndroidUrl).to.be.eql('aliexpress://product/detail?productId=32993251330&fbsrc=fbapplink_www_detail_android&sk=&aff_platform=&aff_trace_key=&af=&cv=&cn=&dp=');
          expect(result.alAndroidPackage).to.be.eql('com.alibaba.aliexpresshd');
          expect(result.alAndroidAppName).to.be.eql('AliExpress');
          expect(result.alIphoneUrl).to.be.eql('aliexpress://product/detail?productId=32993251330&fbsrc=fbapplink_www_detail_ios&sk=&aff_platform=&aff_trace_key=&af=&cv=&cn=&dp=');
          expect(result.alIphoneAppStoreId).to.be.eql('436672029');
          expect(result.alIphoneAppName).to.be.eql('AliExpress');
          expect(result.ogUrl).to.be.eql('//he.aliexpress.com/item/32993251330.html?src=ibdm_d03p0558e02r02&sk=&aff_platform=&aff_trace_key=&af=&cv=&cn=&dp=');
          expect(result.ogTitle).to.be.eql("€97.39 40% OFF|מקורי Apple iPhone SE סמארטפון נייד טלפון A9 Dual Core 2GB RAM 16/64GB ROM 4.0 ''12MP טביעות אצבע 4G LTE Smartphone|טלפונים ניידים|   - AliExpress");
          expect(result.ogType).to.be.eql('product');
          expect(result.ogDescription).to.be.eql('Smarter Shopping, Better Living!  Aliexpress.com');
          expect(result.ogSiteName).to.be.eql('aliexpress.com');
          expect(result.ogImage).to.be.eql({
            url: 'https://ae01.alicdn.com/kf/HTB1.DiLM7voK1RjSZFDq6xY3pXam/Apple-iPhone-SE-A9-Dual-Core-2GB-RAM-16.jpg',
            width: null,
            height: null,
            type: 'jpg',
          });
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/aliexpress');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'alAndroidAppName',
            'alAndroidPackage',
            'alAndroidUrl',
            'alIphoneAppName',
            'alIphoneAppStoreId',
            'alIphoneUrl',
            'charset',
            'ogDescription',
            'ogImage',
            'ogSiteName',
            'ogTitle',
            'ogType',
            'ogUrl',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('baidu', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/baidu' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('哈佛和麻省理工起诉特朗普政府_百度搜索');
          expect(result.ogImage).to.be.eql([
            {
              url: 'https://dss0.bdstatic.com/9bA1vGfa2gU2pMbfm9GUKT-w/timg?wisealaddin&sec=1594256156&di=864c7c75c9b283e42186dec20390fbc6&quality=60&size=8&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F9da74a517eb1befeba93a5f3167cc74b.jpeg',
              width: null,
              height: null,
              type: 'jpeg',
            },
            {
              url: 'https://vdposter.bdstatic.com/5b2d214a87da29772dec1f678f5b92c4.jpeg?x-bce-process=image/resize,m_fill,w_242,h_182/format,f_jpg/quality,Q_100',
              width: null,
              height: null,
              type: 'jpeg',
            },
            {
              url: 'https://vdposter.bdstatic.com/00647e856517ca0eb83edc7e03be6979.jpeg?x-bce-process=image/resize,m_fill,w_242,h_182/format,f_jpg/quality,Q_100',
              width: null,
              height: null,
              type: 'jpeg',
            },
            {
              url: 'https://vdposter.bdstatic.com/b967288928873cb870969b5589056e20.jpeg?x-bce-process=image/resize,m_fill,w_242,h_182/format,f_jpg/quality,Q_100',
              width: null,
              height: null,
              type: 'jpeg',
            },
            {
              url: 'https://vdposter.bdstatic.com/c128c54635383c10f0c7a3af756bc3d3.jpeg?x-bce-process=image/resize,m_fill,w_242,h_182/format,f_jpg/quality,Q_100',
              width: null,
              height: null,
              type: 'jpeg',
            },
            {
              url: 'https://cambrian-images.cdn.bcebos.com/a8e0f1d50bdbb152d681a49f43a85a28_1530519716895.jpeg',
              width: null,
              height: null,
              type: 'jpeg',
            },
            {
              url: 'https://timg01.bdimg.com/timg?pacompress=&imgtype=0&sec=1439619614&di=f459a48fec76e6e11a24246e3e8543f7&quality=90&size=b870_10000&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F81ba6ae0f76179306351cf6e634c5c2c.jpeg',
              width: null,
              height: null,
              type: 'jpeg',
            },
          ]);
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/baidu');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogImage',
            'ogTitle',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('csdn', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/csdn' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('周末学会了 10个超级实用 Javascript 技巧!_前端小智-CSDN博客');
          expect(result.ogDescription).to.be.eql('众所周知，JavaScript 一直在快速变化。在新的 ES2020 中，有很多很棒的特性，我们大都已经迫不及待尝试了。老实说，有时我们可以用不同角度来编写代码，同样也能达到相同的效果，...');
          expect(result.ogImage.length).to.be.eql(83);
          expect(result.ogLocale).to.be.eql('zh-CN');
          expect(result.ogUrl).to.be.eql('https://blog.csdn.net/qq449245884/article/details/107096460');
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/csdn');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogDescription',
            'ogImage',
            'ogLocale',
            'ogTitle',
            'ogUrl',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('naver', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/naver' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('자동차 열선시트도 정기 구독 서비스가 나온다?');
          expect(result.ogDescription).to.be.eql('구독 경제 확산 물결에 자동차 업체가 눈독을 들이고 있다. 지금껏 있던 차량 리스 서비스가 아니다. 차 구...');
          expect(result.ogUrl).to.be.eql('https://blog.naver.com/tech-plus/222023708961');
          expect(result.ogType).to.be.eql('article');
          expect(result.ogArticleAuthor).to.be.eql('네이버 블로그 | 테크플러스');
          expect(result.ogSiteName).to.be.eql('네이버 블로그 | 테크플러스');
          expect(result.ogImage).to.be.eql({
            url: 'https://blogthumb.pstatic.net/MjAyMDA3MDdfMjIy/MDAxNTk0MDk5Mzg0OTI2.metaMYBdIy6ous31SXPcVWc9ytV9ASYC2YOBu0gA2Pgg.VwcdwSyJ8tO_BHK95P8MsVb0pdiFtZqgRlbg2pkUXb4g.JPEG.tech-plus/245_2947.ct.655.336.jpg?type=w2',
            width: null,
            height: null,
            type: 'jpg',
          });
          expect(result.ogLocale).to.be.eql('ko');
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/naver');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogArticleAuthor',
            'ogDescription',
            'ogImage',
            'ogLocale',
            'ogSiteName',
            'ogTitle',
            'ogType',
            'ogUrl',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('okezone', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/okezone' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.author).to.be.eql('Okezone');
          expect(result.articleAuthor).to.be.eql('https://www.facebook.com/OkezoneCom');
          expect(result.articlePublisher).to.be.eql('https://www.facebook.com/OkezoneCom');
          expect(result.ogType).to.be.eql('article');
          expect(result.ogSiteName).to.be.eql('https://economy.okezone.com/');
          expect(result.ogTitle).to.be.eql('6 Rekomendasi Bisnis dengan Tingkat Kerugian Kecil, Tertarik Mencoba? : Okezone Economy');
          expect(result.ogUrl).to.be.eql('https://economy.okezone.com/read/2020/07/08/320/2243366/6-rekomendasi-bisnis-dengan-tingkat-kerugian-kecil-tertarik-mencoba');
          expect(result.ogDescription).to.be.eql('Makanan merupakan kebutuhan penting untuk seluruh individu Usaha ini mempunyai potensi besar untuk mendapatkan penghasilan - Sektor Riil - okezone economy');
          expect(result.twitterCard).to.be.eql('summary_large_image');
          expect(result.twitterSite).to.be.eql('@okezonenews');
          expect(result.twitterTitle).to.be.eql('6 Rekomendasi Bisnis dengan Tingkat Kerugian Kecil, Tertarik Mencoba? : Okezone Economy');
          expect(result.twitterDescription).to.be.eql('Makanan merupakan kebutuhan penting untuk seluruh individu Usaha ini mempunyai potensi besar untuk mendapatkan penghasilan - Sektor Riil - okezone economy');
          expect(result.twitterCreator).to.be.eql('@okezonenews');
          expect(result.twitterUrl).to.be.eql('https://economy.okezone.com/read/2020/07/08/320/2243366/6-rekomendasi-bisnis-dengan-tingkat-kerugian-kecil-tertarik-mencoba');
          expect(result.articleSection).to.be.eql('Economy');
          expect(result.articlePublishedTime).to.be.eql('2020-07-09T07:26:05+07:00');
          expect(result.ogImage).to.be.eql({
            url: 'https://img.okezone.com/content/2020/07/08/320/2243366/6-rekomendasi-bisnis-dengan-tingkat-kerugian-kecil-tertarik-mencoba-p7VgY90ykv.jpg',
            width: '600',
            height: '315',
            type: 'jpg',
          });
          expect(result.twitterImage).to.be.eql({
            url: 'https://img.okezone.com/content/2020/07/08/320/2243366/6-rekomendasi-bisnis-dengan-tingkat-kerugian-kecil-tertarik-mencoba-p7VgY90ykv.jpg',
            width: null,
            height: null,
            alt: null,
          });
          expect(result.ogLocale).to.be.eql('id-ID');
          expect(result.ogDate).to.be.eql('2014-07-13T20:07:27.8200000');
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/okezone');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'articleAuthor',
            'articlePublishedTime',
            'articlePublisher',
            'articleSection',
            'author',
            'charset',
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
    it('qq', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/qq' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('烧警车、闯议会、要求总统辞职，塞尔维亚宵禁引发十年最大规模抗议_腾讯新闻');
          expect(result.ogDescription).to.be.eql('东方网·纵相新闻记者单珊随着疫情反弹，塞尔维亚首都再次实施宵禁，但这一举措似乎并不被部分国民理解。据路透社7月8日报道，7日夜间，塞尔维亚首都贝尔格莱德市中心暴发大规模骚乱。抗议者向警察投掷照明弹……');
          expect(result.ogLocale).to.be.eql('zh-CN');
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/qq');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogDescription',
            'ogLocale',
            'ogTitle',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('sohu', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/sohu' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('搜狐');
          expect(result.ogImage.length).to.be.eql(43);
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/sohu');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogImage',
            'ogTitle',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('taobao', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/taobao' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('乳白亚克力外壳 60%键盘外壳 poker外壳无加强筋底壳透光外壳-淘宝网');
          expect(result.ogDescription).to.be.eql('欢迎前来淘宝网实力旺铺，选购乳白亚克力外壳 60%键盘外壳 poker外壳无加强筋底壳透光外壳,想了解更多乳白亚克力外壳 60%键盘外壳 poker外壳无加强筋底壳透光外壳，请进入paipailaji的怡科外设KBDfans实力旺铺，更多商品任你选购');
          expect(result.ogImage).to.be.eql([
            {
              url: 'https://gd3.alicdn.com/imgextra/i3/134583372/TB2eWJ.h1OSBuNjy0FdXXbDnVXa_!!134583372.jpg_400x400.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'http://img.alicdn.com/bao/uploaded/O1CN01L4mliz1amQ8K69BqC_!!134583372.jpg_80x80.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'http://img.alicdn.com/bao/uploaded/O1CN01lhmMOl1amQ6zed9Sv_!!0-item_pic.jpg_80x80.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'https://gd4.alicdn.com/imgextra/i4/134583372/TB2bje8gS_I8KJjy0FoXXaFnVXa_!!134583372.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'https://gd3.alicdn.com/imgextra/i3/134583372/TB2eWJ.h1OSBuNjy0FdXXbDnVXa_!!134583372.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'https://gd4.alicdn.com/imgextra/i4/134583372/TB2bje8gS_I8KJjy0FoXXaFnVXa_!!134583372.jpg_400x400.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'https://gd4.alicdn.com/imgextra/i4/134583372/TB2bje8gS_I8KJjy0FoXXaFnVXa_!!134583372.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
          ]);
          expect(result.ogUrl).to.be.eql('https://item.taobao.com/item.htm?id=562283240178');
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/taobao');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogDescription',
            'ogImage',
            'ogTitle',
            'ogUrl',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('tmall', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/tmall' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('【官网价直降】Apple/苹果 iPhone 11 4G全网通智能手机正品苏宁易购官方旗舰店苹果11-tmall.com天猫');
          expect(result.ogDescription).to.be.eql('欢迎前来淘宝网实力旺铺，选购【官网价直降】Apple/苹果 iPhone 11 4G全网通智能手机正品苏宁易购官方旗舰店苹果11,想了解详情【官网价直降】Apple/苹果 iPhone 11 4G全网通智能手机正品苏宁易购官方旗舰店苹果11，请进入苏宁易购官方旗舰店的苏宁易购官方旗舰店实力旺铺，更多商品任你选购');
          expect(result.ogImage).to.be.eql([
            {
              url: 'https://img.alicdn.com/imgextra/i3/2616970884/O1CN01TOc9jZ1IOujNdnN64_!!2616970884.jpg_430x430q90.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'https://img.alicdn.com/imgextra/i3/2616970884/O1CN01TOc9jZ1IOujNdnN64_!!2616970884.jpg_q30.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'https://img.alicdn.com/imgextra/i3/2616970884/O1CN01TOc9jZ1IOujNdnN64_!!2616970884.jpg_430x430q90.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
          ]);
          expect(result.ogUrl).to.be.eql('https://detail.tmall.com/item.htm?id=605258110430');
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/tmall');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogDescription',
            'ogImage',
            'ogTitle',
            'ogUrl',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('weibo', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/weibo' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('得州883家幼儿园染疫 华盛顿大学中招... 来自美国侨报网 - 微博');
          expect(result.ogDescription).to.be.eql('【得州883家幼儿园染疫 华盛顿大学“中招”】新冠肺炎疫情下，家长们担心把孩子送回校园是否安全。在得克萨斯州，托儿所的确诊病例增长速度明显变快了，据官方统计，该州有883家托儿所出现了新冠肺炎病例，441名儿...');
          expect(result.ogImage.length).to.be.eql(14);
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/weibo');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogDescription',
            'ogImage',
            'ogTitle',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('xinhuanet', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/xinhuanet' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('\n中共中央办公厅转发《中央宣传部、中央组织部关于认真组织学习〈习近平谈治国理政〉第三卷的通知》-新华网\n');
          expect(result.ogDescription).to.be.eql('中共中央办公厅转发《中央宣传部、中央组织部关于认真组织学习〈习近平谈治国理政〉第三卷的通知》\n---近日，中共中央办公厅转发了《中央宣传部、中央组织部关于认真组织学习〈习近平谈治国理政〉第三卷的通知》，并发出通知，要求各地区各部门结合实际认真贯彻落实。');
          expect(result.ogImage).to.be.eql([
            {
              url: 'http://www.newsimg.cn/xl2017/images/net_logo.png',
              width: null,
              height: null,
              type: 'png',
            },
            {
              url: 'http://www.newsimg.cn/xl2017/images/wx.png',
              width: null,
              height: null,
              type: 'png',
            },
            {
              url: 'http://www.xinhuanet.com/politics/2020-07/08/ewm_11262129661n.jpg',
              width: null,
              height: null,
              type: 'jpg',
            },
            {
              url: 'http://www.xinhuanet.com/images/syicon/space.gif',
              width: '24',
              height: '24',
              type: 'gif',
            },
            {
              url: 'http://www.newsimg.cn/xl2017/images/wx.png',
              width: null,
              height: null,
              type: 'png',
            },
            {
              url: 'http://www.newsimg.cn/common/share/logo4share.jpg',
              width: '300',
              height: '300',
              type: 'jpg',
            },
          ]);
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/xinhuanet');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogDescription',
            'ogImage',
            'ogTitle',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
    it('zhanqi', function () {
      return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/zhanqi' })
        .then(function (data) {
          const { error, result, response } = data;
          console.log('error:', error);
          console.log('result:', result);
          expect(error).to.be.eql(false);
          expect(result.ogTitle).to.be.eql('Qq0517_UkzUkw的英雄联盟直播间_Qq0517_UkzUkw视频_游戏直播 - zhanqi.tv');
          expect(result.ogImage.length).to.be.eql(33);
          expect(result.charset).to.be.eql('utf8');
          expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/zhanqi');
          expect(result.success).to.be.eql(true);
          expect(result).to.have.all.keys(
            'charset',
            'ogImage',
            'ogTitle',
            'requestUrl',
            'success',
          );
          expect(response).to.be.an('object').and.to.not.be.empty;
        });
    });
  });
});
