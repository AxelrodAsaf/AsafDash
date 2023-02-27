import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NewsSection from '../components/NewsSection';
import axios from 'axios';
// import Login from '../components/Login';

function News(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    const [displayData, setDisplayData] = useState();

    // When the page renders, check to see if a user is logged in
    // Define the userLoggedIn variable from local storage
    var userLoggedIn = localStorage.getItem('userLoggedIn');
    const userToken = localStorage.getItem('Dashboard-user-token');
    // If userLoggedIn is null set the userLoggedIn variable to 'default'
    if (userLoggedIn === null) {
        userLoggedIn = 'default';
    }

    useEffect(() => {
        async function getUserInfo() {
            try {
                const response = await axios.get('http://localhost:8000/getInfo/news', {
                    headers: { Authorization: userToken }
                });
                setDisplayData(response.data.topicData);
                console.log(`The data received from the server: ${response.data.topicData}`);
            } catch (error) {
                console.error(error);
            }
        }
        getUserInfo();
    }, [userToken]);

    return (
        <div className='news-main'>
            <Navbar themeLight={themeLight} setThemeLight={setThemeLight} />
            <div className="news-page-div">
                <h1>News</h1>
                <div className="news-widgets">
                    {displayData && displayData.length > 0 && displayData.map((item) => (
                        <NewsSection key={item} searchInput={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;