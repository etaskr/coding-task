/* eslint react/prop-types: 0 */

'use strict';

import React from 'react';
import classNames from 'classNames';
import WeatherIcon from './WeatherIcon';

import CurrentStatus from '../components/CurrentStatus';
import Location from '../components/Location';
import TodaysForecast from '../components/TodaysForecast';
import DailyOutlook from '../components/DailyOutlook';



/**
 * App - presentational component for AppContainer
 */
const App = (props) => {
    let containerClass = classNames({
        'app-container': !props.isLoading,
        [`app-container--${props.classification}`]: true
    });

    return (
        renderAppView(props.uiState)
    );

    function renderAppView (state) {
        switch (state) {
            case 'LOADING':
                return(
                    <div className="app-loader">
                        <WeatherIcon icon="clear-day" />
                    </div>
                )
            case 'READY':
                return (
                    <main className={containerClass}>
                        <CurrentStatus icon={props.current.icon} summary={props.current.summary} />
                        <Location location={props.location} />
                        <TodaysForecast forecast={props.today} currentTemp={props.current.temperature} />
                        <DailyOutlook dailyForecast={props.daily} />
                    </main>
                )
            case 'ERROR':
                return (
                    <div className="app-error">
                        <WeatherIcon icon="rain" />
                        <h2>{props.errorMsg ? props.errorMsg : 'An error has occured, please try again'}</h2>
                    </div>
                )
        }
    }
}

App.propTypes = { 
    uiState: React.PropTypes.string.isRequired,
    errorMsg: React.PropTypes.string,
    current: React.PropTypes.shape({
        summary: React.PropTypes.string,
        temperature: React.PropTypes.number,
        icon: React.PropTypes.string
    }),
    location: React.PropTypes.string,
    today: React.PropTypes.object.isRequired,
    daily: React.PropTypes.array.isRequired,
    classification: React.PropTypes.string.isRequired
};

export default App;
