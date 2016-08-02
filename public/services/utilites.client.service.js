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