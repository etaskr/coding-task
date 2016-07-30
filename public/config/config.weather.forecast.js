(function(angular) {
  'use strict';

angular
    .module('app')
    .value('weatherForecastConfig', {
        unit: 'ca',
        degree: 'c',
        compressed: true
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