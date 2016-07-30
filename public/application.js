(function(angular) {
  'use strict';

angular
    .module('app', [
        'ngRoute'
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
(function(angular) {
  'use strict';

angular
    .module('app')
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

    vm.currentWeatherData = null;
    vm.degree = weatherForecastConfig.degree;
    vm.getCurrentWeather = getCurrentWeather;
    vm.getGeolocation = getGeolocation;
    vm.showSummary = true;
    vm.showIcon = true;

    getGeolocation();

    function getGeolocation()
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
                vm.currentWeatherData = data;
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
    .module('app')
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
            forecastData: '=',
            degree: '=',
            showIcon: '=',
            showSummary: '='
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
    .module('app')
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