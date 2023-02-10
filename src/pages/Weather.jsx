import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
// import Login from '../components/Login';

function Weather(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    // var userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
    const [localName, setLocalName] = useState('');
    const [localTemp, setLocalTemp] = useState('');
    const [localHumidity, setLocalHumidity] = useState('');
    const [localFeelsLike, setLocalFeelsLike] = useState('');
    const [localWeatherType, setLocalWeatherType] = useState('');
    const [temp, setTemp] = useState(true);

    const [locLati, setLocLati] = useState();
    const [locLong, setLocLong] = useState();
    const weatherAPIkey1 = "387655d2c9cf811e47eca2bb05be0434";
    // const weatherAPIkey2 = "6367cfbb689a28190bcd5a74e0ea3b8a";
    function getWeatherData() {
        // Send to API
        console.log(`Weather API request sent.`);
        const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?lat=${locLati}&lon=${locLong}&appid=${weatherAPIkey1}`
        axios.get(weatherAPIurl).then((response) => {
            setLocalName(response.data.name);
            setLocalFeelsLike(Math.round(response.data.main.feels_like - 273.15));
            setLocalHumidity(response.data.main.humidity);
            setLocalTemp(Math.round(response.data.main.temp - 273.15));
            setLocalWeatherType(response.data.weather[0].main);
        })
    }
    useEffect(() => {
        // Get the location
        navigator.geolocation.getCurrentPosition(function (position) {
            // Get lat
            setLocLati(position.coords.latitude);
            // Get long
            setLocLong(position.coords.longitude);
        });
    }, []);
    useEffect(() => {
        if (locLati) {
            getWeatherData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locLati, locLong])
    useEffect(() => {
        setTemp(!temp)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localWeatherType])

    // http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}


    return (
        <div>
            {/* {userLoggedIn? <Navbar themeLight={themeLight} setThemeLight={setThemeLight}/> : <Login/>} */}
            <Navbar themeLight={themeLight} setThemeLight={setThemeLight} />

            <h1>Weather</h1>

            <div className="home-weather widget">
                <div className="home-weather-left">
                    {/* <p>Latitude:</p>
                            <p>Longitude:</p> */}
                    <p>City Name:</p>
                    <p>Conditions:</p>
                    <p>Temp:</p>
                    <p>Feels Like:</p>
                    <p>Humidity:</p>
                </div>
                <div className="home-weather-right">
                    {/* <p><strong>{locLati ? locLati : <></>}</strong></p>
                            <p><strong>{locLong? locLong : <></>}</strong></p> */}
                    <p><strong>{localName ? localName : <></>}</strong></p>
                    <p><strong>{localWeatherType ? localWeatherType : <></>}</strong></p>
                    <p><strong>{localTemp ? localTemp : <></>}°C   /   {Math.round((localTemp * (9 / 5)) + 32)}°F</strong></p>
                    <p><strong>{localFeelsLike ? localFeelsLike : <></>}°C   /   {Math.round((localFeelsLike * (9 / 5)) + 32)}°F</strong></p>
                    <p><strong>{localHumidity ? localHumidity : <></>}%</strong></p>
                </div>
            </div>
        </div>
    );
}

export default Weather;