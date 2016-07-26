describe('Testing Weather Forecast Controller', function () {
    var _scope, WeatherForecastController;

    beforeEach(function () {
        module('coding-task');

        jasmine.addMatchers({
            toEqualData: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });

        inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();

            WeatherForecastController = $controller('WeatherForecastController', {
                $scope: _scope
            });
        });
    });

    it('Should have a find method that uses $http to retrieve the current weather data', inject(function () {
        inject(function ($httpBackend) {
            var currentWeatherData = null;

            var currentWeatherData = [currentWeatherData];

            $httpBackend.expectGET('/api/WeatherForecast/Current').respond(currentWeatherData);
            _scope.find();
            $httpBackend.flush();

            expect(_scope.currentWeatherData).toEqualData(currentWeatherData);
        });
    }));
});