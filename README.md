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

We are looking for *engineers* that can lead technology and design decisions without the need for explicit guidance. We value the following:

* SOLID design principles.
    * Single use, inversion of control, dependency injection et al.
    * Considered design patterns over spaghetti code. eg. MVC, Pub/Sub, Factory, etc
* Testable, clean code.
    * Unit tests.
    * Integration tests.
    * Simplicity of setup / mocks for testing.
* Modular and maintainable code.
    * Package managers.
    * Documentation.
    * Understandability.
    * Coding standards.
    * Scalable solutions.

## Getting Started

* Fork this repository.
* Register for a free API key at: https://developer.forecast.io/.
* Commit your code, and send us a pull request when you are finished.
