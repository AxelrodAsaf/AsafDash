import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';


function Signup(props) {

    const navigate = useNavigate();

    return (
        <div className='signup-page-div'>
            <h1>Signup</h1>

            <form className="signup-form">
                <input className="signup-form-input" type={"text"} placeholder="First Name" />
                <input className="signup-form-input" type={"text"} placeholder="Last Name" />
                <input className="signup-form-input" type={"text"} placeholder="E-mail" />
                <input className="signup-form-input" type={"text"} placeholder="Username" />
                <input className="signup-form-input" type={"text"} placeholder="Password" />
                <input className="signup-form-input" type={"text"} placeholder="Verify Password" />
                <input className="signup-form-submit" type={"submit"} placeholder="Submit" />
            </form>

            <button type="text" className="login-form-signup button" onClick={() => navigate(`/`)}>Back</button>
        </div>
    );
}

export default Signup;