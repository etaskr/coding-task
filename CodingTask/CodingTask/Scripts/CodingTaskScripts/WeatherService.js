$body = $("body");

// Displays the loading spinner when an AJAX call is happeneing
$(document).on({
    ajaxStart: function () { $body.addClass("loading"); },
    ajaxStop: function () { $body.removeClass("loading"); }
});

// Loads the current weather when the page loads
$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(getCurrentWeather, positionError);

    function getCurrentWeather(position) {
        var coordinates = position.coords;

        $.getJSON("Home/GetCurrentWeather", { latitude: coordinates.latitude, longitude: coordinates.longitude })
          .done(function (currentWeather) {
              $("#current-temp").html(currentWeather.temperature + '&deg;C');
              $("#weatherImg").addClass(currentWeather.icon);
              $('#weatherSummary').html(currentWeather.summary);
          })
          .fail(function (jqxhr, textStatus, error) {
              var err = textStatus + ", " + error;
              console.log("Request Failed: " + err);
              alert("Could not retrieve the weather at this time");
          });
    }

    function positionError(position) {
        alert("Could not retrieve the weather at this time");
    }
});