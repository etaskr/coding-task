/// <reference path="./typings/tsd.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";

import {HomeController} from "./src/controller/home/home-controller";
import {serviceContainer} from "./src/config/service-container";

let app = express();

app.set("views", __dirname + "/src/views");
app.set("view engine", "twig");
app.set("view options", {layout: false});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/src/media"));

let env = process.env.NODE_ENV || "development";

if (env === "development") {
    app.use(errorHandler());
}

app.get("/", (req, res) => {
    <HomeController>serviceContainer.getService("homeController").index(req, res);
});

app.get("/temperature/:lat/:long", (req, res) => {
    <HomeController>serviceContainer.getService("homeController").getTemperature(req, res);
});

try {
    app.listen(3000, () => {
        console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
    });
} catch (e) {
    // A logging class would have been a lot better - in PHP we tend to user PSR/LoggerInterface
    console.log(e);
}
