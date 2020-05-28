const ogs = require('../../index');

describe('video', function () {
  it('Test Youtube Video - Should Return correct Open Graph Info', function () {
    return ogs({
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogSiteName).to.be.eql('YouTube');
      expect(result.ogUrl).to.be.eql('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.ogTitle).to.be.eql('Rick Astley - Never Gonna Give You Up (Video)');
      expect(result.ogDescription).to.be.eql("Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYD Subscribe to the official Rick As...");
      expect(result.ogType).to.be.eql('video.other');
      expect(result.twitterCard).to.be.eql('player');
      expect(result.twitterSite).to.be.eql('@youtube');
      expect(result.twitterTitle).to.be.eql('Rick Astley - Never Gonna Give You Up (Video)');
      expect(result.twitterDescription).to.be.eql("Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYD Subscribe to the official Rick As...");
      expect(result.twitterAppNameiPhone).to.be.eql('YouTube');
      expect(result.twitterAppIdiPhone).to.be.eql('544007664');
      expect(result.twitterAppNameiPad).to.be.eql('YouTube');
      expect(result.twitterAppIdiPad).to.be.eql('544007664');
      expect(result.twitterAppUrliPhone).to.be.eql('vnd.youtube://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=applinks');
      expect(result.twitterAppUrliPad).to.be.eql('vnd.youtube://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=applinks');
      expect(result.twitterAppNameGooglePlay).to.be.eql('YouTube');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.google.android.youtube');
      expect(result.twitterAppUrlGooglePlay).to.be.eql('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      expect(result.ogImage).to.be.eql({
        url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        width: '1280',
        height: '720',
        type: null,
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
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
  it.only('Test Twitch.tv Video - Should Return correct Open Graph Info', function () {
    return ogs({
      url: 'https://www.twitch.tv/videos/632214184',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.ogSiteName).to.be.eql('Twitch');
      expect(result.twitterSite).to.be.eql('@twitch');
      expect(result.ogTitle).to.be.oneOf(['Twitch', 'AI Soundscapes, Trials of Mana']);
      expect(result.ogDescription).to.be.eql("Twitch is the world's leading video platform and community for gamers.");
      expect(result.ogUrl).to.be.eql('https://www.twitch.tv/videos/632214184');
      expect(result.ogType).to.be.eql('website');
      expect(result.ogImage).to.be.eql({
        url: 'https://static-cdn.jtvnw.net/ttv-static-metadata/twitch_logo3.jpg',
        width: null,
        height: null,
        type: null,
      });
      expect(result.requestUrl).to.be.eql('https://www.twitch.tv/videos/632214184');
      expect(result.success).to.be.eql(true);
      expect(response).to.be.an('object').and.to.not.be.empty;
    });
  });
});
