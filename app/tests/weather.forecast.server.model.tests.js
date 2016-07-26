var app = require('../../server.js'),
    should = require('should'),
    WeatherForecast = require('../models/weather.forecast.server.model');

var forecast;

describe('Forecast model unit tests:', function () {
    beforeEach(function (done) {
        forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 8000);
        done();
    });

    describe('Testing the fetch weather data method', function () {
        this.timeout(10000);

        it('Should be able to fetch data without any error', function (done) {
            forecast.dataCompressed = false;

            forecast.fetch('-37.9006677', '145.0989646', {}, function (err, res, data){
                should.not.exist(err);
                done();
            });
        });

        it('Should be able to fetch and decompress data without any error', function (done) {
            forecast.dataCompressed = true;

            forecast.fetch('-37.9006677', '145.0989646', {}, function (err, res, data){
                should.not.exist(err);
                done();
            });
        });

        it('Should be able to fetch data', function (done) {
            forecast.dataCompressed = false;

            forecast.fetch('-37.8141', '144.9633', {}, function (err, res, data){
                should.exist(data);
                done();
            });
        });

        it('Should be able to fetch and decompress data', function (done) {
            forecast.dataCompressed = true;

            forecast.fetch('-37.8141', '144.9633', {}, function (err, res, data){
                should.exist(data);
                done();
            });
        });

        it('Should be able to receive icon, summary and temperature', function (done) {
            forecast.dataCompressed = true;

            forecast.fetch('-37.8141', '144.9633', {}, function (err, res, data){
                should.exist(data.icon);
                should.exist(data.summary);
                should.exist(data.temperature);
                done();
            });
        });
    });

    afterEach(function (done) {
        done();
    });
});