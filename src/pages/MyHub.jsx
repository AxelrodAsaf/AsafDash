import React from 'react';
import Navbar from '../components/Navbar';
// import Login from '../components/Login';

function MyHub(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    // var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return (
        <div>
            {/* {loggedInUser? <Navbar themeLight={themeLight} setThemeLight={setThemeLight}/> : <Login/>} */}
            <Navbar themeLight={themeLight} setThemeLight={setThemeLight} />
            <h1>MyHub</h1>




        </div>
    );
}

export default MyHub;