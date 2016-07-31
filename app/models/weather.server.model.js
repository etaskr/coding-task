(function() {
"use strict";

/**
 * Weather class (this class needs to be refactored/extended to store more weather data)
 */
class Weather {
    constructor() {
        this._icon = '';
        this._summary = '';
        this._temperature = 0;
        this._degree = '';
    }

    get icon() {
        return this._icon;
    }

    set icon(icon) {
        this._icon = icon;
    }

    get summary() {
        return this._summary;
    }

    set summary(summary) {
        this._summary = summary;
    }

    get temperature() {
        return this._temperature;
    }

    set temperature(temperature) {
        this._temperature = temperature;
    }

    get degree() {
        return this._icon;
    }

    set degree(degree) {
        this._degree = degree;
    }
}

module.exports = Weather;

})();