import {WeatherFactoryInterface} from "./weather-factory-interface";
import {WeatherInterface} from "./../models/weather-interface";
import {Weather} from "./../models/weather";

export class WeatherFactory implements WeatherFactoryInterface {

    public create(): WeatherInterface {
        return new Weather();
    }

}
