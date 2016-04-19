using CodingTask.Models;
using CodingTask.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CodingTask.Controllers
{
    public class HomeController : Controller
    {
        IForecastService _forcastService;

        public HomeController(IForecastService forecastService)
        {
            _forcastService = forecastService;
        }

        /// <summary>
        /// Loads the Index View
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Returns a JSON object with the Current Weather
        /// </summary>
        /// <param name="latitude"></param>
        /// <param name="longitude"></param>
        /// <returns></returns>
        public ActionResult GetCurrentWeather(string latitude, string longitude)
        {
            if (string.IsNullOrEmpty(latitude) || string.IsNullOrEmpty(longitude))
            {
                throw new ArgumentException("Latitude and Longitude must be provded");
            }

            CurrentWeather weather = _forcastService.GetCurrentWeather(latitude, longitude);

            return Json(weather, JsonRequestBehavior.AllowGet);
        }
    }
}