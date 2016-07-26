var app = require('../../server.js'),
    should = require('should'),
    WeatherForecast = require('../models/weather.forecast.server.model');

describe('Forecast model unit tests:', function () {
    beforeEach(function (done) {
        done();
    });
});

describe('Testing the fetch weather data method', function () {
    it('Should be able to fetch data without any problem', function (done) {
        var forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 8000, false);

        forecast.fetch('-37.9006677', '145.0989646', {}, function (err, res, data){
            should.not.exist(err);

            done();
        });
    });

    it('Should be able to fetch and decompress data without any problem', function (done) {
        var forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 8000, true);

        forecast.fetch('-37.9006677', '145.0989646', { units: 'ca', exclude: 'minutely,hourly,daily,alerts,flags' }, function (err, res, data){
            should.not.exist(err);

            done();
        });
    });

    it('Should be able to fetch data', function (done) {
        var forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 5000, false);

        forecast.fetch('-37.8141', '144.9633', { exclude: 'minutely,hourly,daily,alerts,flags' }, function (err, res, data){
            should.exist(data);

            done();
        });
    });

    it('Should be able to fetch and decompress data', function (done) {
        var forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 5000, true);

        forecast.fetch('-37.8141', '144.9633', { units: 'si', exclude: 'minutely,hourly,daily,alerts,flags' }, function (err, res, data){
            should.exist(data);

            done();
        });
    });
});

afterEach(function (done) {
    done();
});