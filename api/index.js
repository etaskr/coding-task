var api_req = require('./api_req')

const api_key = '81ba32c3446a5a4012bd1bda9d074eae';
const api_url = 'api.forecast.io';

exports.getWeather = function(callback, lat, lng) {
    var url = 'https://api.forecast.io/forecast/' + api_key + '/' + lat + ',' + lng + '?units=si';
    return api_req.getRequest(url, callback);
}
