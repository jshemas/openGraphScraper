'use strict';

var _ = require('lodash');
var fields = require('./fields');

/*
 * media setup
 * @param string ogObject - return open open graph info
 * @param string options - options the user has set
 * @param function callback
 */
exports.mediaSetup = function (ogObject, options) {
  /* Combine image/width/height/type
    and sort for priority */
  if (ogObject.ogImage || ogObject.ogImageWidth || ogObject.twitterImageHeight || ogObject.ogImageType) {
    ogObject.ogImage = ogObject.ogImage ? ogObject.ogImage : [null];
    ogObject.ogImageWidth = ogObject.ogImageWidth ? ogObject.ogImageWidth : [null];
    ogObject.ogImageHeight = ogObject.ogImageHeight ? ogObject.ogImageHeight : [null];
    ogObject.ogImageType = ogObject.ogImageType ? ogObject.ogImageType : [null];
  }
  var ogImages = _.zip(ogObject.ogImage,
    ogObject.ogImageWidth,
    ogObject.ogImageHeight,
    ogObject.ogImageType)
    .map(mediaMapper).sort(mediaSorter);

  /* Combine video/width/height/type
    and sort for priority */
  if (ogObject.ogVideo || ogObject.ogVideoWidth || ogObject.ogVideoHeight || ogObject.ogVideoType) {
    ogObject.ogVideo = ogObject.ogVideo ? ogObject.ogVideo : [null];
    ogObject.ogVideoWidth = ogObject.ogVideoWidth ? ogObject.ogVideoWidth : [null];
    ogObject.ogVideoHeight = ogObject.ogVideoHeight ? ogObject.ogVideoHeight : [null];
    ogObject.ogVideoType = ogObject.ogVideoType ? ogObject.ogVideoType : [null];
  }
  var ogVideos = _.zip(ogObject.ogVideo,
    ogObject.ogVideoWidth,
    ogObject.ogVideoHeight,
    ogObject.ogVideoType)
    .map(mediaMapper).sort(mediaSorter);

  /* Combine twitter image/width/height/alt
    and sort for priority */
  if (ogObject.twitterImageSrc || ogObject.twitterImage || ogObject.twitterImageWidth || ogObject.twitterImageHeight || ogObject.twitterImageAlt) {
    ogObject.twitterImage = ogObject.twitterImage ? ogObject.twitterImage : ogObject.twitterImageSrc; // if twitterImage isn't there, try twitterImageSrc
    ogObject.twitterImageWidth = ogObject.twitterImageWidth ? ogObject.twitterImageWidth : [null];
    ogObject.twitterImageHeight = ogObject.twitterImageHeight ? ogObject.twitterImageHeight : [null];
    ogObject.twitterImageAlt = ogObject.twitterImageAlt ? ogObject.twitterImageAlt : [null];
  }
  var twitterImages = _.zip(ogObject.twitterImage,
    ogObject.twitterImageWidth,
    ogObject.twitterImageHeight,
    ogObject.twitterImageAlt)
    .map(mediaMapperTwitterImage).sort(mediaSorter);

  /* Combine twitter player/width/height/stream
    and sort for priority */
  if (ogObject.twitterPlayer || ogObject.twitterPlayerWidth || ogObject.twitterPlayerHeight || ogObject.twitterPlayerStream) {
    ogObject.twitterPlayer = ogObject.twitterPlayer ? ogObject.twitterPlayer : [null];
    ogObject.twitterPlayerWidth = ogObject.twitterPlayerWidth ? ogObject.twitterPlayerWidth : [null];
    ogObject.twitterPlayerHeight = ogObject.twitterPlayerHeight ? ogObject.twitterPlayerHeight : [null];
    ogObject.twitterPlayerStream = ogObject.twitterPlayerStream ? ogObject.twitterPlayerStream : [null];
  }
  var twitterPlayers = _.zip(ogObject.twitterPlayer,
    ogObject.twitterPlayerWidth,
    ogObject.twitterPlayerHeight,
    ogObject.twitterPlayerStream)
    .map(mediaMapperTwitterPlayer).sort(mediaSorter);

  /* Combine music:song url, track, disk
    and sort in the right album order */
  if (ogObject.musicSong || ogObject.musicSongTrack || ogObject.musicSongDisc) {
    ogObject.musicSong = ogObject.musicSong ? ogObject.musicSong : [null];
    ogObject.musicSongTrack = ogObject.musicSongTrack ? ogObject.musicSongTrack : [null];
    ogObject.musicSongDisc = ogObject.musicSongDisc ? ogObject.musicSongDisc : [null];
  }
  var musicSongs = _.zip(ogObject.musicSong,
    ogObject.musicSongTrack,
    ogObject.musicSongDisc)
    .map(mediaMapperMusicSong).sort(mediaSorterMusicSong);

  // Devare temporary fields
  fields.filter(function (item) {
    return (
      item.multiple && (
        item.fieldName.startsWith('ogImage') ||
        item.fieldName.startsWith('ogVideo') ||
        item.fieldName.startsWith('twitter') ||
        item.fieldName.startsWith('musicSong')
      )
    );
  }).forEach(function (item) {
    delete ogObject[item.fieldName];
  });

  // Select the best image
  if (ogImages.length) {
    if (options.allMedia) {
      ogObject.ogImage = ogImages;
    } else {
      ogObject.ogImage = ogImages[0];
    }
  }

  // Select the best video
  if (ogVideos.length) {
    if (options.allMedia) {
      ogObject.ogVideo = ogVideos;
    } else {
      ogObject.ogVideo = ogVideos[0];
    }
  }

  // Select the best twitter image
  if (twitterImages.length) {
    if (options.allMedia) {
      ogObject.twitterImage = twitterImages;
    } else {
      ogObject.twitterImage = twitterImages[0];
    }
  }

  // Select the best player
  if (twitterPlayers.length) {
    if (options.allMedia) {
      ogObject.twitterPlayer = twitterPlayers;
    } else {
      ogObject.twitterPlayer = twitterPlayers[0];
    }
  }

  // Select the best music:song
  if (musicSongs.length) {
    if (options.allMedia) {
      ogObject.musicSong = musicSongs;
    } else {
      ogObject.musicSong = musicSongs[0];
    }
  }

  return ogObject;
};

