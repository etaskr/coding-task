(function(angular) {
  'use strict';

angular
    .module('app')
    .run(configRun);

configRun.$inject = ['$rootScope', '$http', 'usSpinnerService'];

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