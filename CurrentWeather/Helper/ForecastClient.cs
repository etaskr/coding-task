using System;
using System.Net;
using CurrentWeather.Models.Json;

namespace CurrentWeather.Helper
{
    public class ForecastClient : IDisposable
    {
        private WebClient _webClient;

        public ForecastClient()
        {
            _webClient = new WebClient();
        }

        public WeatherSummary Load(string url)
        {
            return _webClient.DownloadString(url).ReadForecastJson();
        }
        
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~ForecastClient()
        {
            Dispose(false); //actually it does nothing if (disposing == false) – we just follow the conventional implementation rules
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_webClient != null)
                {
                    _webClient.Dispose();
                    _webClient = null;
                }
            }
        }
    }
}