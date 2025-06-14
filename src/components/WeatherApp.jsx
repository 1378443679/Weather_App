// WeatherApp.jsx
import { useState } from "react";
import SearchBar from "./SearchBar";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);

    const apiKey = "your api key"; // your api key from accuWeather Api

    try {
      // 1. Adım: Location Key al
      const locationRes = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${encodeURIComponent(city)}`
      );

      const locationData = await locationRes.json();
      if (!locationData.length) throw new Error("City not found");

      const locationKey = locationData[0].Key;
      const cityName = locationData[0].LocalizedName;
      const countryName = locationData[0].Country.LocalizedName;

      // 2. Adım: Hava Durumu al
      const weatherRes = await fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`
      );

      const weatherData = await weatherRes.json();
      if (!weatherData.length) throw new Error("No weather data available");

      const current = weatherData[0];
      const iconNumber = current.WeatherIcon.toString().padStart(2, "0");
      const iconUrl = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
      
      setWeather({
        city: cityName,
        country: countryName,
        text: current.WeatherText,
        temperature: current.Temperature.Metric.Value,
        unit: current.Temperature.Metric.Unit,
        iconUrl: iconUrl
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Weather App</h2>
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>{weather.city}, {weather.country}</h3>
          <img src={weather.iconUrl} alt={weather.text} />
          <p>{weather.text}</p>
          <p>{weather.temperature}°{weather.unit}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
