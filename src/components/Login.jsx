import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import HandleUserData from "../firebase/HandleUserData";


function Login(props) {
    
    const currentUser = props.currentUser;
    const setCurrentUser = props.setCurrentUser;

    const navigate = useNavigate();
    const { getUser } = HandleUserData();

    const [errorMessages, setErrorMessages] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const errors = {
        email: "Could not find email, maybe it's misspelled?",
        pass: "Incorrect password, maybe you forgot yours?"
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        var { email, pass } = document.forms[0];

        // Find user login info
        const userData = getUser(email.value);

        // Compare user info
        if (userData) {
            if (userData.Password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setCurrentUser(userData.Email);
            }
        } else {
            // email not found
            setErrorMessages({ name: "email", message: errors.email });
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
                    <input type="text" name="email" required className="login-form-email input" placeholder='Email'/>
                    {renderErrorMessage("email")}
                </div>
                <div className="login-input">
                    <input type="password" name="pass" required className="login-form-password input" placeholder='Password'/>
                    {renderErrorMessage("pass")}
                </div>
                <div className="login-submitsignup">
                    <input type="submit" className="login-form-submit button" />
                </div>
            </form><br />
            <button type="text" className="login-form-signup button" onClick={() => navigate(`/Signup`)}>Sign up</button>
        </div>
    );

    return (
        <div className='all-css login-page-div'>
            {/* {!isLoggedIn ? openForm() : <></>} */}
            {isLoggedIn ? < Navigate to={'/Home'} /> : renderForm}
        </div>
    );
}

export default Login;