import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import lightLogoutPic from '../assets/logout.png';
import lightLoginPic from '../assets/login.png';
import lightThemeSwap from '../assets/themeswap.png';
import lightInstagram from '../assets/insta.png';
import lightFacebook from '../assets/facebook.png';
import lightTwitter from '../assets/twitter.png';
import lightGithub from '../assets/github.png';
import lightLinkedin from '../assets/linkedin.png';
import darkLogoutPic from '../assets/darkModeLogos/logout.png';
import darkLoginPic from '../assets/darkModeLogos/login.png';
import darkThemeSwap from '../assets/darkModeLogos/themeswap.png';
import darkInstagram from '../assets/darkModeLogos/insta.png';
import darkFacebook from '../assets/darkModeLogos/facebook.png';
import darkTwitter from '../assets/darkModeLogos/twitter.png';
import darkGithub from '../assets/darkModeLogos/github.png';
import darkLinkedin from '../assets/darkModeLogos/linkedin.png';



function Navbar(props) {
    var loggedInUser = localStorage.getItem('userLoggedIn');
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    const [logoutPic, setLogoutPic] = useState(lightLogoutPic);
    const [loginPic, setLoginPic] = useState(lightLoginPic);
    const [themeswap, setThemeswap] = useState(lightThemeSwap);
    const [instagram, setInstagram] = useState(lightInstagram);
    const [facebook, setFacebook] = useState(lightFacebook);
    const [twitter, setTwitter] = useState(lightTwitter);
    const [github, setGithub] = useState(lightGithub);
    const [linkedin, setLinkedin] = useState(lightLinkedin);
    const [openLogin, setOpenLogin] = useState(false);
    const navigate = useNavigate();


    // When called to logout the user:
    // sets the 'current user' as none, closes login box,
    // 'isloggedin' to false, goes to home page.
    function logout() {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('Dashboard-user-token');
        localStorage.removeItem('Dashboard-user-firstName');
        setOpenLogin(false);
        navigate(`/`);
    }

    // Every time the theme is changed between light and dark, change icon colors
    useEffect(() => {
        if (themeLight) {
            setLogoutPic(lightLogoutPic);
            setLoginPic(lightLoginPic);
            setThemeswap(lightThemeSwap);
            setInstagram(lightInstagram);
            setFacebook(lightFacebook);
            setTwitter(lightTwitter);
            setGithub(lightGithub);
            setLinkedin(lightLinkedin);
        }
        else {
            setLogoutPic(darkLogoutPic);
            setLoginPic(darkLoginPic);
            setThemeswap(darkThemeSwap);
            setInstagram(darkInstagram);
            setFacebook(darkFacebook);
            setTwitter(darkTwitter);
            setGithub(darkGithub);
            setLinkedin(darkLinkedin);
        }
    }, [themeLight])



    return (
        <div className='all-css navbar-main' >
            <div className='navbar-buttons' >
                <div className='navbar-pagebutton navbar-home cursorPointer' onClick={() => navigate(`/`)}>Home</div>
                <div className='navbar-pagebutton navbar-news cursorPointer' onClick={() => navigate(`/News`)}>News</div>
                <div className='navbar-pagebutton navbar-weather cursorPointer' onClick={() => navigate(`/Weather`)}>Weather</div>
                {/* <div className='navbar-pagebutton navbar-externallinks' onClick={() => navigate(`/ExternalLinks`)}>External Links</div> */}
                {/* <div className='navbar-pagebutton navbar-calendar' onClick={() => navigate(`/Calendar`)}>Calendar</div> */}
                {/* <div className='navbar-pagebutton navbar-todolist' onClick={() => navigate(`/ToDoList`)}>To Do List</div> */}
                {/* <div className='navbar-pagebutton navbar-dailytrackers' onClick={() => navigate(`/DailyTrackers`)}>Daily Trackers</div> */}
                {/* <div className='navbar-pagebutton navbar-musicandmovies' onClick={() => navigate(`/MusicAndMovies`)}>Music and Movies</div> */}
                {loggedInUser ?
                    <div className='navbar-pagebutton navbar-myhub cursorPointer' onClick={() => navigate(`/MyHub`)}>myHub</div>
                    : null}
            </div>

            {/* If true, opens the login/signup box. Otherwise, do nothing. */}
            {openLogin ? <Login themeLight={themeLight} setOpenLogin={setOpenLogin} /> : <></>}

            <div className="navbar-socials" style={themeLight ? { backgroundColor: "linear-gradient(skyblue, teal) !important" } : {}}>
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

            <h4 className='navbar-loggedInUser' style={loggedInUser ? { textAlign: "center" } : { display: "none" }}>{loggedInUser ? `${loggedInUser} \n is currently logged in.` : null}</h4>
            <div className='navbar-extras' style={openLogin ? { marginBottom: '30vh' } : themeLight ? { backgroundColor: "linear-gradient(skyblue, teal)" } : null}>
                {/* If a user is logged in, show a logout button. Otherwise, show a login/signup button. */}
                {loggedInUser ?
                    <img src={logoutPic} alt="logout" className='navbar-logoutpic cursorPointer' onClick={() => logout()} />
                    :
                    <img src={loginPic} alt="login" className='navbar-logoutpic cursorPointer' onClick={() => setOpenLogin(!openLogin)} />
                }

                {/* Show the theme swap icon, swap upon clicking. */}
                <img src={themeswap} alt="theme swap" className='navbar-logoutpic cursorPointer' onClick={() => { setThemeLight(!themeLight); console.log(themeLight) }} />
            </div>
        </div>
    );
}

export default Navbar;