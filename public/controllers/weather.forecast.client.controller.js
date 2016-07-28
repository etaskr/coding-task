(function(angular) {
  'use strict';

angular
    .module('app')
    .controller('WeatherForecastController', WeatherForecastController);

WeatherForecastController.$inject = ['weatherForecastService', 'geolocationService', 'WEATHER_FORECAST'];

/**
 * A weather forecast controller
 * 
 * @param  {Object} weatherForecastService
 * @param  {Object} geolocationService
 */
function WeatherForecastController(weatherForecastService, geolocationService, WEATHER_FORECAST) {
    var vm = this;

    vm.currentWeatherData = null;
    vm.degree = WEATHER_FORECAST.degree;
    vm.getCurrentWeather = getCurrentWeather;
    vm.getGeolocation = getGeolocation;
    vm.showSummary = true;
    vm.showIcon = true;
    vm.WEATHER_FORECAST = WEATHER_FORECAST;

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
            options: { units: WEATHER_FORECAST.units, exclude: WEATHER_FORECAST.excludeOthersButCurrently }
        };

        return weatherForecastService.getCurrent(request)
            .then(function(data) {
                vm.currentWeatherData = data;
            })
            .catch(function(error) {
                alert(error);
            });
    }
}

})(window.angular);