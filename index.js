var express = require('express');
var async = require('async');

var api = require('./api');

var app = express();

const api_key = '81ba32c3446a5a4012bd1bda9d074eae';
const api_url = 'api.forecast.io';

app.set('view engine', 'pug');
app.use(express.static('static'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/api', function(req, res) {
    var lat = req.query.lat
    var lng = req.query.lng
    if(!lat || !lng){
        res.json(
            {'error': {
                'message': 'Please provide both a lat and lng value.'
            }
        });
    }
    async.waterfall(
        [
            function(callback){
                api.getWeather(callback, lat, lng);
            }
        ],
        function(error, response){
            if (error) {
                res.json(
                    {'error':
                        {'message': 'There was an error with your request'}
                    }
                );
            }
            else{
                res.json(JSON.parse(response));
            }
        }
    )
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
