"use strict";

/**
 * Weather class
 */
class Weather {
    constructor (weatherData) {
        this._icon = weatherData.currently.icon;
        this._summary = weatherData.currently.summary;
        this._temperature = weatherData.currently.temperature;
    }

    get icon () {
        return this._icon;
    }

    // set icon (icon) {
    //     this.icon = icon;
    // }

    get summary () {
        return this._summary;
    }

    // set summary (summary) {
    //     this.summary = summary;
    // }

    get temperature () {
        return this._temperature;
    }

    // set temperature (temperature) {
    //     this.temperature = temperature;
    // }
}

module.exports = Weather;