var request = require('request'),
	cheerio = require('cheerio'),
	_ = require('lodash');

module.exports = function(options, callback){
	exports.getInfo(options, function(err,results){
		callback(err,results);
	});
};

var fieldsArray = [{
    multiple: false,
    property: 'og:title',
    fieldName: 'ogTitle'
}, {
    multiple: false,
    property: 'og:type',
    fieldName: 'ogType'
}, {
    multiple: true,
    property: 'og:image',
    fieldName: 'ogImage'
}, {
    multiple: true,
    property: 'og:image:width',
    fieldName: 'ogImageWidth'
}, {
    multiple: true,
    property: 'og:image:height',
    fieldName: 'ogImageHeight'
}, {
    multiple: true,
    property: 'og:image:type',
    fieldName: 'ogImageType'
}, {
    multiple: false,
    property: 'og:url',
    fieldName: 'ogUrl'
}, {
    multiple: false,
    property: 'og:audio',
    fieldName: 'ogAudio'
}, {
    multiple: false,
    property: 'og:description',
    fieldName: 'ogDescription'
}, {
    multiple: false,
    property: 'og:determiner',
    fieldName: 'ogDeterminer'
}, {
    multiple: false,
    property: 'og:locale',
    fieldName: 'ogLocale'
}, {
    multiple: false,
    property: 'og:locale:alternate',
    fieldName: 'ogLocaleAlternate'
}, {
    multiple: false,
    property: 'og:site_name',
    fieldName: 'ogSiteName'
}, {
    multiple: true,
    property: 'og:video',
    fieldName: 'ogVideo'
}, {
    multiple: true,
    property: 'og:video:width',
    fieldName: 'ogVideoWidth'
}, {
    multiple: true,
    property: 'og:video:height',
    fieldName: 'ogVideoHeight'
}, {
    multiple: true,
    property: 'og:video:type',
    fieldName: 'ogVideoType'
}];

var mediaMapper = function(item) {
    return {
        url: item[0],
        width: item[1],
        height: item[2],
        type: item[3]
    }
};

var mediaSorter = function(a, b) {
    if (!(a.url && b.url))
        return 0;

    var aRes = a.url.match(/\.(\w{2,5})$/),
        aExt = (aRes && aRes[1].toLowerCase()) || null;
    var bRes = b.url.match(/\.(\w{2,5})$/),
        bExt = (bRes && bRes[1].toLowerCase()) || null;

    if (aExt == 'gif' && bExt != 'gif')
        return -1;
    else if (aExt != 'gif' && bExt == 'gif')
        return 1;
    else
        return Math.max(b.width, b.height) - Math.max(a.width, a.height);
};

/*
 * get info
 * @param string url - user input of url
 * @param function callback
 */
exports.getInfo = function(options, callback){
	var error = null, returnResule = {};
	that = this;
	this.validateVars(options.url, options.timeout, function(inputUrlFlag, inputUrl, inputTimeoutFlag, inputTimeout){
		if(inputUrlFlag && inputUrlFlag == true && inputTimeoutFlag && inputTimeoutFlag == true){
			options.url = inputUrl;
			options.timeout = inputTimeout;
			that.getOG(options, function(err, results) {
				if(results && results.success){
					returnResule = {
						data: results,
						success: true
					};
				}else{
					if(err && (err.code == 'ENOTFOUND' || err.code == 'EHOSTUNREACH')){
						error = 'err';
						returnResule = {
							err: 'Page Not Found',
							success: false
						};
					} else if(err && err.code == 'ETIMEDOUT'){
						error = 'err';
						returnResule = {
							err: 'Time Out',
							success: false
						};
					}else{
						error = 'err';
						returnResule = {
							err: 'Page Not Found',
							success: false
						};
					}
				};
				callback(error,returnResule);
			});
		}else{
			callback('err',{
				success: false,
				err: 'Invalid URL'
			});
		};
	});
};

