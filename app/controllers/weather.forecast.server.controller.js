"use strict";

/**
 * Return current weather data
 * 
 * @param  {Object} req
 * @param  {Object} res
 */
function getCurrent (req, res) {
    var WeatherForecast = require('../models/weather.forecast.server.model');
    var forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 8000, true);

    // fetch current weather data
    forecast.fetch(req.query.latitude, req.query.longitude, JSON.parse(req.query.options), function (error, response, data){
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
