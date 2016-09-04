/* @flow */

'use strict';

import axios from 'axios';
import { BadRequest } from '../../helpers/errors';

class Geocoder {
    baseUrl: string;

    /**
     * Geocoder constructor
     * @constructor
     */
    constructor () {
        this.baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
    }


    /**
     * geocode a location
     * @param  {String} location - location to geocode
     * @param  {Object} options  - additional Google goecode API options
     * @return {Promise}
     */
    geocode (location: string, options: ?Object): Promise<Object> {
        if (!location) {
            throw new BadRequest('No location provided');
        }

        const requestOpts = Object.assign({}, { sensor: false, address: location }, options);

        return this.makeRequest(this.baseUrl, requestOpts);
    }


    /**
     * reverse geocode a latitude and longitude into an address
     * @param  {String} lat     - latitude
     * @param  {String} long    - longitude
     * @param  {Object} options - additional Google geocode API options
     * @return {Promise}
     */
    reverseGeocode (lat: string, long: string, options: ?Object): Promise<Object> {
        if (!lat || !long) {
            throw new BadRequest('Lat and long not provided');
        }

        const requestOpts = Object.assign({}, { sensor: false, latlng: lat + ',' + long }, options);

        return this.makeRequest(this.baseUrl, requestOpts);
    }


    /**
     * make Google geocoding API request
     * @param  {String} url    - request URL
     * @param  {Object} params - options to passed as quest string params
     * @return {Promise}
     */
    makeRequest (url: string, params: Object): Promise<Object>{
        const options = {
            url: url,
            params: params,             // goecoding options
            validateStatus: null        // don't automatically reject responses - allows for custom error
        };

        return axios.request(options)
            .then((response) => {
                if (response.status !== 200 || response.data.status !== 'OK') {
                    // NOTE: this error will be caught in the wrapping promises catch statement
                    throw new BadRequest(response.data.error || 'Google geocoding request failed');
                }

                return response.data.results[0];
            });
    }
}

export default Geocoder;
