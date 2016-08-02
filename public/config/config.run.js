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