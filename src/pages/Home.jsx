import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import '../styles/App.css';
import { async } from '@firebase/util';
import CurrencyConverter from 'react-currency-conv/dist/currencyConverter';

function Home(props) {
    const [weatherData, setWeatherData] = useState({});
    const [localName, setLocalName] = useState('');
    const [localTemp, setLocalTemp] = useState('');
    const [localHumidity, setLocalHumidity] = useState('');
    const [localFeelsLike, setLocalFeelsLike] = useState('');
    const [localWeatherType, setLocalWeatherType] = useState('');
    const [convCurrency, setConvCurrency] = useState('');
    const [convCurrency2, setConvCurrency2] = useState('');
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [temp, setTemp] = useState(true)


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
    const [locLati, setLocLati] = useState();
    const [locLong, setLocLong] = useState();
    const weatherAPIkey1 = "387655d2c9cf811e47eca2bb05be0434";
    const weatherAPIkey2 = "6367cfbb689a28190bcd5a74e0ea3b8a";
    function getWeatherData() {
        // Send to API
        const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?lat=${locLati}&lon=${locLong}&appid=${weatherAPIkey2}`
        axios.get(weatherAPIurl).then((response) => {
            setWeatherData(response.data);
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
    }, [locLati,locLong])
    useEffect(()=>{
        setTemp(!temp)
    },[localWeatherType])


    // Currency converter widget:
        // USD to ILS
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
            params: { have: 'USD', want: 'ILS', amount: '1' },
            headers: {
                'X-RapidAPI-Key': '403e5d243dmsh3c412b6a6d053d7p199ec7jsn140646d96bb9',
                'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            console.log(response.data);
            setConvCurrency(response.data)
        }).catch(function (error) {
            console.error(error);
        });
    }, []);
        // ILS to USD
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
            params: { have: 'ILS', want: 'USD', amount: '1' },
            headers: {
                'X-RapidAPI-Key': '403e5d243dmsh3c412b6a6d053d7p199ec7jsn140646d96bb9',
                'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            console.log(response.data);
            setConvCurrency2(response.data)
        }).catch(function (error) {
            console.error(error);
        });
    }, []);








    return (
        <div className='all-css'>
            <Navbar />


            <div className={`home-widgetgrid`}>
                <div className="home-left">
                    <div className="widget">
                        <h1 className='home-namewidget'>Hey {loggedInUser ? loggedInUser.firstName : "friend"}!</h1>
                    </div>
                    <div className="widget home-clock">
                        <p>Current Date and Time: </p>
                        <p><strong>{clock}</strong></p>
                    </div>
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
                            <p><strong>{localName? localName : <></>}</strong></p>
                            <p><strong>{localWeatherType? localWeatherType : <></>}</strong></p>
                            <p><strong>{localTemp ? localTemp : <></>}°C   /   {Math.round((localTemp * (9 / 5)) + 32)}°F</strong></p>
                            <p><strong>{localFeelsLike ? localFeelsLike : <></>}°C   /   {Math.round((localFeelsLike * (9 / 5)) + 32)}°F</strong></p>
                            <p><strong>{localHumidity? localHumidity : <></>}%</strong></p>
                        </div>
                    </div>
                    <div className="home-currency widget">
                        <div className="home-currency-left">
                            <div className="home-currency-left-sub">
                                <strong>{convCurrency.new_currency}-</strong>
                                <strong>{convCurrency.new_amount}</strong>
                            </div>
                            <div className="home-currency-left-sub">
                                <p>{convCurrency.old_currency}-</p>
                                <p>{convCurrency.old_amount}</p>
                            </div>
                        </div>
                        <div className="home-currency-vl"/>
                        <div className="home-currency-right">
                            <div className="home-currency-right-sub">
                                <strong>{convCurrency2.new_currency}-</strong>
                                <strong>{convCurrency2.new_amount}</strong>
                            </div>
                            <div className="home-currency-right-sub">
                                <p>{convCurrency2.old_currency}-</p>
                                <p>{convCurrency2.old_amount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-right">
                    <div className='testwidget'></div>
                    <div className='testwidget'></div>
                    <div className='testwidget'></div>
                    <div className='testwidget'></div>
                </div>
            </div>
        </div>
    );
}

export default Home;