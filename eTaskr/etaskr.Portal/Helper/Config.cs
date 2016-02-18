using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace etaskr.Portal.Helper
{
    public static class Config
    {
        private const string ForecastApiKeyKeyword = "ForecastApiKey";
        private const string ReloadFrequencyKeyword = "ReloadFrequency";

        public static string ForecastApiKey
        {
            get { return ConfigurationManager.AppSettings[ForecastApiKeyKeyword]; }
        }

        public static string ReloadFrequency
        {
            get { return ConfigurationManager.AppSettings[ReloadFrequencyKeyword]; }
        }
    }
}