
const request = require('request');
const promise = require('request-promise');

const apiKey = "a4443c61f3b33dc699d60dfdd5b7a8c9";
const apiUrl = "https://api.darksky.net/forecast/";


exports.getWeather = function (lat, lon){
 
  let url = apiUrl + apiKey + "/" + lat + "," + lon;

  return promise(url).then(body => {
    let responseJSON = JSON.parse(body);
    //console.log(responseJSON);
    return responseJSON;
  }) 
}