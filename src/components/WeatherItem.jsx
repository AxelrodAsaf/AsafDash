import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/App.css';
import '../styles/Weather.css';

function WeatherItem(props) {
  const [city, setCity] = useState(props.city);
  const [localTemp, setLocalTemp] = useState('');
  const [localHumidity, setLocalHumidity] = useState('');
  const [localFeelsLike, setLocalFeelsLike] = useState('');
  const [localWeatherType, setLocalWeatherType] = useState('');
  const weatherAPIkey1 = "387655d2c9cf811e47eca2bb05be0434";
  // const weatherAPIkey2 = "6367cfbb689a28190bcd5a74e0ea3b8a";


  useEffect(() => {
    function getCityWeather(city) {
      // Send to API
      console.log(`City Weather API request sent.`);
      const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIkey1}`;
      axios.get(weatherAPIurl).then((response) => {
        setCity(response.data.name);
        setLocalFeelsLike(Math.round(response.data.main.feels_like - 273.15));
        setLocalHumidity(response.data.main.humidity);
        setLocalTemp(Math.round(response.data.main.temp - 273.15));
        setLocalWeatherType(response.data.weather[0].main);
      })
    }
    getCityWeather(city);
  }, [city, setCity])

  return (
    <div>
      <div className="all-css weather-widget">
        <div className="weather-left">
          <p>City Name:</p>
          <p>Conditions:</p>
          <p>Temp:</p>
          <p>Feels Like:</p>
          <p>Humidity:</p>
        </div>
        <div className="weather-right">
          <p><strong>{city ? city : <></>}</strong></p>
          <p><strong>{localWeatherType ? localWeatherType : <></>}</strong></p>
          <p><strong>{localTemp ? localTemp : <></>}°C   /   {Math.round((localTemp * (9 / 5)) + 32)}°F</strong></p>
          <p><strong>{localFeelsLike ? localFeelsLike : <></>}°C   /   {Math.round((localFeelsLike * (9 / 5)) + 32)}°F</strong></p>
          <p><strong>{localHumidity ? localHumidity : <></>}%</strong></p>
        </div>
      </div>
    </div>
  );
}

export default WeatherItem;