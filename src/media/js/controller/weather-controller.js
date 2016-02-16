(function(){
  "use strict";

  angular
    .module('WeatherApp')
    .controller('WeatherController', WeatherController);

  WeatherController.$inject = ['$http'];

  function WeatherController($http) {
    var vm = this;
    vm.forecast = null;
    vm.loadingMessage = "Retrieving weather details";
    vm.getTemperature = getTemperature;

    function getTemperature() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position.coords.latitude, position.coords.longitude);
          if (position) {
            $http.get('/temperature/' + position.coords.latitude + "/" + position.coords.longitude, {
              method: 'GET'
            }).then(function(res) {
              if (res.status === 200 && res.data != null) {

                vm.loadingMessage = "failed to retrieve data from server, please try again!";

                if (res.data.status == 1) {

                  vm.forecast = {
                    "temperature": res.data.data.temperature,
                    "imageName": res.data.data.imageName,
                    "lat": res.data.data.latitude,
                    "long": res.data.data.longitude,
                    "summary": res.data.data.summary,
                    "location": res.data.data.location,
                    "units": res.data.data.units
                  };

                  vm.loadingMessage = "Weather for your current location:"
                }
              }
            });
          }
        });
      }
    };

    vm.getTemperature();
  }
})();
