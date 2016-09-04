'use strict';

import React from 'react';
import WeatherIcon from './WeatherIcon';

/**
 * Current status - stateless functional component
 */
const CurrentStatus = (props) => {
    return (
        <section className="current-status">
            <div className="current-status__icon">
                <WeatherIcon icon={props.icon} />
            </div>
            <h1>{props.summary}</h1>
        </section>
    );
}

CurrentStatus.propTypes = { 
    icon: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired
};

export default CurrentStatus;
