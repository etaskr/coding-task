describe('Testing Weather Forecast Service', function () {
    var _weatherForecastService;

    beforeEach(function () {
        module('coding-task');

        inject(function (weatherForecastService) {
            _weatherForecastService = weatherForecastService;
        });
    });

    it('Should be registered', function () {
        expect(_weatherForecastService).toBeDefined();
    });

    it('Should include $http methods', function () {
        expect(_weatherForecastService.getCurrentLocation).toBeDefined();
    });
});