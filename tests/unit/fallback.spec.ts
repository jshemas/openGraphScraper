import { expect } from 'chai';

import { load } from 'cheerio';

import { fallback } from '../../lib/fallback';

describe('fallback', function () {
  context('ogTitle', function () {
    it('when there is a og title already found', function () {
      let ogObject = { ogTitle: 'bar' };
      const $ = load('<html><body><title>foo</title></body></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogTitle).to.be.eql('bar');
      expect(ogObject).to.have.all.keys('ogTitle');
    });
    it('when there is a title tag', function () {
      let ogObject = {};
      const $ = load('<html><body><title>foo</title></body></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogTitle).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogTitle');
    });
    it('when there are multiple title tags', function () {
      let ogObject = {};
      const $ = load('<html><head><title>foo</title></head><body><svg><title>bar</title></svg><svg><title>baz</title></svg></body></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogTitle).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogTitle');
    });
    it('when there is a meta title tag', function () {
      const $ = load('<html><head><meta name="title" content="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogTitle).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogTitle');
    });
    it('when there is a .post-title div tag', function () {
      const $ = load('<html><body><div class="post-title">foo</div></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogTitle).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogTitle');
    });
    it('when there is a .entry-title div tag', function () {
      const $ = load('<html><body><div class="entry-title">foo</div></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogTitle).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogTitle');
    });
    it('when there is a .title h1 a tag', function () {
      const $ = load('<html><body><h1 class="title"><a>foo</a></h1></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogTitle).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogTitle');
    });
    it('when there is a .title h1 tag', function () {
      const $ = load('<html><body><h1 class="title">foo</h1></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogTitle).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogTitle');
    });
    it('when there is no title', function () {
      const $ = load('<html><body></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
    it('when there is a title tag but it is empty', function () {
      let ogObject = {};
      const $ = load('<html><body><title></title></body></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
    it('when there is a meta title tag but the content is empty', function () {
      const $ = load('<html><head><meta name="title" content=""></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
    it('when there is a meta title tag but the content is missing', function () {
      const $ = load('<html><head><meta name="title"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
  });

  context('ogDescription', function () {
    it('when there is a og description already found', function () {
      let ogObject = { ogDescription: 'bar' };
      const $ = load('<html><head><meta name="description" content="foo"></head></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogDescription).to.be.eql('bar');
      expect(ogObject).to.have.all.keys('ogDescription');
    });
    it('when there is a description meta tag using name', function () {
      const $ = load('<html><head><meta name="description" content="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogDescription).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogDescription');
    });
    it('when there is a description meta tag using itemprop', function () {
      const $ = load('<html><head><meta itemprop="description" content="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogDescription).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogDescription');
    });
    it('when there is a #description tag', function () {
      const $ = load('<html><body><div id="description">foo</div></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogDescription).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogDescription');
    });
    it('when there is no description', function () {
      const $ = load('<html><body></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
  });

  context('ogImage', function () {
    it('when there is a og image already found', function () {
      let ogObject = { ogImage: [{ url: 'bar.png', type: 'png' }] };
      const $ = load('<html></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogImage).to.be.eql([{ url: 'bar.png', type: 'png' }]);
      expect(ogObject).to.have.all.keys('ogImage');
    });
    it('when there is a og image already found and is a array', function () {
      let ogObject = { ogImage: [{ url: 'foo.png', type: 'png' }, { url: 'bar.png', type: 'png' }] };
      const $ = load('<html></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogImage).to.be.eql([{ url: 'foo.png', type: 'png' }, { url: 'bar.png', type: 'png' }]);
    });
    it('when there is a og image already found and is a array with missing/invalid types', function () {
      let ogObject = { ogImage: [{ url: 'foo.bar' }, { url: 'bar.png' }] };
      const $ = load('<html></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogImage).to.be.eql([{ url: 'foo.bar' }, { url: 'bar.png', type: 'png' }]);
    });
    it('when there is a mix of valid and invalid images', function () {
      const $ = load('<html><body><image width=2 height=4 src="foo.png"><image src="bar.png"><image src="foo.bar"><image></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogImage).to.be.eql([{
        type: 'png', url: 'foo.png', width: 2, height: 4,
      }, {
        type: 'png', url: 'bar.png',
      }]);
      expect(ogObject).to.have.all.keys('ogImage');
    });
    it('when image has width/height as strings', function () {
      const $ = load('<html><body><image width="2" height="4" src="foo.png"><image></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogImage).to.be.eql([{
        type: 'png', url: 'foo.png', width: 2, height: 4,
      }]);
      expect(ogObject).to.have.all.keys('ogImage');
    });
    it('when image has invalid width/height as strings', function () {
      const $ = load('<html><body><image width="foo" height="bar" src="foo.png"><image></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogImage).to.be.eql([{
        type: 'png', url: 'foo.png',
      }]);
      expect(ogObject).to.have.all.keys('ogImage');
    });
    it('when there is no og images found and no fallback images', function () {
      const $ = load('<html></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
    it('when there is a og image already found but it has no type', function () {
      let ogObject = { ogImage: [{ url: 'bar.png' }] };
      const $ = load('<html></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogImage).to.be.eql([{ url: 'bar.png', type: 'png' }]);
      expect(ogObject).to.have.all.keys('ogImage');
    });
    it('when there is a og image already found but it has no type but that type is invalid', function () {
      let ogObject = { ogImage: [{ url: 'bar.foo' }] };
      const $ = load('<html></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogImage).to.be.eql([{ url: 'bar.foo' }]);
      expect(ogObject).to.have.all.keys('ogImage');
    });
  });

  context('ogAudioURL/ogAudioSecureURL', function () {
    it('when there is a og AudioURL already found', function () {
      let ogObject = { ogAudioURL: 'bar.mp3' };
      const $ = load('<html><body><audio src="foo.png"></body></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogAudioURL).to.be.eql('bar.mp3');
      expect(ogObject).to.have.all.keys('ogAudioURL');
    });
    it('when there is a og AudioSecureURL already found', function () {
      let ogObject = { ogAudioSecureURL: 'bar.mp3' };
      const $ = load('<html><body><audio src="foo.png"></body></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogAudioSecureURL).to.be.eql('bar.mp3');
      expect(ogObject).to.have.all.keys('ogAudioSecureURL');
    });
    it('when there is a audio tag without HTTPS', function () {
      const $ = load('<html><body><audio src="foo.mp3"></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogAudioURL).to.be.eql('foo.mp3');
      expect(ogObject).to.have.all.keys('ogAudioURL');
    });
    it('when there is a audio tag with HTTPS', function () {
      const $ = load('<html><body><audio src="https://foo.mp3" type="mp3"></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogAudioSecureURL).to.be.eql('https://foo.mp3');
      expect(ogObject.ogAudioType).to.be.eql('mp3');
      expect(ogObject).to.have.all.keys('ogAudioSecureURL', 'ogAudioType');
    });
    it('when there is a audio source tag without HTTPS', function () {
      const $ = load('<html><body><audio><source src="foo.mp3" type="mp3"></audio></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogAudioURL).to.be.eql('foo.mp3');
      expect(ogObject.ogAudioType).to.be.eql('mp3');
      expect(ogObject).to.have.all.keys('ogAudioURL', 'ogAudioType');
    });
    it('when there is a audio source tag with HTTPS', function () {
      const $ = load('<html><body><audio><source src="https://foo.mp3"></audio></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogAudioSecureURL).to.be.eql('https://foo.mp3');
      expect(ogObject).to.have.all.keys('ogAudioSecureURL');
    });
    it('when there is no', function () {
      const $ = load('<html><body><audio></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
  });

  context('ogLocale', function () {
    it('when there is a og locale already found', function () {
      let ogObject = { ogLocale: 'bar' };
      const $ = load('<html lang="foo"></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogLocale).to.be.eql('bar');
      expect(ogObject).to.have.all.keys('ogLocale');
    });
    it('when there is a html tag with lang', function () {
      const $ = load('<html lang="foo"></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogLocale).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogLocale');
    });
    it('when there is a meta inLanguage tag', function () {
      const $ = load('<html><head><meta itemprop="inLanguage" content="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogLocale).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogLocale');
    });
    it('when there is no ogLocale', function () {
      const $ = load('<html><body></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
  });

  context('ogLogo', function () {
    it('when there is a og logo already found', function () {
      let ogObject = { ogLogo: 'bar' };
      const $ = load('<html><head><meta itemprop="logo" content="foo"></head></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogLogo).to.be.eql('bar');
      expect(ogObject).to.have.all.keys('ogLogo');
    });
    it('when there is a meta logo tag', function () {
      const $ = load('<html><head><meta itemprop="logo" content="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogLogo).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogLogo');
    });
    it('when there is a img logo tag', function () {
      const $ = load('<html><body><img itemprop="logo" src="foo"></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogLogo).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogLogo');
    });
    it('when there is no ogLogo', function () {
      const $ = load('<html><body></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
  });

  context('ogUrl', function () {
    it('when there is a og url already found', function () {
      let ogObject = { ogUrl: 'bar' };
      const $ = load('<html><head><link rel="canonical" href="foo"></head></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogUrl).to.be.eql('bar');
      expect(ogObject).to.have.all.keys('ogUrl');
    });
    it('when there is a link tag', function () {
      const $ = load('<html><head><link rel="canonical" href="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogUrl).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogUrl');
    });
    it('when there is a alt link tag', function () {
      const $ = load('<html><head><link rel="alternate" hreflang="x-default" href="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogUrl).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogUrl');
    });
    it('when there is no ogUrl', function () {
      const $ = load('<html><body></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
  });

  context('ogDate', function () {
    it('when there is a og date already found', function () {
      let ogObject = { ogDate: 'bar' };
      const $ = load('<html><head><meta name="date" content="foo"></head></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.ogDate).to.be.eql('bar');
      expect(ogObject).to.have.all.keys('ogDate');
    });
    it('when there is a meta date tag', function () {
      const $ = load('<html><head><meta name="date" content="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogDate).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogDate');
    });
    it('when there is a meta datemodified tag', function () {
      const $ = load('<html><head><meta itemprop="datemodified" content="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogDate).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogDate');
    });
    it('when there is a meta datepublished tag', function () {
      const $ = load('<html><head><meta itemprop="datepublished" content="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogDate).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogDate');
    });
    it('when there is a meta date tag using itemprop', function () {
      const $ = load('<html><head><meta itemprop="date" content="foo"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogDate).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogDate');
    });
    it('when there is a time date tag using itemprop', function () {
      const $ = load('<html><body><time itemprop="date" datetime="foo"></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogDate).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogDate');
    });
    it('when there is a time date tag using datetime', function () {
      const $ = load('<html><body><time datetime="foo"></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.ogDate).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('ogDate');
    });
    it('when there is no ogDate', function () {
      const $ = load('<html><body></body></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject).to.be.eql({});
    });
  });

  context('favicon', function () {
    it('when there is a favicon already found', function () {
      let ogObject = { favicon: 'foo' };
      const $ = load('<html></html>');
      ogObject = fallback(ogObject, {}, $, '');
      expect(ogObject.favicon).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('favicon');
    });
    it('when there is a shortcut icon', function () {
      const $ = load('<html><link rel="shortcut icon" href="foo" /></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.favicon).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('favicon');
    });
    it('when there is a icon', function () {
      const $ = load('<html><link rel="icon" href="foo" /></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.favicon).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('favicon');
    });
    it('when there is a mask-icon', function () {
      const $ = load('<html><link rel="mask-icon" href="foo" /></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.favicon).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('favicon');
    });
    it('when there is a apple-touch-icon', function () {
      const $ = load('<html><link rel="apple-touch-icon" href="foo" /></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.favicon).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('favicon');
    });
    it('when there is a image/png', function () {
      const $ = load('<html><link type="image/png" href="foo" /></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.favicon).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('favicon');
    });
    it('when there is a image/ico', function () {
      const $ = load('<html><link type="image/ico" href="foo" /></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.favicon).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('favicon');
    });
    it('when there is a image/x-icon', function () {
      const $ = load('<html><link type="image/x-icon" href="foo" /></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.favicon).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('favicon');
    });
  });

  context('charset', function () {
    it('when there is a meta tag with charset prop', function () {
      const $ = load('<html><head><meta charset="foo" /></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.charset).to.be.eql('foo');
      expect(ogObject).to.have.all.keys('charset');
    });
    it('when there is a meta tag with charset name', function () {
      const $ = load('<html><head><meta name="charset" content="bar"></head></html>');
      const ogObject = fallback({}, {}, $, '');
      expect(ogObject.charset).to.be.eql('bar');
      expect(ogObject).to.have.all.keys('charset');
    });
    it('when trying to get a charset from the body', function () {
      const body = '<html><head></head></html>';
      const $ = load(body);
      const ogObject = fallback({}, {}, $, body);
      expect(ogObject.charset).to.be.eql('ISO-8859-1');
      expect(ogObject).to.have.all.keys('charset');
    });
    it('when trying to get a charset from the body and the body is empty', function () {
      const body = '';
      const $ = load(body);
      const ogObject = fallback({}, {}, $, body);
      expect(ogObject).to.be.eql({});
    });
  });
});
