import React from 'react';
import Login from '../components/Login';
import Navbar from '../components/Navbar';

function ExternalLinks(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    return (
        <div>
            {loggedInUser ? <Navbar themeLight={themeLight} setThemeLight={setThemeLight} /> : <Login />}
            <h1>ExternalLinks</h1>




        </div>
    );
}

export default ExternalLinks;