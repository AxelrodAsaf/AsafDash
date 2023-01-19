import './styles/App.css';
import Default from './pages/Default';
import { Routes, Route } from "react-router-dom";
import React from 'react';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Weather from './pages/Weather.jsx';
import ToDoList from './pages/ToDoList.jsx';
import News from './pages/News.jsx';
import DailyTrackers from './pages/DailyTrackers.jsx';
import MusicAndMovies from './pages/MusicAndMovies.jsx';
import ExternalLinks from './pages/ExternalLinks.jsx';
import MyHub from './pages/MyHub.jsx';


function App() {
  return (
      <div className='app-main'>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/Signup"} element={<Signup />} />
          <Route path={"/Home"} element={<Home />} />
          <Route path={"/Weather"} element={<Weather />} />
          <Route path={"/ToDoList"} element={<ToDoList />} />
          <Route path={"/News"} element={<News />} />
          <Route path={"/DailyTrackers"} element={<DailyTrackers />} />
          <Route path={"/MusicAndMovies"} element={<MusicAndMovies />} />
          <Route path={"/ExternalLinks"} element={<ExternalLinks />} />
          <Route path={"/MyHub"} element={<MyHub />} />
          <Route path="*" element={<Default />} />
        </Routes>
      </div>
  );
}



export default App;
