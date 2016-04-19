using Newtonsoft.Json;
using System.Collections.Generic;

namespace CodingTask.Models
{
    public class CurrentWeather
    {
        public int time { get; set; }
        public string summary { get; set; }
        public string icon { get; set; }
        public double temperature { get; set; }
        public double apparentTemperature { get; set; }
    }

    public class RootObject
    {
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string timezone { get; set; }
        public int offset { get; set; }
        public CurrentWeather currently { get; set; }
    }

}
