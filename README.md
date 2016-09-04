# Forecaster
A simple Node-Express-React app to display the current weather based on a browsers geolocation.

Although small I have architected the app in an extensible mannor applying the same separation of concerns that I would apply to a larger project. It is typed using FlowType which integrates nicely into React and esLint. See improvements below for how I would extend/improve on this implementation.

## Installation
Clone this repo and then run
```sh
npm install
```

## Usage

### Development
```sh
FORECASTERIO_API_KEY={your_key} npm run start
```
Runs the app in development mode using hot module reloading. Open http://localhost:3000 to view it in the browser.
Note that you need to set a Forecaster.io API key environment variable.


### Production
```sh
npm run build
```
Builds the app for production to the `dist` folder. It will bundle the app in production mode producing minified and cachebusted CSS and JS file.

After you have built the app for production you can view it by running the command below to start the server in production mode and similarly view it at http://localhost:3000
```sh
FORECASTERIO_API_KEY={your_key} PORT=3000 NODE_ENV='production' npm run start
```

### Testing
```sh
FORECASTERIO_API_KEY={your_key} npm run test
```
Will run the unit tests. Currently only the server side services are unit tested but it is an example of how the tests could be written and run.
Note that you need to provide the API key in order for to test the forecaster.io lib service.

## Improvements
Given more time I would like to have included:
* Refactor App and AppContainer state logic using a Flux pattern (Redux) to remove state and props coupling between parent and child components
* Add React Unit and E2E tests
* Better FlowType integrations with custom declarations

## Credits
* [Noah Blom](https://github.com/noahblon/animated-climacons) for the climacon icon svg's


# etaskr Coding Task Guidelines

There's few better ways to assess someone's programming skills than to have them undertake a reasonably open ended coding task. This task is borrowed heavily from https://github.com/Westpac-Mobile/CodingTest, so thank-you to those people for such a great boilerplate. 

Please do not spend more that 2-3 hours on this task. If it takes you much longer than that, there is something fundamentally wrong with your approach.

## Requirements

The task is to create a basic web application that displays the current temperature using https://forecast.io/ using the geo-location of your browser.

### Key business requirements


* Display the current temperature in degrees celsius
* Display the temperature based on the geolocation (note; not the IP!) of your browser
* Display a simple icon and label based on the weather information provided (eg. sunny, cloudy, rainy etc).
* The API request must be proxied via your web application ie. do not make a request from the client side directly to https://developer.forecast.io/ for the weather information. It must go via your localhost app.

### What we will be looking for in the applicant and the application

We are looking for *engineers* that can lead technology and design decisions without the need for explicit guidance.  This is why we are not providing an exact outline of what we are looking for, so we influence your direction on this task as little as possible. We want to see how you work unencumbered and get to know what really matters to you when developing a web application.

## Getting Started

* Fork this repository.
* Register for a free API key at: https://developer.forecast.io/.
* Commit your code, and send us a pull request when you are finished.
