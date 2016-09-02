using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ForecastIO;

namespace etaskr.Forecast
{
    public class ForecastService
    {
        public static object GetForecast(string apiKey, float latF,float longF)
        {
            var request=new ForecastIORequest(apiKey,latF,longF,DateTime.Now,Unit.auto);
            var response = request.Get();
            return response;
        }
    }
}
