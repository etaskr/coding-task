"use strict";

/**
 * Weather class
 */
class Weather {
    constructor () {
        this._icon = '';
        this._summary = '';
        this._temperature = -1;
    }

    get icon () {
        return this._icon;
    }

    set icon (icon) {
        this.icon = icon;
    }

    get summary () {
        return this._summary;
    }

    set summary (summary) {
        this.summary = summary;
    }

    get temperature () {
        return this._temperature;
    }

    set temperature (temperature) {
        this.temperature = temperature;
    }
}

module.exports = Weather;