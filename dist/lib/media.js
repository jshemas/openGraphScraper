"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaSetup = void 0;
const fields_1 = __importDefault(require("./fields"));
const utils_1 = require("./utils");
const mediaMapperTwitterImage = (item) => ({
    alt: item[3],
    height: item[2],
    url: item[0],
    width: item[1],
});
const mediaMapperTwitterPlayer = (item) => ({
    height: item[2],
    stream: item[3],
    url: item[0],
    width: item[1],
});
const mediaMapperMusicSong = (item) => ({
    disc: item[2],
    track: item[1],
    url: item[0],
});
const mediaMapper = (item) => ({
    height: item[2],
    type: item[3],
    url: item[0],
    width: item[1],
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
    }
    if (aExt !== 'gif' && bExt === 'gif') {
        return 1;
    }
    return Math.max(b.width || 0, b.height || 0) - Math.max(a.width || 0, a.height || 0);
};
const mediaSorterMusicSong = (a, b) => {
    if (!(a.track && b.track)) {
        return 0;
    }
    if ((a.disc || 0) > (b.disc || 0)) {
        return 1;
    }
    if ((a.disc || 0) < (b.disc || 0)) {
        return -1;
    }
    return a.track - b.track;
};
// lodash zip replacement
const zip = (array, ...args) => {
    if (array === undefined)
        return [];
    return array
        .map((value, idx) => [value, ...args.map((arr) => arr[idx])]);
};
/**
 * formats the multiple media values
 *
 * @param {object} ogObject - the current ogObject
 * @param {object} options - options for ogs
 * @return {object} object with ogs results with updated media values
 *
 */
