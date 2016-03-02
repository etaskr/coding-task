using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace WeatherForecast.Controllers
{
    public class WeatherController : Controller
    {
        // GET: Weather
        public ActionResult Index()
        {

            var apiURL = "https://api.forecast.io/forecast/7fae3ae52c1d6dd3cbaef04e836b58a0/";
            var buildLatLong = "37.8267,-122.423";
            var url = string.Concat(apiURL, buildLatLong);

            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            var response = client.GetStringAsync(url);
            //var rootObject = JsonConvert.DeserializeObject<Data>(response.Result);
            //ViewBag.WeatherData = rootObject;

            return View();
        }
    }
    
}