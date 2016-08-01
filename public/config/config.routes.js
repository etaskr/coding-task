(function(angular) {
  'use strict';

angular
    .module('app')
    .config(configRoute);

configRoute.$inject = ['$routeProvider'];

function configRoute($routeProvider) {
    $routeProvider
        .when('/', {
            title: 'Current Temperature',
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