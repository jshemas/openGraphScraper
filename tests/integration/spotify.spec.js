const ogs = require('../../index');

describe('spotify', function () {
  it('album should return music:album and associated tags', function () {
    return ogs({
      url: 'https://open.spotify.com/album/5EBGCvO6upi3GNknMVe9x9',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alAndroidAppName).to.be.eql('Spotify');
      expect(result.alAndroidPackage).to.be.eql('com.spotify.music');
      expect(result.alAndroidUrl).to.be.eql('spotify://album/5EBGCvO6upi3GNknMVe9x9');
      expect(result.alIosAppName).to.be.eql('Spotify');
      expect(result.alIosAppStoreId).to.be.eql('324684580');
      expect(result.alIosUrl).to.be.eql('spotify://album/5EBGCvO6upi3GNknMVe9x9');
      expect(result.ogTitle).to.be.eql('ye');
      expect(result.ogDescription).to.be.eql('ye, an album by Kanye West on Spotify');
      expect(result.ogUrl).to.be.eql('https://open.spotify.com/album/5EBGCvO6upi3GNknMVe9x9');
      expect(result.ogType).to.be.eql('music.album');
      expect(result.musicMusician).to.be.eql(['https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x']);
      expect(result.musicReleaseDate).to.be.eql('2018-06-01');
      expect(result.twitterTitle).to.be.eql('ye');
      expect(result.twitterAppIdiPhone).to.be.eql('324684580');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.spotify.music');
      expect(result.twitterSite).to.be.eql('@spotify');
      expect(result.twitterDescription).to.be.eql('ye, an album by Kanye West on Spotify');
      expect(result.twitterCard).to.be.eql('audio');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogSiteName).to.be.eql('Spotify');
      expect(result.ogImage).to.be.eql({
        url: 'https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44',
        width: null,
        height: null,
        type: null,
      });
      expect(result.twitterImage).to.be.eql({
        url: 'https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44',
        width: null,
        height: null,
        alt: null,
      });
      expect(result.twitterPlayer).to.be.eql({
        url: 'https://open.spotify.com/embed/album/5EBGCvO6upi3GNknMVe9x9?utm_campaign=twitter-player&utm_source=open&utm_medium=twitter',
        width: '300',
        height: '380',
        stream: null,
      });
      expect(result.musicSong).to.be.eql({
        url: 'https://open.spotify.com/track/0yhxBvedRdGxsPZHJNI4VA',
        track: '1',
        disc: '1',
      });
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/album/5EBGCvO6upi3GNknMVe9x9');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'alAndroidAppName',
        'alAndroidPackage',
        'alAndroidUrl',
        'alIosAppName',
        'alIosAppStoreId',
        'alIosUrl',
        'musicMusician',
        'musicReleaseDate',
        'musicSong',
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
        'twitterAppIdGooglePlay',
        'twitterAppIdiPhone',
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
  it('artist should return music:musician', function () {
    return ogs({
      url: 'https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alAndroidAppName).to.be.eql('Spotify');
      expect(result.alAndroidPackage).to.be.eql('com.spotify.music');
      expect(result.alAndroidUrl).to.be.eql('spotify://artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.alIosAppName).to.be.eql('Spotify');
      expect(result.alIosAppStoreId).to.be.eql('324684580');
      expect(result.alIosUrl).to.be.eql('spotify://artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.ogTitle).to.be.eql('Kanye West');
      expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.ogUrl).to.be.eql('https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.ogType).to.be.eql('music.musician');
      expect(result.twitterTitle).to.be.eql('Kanye West');
      expect(result.twitterAppIdiPhone).to.be.eql('324684580');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.spotify.music');
      expect(result.twitterSite).to.be.eql('@spotify');
      expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.twitterCard).to.be.eql('audio');
      expect(result.ogSiteName).to.be.eql('Spotify');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogImage).to.be.eql({
        url: 'https://i.scdn.co/image/bd1c6fdf3705cf9b7d0c8ac8e7bbed98e31a1559',
        width: null,
        height: null,
        type: null,
      });
      expect(result.twitterImage).to.be.eql({
        url: 'https://i.scdn.co/image/bd1c6fdf3705cf9b7d0c8ac8e7bbed98e31a1559',
        width: null,
        height: null,
        alt: null,
      });
      expect(result.twitterPlayer).to.be.eql({
        url: 'https://open.spotify.com/embed/artist/5K4W6rqBFWDnAN6FQUkS6x?utm_campaign=twitter-player&utm_source=open&utm_medium=twitter',
        width: '504',
        height: '532',
        stream: null,
      });
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'alAndroidAppName',
        'alAndroidPackage',
        'alAndroidUrl',
        'alIosAppName',
        'alIosAppStoreId',
        'alIosUrl',
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
        'twitterAppIdGooglePlay',
        'twitterAppIdiPhone',
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
  it('track should return music:song and associated tags', function () {
    return ogs({
      url: 'https://open.spotify.com/track/3p6fkbeZDIVqapfdgQe6fm',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alAndroidAppName).to.be.eql('Spotify');
      expect(result.alAndroidPackage).to.be.eql('com.spotify.music');
      expect(result.alAndroidUrl).to.be.eql('spotify://track/19a3JfW8BQwqHWUMbcqSx8');
      expect(result.alIosAppName).to.be.eql('Spotify');
      expect(result.alIosAppStoreId).to.be.eql('324684580');
      expect(result.alIosUrl).to.be.eql('spotify://track/19a3JfW8BQwqHWUMbcqSx8');
      expect(result.ogTitle).to.be.eql('Famous');
      expect(result.ogDescription).to.be.eql('Famous, a song by Kanye West on Spotify');
      expect(result.ogUrl).to.be.eql('https://open.spotify.com/track/3p6fkbeZDIVqapfdgQe6fm');
      expect(result.ogType).to.be.eql('music.song');
      expect(result.musicDuration).to.be.eql('196');
      expect(result.musicAlbum).to.be.eql(['https://open.spotify.com/album/4xM1pUHZp9HsuKNxyOQDR0']);
      expect(result.musicAlbumTrack).to.be.eql('4');
      expect(result.musicMusician).to.be.eql(['https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x']);
      expect(result.musicReleaseDate).to.be.eql('2016-06-10');
      expect(result.ogAudio).to.be.an('string').and.to.not.be.empty;
      expect(result.ogAudioType).to.be.eql('audio/vnd.facebook.bridge');
      expect(result.twitterTitle).to.be.eql('Famous');
      expect(result.twitterAppIdiPhone).to.be.eql('324684580');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.spotify.music');
      expect(result.twitterSite).to.be.eql('@spotify');
      expect(result.twitterDescription).to.be.eql('Famous, a song by Kanye West on Spotify');
      expect(result.twitterCard).to.be.eql('audio');
      expect(result.ogSiteName).to.be.eql('Spotify');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogImage).to.be.eql({
        url: 'https://i.scdn.co/image/ab67616d0000b2730939dadf614e70aeffc6710c',
        width: null,
        height: null,
        type: null,
      });
      expect(result.twitterImage).to.be.eql({
        url: 'https://i.scdn.co/image/ab67616d0000b2730939dadf614e70aeffc6710c',
        width: null,
        height: null,
        alt: null,
      });
      expect(result.twitterPlayer).to.be.eql({
        url: 'https://open.spotify.com/embed/track/19a3JfW8BQwqHWUMbcqSx8?utm_campaign=twitter-player&utm_source=open&utm_medium=twitter',
        width: '504',
        height: '584',
        stream: null,
      });
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/track/3p6fkbeZDIVqapfdgQe6fm');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'alAndroidAppName',
        'alAndroidPackage',
        'alAndroidUrl',
        'alIosAppName',
        'alIosAppStoreId',
        'alIosUrl',
        'musicAlbum',
        'musicAlbumTrack',
        'musicDuration',
        'musicMusician',
        'musicReleaseDate',
        'ogAudio',
        'ogAudioType',
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
        'twitterAppIdGooglePlay',
        'twitterAppIdiPhone',
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
  it('playlist should return music:playlist and associated tags', function () {
    return ogs({
      url: 'https://open.spotify.com/user/mjaschmidt/playlist/4BSIiLTu7qzDZLDdkHaty9?si=9UCDOCPGQZKf9jkCBwDOMg',
    }, function (error, result, response) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alAndroidAppName).to.be.eql('Spotify');
      expect(result.alAndroidPackage).to.be.eql('com.spotify.music');
      expect(result.alAndroidUrl).to.be.eql('spotify://playlist/4BSIiLTu7qzDZLDdkHaty9?si=9UCDOCPGQZKf9jkCBwDOMg');
      expect(result.alIosAppName).to.be.eql('Spotify');
      expect(result.alIosAppStoreId).to.be.eql('324684580');
      expect(result.alIosUrl).to.be.eql('spotify://playlist/4BSIiLTu7qzDZLDdkHaty9?si=9UCDOCPGQZKf9jkCBwDOMg');
      expect(result.ogTitle).to.be.eql('Calm Hip Hop Mindset, a playlist by mjaschmidt on Spotify');
      expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.ogUrl).to.be.eql('https://open.spotify.com/playlist/4BSIiLTu7qzDZLDdkHaty9');
      expect(result.ogType).to.be.eql('music.playlist');
      expect(result.musicCreator).to.be.eql(['https://open.spotify.com/user/mjaschmidt']);
      expect(result.twitterTitle).to.be.eql('Calm Hip Hop Mindset');
      expect(result.twitterAppIdiPhone).to.be.eql('324684580');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.spotify.music');
      expect(result.twitterSite).to.be.eql('@spotify');
      expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.twitterCard).to.be.eql('audio');
      expect(result.ogSiteName).to.be.eql('Spotify');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogImage).to.be.eql({
        url: 'https://i.scdn.co/image/ab67706c0000bebb5a535b3001ccf567ddef2927',
        width: null,
        height: null,
        type: null,
      });
      expect(result.twitterImage).to.be.eql({
        url: 'https://i.scdn.co/image/ab67706c0000bebb5a535b3001ccf567ddef2927',
        width: null,
        height: null,
        alt: null,
      });
      expect(result.twitterPlayer).to.be.eql({
        url: 'https://open.spotify.com/embed/playlist/4BSIiLTu7qzDZLDdkHaty9?utm_campaign=twitter-player&utm_source=open&utm_medium=twitter&si=9UCDOCPGQZKf9jkCBwDOMg',
        width: '300',
        height: '380',
        stream: null,
      });
      expect(result.musicSong).to.be.eql({
        url: 'https://open.spotify.com/track/6GHLjWwiztcn2MR9qXU53U',
        track: '1',
        disc: null,
      });
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/user/mjaschmidt/playlist/4BSIiLTu7qzDZLDdkHaty9?si=9UCDOCPGQZKf9jkCBwDOMg');
      expect(result.charset).to.be.eql('utf8');
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'alAndroidAppName',
        'alAndroidPackage',
        'alAndroidUrl',
        'alIosAppName',
        'alIosAppStoreId',
        'alIosUrl',
        'musicCreator',
        'musicSong',
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
        'twitterAppIdGooglePlay',
        'twitterAppIdiPhone',
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
});
