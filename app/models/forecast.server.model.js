var request = require('request'),
    qs = require('querystring'),
    ForecastError = require('./forecast.error.server.model');
    
/**
 * Forecast class
 * 
 * @param  {String} APIKey
 * @param  {Number} requestTimeout
 */
function Forecast (APIKey, requestTimeout) {
    this.APIKey = APIKey;
    this.requestTimeout = requestTimeout || 5000;
}

/**
 * Method to build the API url
 * 
 * @param  {Number} latitude
 * @param  {Number} longitude
 * @param  {Object} options
 */
Forecast.prototype.buildUrl = function buildUrl(latitude, longitude, options) {
    var url = 'https://api.forecast.io/forecast/' + this.APIKey + '/' + latitude + ',' + longitude;
    var query = '?units=ca&exclude=minutely,hourly,daily,alerts,flags';

    // querystring module did not work here, don't know why
    // TODO: to be revisited
    // var queryStringOptions = qs.stringify(options);

    return url + query;
};

/**
 * Method to get current weather data
 * 
 * @param  {Number} latitude
 * @param  {Number} longitude
 * @param  {Object} options
 */
Forecast.prototype.fetch = function fetch(latitude, longitude, options, callback) {
    var url = this.buildUrl(latitude, longitude, options);

    request.get({
        // headers: {
        //     'Accept-Encoding': 'gzip'
        // },
        uri: url, 
        timeout: this.requestTimeout 
    },function (err, res, data) {
        if(!err && res.statusCode === 200) {
            callback(null, res, data);
        } else {
        	callback(err, res, null);
        }
    });
};

module.exports = Forecast;