var express = require('express'),
	request = require('request'),
	cheerio = require('cheerio'),
	app = express();

// configure Express
app.configure(function() {
	app.use(app.router);
});

// set routes
var routes = require(__dirname + '/routes/main.js')(app, request, cheerio);

// run on port 8080
app.listen(8080);
console.log("Server Running!");
