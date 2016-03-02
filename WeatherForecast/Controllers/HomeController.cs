using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Dynamic;

namespace WeatherForecast.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        public class GeoData // #4
        {
            public string Latitude { get; set; }
            public string Longitude { get; set; }
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Weather(GeoData data)
        {
            var apiURL = "https://api.forecast.io/forecast/7fae3ae52c1d6dd3cbaef04e836b58a0/";
            var buildLatLong = "";
            
            if (data.Longitude != null && data.Latitude != null){
                buildLatLong = data.Latitude.ToString() + "," + data.Longitude.ToString();
            }
            
            var url = string.Concat(apiURL, buildLatLong);

            var client = new HttpClient();
            //client.DefaultRequestHeaders.Accept.Add(
            //new MediaTypeWithQualityHeaderValue("application/json"));

            var response = client.GetStringAsync(url);
            dynamic rootObject = JsonConvert.DeserializeObject(response.Result);
            IDictionary<string, object> expando = new ExpandoObject();
            foreach(var item in rootObject)
            {                              
                expando.Add(((Newtonsoft.Json.Linq.JProperty)item).Name, ((Newtonsoft.Json.Linq.JProperty)item).Value);
            }
            dynamic weatherObj = (ExpandoObject)expando;

            if (weatherObj != null)
            {
                var value = (string)weatherObj.currently.icon;
                var temperature = (string)weatherObj.currently.temperature;
                var farenheitTemp = float.Parse(temperature);
                var celsiusTemp = (farenheitTemp - 32) / 1.8000;
                weatherObj.currently.temperature = String.Format("{0:0.00}°C.", celsiusTemp);

                if (value.ToString().ToLower().Contains("cloudy"))
                {
                    weatherObj.currently.icon = "wi wi-day-cloudy";
                }
                else if (value.ToString().ToLower().Contains("sunny"))
                {
                    weatherObj.currently.icon = "wi wi-day-sunny";
                }
                else if (value.ToString().ToLower().Contains("rain"))
                {
                    weatherObj.currently.icon = "wi wi-day-rain";
                }
                else if (value.ToString().ToLower().Contains("haze"))
                {
                    weatherObj.currently.icon = "wi wi-day-haze";
                }
                else if (value.ToString().ToLower().Contains("snow"))
                {
                    weatherObj.currently.icon = "wi wi-day-snow";
                }
                else
                {
                    weatherObj.currently.icon = "wi wi-na";
                }
            }

            return PartialView(weatherObj);
        }
    }
        
}
