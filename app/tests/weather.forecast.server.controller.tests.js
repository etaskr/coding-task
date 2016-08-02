/*jshint expr: true*/

var app = require('../../server.js'),
    request = require('supertest'),
    chai = require('chai'),
    weather = require('../controllers/weather.forecast.server.controller');

var expect = chai.expect,
    should = chai.should();

describe('Weather Forecast controller unit tests:', function () {
    this.timeout(10000);

    beforeEach(function (done) {
        done();
    });

    describe('Testing GET current weather data method ', function () {
        it('Should be able to get the current weather data', function (done) {
            request(app).get('/api/WeatherForecast?latitude=-37.9006677&longitude=145.0989646')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw new Error(err);
                    }

                    expect(res.text).to.exist;
                    expect(res.text).to.be.an('string');
                    expect(res.text).to.have.string('_latitude');
                    expect(res.text).to.have.string('_longitude');
                    expect(res.text).to.have.string('_currently');
                    expect(res.text).to.have.string('_icon');
                    expect(res.text).to.have.string('_summary');
                    expect(res.text).to.have.string('_temperature');
                    expect(res.text).to.have.string('_degreeUnit');

                    done();
                });
        });

        it('Should be able to not get the current weather data due to no longitude supplied', function (done) {
            request(app).get('/api/WeatherForecast?latitude=-37.9006677')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw new Error(err);
                    }

                    expect(res.text).to.exist;
                    expect(res.text).to.be.an('string');
                    expect(res.text).to.have.string('_errors');
                    expect(res.text).to.have.string('longitude');

                    done();
                });
        });

        it('Should be able to not get the current weather data due to no latidue supplied', function (done) {
            request(app).get('/api/WeatherForecast?longitude=145.0989646')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw new Error(err);
                    }

                    expect(res.text).to.exist;
                    expect(res.text).to.be.an('string');
                    expect(res.text).to.have.string('_errors');
                    expect(res.text).to.have.string('latitude');

                    done();
                });
        });
    });

    afterEach(function (done) {
        done();
    });
});