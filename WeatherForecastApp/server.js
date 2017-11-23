const express = require('express');
const bodyParser = require('body-parser');
const app = express();

port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/api/public'));

var routes = require('./api/routes/weatherForecastRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Weather Forecast App RESTful API server started on: ' + port);