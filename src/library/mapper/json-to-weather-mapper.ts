import {JsonToWeatherMapperInterface} from "./json-to-weather-mapper-interface";
import {WeatherInterface} from "./../models/weather-interface";
import {WeatherFactoryInterface} from "./../factory/weather-factory-interface";

export class JsonToWeatherMapper implements JsonToWeatherMapperInterface {

    public static TEMPERATURE_CONSTANT: number = 30;
    private weatherFactory: WeatherFactoryInterface;

    constructor(weatherFactory: WeatherFactoryInterface) {
        this.weatherFactory = weatherFactory;
    }

    public covert(data: string): WeatherInterface {
        try {
            let jsonWeather = JSON.parse(data.trim());
            let weather = null;

            if (jsonWeather instanceof Object) {
                weather = this.buildWeather(jsonWeather);
            }

            return weather;
        } catch (e) {
           throw new Error("Failed Mapping Weather Data to Weather Object");
        }
    }

    private buildWeather(jsonWeather: any): WeatherInterface {
        let weather = this.weatherFactory.create();

        weather.setLatitude(<number> this.validateProperty("latitude", jsonWeather));
        weather.setLongitude(<number> this.validateProperty("longitude", jsonWeather));
        weather.setLocation(<string> this.validateProperty("timezone", jsonWeather));

        let currentWeather = this.validateProperty("currently", jsonWeather);

        if (currentWeather != null) {

            let temperature = <number>this.validateProperty("temperature", currentWeather);

            weather.setTemperature(temperature);
            weather.setImageName(<string> this.validateProperty("icon", currentWeather));
            weather.setSummary(<string> this.validateProperty("summary", currentWeather));
        }

        return weather;
    }

    private validateProperty(name: string, object: any): any {
        if (name in object) {
            return object[name];
        }

        return null;
    }

}
