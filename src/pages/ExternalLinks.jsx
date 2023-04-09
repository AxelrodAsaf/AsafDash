import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/ExternalLinks.css';

function ExternalLinks(props) {
  const serverURL = props.serverURL;
  const themeLight = props.themeLight;
  const setThemeLight = props.setThemeLight;
  const [externalLinks, setExternalLinks] = useState([]);
  const userToken = localStorage.getItem('Dashboard-user-token');

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`${serverURL}/getInfo/externallinks`, {
        headers: { Authorization: userToken ? userToken : undefined }
      });
      setExternalLinks(response.data.topicData);
    }
    getData();
  }, [userToken]);

  return (
    <div>
      <Navbar serverURL={serverURL} themeLight={themeLight} setThemeLight={setThemeLight} />
      <div className='external-main'>
        <h1>External Links</h1>

        {externalLinks.map(website => (
          <div>
            <a href={website}>
              <h2>{website}</h2>
            </a>
            <br />
          </div>
        ))}

      </div>
    </div>
  );
}

export default ExternalLinks;