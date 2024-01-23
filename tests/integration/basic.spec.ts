import { expect } from 'chai';
import util from 'util';

import ogs from '../../index';

const ogsRequire = require('../../index');

// for http debugging
// import diagnosticsChannel from 'diagnostics_channel'
// diagnosticsChannel.channel('undici:request:create').subscribe(({ request }) => {
//   console.log('origin:', request.origin);
//   console.log('completed:', request.completed);
//   console.log('method:', request.method);
//   console.log('path:', request.path);
//   console.log('headers:', request.headers);
// });

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
  it('Test README.md using the default Accept: text/html header - Should Return correct Open Graph Info', function () {
    return ogsRequire({ url: 'https://github.com/jshemas/openGraphScraper/blob/master/README.md' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.twitterSite).to.be.eql('@github');
      expect(result.twitterCard).to.be.eql('summary_large_image');
      expect(result.twitterTitle).to.be.eql('openGraphScraper/README.md at master · jshemas/openGraphScraper');
      expect(result.twitterDescription).to.be.eql('Node.js scraper service for Open Graph Info and More! - jshemas/openGraphScraper');
      expect(result.ogSiteName).to.be.eql('GitHub');
      expect(result.ogType).to.be.eql('object');
      expect(result.ogTitle).to.be.eql('openGraphScraper/README.md at master · jshemas/openGraphScraper');
      expect(result.ogUrl).to.be.eql('https://github.com/jshemas/openGraphScraper/blob/master/README.md');
      expect(result.ogDescription).to.be.eql('Node.js scraper service for Open Graph Info and More! - jshemas/openGraphScraper');
      expect(result.ogImage).to.be.eql([
        {
          height: '600',
          url: 'https://opengraph.githubassets.com/ffa796e90601a7e9f9c5221fd03c4d7d698e400f83a580c0d4a52b6844148f57/jshemas/openGraphScraper',
          width: '1200',
        },
      ]);
      expect(result.twitterImage).to.be.eql([
        {
          url: 'https://opengraph.githubassets.com/ffa796e90601a7e9f9c5221fd03c4d7d698e400f83a580c0d4a52b6844148f57/jshemas/openGraphScraper',
        },
      ]);
      expect(result.ogLocale).to.be.eql('en');
      expect(result.favicon).to.be.eql('https://github.githubassets.com/favicons/favicon.svg');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.requestUrl).to.be.eql('https://github.com/jshemas/openGraphScraper/blob/master/README.md');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'charset',
        'favicon',
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
        'twitterDescription',
        'twitterImage',
        'twitterSite',
        'twitterTitle',
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
        height: '720',
        type: 'image/webp',
        url: 'https://i.vimeocdn.com/video/659221704-68d52ff1744d1c12605d1743d3ea6b031937d002d9373e5f6111a6aef986f3e5-d?f=webp',
        width: '1280',
      }]);
      // TODO: url keeps changing, this test case should move to static test suit
      // expect(result.ogVideo).to.be.eql([{
      //   url: 'https://player.vimeo.com/video/232889838',
      //   width: '1280',
      //   height: '720',
      //   type: 'text/html',
      // }]);
      expect(result.twitterImage).to.be.eql([{
        url: 'https://i.vimeocdn.com/video/659221704-68d52ff1744d1c12605d1743d3ea6b031937d002d9373e5f6111a6aef986f3e5-d?f=webp',
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
  it('facebook - testing cors mode - header origin should default to url', function () {
    return ogs({ url: 'https://www.facebook.com/' })
      .then(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.favicon).to.be.eql('https://static.xx.fbcdn.net/rsrc.php/yv/r/B8BxsscfVBr.ico');
        expect(result.ogSiteName).to.be.eql('Facebook');
        expect(result.ogUrl).to.be.eql('https://www.facebook.com/');
        // this is fail in the github CI since these tests can run any where
        // expect(result.ogLocale).to.be.eql('en_US');
        expect(result.ogImage).to.be.eql([{
          url: 'https://www.facebook.com/images/fb_icon_325x325.png',
          type: 'png',
        }]);
        expect(result.ogTitle).to.be.eql('Facebook - log in or sign up');
        expect(result.ogDescription).to.be.eql('Log into Facebook to start sharing and connecting with your friends, family, and people you know.');
        expect(result.requestUrl).to.be.eql('https://www.facebook.com/');
        expect(result.charset).to.be.eql('utf-8');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'favicon',
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
        expect(response).to.be.an('Response');
      });
  });
  // this test works locally but fails during the github CI
  it('congress.gov - should return og data', function () {
    return ogs({ url: 'https://www.congress.gov/bill/117th-congress/house-bill/2617/text' })
      .then(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(false);
        expect(result.dcCoverage).to.be.eql('2021-04-16');
        expect(result.dcCreator).to.be.eql('Rep. Connolly, Gerald E. [D-VA-11]');
        expect(result.dcDate).to.be.eql('12/29/2022');
        expect(result.dcIdentifier).to.be.eql('https://www.congress.gov/bill/117th-congress/house-bill/2617/text');
        expect(result.dcLanguage).to.be.eql('eng');
        expect(result.dcRights).to.be.eql('Text is government work');
        expect(result.dcSubject).to.be.eql('Economics and Public Finance');
        expect(result.dcTitle).to.be.eql('Text - H.R.2617 - 117th Congress (2021-2022): Consolidated Appropriations Act, 2023');
        expect(result.dcType).to.be.eql('webpage');
        expect(result.ogDescription).to.be.eql('Text for H.R.2617 - 117th Congress (2021-2022): Consolidated Appropriations Act, 2023');
        expect(result.ogTitle).to.be.eql('Text - H.R.2617 - 117th Congress (2021-2022): Consolidated Appropriations Act, 2023');
        expect(result.ogType).to.be.eql('website');
        expect(result.ogUrl).to.be.eql('https://www.congress.gov/bill/117th-congress/house-bill/2617/text');
        expect(result.ogImage).to.be.eql([
          {
            url: 'https://www.congress.gov/img/opengraph1200by630.jpg',
            type: 'jpg',
          },
        ]);
        expect(result.ogLocale).to.be.eql('en');
        expect(result.charset).to.be.eql('UTF-8');
        expect(result.requestUrl).to.be.eql('https://www.congress.gov/bill/117th-congress/house-bill/2617/text');
        expect(result.success).to.be.eql(true);
        expect(result).to.have.all.keys(
          'dcCoverage',
          'dcCreator',
          'dcDate',
          'dcIdentifier',
          'dcLanguage',
          'dcRights',
          'dcSubject',
          'dcTitle',
          'dcType',
          'ogDescription',
          'ogTitle',
          'ogType',
          'ogUrl',
          'ogImage',
          'ogLocale',
          'charset',
          'requestUrl',
          'success',
        );
        expect(response).to.be.an('Response');
      }).catch(function ({ error, result, response }) {
        console.log('error:', error);
        console.log('result:', result);
        expect(error).to.be.eql(true);
        expect(result.success).to.be.eql(false);
        expect(result.requestUrl).to.be.eql('https://www.congress.gov/bill/117th-congress/house-bill/2617/text');
        expect(result.error).to.eql('403 Forbidden');
        expect(result.errorDetails?.toString()).to.eql('Error: 403 Forbidden');
        expect(result).to.have.all.keys(
          'error',
          'errorDetails',
          'requestUrl',
          'success',
        );
        expect(response).to.eql(undefined);
      });
  });
});
