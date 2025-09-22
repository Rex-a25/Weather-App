import React, { useState } from "react";
import Input from "./Input";

const Weather = () => {
  const [weatherData, setWeatherData] = useState("");

  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";
    if ([1, 2].includes(code)) return "🌤️";
    if (code === 3) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if (code >= 51 && code <= 57) return "🌦️";
    if (code >= 61 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "🌨️";
    if (code >= 80 && code <= 82) return "🌧️";
    if (code >= 85 && code <= 86) return "🌨️";
    if (code === 95) return "⛈️";
    if (code >= 96 && code <= 99) return "🌩️";
    return "❓";
  };

  const getCurrentHourIndex = () => {
    if (!weatherData?.current_weather?.time || !weatherData?.hourly?.time)
      return 0;
    return weatherData.hourly.time.indexOf(weatherData.current_weather.time);
  };

  const currentIndex = getCurrentHourIndex();

  return (
    <div className="min-h-screen bg-[#0a0a2a] p-4 sm:p-6 md:p-8 text-white flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Left Section (Input + Current + Daily) */}
      <div className="flex-1 flex flex-col gap-6">
        <Input onWeatherFetch={setWeatherData} />

        {/* Current Weather */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div>
            <h2 className="text-lg font-semibold">{weatherData?.city_name}</h2>
            <p className="text-sm text-gray-200">Today’s forecast</p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <span className="text-5xl">
              {weatherData?.current_weather &&
                getWeatherIcon(weatherData.current_weather.weathercode)}
            </span>
            <span className="text-6xl font-bold ml-3">
              {weatherData?.current_weather?.temperature}°C
            </span>
          </div>
        </div>

        {/* Extra Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#1a1a3d] rounded-xl p-5 flex flex-col items-center">
            <h5 className="text-gray-300">Feels Like</h5>
            <h1 className="text-xl font-semibold">
              {weatherData?.current_weather?.temperature ?? "--"}°
            </h1>
          </div>
          <div className="bg-[#1a1a3d] rounded-xl p-5 flex flex-col items-center">
            <h5 className="text-gray-300">Humidity</h5>
            <h1 className="text-xl font-semibold">
              {weatherData?.hourly?.relativehumidity_2m?.[currentIndex] ?? "--"}%
            </h1>
          </div>
          <div className="bg-[#1a1a3d] rounded-xl p-5 flex flex-col items-center">
            <h5 className="text-gray-300">Wind</h5>
            <h1 className="text-xl font-semibold">
              {weatherData?.current_weather?.windspeed ?? "--"} km/h
            </h1>
          </div>
          <div className="bg-[#1a1a3d] rounded-xl p-5 flex flex-col items-center">
            <h5 className="text-gray-300">Precipitation</h5>
            <h1 className="text-xl font-semibold">
              {weatherData?.hourly?.precipitation?.[currentIndex] ?? 0} mm
            </h1>
          </div>
        </div>

        {/* Daily Forecast */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Daily forecast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {weatherData?.daily?.temperature_2m_max?.map((max, i) => (
              <div
                key={i}
                className="bg-[#1a1a3d] rounded-xl p-4 flex flex-col items-center shadow-md hover:scale-105 transition-transform"
              >
                <span className="font-medium">
                  {new Date(weatherData.daily.time[i]).toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                  )}
                </span>
                <span className="text-3xl my-2">
                  {getWeatherIcon(weatherData.daily.weathercode[i])}
                </span>
                <div className="flex gap-2 text-sm">
                  <span>{max}°</span>
                  <span className="text-gray-400">
                    {weatherData.daily.temperature_2m_min[i]}°
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section (Hourly Forecast) */}
      <div className="w-full lg:w-80 bg-[#1a1a3d] rounded-xl p-4 sm:p-6 shadow-lg h-fit">
        <h2 className="text-lg font-semibold mb-4">Hourly forecast</h2>
        <div className="flex flex-col gap-3">
          {weatherData?.hourly?.temperature_2m?.slice(0, 8).map((temp, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-[#0f0f2d] rounded-lg"
            >
              <span className="text-sm">
                {new Date(weatherData.hourly.time[i]).toLocaleTimeString(
                  "en-US",
                  { hour: "numeric" }
                )}
              </span>
              <span className="text-lg">
                {getWeatherIcon(weatherData.hourly.weathercode[i])}
              </span>
              <span className="text-sm">{temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
