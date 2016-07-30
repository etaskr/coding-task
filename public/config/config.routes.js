(function(angular) {
  'use strict';

angular
    .module('app')
    .config(configRoute);

function configRoute($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/weather.forecast.html',
            controller: 'WeatherForecastController',
            controllerAs: 'vm',
            resolve: {
            }
        })

        .otherwise({
            redirectTo: '/'
        });

}

})(window.angular);