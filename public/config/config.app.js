(function(angular) {
  'use strict';

angular
    .module('app', [
        'ngRoute',
        'angularSpinner',
        'weatherForecast'
    ]);

angular
    .module('weatherForecast', [
    ]);

})(window.angular);