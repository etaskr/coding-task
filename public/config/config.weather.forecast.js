(function(angular) {
  'use strict';

angular
    .module('app')
    .constant('WEATHER_FORECAST', {
        units: 'ca',
        degree: 'c',
        excludeOthersButCurrently: 'minutely,hourly,daily,alerts,flags'
    });

})(window.angular);