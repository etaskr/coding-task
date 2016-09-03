/* @flow */

'use strict';

import { Internal } from '../helpers/errors';

class WeatherForecast {
    weather: Object;
    location: string;

    /**
     * Weather constructor
     * @constructor
     * @param {Object} forecast - forecast from forecast.io
     * @param {Object} location - location from Google geocoding API
     */
    constructor (forecast: Object, location: Object = {}) {
        if (!forecast) {
            throw new Internal('cannot initialise Weather Forecast without forecast data');
        }

        this.location = this.parseLocation(location);
        this.weather = this.parseWeather(forecast);
    }


    /**
     * return the weather forecast
     * @return {Object} forecast
     */
    getForecast (): Object {
        let forecast = Object.assign({}, this.weather);
        forecast.location = this.location;
        return forecast;
    }


    /**
     * parse reverse geocoded location to short string
     * @type {String} short location
     */
    parseLocation (location: Object): string {
        const shortLoc = {};

        if (!location) {
            return '';    
        }

        for (let component of location.address_components) {
            if (component.types.includes('locality')) {
                shortLoc.locality = component.short_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
                shortLoc.city = component.short_name;
            }
            if (component.types.includes('country')) {
                shortLoc.country = component.short_name;
            }
        }
        return Object.keys(shortLoc).map((e) => shortLoc[e]).join(', ');
    }


    /**
     * parse forecast.io weather forecast into only the object(s) we need
     * @type {Object}
     */
    parseWeather (forecast: Object): Object {
        let weather = {
            current: this.parseCurrentWeather(forecast.currently),
            daily: []
        };

        forecast.daily.data.forEach((day) => {
            weather.daily.push(this.parseDayWeather(day));
        });

        return weather;
    }


    /**
     * parse current weather
     * @type {Object} current weather conditions
     */
    parseCurrentWeather (current: Object): Object {
        return {
            icon: current.icon,
            temperature: current.temperature,
            summary: current.summary
        }
    }


    /**
     * parse daily forecast object
     * @type {Object} daily forecast
     */
    parseDayWeather (daily: Object): Object {
        return {
            icon: daily.icon,
            max: daily.temperatureMax
        }
    }
}

export default WeatherForecast;
