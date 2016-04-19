using CodingTask.Models;

namespace CodingTask.Services
{
    public interface IForecastService
    {
        CurrentWeather GetCurrentWeather(string latitude, string longitude);
    }
}