function mediaSetup(ogObject) {
    // sets ogImage property/width/height/type to empty array if one these exists
    if (ogObject.ogImageSecureURL
        || ogObject.ogImageURL
        || ogObject.ogImageProperty
        || ogObject.ogImageWidth
        || ogObject.ogImageHeight
        || ogObject.ogImageType) {
        ogObject.ogImageSecureURL = ogObject.ogImageSecureURL ? ogObject.ogImageSecureURL : [];
        ogObject.ogImageURL = ogObject.ogImageURL ? ogObject.ogImageURL : [];
        ogObject.ogImageProperty = ogObject.ogImageProperty ? ogObject.ogImageProperty : [];
        // set ogImageProperty to ogImageSecureURL if it exists
        // eslint-disable-next-line max-len
        ogObject.ogImageProperty = (ogObject.ogImageSecureURL.length !== 0) ? ogObject.ogImageSecureURL : ogObject.ogImageProperty;
        // fall back to ogImageURL if ogImageProperty isn't set
        ogObject.ogImageProperty = (ogObject.ogImageProperty.length !== 0) ? ogObject.ogImageProperty : ogObject.ogImageURL;
        ogObject.ogImageWidth = ogObject.ogImageWidth ? ogObject.ogImageWidth : [];
        ogObject.ogImageHeight = ogObject.ogImageHeight ? ogObject.ogImageHeight : [];
        ogObject.ogImageType = ogObject.ogImageType ? ogObject.ogImageType : [];
    }
    // format images and limit to 10
    const ogImages = zip(ogObject.ogImageProperty, ogObject.ogImageWidth, ogObject.ogImageHeight, ogObject.ogImageType)
        .map(mediaMapper)
        .filter((value) => value.url !== undefined && value.url !== '')
        .filter((value, index) => index < 10)
        .sort(mediaSorter);
    // sets ogVideo property/width/height/type to empty array if one these exists
    if (ogObject.ogVideoProperty || ogObject.ogVideoWidth || ogObject.ogVideoHeight || ogObject.ogVideoType) {
        ogObject.ogVideoProperty = ogObject.ogVideoProperty ? ogObject.ogVideoProperty : [];
        ogObject.ogVideoWidth = ogObject.ogVideoWidth ? ogObject.ogVideoWidth : [];
        ogObject.ogVideoHeight = ogObject.ogVideoHeight ? ogObject.ogVideoHeight : [];
        ogObject.ogVideoType = ogObject.ogVideoType ? ogObject.ogVideoType : [];
    }
    // format videos and limit to 10
    const ogVideos = zip(ogObject.ogVideoProperty, ogObject.ogVideoWidth, ogObject.ogVideoHeight, ogObject.ogVideoType)
        .map(mediaMapper)
        .filter((value) => value.url !== undefined && value.url !== '')
        .filter((value, index) => index < 10)
        .sort(mediaSorter);
    // sets twitter image src/property/width/height/alt to empty array if one these exists
    if (ogObject.twitterImageSrc
        || ogObject.twitterImageProperty
        || ogObject.twitterImageWidth
        || ogObject.twitterImageHeight
        || ogObject.twitterImageAlt) {
        ogObject.twitterImageSrc = ogObject.twitterImageSrc ? ogObject.twitterImageSrc : [];
        // eslint-disable-next-line max-len
        ogObject.twitterImageProperty = ogObject.twitterImageProperty ? ogObject.twitterImageProperty : ogObject.twitterImageSrc; // deafult to twitterImageSrc
        ogObject.twitterImageWidth = ogObject.twitterImageWidth ? ogObject.twitterImageWidth : [];
        ogObject.twitterImageHeight = ogObject.twitterImageHeight ? ogObject.twitterImageHeight : [];
        ogObject.twitterImageAlt = ogObject.twitterImageAlt ? ogObject.twitterImageAlt : [];
    }
    // format twitter images and limit to 10
    const twitterImages = zip(ogObject.twitterImageProperty, ogObject.twitterImageWidth, ogObject.twitterImageHeight, ogObject.twitterImageAlt)
        .map(mediaMapperTwitterImage)
        .filter((value) => value.url !== undefined && value.url !== '')
        .filter((value, index) => index < 10)
        .sort(mediaSorter);
    // sets twitter property/width/height/stream to empty array if one these exists
    if (ogObject.twitterPlayerProperty
        || ogObject.twitterPlayerWidth
        || ogObject.twitterPlayerHeight
        || ogObject.twitterPlayerStream) {
        ogObject.twitterPlayerProperty = ogObject.twitterPlayerProperty ? ogObject.twitterPlayerProperty : [];
        ogObject.twitterPlayerWidth = ogObject.twitterPlayerWidth ? ogObject.twitterPlayerWidth : [];
        ogObject.twitterPlayerHeight = ogObject.twitterPlayerHeight ? ogObject.twitterPlayerHeight : [];
        ogObject.twitterPlayerStream = ogObject.twitterPlayerStream ? ogObject.twitterPlayerStream : [];
    }
    // format twitter player and limit to 10
    const twitterPlayers = zip(ogObject.twitterPlayerProperty, ogObject.twitterPlayerWidth, ogObject.twitterPlayerHeight, ogObject.twitterPlayerStream).map(mediaMapperTwitterPlayer)
        .filter((value) => value.url !== undefined && value.url !== '')
        .filter((value, index) => index < 10)
        .sort(mediaSorter);
    // sets music property/songTrack/songDisc to empty array if one these exists
    if (ogObject.musicSongProperty || ogObject.musicSongTrack || ogObject.musicSongDisc || ogObject.musicSongUrl) {
        ogObject.musicSongUrl = ogObject.musicSongUrl ? ogObject.musicSongUrl : [];
        ogObject.musicSongProperty = ogObject.musicSongProperty ? ogObject.musicSongProperty : ogObject.musicSongUrl; // deafult to musicSongUrl
        ogObject.musicSongTrack = ogObject.musicSongTrack ? ogObject.musicSongTrack : [];
        ogObject.musicSongDisc = ogObject.musicSongDisc ? ogObject.musicSongDisc : [];
    }
    // format music songs and limit to 10
    const musicSongs = zip(ogObject.musicSongProperty, ogObject.musicSongTrack, ogObject.musicSongDisc)
        .map(mediaMapperMusicSong)
        .filter((value) => value.url !== undefined && value.url !== '')
        .filter((value, index) => index < 10)
        .sort(mediaSorterMusicSong);
    // remove old values since everything will live under the main property
    fields_1.default.filter((item) => (item.multiple && item.fieldName && item.fieldName.match('(ogImage|ogVideo|twitter|musicSong).*')))
        .forEach((item) => {
        delete ogObject[item.fieldName];
    });
    if (ogImages.length)
        ogObject.ogImage = ogImages;
    if (ogVideos.length)
        ogObject.ogVideo = ogVideos;
    if (twitterImages.length)
        ogObject.twitterImage = twitterImages;
    if (twitterPlayers.length)
        ogObject.twitterPlayer = twitterPlayers;
    if (musicSongs.length)
        ogObject.musicSong = musicSongs;
    // removes any undefs
    ogObject = (0, utils_1.removeNestedUndefinedValues)(ogObject);
    return ogObject;
}
exports.mediaSetup = mediaSetup;
exports.default = mediaSetup;
