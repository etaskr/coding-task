(function(angular) {
  'use strict';

angular
    .module('app')
    .controller('WeatherForecastController', WeatherForecastController);

WeatherForecastController.$inject = ['weatherForecastService', 'geolocationService'];

/**
 * A weather forecast controller
 * 
 * @param  {Object} weatherForecastService
 * @param  {Object} geolocationService
 */
function WeatherForecastController(weatherForecastService, geolocationService) {
    var vm = this;

    vm.degree = "c";
    vm.showSummary = true;
    vm.showIcon = true;
    vm.currentWeatherData = null;    

    init();

    function init()
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
            options: { units: 'ca', exclude: 'minutely,hourly,daily,alerts,flags' }
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