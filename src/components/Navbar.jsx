import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutpic from '../assets/logout.png';
import loginpic from '../assets/login.png';
import themeswap from '../assets/themeswap.png';
import Login from './Login';
import instagram from '../assets/insta.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';



function Navbar(props) {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [themeLight, setThemeLight] = useState(true);
    const [openLogin, setOpenLogin] = useState(false);
    const navigate = useNavigate();


    // When called to logout the user, sets the 'current user' as none, closes login box, 'isloggedin' to false, goes to home page
    function logout() {
        localStorage.removeItem('loggedInUser');
        setOpenLogin(false);
        navigate(`/`);
    }


    return (
        <div className='all-css navbar-main'>
            {/* <div themeLight={themeLight.toString()} className='navbar-main'> */}
            <div className='navbar-buttons'>
                <div className='navbar-pagebutton navbar-home' onClick={() => navigate(`/`)}>Home</div>
                <div className='navbar-pagebutton navbar-news' onClick={() => navigate(`/News`)}>News</div>
                <div className='navbar-pagebutton navbar-calendar' onClick={() => navigate(`/Calendar`)}>Calendar</div>
                <div className='navbar-pagebutton navbar-weather' onClick={() => navigate(`/Weather`)}>Weather</div>
                <div className='navbar-pagebutton navbar-todolist' onClick={() => navigate(`/ToDoList`)}>To Do List</div>
                <div className='navbar-pagebutton navbar-dailytrackers' onClick={() => navigate(`/DailyTrackers`)}>Daily Trackers</div>
                <div className='navbar-pagebutton navbar-musicandmovies' onClick={() => navigate(`/MusicAndMovies`)}>Music and Movies</div>
                <div className='navbar-pagebutton navbar-externallinks' onClick={() => navigate(`/ExternalLinks`)}>External Links</div>
                <div className='navbar-pagebutton navbar-myhub' onClick={() => navigate(`/MyHub`)}>myHub</div>
            </div>

            {/* If true, opens the login/signup box. Otherwise, do nothing. */}
            {openLogin ? <Login setOpenLogin={setOpenLogin} /> : <></>}

            <div className="navbar-socials">
                <a className="socialPic" href="https://www.facebook.com/AxelrodAsaf">
                    <img
                        alt="Social Media Logo"
                        src={facebook}
                        width="30vw"
                        height="30vw"
                    />
                </a>
                <a className="socialPic" href="https://www.twitter.com/asafaxelrod">
                    <img
                        alt="Social Media Logo"
                        src={twitter}
                        width="30vw"
                        height="30vw"
                    />
                </a>
                <a
                    className="socialPic"
                    href="https://www.linkedin.com/in/asaf-axelrod-9353b1ba/"
                >
                    <img
                        alt="Social Media Logo"
                        src={linkedin}
                        width="30vw"
                        height="30vw"
                    />
                </a>
                <a
                    className="socialPic"
                    href="https://github.com/AxelrodAsaf"
                >
                    <img
                        alt="Social Media Logo"
                        src={github}
                        width="30vw"
                        height="30vw"
                    />
                </a>
                <a className="socialPic" href="https://www.instagram.com/asafaxelrod/">
                    <img
                        alt="Social Media Logo"
                        src={instagram}
                        width="30vw"
                        height="30vw"
                    />
                </a>
            </div>

            <div className='navbar-extras'>
                {/* If a user is logged in, show a logout button. Otherwise, show a login/signup button. */}
                {loggedInUser ?
                    <img src={logoutpic} alt="logout" className='navbar-logoutpic' onClick={() => logout()} />
                    :
                    <img src={loginpic} alt="login" className='navbar-logoutpic' onClick={() => setOpenLogin(!openLogin)} />
                }

                {/* *****(NOT WORKING YET)***** Show the theme swap icon, swap upon clicking. */}
                <img src={themeswap} alt="theme swap" className='navbar-logoutpic' onClick={() => { setThemeLight(!themeLight); console.log(themeLight) }} />
            </div>
        </div>
    );
}

export default Navbar;