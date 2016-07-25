(function(angular) {
  'use strict';

angular
    .module('app')
    .factory('geolocationService', geolocationService);

geolocationService.$inject = ['$q', '$window'];

/**
 * a geolocation service
 * 
 * @param  {Object} 
 */
function geolocationService($q, $window) {
    var service = {
        getCurrentLocation: getCurrentLocation
    };

    return service;

    /**
     * get current loation
     */
    function getCurrentLocation()
    {
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