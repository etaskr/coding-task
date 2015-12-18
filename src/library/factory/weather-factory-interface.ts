import {WeatherInterface} from "./../models/weather-interface";

export interface WeatherFactoryInterface {
    create(): WeatherInterface;
}
