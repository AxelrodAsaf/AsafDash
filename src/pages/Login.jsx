import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import HandleUserData from "../firebase/HandleUserData";


function Login(props) {
    
    const navigate = useNavigate();
    const { getUser } = HandleUserData();

    const [errorMessages, setErrorMessages] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const errors = {
        uname: "Could not find username, maybe it's misspelled?",
        pass: "Incorrect password, maybe you forgot yours?"
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = getUser(uname.value);

        // Compare user info
        if (userData) {
            if (userData.Password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsLoggedIn(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // Login form
    const renderForm = (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <div className="login-input">
                    <label>Username</label>
                    <input type="text" name="uname" required className="login-form-username input" />
                    {renderErrorMessage("uname")}
                </div>
                <div className="login-input">
                    <label>Password</label>
                    <input type="password" name="pass" required className="login-form-password input" />
                    {renderErrorMessage("pass")}
                </div>
                <div className="login-submitsignup">
                    <input type="submit" className="login-form-submit button" />
                </div>
            </form>
            <button type="text" className="login-form-signup button" onClick={() => navigate(`/Signup`)}>Sign up</button>
        </div>
    );


    return (
        <div className='all-css login-page-div'>
            <h1>Welcome to Asaf's Dashboard!</h1>
            <h3>Please sign in to begin...</h3>

            {isLoggedIn ? < Navigate to={'/Home'} /> : renderForm}
        </div>
    );
}

export default Login;