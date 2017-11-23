'use strict';
const path = require('path');
const request = require('request');

const weatherService = require('../services/weatherService');
const weatherForecastModel = require('../models/weatherForecastModel');


exports.getWeatherForecast = function(req,res){    
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
};

exports.getWeatherForecastData = function(req,res){
    const apiKey = "a4443c61f3b33dc699d60dfdd5b7a8c9";
    const apiUrl = "https://api.darksky.net/forecast/";

    let lat = req.params.lat;
    let lon = req.params.lon;  

    weatherService.getWeather(lat, lon).then(weather => {
        
        let forecast = new weatherForecastModel.WeatherForecast(
            weather.timezone, weather.currently.summary, weather.currently.temperature, weather.currently.icon)
            forecast.temp = forecast.convertFarenheitToCelcius(weather.currently.temperature);
            res.json(forecast);
    }).catch(err => {
        console.log("error from data source");
    });
};
    




