'use strict';

import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatTemperature } from '../utils';

/**
 * Daily Outlook - stateless functional component
 */
const DayForecast = (props) => {
    const maxTemp = formatTemperature(props.forecast.max);
    return (
        <li className="daily">
            <span>{props.forecast.day}</span>
            <span className="daily__icon">
                <WeatherIcon icon={props.forecast.icon} />
            </span>
            <span>{maxTemp}</span>
        </li>
    );
}

DayForecast.propTypes = {
    forecast: React.PropTypes.object.isRequired
};

export default DayForecast;
