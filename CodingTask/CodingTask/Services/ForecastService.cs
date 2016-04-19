using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using CodingTask.Models;

namespace CodingTask.Services
{
    /// <summary>
    /// ForecastService is responsible for making API calls to the Forecast.io REST API
    /// </summary>
    public class ForecastService : IForecastService
    {
        /// <summary>
        /// Forecast.io API Key
        /// </summary>
        const string APIKEY = "041f60001fd463b215fb0b0c9e3c6c49";

        /// <summary>
        /// URL Parameters to get correct units ie Celsius
        /// </summary>
        const string URL_PARAMS = "?units=si";

        /// <summary>
        /// Gets the current weather for the given Latitude and Longitude
        /// </summary>
        /// <param name="latitude"></param>
        /// <param name="longitude"></param>
        /// <returns>CurrentWeather object</returns>
        public CurrentWeather GetCurrentWeather(string latitude, string longitude)
        {
            if(string.IsNullOrEmpty(latitude) || string.IsNullOrEmpty(longitude))
            {
                throw new ArgumentException("Latitude and Longitude must be provded");
            }

            CurrentWeather weather = null;

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(string.Format("https://api.forecast.io/forecast/{0}/{1},{2}", APIKEY, latitude, longitude));

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            // Make API call
            HttpResponseMessage response = client.GetAsync(URL_PARAMS).Result;
            if (response.IsSuccessStatusCode)
            {
                // Parse JSON into C# object
                var result = JToken.Parse(response.Content.ReadAsStringAsync().Result).ToObject<RootObject>();
                if(result != null)
                {
                    weather = result.currently;
                }
                else
                {
                    throw new Exception("No result returned from Forecast.io");
                }
            }
            else
            {
                throw new Exception(string.Format("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase));
            }

            return weather;
        }
    }
}
