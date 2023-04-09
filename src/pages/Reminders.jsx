import React from 'react';
import Navbar from '../components/Navbar';
// import Login from '../components/Login';

function Reminders(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    // var userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
    return (
        <div>
            {/* {userLoggedIn? <Navbar themeLight={themeLight} setThemeLight={setThemeLight}/> : <Login/>} */}
            <Navbar serverURL={serverURL} themeLight={themeLight} setThemeLight={setThemeLight} />
            <h1>Reminders</h1>




        </div>
    );
}

export default Reminders;