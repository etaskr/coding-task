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