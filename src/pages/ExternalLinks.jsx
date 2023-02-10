import React from 'react';
// import Login from '../components/Login';
import Navbar from '../components/Navbar';

function ExternalLinks(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    // var userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));

    return (
        <div>
            {/* {userLoggedIn? <Navbar themeLight={themeLight} setThemeLight={setThemeLight}/> : <Login/>} */}
            <Navbar themeLight={themeLight} setThemeLight={setThemeLight} />
            <h1>ExternalLinks</h1>




        </div>
    );
}

export default ExternalLinks;