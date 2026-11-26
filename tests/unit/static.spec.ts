/* eslint-disable max-len */
import { expect } from 'chai';
import sinon from 'sinon';
import { encode } from 'iconv-lite';

import undici = require('undici');
import {
  getGlobalDispatcher, MockAgent, setGlobalDispatcher,
} from 'undici';

import ogs from '../../index';

const sandbox = sinon.createSandbox();
const mockAgent = new MockAgent();
const originalFetch = undici.fetch;
const originalGlobalDispatcher = getGlobalDispatcher();

describe('static check meta tags', function () {
  beforeEach(function () {
    setGlobalDispatcher(mockAgent);
    mockAgent.disableNetConnect();
    sandbox.stub(undici, 'fetch').callsFake((input, init) => (
      originalFetch(input, { ...init, dispatcher: mockAgent })
    ));
  });

  afterEach(function () {
    sandbox.restore();
    mockAgent.enableNetConnect();
    setGlobalDispatcher(originalGlobalDispatcher);
  });

  it('check one off tags', function () {
    const metaHTML = `<html><head>
      <link rel="icon" type="image/png" href="https://bar.com/foo.png" />
      <meta charset="utf-8" />
      <meta property="og:description" name="og:description" content="the bar of foo" />
      <meta property="og:image" name="og:image" content="https://www.foo.com/bar.jpg" />
      <meta property="og:title" name="og:title" content="foobar" />
      <meta property="og:type" name="og:type" content="bar" />
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogDescription).to.be.eql('the bar of foo');
        expect(data.result.ogTitle).to.be.eql('foobar');
        expect(data.result.ogType).to.be.eql('bar');
        expect(data.result.ogImage).to.be.eql([{
          url: 'https://www.foo.com/bar.jpg',
          type: 'jpg',
        }]);
        expect(data.result.favicon).to.be.eql('https://bar.com/foo.png');
        expect(data.result.charset).to.be.eql('utf-8');
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('basic metadata', function () {
    // https://ogp.me/
    const metaHTML = `<html><head>
      <title>The Rock (1996)</title>
      <meta property="og:title" content="The Rock" />
      <meta property="og:type" content="video.movie" />
      <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
      <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogTitle).to.be.eql('The Rock');
        expect(data.result.ogType).to.be.eql('video.movie');
        expect(data.result.ogUrl).to.be.eql('https://www.imdb.com/title/tt0117500/');
        expect(data.result.ogImage).to.be.eql([{
          url: 'https://ia.media-imdb.com/images/rock.jpg',
          type: 'jpg',
        }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('optional metadata', function () {
    // https://ogp.me/
    const metaHTML = `<html><head>
      <meta property="og:audio" content="https://example.com/bond/theme.mp3" />
      <meta property="og:description" content="Sean Connery found fame and fortune as the suave, sophisticated British agent, James Bond." />
      <meta property="og:determiner" content="the" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:locale:alternate" content="fr_FR" />
      <meta property="og:locale:alternate" content="es_ES" />
      <meta property="og:site_name" content="IMDb" />
      <meta property="og:video" content="https://example.com/bond/trailer.swf" />
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogAudio).to.be.eql('https://example.com/bond/theme.mp3');
        expect(data.result.ogDescription).to.be.eql('Sean Connery found fame and fortune as the suave, sophisticated British agent, James Bond.');
        expect(data.result.ogDeterminer).to.be.eql('the');
        expect(data.result.ogLocale).to.be.eql('en_GB');
        expect(data.result.ogLocaleAlternate).to.be.eql(['fr_FR', 'es_ES']);
        expect(data.result.ogSiteName).to.be.eql('IMDb');
        expect(data.result.ogVideo).to.be.eql([ { url: 'https://example.com/bond/trailer.swf' } ]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('article', function () {
    const metaHTML = `<html><head>
      <meta property="article:author" content="foo">
      <meta property="article:expiration_time" content="2000-01-03">
      <meta property="article:modified_time" content="2000-01-02">
      <meta property="article:published_time" content="2000-01-01">
      <meta property="article:section" content="bar">
      <meta property="article:tag" content="foobar">
      <meta property="og:type" content="article">
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.articleAuthor).to.be.eql('foo');
        expect(data.result.articleExpirationTime).to.be.eql('2000-01-03');
        expect(data.result.articleModifiedTime).to.be.eql('2000-01-02');
        expect(data.result.articlePublishedTime).to.be.eql('2000-01-01');
        expect(data.result.articleSection).to.be.eql('bar');
        expect(data.result.articleTag).to.be.eql('foobar');
        expect(data.result.ogType).to.be.eql('article');
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('audio', function () {
    const metaHTML = `<html><head>
      <meta property="og:audio:secure_url" content="https://foo.com">
      <meta property="og:audio:type" content="audio/bar">
      <meta property="og:audio" content="http://foo.com">
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogAudio).to.be.eql('http://foo.com');
        expect(data.result.ogAudioSecureURL).to.be.eql('https://foo.com');
        expect(data.result.ogAudioType).to.be.eql('audio/bar');
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('audio - ogp example', function () {
    // https://ogp.me/
    const metaHTML = `<html><head>
      <meta property="og:audio" content="http://example.com/sound.mp3" />
      <meta property="og:audio:secure_url" content="https://secure.example.com/sound.mp3" />
      <meta property="og:audio:type" content="audio/mpeg" />
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogAudio).to.be.eql('http://example.com/sound.mp3');
        expect(data.result.ogAudioSecureURL).to.be.eql('https://secure.example.com/sound.mp3');
        expect(data.result.ogAudioType).to.be.eql('audio/mpeg');
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('audio - facebook example - song', function () {
    // https://developers.facebook.com/docs/opengraph/music/
    const metaHTML = `<html><head>
      <meta property="og:title" content="Under Pressure"/>
      <meta property="og:type" content="music.song"/>
      <meta property="og:url" content="http://open.spotify.com/track/2aSFLiDPreOVP6KHiWk4lF"/>
      <meta property="og:image" content="http://o.scdn.co/image/e4c7b06c20c17156e46bbe9a71eb0703281cf345"/>
      <meta property="og:site_name" content="Spotify"/>
      <meta property="fb:app_id" content="174829003346"/>
      <meta property="music:musician" content="http://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d">
      <meta property="music:musician" content="http://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy">
      <meta property="music:album" content="http://open.spotify.com/album/7rq68qYz66mNdPfidhIEFa">
      <meta property="music:album:track" content="2">
      <meta property="music:duration" content="236">
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogTitle).to.be.eql('Under Pressure');
        expect(data.result.ogType).to.be.eql('music.song');
        expect(data.result.ogUrl).to.be.eql('http://open.spotify.com/track/2aSFLiDPreOVP6KHiWk4lF');
        expect(data.result.ogImage).to.be.eql([{
          url: 'http://o.scdn.co/image/e4c7b06c20c17156e46bbe9a71eb0703281cf345',
        }]);
        expect(data.result.ogSiteName).to.be.eql('Spotify');
        expect(data.result.fbAppId).to.be.eql('174829003346');
        expect(data.result.musicMusician).to.be.eql([
          'http://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d',
          'http://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy'
        ]);
        expect(data.result.musicAlbum).to.be.eql('http://open.spotify.com/album/7rq68qYz66mNdPfidhIEFa');
        expect(data.result.musicAlbumTrack).to.be.eql('2');
        expect(data.result.musicDuration).to.be.eql('236');
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('image', function () {
    const metaHTML = `<html><head>
      <meta property="og:image" content="http://foobar.png">
      <meta property="og:image:height" content="2">
      <meta property="og:image:type" content="image/png">
      <meta property="og:image:width" content="1">
      <meta property="og:image:alt" content="alt text">
      <meta property="og:image:secure_url" content="https://foobar.png">
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogImage).to.be.eql([{
          url: 'https://foobar.png',
          width: '1',
          height: '2',
          type: 'image/png',
          alt: 'alt text',
        }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('image - ogp example', function () {
    // https://ogp.me/
    const metaHTML = `<html><head>
      <meta property="og:image" content="http://example.com/ogp.jpg" />
      <meta property="og:image:secure_url" content="https://secure.example.com/ogp.jpg" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
      <meta property="og:image:alt" content="A shiny red apple with a bite taken out" />
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogImage).to.be.eql([{
          url: 'https://secure.example.com/ogp.jpg',
          width: '400',
          height: '300',
          type: 'image/jpeg',
          alt: 'A shiny red apple with a bite taken out',
        }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('image - real example', function () {
    const metaHTML = `<html><head>
      <meta content="https://foobar.com/7u-snap-image" property="og:image">
      <meta content="https://foobar.com/7u-snap-image" property="og:image:url">
      <meta content="1200" property="og:image:width">
      <meta content="630" property="og:image:height">
      <meta content="image/jpeg" property="og:image:type">
      <meta content="FILE - In this Oct. 8, 2014, file photo." property="og:image:alt">
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogImage).to.be.eql([{
          url: 'https://foobar.com/7u-snap-image',
          width: '1200',
          height: '630',
          type: 'image/jpeg',
          alt: 'FILE - In this Oct. 8, 2014, file photo.',
        }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('image - array', function () {
    const metaHTML = `<html><head>
      <meta property="og:image" content="https://example.com/rock.jpg" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
      <meta property="og:image" content="https://example.com/rock2.jpg" />
      <meta property="og:image" content="https://example.com/rock3.jpg" />
      <meta property="og:image:height" content="1000" />
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogImage).to.be.eql([{
          url: 'https://example.com/rock3.jpg',
          type: 'jpg',
          height: '1000',
        },{
          url: 'https://example.com/rock.jpg',
          type: 'jpg',
          width: '300',
          height: '300',
        }, {
          url: 'https://example.com/rock2.jpg',
          type: 'jpg',
        }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('twitter', function () {
    const metaHTML = `<html><head>
      <meta property="twitter:app:id:googleplay" name="twitter:app:id:googleplay" content="googlefoo" />
      <meta property="twitter:app:id:ipad" name="twitter:app:id:ipad" content="ipadfoo" />
      <meta property="twitter:app:id:iphone" name="twitter:app:id:iphone" content="iphonefoo" />
      <meta property="twitter:app:name:googleplay" name="twitter:app:name:googleplay" content="googlebar" />
      <meta property="twitter:app:name:ipad" name="twitter:app:name:ipad" content="ipadbar" />
      <meta property="twitter:app:name:iphone" name="twitter:app:name:iphone" content="iphonebar" />
      <meta property="twitter:card" name="twitter:card" content="foo" />
      <meta property="twitter:creator" name="twitter:creator" content="bar" />
      <meta property="twitter:description" name="twitter:description" content="the bar of foo" />
      <meta property="twitter:image" name="twitter:image" content="https://www.foo.com/bar.jpg" />
      <meta property="twitter:player:height" content="2">
      <meta property="twitter:player:width" content="1">
      <meta property="twitter:player" content="https://www.bar.com">
      <meta property="twitter:site" name="twitter:site" content="@foobar" />
      <meta property="twitter:title" name="twitter:title" content="the foo of bar" />
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.twitterAppIdGooglePlay).to.be.eql('googlefoo');
        expect(data.result.twitterAppIdiPad).to.be.eql('ipadfoo');
        expect(data.result.twitterAppIdiPhone).to.be.eql('iphonefoo');
        expect(data.result.twitterAppNameGooglePlay).to.be.eql('googlebar');
        expect(data.result.twitterAppNameiPad).to.be.eql('ipadbar');
        expect(data.result.twitterAppNameiPhone).to.be.eql('iphonebar');
        expect(data.result.twitterCard).to.be.eql('foo');
        expect(data.result.twitterCreator).to.be.eql('bar');
        expect(data.result.twitterDescription).to.be.eql('the bar of foo');
        expect(data.result.twitterSite).to.be.eql('@foobar');
        expect(data.result.twitterTitle).to.be.eql('the foo of bar');
        expect(data.result.twitterPlayer).to.be.eql([{
          url: 'https://www.bar.com',
          width: '1',
          height: '2',
        }]);
        expect(data.result.twitterImage).to.be.eql([{
          url: 'https://www.foo.com/bar.jpg',
        }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('video', function () {
    const metaHTML = `<html><head>
      <meta property="og:video:height" content="2">
      <meta property="og:video:secure_url" content="https://www.foo.com">
      <meta property="og:video:type" content="text/bar">
      <meta property="og:video:url" content="http://www.foo.com">
      <meta property="og:video:width" content="1">
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogVideo).to.be.eql([{
          url: 'https://www.foo.com',
          width: '1',
          height: '2',
          type: 'text/bar',
        }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('video - non-secure', function () {
    const metaHTML = `<html><head>
      <meta property="og:video:height" content="2">
      <meta property="og:video:type" content="text/bar">
      <meta property="og:video:url" content="http://www.foo.com">
      <meta property="og:video:width" content="1">
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogVideo).to.be.eql([{
          url: 'http://www.foo.com',
          width: '1',
          height: '2',
          type: 'text/bar',
        }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('video - ogp example', function () {
    // https://ogp.me/
    const metaHTML = `<html><head>
      <meta property="og:video" content="http://example.com/movie.swf" />
      <meta property="og:video:secure_url" content="https://secure.example.com/movie.swf" />
      <meta property="og:video:type" content="application/x-shockwave-flash" />
      <meta property="og:video:width" content="400" />
      <meta property="og:video:height" content="300" />
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogVideo).to.be.eql([{
          url: 'https://secure.example.com/movie.swf',
          width: '400',
          height: '300',
          type: 'application/x-shockwave-flash',
        }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('jsonLD', function () {
    const metaHTML = `<html><head>
    <script type="application/ld+json">{"foo":"bar"}</script>
    <script type="application/ld+json"></script>
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.jsonLD).to.be.eql([{ foo: 'bar' }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('jsonLD - with new lines', function () {
    const metaHTML = `<html><head>
    <script type="application/ld+json">{"foo":"
    bar
    "}</script>
    <script type="application/ld+json"></script>
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.jsonLD).to.be.eql([{ foo: '    bar    ' }]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('jsonLD - empty with whitespace', function () {
    const metaHTML = `<html><head>
    <script type="application/ld+json">
    
    
    </script>
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.jsonLD).to.be.eql([]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('jsonLD - invalid JSON string that cannot be parsed does not throw error', function () {
    const metaHTML = `<html><head>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "Blah ",
      "sameAs": [
        "https:\\\\/\\\\/twitter.com\\\\/blah?lang=en"
        "https:\\\\/\\\\/www.facebook.com\\\\/blah\\\\/"
        ""
        "https:\\\\/\\\\/www.instagram.com\\\\/blah\\\\/"
        ""
        ""
        "https:\\\\/\\\\/www.youtube.com\\\\/@blah"
        ""
      ],
      "url": "https:\\\\/\\\\/blah.com"
    }
    
    </script>
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.jsonLD).to.be.eql([]);
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('jsonLD - invalid JSON string that cannot be parsed throws error when options.jsonLDOptions.throwOnJSONParseError = true', function () {
    const metaHTML = `<html><head>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "Blah ",
      "sameAs": [
        "https:\\\\/\\\\/twitter.com\\\\/blah?lang=en"
        "https:\\\\/\\\\/www.facebook.com\\\\/blah\\\\/"
        ""
        "https:\\\\/\\\\/www.instagram.com\\\\/blah\\\\/"
        ""
        ""
        "https:\\\\/\\\\/www.youtube.com\\\\/@blah"
        ""
      ],
      "url": "https:\\\\/\\\\/blah.com"
    }
    
    </script>
    </head></html>`;

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com', jsonLDOptions: { throwOnJSONParseError: true } }).catch((data) => {
      expect(data.result.success).to.be.eql(false);
    });
  });

  it('encoding - utf-8', function () {
    /* eslint-disable max-len */
    const metaHTML = `<html><head>
      <meta charset="utf-8">
      <meta property="og:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta property="og:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta property="og:image" content="https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="楽天市場">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:site" content="@RakutenJP">
      <meta name="twitter:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta name="twitter:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta name="twitter:image:src" content="https://r.r10s.jp/com/img/home/top/ogp.png">
    </head></html>`;
    /* eslint-enable max-len */

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(data.result.ogDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(data.result.ogType).to.be.eql('website');
        expect(data.result.ogSiteName).to.be.eql('楽天市場');
        expect(data.result.twitterCard).to.be.eql('summary');
        expect(data.result.twitterSite).to.be.eql('@RakutenJP');
        expect(data.result.twitterTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(data.result.twitterDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(data.result.ogImage).to.be.eql([{
          url: 'https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png',
          type: 'png',
        }]);
        expect(data.result.twitterImage).to.be.eql([{
          url: 'https://r.r10s.jp/com/img/home/top/ogp.png',
        }]);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.charset).to.be.eql('utf-8');
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('encoding - sjis', function () {
    /* eslint-disable max-len */
    const metaHTML = `<html><head>
      <meta charset="sjis">
      <meta property="og:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta property="og:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta property="og:image" content="https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="楽天市場">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:site" content="@RakutenJP">
      <meta name="twitter:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta name="twitter:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta name="twitter:image:src" content="https://r.r10s.jp/com/img/home/top/ogp.png">
    </head></html>`;
    /* eslint-enable max-len */
    const metaHTMLBuffer = encode(metaHTML, 'sjis');

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTMLBuffer);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(data.result.ogDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(data.result.ogType).to.be.eql('website');
        expect(data.result.ogSiteName).to.be.eql('楽天市場');
        expect(data.result.twitterCard).to.be.eql('summary');
        expect(data.result.twitterSite).to.be.eql('@RakutenJP');
        expect(data.result.twitterTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(data.result.twitterDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(data.result.ogImage).to.be.eql([{
          url: 'https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png',
          type: 'png',
        }]);
        expect(data.result.twitterImage).to.be.eql([{
          url: 'https://r.r10s.jp/com/img/home/top/ogp.png',
        }]);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.charset).to.be.eql('sjis');
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });

  it('encoding - euc-jp', function () {
    /* eslint-disable max-len */
    const metaHTML = `<html><head>
      <meta charset="euc-jp">
      <meta property="og:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta property="og:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta property="og:image" content="https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="楽天市場">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:site" content="@RakutenJP">
      <meta name="twitter:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta name="twitter:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta name="twitter:image:src" content="https://r.r10s.jp/com/img/home/top/ogp.png">
    </head></html>`;
    /* eslint-enable max-len */
    const metaHTMLBuffer = encode(metaHTML, 'euc-jp');

    mockAgent.get('http://www.test.com')
      .intercept({ path: '/' })
      .reply(200, metaHTMLBuffer);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(data.result.ogDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(data.result.ogType).to.be.eql('website');
        expect(data.result.ogSiteName).to.be.eql('楽天市場');
        expect(data.result.twitterCard).to.be.eql('summary');
        expect(data.result.twitterSite).to.be.eql('@RakutenJP');
        expect(data.result.twitterTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(data.result.twitterDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(data.result.ogImage).to.be.eql([{
          url: 'https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png',
          type: 'png',
        }]);
        expect(data.result.twitterImage).to.be.eql([{
          url: 'https://r.r10s.jp/com/img/home/top/ogp.png',
        }]);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.charset).to.be.eql('euc-jp');
        expect(data.html).to.be.eql(metaHTML);
        expect(data.response).to.be.a('response');
      });
  });
});
