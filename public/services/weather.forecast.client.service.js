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
        getCurrent: getCurrent
    };

    return service;

    /**
     * get current weather data
     */
    function getCurrent(request)
    {
        return $http.get('/api/WeatherForecast/Current', { params: request })
            .then(getCurrentComplete)
            .catch(getCurrentFailed);

        function getCurrentComplete(response) {
            return response.data;
        }

        function getCurrentFailed(error) {
            console.log('Failed to get the current weather data. ' + error.data);
        }
    }
}

})(window.angular);