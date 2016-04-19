# etaskr Coding Task

I implemeted the requirements by creating a .NET MVC Website.

Ignoring all the .NET templating bloat, the points of interest are:
* Content/WeatherIcons/
* Content/Site.css
* Controllers/
* Models/
* Scripts/CodingTaskScripts/
* Services/
* Views/Home/Index.cshtml

Also for Unit Tests check out the CodingTaskTest Project

## Architecture

Using MVC we already get a nice seperation of concerns with the Model, View and Controller. Along side the MVC pattern is also a Service Layer which handles the API calls to Forecast.io.

The reason I have a seperate service layer is so that there is no hard dependency between the controller and the API calls to Forecast.io. This provides a way to later mock out the service layer so that the controller can be unit tested.

I have used Unity for dependency injection which provides an easy way for injecting in a mock Service layer so that the controller can be unit tested. With some more time I would've liked to have structured the Forecast service in such a way that it could also have automated unit tests covering the functions.

## Client-side

For this application I have used jQuery to do a simple GET request to the MVC controller so that the current weather can be retrieved.
The jQuery script then populates the various fields on the page to display the temperature and summary etc.

I would've liked to have made the UI a lot more snazzy if I had had the time.
