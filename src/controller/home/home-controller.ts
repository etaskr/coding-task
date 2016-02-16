import * as express from "express";
import {Controller} from "./../controller";
import {WeatherServiceInterface} from "./../../../src/library/services/weather/weather-service-interface";

export class HomeController extends Controller {

    private forecastService: WeatherServiceInterface;

    constructor(forecastService: WeatherServiceInterface) {
        super();
        this.forecastService = forecastService;
    }

    public index(req: express.Request, res: express.Response) {

        try {

            res.render(
                "default/index", {
                    title: "ETaskr Test"
                }
            );

        } catch (e) {
            console.log(e);
        }

    }

    public getTemperature(req: express.Request, res: express.Response) {

        let lat = req.params.lat;
        let long = req.params.long;

        if (!lat || !long) {

            res.json({
                data: {},
                status: -1,
                statusMessage: "Didn't provide latitude or longitude",
            });

            return;
        }

        let promise = this.forecastService.getTemperatureInDegreeCelsiusByLatitudeAndLongitude(lat, long);

        promise.then(function (data) {
            res.json({
                data: data,
                status: 1,
                statusMessage: "ok",
            });
        });
    }
}
