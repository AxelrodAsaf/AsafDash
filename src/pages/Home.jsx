import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/App.css';

function Home(props) {
    return (
        <div>
            <Navbar />
            <div className='home-widgetgrid'>
                <div className='home-widget homewidget1'></div>
                <div className='home-widget homewidget2'></div>
                <div className='home-widget homewidget3'></div>
                <div className='home-widget homewidget4'></div>
            </div>
        </div>
    );
}

export default Home;