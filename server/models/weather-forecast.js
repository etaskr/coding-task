/* @flow */

'use strict';

import { Internal } from '../helpers/errors';

class WeatherForecast {
    location: string;
    weather: Object;

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
        if (!location) {
            return '';    
        }

        const locObject = this.generateLocationObject(location);

        return Object.keys(locObject).map((e) => locObject[e]).join(', ');
    }


    /**
     * generate location object of required keys to make up address
     * @param  {Object} location location object from Google API
     * @return {Object}          key value pairs of desired address keys
     */
    generateLocationObject (location: Object): Object {
        const locObject = {};
        for (let component of location.address_components) {
            if (component.types.includes('locality')) {
                locObject.locality = component.short_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
                locObject.city = component.short_name;
            }
            // if (component.types.includes('country')) {
            //     locObject.country = component.short_name;
            // }
        }
        return locObject;
    }


    /**
     * parse forecast.io weather forecast into only the object(s) we need
     * @type {Object}
     */
    parseWeather (forecast: Object): Object {
        const numDaysToShow = 5;

        let weather = {
            current: this.parseCurrentWeather(forecast.currently),
            daily: []
        };

        // forecast.daily.data.forEach((day) => {
        //     weather.daily.push(this.parseDayWeather(day));
        // });

        // num days to show +1 to get todays forecast
        for(let i = 0; i < numDaysToShow + 1; i++) {
            weather.daily.push(this.parseDayWeather(forecast.daily.data[i]));
        }

        return weather;
    }


    /**
     * parse current weather
     * @type {Object} current weather conditions
     */
    parseCurrentWeather (current: Object): Object {
        return {
            icon: current.icon,
            temperature: Math.round(current.temperature),
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
            min: Math.round(daily.temperatureMin),
            max: Math.round(daily.temperatureMax),
            day: this.parseTimeToDay(daily.time),
            chanceRain: Math.round(daily.precipProbability * 100)
        }
    }


    /**
     * convert unix timestamp to day of the week
     * @type {String} time unix time
     */
    parseTimeToDay (time: number): string {
        const days = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
        const d = new Date(time*1000);
        return days[d.getDay()]
    }
}

export default WeatherForecast;
