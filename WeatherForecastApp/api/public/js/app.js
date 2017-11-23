const apiKey = "a4443c61f3b33dc699d60dfdd5b7a8c9";
const apiUrl = "https://api.darksky.net/forecast/";

let skycons = new Skycons();

$(document).ready(function() {    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
   
        let url = "http://localhost:3000/"+ lat + "/" + lon;
   
        $.ajax(url, {        
            success: function(data) {
            $('#main').html(data.timezone);
            $('#temperature').html(data.temp + "&deg;C");
            $('#weatherSummary').html(data.summary);
            $('#icon').html(data.icon);
            setSkycon(data.icon);
 
        },
        error: function(thrownError) {
 
        $('#main').html(("There has been an problem retrieving your forecast"))
        }
    });

    });
    } else {
        $('#main').html(("Geolocation is not supported by this browser."));
}
} );

function setSkycon(weatherType) {
    var skycon = null;
    switch (weatherType) {
      case "clear-day":
        skycon = Skycons.CLEAR_DAY;
        break;
      case "clear-night":
        skycon = Skycons.CLEAR_NIGHT;
        break;
      case "rain":
        skycon = Skycons.RAIN;
        break;
      case "snow":
        skycon = Skycons.SNOW;
        break;
      case "sleet":
        skycon = Skycons.SLEET;
        break;
      case "wind":
        skycon = Skycons.WIND;
        break;
      case "fog":
        skycon = Skycons.FOG;
        break;
      case "cloudy":
        skycon = Skycons.CLOUDY;
        break;
      case "partly-cloudy-day":
        skycon = Skycons.PARTLY_CLOUDY_DAY;
        break;
      case "partly-cloudy-night":
        skycon = Skycons.PARTLY_CLOUDY_NIGHT;
        break;
      default:
        skycon = Skycons.CLEAR_DAY;
    }
  
    if (skycon !== null) {
      skycons.set("skycon", skycon);
      skycons.play();
    }
  }