// load modules
var config = require('./config'),
    Utilities = require('../app/models/utilities.server.model'),
    https = require('https'),
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
        app.use(morgan('dev'));
    }

    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(bodyParser.json());

    // set the path to static files
    app.use(express.static('./public'));
    
    // load the rounting files
    require('../app/routes/weather.forecast.server.routes')(app);

    // initialse an express https server
    var httpsServer = https.createServer(Utilities.getSslCertificate(), app);

    return httpsServer;
};