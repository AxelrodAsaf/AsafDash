import React, { useState } from 'react';
import '../styles/App.css';
import HandleUserData from "../firebase/HandleUserData";


function Login(props) {
    const setOpenLogin = props.setOpenLogin;
    const setCurrentUser = props.setCurrentUser;
    const currentUser = props.currentUser;
    const isLoggedIn = props.isLoggedIn;
    const setIsLoggedIn = props.setIsLoggedIn;
    const { getUser } = HandleUserData();
    const [errorMessages, setErrorMessages] = useState({});
    const [formToggle, setFormToggle] = useState(false);

    const errors = {
        email: "Could not find email, maybe it's misspelled?",
        pass: "Incorrect password, maybe you forgot yours?"
    };

    // Submit Login
    const loginSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        console.log("Trying to log in...");
        var { email, password } = document.forms[0];

        // Find user login info
        const userData = getUser(email.value);

        // Compare user info
        if (userData) {
            if (userData.Password !== password.value) {
                // Invalid password
                setErrorMessages({ name: "password", message: errors.password });
            } else {
                setCurrentUser(userData);
                setOpenLogin(false);
                console.log("User is signed in.");
                console.log(userData.email);
            }
        } else {
            // email not found
            setErrorMessages({ name: "email", message: errors.email });
        }
    };

    // Submit Sign-up
    const signupSubmit = (data) => {
        // Prevent page reload
        data.preventDefault();

        // Redefine the variables locally
        const firstName = data.firstName;
        const email = data.email;
        const password = data.password;
        const vpassword = data.vpassword;

        // Create a new user saved as an object
        var tempNewUser = { firstName, email, password, vpassword};

        //
    }

    // Generate error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // Login form
    const loginForm = (
        <div className="login-form">
            <strong>Log in</strong>
            <form onSubmit={loginSubmit}>
                <div className="login-input">
                    <input type="text" name="email" required className="login-form-email input" placeholder='Email'/>
                    {renderErrorMessage("email")}
                </div>
                <div className="login-input">
                    <input type="password" name="password" required className="login-form-password input" placeholder='Password'/>
                    {renderErrorMessage("pass")}
                </div>
                <div className="login-submit">
                    <input type="submit" className="login-form-submit button" />
                </div>
            </form>
                <button onClick={() => setFormToggle(!formToggle)}>SIGN UP</button>
        </div>
    );

    // Signup form
    const signupForm = (
        <div className="signup-form">
            <strong>Sign up</strong>
            <form onSubmit={signupSubmit}>
                <div className="signup-input">
                    <input type="text" name="firstName" required className="signup-form-firstName input" placeholder="First Name" />
                </div>
                <div className="signup-input">
                    <input type="text" name="email" required className="signup-form-email input" placeholder="Email" />
                </div>
                <div className="signup-input">
                    <input type="text" name="password" required className="signup-form-password input" placeholder="Password" />
                </div>
                <div className="signup-input">
                    <input type="text" name="vpassword" required className="signup-form-vpassword input" placeholder="Verify Password" />
                </div>
                <div className="signup-submit">
                    <input type="submit" className="signup-form-submit button" />
                </div>
            </form>
            <button onClick={() => setFormToggle(!formToggle)}>LOG IN</button>
        </div>
    );


    function showForm(formToggle) {
    if (formToggle === true) {
        return (loginForm)
    }
    else {
        return (signupForm)
    }
    }

    return (
        <div className='all-css login-page-div'>
            {isLoggedIn ? setOpenLogin(false) : showForm(formToggle)}
        </div>
    );
}

export default Login;