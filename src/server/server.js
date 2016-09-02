function WeatherServer(http, request, conf) {
	var that = this;
	
	this.conf = {};
	
	this.config = function(baseUrl, APIKey, port) {
		this.conf.baseUrl = baseUrl;
		this.conf.APIKey = APIKey;
		this.conf.port = port;
	};
	
	this.startServer = function() {
		var server = http.createServer(function(request, response) {
			var result = {temperature: null, iconn: null};
			request
				.on('data', function(chunk) {})
				.on('end', function() {
					var regexpFloat = "[\\-\\+]?(?:\\d*[\\.])?\\d+";
					var rex = '^/('+regexpFloat+'),('+regexpFloat+')$';
					var re = new RegExp(rex);
					var parts = request.url.match(re);
					var statusCode = 400;
					var result = 'Error in request.';
					if (parts!==null) {
						var lat = parseFloat(parts[1]);
						var long = parseFloat(parts[2]);
						that.getWeather(lat, long, function(result) {
							if (result === null) {
								statusCode = 504;
								result = 'Backend weather server failed.';
							} else {
								statusCode = 200;
							}
							that.sendResponse(response, statusCode, result);
						});
					} else {
						this.sendResponse(response, statusCode, result);
					}
				});
		}).listen(that.conf.port);
		console.log('Listening on port ' + that.conf.port);
	};
	
	this.sendResponse = function(response, statusCode, result) {
		response.statusCode = statusCode;
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Content-Type', 'application/json');
		response.write(JSON.stringify(result));
		response.end();
	};
	
	this.createUrl = function(lat, long) {
		var ret = this.conf.baseUrl + this.conf.APIKey + '/' + lat + ',' + long + '?units=si';
		return ret;
	};
	
	this.getWeather = function(lat, long, callback) {
		var url = this.createUrl(lat, long);
		var ret = null;
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var body_obj = JSON.parse(body);
				callback({
					temperature: body_obj.currently.temperature,
					icon: body_obj.currently.icon,
				});
			} else {  // error in fetching the weather data.
				callback(null);
			}
		});
	};
	 
	this.config(conf.baseUrl, conf.APIKey, conf.port);

	return {
		startServer: this.startServer,
	}
};

try {
	var yargs = require('yargs')
		.usage('$0 [--port portnumber] [--apikey apikey] [--help]')
		.nargs('port', 1)
		.nargs('apikey', 1)
		.nargs('help', 0)
		.options({
			'port': {
				alias: 'p',
				default: 9998,
				describe: 'port that the server will be listening',
				type: 'number'
			},
			'apikey': {
				default: '40c8531495eeb343afc0c31d6afbef87',
				describe: 'API Key that is used to communicate with the forecast.io API'
			},
			})
		.example('$0', 'Runs the server with default parameters.')
		.example('$0 --port 1234', 'Runs the server to listen on the port 1234.')
		.example('$0 --apikey fcdcb', 'Runs the server in a way that it communicates with the forecast.io using the "fcdcb" API Key. (It won\'t work because fcdcb is not a valid API Key.')
		.help();
	
	var argv = yargs.argv;
	var conf = {
		baseUrl: 'https://api.forecast.io/forecast/',
		APIKey: argv.apikey,
		port: argv.port
	};

	var request = require('request');
	var http = require('http');
	var WS = new WeatherServer(http, request, conf);
	WS.startServer();
} catch (err) {
	console.log("caught: ", err);
}

