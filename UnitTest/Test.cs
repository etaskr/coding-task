using CurrentWeather.Helper;
using CurrentWeather.Models.Json;
using NUnit.Framework;

namespace UnitTest
{
    [TestFixture]
    public partial class Test
    {
        [Test]
        public void ForecastJsonReaderTest()
        {
            WeatherSummary weatherSummary = _jsonData.ReadForecastJson();
            Assert.AreEqual(weatherSummary.Timezone,  "Australia/Melbourne");
            Assert.AreEqual(weatherSummary.Temperature, ForecastJsonReader.CelsiusToFahrenheit(75.81));
            Assert.AreEqual(weatherSummary.ApparentTemperature, ForecastJsonReader.CelsiusToFahrenheit(75.81));
            Assert.AreEqual(weatherSummary.Summary, "Clear");
            Assert.AreEqual(weatherSummary.Icon, "clear-day");
        }
    }
}
