import React from 'react';
import DataContext from '../App.js';
import { useNavigate } from 'react-router-dom';


function Navbar(props) {
    const navigate = useNavigate();
    return (
        <div className='navbar-main'>
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

            <div className='navbar-logout'>
                <div className='navbar-pagebutton' onClick={() => navigate(`/Login`)}>LOG OUT</div>
            </div>
        </div>
    );
}

export default Navbar;