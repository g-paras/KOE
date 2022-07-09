import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Cards from './Cards';
import Header from './Header'
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
