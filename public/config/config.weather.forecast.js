(function(angular) {
  'use strict';

angular
    .module('weatherForecast')
    .value('weatherForecastConfig', {
        unit: 'auto', // us, ca, si, uk2, auto
        compressed: true,
        lang: 'en'
    })
    .constant('WEATHER_FORECAST_DATA', {
        currently: 'currently',
        minutely: 'minutely',
        hourly: 'hourly',
        daily: 'daily',
        alerts: 'alerts',
        flags: 'flags'
    });

})(window.angular);