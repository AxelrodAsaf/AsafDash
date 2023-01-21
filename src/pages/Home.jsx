import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HandleUserData from '../firebase/HandleUserData';
import '../styles/App.css';

function Home(props) {

    const [currentUser, setCurrentUser] = useState('');


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

 
    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser}/>

            
            <div className='home-widgetgrid'>
            {/* <div themeLight={themeLight.toString()} className='home-widgetgrid'> */}
                <h1>Hello {currentUser? currentUser.FirstName : "guest"}!</h1>
                <p>Current Date And Time : {clock}</p>
                {/* <div className='home-widget homewidget1'></div>
                <div className='home-widget homewidget2'></div>
                <div className='home-widget homewidget3'></div>
                <div className='home-widget homewidget4'></div> */}
            </div>
        </div>
    );
}

export default Home;