# Weather Forecast

a Node.js/AngularJS application which shows the current temperature based on current location.

## Installation

* You must install node.js on the machine first (https://nodejs.org)
* In the terminal/console, go to the root of the application folder and type 'npm build' to start the installation

## Usage

* Type 'npm start' or 'node server' to start up the app
* Open a web browser and go to http://localhost:8081/ (works with all browsers except Chrome) or https://localhost:8082/ (works with all browsers including Chrome)
* You can toggle between Celsius and Fahrenheit by clicking on the C or F (set automatically based on location at first)
* Enjoy Melboure weather :)

## Default Environment Variables

Below are the default values for the environment variables. Set them to something else if needed.

* Linux/Unix/Mac
    * export/set NODE_ENV=development
    * export/set NODE_HTTP_PORT=8081
    * export/set NODE_HTTPS_PORT=8082
    * export/set NODE_FORECAST_API=6759d789feae04ffe702654289b21bff

* Windows
    * set NODE_ENV=development
    * set NODE_HTTP_PORT=8081
    * set NODE_HTTPS_PORT=8082
    * set NODE_FORECAST_API=6759d789feae04ffe702654289b21bff

## SSL (Generating Certificates)

Execute commands below if certificates need to be generated

 * openssl genrsa -des3 -out server.enc.key 1024
 * openssl req -new -key server.enc.key -out server.csr
 * openssl rsa -in server.enc.key -out server.key
 * openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

## To-Do

* Create more unit and E2E tests for the front-end
* Create more unit tests for the back-end