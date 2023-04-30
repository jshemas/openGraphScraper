const media = require('../../lib/media');

describe('media', function () {
  it('has images and twitter images', function () {
    const ogMedia = media.mediaSetup({
      ogImageProperty: ['http://test.com/logo.png'],
      ogImageType: ['image/png'],
      ogImageWidth: ['300'],
      ogImageHeight: ['300'],
      twitterImageProperty: ['http://test.com/logo.png'],
      twitterImageAlt: ['image/png'],
      twitterImageWidth: ['300'],
      twitterImageHeight: ['300'],
    });

    expect(ogMedia.ogImage).to.eql([{
      url: 'http://test.com/logo.png',
      width: '300',
      height: '300',
      type: 'image/png',
    }]);

    expect(ogMedia.twitterImage).to.eql([{
      url: 'http://test.com/logo.png',
      width: '300',
      height: '300',
      alt: 'image/png',
    }]);
  });
  it('has image with ogImageSecureURL/ogImageURL/ogImageProperty', function () {
    const ogMedia = media.mediaSetup({
      ogImageSecureURL: ['https://test.com/logo.png'],
      ogImageURL: ['http://test.com/logoTwo.png'],
      ogImageProperty: ['http://test.com/logo.png'],
      ogImageType: ['image/png'],
      ogImageWidth: ['300'],
      ogImageHeight: ['300'],
    });

    expect(ogMedia.ogImage).to.eql([{
      url: 'https://test.com/logo.png',
      width: '300',
      height: '300',
      type: 'image/png',
    }]);
  });
  it('has image with ogImageURL/ogImageProperty', function () {
    const ogMedia = media.mediaSetup({
      ogImageURL: ['http://test.com/logoTwo.png'],
      ogImageProperty: ['http://test.com/logo.png'],
      ogImageType: ['image/png'],
      ogImageWidth: ['300'],
      ogImageHeight: ['300'],
    });

    expect(ogMedia.ogImage).to.eql([{
      url: 'http://test.com/logo.png',
      width: '300',
      height: '300',
      type: 'image/png',
    }]);
  });
  it('has image with ogImageURL', function () {
    const ogMedia = media.mediaSetup({
      ogImageURL: ['http://test.com/logoTwo.png'],
      ogImageType: ['image/png'],
      ogImageWidth: ['300'],
      ogImageHeight: ['300'],
    });

    expect(ogMedia.ogImage).to.eql([{
      url: 'http://test.com/logoTwo.png',
      width: '300',
      height: '300',
      type: 'image/png',
    }]);
  });
  it('has many images and twitter images', function () {
    const ogMedia = media.mediaSetup({
      ogImageProperty: ['http://test.com/logo_one.png', 'http://test.com/logo_two.png', 'http://test.com/logo_three.png', '', undefined],
      ogImageType: ['image/png', 'image/png', 'image/png'],
      ogImageWidth: ['300'],
      ogImageHeight: ['300'],
      twitterImageProperty: ['http://test.com/logo_one.png', 'http://test.com/logo_two.png', 'http://test.com/logo_three.png', ''],
      twitterImageAlt: ['image/png', 'image/png', 'image/png'],
      twitterImageWidth: ['300'],
      twitterImageHeight: ['300'],
    });

    expect(ogMedia.ogImage).to.eql([{
      url: 'http://test.com/logo_one.png',
      width: '300',
      height: '300',
      type: 'image/png',
    }, {
      url: 'http://test.com/logo_two.png',
      width: undefined,
      height: undefined,
      type: 'image/png',
    }, {
      url: 'http://test.com/logo_three.png',
      width: undefined,
      height: undefined,
      type: 'image/png',
    }]);

    expect(ogMedia.twitterImage).to.eql([{
      url: 'http://test.com/logo_one.png',
      width: '300',
      height: '300',
      alt: 'image/png',
    }, {
      url: 'http://test.com/logo_two.png',
      width: undefined,
      height: undefined,
      alt: 'image/png',
    }, {
      url: 'http://test.com/logo_three.png',
      width: undefined,
      height: undefined,
      alt: 'image/png',
    }]);
  });
  it('has a .gif images and twitter images', function () {
    const ogMedia = media.mediaSetup({
      ogImageProperty: ['http://test.com/logo_one.png', 'http://test.com/logo_two.gif'],
      ogImageType: ['image/png', 'image/gif'],
      ogImageWidth: ['300', '600'],
      ogImageHeight: ['300', '600'],
      twitterImageProperty: ['http://test.com/logo_two.gif', 'http://test.com/logo_one.png'],
      twitterImageAlt: ['image/gif', 'image/png'],
      twitterImageWidth: ['300', '600'],
      twitterImageHeight: ['300', '600'],
    });

    expect(ogMedia.ogImage).to.eql([{
      url: 'http://test.com/logo_two.gif',
      type: 'image/gif',
      width: '600',
      height: '600',
    }, {
      url: 'http://test.com/logo_one.png',
      type: 'image/png',
      width: '300',
      height: '300',
    }]);

    expect(ogMedia.twitterImage).to.eql([{
      url: 'http://test.com/logo_two.gif',
      alt: 'image/gif',
      width: '300',
      height: '300',
    }, {
      url: 'http://test.com/logo_one.png',
      alt: 'image/png',
      width: '600',
      height: '600',
    }]);
  });
  it('has no image or video', function () {
    const ogMedia = media.mediaSetup({
      ogTitle: 'test site',
      ogType: 'website',
      ogUrl: 'http://test.com/',
      ogDescription: 'stuff',
    });

    expect(ogMedia.ogImage).to.eql(undefined);
    expect(ogMedia.twitterImage).to.eql(undefined);
    expect(ogMedia.ogVideo).to.eql(undefined);
    expect(ogMedia.twitterPlayer).to.eql(undefined);
  });
  it('has video and twitter video', function () {
    const ogMedia = media.mediaSetup({
      ogVideoProperty: ['http://test.com/logo.png'],
      ogVideoType: ['image/png'],
      ogVideoWidth: ['300'],
      ogVideoHeight: ['300'],
      twitterPlayerProperty: ['http://test.com/logo.png'],
      twitterPlayerStream: ['image/png'],
      twitterPlayerWidth: ['300'],
      twitterPlayerHeight: ['300'],
    });

    expect(ogMedia.ogVideo).to.eql([{
      url: 'http://test.com/logo.png',
      width: '300',
      height: '300',
      type: 'image/png',
    }]);

    expect(ogMedia.twitterPlayer).to.eql([{
      url: 'http://test.com/logo.png',
      width: '300',
      height: '300',
      stream: 'image/png',
    }]);
  });
  it('has music:song', function () {
    const ogMedia = media.mediaSetup({
      musicSongProperty: ['http://test.com/songurl'],
      musicSongTrack: ['1'],
      musicSongDisc: ['1'],
    });

    expect(ogMedia.musicSong).to.eql([{
      url: 'http://test.com/songurl',
      track: '1',
      disc: '1',
    }]);
  });
  it('has multiple music:songs', function () {
    const ogMedia = media.mediaSetup({
      musicSongProperty: ['http://test.com/songurl', 'http://test.com/songurl3', 'http://test.com/songurl2', ''],
      musicSongTrack: ['1', '2', '4', ''],
      musicSongDisc: ['1', '2', '1', ''],
    });

    expect(ogMedia.musicSong).to.eql([{
      url: 'http://test.com/songurl',
      track: '1',
      disc: '1',
    },
    {
      url: 'http://test.com/songurl2',
      track: '4',
      disc: '1',
    },
    {
      url: 'http://test.com/songurl3',
      track: '2',
      disc: '2',
    }]);
  });
  it('has ogImageProperty/twitterImage/ogVideo/twitterPlayer', function () {
    const ogMedia = media.mediaSetup({
      ogImageProperty: ['http://test.com/logo.png'],
      ogImageType: ['image/png'],
      ogImageWidth: ['300'],
      ogImageHeight: ['300'],
      twitterImageProperty: ['http://test.com/logo.png'],
      twitterImageAlt: ['image/png'],
      twitterImageWidth: ['300'],
      twitterImageHeight: ['300'],
      ogVideoProperty: ['http://test.com/logo.png'],
      ogVideoType: ['image/png'],
      ogVideoWidth: ['300'],
      ogVideoHeight: ['300'],
      twitterPlayerProperty: ['http://test.com/logo.png'],
      twitterPlayerStream: ['image/png'],
      twitterPlayerWidth: ['300'],
      twitterPlayerHeight: ['300'],
    });

    expect(ogMedia.ogImage).to.eql([{
      url: 'http://test.com/logo.png',
      width: '300',
      height: '300',
      type: 'image/png',
    }]);

    expect(ogMedia.twitterImage).to.eql([{
      url: 'http://test.com/logo.png',
      width: '300',
      height: '300',
      alt: 'image/png',
    }]);

    expect(ogMedia.ogVideo).to.eql([{
      url: 'http://test.com/logo.png',
      width: '300',
      height: '300',
      type: 'image/png',
    }]);

    expect(ogMedia.twitterPlayer).to.eql([{
      url: 'http://test.com/logo.png',
      width: '300',
      height: '300',
      stream: 'image/png',
    }]);
  });
  it('has more then 10 images', function () {
    const ogMedia = media.mediaSetup({
      ogImageProperty: ['http://test.com/logo1.png', 'http://test.com/logo2.png', 'http://test.com/logo3.png', 'http://test.com/logo4.png', 'http://test.com/logo5.png', 'http://test.com/logo6.png', 'http://test.com/logo7.png', 'http://test.com/logo8.png', 'http://test.com/logo9.png', 'http://test.com/logo10.png', 'http://test.com/logo11.png'],
      ogImageType: ['image/png', 'image/png', 'image/png', 'image/png', 'image/png', 'image/png', 'image/png', 'image/png', 'image/png', 'image/png', 'image/png'],
      ogImageWidth: ['300', '300', '300', '300', '300', '300', '300', '300', '300', '300', '300'],
      ogImageHeight: ['300', '300', '300', '300', '300', '300', '300', '300', '300', '300', '300'],
    });

    expect(ogMedia.ogImage).to.eql([
      {
        url: 'http://test.com/logo1.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
      {
        url: 'http://test.com/logo2.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
      {
        url: 'http://test.com/logo3.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
      {
        url: 'http://test.com/logo4.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
      {
        url: 'http://test.com/logo5.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
      {
        url: 'http://test.com/logo6.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
      {
        url: 'http://test.com/logo7.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
      {
        url: 'http://test.com/logo8.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
      {
        url: 'http://test.com/logo9.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
      {
        url: 'http://test.com/logo10.png',
        width: '300',
        height: '300',
        type: 'image/png',
      },
    ]);
  });
});
