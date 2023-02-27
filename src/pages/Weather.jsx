import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import WeatherItem from '../components/WeatherItem';

function Weather(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    const [weatherCities, setWeatherCities] = useState([]);
    const userToken = localStorage.getItem('Dashboard-user-token');

    useEffect(() => {
        async function getData() {
            const response = await axios.get('http://localhost:8000/getInfo/weather', {
                headers: { Authorization: userToken ? userToken : undefined }
            });
            setWeatherCities(response.data.topicData);
        }
        getData();
    }, [userToken]);

    return (
        <div className='weather-main'>
            <Navbar themeLight={themeLight} setThemeLight={setThemeLight}/>
            <h1 className='weather-h1'>Weather</h1>
            <div className='weather-component-div'>
                {weatherCities.map(city => (
                    <WeatherItem key={city} city={city} />
                ))}
            </div>
        </div>
    );
}

export default Weather;
