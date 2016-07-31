(function() {
"use strict";

var request = require('request'),
    Utilities = require('../domain/utilities.server.domain'),
    // qs = require('querystring'),
    zlib = require('zlib'),
    WeatherForecastData = require('../models/weather.forecast.data.server.model'),
    WeatherForecastDataBlock = require('../models/weather.forecast.data.block.server.model'),
    WeatherForecastDataPoint = require('../models/weather.forecast.data.point.server.model'),
    WeatherForecastError = require('../models/weather.forecast.error.server.model');

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

        if (!Utilities.isObjectUndefinedOrNullOrEmpty(options) &&
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
        let url = 'https://api.forecast.io/forecast/' + this._APIKey + '/' + latitude + ',' + longitude + '?';
        
        if (!Utilities.isObjectUndefinedOrNullOrEmpty(options)) {
            if (!Utilities.isObjectUndefinedOrNullOrEmpty(options.unit)) {
                url += 'units=' + options.unit + '&';
            } 

            if (!Utilities.isObjectUndefinedOrNullOrEmpty(options.exclude) && 
                options.exclude.length > 0) {
                url += 'exclude=' + options.exclude.join() + '&';
            }

            if (!Utilities.isObjectUndefinedOrNullOrEmpty(options.extend)) {
                url += 'extend=' + options.extend + '&';
            }

            if (!Utilities.isObjectUndefinedOrNullOrEmpty(options.lang)) {
                url += 'lang=' + options.lang;
            }          
        }

        return url;        
    }

    convertWeatherForecastDataToWeatherModel(data) {
        let weatherForecastData = new WeatherForecastData();

        weatherForecastData._latitude = data.latitude;
        weatherForecastData._longitude = data.longitude;
        weatherForecastData._timezone = data.timezone;

        weatherForecastData._currently = new WeatherForecastDataPoint();
        weatherForecastData._currently._icon = data.currently.icon;
        weatherForecastData._currently._summary = data.currently.summary;
        weatherForecastData._currently._temperature = data.currently.temperature;
        weatherForecastData._currently._degreeUnit = this.getDegreeUnitBasedOnLocation(data.timezone);

        return weatherForecastData;
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