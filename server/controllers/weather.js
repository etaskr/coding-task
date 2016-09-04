/* @flow */

import { Internal } from '../helpers/errors';

import Forecaster from '../lib/forecaster';
import Geocoder from '../lib/geocoder';
import WeatherForecast from '../models/weather-forecast';

const forecastAPIKey = process.env.FORECASTIO_API_KEY;
if (!forecastAPIKey) {
    throw new Internal('Usage: FORECAST_API_KEY="{key}" npm run {task}');
}

const forecaster: Forecaster = new Forecaster(forecastAPIKey);
const geocoder: Geocoder = new Geocoder();

/**
 * get weather forecast
 */
export function getForecast (req: Object, res: Object, next: Function) {
    const forecastOptions = {
        units: 'si',
        exclude: 'hourly, flags'
    };

    const pForecast = forecaster.getForecast(req.query.lat, req.query.long, forecastOptions)
    const pLocation = geocoder.reverseGeocode(req.query.lat, req.query.long);

    Promise
        .all([pForecast, pLocation])
        .then((data) => new WeatherForecast(data[0], data[1]).getForecast())
        .then((weather) => res.json(weather))
        .catch((err) => next(err));
}
