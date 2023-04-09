import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/App.css';
import '../styles/Music.css';

function Music(props) {
  const themeLight = props.themeLight;
  const setThemeLight = props.setThemeLight;
  // var userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => console.log(data))
  }, [CLIENT_ID, CLIENT_SECRET]);

  return (
    <div className='all-css'>
      <Navbar serverURL={serverURL} themeLight={themeLight} setThemeLight={setThemeLight} />
      <div className='music-container'>
        <h1 className='music-h1'>Music</h1>
        <div className='music-subcontainer'>
          <div className="music-left">
            <div className="widget">
              <h1>Left</h1>
            </div>
          </div>
          <div className="music-right">
            <div className="widget">
              <h1>Right</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;