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
        compile: compile,
        scope: {
            degreeUnit: '=',
            icon: '=',
            showIcon: '=',
            showSummary: '=',
            summary: '=',
            temperature: '=',
            time: '=',
            timezone: '='
        },
        controller: WeatherForecastCurrentlyController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;

    function compile(el, attr, trans) {
    }

    function link(scope, el, attr) {     
    }
}

function WeatherForecastCurrentlyController() {
    var vm = this;

    vm.convertFromCelsiusToFahrenheit = convertFromCelsiusToFahrenheit;
    vm.convertFahrenheitToCelsius = convertFahrenheitToCelsius;
    vm.displayDegreeUnit = displayDegreeUnit;

    displayDegreeUnit(vm.degreeUnit);

    function displayDegreeUnit(degreeUnit) {
        var degreeCelsius = angular.element(document.querySelector('#weather-forecast-currently-directive-temperature-degree-celsius'));
        var degreeFahrenheit = angular.element(document.querySelector('#weather-forecast-currently-directive-temperature-degree-fahrenheit'));
        var temperature = angular.element(document.querySelector('#weather-forecast-currently-directive-temperature-degree'));

        if (degreeUnit == 'f') {
            degreeCelsius.removeClass('celsius-active');
            degreeCelsius.addClass('celsius-inactive');

            degreeFahrenheit.removeClass('fahrenheit-inactive');
            degreeFahrenheit.addClass('fahrenheit-active');

            degreeCelsius.bind("click", function () {
                temperature.text(convertFahrenheitToCelsius(parseFloat(temperature.text())));
                vm.displayDegreeUnit('c');
            });

            degreeFahrenheit.unbind("click");
        } else {
            degreeCelsius.removeClass('celsius-inactive');
            degreeCelsius.addClass('celsius-active');

            degreeFahrenheit.removeClass('fahrenheit-active');
            degreeFahrenheit.addClass('fahrenheit-inactive');

            degreeFahrenheit.bind("click", function () {
                temperature.text(convertFromCelsiusToFahrenheit(parseFloat(temperature.text())));
                vm.displayDegreeUnit('f');
            });

            degreeCelsius.unbind("click");
        }
    }

    function convertFromCelsiusToFahrenheit(degreeInCelsius) {
        return parseFloat((degreeInCelsius*9)/5 + 32).toFixed(2);
    }

    function convertFahrenheitToCelsius(degreeInFahrenheit) {
        return parseFloat(((degreeInFahrenheit-32)*5)/9).toFixed(2);
    }
}

})(window.angular);