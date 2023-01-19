import './App.css';
import Login from './pages/Login.jsx';
import Data from './Data';
import Home from './pages/Home';
import Default from './pages/Default';
import { createContext } from 'react';
import { Routes, Route } from "react-router-dom";


export const DataContext = createContext();

function App() {
  const contextValues = Data();
  return (
      <DataContext.Provider value={contextValues}>
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/Home"} element={<Home />} />
        <Route path="*" element={<Default />} />
      </Routes>
    </div>
      </DataContext.Provider>
  );
}



export default App;
