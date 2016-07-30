(function(angular) {
  'use strict';

angular
    .module('app')
    .controller('WeatherForecastController', WeatherForecastController);

WeatherForecastController.$inject = ['weatherForecastService', 'geolocationService', 'weatherForecastConfig', 'WEATHER_FORECAST_DATA'];

/**
 * A weather forecast controller
 * 
 * @param  {Object} weatherForecastService
 * @param  {Object} geolocationService
 * @param  {Object} WEATHER_FORECAST
 */
function WeatherForecastController(weatherForecastService, geolocationService, weatherForecastConfig, WEATHER_FORECAST_DATA) {
    var vm = this;

    vm.currentWeatherData = null;
    vm.degree = weatherForecastConfig.degree;
    vm.getCurrentWeather = getCurrentWeather;
    vm.getGeolocation = getGeolocation;
    vm.showSummary = true;
    vm.showIcon = true;

    getGeolocation();

    function getGeolocation()
    {
        geolocationService.getCurrentLocation()
            .then(getCurrentWeather)
            .catch(function(error) {
                alert(error);
            });
    }

    function getCurrentWeather(locationData)
    {
        var request = {
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
            options: { 
                unit: weatherForecastConfig.unit, 
                exclude: [ WEATHER_FORECAST_DATA.minutely, 
                        WEATHER_FORECAST_DATA.hourly, 
                        WEATHER_FORECAST_DATA.daily, 
                        WEATHER_FORECAST_DATA.alerts, 
                        WEATHER_FORECAST_DATA.flags], 
                compressed: weatherForecastConfig.compressed 
            }
        };

        return weatherForecastService.fetch(request)
            .then(function(data) {
                vm.currentWeatherData = data;
            })
            .catch(function(error) {
                alert(error);
            });
    }
}

})(window.angular);