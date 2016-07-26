"use strict";

/**
 * Weather class
 */
class Weather {
    constructor() {
        this._icon = '';
        this._summary = '';
        this._temperature = -1;
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
}

module.exports = Weather;