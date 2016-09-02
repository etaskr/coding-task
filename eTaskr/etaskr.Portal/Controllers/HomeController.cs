using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using etaskr.Portal.Helper;


namespace etaskr.Portal.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            ViewBag.ReloadFrequency = Config.ReloadFrequency;
            return View();
        }

        public JsonResult GetForecast(float lanF,float longF)
        {
            try
            {
                return Json(Forecast.ForecastService.GetForecast(Config.ForecastApiKey, lanF, longF));
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

    }
}
