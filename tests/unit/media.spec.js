/* eslint  no-undefined: 0 */

'use strict';

var media = require('../../lib/media');
var expect = require('expect.js');

describe('media', function () {
  describe('media', function () {
    it('media setup', function (done) {
      var ogMedia = media.mediaSetup({
        ogTitle: 'test site',
        ogType: 'website',
        ogUrl: 'http://test.com/',
        ogImage: [ 'http://test.com/logo.png' ],
        ogImageType: [ 'image/png' ],
        ogImageWidth: [ '300' ],
        ogImageHeight: [ '300' ],
        twitterImage: [ 'http://test.com/logo.png' ],
        twitterImageAlt: [ 'image/png' ],
        twitterImageWidth: [ '300' ],
        twitterImageHeight: [ '300' ],
        ogDescription: 'stuff'
      }, {
        url: 'http://test.com/'
      });
      expect(ogMedia.ogImage).to.eql({
        url: 'http://test.com/logo.png',
        width: '300',
        height: '300',
        type: 'image/png'
      });
      expect(ogMedia.twitterImage).to.eql({
        url: 'http://test.com/logo.png',
        width: '300',
        height: '300',
        alt: 'image/png'
      });
      done();
    });
    it('media setup - no image or video', function (done) {
      var ogMedia = media.mediaSetup({
        ogTitle: 'test site',
        ogType: 'website',
        ogUrl: 'http://test.com/',
        ogDescription: 'stuff'
      }, {
        url: 'http://test.com/'
      });
      expect(ogMedia.ogImage).to.eql(undefined);
      expect(ogMedia.twitterImage).to.eql(undefined);
      expect(ogMedia.ogVideo).to.eql(undefined);
      expect(ogMedia.twitterPlayer).to.eql(undefined);
      done();
    });
    it('media setup - has video', function (done) {
      var ogMedia = media.mediaSetup({
        ogTitle: 'test site',
        ogType: 'website',
        ogUrl: 'http://test.com/',
        ogVideo: [ 'http://test.com/logo.png' ],
        ogVideoType: [ 'image/png' ],
        ogVideoWidth: [ '300' ],
        ogVideoHeight: [ '300' ],
        twitterPlayer: [ 'http://test.com/logo.png' ],
        twitterPlayerStream: [ 'image/png' ],
        twitterPlayerWidth: [ '300' ],
        twitterPlayerHeight: [ '300' ],
        ogDescription: 'stuff'
      }, {
        url: 'http://test.com/'
      });
      expect(ogMedia.ogVideo).to.eql({
        url: 'http://test.com/logo.png',
        width: '300',
        height: '300',
        type: 'image/png'
      });
      expect(ogMedia.twitterPlayer).to.eql({
        url: 'http://test.com/logo.png',
        width: '300',
        height: '300',
        stream: 'image/png'
      });
      done();
    });
    it('media setup - has music:song', function (done) {
      var ogMedia = media.mediaSetup({
        ogTitle: 'test site',
        ogType: 'website',
        ogUrl: 'http://test.com/',
        musicSong: [ 'http://test.com/songurl' ],
        musicSongTrack: [ '1' ],
        musicSongDisc: [ '1' ],
        ogDescription: 'stuff'
      }, {
        url: 'http://test.com/'
      });
      expect(ogMedia.musicSong).to.eql({
        url: 'http://test.com/songurl',
        track: '1',
        disc: '1'
      });
      done();
    });
    it('media setup - has multiple music:songs with allMedia set to true', function (done) {
      var ogMedia = media.mediaSetup({
        ogTitle: 'test site',
        ogType: 'website',
        ogUrl: 'http://test.com/',
        musicSong: [ 'http://test.com/songurl', 'http://test.com/songurl3', 'http://test.com/songurl2' ],
        musicSongTrack: [ '1', '2', '4' ],
        musicSongDisc: [ '1', '2', '1' ],
        ogDescription: 'stuff'
      }, {
        url: 'http://test.com/',
        allMedia: true
      });
      expect(ogMedia.musicSong).to.eql([{
        url: 'http://test.com/songurl',
        track: '1',
        disc: '1'
      },
      {
        url: 'http://test.com/songurl2',
        track: '4',
        disc: '1'
      },
      {
        url: 'http://test.com/songurl3',
        track: '2',
        disc: '2'
      }]);
      done();
    });
    it('media setup - allMedia set to true', function (done) {
      var ogMedia = media.mediaSetup({
        ogTitle: 'test site',
        ogType: 'website',
        ogUrl: 'http://test.com/',
        ogImage: [ 'http://test.com/logo.png' ],
        ogImageType: [ 'image/png' ],
        ogImageWidth: [ '300' ],
        ogImageHeight: [ '300' ],
        twitterImage: [ 'http://test.com/logo.png' ],
        twitterImageAlt: [ 'image/png' ],
        twitterImageWidth: [ '300' ],
        twitterImageHeight: [ '300' ],
        ogVideo: [ 'http://test.com/logo.png' ],
        ogVideoType: [ 'image/png' ],
        ogVideoWidth: [ '300' ],
        ogVideoHeight: [ '300' ],
        twitterPlayer: [ 'http://test.com/logo.png' ],
        twitterPlayerStream: [ 'image/png' ],
        twitterPlayerWidth: [ '300' ],
        twitterPlayerHeight: [ '300' ],
        ogDescription: 'stuff'
      }, {
        url: 'http://test.com/',
        allMedia: true
      });
      expect(ogMedia.ogImage).to.eql([{
        url: 'http://test.com/logo.png',
        width: '300',
        height: '300',
        type: 'image/png'
      }]);
      expect(ogMedia.twitterImage).to.eql([{
        url: 'http://test.com/logo.png',
        width: '300',
        height: '300',
        alt: 'image/png'
      }]);
      expect(ogMedia.ogVideo).to.eql([{
        url: 'http://test.com/logo.png',
        width: '300',
        height: '300',
        type: 'image/png'
      }]);
      expect(ogMedia.twitterPlayer).to.eql([{
        url: 'http://test.com/logo.png',
        width: '300',
        height: '300',
        stream: 'image/png'
      }]);
      done();
    });
  });
});
