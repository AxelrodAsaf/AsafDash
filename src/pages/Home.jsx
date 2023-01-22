import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/App.css';

function Home(props) {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

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
        // Get the location
        useEffect(() => {
            navigator.geolocation.getCurrentPosition(function (position) {
                // Get lat
                setLocLati(position.coords.latitude);
                // Get long
                setLocLong(position.coords.longitude);
                });
        })
        // Send to API
            // const weatherAPIurl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
            // const weatherAPIkey = "387655d2c9cf811e47eca2bb05be0434"


    return (
        <div className='all-css'>
            <Navbar />


            <div className='home-widgetgrid'>
                {/* <div themeLight={themeLight.toString()} className='home-widgetgrid'> */}
                <h1>Hello {loggedInUser ? loggedInUser.firstName : "guest"}!</h1>
                <p>Current Date And Time : {clock}</p>
                <p>Latitude: {locLati}</p>
                <p>Longitude: {locLong}</p>
                {/* <div className='home-widget homewidget1'></div>
                <div className='home-widget homewidget2'></div>
                <div className='home-widget homewidget3'></div>
                <div className='home-widget homewidget4'></div> */}
            </div>
        </div>
    );
}

export default Home;