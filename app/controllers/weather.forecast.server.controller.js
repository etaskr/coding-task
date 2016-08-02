(function() {
"use strict";

var Utilities = require('../domain/utilities.server.domain'),
    WeatherForecast = require('../domain/weather.forecast.server.domain'),
    WeatherForecastError = require('../models/weather.forecast.error.server.model');

/**
 * Return current weather data
 * 
 * @param  {Object} req
 * @param  {Object} res
 */
function getCurrent(req, res) {
    let latitude = 0;
    let longitude = 0;
    let options = null;
    
    if (!Utilities.isObjectUndefinedOrNullOrEmpty(req.query.latitude)) {
        latitude = parseFloat(req.query.latitude);
    } else{
        res.end(JSON.stringify(new WeatherForecastError('No latitude supplied')));
        return;
    }

    if (!Utilities.isObjectUndefinedOrNullOrEmpty(req.query.longitude)) {
        longitude = parseFloat(req.query.longitude);
    } else {
        res.end(JSON.stringify(new WeatherForecastError('No longitude supplied')));
        return;
    }

    if (!Utilities.isObjectUndefinedOrNullOrEmpty(req.query.options)) {
        options = JSON.parse(req.query.options);
    }

    let forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 8000);

    // fetch current weather data
    forecast.fetch(latitude, longitude, options, function (error, response, data) {
        if (!error) {
            res.end(JSON.stringify(data));
        }
        else {
            console.log(error);
            res.end(JSON.stringify(error));
        }
    });
}

module.exports = {
    getCurrent: getCurrent
};

})();
