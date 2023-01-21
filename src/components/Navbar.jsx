import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutpic from '../assets/logout.png';
import themeswap from '../assets/themeswap.png';
import Login from './Login';


function Navbar(props) {
    const setCurrentUser = props.setCurrentUser;
    const currentUser = props.currentUser;
    const [themeLight, setThemeLight] = useState(true);
    const [openLogin, setOpenLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


    // When called to logout the user, sets the 'current user' as none, closes login box, 'isloggedin' to false, goes to home page
    function logout() {
        setCurrentUser();
        setOpenLogin(false);
        setIsLoggedIn(false);
        navigate(`/`);
    }


    return (
        <div className='navbar-main'>
            {/* <div themeLight={themeLight.toString()} className='navbar-main'> */}
            <div className='navbar-buttons'>
                <div className='navbar-pagebutton navbar-home' onClick={() => navigate(`/`)}>Home</div>
                <div className='navbar-pagebutton navbar-weather' onClick={() => navigate(`/Weather`)}>Weather</div>
                <div className='navbar-pagebutton navbar-todolist' onClick={() => navigate(`/ToDoList`)}>To Do List</div>
                <div className='navbar-pagebutton navbar-news' onClick={() => navigate(`/News`)}>News</div>
                <div className='navbar-pagebutton navbar-dailytrackers' onClick={() => navigate(`/DailyTrackers`)}>Daily Trackers</div>
                <div className='navbar-pagebutton navbar-musicandmovies' onClick={() => navigate(`/MusicAndMovies`)}>Music and Movies</div>
                <div className='navbar-pagebutton navbar-externallinks' onClick={() => navigate(`/ExternalLinks`)}>External Links</div>
                <div className='navbar-pagebutton navbar-myhub' onClick={() => navigate(`/MyHub`)}>myHub</div>
            </div>

            {/* If true, opens the login/signup box. Otherwise, do nothing. */}
            {openLogin ? <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} setOpenLogin={setOpenLogin} /> : <></>}
            
            <div className='navbar-extras'>
                {/* *****(NOT WORKING YET)***** Show the theme swap icon, swap upon clicking. */}
                <img src={themeswap} alt="theme swap" className='navbar-logoutpic' onClick={() => { setThemeLight(!themeLight); console.log(themeLight) }} />

                {/* If a user is logged in, show a logout button. Otherwise, show a login/signup button. */}
                {isLoggedIn ?
                    <img src={logoutpic} alt="logout" className='navbar-logoutpic' onClick={() => logout()} />
                    :
                    <button className='navbar-loginsignup' onClick={() => setOpenLogin(!openLogin)}>Login/Sign up</button>
                }
            </div>
        </div>
    );
}

export default Navbar;