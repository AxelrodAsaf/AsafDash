import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function LastSignIn(props) {
  const serverURL = props.serverURL;
  const chartRef = useRef(null);
  const userToken = localStorage.getItem('Dashboard-user-token');
  let userObject = null;

  // Get the lastSignIn value from the database
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(`${serverURL}/getInfo/news`, {
          headers: { Authorization: userToken ? userToken : undefined }
        });
          // eslint-disable-next-line react-hooks/exhaustive-deps
          userObject = response.data.user;
          // Create chart data
          const labels = Object.keys(userObject.lastTokenVerif);
          const data = Object.values(userObject.lastTokenVerif);
          // Create chart
          new Chart(chartRef.current, {
            type: 'line',
            data: {
              labels,
              datasets: [{
                data,
                label: 'Requests per Day',
                borderColor: 'black',
                fill: false
              }]
            },
            options: {
              // responsive: false,
              maintainAspectRatio: false
            }
          });
      }
      catch (error) {
        console.error(error);
      }
    }
    getUserInfo();
  }, [userToken]);

  return (
    <div className="widget" >
      <canvas ref={chartRef} style={{ background: "white" }} />
    </div>
  );
}
