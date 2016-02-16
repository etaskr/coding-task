(function() {
  angular
    .module('WeatherApp')
    .config(config);

  function config($interpolateProvider) {
    $interpolateProvider.startSymbol('[%').endSymbol('%]');
  }

})();