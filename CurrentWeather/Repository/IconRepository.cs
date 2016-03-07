namespace CurrentWeather.Repository
{
    public class IconRepository : IIconRepository
    {
        public string GetIcon(string name)
        {
            switch (name.ToLower().Trim())
            {
                case "clear-day":
                    return "clear-day.png";
                case "clear-night":
                    return "clear-night.png";
                case "rain":
                    return "rain.png";
                case "snow":
                    return "snow.png";
                case "sleet":
                    return "sleet.png";
                case "wind":
                    return "wind.png";
                case "fog":
                    return "fog.png";
                case "cloudy":
                    return "cloudy.png";
                case "partly-cloudy-day":
                    return "cloudy.png";
                case "partly-cloudy-night":
                    return "cloudy.png";
            }
            return "weather-no-icon.png";
        }
    }
}