# etaskr Coding Task

a Node.js application which shows the current temperature based on current location.

## Installation

* Go to the root of the application folder 
* Type 'npm install' to install back-end libs
* Type 'bower update' to install front-end libs

## Usage

* Type 'node server' to start the web server
* Open a web browser and go to https://localhost:8082/

## Default Environment Variables

Below are the default values for the environment variables. Set them to something else if needed.

* export NODE_ENV=development
* export NODE_HTTPS_PORT=8082
* export NODE_FORECAST_API=6759d789feae04ffe702654289b21bff

## SSL (Generating Certificates)

Execute commands below if certificates need to be generated

 * openssl genrsa -des3 -out server.enc.key 1024
 * openssl req -new -key server.enc.key -out server.csr
 * openssl rsa -in server.enc.key -out server.key
 * openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

## To-Do

* Creat some more E2E tests
* Create Grunt tasks to minify/concat css/js files
* Create Grunt tasks to compile the scss files
* Create Grunt tasks for automating testsing processes
* Create Grunt tasks for validating css/js files
