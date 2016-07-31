(function(angular) {
  'use strict';

angular
    .module('weatherForecast')
    .directive('weatherForecastCurrently', weatherForecastCurrently);

/**
 * A directive that presents the current weather data
 */
function weatherForecastCurrently() {
    var directive = {
        templateUrl: '/directives/weather.forecast.currently.client.directive.html',
        restrict: 'EA',
        link: link,
        scope: {
            summary: '=',
            icon: '=',
            temperature: '=',
            showIcon: '=',
            showSummary: '=',
            degreeUnit: '='
        }
    };

    return directive;

    function link(scope, element, attrs) {
    }
}

})(window.angular);