'use strict';
module.exports = function(app) {
  var weatherForecast = require('../controllers/weatherForecastController');

  // weather forecase Routes
  app.route('/')
    .get(weatherForecast.getWeatherForecast)
   
  app.route('/:lat/:lon')
    .get(weatherForecast.getWeatherForecastData)

};

