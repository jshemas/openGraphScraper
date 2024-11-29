import { expect } from 'chai';

import ogs from '../../index';

describe('spotify', function () {
  it('album should return music:album and associated tags', function () {
    return ogs({ url: 'https://open.spotify.com/album/5EBGCvO6upi3GNknMVe9x9' }).then(function ({ error, result, response }) {
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
      // expect(result.ogDescription).to.be.eql('Album · Kanye West · 2018 · 7 songs');
      // expect(result.favicon).to.be.eql('https://open.scdn.co/cdn/images/favicon.0c211e2e.png');
      // expect(result.ogUrl).to.be.eql('https://open.spotify.com/album/5EBGCvO6upi3GNknMVe9x9');
      expect(result.ogType).to.be.eql('music.album');
      expect(result.musicMusician).to.be.eql('https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.musicReleaseDate).to.be.eql('2018-06-01');
      expect(result.twitterTitle).to.be.eql('ye');
      expect(result.twitterSite).to.be.eql('@spotify');
      // expect(result.twitterDescription).to.be.eql('Album · Kanye West · 2018 · 7 songs');
      expect(result.twitterCard).to.be.eql('summary');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogSiteName).to.be.eql('Spotify');
      expect(result.ogImage).to.be.eql([{
        url: 'https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44',
      }]);
      expect(result.twitterImage).to.be.eql([{
        url: 'https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44',
      }]);
      expect(result.musicSong).to.be.eql([{
        url: 'https://open.spotify.com/track/6EuE9M1viu9gkdFSafia9o',
        track: '1',
        disc: '1',
      }, {
        disc: '1',
        track: '2',
        url: 'https://open.spotify.com/track/2r4JRwcbIeuAzWjH4YXlLs',
      },
      {
        disc: '1',
        track: '3',
        url: 'https://open.spotify.com/track/3qnoOm4fwZPBS116f5hpgF',
      },
      {
        disc: '1',
        track: '4',
        url: 'https://open.spotify.com/track/3dG6tjetoR4GMmUGZUprLt',
      },
      {
        disc: '1',
        track: '5',
        url: 'https://open.spotify.com/track/1DdgqEZk4Hqfpl3drdXJun',
      },
      {
        disc: '1',
        track: '6',
        url: 'https://open.spotify.com/track/6Bg7MznA9X0dIhlAsLyBYj',
      },
      {
        disc: '1',
        track: '7',
        url: 'https://open.spotify.com/track/2VYb3Fb5iK5Y8HGZ8oEEkp',
      }]);
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/album/5EBGCvO6upi3GNknMVe9x9');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.fbAppId).to.be.eql('174829003346');
      expect(result.jsonLD).to.be.an('array').and.to.not.be.empty;
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'favicon',
        'fbAppId',
        'jsonLD',
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
        'twitterCard',
        'twitterDescription',
        'twitterImage',
        'twitterSite',
        'twitterTitle',
      );
      expect(response).to.be.an('Response');
    });
  });

  it('artist should return music:musician', function () {
    return ogs({ url: 'https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x' }).then(function ({ error, result, response }) {
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
      // expect(result.favicon).to.be.eql('https://open.scdn.co/cdn/images/favicon.0c211e2e.png');
      expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.ogUrl).to.be.eql('https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.ogType).to.be.eql('profile');
      expect(result.twitterTitle).to.be.eql('Kanye West');
      expect(result.twitterSite).to.be.eql('@spotify');
      expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.twitterCard).to.be.eql('summary');
      expect(result.ogSiteName).to.be.eql('Spotify');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogImage).to.be.eql([{
        url: 'https://i.scdn.co/image/ab6761610000e5eb6e835a500e791bf9c27a422a',
      }]);
      expect(result.twitterImage).to.be.eql([{
        url: 'https://i.scdn.co/image/ab6761610000e5eb6e835a500e791bf9c27a422a',
      }]);
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.fbAppId).to.be.eql('174829003346');
      expect(result.jsonLD).to.be.an('array').and.to.not.be.empty;
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'favicon',
        'fbAppId',
        'jsonLD',
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
        'twitterCard',
        'twitterDescription',
        'twitterImage',
        'twitterSite',
        'twitterTitle',
      );
      expect(response).to.be.an('Response');
    });
  });

  it('track should return music:song and associated tags', function () {
    return ogs({ url: 'https://open.spotify.com/track/3p6fkbeZDIVqapfdgQe6fm' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alAndroidAppName).to.be.eql('Spotify');
      expect(result.alAndroidPackage).to.be.eql('com.spotify.music');
      expect(result.alAndroidUrl).to.be.eql('spotify://track/3p6fkbeZDIVqapfdgQe6fm');
      expect(result.alIosAppName).to.be.eql('Spotify');
      expect(result.alIosAppStoreId).to.be.eql('324684580');
      expect(result.alIosUrl).to.be.eql('spotify://track/3p6fkbeZDIVqapfdgQe6fm');
      expect(result.ogTitle).to.be.eql('Famous');
      // expect(result.ogDescription).to.be.eql('Song · Kanye West · 2016');
      expect(result.ogUrl).to.be.eql('https://open.spotify.com/track/3p6fkbeZDIVqapfdgQe6fm');
      // expect(result.favicon).to.be.eql('https://open.scdn.co/cdn/images/favicon32.a19b4f5b.png');
      expect(result.ogType).to.be.eql('music.song');
      expect(result.musicDuration).to.be.eql('196');
      expect(result.musicAlbum).to.be.eql('https://open.spotify.com/album/4xM1pUHZp9HsuKNxyOQDR0');
      expect(result.musicAlbumTrack).to.be.eql('4');
      expect(result.musicMusician).to.be.eql('https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x');
      expect(result.musicReleaseDate).to.be.eql('2016-06-10');
      expect(result.ogAudio).to.be.an('string').and.to.not.be.empty;
      expect(result.ogAudioType).to.be.eql('audio/mpeg');
      expect(result.twitterTitle).to.be.eql('Famous');
      expect(result.twitterSite).to.be.eql('@spotify');
      // expect(result.twitterDescription).to.be.eql('Song · Kanye West · 2016');
      expect(result.twitterCard).to.be.eql('summary');
      expect(result.ogSiteName).to.be.eql('Spotify');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogImage).to.be.eql([{
        url: 'https://i.scdn.co/image/ab67616d0000b2730939dadf614e70aeffc6710c',
      }]);
      expect(result.twitterImage).to.be.eql([{
        url: 'https://i.scdn.co/image/ab67616d0000b2730939dadf614e70aeffc6710c',
      }]);
      expect(result.requestUrl).to.be.eql('https://open.spotify.com/track/3p6fkbeZDIVqapfdgQe6fm');
      expect(result.charset).to.be.eql('utf-8');
      expect(result.fbAppId).to.be.eql('174829003346');
      expect(result.jsonLD).to.be.an('array').and.to.not.be.empty;
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'favicon',
        'fbAppId',
        'jsonLD',
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
        'twitterCard',
        'twitterDescription',
        'twitterImage',
        'twitterSite',
        'twitterTitle',
      );
      expect(response).to.be.an('Response');
    });
  });

  it('playlist should return music:playlist and associated tags', function () {
    return ogs({ url: 'https://jshemas.github.io/openGraphScraperPages/spotifyPlayList' }).then(function ({ error, result, response }) {
      console.log('error:', error);
      console.log('result:', result);
      expect(error).to.be.eql(false);
      expect(result.alAndroidAppName).to.be.eql('Spotify');
      expect(result.alAndroidPackage).to.be.eql('com.spotify.music');
      expect(result.alAndroidUrl).to.be.eql('spotify://playlist/4BSIiLTu7qzDZLDdkHaty9');
      expect(result.alIosAppName).to.be.eql('Spotify');
      expect(result.alIosAppStoreId).to.be.eql('324684580');
      expect(result.alIosUrl).to.be.eql('spotify://playlist/4BSIiLTu7qzDZLDdkHaty9');
      expect(result.ogTitle).to.be.eql('Calm Hip Hop Mindset');
      expect(result.ogDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.ogUrl).to.be.eql('https://open.spotify.com/playlist/4BSIiLTu7qzDZLDdkHaty9');
      expect(result.favicon).to.be.eql('https://open.scdn.co/cdn/images/favicon32.a19b4f5b.png');
      expect(result.ogType).to.be.eql('music.playlist');
      expect(result.musicCreator).to.be.eql('https://open.spotify.com/user/mjaschmidt');
      expect(result.twitterTitle).to.be.eql('Calm Hip Hop Mindset');
      expect(result.twitterAppIdiPhone).to.be.eql('324684580');
      expect(result.twitterAppIdGooglePlay).to.be.eql('com.spotify.music');
      expect(result.twitterSite).to.be.eql('@spotify');
      expect(result.twitterDescription).to.be.an('string').and.to.not.be.empty;
      expect(result.twitterCard).to.be.eql('audio');
      expect(result.ogSiteName).to.be.eql('Spotify');
      expect(result.ogLocale).to.be.eql('en');
      expect(result.ogImage).to.be.eql([{
        url: 'https://i.scdn.co/image/ab67706c0000bebb5a535b3001ccf567ddef2927',
      }]);
      expect(result.twitterImage).to.be.eql([{
        url: 'https://i.scdn.co/image/ab67706c0000bebb5a535b3001ccf567ddef2927',
      }]);
      expect(result.twitterPlayer).to.be.eql([{
        url: 'https://open.spotify.com/embed/playlist/4BSIiLTu7qzDZLDdkHaty9?utm_campaign=twitter-player&utm_source=open&utm_medium=twitter',
        width: '504',
        height: '584',
      }]);
      expect(result.musicSong).to.be.eql([{
        url: 'https://open.spotify.com/track/2LTlO3NuNVN70lp2ZbVswF',
        track: '1',
      }, {
        track: '2',
        url: 'https://open.spotify.com/track/7hZoTr4ffMGqm9opMiGmBp',
      },
      {
        track: '3',
        url: 'https://open.spotify.com/track/7FW4HUo39yRwGVxEoHqTa4',
      },
      {
        track: '4',
        url: 'https://open.spotify.com/track/6MF4tRr5lU8qok8IKaFOBE',
      },
      {
        track: '5',
        url: 'https://open.spotify.com/track/5TCBWmEBrin7etRa4Lswr1',
      },
      {
        track: '6',
        url: 'https://open.spotify.com/track/77KMttn3Lic7ZQKDlPqp8v',
      },
      {
        track: '7',
        url: 'https://open.spotify.com/track/6XH0KeCZ0nRysAeSJYRFFg',
      },
      {
        track: '8',
        url: 'https://open.spotify.com/track/1pRjlrQMZYo1K5i1RcLGs7',
      },
      {
        track: '9',
        url: 'https://open.spotify.com/track/1oOEkBNp4zWnkD7nWjJdog',
      },
      {
        track: '10',
        url: 'https://open.spotify.com/track/15YteXcgC1tRTDrKKclPOp',
      }]);
      expect(result.requestUrl).to.be.eql('https://jshemas.github.io/openGraphScraperPages/spotifyPlayList');
      expect(result.charset).to.be.eql('UTF-8');
      expect(result.fbAppId).to.be.eql('174829003346');
      expect(result.jsonLD).to.be.an('array').and.to.not.be.empty;
      expect(result.success).to.be.eql(true);
      expect(result).to.have.all.keys(
        'favicon',
        'fbAppId',
        'jsonLD',
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
      expect(response).to.be.an('Response');
    });
  });
});
