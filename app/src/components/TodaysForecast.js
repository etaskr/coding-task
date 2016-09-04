'use strict';

import React from 'react';
import { formatTemperature } from '../utils';

/**
 * Daily Outlook - stateless functional component
 */
const TodaysForecast = (props) => {
    const currentTemp = formatTemperature(props.currentTemp);
    const maxTemp = formatTemperature(props.forecast.max);
    const minTemp = formatTemperature(props.forecast.min);
    return (
        <section  className="today">
            <span className="today__current">{currentTemp}</span>
            <span className="today__temps">
                <span className="today__temps-max">Max {maxTemp}</span>
                <span className="today__temps-min">Min {minTemp}</span>
            </span>
            <span className="today__rain">{props.forecast.chanceRain}%</span>
        </section>
    );
}

TodaysForecast.propTypes = {
    forecast: React.PropTypes.object,
    currentTemp: React.PropTypes.number
};

export default TodaysForecast;
