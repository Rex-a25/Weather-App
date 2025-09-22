import { useState } from "react";

export default function Input({ onWeatherFetch }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 🔹 Step 1: Geocoding request
      const geocodeRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1`
      );
      const geocodeData = await geocodeRes.json();

      if (!geocodeData.results || geocodeData.results.length === 0) {
        setError("City not found.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geocodeData.results[0];

      // 🔹 Step 2: Weather request
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,relativehumidity_2m,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      // 🔹 Step 3: Pass data to parent
      onWeatherFetch({
        ...weatherData,
        city_name: `${name}, ${country}`,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 my-5">
      <input
        type="text"
        placeholder="Enter city (e.g., Lagos)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className={`px-5 py-2 rounded-lg text-white transition 
          ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
