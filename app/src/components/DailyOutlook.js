'use strict';

import React from 'react';
import DayForecast from './DayForecast';

/**
 * Daily Outlook - stateless functional component
 */
const CurrentStatus = (props) => {
    return (
        <ul className="daily-list">
            {props.dailyForecast.map(renderDailyForecast)}
        </ul>
    );

    function renderDailyForecast(forecast, i) {
        return <DayForecast key={i} forecast={forecast} />
    }
}

CurrentStatus.propTypes = {
    dailyForecast: React.PropTypes.array
};

export default CurrentStatus;
