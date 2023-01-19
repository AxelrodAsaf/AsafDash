// import {initializeApp} from 'firebase/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { addDoc, collection } from "firebase/compat";
// import { dataBase } from "./firebase/compat/firebase.jsx";
// import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/App.css';





function Login(props) {
    // // const refUsers = collection(dataBase, "Users");
    // const {navigate} = useContext(DataContext);

    // const updateUsername = (event) => {
    //     setUsername(event.target.value);
    //     // addDoc(refUsers, username);
    // };


    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "a",
            password: "a"
        },
        {
            username: "b",
            password: "b"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
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
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required className="login-form-username input" />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required className="login-form-password input" />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" className="login-form-submit button" />
                </div>
            </form>
        </div>
    );


    return (
        <div className='all-css login-page-div'>
            <h1>Welcome to Asaf's Dashboard!</h1>
            <h3>Please sign in to begin...</h3>

            {isSubmitted ? < Navigate to={'/Home'} /> : renderForm}
        </div>
    );
}

export default Login;