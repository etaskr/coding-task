(function() {
"use strict";

/**
 * Weather Forecast Data Block class
 */
class WeatherForecastDataPoint {
    constructor() {
        this._summary = '';
        this._icon = '';
        this._temperature = 0;
        this._degreeUnit = '';
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

    get temperature() {
        return this._temperature;
    }

    set temperature(temperature) {
        this._temperature = temperature;
    }

    get degreeUnit() {
        return this._degreeUnit;
    }

    set degreeUnit(degreeUnit) {
        this._degreeUnit = degreeUnit;
    }
}

module.exports = WeatherForecastDataPoint;

})();