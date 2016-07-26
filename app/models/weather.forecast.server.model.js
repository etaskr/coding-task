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
    constructor(APIKey, requestTimeout, dataCompressed) {
        this._APIKey = APIKey;
        this._requestTimeout = requestTimeout || 8000;
        this._dataCompressed = dataCompressed || false;
        this._url = 'https://api.forecast.io/forecast/' + APIKey + '/';
    }

    get dataCompressed () {
        return this._dataCompressed;
    }

    set dataCompressed (dataCompressed) {
        this._dataCompressed = dataCompressed;
    }

    /**
     * Method to get current weather data
     * 
     * @param  {Number}     latitude
     * @param  {Number}     longitude
     * @param  {Object}     options
     * @param  {Function}   callback
     */
    fetch(latitude, longitude, options, callback) {
        let self = this;

        let queryStringOptions = qs.stringify(options);
        self._url += latitude + ',' + longitude + '?' + queryStringOptions;

        let headers = {};

        if (self._dataCompressed) {
            headers = { 'Accept-Encoding': 'gzip' };
        }

        request.get({
            headers: headers,
            encoding: null,
            uri: self._url, 
            timeout: self.requestTimeout
        },function(err, res, data) {
            if(!err && res.statusCode === 200) {
                let reponseHeaders = res.headers['content-encoding'];

                if (reponseHeaders && reponseHeaders.indexOf('gzip') >= 0) {

                    // decompressing the gzip data 
                    zlib.gunzip(data, function(error, uncompressedData) {
                        if (!error) {
                            callback(null, res, self.convertWeatherForecastDataToWeatherModel(JSON.parse(uncompressedData)));
                        }
                        else {
                            callback(new WeatherForecastError(error), res, null);
                        }
                    });
                }
                else {
                    callback(null, res, self.convertWeatherForecastDataToWeatherModel(JSON.parse(data)));
                }
            } else {
                callback(new WeatherForecastError(err), res, null);
            }
        });
    }

    convertWeatherForecastDataToWeatherModel(weatherForecastData) {
        let weather = new Weather();

        weather._icon = weatherForecastData.currently.icon;
        weather._summary = weatherForecastData.currently.summary;
        weather._temperature = weatherForecastData.currently.temperature;

        return weather;
    }
}

module.exports = WeatherForecast;