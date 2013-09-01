/*
 * validate var
 * @param string var - user input
 * @param function callback
 */
exports.validateVar = function(inputVar, callback) {
	if ( inputVar == null || inputVar.length < 1 || typeof inputVar === 'undefined' || !inputVar) {
		return false;
	} else {
		return true;
	};
};

/*
 * validate url - all urls must have http:// in front of them
 * @param string var - the url we want to scrape
 * @param function callback
 */
exports.validateUrl = function(inputUrl, callback) {
	if(!/^(f|ht)tps?:\/\//i.test(inputUrl)) {
      inputUrl = "http://" + inputUrl;
   };
   return inputUrl;
};

/*
 * getOG - scrape that url!
 * @param string url - the url we want to scrape
 * @param function callback
 */
exports.getOG = function(url, request, cheerio, callback) {
	request(url, function(err, response, body) {
		if(err){
			//console.log('err in  getOG:',err);
			callback(err);
		};
		var $ = cheerio.load(body),
			meta = $('meta'),
			keys = Object.keys(meta),
			ogObject = {};

		//able to get og info
		ogObject.success = 'true';

		keys.forEach(function(key){
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:title'){
				ogObject.ogTitle = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:type'){
				ogObject.ogType = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:image'){
				ogObject.ogImage = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:url'){
				ogObject.ogUrl = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:audio'){
				ogObject.ogAudio = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:description'){
				ogObject.ogDescription = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:determiner'){
				ogObject.ogDeterminer = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:locale'){
				ogObject.ogLocale = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:locale:alternate'){
				ogObject.ogLocaleAlternate = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:site_name'){
				ogObject.ogSiteName = meta[key].attribs.content;
			};
			if(meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:video'){
				ogObject.ogVideo = meta[key].attribs.content;
			};
		});

		//example of how to get the title tag 
		// $('title').map(function(i, info) {
		// 	console.log('title:',info.children[0].data);
		// });

		//console.log('ogObject',ogObject);

		callback(ogObject);
	});
};