var mediaMapperTwitterImage = function (item) {
  return {
    url: item[0],
    width: item[1],
    height: item[2],
    alt: item[3]
  };
};

var mediaMapperTwitterPlayer = function (item) {
  return {
    url: item[0],
    width: item[1],
    height: item[2],
    stream: item[3]
  };
};

var mediaMapperMusicSong = function (item) {
  return {
    url: item[0],
    track: item[1],
    disc: item[2]
  };
};

var mediaMapper = function (item) {
  return {
    url: item[0],
    width: item[1],
    height: item[2],
    type: item[3]
  };
};

var mediaSorter = function (a, b) {
  if (!(a.url && b.url)) {
    return 0;
  }

  var aRes = a.url.match(/\.(\w{2,5})$/);
  var aExt = (aRes && aRes[1].toLowerCase()) || null;
  var bRes = b.url.match(/\.(\w{2,5})$/);
  var bExt = (bRes && bRes[1].toLowerCase()) || null;

  if (aExt === 'gif' && bExt !== 'gif') {
    return -1;
  } else if (aExt !== 'gif' && bExt === 'gif') {
    return 1;
  }
  return Math.max(b.width, b.height) - Math.max(a.width, a.height);
};

var mediaSorterMusicSong = function (a, b) {
  if (!(a.track && b.track)) {
    return 0;
  } else if (a.disc > b.disc) {
    return 1;
  } else if (a.disc < b.disc) {
    return -1;
  }
  return a.track - b.track;
};
