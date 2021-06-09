const ogs = require('../../index');

describe('basic', function () {
  it('using callbacks should return valid data', function () {
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
      expect(result.requestUrl).to.be.eql('https://ogp.me/');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys('ogTitle', 'ogType', 'ogUrl', 'ogDescription', 'ogImage', 'requestUrl', 'charset', 'success');
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('using promises should return valid data', function () {
    return ogs({ url: 'https://ogp.me/' })
      .then(function (data) {
        const { error, result, response } = data;
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
        expect(result.requestUrl).to.be.eql('https://ogp.me/');
        expect(result.charset).to.be.eql('utf8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'ogTitle',
          'ogType',
          'ogUrl',
          'ogDescription',
          'ogImage',
          'requestUrl',
          'charset',
          'success',
        );
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
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogUrl).to.be.eql('https://www.namecheap.com/');
      expect(result.ogTitle).to.be.eql('Buy a domain name - Register cheap domain names from $0.99 - Namecheap');
      expect(result.ogDescription).to.be.eql('Register domain names at Namecheap. Buy cheap domain names and enjoy 24/7 support. With over 13 million domains under management, you know you’re in good hands.');
      expect(result.ogImage).to.be.an('array').and.to.not.be.empty;
      expect(result.requestUrl).to.be.eql('https://www.namecheap.com/');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'ogTitle',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogUrl',
        'requestUrl',
        'charset',
        'success',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('vimeo.com should return open graph data', function () {
    return ogs({
      url: 'https://vimeo.com/232889838',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alAndroidAppName).to.be.eql('Vimeo');
      expect(result.alAndroidPackage).to.be.eql('com.vimeo.android.videoapp');
      expect(result.alAndroidUrl).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.alIosAppName).to.be.eql('Vimeo');
      expect(result.alIosAppStoreId).to.be.eql('425194759');
      expect(result.alIosUrl).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.alWebShouldFallback).to.be.eql('true');
      expect(result.ogSiteName).to.be.eql('Vimeo');
      expect(result.ogUrl).to.be.eql('https://vimeo.com/232889838');
      expect(result.ogType).to.be.eql('video.other');
      expect(result.ogTitle).to.be.eql('Heroin');
      expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.twitterCard).to.be.eql('player');
      expect(result.twitterSite).to.be.eql('@vimeo');
      expect(result.twitterTitle).to.be.eql('Heroin');
      expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.twitterAppNameiPhone).to.be.eql('Vimeo');
      expect(result.twitterAppIdiPhone).to.be.eql('425194759');
      expect(result.twitterAppUrliPhone).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.twitterAppNameiPad).to.be.eql('Vimeo');
      expect(result.twitterAppIdiPad).to.be.eql('425194759');
      expect(result.twitterAppUrliPad).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.twitterAppNameGooglePlay).to.be.eql('Vimeo');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.vimeo.android.videoapp');
      expect(result.twitterAppUrlGooglePlay).to.be.eql('vimeo://app.vimeo.com/videos/232889838');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogImage).to.be.eql({
        url: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F659221704_1280x720&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png',
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
        url: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F659221704_1280x720&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png',
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
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'alAndroidAppName',
        'alAndroidPackage',
        'alAndroidUrl',
        'alIosAppName',
        'alIosAppStoreId',
        'alIosUrl',
        'alWebShouldFallback',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogSiteName',
        'ogTitle',
        'ogType',
        'ogUrl',
        'ogVideo',
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
        'twitterPlayer',
        'twitterSite',
        'twitterTitle',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('mozilla.org should return open graph data with one title', function () {
    return ogs({
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Date.prototype.toLocaleString() - JavaScript | MDN');
      expect(result.ogLocale).to.be.eql('en-US');
      expect(result.ogUrl).to.be.eql('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString');
      expect(result.ogDate).to.be.eql('2021-05-05T10:31:52.000Z');
      expect(result.charset).to.be.eql('utf8');
      expect(result.ogImage).to.be.eql({
        url: 'https://developer.mozilla.org/mdn-social-share.2f09512a.png',
        width: null,
        height: null,
        type: 'png',
      });
      expect(result.twitterCard).to.be.eql('summary_large_image');
      expect(result.requestUrl).to.be.eql('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'charset',
        'ogDate',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogTitle',
        'ogUrl',
        'requestUrl',
        'success',
        'twitterCard',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('tiktok.com should return open graph data', function () {
    return ogs({
      url: 'https://vt.tiktok.com/ZSJ9GXELc/',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      console.log('response', response.body);
      expect(error).to.be.eql(false);
      expect(result.ogSiteName).to.be.eql('TikTok');
      expect(result.twitterSite).to.be.eql('TikTok');
      expect(result.twitterCard).to.be.eql('summary');
      expect(result.ogUrl).to.be.eql('https://t.tiktok.com/i18n/share/video/6970730555012812033/?_r=1');
      expect(result.ogType).to.be.eql('website');
      expect(result.ogTitle).to.be.eql('TikTok의 Canart');
      expect(result.ogDescription).to.be.eql('진짜 이건 만드는 법 더이상 쉽게 만드는 법 하면 뇌절이라서 올려요 다같이 만들어서 친구에게 자랑합시다 #캔 #캔아트 #추천 #추천떠라 #추천좀 #추천추천 #추천떠랑 #추천뜨게해주세요 #추천안뜨면삐짐 #고2 #04 #손기술 #편의점 #토레타 #광고였으면좋겠다');
      expect(result.twitterTitle).to.be.eql('TikTok의 Canart');
      expect(result.twitterDescription).to.be.eql('진짜 이건 만드는 법 더이상 쉽게 만드는 법 하면 뇌절이라서 올려요 다같이 만들어서 친구에게 자랑합시다 #캔 #캔아트 #추천 #추천떠라 #추천좀 #추천추천 #추천떠랑 #추천뜨게해주세요 #추천안뜨면삐짐 #고2 #04 #손기술 #편의점 #토레타 #광고였으면좋겠다');
      expect(result.alIosUrl).to.be.eql('snssdk1233://aweme/detail/6970730555012812033?refer=facebook&_d=secCgYIASAHKAESMgowOF60jLVp1ZIxMhyBheaGq00aFZaMQFI3s%2B9x9QJxwg5hXYEX9AapajtdxeejPJDkGgA%3D&checksum=87eb4e60a45d45f5ea4b80d8c7f64d04c4a3a3e3585d1e85e8651978c7262c1d&language=ko&mid=6819019962259081218&preview_pb=0&region=KR&sec_user_id=MS4wLjABAAAAtzvBHtjXm-tPQMOgilr8RWGrBVAgXGP_Io2yVF-B_FnLba1x__i2rP-zVAcyXNya&share_app_id=1180&share_item_id=6970730555012812033&share_link_id=A65F51C4-9691-4B73-AD65-69CA290480E9&source=h5_t&timestamp=1623141698&tt_from=copy&u_code=d3ffh7fhif419b&user_id=6633161343988285442&utm_campaign=client_share&utm_medium=ios&utm_source=copy');
      expect(result.alAndroidUrl).to.be.eql('snssdk1233://aweme/detail/6970730555012812033?refer=facebook&_d=secCgYIASAHKAESMgowOF60jLVp1ZIxMhyBheaGq00aFZaMQFI3s%2B9x9QJxwg5hXYEX9AapajtdxeejPJDkGgA%3D&checksum=87eb4e60a45d45f5ea4b80d8c7f64d04c4a3a3e3585d1e85e8651978c7262c1d&language=ko&mid=6819019962259081218&preview_pb=0&region=KR&sec_user_id=MS4wLjABAAAAtzvBHtjXm-tPQMOgilr8RWGrBVAgXGP_Io2yVF-B_FnLba1x__i2rP-zVAcyXNya&share_app_id=1180&share_item_id=6970730555012812033&share_link_id=A65F51C4-9691-4B73-AD65-69CA290480E9&source=h5_t&timestamp=1623141698&tt_from=copy&u_code=d3ffh7fhif419b&user_id=6633161343988285442&utm_campaign=client_share&utm_medium=ios&utm_source=copy');
      expect(result.alIosAppStoreId).to.be.eql('835599320');
      expect(result.alIosAppName).to.be.eql('musical.ly');
      expect(result.alAndroidAppName).to.be.eql('musical.ly');
      expect(result.alAndroidPackage).to.be.eql('com.zhiliaoapp.musically');
      expect(result.ogImage).to.be.eql({
        url: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/f37b9343e8054c33802fcb9a8c0f15e6_1622999687~tplv-tiktok-play2.jpeg?x-expires=1623222000&x-signature=TcSyY5dL2bL5y327WSrwGl2Ektg%3D',
        width: '576',
        height: '1024',
        type: 'jpeg',
      });
      expect(result.twitterImage).to.be.eql({
        url: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/f37b9343e8054c33802fcb9a8c0f15e6_1622999687~tplv-tiktok-play2.jpeg?x-expires=1623222000&x-signature=TcSyY5dL2bL5y327WSrwGl2Ektg%3D',
        width: null,
        height: null,
        alt: null,
      });
      expect(result.charset).to.be.eql('utf8');
      expect(result.requestUrl).to.be.eql('https://vt.tiktok.com/ZSJ9GXELc/');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'alAndroidAppName',
        'alAndroidPackage',
        'alAndroidUrl',
        'alIosAppName',
        'alIosAppStoreId',
        'alIosUrl',
        'charset',
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
        'twitterSite',
        'twitterTitle',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
});
