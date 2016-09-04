import React, { Component } from 'react';
import axios from 'axios';

import App from '../components/App';

import styles from '../../sass/main.scss'; // eslint-disable-line no-unused-vars

class AppContainer extends Component {
    constructor (props) {
        super(props);

        // initialise application state
        this.state = {
            uiState: 'LOADING',
            errorMsg: '',
            noLoc: false,
            location: '',
            current: {
                summary: '',
                icon: 'clear-day',
                temperature: 0
            },
            today: {
                max: 0,
                min: 0,
                chanceRain: 0
            },
            daily: [],
            classification: ''
        }
    }

    componentDidMount () {
        this.getGeoLocation()
            .then((position) => this.loadForecast(position.coords.latitude, position.coords.longitude))
            .catch((message) => this.setState({ uiState: 'ERROR', errorMsg: message }));
    }

    getGeoLocation () {
        const geolocation = navigator.geolocation;

        return new Promise((resolve, reject) => {
            if (!geolocation) {
                reject('Location not supported');
            }

            geolocation.getCurrentPosition((position) => {
                resolve(position);
            }, () => {
                reject ('Please enable your location');
            });
        });
    }

    loadForecast (lat, long) {
        const options = {
            url: '/weather',
            params: {
                lat,
                long
            }
        }
        axios
            .request(options)
            .then((response) => this.setForecast(response.data))
            .catch(() => this.setState({ uiState: 'ERROR', errorMsg: 'Could not retrieve data for your location'}));
    }

    setForecast (forecast) {
        const newState = Object.assign({}, this.state, {
            location: forecast.location,
            current: forecast.current,
            today: forecast.daily.shift(),
            daily: forecast.daily,
            classification: this.getClassification(forecast.current.temperature)
        });
        newState.uiState = 'READY';
        this.setState(newState);
    }

    getClassification (temp) {
        switch (true) {
            case temp < 0: 
                return 'freezing';
            case temp < 10: 
                return 'cold';
            case temp < 18: 
                return 'cool';
            case temp < 25: 
                return 'mild';
            case temp < 34: 
                return 'warm';
            default: return 'hot';
        }
    }

    render () {
        return (
            <App {...this.state} />
        )
    }
}

export default AppContainer;