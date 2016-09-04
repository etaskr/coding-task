/**
 * Do not run flow on tests as we want to test error handling
 */

import { expect } from 'chai';
import { BadRequest } from '../../server/helpers/errors';
import Forecaster from '../../server/lib/forecaster';

// mock location (Melbourne)
const mockLocation = {
    lat: '-37.8053564',
    long: '145.0658874'
};

// throw error if no API key is supplied
if (!process.env.FORECASTIO_API_KEY) {
    throw new Error('Usage: env FORECASTIO_API_KEY=<your api key> npm test');
}

// set up new forecaster
const forecaster = new Forecaster(process.env.FORECASTIO_API_KEY);

describe('[Service] Forecaster', function () {
    it('should throw a BadRequest for an invalid lat and long', function () {
        return expect(() => forecaster.getForecast('1', null)).to.throw(BadRequest);
    });

    it('should reject the promise with a BadRequest for a failed forecast.io response', function () {
        return forecaster.getForecast(mockLocation.lat, '200')
            .catch((err) => {
                expect(err).to.be.instanceOf(BadRequest);
            });
    });

    it('should return the forecast for a valid lat and long', function () {
        return forecaster.getForecast(mockLocation.lat, mockLocation.long)
            .then((data) => {
                expect(data).to.exist;
                expect(data).to.contain.all.keys('currently', 'hourly', 'daily', 'flags');
            });
    });

    it('should pass options to forecast.io and return corresponding forecast', function () {
        const options = {
            units: 'si',
            exclude: 'daily, hourly'
        };

        return forecaster.getForecast(mockLocation.lat, mockLocation.long, options)
            .then((data) => {
                expect(data).to.exist;
                expect(data.flags.units).to.equal(options.units);
                expect(data).not.to.contain.any.keys('hourly', 'daily');
            });
    });
});
