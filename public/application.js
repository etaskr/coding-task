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

function configRun($rootScope, $http, usSpinnerService) {
    
    setPageTitle();
    toggleLoadingSpinner();

    function setPageTitle() {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        });
    }

    function toggleLoadingSpinner() {
        $rootScope.isLoading = function () {
            return $http.pendingRequests.length > 0;
        };

        $rootScope.$watch($rootScope.isLoading, function (loading) {
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

WeatherForecastController.$inject = ['weatherForecastService', 'geolocationService', 'weatherForecastConfig', 'WEATHER_FORECAST_DATA'];

/**
 * A weather forecast controller
 * 
 * @param  {Object} weatherForecastService
 * @param  {Object} geolocationService
 * @param  {Object} WEATHER_FORECAST
 */
function WeatherForecastController(weatherForecastService, geolocationService, weatherForecastConfig, WEATHER_FORECAST_DATA) {
    var vm = this;

    vm.degreeUnit = '';
    vm.icon = '';
    vm.showIcon = true;
    vm.showSummary = true;
    vm.summary = '';
    vm.temperature = '';

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
            })
            .catch(function(error) {
                alert(error);
            });
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