using System.IO;
using CurrentWeather.Models.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CurrentWeather.Helper
{
    public static class ForecastJsonReader
    {
        public static WeatherSummary ReadForecastJson(this string json)
        {
            using (new StringReader(json))
            {
                WeatherSummary weather;
                using (new JsonTextReader(new StringReader(json)))
                {
                    JObject jObject = JObject.Parse(json);
                    weather = new WeatherSummary
                    {
                        Timezone = jObject.SelectToken("$.['timezone']").ToString(),
                        Summary = jObject.SelectToken("$.currently['summary']").ToString(),
                        Icon = jObject.SelectToken("$.currently['icon']").ToString(),
                        Temperature = CelsiusToFahrenheit(double.Parse(jObject.SelectToken("$.currently['temperature']").ToString())),
                        ApparentTemperature = CelsiusToFahrenheit(double.Parse(jObject.SelectToken("$.currently['apparentTemperature']").ToString()))
                    };
                }
                return weather;
            }
        }

        public static double CelsiusToFahrenheit(double fahrenheit)
        {
            return (5.0 / 9.0) * (fahrenheit - 32);
        }     
    }
}