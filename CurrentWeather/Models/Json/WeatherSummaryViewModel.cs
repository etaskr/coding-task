using System.Globalization;
using System.Web;
using System.Web.Mvc;
using CurrentWeather.Repository;

namespace CurrentWeather.Models.Json
{
    public class WeatherSummaryViewModel
    {
        public bool IsOk { get; private set; }
        public string ErrorMessage { get; private set; }
        public string Timezone { get; private set; }
        public string Summary { get; private set; }
        public string Icon { get; private set; }
        public string Temperature { get; private set; }
        public string ApparentTemperature { get; private set; }

        public WeatherSummaryViewModel(WeatherSummary summary, HttpContextBase context, IIconRepository repository)
        {
            Timezone = summary.Timezone;
            Summary = summary.Summary;
            Icon = UrlHelper.GenerateContentUrl(string.Format("{0}{1}", "/Content/Images/", repository.GetIcon(summary.Icon)), context);
            Temperature = string.Format("{0}°C", summary.Temperature.ToString("0.0", CultureInfo.InvariantCulture));
            ApparentTemperature = string.Format("{0}°C", summary.ApparentTemperature.ToString("0.0", CultureInfo.InvariantCulture));
            IsOk = true;
            ErrorMessage = string.Empty;
        }

        public static WeatherSummaryViewModel GetFailed(string errorMessage = null)
        {
            return new WeatherSummaryViewModel(errorMessage ?? string.Empty);
        }

        private WeatherSummaryViewModel(string errorMessage)
        {
            IsOk = false;
            ErrorMessage = errorMessage;
        }
    }
}