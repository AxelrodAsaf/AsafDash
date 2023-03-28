import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import '../styles/App.css';
import '../styles/Home.css';
import NewsSection from '../components/NewsSection';

function Home(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    const [localName, setLocalName] = useState('');
    const [localTemp, setLocalTemp] = useState('');
    const [localHumidity, setLocalHumidity] = useState('');
    const [localFeelsLike, setLocalFeelsLike] = useState('');
    const [localWeatherType, setLocalWeatherType] = useState('');
    const [temp, setTemp] = useState(true);
    const [convCurrency, setConvCurrency] = useState('');
    const [convCurrency2, setConvCurrency2] = useState('');
    var loggedInUser = localStorage.getItem('userLoggedIn');
    const currencyAPIURL = process.env.REACT_APP_CURRENCY_APIURL;
    const currencyAPIKEY = process.env.REACT_APP_CURRENCY_APIKEY;
    const currencyAPIHOST = process.env.REACT_APP_CURRENCY_APIHOST;
    const equals = ' = ';

    // Define the variable userFirstName as the local storage value of Dashboard-user-firstName
    const userFirstName = localStorage.getItem('Dashboard-user-firstName');


    // Clock widget:
    const [clock, setClock] = useState();
    useEffect(() => {
        const timer = setInterval(() => {
            setClock(new Date().toLocaleString());
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);


    // Weather widget:
    const [locLat, setLocLat] = useState();
    const [locLong, setLocLong] = useState();
    const weatherAPIkey1 = process.env.REACT_APP_WEATHER_APIKEY1;
    // const weatherAPIkey2 = process.env.REACT_APP_WEATHER_APIKEY2;
    function getWeatherData() {
        // Send to API
        // console.log(`Weather API request sent at ${clock}`);
        const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?lat=${locLat}&lon=${locLong}&appid=${weatherAPIkey1}`
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
            setLocLat(position.coords.latitude);
            // Get long
            setLocLong(position.coords.longitude);
        });
    }, []);
    useEffect(() => {
        if (locLat) {
            getWeatherData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locLat, locLong])
    useEffect(() => {
        setTemp(!temp)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localWeatherType])


    // Currency widget:
    useEffect(() => {
        async function fetchCurrencyData(have, want, setConvCurrency) {
            const options = {
                method: 'GET',
                url: currencyAPIURL,
                params: { have, want, amount: '1' },
                headers: {
                    'X-RapidAPI-Key': currencyAPIKEY,
                    'X-RapidAPI-Host': currencyAPIHOST
                }
            };
            try {
                const response = await axios.request(options);
                setConvCurrency(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCurrencyData('USD', 'ILS', setConvCurrency);
        fetchCurrencyData('ILS', 'USD', setConvCurrency2);
    }, [currencyAPIHOST, currencyAPIKEY, currencyAPIURL]);


    return (
        <div className='all-css'>
            {/* {loggedInUser? <Navbar themeLight={themeLight} setThemeLight={setThemeLight}/> : <Login/>} */}
            <Navbar themeLight={themeLight} setThemeLight={setThemeLight} />

            <div className="home-widgetgrid">
                <div className="home-left">
                    <div className="widget">
                        {/* If there's a user signed in, print their first name that is saved in local storage */}
                        <h1 className='home-namewidget'>Hey {loggedInUser ? userFirstName : "friend"}!</h1>
                    </div>
                    <div className="widget home-clock">
                        <p>Current Date and Time: </p>
                        <p><strong>{clock}</strong></p>
                    </div>
                    <div className="home-weather widget">
                        <div className="home-weather-left">
                            <p>City Name:</p>
                            <p>Conditions:</p>
                            <p>Temp:</p>
                            <p>Feels Like:</p>
                            <p>Humidity:</p>
                        </div>
                        <div className="home-weather-right">
                            <p><strong>{localName ? localName : <></>}</strong></p>
                            <p><strong>{localWeatherType ? localWeatherType : <></>}</strong></p>
                            <p><strong>{localTemp ? localTemp : <></>}°C   /   {Math.round((localTemp * (9 / 5)) + 32)}°F</strong></p>
                            <p><strong>{localFeelsLike ? localFeelsLike : <></>}°C   /   {Math.round((localFeelsLike * (9 / 5)) + 32)}°F</strong></p>
                            <p><strong>{localHumidity ? localHumidity : <></>}%</strong></p>
                        </div>
                    </div>
                    <div className="home-currency widget">
                        <div className="home-currency-left">
                            <div className="home-currency-left-sub">
                                <strong>{convCurrency.new_amount}</strong>
                                <strong>{convCurrency.new_currency}</strong>
                            </div>
                            <strong>{equals}</strong>
                            <div className="home-currency-left-sub">
                                <p>{convCurrency.old_amount}</p>
                                <p>{convCurrency.old_currency}</p>
                            </div>
                        </div>
                        <div className="home-currency-vl" />
                        <div className="home-currency-right">
                            <div className="home-currency-right-sub">
                                <strong>{convCurrency2.new_amount}</strong>
                                <strong>{convCurrency2.new_currency}</strong>
                            </div>
                            <strong>{equals}</strong>
                            <div className="home-currency-right-sub">
                                <p>{convCurrency2.old_amount}</p>
                                <p>{convCurrency2.old_currency}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-right">
                    <div className='home-news'>
                        <NewsSection searchInput={"News"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;