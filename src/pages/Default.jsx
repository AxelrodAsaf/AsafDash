import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

function Default(props) {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <p>We're sorry, we couldn't find the page you were looking for.</p>
      <button onClick={() => navigate('/')}>HOME</button>
    </div>
  );
}

export default Default;