/*jshint expr: true*/

var app = require('../../server.js'),
    chai = require('chai'),
    WeatherForecast = require('../models/weather.forecast.server.model');

var expect = chai.expect,
    should = chai.should();

var forecast;

describe('Weather forecast model unit tests:', function () {
    this.timeout(10000);

    beforeEach(function (done) {
        forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 8000);
        done();
    });

    describe('Testing the fetch current weather data method', function () {

        it('Should be able to fetch data without any error', function (done) {
            forecast.dataCompressed = false;

            forecast.fetch('-37.9006677', '145.0989646', {}, function (err, res, data){
                expect(err).to.not.exist;
                done();
            });
        });

        it('Should be able to fetch and decompress data without any error', function (done) {
            forecast.dataCompressed = true;

            forecast.fetch('-37.9006677', '145.0989646', {}, function (err, res, data){
                expect(err).to.not.exist;
                done();
            });
        });

        it('Should be able to fetch data', function (done) {
            forecast.dataCompressed = false;

            forecast.fetch('-37.8141', '144.9633', {}, function (err, res, data){
                expect(data).to.exist;
                done();
            });
        });

        it('Should be able to fetch and decompress data', function (done) {
            forecast.dataCompressed = true;

            forecast.fetch('-37.8141', '144.9633', {}, function (err, res, data){
                expect(data).to.exist;
                done();
            });
        });

        it('Should have property icon, summary and temperature', function (done) {
            forecast.dataCompressed = true;

            forecast.fetch('-37.8141', '144.9633', {}, function (err, res, data){
                expect(data).to.have.property('_icon');
                expect(data).to.have.property('_summary');
                expect(data).to.have.property('_temperature');

                done();
            });
        });
    });

    afterEach(function (done) {
        done();
    });
});