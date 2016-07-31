(function() {
"use strict";

var WeatherForecastDataPoint = require('./weather.forecast.data.point.server.model.js');

/**
 * Weather Forecast Data Block class (this class needs to be extended to store more weather data)
 */
class WeatherForecastDataBlock {
    constructor() {
        this._summary = '';
        this._icon = '';
        this._data = [];
    }

    get summary() {
        return this._summary;
    }

    set summary(summary) {
        this._summary = summary;
    }

    get icon() {
        return this._icon;
    }

    set icon(icon) {
        this._icon = icon;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }
}

module.exports = WeatherForecastDataBlock;

})();