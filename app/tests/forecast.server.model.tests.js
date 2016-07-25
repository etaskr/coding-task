var app = require('../../server.js'),
    should = require('should'),
    Forecast = require('../models/forecast.server.model');

describe('Forecast model unit tests:', function () {
    beforeEach(function (done) {
        done();
    });
});

describe('Testing the fetch weather data method', function () {
    it('Should be able to fetch data without any problem', function (done) {
        var weatherForecast = new Forecast(process.env.NODE_FORECAST_API, 8000);

        weatherForecast.fetch('-37.9006677', '145.0989646', { units: 'ca' }, function (err, res, data){
            should.not.exist(err);

            done();
        });
    });

    it('Should be able to fetch data', function (done) {
        var weatherForecast = new Forecast(process.env.NODE_FORECAST_API, 5000);

        weatherForecast.fetch('-37.8141', '144.9633', { units: 'si' }, function (err, res, data){
            should.exist(data);

            done();
        });
    });
});

afterEach(function (done) {
    done();
});