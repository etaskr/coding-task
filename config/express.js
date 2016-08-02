// load modules
var config = require('./config'),
    express = require('express'),
    compress = require('compression'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

// export the express server
module.exports = function() {
    var app = express();

    // loading configurations based on the Environment
    if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    } else if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('test'));
    }

    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(bodyParser.json());

    // set the path to static files
    app.use(express.static('./public'));
    
    // load the rounting files
    require('../app/routes/weather.forecast.server.routes')(app);

    return app;
};