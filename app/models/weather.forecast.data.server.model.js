(function() {
"use strict";

var WeatherForecastDataPoint = require('./weather.forecast.data.point.server.model.js'),
    WeatherForecastDataBlock = require('./weather.forecast.data.block.server.model.js');

/**
 * WeatherForecastData class (this class needs to be extended to store more weather data)
 */
class WeatherForecastData {
    constructor() {
        this._latitude = 0;
        this._longitude = 0;
        this._timezone = '';
        this._currently = new WeatherForecastDataPoint(); 
    }

    get latitude() {
        return this._latitude;
    }

    set latitude(latitude) {
        this._latitude = latitude;
    }

    get longitude() {
        return this._longitude;
    }

    set longitude(longitude) {
        this._longitude = longitude;
    }

    get timezone() {
        return this._timezone;
    }

    set timezone(timezone) {
        this._timezone = timezone;
    }

    get currently() {
        return this._currently;
    }

    set currently(currently) {
        this._currently = currently;
    }
}

module.exports = WeatherForecastData;

})();