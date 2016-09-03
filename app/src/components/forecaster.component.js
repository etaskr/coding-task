'use strict';

import React from 'react';
import styles from '../../sass/main.scss';

const ForecasterWidget = (props) => {
    return <div className="test-class">{props.appName} Running</div>
}

ForecasterWidget.propTypes = { 
    appName: React.PropTypes.string
};

export default ForecasterWidget;
