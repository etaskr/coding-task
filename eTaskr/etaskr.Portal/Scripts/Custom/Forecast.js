$(document).ready(function () {
    var lanF, longF;
    var skycons = new Skycons();
    function getForecast() {
        $.ajax({
            type: 'POST',
            url: '/Home/GetForecast',
            async: false,
            data: {
                lanF: lanF,
                longF: longF
            },
            success: function (data) {
                if (typeof data == "string") {
                    alert(data);
                    return;
                }
                initSkycons(data.currently.icon);
                initTemperature(data.currently.temperature);
                $('#loading').addClass("hide");
                $('#content').removeClass("hide");
            }
        });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert("Geo Location is not supported on your current browser!");
    }

    function success(position) {
        lanF= position.coords.latitude;
        longF = position.coords.longitude;
        return getForecast();
    }

    function initSkycons(icon) {
        $('#icon-title').text(icon);
        skycons.set("icon", icon);
        skycons.play();
    }

    function initTemperature(temperature) {
        $('#temperature').text(Math.round(temperature) + "°C");
    }

    setInterval(getForecast, $('#reload-frequency').val());
});