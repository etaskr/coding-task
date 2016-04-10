function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

          $('#loader').removeClass("hidden");
          $('#loader').html("<h1><i class='wi wi-alien'></i><p>Loding........</p></h1>");
		  $.ajax({
		    type: "GET",
		    url: '/api/weather?lat='+position.coords.latitude+'&long='+position.coords.longitude,
		  }).done(function (response) {

			$('#info').addClass("hidden");
			$('#loader').addClass("hidden");

			$('#icon').addClass("wi-forecast-io-" + response.icon);
			$('#icon-label').html(response.summary);
			$('#temperature').html(response.temperature);
			$('#celsius').addClass("wi-celsius");

		  }).fail(function () {
			$('#info').removeClass("hidden");
		  });
		});;
    } else {
        console.log("Geolocation is not supported by this browser.");
		$('#info').toggleClass("hidden");
    }
}