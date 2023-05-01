import ogs from '../../index';

const util = require('util');
const ogsRequire = require('../../index');

describe('basic', function () {
  it('using promises should return valid data', function () {
    return ogsRequire({ url: 'https://ogp.me/' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Open Graph protocol');
      expect(result.ogType).to.be.eql('website');
      expect(result.ogUrl).to.be.eql('https://ogp.me/');
      expect(result.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
      expect(result.ogImage).to.be.eql([{
        url: 'https://ogp.me/logo.png',
        width: '300',
        height: '300',
        type: 'image/png',
      }]);
      expect(result.requestUrl).to.be.eql('https://ogp.me/');
      expect(result.charset).to.be.eql('utf-8');
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
      expect(response).to.be.an('Response');
    });
  });
  it('using await should return valid data', async function () {
    const { error, result, response } = await ogsRequire({ url: 'https://ogp.me/' });
    console.log('error:', error);
    console.log('result:', result);
    expect(error).to.be.eql(false);
    expect(result.ogTitle).to.be.eql('Open Graph protocol');
    expect(result.ogType).to.be.eql('website');
    expect(result.ogUrl).to.be.eql('https://ogp.me/');
    expect(result.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
    expect(result.ogImage).to.be.eql([{
      url: 'https://ogp.me/logo.png',
      width: '300',
      height: '300',
      type: 'image/png',
    }]);
    expect(result.requestUrl).to.be.eql('https://ogp.me/');
    expect(result.charset).to.be.eql('utf-8');
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
    expect(response).to.be.an('Response');
  });
  it('using callbackify should return valid data', function () {
    const ogsCallback = util.callbackify(ogsRequire);
    return ogsCallback({
      url: 'https://ogp.me/',
    }, function (error, response) {
      console.log('error:', response.error);
      console.log('result:', response.result);
      expect(response.error).to.be.eql(false);
      expect(response.result.ogTitle).to.be.eql('Open Graph protocol');
      expect(response.result.ogType).to.be.eql('website');
      expect(response.result.ogUrl).to.be.eql('https://ogp.me/');
      expect(response.result.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
      expect(response.result.ogImage).to.be.eql([{
        url: 'https://ogp.me/logo.png',
        width: '300',
        height: '300',
        type: 'image/png',
      }]);
      expect(response.result.requestUrl).to.be.eql('https://ogp.me/');
      expect(response.result.charset).to.be.eql('utf-8');
      expect(response.result.success).to.be.eql(true);
      expect(response.result).to.have.all.keys('ogTitle', 'ogType', 'ogUrl', 'ogDescription', 'ogImage', 'requestUrl', 'charset', 'success');
      expect(response.response).to.be.an('Response');
    });
  });
  it('using ogs import should still work', async function () {
    return ogs({ url: 'https://ogp.me/' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Open Graph protocol');
      expect(result.ogType).to.be.eql('website');
      expect(result.ogUrl).to.be.eql('https://ogp.me/');
      expect(result.ogDescription).to.be.eql('The Open Graph protocol enables any web page to become a rich object in a social graph.');
      expect(result.ogImage).to.be.eql([{
        url: 'https://ogp.me/logo.png',
        width: '300',
        height: '300',
        type: 'image/png',
      }]);
      expect(result.requestUrl).to.be.eql('https://ogp.me/');
      expect(result.charset).to.be.eql('utf-8');
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
      expect(response).to.be.an('Response');
    });
  });
  it('Test Name Cheap Page That Dose Not Have content-type=text/html - Should Return correct Open Graph Info', function () {
    return ogsRequire({ url: 'https://www.namecheap.com/' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.ogLocale).to.be.eql('en');
      expect(result.favicon).to.be.eql('https://www.namecheap.com/assets/img/nc-icon/favicon.ico');
      expect(result.ogUrl).to.be.eql('https://www.namecheap.com/');
      expect(result.ogTitle).to.be.eql('Buy a domain name - Register cheap domain names from $0.99 - Namecheap');
      expect(result.ogImage).to.be.an('array').and.to.not.be.empty;
      expect(result.requestUrl).to.be.eql('https://www.namecheap.com/');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'favicon',
        'ogTitle',
        'ogDescription',
        'ogImage',
        'ogLocale',
        'ogUrl',
        'requestUrl',
        'charset',
        'success',
      );
      expect(response).to.be.an('Response');
    });
  });
  it('vimeo.com should return open graph data', function () {
    return ogsRequire({ url: 'https://vimeo.com/232889838' }).then(function ({ error, result, response }) {
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
      expect(result.ogImage).to.be.eql([{
        url: 'https://i.vimeocdn.com/video/659221704-68d52ff1744d1c12605d1743d3ea6b031937d002d9373e5f6111a6aef986f3e5-d',
        width: '1280',
        height: '720',
        type: 'image/jpg',
      }]);
      // TODO: url keeps changing, this test case should move to static test suit
      // expect(result.ogVideo).to.be.eql([{
      //   url: 'https://player.vimeo.com/video/232889838',
      //   width: '1280',
      //   height: '720',
      //   type: 'text/html',
      // }]);
      expect(result.twitterImage).to.be.eql([{
        url: 'https://i.vimeocdn.com/video/659221704-68d52ff1744d1c12605d1743d3ea6b031937d002d9373e5f6111a6aef986f3e5-d',
      }]);
      // TODO: url keeps changing, this test case should move to static test suit
      // expect(result.twitterPlayer).to.be.eql([{
      //   url: 'https://player.vimeo.com/video/232889838',
      //   width: '1280',
      //   height: '720',
      // }]);
      expect(result.requestUrl).to.be.eql('https://vimeo.com/232889838');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'favicon',
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
      expect(response).to.be.an('Response');
    });
  });
  it('mozilla.org should return open graph data with one title', function () {
    return ogsRequire({ url: 'https://jshemas.github.io/openGraphScraperPages/mozilla' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogTitle).to.be.eql('Date.prototype.toLocaleString() - JavaScript | MDN');
      expect(result.ogLocale).to.be.eql('en-US');
      expect(result.ogUrl).to.be.eql('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString');
      expect(result.ogDate).to.be.eql('2022-10-31T06:22:03.000Z');
      expect(result.favicon).to.be.eql('/favicon-48x48.cbbd161b.png');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.ogImage).to.be.eql([{
        url: 'https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png',
        type: 'png',
      }]);
      expect(result.twitterCard).to.be.eql('summary_large_image');
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/mozilla');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'favicon',
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
      expect(response).to.be.an('Response');
    });
  });
});
