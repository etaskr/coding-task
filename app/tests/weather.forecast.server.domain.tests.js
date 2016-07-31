/*jshint expr: true*/

var app = require('../../server.js'),
    chai = require('chai'),
    WeatherForecast = require('../domain/weather.forecast.server.domain');

var expect = chai.expect,
    should = chai.should();

var forecast;

describe('Weather forecast domain unit tests:', function () {
    this.timeout(10000);

    beforeEach(function (done) {
        forecast = new WeatherForecast(process.env.NODE_FORECAST_API, 8000);
        done();
    });

    describe('Testing the fetch current weather data method', function () {

        it('Should be able to fetch data without any error', function (done) {
            forecast.fetch('-37.9006677', '145.0989646', null, function (err, res, data){
                expect(err).to.not.exist;
                done();
            });
        });

        it('Should be able to fetch and decompress data without any error', function (done) {
            forecast.fetch('-37.9006677', '145.0989646', { options: { compressed: true } }, function (err, res, data){
                expect(err).to.not.exist;
                done();
            });
        });

        it('Should be able to fetch data', function (done) {
            forecast.fetch('-37.8141', '144.9633', {}, function (err, res, data){
                expect(data).to.exist;
                done();
            });
        });

        it('Should be able to fetch and decompress data', function (done) {
            forecast.fetch('-37.8141', '144.9633', { options: { compressed: true } }, function (err, res, data){
                expect(data).to.exist;
                done();
            });
        });

        it('Should have property _latitude, _longitude, _timezone and _currently', function (done) {
            forecast.fetch('-37.8141', '144.9633', null, function (err, res, data){
                expect(data).to.have.property('_latitude');
                expect(data).to.have.property('_longitude');
                expect(data).to.have.property('_timezone');
                expect(data).to.have.property('_currently');

                done();
            });
        });

        it('Should have property _icon, _summary, _temperature and _degreeUnit', function (done) {
            forecast.fetch('-37.8141', '144.9633', null, function (err, res, data){
                expect(data._currently).to.have.property('_icon');
                expect(data._currently).to.have.property('_summary');
                expect(data._currently).to.have.property('_temperature');
                expect(data._currently).to.have.property('_degreeUnit');

                done();
            });
        });

        it('Should have property _icon, _summary, _temperature and _degreeUnit', function (done) {
            forecast.fetch('-37.8141', '144.9633', null, function (err, res, data){
                expect(data._latitude).to.equal(-37.8141);
                expect(data._longitude).to.equal(144.9633);

                done();
            });
        });
    });

    afterEach(function (done) {
        done();
    });
});