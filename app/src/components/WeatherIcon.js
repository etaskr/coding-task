'use strict';

import React from 'react';

/**
 * WeatherIcon icon component - uses animated svg's thanks to https://github.com/noahblon/animated-climacons
 */
const WeatherIcon = (props) => {
    const source = 'assets/' + props.icon + '.svg';

    return (
        <object type="image/svg+xml" data={source} /> 
    );
}

WeatherIcon.propTypes = { 
    icon: React.PropTypes.string.isRequired
};

export default WeatherIcon;
