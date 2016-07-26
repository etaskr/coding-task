"use strict";

/**
 * WeatherForecastError class
 */
class WeatherForecastError extends Error {
    constructor (errors) {
        super(errors);
        this._errors = errors;
    }

    get errors () {
        return this._errors;
    }
}

module.exports = WeatherForecastError;