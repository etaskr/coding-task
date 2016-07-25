var app = require('../../server.js'),
    request = require('supertest'),
    should = require('should'),
    weather = require('../controllers/weather.forecast.server.controller');

describe('Weather Forecast controller unit tests:', function () {
    beforeEach(function (done) {
        done();
    });
});

describe('Testing GET current weather data method ', function () {
    it('Should be able to get the current weather data', function (done) {
        request(app).get('/api/WeatherForecast/Current?latitude=-37.9006677&longitude=145.0989646&units=ca&exclude=minutely,hourly,daily,alerts,flags')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });

});

afterEach(function (done) {
    done();
});