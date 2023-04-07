import './styles/App.css';
import Default from './pages/Default';
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import Home from './pages/Home.jsx';
import Weather from './pages/Weather.jsx';
import ToDoList from './pages/ToDoList.jsx';
import News from './pages/News.jsx';
import DailyTrackers from './pages/DailyTrackers.jsx';
import Music from './pages/Music.jsx';
import ExternalLinks from './pages/ExternalLinks.jsx';
import MyHub from './pages/MyHub.jsx';
import CalendarWidget from './pages/CalendarWidget';
import './styles/App.css';
import LoadingSpinner from './components/LoadingSpinner';


function App() {
  const [themeLight, setThemeLight] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className={`app-main theme${themeLight}`} style={{ width: "100%", height: "100%" }}>
      <Routes>
        <Route path={"/"} element={<Home isLoading={isLoading} setIsLoading={setIsLoading} themeLight={themeLight} setThemeLight={setThemeLight} />} />
        <Route path={"/Calendar"} element={<CalendarWidget isLoading={isLoading} setIsLoading={setIsLoading} themeLight={themeLight} setThemeLight={setThemeLight} />} />
        <Route path={"/Weather"} element={<Weather isLoading={isLoading} setIsLoading={setIsLoading} themeLight={themeLight} setThemeLight={setThemeLight} />} />
        <Route path={"/ToDoList"} element={<ToDoList isLoading={isLoading} setIsLoading={setIsLoading} themeLight={themeLight} setThemeLight={setThemeLight} />} />
        <Route path={"/News"} element={<News isLoading={isLoading} setIsLoading={setIsLoading} themeLight={themeLight} setThemeLight={setThemeLight} />} />
        <Route path={"/DailyTrackers"} element={<DailyTrackers isLoading={isLoading} setIsLoading={setIsLoading} themeLight={themeLight} setThemeLight={setThemeLight} />} />
        <Route path={"/Music"} element={<Music isLoading={isLoading} setIsLoading={setIsLoading} themeLight={themeLight} setThemeLight={setThemeLight} />} />
        <Route path={"/ExternalLinks"} element={<ExternalLinks isLoading={isLoading} setIsLoading={setIsLoading} themeLight={themeLight} setThemeLight={setThemeLight} />} />
        <Route path={"/MyHub"} element={<MyHub isLoading={isLoading} setIsLoading={setIsLoading} themeLight={themeLight} setThemeLight={setThemeLight} />} />
        <Route path={"/LoadingSpinner"} element={<LoadingSpinner />} />
        <Route path="*" element={<Default />} />
        <Route path={"/error"} element={<Default />} />
      </Routes>
    </div>
  );
}



export default App;