/*
 * validate var
 * @param string var - user input
 * @param function callback
 */
exports.validateVars = function(inputUrl, inputTimeout, callback) {
	var returnInputUrl,returnInputUrlFlag,returnInputTimeout,returnInputTimeoutFlag;
	if ( inputUrl == null || inputUrl.length < 1 || typeof inputUrl === 'undefined' || !inputUrl) {
		returnInputUrlFlag = false;
		returnInputUrl = '';
	} else {
		returnInputUrlFlag = true;
		returnInputUrl = this.validateUrl(inputUrl)
	};
	if ( inputTimeout == null || inputTimeout.length < 1 || typeof inputTimeout === 'undefined' || !inputTimeout) {
		returnInputTimeoutFlag = true;
		returnInputTimeout = 2000; //time default to 2000ms
	} else {
		if(this.validateTimeout(inputTimeout)){
			returnInputTimeoutFlag = true;
			returnInputTimeout = inputTimeout;
		} else {
			returnInputTimeoutFlag = true;
			returnInputTimeout = 2000; //time default to 2000ms
		}
	};
	callback(returnInputUrlFlag, returnInputUrl, returnInputTimeoutFlag, returnInputTimeout)
};

/*
 * validate url - all urls must have http:// in front of them
 * @param string var - the url we want to scrape
 * @param function callback
 */
exports.validateUrl = function(inputUrl) {
	if(!/^(f|ht)tps?:\/\//i.test(inputUrl)) {
		inputUrl = "http://" + inputUrl;
	};
	return inputUrl;
};

/*
 * validate timeout - how long should we wait for a request
 * @param number var - the time we want to wait
 * @param function callback
 */
exports.validateTimeout = function(inputTimeout) {
	if(!/^\d{1,10}$/.test(inputTimeout)) {
		return false;
	};
	return true;
};

/*
 * getOG - scrape that url!
 * @param string url - the url we want to scrape
 * @param function callback
 */
exports.getOG = function(options, callback) {
	request(options, function(err, response, body) {
		if(err){
			callback(err, null);
		} else {
			var $ = cheerio.load(body),
				meta = $('meta'),
				keys = Object.keys(meta),
				ogObject = {};

			//able to get og info
			ogObject.success = 'true';

			keys.forEach(function(key){
				if(!(meta[key].attribs && meta[key].attribs.property))
					return;

				var property = meta[key].attribs.property,
				content = meta[key].attribs.content;

				fieldsArray.forEach(function(item){
					if (property === item.property){
						if(!item.multiple)
							ogObject[item.fieldName] = content;
						else if(!ogObject[item.fieldName])
							ogObject[item.fieldName] = [content];
						else if(Array.isArray(ogObject[item.fieldName]))
							ogObject[item.fieldName].push(content);
					};
				});
			});

			/* Combine image/width/height/type
				and sort for priority */
			var ogImages = _.zip(ogObject.ogImage,
					ogObject.ogImageWidth,
					ogObject.ogImageHeight,
					ogObject.ogImageType)
				.map(mediaMapper).sort(mediaSorter);

			/* Combine video/width/height/type
				and sort for priority */
			var ogVideos = _.zip(ogObject.ogVideo,
					ogObject.ogVideoWidth,
					ogObject.ogVideoHeight,
					ogObject.ogVideoType)
				.map(mediaMapper).sort(mediaSorter);

			// Delete temporary fields
			fieldsArray.filter(function(item){
				return item.multiple;
			}).forEach(function(item) {
				delete ogObject[item.fieldName];
			});

			// Select the best image
			if (ogImages.length)
				ogObject.ogImage = ogImages[0];

			// Select the best video
			if (ogVideos.length)
				ogObject.ogVideo = ogVideos[0];

			//example of how to get the title tag
			// $('title').map(function(i, info) {
			// 	console.log('title:',info.children[0].data);
			// });
			//console.log('ogObject',ogObject);
			callback(null,ogObject);
		};
	});
};
