describe('Testing Weather Forecast Controller', function () {
    var _weatherForecastController;

    beforeEach(function () {
        module('app');

        inject(function ($controller) {
            _weatherForecastController = $controller('WeatherForecastController', {}, {});
        });
    });

    it('Should have the model defined', function () {
            expect(_weatherForecastController).toBeDefined();
    });

    it('Should have the model defined and vm.degress should be equal to "c"', function () {
            expect(_weatherForecastController.degree).toEqual("c");
    });

    it('Should have the model defined and vm.showSummary should be equal to true', function () {
            expect(_weatherForecastController.showSummary).toEqual(true);
    });

    it('Should have the model defined and vm.showIcon should be equal to true', function () {
            expect(_weatherForecastController.showIcon).toEqual(true);
    });

    it('Should have the model defined and vm.showSummary should be equal to true', function () {
            expect(_weatherForecastController.currentWeatherData).toEqual(null);
    });

    it('Should have the model and the getGeolocation method defined', function () {
            expect(_weatherForecastController.getGeolocation).toBeDefined();
    });

    it('Should have the model and the getCurrentWeather method defined', function () {
            expect(_weatherForecastController.getCurrentWeather).toBeDefined();
    });
});