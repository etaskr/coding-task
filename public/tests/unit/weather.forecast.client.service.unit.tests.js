describe('Testing Weather Forecast Service', function () {
    var _weatherForecastService;

    beforeEach(function () {
        module('weatherForecast');

        inject(function (weatherForecastService) {
            _weatherForecastService = weatherForecastService;
        });
    });

    it('Should be registered', function () {
        expect(_weatherForecastService).toBeDefined();
    });

    it('Should have the method to get current weather data', function () {
        expect(_weatherForecastService.fetch).toBeDefined();
    });
});