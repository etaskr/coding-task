(function(angular) {
  'use strict';

angular
    .module('weatherForecast')
    .controller('WeatherForecastController', WeatherForecastController);

WeatherForecastController.$inject = ['weatherForecastService', 'geolocationService', 'utilitiesService', 'weatherForecastConfig', 'WEATHER_FORECAST_DATA'];

/**
 * A weather forecast controller
 * 
 * @param  {Object} weatherForecastService
 * @param  {Object} geolocationService
 * @param  {Object} WEATHER_FORECAST
 */
function WeatherForecastController(weatherForecastService, geolocationService, utilitiesService, weatherForecastConfig, WEATHER_FORECAST_DATA) {
    var vm = this;

    vm.degreeUnit = '';
    vm.icon = '';
    vm.showIcon = true;
    vm.showSummary = true;
    vm.summary = '';
    vm.temperature = '';
    vm.time = '';
    vm.timezone = '';

    vm.getGeolocationAndFetchCurrentWeatherData = getGeolocationAndFetchCurrentWeatherData;
    vm.getCurrentWeather = getCurrentWeather;
    
    getGeolocationAndFetchCurrentWeatherData();

    function getGeolocationAndFetchCurrentWeatherData()
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
                lang: weatherForecastConfig.lang,
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
                vm.icon = data._currently._icon;
                vm.summary = data._currently._summary;
                vm.temperature = data._currently._temperature;
                vm.degreeUnit = data._currently._degreeUnit;           
                vm.timezone = data._timezone;
                vm.time = convertToDate(data._currently._time).toString();
            })
            .catch(function(error) {
                alert(error);
            });
    }

    function convertToDate(data)
    {
        return utilitiesService.isNumber(data) ? new Date(data * 1000) : new Date(data);
    }
}

})(window.angular);