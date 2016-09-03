/**
 * Do not run flow on tests as we want to test error handling
 */

import { expect } from 'chai';
import { BadRequest } from '../../helpers/errors';
import Geocoder from './';

// mock location (Melbourne)
const mockLocation = {
    lat: '-37.8053564',
    long: '145.0658874'
};

// set up new geocoder
const geocoder = new Geocoder();

describe('Geocoder', function () {  
    describe('geocode', function () {
        it('should throw a BadRequest error if no location is provided', function () {
            return expect(() => geocoder.geocode()).to.throw(BadRequest);
        });

        it ('should be able to geocode an address', function () {
            return geocoder.geocode('Melbourne, Australia')
                .then((data) => {
                    expect(data).to.exist;
                    expect(data).to.contain.all.keys('formatted_address', 'geometry');
                    expect(data.geometry).to.contain.all.keys('location');
                    expect(data.geometry.location).to.contain.all.keys('lat', 'lng');
                });
        });
    });

    describe('reverse geocode', function () {
        it('should throw a BadRequest error for an invalid lat and long', function () {
            return expect(() => geocoder.reverseGeocode(1)).to.throw(BadRequest);
        });

        it ('should be able to reverse geocode a latitude and longitude', function () {
            return geocoder.reverseGeocode(mockLocation.lat, mockLocation.long)
                .then((data) => {
                    expect(data).to.exist;
                    expect(data).to.contain.all.keys('formatted_address', 'geometry');
                    expect(data.formatted_address).to.contain('Balwyn VIC');
                });
        });
    });
});
