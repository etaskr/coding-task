// Get Geo location

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        if (position.error){
            $('.start').html('<p class="error">Sorry, something seems to have gone wrong.</p>')
        }
        else{
            var location = {
                'lat': position.coords.latitude,
                'lng': position.coords.longitude
            }
            var url = '/api?lat=' + location['lat'] + '&lng=' + location['lng'];
            $.get(url, function(data){
                var temp = data.currently.temperature;
                var icon = data.currently.icon;
                $('.start').html('<p>The current temperature is: <br /><h2>' + temp + '&#176; Celcius</strong>.</h2>')
                display_icon(icon)
            });
        }
    });
}
else {
    $('.content').append('<p class="error">Sorry, something seems to have gone wrong.</p>')
}


function display_icon(name, canvas_id='icon'){
    var formatted_icon = name.toUpperCase().replace(/-/g, '_');
    var skycons = new Skycons();
    skycons.add(canvas_id, Skycons[formatted_icon]);
    skycons.play();
}
