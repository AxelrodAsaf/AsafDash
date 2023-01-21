import React, { useState } from 'react';
import '../styles/App.css';
import HandleUserData from "../firebase/HandleUserData";

function Login(props) {
    const setOpenLogin = props.setOpenLogin;
    const setCurrentUser = props.setCurrentUser;
    const { addUser, getUser } = HandleUserData();
    const [errorMessages, setErrorMessages] = useState();
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
            if (userData.password === password.value) {
                setCurrentUser(userData);
                setOpenLogin(false)
            }
            else {
                // Invalid password
                setErrorMessages("pass");
            }
        }
        else {
            // Invalid email
            setErrorMessages("email");
        }
    };

    // Defines possible errors while logging in...
    const errors = {
        email: "Could not find email. Please try again.",
        pass: "Incorrect password. Please try again.",
        matchingpasswords: "Passwords did not match. Please try again.",
        tryLater: "Internal errors, try again later.",
        accountCreated: "Your account has been successfully created! Please login to continue."
    };

    // When called with the type, generates the proper error message at login
    const renderErrorMessage = (name) =>
        name === errorMessages && (
            <div className="error">{errors[name]}</div>
        );

    // Login form
    const loginForm = (
        <div className="login-form-div">

            {/* Login title with form */}
            <strong>Log in</strong>
            <form onSubmit={loginSubmit} className="login-form">
                {/* Input of email */}
                <div className="login-input">
                    <input type="text" name="email" required className="login-form-email input" placeholder='Email' />
                </div>
                {/* Input of password */}
                <div className="login-input">
                    <input type="password" name="password" required className="login-form-password input" placeholder='Password' />
                </div>
                {/* Submit button */}
                <div className="login-submit">
                    <input type="submit" className="login-form-submit button" />
                    <button className="toggleswap" onClick={() => setFormToggle(!formToggle)}>SIGN UP</button>
                </div>
            </form>
            {/* Allows the user to switch to a sign-up form */}
            {renderErrorMessage("email")}
            {renderErrorMessage("pass")}
        </div>
    );

    // Submit Sign-up
    const signupSubmit = (data) => {
        // Prevent page reload
        data.preventDefault();

        // Redefine the variables locally
        const firstName = data.target[0].value;
        const email = data.target[1].value;
        const password = data.target[2].value;
        const vpassword = data.target[3].value;

        // Check matching passwords
        if (password !== vpassword) {
            return setErrorMessages("matchingpasswords");
        }

        // Add user data to database
        try {
            var tempNewUser = { firstName: firstName, email: email, password: password };
            addUser(tempNewUser);
            setErrorMessages("accountCreated");
        }
        catch (e) {
            setErrorMessages("tryLater");
        }

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

    // Signup form
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
                    <input type="email" name="email" required className="signup-form-email input" placeholder="Email" />
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
                    {/* Allows the user to switch to a login form */}
                    <button onClick={() => setFormToggle(!formToggle)}>LOG IN</button>
                </div>
                {renderErrorMessage("matchingpasswords")}
                {renderErrorMessage("tryLater")}
                {renderErrorMessage("accountCreated")}
            </form>
        </div>
    );

    return (
        <div className='all-css login-page-div'>
            {/* Shows the form of the login/signup  */}
            {showForm(formToggle)}
        </div>
    );
}

export default Login;