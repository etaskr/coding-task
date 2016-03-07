namespace CurrentWeather.Models.Json
{
    public class WeatherSummary
    {
        public string Timezone { get; set; }
        public string Summary { get; set; }
        public string Icon { get; set; }
        public double Temperature { get; set; }
        public double ApparentTemperature { get; set; }
    }
}