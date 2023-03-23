import React, { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';

function Login(props) {
    const themeLight = props.themeLight;
    const setOpenLogin = props.setOpenLogin;
    const [errorMessages, setErrorMessages] = useState();
    const [formToggle, setFormToggle] = useState(true);


    function clearForms() {
        setLoginEmail("");
        setLoginPass("");
        setSignupEmail("");
        setSignupFirstName("");
        setSignupPass("");
        setSignupVPass("");
    }

    // Shows the proper form needed by the user when called
    function formType(formToggle) {
        // (true is defined as login)
        if (formToggle === true) {
            return (loginForm)
        }
        // (false is defined as signup)
        else {
            return (signupForm)
        }
    }

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
            <div className="error" style={{ textAlign: "center" }}>{errors[name]}</div>
        );

    // Submit Login
    const loginSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        const lowerLoginEmail = loginEmail.toLowerCase();
        // Define an object with the form data to send to the server
        const sendServerLogin = { lowerLoginEmail, loginPass };

        // Send the information to the server to check if login is valid
        try {
            axios.post('https://asafdashserver.onrender.com/login', sendServerLogin)
                .then((res) => {
                    clearForms();
                    // Save the token to local storage
                    localStorage.setItem('Dashboard-user-token', res.data.token);
                    // Save the user email to local storage
                    localStorage.setItem('userLoggedIn', res.data.email);
                    // Save the user name to local storage
                    localStorage.setItem('Dashboard-user-firstName', res.data.firstName);
                    // Close the login form
                    setOpenLogin(false);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response.status === 400) {
                        setErrorMessages("email");
                    } else if (error.response.status === 401) {
                        setErrorMessages("pass");
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

    // Login form
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const loginForm = (
        <div className="login-form-div">
            <strong>Log in</strong>
            <form onSubmit={loginSubmit} className="login-form">
                <div className="login-input">
                    <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} id='loginForm-email' type="text" name="email" required className="login-form-email input" placeholder='Email' />
                </div>
                <div className="login-input">
                    <input value={loginPass} onChange={(e) => setLoginPass(e.target.value)} id='loginForm-password' type="password" name="password" required className="login-form-password input" placeholder='Password' />
                </div>
                <div className="login-submit">
                    <button onClick={() => loginSubmit} className="login-form-submit-button cursorPointer">SUBMIT</button>
                </div>
            </form>
            {renderErrorMessage("email")}
            {renderErrorMessage("pass")}
            {renderErrorMessage("tryLater")}
        </div>
    );

    // Submit Signup
    const signupSubmit = (data) => {
        // Prevent page reload
        data.preventDefault();

        // Redefine the variables locally
        const firstName = signupFirstName;
        const email = signupEmail;
        const lowerEmail = email.toLowerCase();
        const password = signupPass;
        const vpassword = signupVPass;
        const newUser = { firstName, lowerEmail, password, vpassword };

        // Check matching passwords
        if (password !== vpassword) {
            return setErrorMessages("matchingpasswords");
        }

        // Add user data to database
        try {
            // Send newUser to server to add to database
            axios.post('https://asafdashserver.onrender.com/signup', newUser)
                .then(() => {
                    clearForms();
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

    // Signup form
    const [signupFirstName, setSignupFirstName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPass, setSignupPass] = useState("");
    const [signupVPass, setSignupVPass] = useState("");
    const signupForm = (
        <div className="signup-form-div">
            {/* Signup title with form */}
            <strong>Sign up</strong>
            <form className='signup-form' onSubmit={signupSubmit}>
                {/* Input of first name */}
                <div className="signup-input">
                    <input value={signupFirstName} onChange={(e) => setSignupFirstName(e.target.value)} id='signupForm-firstName' type="text" name="firstName" required className="signup-form-firstName input" placeholder="First Name" />
                </div>
                {/* Input of email */}
                <div className="signup-input">
                    <input value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} id='signupForm-email' type="text" name="email" required className="signup-form-email input" placeholder="Email" />
                </div>
                {/* Input of password */}
                <div className="signup-input">
                    <input value={signupPass} onChange={(e) => setSignupPass(e.target.value)} id='signupForm-password' type="password" name="password" required className="signup-form-password input" placeholder="Password" />
                </div>
                {/* Input of verify password */}
                <div className="signup-input">
                    <input value={signupVPass} onChange={(e) => setSignupVPass(e.target.value)} id='signupForm-vpassword' type="password" name="vpassword" required className="signup-form-vpassword input" placeholder="Verify Password" />
                </div>
                {/* Submit button */}
                <div className="signup-submit">
                    <button onClick={() => signupSubmit} className="signup-form-submit cursorPointer">SUBMIT</button>
                    {/* Allows the user to switch to a login form */}
                </div>
                {renderErrorMessage("matchingpasswords")}
                {renderErrorMessage("tryLater")}
                {renderErrorMessage("accountCreated")}
                {renderErrorMessage("emailDuplicate")}
            </form>
        </div>
    );

    function changeFormType() {
        clearForms()
        setFormToggle(!formToggle)
    }

    return (
        <div className='all-css login-page-div' style={themeLight ? { backgroundColor: "white" } : {}}>
            {formType(formToggle)}
            <div style={{ display: "flex", flexDirection: "row" }}>
                <button className='all-css signup-form-submit' style={{ marginBottom: '1vh', height: '4vh' }} onClick={() => changeFormType()}>{formToggle ? "SIGN UP" : "LOG IN"}</button>
                <button className='all-css signup-form-submit' style={{ marginBottom: '1vh', height: '4vh' }} onClick={() => setOpenLogin(false)}>CLOSE</button>
            </div>
        </div>
    );
}


export default Login;