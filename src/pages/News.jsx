import React from 'react';
import Navbar from '../components/Navbar';
import NewsSection from '../components/NewsSection';
import Login from '../components/Login';

function News(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


    return (
        <div className='news-main'>
            {loggedInUser ? <Navbar themeLight={themeLight} setThemeLight={setThemeLight} /> : <Login />}

            <div className="news-page-div">
                <h1>News</h1>
                <div className="news-widgets">
                    <div className="news-left">
                        <NewsSection searchInput={"Seattle"}/>
                        <NewsSection searchInput={"Israel"}/>
                        <NewsSection searchInput={"World News"}/>
                    </div>
                    <div className="news-right">
                        <NewsSection searchInput={"Seahawks"}/>
                        <NewsSection searchInput={"Finance"}/>
                        <NewsSection searchInput={"Trending"}/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default News;