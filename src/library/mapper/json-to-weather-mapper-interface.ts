import {WeatherInterface} from "./../models/weather-interface";

export interface JsonToWeatherMapperInterface {
    covert(data: string): WeatherInterface;
}
