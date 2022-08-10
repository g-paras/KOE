import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // useNavigate
} from "react-router-dom";

import './App.css';
import Cards from './pages/Cards';
import Header from './pages/Header'
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import Attribute from "./pages/Attribute";

function App() {
  // const navigate = useNavigate();
  const [token, setToken] = useState("");

  const addToken = token => {
    localStorage.setItem("token", token);
    setToken(token);
  }

  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    // navigate('/');
  }

  useEffect(() => {
    async function fetchData() {
      let localToken = localStorage.getItem("token");
      if (localToken !== null)
        setToken(localToken);
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header token={token} logoutUser={logoutUser} />
        <Routes>
          <Route path="/" element={<Cards token={token} />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login addToken={addToken} />} />
          <Route path="/signup" element={token ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/post" element={token ? <Post /> : <Navigate to="/login" />} />
          <Route path="/post/attribute" element={token ? <Attribute /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
