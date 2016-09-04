import http_mocks from 'node-mocks-http';
import chai from 'chai';
import events from 'events';

import { BadRequest } from '../../server/helpers/errors';
import weather from '../../server/routes/weather';

// mock location (Melbourne)
const mockLocation = {
    lat: '-37.8053564',
    long: '145.0658874'
};


let buildResponse = () => http_mocks.createResponse({ eventEmmitter: events.EventEmmitter });

describe('[Controller] WeatherController', function () {
    describe('getForecast', function (done) {
        xit ('should throw an error if no location is provided', function (done) {
            var response = buildResponse();
            var request = http_mocks.createRequest({
                method: 'GET',
                url: '/weather'
            });

            response.on('end', function () {
                const data = response._getData();
                expect(data).to.throw(BadRequest);
                done();
            });

            weather.handle(request, response);
        });


        xit ('should be able to fetch a weather forecast', function (done) {
            var response = buildResponse();
            var request = http_mocks.createRequest({
                method: 'GET',
                url: '/weather',
                params: mockLocation
            });

            response.on('end', function () {
                const data = response._getData();
                expect(data).to.exist;
                // TODO: need to define this a custom matcher
                // expect(data).to.be.forecast;
                done();
            });

            weather.handle(request, response);
        });
    });
});