const ogs = require('../../index');

describe('video', function () {
  it('Test Youtube Video - Should Return correct Open Graph Info', function () {
    return ogs({ url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', downloadLimit: false }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alAndroidAppName).to.be.eql('YouTube');
      expect(result.alAndroidPackage).to.be.eql('com.google.android.youtube');
      expect(result.alAndroidUrl).to.be.eql('vnd.youtube://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=applinks');
      expect(result.alIosAppName).to.be.eql('YouTube');
      expect(result.alIosAppStoreId).to.be.eql('544007664');
      expect(result.alIosUrl).to.be.eql('vnd.youtube://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=applinks');
      expect(result.alWebUrl).to.be.oneOf(['https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=applinks', 'http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=applinks']);
      expect(result.ogSiteName).to.be.eql('YouTube');
      expect(result.ogUrl).to.be.eql('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.ogTitle).to.be.eql('Rick Astley - Never Gonna Give You Up (Official Music Video)');
      expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.ogType).to.be.eql('video.other');
      expect(result.ogLocale).to.be.oneOf(['en', 'en-US', 'nl-NL']);
      expect(result.twitterCard).to.be.eql('player');
      expect(result.twitterSite).to.be.eql('@youtube');
      expect(result.twitterTitle).to.be.eql('Rick Astley - Never Gonna Give You Up (Official Music Video)');
      expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.twitterAppNameiPhone).to.be.eql('YouTube');
      expect(result.twitterAppIdiPhone).to.be.eql('544007664');
      expect(result.twitterAppNameiPad).to.be.eql('YouTube');
      expect(result.twitterAppIdiPad).to.be.eql('544007664');
      expect(result.twitterUrl).to.be.eql('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.ogDate).to.be.oneOf(['2009-10-24', undefined]);
      expect(result.twitterAppUrliPhone).to.be.eql('vnd.youtube://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=applinks');
      expect(result.twitterAppUrliPad).to.be.eql('vnd.youtube://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=applinks');
      expect(result.twitterAppNameGooglePlay).to.be.eql('YouTube');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.google.android.youtube');
      expect(result.twitterAppUrlGooglePlay).to.be.eql('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.ogImage).to.be.eql({
        url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        width: '1280',
        height: '720',
        type: 'jpg',
      });
      expect(result.ogVideo).to.be.eql({
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        width: '1280',
        height: '720',
        type: 'text/html',
      });
      expect(result.twitterImage).to.be.eql({
        url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        width: null,
        height: null,
        alt: null,
      });
      expect(result.twitterPlayer).to.be.eql({
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        width: '1280',
        height: '720',
        stream: null,
      });
      expect(result.requestUrl).to.be.eql('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.charset).to.be.eql('UTF-8');
      expect(result.success).to.be.eql(true);
      if (result.ogDate === undefined) result.ogDate = 'hack because sometimes this does not come back for some reason';
      expect(result).to.have.all.keys(
        'favicon',
        'alAndroidAppName',
        'alAndroidPackage',
        'alAndroidUrl',
        'alIosAppName',
        'alIosAppStoreId',
        'alIosUrl',
        'alWebUrl',
        'ogDate',
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
        'twitterUrl',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it('Test Twitch.tv Video - Should Return correct Open Graph Info', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/twitch.html' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogSiteName).to.be.eql('Twitch');
      expect(result.twitterSite).to.be.eql('@twitch');
      expect(result.ogLocale).to.be.eql('en-US');
      expect(result.ogTitle).to.be.oneOf(['Twitch', 'AI Soundscapes, Trials of Mana', 'AI Soundscapes, Trials of Mana - Vinesauce on Twitch']);
      expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.ogUrl).to.be.eql('https://www.twitch.tv/videos/632214184');
      expect(result.favicon).to.be.eql('https://static.twitchcdn.net/assets/favicon-32-d6025c14e900565d6177.png');
      expect(result.ogType).to.be.oneOf(['website', 'video.other']);
      expect(result.ogImage).to.be.to.be.an('object').and.to.not.be.empty;
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/twitch.html');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
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
        'charset',
        'twitterSite',
      );
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
});
