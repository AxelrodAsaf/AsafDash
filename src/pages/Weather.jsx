import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import WeatherItem from '../components/WeatherItem';
import '../styles/App.css';
import '../styles/Weather.css';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function Weather(props) {
    const serverURL = props.serverURL;
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    const [weatherCities, setWeatherCities] = useState([]);
    const userToken = localStorage.getItem('Dashboard-user-token');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${serverURL}/getInfo/weather`, {
                headers: { Authorization: userToken ? userToken : undefined }
            });
            setWeatherCities(response.data.topicData);
        }
        getData();
        setIsLoading(false);
    }, [userToken, serverURL]);

    return (
        <>
            {isLoading ? <LoadingSpinner /> :
                <div className='weather-main'>
                    <Navbar serverURL={serverURL} themeLight={themeLight} setThemeLight={setThemeLight} />
                    <div className='weather-container'>
                        <h1 className='weather-h1'>Weather</h1>
                        <div className='weather-component-div'>
                            {weatherCities.map(city => (
                                <WeatherItem key={city} city={city} />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Weather;
