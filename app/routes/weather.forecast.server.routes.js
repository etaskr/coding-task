var weather = require('../controllers/weather.forecast.server.controller');

module.exports = function(app) {
    app.get('/api/WeatherForecast', weather.getCurrent);
};
