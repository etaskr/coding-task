exports.WeatherForecast = class  {

    constructor(timezone, summary, temp, icon){
        this.timezone = timezone;
        this.summary = summary;
        this.temp = temp;
        this.icon = icon;
    }

    convertFarenheitToCelcius(temp){
        return Math.floor((this.temp -32) * .5556);
    }
}

