var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rest = require('restler');

var FORECAST_API_KET = process.env.FORECAST_API_KET || '765bed37959d5bf227ce24ad6729f36e'

var app = express();

var port = process.env.PORT || '3000';
app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get ('/', function(req, res){
  res.render('index', {
    title : 'Weather App'
  });
});

app.get('/api/weather',  function(req, res){
  console.log('Hello API');
  console.log(req.query);

  rest.get('https://api.forecast.io/forecast/'+FORECAST_API_KET+'/'+ req.query.lat+','+req.query.long + '?units=si')
  .on('complete', function(data) {
    console.log(data.currently);
    res.send(data.currently);
  });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(port);
console.log("App listening on port 8080"); 

module.exports = app;
