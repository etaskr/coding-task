"use strict";

var request = require('request'),
    qs = require('querystring'),
    zlib = require('zlib'),
    Weather = require('./weather.server.model'),
    WeatherForecastError = require('./weather.forecast.error.server.model');

/**
 * WeatherForecast class
 * 
 */
class WeatherForecast {
    constructor(APIKey, requestTimeout, isCompressedResponse) {
        this._APIKey = APIKey;
        this._requestTimeout = requestTimeout || 8000;
        this._isCompressedResponse = isCompressedResponse;
        this._url = 'https://api.forecast.io/forecast/' + APIKey + '/';
    }

    /**
     * Method to get current weather data
     * 
     * @param  {Number}     latitude
     * @param  {Number}     longitude
     * @param  {Object}     options
     * @param  {Function}   callback
     */
    fetch (latitude, longitude, options, callback) {
        let queryStringOptions = qs.stringify(options);
        this._url += latitude + ',' + longitude + '?' + queryStringOptions;

        let headers = {};

        if (this._isCompressedResponse) {
            headers = { 'Accept-Encoding': 'gzip' };
        }

        request.get({
            headers: headers,
            encoding: null,
            uri: this._url, 
            timeout: this.requestTimeout
        },function (err, res, data) {
            if(!err && res.statusCode === 200) {
                let reponseHeaders = res.headers['content-encoding'];

                if (reponseHeaders && reponseHeaders.indexOf('gzip') >= 0) {

                    // decompressing the gzip data 
                    zlib.gunzip(data, function(error, uncompressedData) {
                        if (!error) {
                            callback(null, res, new Weather(JSON.parse(uncompressedData)));
                        }
                        else {
                            callback(new WeatherForecastError(error), res, null);
                        }
                    });
                }
                else {
                    callback(null, res, new Weather(JSON.parse(data)));
                }
            } else {
                callback(new WeatherForecastError(err), res, null);
            }
        });
    }
}

module.exports = WeatherForecast;