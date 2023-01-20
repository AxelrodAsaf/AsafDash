import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutpic from '../assets/logout.png';
import themeswap from '../assets/themeswap.png';
// import Login from '../pages/Login';
import Login from './Login';
import Signup from '../pages/Signup';


function Navbar(props) {
    const currentUser = props.currentUser;
    const setCurrentUser = props.setCurrentUser;
    const [themeLight, setThemeLight] = useState(true);
    const [openLogin, setOpenLogin] = useState(false);
    const navigate = useNavigate();

    function logout() {
        setCurrentUser();
        setOpenLogin(false);
        navigate(`/`);
    }

    
    return (
        <div className='navbar-main'>
            {/* <div themeLight={themeLight.toString()} className='navbar-main'> */}
            <div className='navbar-buttons'>
                <div className='navbar-pagebutton navbar-home' onClick={() => navigate(`/Home`)}>Home</div>
                <div className='navbar-pagebutton navbar-weather' onClick={() => navigate(`/Weather`)}>Weather</div>
                <div className='navbar-pagebutton navbar-todolist' onClick={() => navigate(`/ToDoList`)}>To Do List</div>
                <div className='navbar-pagebutton navbar-news' onClick={() => navigate(`/News`)}>News</div>
                <div className='navbar-pagebutton navbar-dailytrackers' onClick={() => navigate(`/DailyTrackers`)}>Daily Trackers</div>
                <div className='navbar-pagebutton navbar-musicandmovies' onClick={() => navigate(`/MusicAndMovies`)}>Music and Movies</div>
                <div className='navbar-pagebutton navbar-externallinks' onClick={() => navigate(`/ExternalLinks`)}>External Links</div>
                <div className='navbar-pagebutton navbar-myhub' onClick={() => navigate(`/MyHub`)}>myHub</div>
            </div>

            <button className='navbar-loginsignup' onClick={() => setOpenLogin(!openLogin)}>Login/Sign up</button>
            {openLogin ? <Login /> : <></>}
            <div className='navbar-extras'>
                <img src={themeswap} alt="theme swap" className='navbar-logoutpic' onClick={() => { setThemeLight(!themeLight); console.log(themeLight) }} />
                <img src={logoutpic} alt="logout" className='navbar-logoutpic' onClick={() => logout()} />
                {/* <div className='navbar-pagebutton navbar-logout' onClick={() => navigate(`/Login`)}/> */}
            </div>
        </div>
    );
}

export default Navbar;