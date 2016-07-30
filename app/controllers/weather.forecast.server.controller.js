(function() {
"use strict";

/**
 * Return current weather data
 * 
 * @param  {Object} req
 * @param  {Object} res
 */
function getCurrent(req, res) {
    let WeatherForecast = require('../models/weather.forecast.server.model');
    let WeatherForecastError = require('../models/weather.forecast.error.server.model');

    let latidue = 0;
    let longitude = 0;
    let options = null;
    
    if (typeof req.query.latitude !== 'undefined' && req.query.latitude !== null) {
        latidue = parseFloat(req.query.latitude);
    } else{
        res.end(JSON.stringify(new WeatherForecastError('No latitude supplied')));
        return;
    }

    if (typeof req.query.longitude !== 'undefined' && req.query.longitude !== null) {
        longitude = parseFloat(req.query.longitude);
    } else {
        res.end(JSON.stringify(new WeatherForecastError('No longitude supplied')));
        return;
    }

    if (typeof req.query.options !== 'undefined' && req.query.options !== null) {
        options = JSON.parse(req.query.options);
    }

    let forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 8000);

    // fetch current weather data
    forecast.fetch(latidue, longitude, options, function (error, response, data) {
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
