module.exports = function(app, request, cheerio) {

	// define utils
	var validateVar = require('./utils.js').validateVar,
		validateUrl = require('./utils.js').validateUrl,
		getOG = require('./utils.js').getOG;

	/*
	* GET getOG - Get Open Graph info
	*/
	app.get('/getOG', function(req, res){
		var url = req.param('url');
		if(validateVar(url)){
			url = validateUrl(url);
			getOG(url, request, cheerio, function(results) {
				if(results.success){
					res.json({
						data: results,
						success: true
					});
				}else{
					if(results.code == 'ENOTFOUND'){
						res.json({
							error: 'Page Not Found',
							success: false
						});
					}else{
						res.json({
							error: results,
							success: false
						});
					}
				};
			});
		}else{
			res.json({
				success: false,
				error: 'Invalid URL'
			});
		};
		return;
	});
};