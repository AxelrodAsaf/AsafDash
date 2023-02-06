import React from 'react';
import Navbar from '../components/Navbar';
import Login from '../components/Login';

function DailyTrackers(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    return (
        <div>
            {loggedInUser ? <Navbar themeLight={themeLight} setThemeLight={setThemeLight} /> : <Login />}
            <h1>DailyTrackers</h1>




        </div>
    );
}

export default DailyTrackers;