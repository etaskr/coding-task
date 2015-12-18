import {WeatherInterface} from "./../../models/weather-interface";

export interface WeatherServiceInterface {
  getTemperatureInDegreeCelsiusByLatitudeAndLongitude(lat: number, long: number): Promise<WeatherInterface>;
}
