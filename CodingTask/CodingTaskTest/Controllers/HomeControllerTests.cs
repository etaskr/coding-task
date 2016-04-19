using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using CodingTask.Services;
using CodingTask.Models;
using System.Web.Mvc;
using System;

namespace CodingTask.Controllers.Tests
{
    [TestClass()]
    public class HomeControllerTests
    {
        [TestMethod()]
        public void GetCurrentWeatherTest()
        {
            CurrentWeather mockWeather = new CurrentWeather
            {
                temperature = 10.5,
                icon = "sunny",
                summary = "Clear Day"
            };

            Mock<IForecastService> mockForecastService = new Mock<IForecastService>();
            mockForecastService.Setup(x => x.GetCurrentWeather(It.IsAny<string>(), It.IsAny<string>())).Returns(mockWeather);

            var controller = new HomeController(mockForecastService.Object);
            var result = (JsonResult)controller.GetCurrentWeather("100", "-100");
            var weather = (CurrentWeather)result.Data;

            Assert.AreEqual(10.5, weather.temperature);
            Assert.AreEqual("sunny", weather.icon);
            Assert.AreEqual("Clear Day", weather.summary);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void GetCurrentWeather_NullLatitudeParamTest()
        {
            Mock<IForecastService> mockForecastService = new Mock<IForecastService>();
            var controller = new HomeController(mockForecastService.Object);
            controller.GetCurrentWeather(null, "-100");
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void GetCurrentWeather_latitudeEmptyStringParamTest()
        {
            Mock<IForecastService> mockForecastService = new Mock<IForecastService>();
            var controller = new HomeController(mockForecastService.Object);
            controller.GetCurrentWeather("", "-100");
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void GetCurrentWeather_NullLongitudeParamTest()
        {
            Mock<IForecastService> mockForecastService = new Mock<IForecastService>();
            var controller = new HomeController(mockForecastService.Object);
            controller.GetCurrentWeather("100", null);
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void GetCurrentWeather_longitudeEmptyStringParamTest()
        {
            Mock<IForecastService> mockForecastService = new Mock<IForecastService>();
            var controller = new HomeController(mockForecastService.Object);
            controller.GetCurrentWeather("100", "");
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void GetCurrentWeather_EmptyStringParamTest()
        {
            Mock<IForecastService> mockForecastService = new Mock<IForecastService>();
            var controller = new HomeController(mockForecastService.Object);
            controller.GetCurrentWeather("", "");
        }

        [TestMethod()]
        [ExpectedException(typeof(ArgumentException))]
        public void GetCurrentWeather_NullParamTest()
        {
            Mock<IForecastService> mockForecastService = new Mock<IForecastService>();
            var controller = new HomeController(mockForecastService.Object);
            controller.GetCurrentWeather(null, null);
        }
    }
}