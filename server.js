// environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_HTTPS_PORT = process.env.NODE_HTTPS_PORT || 8082;
process.env.NODE_FORECAST_API = process.env.NODE_FORECAST_API || '6759d789feae04ffe702654289b21bff';

// initialise web server
var express = require('./config/express');
var app = express();

// set port to the web server
app.listen(process.env.NODE_HTTPS_PORT);

// this helps to run tests on the server
module.exports = app;

console.log('App now is running at https://localhost:' + process.env.NODE_HTTPS_PORT + "/");
