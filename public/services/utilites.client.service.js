(function(angular) {
  'use strict';

angular
    .module('app')
    .factory('utilitiesService', utilitiesService);

/**
 * a utilities service
 * 
 */
function utilitiesService() {
    var service = {
        isNumber: isNumber
    };

    return service;

    function isNumber(data) {
        return !isNaN(parseFloat(data)) && isFinite(data);
    }
}

})(window.angular);