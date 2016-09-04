/* @flow */

'use strict';

import axios from 'axios';
import { BadRequest } from '../../helpers/errors';

class Forecaster {
    baseUrl: string;

    /**
     * Forecaster constructor
     * @constructor
     * @param {String} apiKey - forecaster.io API key
     */
    constructor (apiKey: string) {
        this.baseUrl = 'https://api.forecast.io/forecast/' + apiKey + '/';
    }


    /**
     * get weather forcast for given lat long
     * @param  {String} lat     - latitude
     * @param  {String} long    - longitude
     * @param  {Object} options - options to send to with forecast.io request
     * @return {Promise}
     */
    getForecast (lat: string, long: string, options: Object = {}): Promise<Object> {
        // check for valid lat long
        if (!lat || !long) {
            throw new BadRequest('Invalid location params');
        }

        const url = this.baseUrl + lat + ',' + long;

        return this.makeRequest(url, options);
    }


    /**
     * make forecast.io API    - request
     * @param  {String} url    - request URL
     * @param  {Object} params - options to passed as quest string params
     * @return {Promise}
     */
    makeRequest (url: string, params: Object): Promise<Object> {
        const options = {
            url: url,
            params: params,        // forecase.io options
            validateStatus: null   // don't automatically reject responses - allows for custom error
        };

        return axios.request(options)
            .then((response) => {
                if (response.status !== 200) {
                    // NOTE: this error will be caught in the wrapping promises catch statement
                    throw new BadRequest(response.data.error || 'request to forecast.io failed');
                }

                return response.data;
            });
    }
}

export default Forecaster;
