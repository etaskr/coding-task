describe('Testing Weather Forecast Controller', function () {
    var _weatherForecastController;

    beforeEach(function () {
        module('app');
        module('weatherForecast');

        inject(function ($controller) {
            _weatherForecastController = $controller('WeatherForecastController', {}, {});
        });
    });

    it('Should have the model defined', function () {
            expect(_weatherForecastController).toBeDefined();
    });

    it('Should have the model defined and vm.degreeUnit should be equal to empty', function () {
            expect(_weatherForecastController.degreeUnit).toEqual('');
    });

    it('Should have the model defined and vm.summary should be equal to empty', function () {
            expect(_weatherForecastController.summary).toEqual('');
    });

    it('Should have the model defined and vm.icon should be equal to empty', function () {
            expect(_weatherForecastController.icon).toEqual('');
    });

    it('Should have the model defined and vm.temperature should be equal to empty', function () {
            expect(_weatherForecastController.temperature).toEqual('');
    });

    it('Should have the model defined and vm.time should be equal to empty', function () {
            expect(_weatherForecastController.time).toEqual('');
    });

    it('Should have the model defined and vm.timezone should be equal to empty', function () {
            expect(_weatherForecastController.timezone).toEqual('');
    });

    it('Should have the model defined and vm.showSummary should be equal to true', function () {
            expect(_weatherForecastController.showSummary).toEqual(true);
    });

    it('Should have the model defined and vm.showIcon should be equal to true', function () {
            expect(_weatherForecastController.showIcon).toEqual(true);
    });

    it('Should have the model and the getGeolocationAndFetchCurrentWeatherData method defined', function () {
            expect(_weatherForecastController.getGeolocationAndFetchCurrentWeatherData).toBeDefined();
    });

    it('Should have the model and the getCurrentWeather method defined', function () {
            expect(_weatherForecastController.getCurrentWeather).toBeDefined();
    });
});