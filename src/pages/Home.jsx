import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HandleUserData from '../firebase/HandleUserData';
import '../styles/App.css';

function Home(props) {

    const [clock, setClock] = useState();

    useEffect(() => {
        const timer = setInterval(() => {
            setClock(new Date().toLocaleString());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div className='home-widgetgrid'>
                <h1>Hello, Asaf!</h1>
                <p>Current Date And Time : {clock}</p>
                <div className='home-widget homewidget1'></div>
                <div className='home-widget homewidget2'></div>
                <div className='home-widget homewidget3'></div>
                <div className='home-widget homewidget4'></div>
            </div>
        </div>
    );
}

export default Home;