import {Container} from "./../library/services/container/container";
import {ForecastWeatherApi} from "./../library/services/weather/forecast-weather-api";
import {HttpWrapper} from "./../library/services/http-connection/http-wrapper";
import {BinaryCoderWrapper} from "./../library/services/coder/binary-coder-wrapper";
import {JsonToWeatherMapper} from "./../library/mapper/json-to-weather-mapper";
import {WeatherFactory} from "./../library/factory/weather-factory";
import {HomeController} from "./../controller/home/home-controller";

export let serviceContainer = new Container();

let urlString = "https://api.forecast.io/forecast/";
let httpWrapper = new HttpWrapper();
let coder = new BinaryCoderWrapper();
let weatherFactory = new WeatherFactory();
let mapper = new JsonToWeatherMapper(weatherFactory);
let apiKey = "4c5a8e02ff767068c6757b1934ad4e07";
let units = "si";

let homeController = new HomeController(
    new ForecastWeatherApi(
        httpWrapper,
        coder,
        mapper,
        urlString,
        apiKey,
        units
    )
);

serviceContainer.setService("homeController", homeController);
