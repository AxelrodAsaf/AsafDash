import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NewsSection from '../components/NewsSection';
import axios from 'axios';
import '../styles/App.css';
import '../styles/News.css';

function News(props) {
  const serverURL = props.serverURL;
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
        const response = await axios.get(`${serverURL}/getInfo/news`, {
          headers: { Authorization: userToken }
        });
        setDisplayData(response.data.topicData);
      } catch (error) {
        // console.error(error);
      }
    }
    getUserInfo();
  }, [userToken, serverURL]);

  return (
    <div className='news-main'>
      <Navbar serverURL={serverURL} themeLight={themeLight} setThemeLight={setThemeLight} />
      <div className="news-page-div">
        <h1>News</h1>
        <div className="news-widgets">
          {displayData && displayData.length > 0 && displayData.map((item) => (
            <NewsSection serverURL={serverURL} key={item} searchInput={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;