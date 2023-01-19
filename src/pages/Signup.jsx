import React from 'react';
import { useNavigate } from 'react-router-dom';


function Signup(props) {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Signup</h1>



            <button type="text" className="login-form-signup button" onClick={() => navigate(`/Login`)}>Login</button>
        </div>
    );
}

export default Signup;