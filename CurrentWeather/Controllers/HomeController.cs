using System;
using System.Web.Mvc;
using CurrentWeather.Helper;
using CurrentWeather.Models.Json;
using CurrentWeather.Properties;
using CurrentWeather.Repository;

namespace CurrentWeather.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult GeoLocation(double? latitude, double? longitude)
        {
            if (string.IsNullOrWhiteSpace(Settings.Default.ApiKey))
            {
#if DEBUG
                return Json(WeatherSummaryViewModel.GetFailed("[Debug Build] Error details: 'ApiKey' setting is not configured. Please specify API Key in Web.config."));
#else
                return Json(WeatherSummaryViewModel.GetFailed());
#endif
            }

            if (!latitude.HasValue || !longitude.HasValue)
            {
                return Json(WeatherSummaryViewModel.GetFailed());
            }

            try
            {
                using (ForecastClient client = new ForecastClient())
                {
                    string url = BuildUrl(Settings.Default.BaseUrl, Settings.Default.ApiKey, latitude.Value, longitude.Value);
                    WeatherSummary weatherSummary = client.Load(url);
                    return Json(new WeatherSummaryViewModel(weatherSummary, HttpContext, new IconRepository()));
                }

            }
            catch (Exception ex)
            {
#if DEBUG
                return Json(WeatherSummaryViewModel.GetFailed("[Debug Build] Error details: " + ex.Message));
#else
                return Json(WeatherSummaryViewModel.GetFailed());
#endif
            }
        }

        private static string BuildUrl(string baseUrl, string apikey, double latitude, double longitude)
        {
            UriBuilder uri = new UriBuilder(baseUrl);
            uri.Path = string.Format("{0}/{1}/{2},{3}", uri.Path, apikey, latitude, longitude);
            return uri.Uri.AbsoluteUri;
        }
    }
}