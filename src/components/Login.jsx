import React, { useState } from 'react';
import '../styles/App.css';
import HandleUserData from "../firebase/HandleUserData";


function Login(props) {
    const setOpenLogin = props.setOpenLogin;
    const setCurrentUser = props.setCurrentUser;
    const isLoggedIn = props.isLoggedIn;
    const setIsLoggedIn = props.setIsLoggedIn;
    const { getUser } = HandleUserData();
    const [errorMessages, setErrorMessages] = useState({});
    const [formToggle, setFormToggle] = useState(true);
    
    // Submit Login
    const loginSubmit = (event) => {

        // Prevent page reload
        event.preventDefault();
        var { email, password } = document.forms[0];

        // Find user login info
        const userData = getUser(email.value);

        // Compare user input to user data saved
        if (userData) {
            // If data saved equals input, defines a user is logged in, defines the logged in user, closes login box.
            if (userData.Password === password.value) {
                setCurrentUser(userData);
                setOpenLogin(false)
                setIsLoggedIn(true);
            }
            else {
                // Invalid password
                setErrorMessages({ name: "password", message: errors.password });
            }
        } 
        else {
            // Invalid email
            setErrorMessages({ name: "email", message: errors.email });
        }
    };

    // Defines possible errors while logging in...
    const errors = {
        email: "Could not find email, maybe it's misspelled?",
        pass: "Incorrect password, maybe you forgot yours?"
    };

    // When called with the type, generates the proper error message at login
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // Login form
    const loginForm = (
        <div className="login-form">

            {/* Login title with form */}
            <strong>Log in</strong>
            <form onSubmit={loginSubmit}>
                {/* Input of email */}
                <div className="login-input">
                    <input type="text" name="email" required className="login-form-email input" placeholder='Email' />
                    {renderErrorMessage("email")}
                </div>
                {/* Input of password */}
                <div className="login-input">
                    <input type="password" name="password" required className="login-form-password input" placeholder='Password' />
                    {renderErrorMessage("pass")}
                </div>
                {/* Submit button */}
                <div className="login-submit">
                    <input type="submit" className="login-form-submit button" />
                </div>
            </form>
            {/* Allows the user to switch to a sign-up form */}
            <button onClick={() => setFormToggle(!formToggle)}>SIGN UP</button>
        </div>
    );

    // *****(NOT WORKING YET)***** Submit Sign-up
    const signupSubmit = (data) => {
        // Prevent page reload
        data.preventDefault();

        // Redefine the variables locally
        const firstName = data.firstName;
        const email = data.email;
        const password = data.password;
        const vpassword = data.vpassword;

        // Create a new user saved as an object
        var tempNewUser = { firstName, email, password, vpassword };
    }

    // When called shows the proper form needed by the user
    function showForm(formToggle) {
        // (true is defined as login)
        if (formToggle === true) {
            return (loginForm)
        }
        // (false is defined as signup)
        else {
            return (signupForm)
        }
    }

    // *****(NOT WORKING YET)***** Signup form
    const signupForm = (
        <div className="signup-form">
            {/* Signup title with form */}
            <strong>Sign up</strong>
            <form onSubmit={signupSubmit}>
                {/* Input of first name */}
                <div className="signup-input">
                    <input type="text" name="firstName" required className="signup-form-firstName input" placeholder="First Name" />
                </div>
                {/* Input of email */}
                <div className="signup-input">
                    <input type="text" name="email" required className="signup-form-email input" placeholder="Email" />
                </div>
                {/* Input of password */}
                <div className="signup-input">
                    <input type="text" name="password" required className="signup-form-password input" placeholder="Password" />
                </div>
                {/* Input of verify password */}
                <div className="signup-input">
                    <input type="text" name="vpassword" required className="signup-form-vpassword input" placeholder="Verify Password" />
                </div>
                {/* Submit button */}
                <div className="signup-submit">
                    <input type="submit" className="signup-form-submit button" />
                </div>
            </form>
            {/* Allows the user to switch to a login form */}
            <button onClick={() => setFormToggle(!formToggle)}>LOG IN</button>
        </div>
    );

    return (
        <div className='all-css login-page-div'>
            {/* Shows the form of the login/signup when needed  */}
            {isLoggedIn ? <></> : showForm(formToggle)}
        </div>
    );
}

export default Login;