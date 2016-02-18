This is for etaskr test. Please refer to https://github.com/etaskr/coding-task.

This is set on .net framework with mvc.

This application will use js to get location (latitude, longitude) based on web browser from Google Map Geolocation API.

Then pass location to back-end (c#) and get current climate information using forecast.io API. (API Key configurable in web.config)

Use Skycons to display icon.

The information will be automatically reload using jquery ajax (not refreshing page) every 1 minute. (Configurable in web.config)

This app just displays the information required in the task. The app can be extended to display other info such as wind, temperature forecast, etc. As I do not have enough time I did not put css on the app and add comments.
