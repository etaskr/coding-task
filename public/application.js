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
(function(angular) {
  'use strict';

angular
    .module('app')
    .run(configRun);

configRun.$inject = ['utilitiesService'];

function configRun(utilitiesService) {
    
    utilitiesService.setPageTitle();
    utilitiesService.togglePageLoadingSpinner();
}

})(window.angular);
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
(function(angular) {
  'use strict';

angular
    .module('app')
    .factory('geolocationService', geolocationService);

geolocationService.$inject = ['$q', '$window'];

/**
 * a geolocation service
 * 
 * @param  {Object} $q
 * @param  {Object} $window 
 */
function geolocationService($q, $window) {
    var service = {
        getCurrentLocation: getCurrentLocation
    };

    return service;

    function getCurrentLocation() {
        var deferred = $q.defer();

        if ($window.navigator.geolocation) {
            $window.navigator.geolocation.getCurrentPosition(getCurrentLocationComplete, getCurrentLocationFailed);
        } else {
            deferred.reject('Geolocation is not supported by this browser. Please try again with another browser.');
        }

        function getCurrentLocationComplete(response) {
            deferred.resolve(response);
        }

        function getCurrentLocationFailed(error) {
            var errorMessage = '';

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Permission was deinied for Geolocation.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Position is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Timing out when getting location.";
                    break;
                case error.UNKNOWN_ERROR:
                    errorMessage = "Unknown error.";
                    break;
            }

            console.log(errorMessage);
            deferred.reject(errorMessage);
        }

        return deferred.promise;
    }
}

})(window.angular);
(function(angular) {
  'use strict';

angular
    .module('app')
    .factory('utilitiesService', utilitiesService);

utilitiesService.$inject = ['$rootScope', '$http', 'usSpinnerService'];

/**
 * a utilities service
 * 
 */
function utilitiesService($rootScope, $http, usSpinnerService) {
    var service = {
        isNumber: isNumber,
        setPageTitle: setPageTitle,
        togglePageLoadingSpinner: togglePageLoadingSpinner
    };

    return service;

    function isNumber(data) {
        return !isNaN(parseFloat(data)) && isFinite(data);
    }

    function setPageTitle() {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        });
    }

    function togglePageLoadingSpinner() {
        $rootScope.isHttpRequestPending = function () {
            return $http.pendingRequests.length > 0;
        };

        $rootScope.$watch($rootScope.isHttpRequestPending, function (loading) {
            if (loading) {
                usSpinnerService.spin('pageSpinner');
            } else {
                usSpinnerService.stop('pageSpinner');
            }
        });
    }
}

})(window.angular);
(function(angular) {
  'use strict';

angular
    .module('weatherForecast')
    .factory('weatherForecastService', weatherForecastService);

weatherForecastService.$inject = ['$http'];

/**
 * a weather forecast service
 * 
 * @param  {Object} $http
 */
function weatherForecastService($http) {
    var service = {
        fetch: fetch
    };

    return service;

    function fetch(request) {
        return $http.get('/api/WeatherForecast', { params: request })
            .then(getCurrentComplete)
            .catch(getCurrentFailed);

        function getCurrentComplete(response) {
            if (response.data._error) {
                console.log(response.data._error);
            }

            return response.data;
        }

        function getCurrentFailed(error) {
            console.log('Failed to get the weather data. ' + error.data);
        }
    }
}

})(window.angular);