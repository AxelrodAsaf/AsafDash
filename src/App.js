import './styles/App.css';
import Default from './pages/Default';
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import Home from './pages/Home.jsx';
import Weather from './pages/Weather.jsx';
import ToDoList from './pages/ToDoList.jsx';
import News from './pages/News.jsx';
import DailyTrackers from './pages/DailyTrackers.jsx';
import MusicAndMovies from './pages/MusicAndMovies.jsx';
import ExternalLinks from './pages/ExternalLinks.jsx';
import MyHub from './pages/MyHub.jsx';
import CalendarWidget from './pages/CalendarWidget';
import './styles/App.css';


function App() {
  const [themeLight, setThemeLight] = useState(true);


  return (
      <div className={`app-main theme${themeLight}`} style={{width: "100%", height: "100%"}}>
        <Routes>
          <Route path={"/"} element={<Home themeLight={themeLight} setThemeLight={setThemeLight}/>} />
          <Route path={"/Calendar"} element={<CalendarWidget themeLight={themeLight} setThemeLight={setThemeLight}/>} />
          <Route path={"/Weather"} element={<Weather themeLight={themeLight} setThemeLight={setThemeLight}/>} />
          <Route path={"/ToDoList"} element={<ToDoList themeLight={themeLight} setThemeLight={setThemeLight}/>} />
          <Route path={"/News"} element={<News themeLight={themeLight} setThemeLight={setThemeLight}/>} />
          <Route path={"/DailyTrackers"} element={<DailyTrackers themeLight={themeLight} setThemeLight={setThemeLight}/>} />
          <Route path={"/MusicAndMovies"} element={<MusicAndMovies themeLight={themeLight} setThemeLight={setThemeLight}/>} />
          <Route path={"/ExternalLinks"} element={<ExternalLinks themeLight={themeLight} setThemeLight={setThemeLight}/>} />
          <Route path={"/MyHub"} element={<MyHub themeLight={themeLight} setThemeLight={setThemeLight}/>} />
          <Route path="*" element={<Default />} />
        </Routes>
      </div>
  );
}



export default App;
