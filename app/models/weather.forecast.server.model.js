(function() {
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
    constructor(APIKey, requestTimeout) {
        this._APIKey = APIKey;
        this._requestTimeout = requestTimeout || 8000;
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
        let headers = {};

        if (typeof options !== 'undefined' && options !== null &&
            typeof options.compressed !== 'undefined' && options.compressed) {
            headers = { 'Accept-Encoding': 'gzip' };
        }

        let url = self.buildUrl(latitude, longitude, options);

        request.get({
            headers: headers,
            encoding: null,
            uri: url, 
            timeout: self._requestTimeout
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

    buildUrl(latitude, longitude, options) {
        let url = 'https://api.forecast.io/forecast/' + this._APIKey + '/' + latitude + ',' + longitude;
        
        if (typeof options !== 'undefined' && options !== null) {
            url += '?units=' + options.unit;

            if (typeof options.exclude !== 'undefined' && options.exclude !== null && options.exclude.length > 0) {
                url += '&exclude=' + options.exclude.join();
            }

            if (typeof options.extend !== 'undefined' && options.extend !== null) {
                url += '&extend=' + options.extend;
            }

            if (typeof options.lang !== 'undefined' && options.lang !== null) {
                url += '&lang=' + options.lang;
            }          
        }

        return url;        
    }

    convertWeatherForecastDataToWeatherModel(weatherForecastData) {
        let weather = new Weather();

        weather._icon = weatherForecastData.currently.icon;
        weather._summary = weatherForecastData.currently.summary;
        weather._temperature = weatherForecastData.currently.temperature;
        weather._degree = this.getDegreeUnitBasedOnLocation(weatherForecastData.timezone);

        return weather;
    }

    getDegreeUnitBasedOnLocation(timezone) {
        let degree = '';
        
        // TODO: more logic to be added to work out the degree unit
        // These values should be stored in database
        if (timezone.toLowerCase().indexOf('america') > 0 ||
            timezone.toLowerCase().indexOf('palau') > 0) {
            degree = 'f';
        }
        else {
            degree = 'c';
        }

        return degree;
    }

    getWeatherUnitsBasedOnLocation(timezone) {
        // TODO: logic to be added to work out the weather units
        // These values should be stored in database
    }
}

module.exports = WeatherForecast;

})();