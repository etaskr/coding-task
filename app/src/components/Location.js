'use strict';

import React from 'react';

const Location = (props) => {
    return (
        <section className="location">
            <h2>{props.location}</h2>
        </section>
    );
}

Location.propTypes = { 
    location: React.PropTypes.string
};

export default Location;
