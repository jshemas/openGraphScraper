const fields = require('./fields');

const mediaMapperTwitterImage = (item) => ({
  url: item[0],
  width: item[1],
  height: item[2],
  alt: item[3],
});

const mediaMapperTwitterPlayer = (item) => ({
  url: item[0],
  width: item[1],
  height: item[2],
  stream: item[3],
});

const mediaMapperMusicSong = (item) => ({
  url: item[0],
  track: item[1],
  disc: item[2],
});

const mediaMapper = (item) => ({
  url: item[0],
  width: item[1],
  height: item[2],
  type: item[3],
});

const mediaSorter = (a, b) => {
  if (!(a.url && b.url)) {
    return 0;
  }

  const aRes = a.url.match(/\.(\w{2,5})$/);
  const aExt = (aRes && aRes[1].toLowerCase()) || null;
  const bRes = b.url.match(/\.(\w{2,5})$/);
  const bExt = (bRes && bRes[1].toLowerCase()) || null;

  if (aExt === 'gif' && bExt !== 'gif') {
    return -1;
  } if (aExt !== 'gif' && bExt === 'gif') {
    return 1;
  }
  return Math.max(b.width, b.height) - Math.max(a.width, a.height);
};

const mediaSorterMusicSong = (a, b) => {
  if (!(a.track && b.track)) {
    return 0;
  } if (a.disc > b.disc) {
    return 1;
  } if (a.disc < b.disc) {
    return -1;
  }
  return a.track - b.track;
};

// lodash zip replacement
const zip = (array, ...args) => {
  if (array === undefined) return [];
  return array
    .map((value, idx) => [value, ...args.map((arr) => arr[idx])]);
};

/*
 * media setup
 * @param string ogObject - return open open graph info
 * @param string options - options the user has set
 * @param function callback
 */
exports.mediaSetup = (ogObject, options) => {
  /* Combine image/width/height/type
    and sort for priority */
  if (ogObject.ogImage
    || ogObject.ogImageWidth
    || ogObject.twitterImageHeight
    || ogObject.ogImageType) {
    ogObject.ogImage = ogObject.ogImage ? ogObject.ogImage : [null];
    ogObject.ogImageWidth = ogObject.ogImageWidth ? ogObject.ogImageWidth : [null];
    ogObject.ogImageHeight = ogObject.ogImageHeight ? ogObject.ogImageHeight : [null];
    ogObject.ogImageType = ogObject.ogImageType ? ogObject.ogImageType : [null];
  }

  const ogImages = zip(ogObject.ogImage,
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

  const ogVideos = zip(ogObject.ogVideo,
    ogObject.ogVideoWidth,
    ogObject.ogVideoHeight,
    ogObject.ogVideoType)
    .map(mediaMapper).sort(mediaSorter);

  /* Combine twitter image/width/height/alt
    and sort for priority */
  if (ogObject.twitterImageSrc
    || ogObject.twitterImage
    || ogObject.twitterImageWidth
    || ogObject.twitterImageHeight
    || ogObject.twitterImageAlt) {
    // if twitterImage isn't there, try twitterImageSrc
    ogObject.twitterImage = ogObject.twitterImage ? ogObject.twitterImage : ogObject.twitterImageSrc;
    ogObject.twitterImageWidth = ogObject.twitterImageWidth ? ogObject.twitterImageWidth : [null];
    ogObject.twitterImageHeight = ogObject.twitterImageHeight ? ogObject.twitterImageHeight : [null];
    ogObject.twitterImageAlt = ogObject.twitterImageAlt ? ogObject.twitterImageAlt : [null];
  }

  const twitterImages = zip(ogObject.twitterImage,
    ogObject.twitterImageWidth,
    ogObject.twitterImageHeight,
    ogObject.twitterImageAlt)
    .map(mediaMapperTwitterImage).sort(mediaSorter);

  /* Combine twitter player/width/height/stream
    and sort for priority */
  if (ogObject.twitterPlayer
    || ogObject.twitterPlayerWidth
    || ogObject.twitterPlayerHeight
    || ogObject.twitterPlayerStream) {
    ogObject.twitterPlayer = ogObject.twitterPlayer ? ogObject.twitterPlayer : [null];
    ogObject.twitterPlayerWidth = ogObject.twitterPlayerWidth ? ogObject.twitterPlayerWidth : [null];
    ogObject.twitterPlayerHeight = ogObject.twitterPlayerHeight ? ogObject.twitterPlayerHeight : [null];
    ogObject.twitterPlayerStream = ogObject.twitterPlayerStream ? ogObject.twitterPlayerStream : [null];
  }

  const twitterPlayers = zip(ogObject.twitterPlayer,
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

  const musicSongs = zip(ogObject.musicSong,
    ogObject.musicSongTrack,
    ogObject.musicSongDisc)
    .map(mediaMapperMusicSong).sort(mediaSorterMusicSong);

  // Devare temporary fields
  fields.filter((item) => (
    item.multiple && (
      item.fieldName.startsWith('ogImage')
        || item.fieldName.startsWith('ogVideo')
        || item.fieldName.startsWith('twitter')
        || item.fieldName.startsWith('musicSong')
    )
  )).forEach((item) => {
    delete ogObject[item.fieldName];
  });

  // Select the best image
  if (ogImages.length) {
    if (options.allMedia) {
      ogObject.ogImage = ogImages;
    } else {
      [ogObject.ogImage] = ogImages;
    }
  }

  // Select the best video
  if (ogVideos.length) {
    if (options.allMedia) {
      ogObject.ogVideo = ogVideos;
    } else {
      [ogObject.ogVideo] = ogVideos;
    }
  }

  // Select the best twitter image
  if (twitterImages.length) {
    if (options.allMedia) {
      ogObject.twitterImage = twitterImages;
    } else {
      [ogObject.twitterImage] = twitterImages;
    }
  }

  // Select the best player
  if (twitterPlayers.length) {
    if (options.allMedia) {
      ogObject.twitterPlayer = twitterPlayers;
    } else {
      [ogObject.twitterPlayer] = twitterPlayers;
    }
  }

  // Select the best music:song
  if (musicSongs.length) {
    if (options.allMedia) {
      ogObject.musicSong = musicSongs;
    } else {
      [ogObject.musicSong] = musicSongs;
    }
  }

  return ogObject;
};
