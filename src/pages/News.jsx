import React from 'react';
import Navbar from '../components/Navbar';

function News(props) {
    return (
        <div className='news-main'>
            <Navbar />
            <div className="news-page-div">
                <h1>News</h1>

                <div className="news-left">
                    <div className='news-widget'></div>
                    <div className='news-widget'></div>
                </div>
                <div className="news-right">
                    <div className='news-widget'></div>
                    <div className='news-widget'></div>
                </div>

            </div>
        </div>
    );
}

export default News;