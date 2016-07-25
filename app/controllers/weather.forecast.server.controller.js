/**
 * Return current weather data
 * 
 * @param  {Object} req
 * @param  {Object} res
 */
function getCurrent(req, res) {
    var Forecast = require('../models/forecast.server.model');
    var weatherForecast = new Forecast(process.env.NODE_FORECAST_API, 8000);

    weatherForecast.fetch(req.query.latitude, req.query.longitude, req.query.options, function (error, response, data){

        // var weatherData = JSON.parse(data);

        // var currentWeatherData = {
        //     summary: weatherData.currently.summary,
        //     icon: weatherData.currently.icon,
        //     temperature: weatherData.currently.temperature
        // };
        res.end(data);
    });
}

module.exports = {
    getCurrent: getCurrent
};
