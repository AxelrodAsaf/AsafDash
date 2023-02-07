import React, { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';

function Login(props) {
    // const setOpenLogin = props.setOpenLogin;
    const [errorMessages, setErrorMessages] = useState();
    const [formToggle, setFormToggle] = useState(true);


    // // Submit Login
    // const loginSubmit = (event) => {
    //     const email = event.target[1].value;
    //     const password = event.target[2].value;

    //     // Prevent page reload
    //     event.preventDefault();

    //     // Find user login info


    //     // Compare user input to user data saved
    //     if (userData) {
    //         // If data saved equals input, saves logged in user to localstorage, closes login box.
    //         if (userData.password === password.value) {
    //             localStorage.setItem('loggedInUser', JSON.stringify(userData));
    //             setOpenLogin(false);
    //         }
    //         else {
    //             // Invalid password
    //             setErrorMessages("pass");
    //         }
    //     }
    //     else {
    //         // Invalid email
    //         setErrorMessages("email");
    //     }
    // };


    // Defines possible errors while logging in...
    const errors = {
        email: "Could not find a user with that email. Please try again.",
        pass: "Incorrect password entered. Please try again.",
        matchingpasswords: "Passwords did not match. Please try again.",
        tryLater: "Unknown error signing up, please try again.",
        accountCreated: "Your account has been successfully created! Please login to continue.",
        emailDuplicate: "The email entered is already being used. Please log in or use a different email."
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
            {/* <form onSubmit={loginSubmit} className="login-form"> */}
            <form className="login-form">
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
                    <button className="login-form-submit toggle-form" onClick={() => setFormToggle(!formToggle)}>SIGN UP</button>
                </div>
            </form>
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
        const newUser = {firstName, email, password, vpassword};

        // Check matching passwords
        if (password !== vpassword) {
            return setErrorMessages("matchingpasswords");
        }

        // Add user data to database
        try {
            // Send newUser to server to add to database
            axios.post('http://localhost:8000/signup', newUser)
            .then(() => {
                setErrorMessages("accountCreated");
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 409) {
                    setErrorMessages("emailDuplicate");
                }
                else {
                    setErrorMessages("tryLater");
                }
            })
            
        }
        catch (error) {
            setErrorMessages("tryLater");
        }
    }

    // Shows the proper form needed by the user when called
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
        <div className="signup-form-div">
            {/* Signup title with form */}
            <strong>Sign up</strong>
            <form className='signup-form' onSubmit={signupSubmit}>
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
                    <input type="submit" className="signup-form-submit" />
                    {/* Allows the user to switch to a login form */}
                    <button className="signup-form-submit toggle-form" onClick={() => setFormToggle(!formToggle)}>LOG IN</button>
                </div>
                {renderErrorMessage("matchingpasswords")}
                {renderErrorMessage("tryLater")}
                {renderErrorMessage("accountCreated")}
                {renderErrorMessage("emailDuplicate")}
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