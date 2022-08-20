import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Cards from "./pages/Cards";
import Header from "./pages/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Attribute from "./pages/Attribute";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import { CreateAdProvider } from "./contexts/PostContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Header />
          <CreateAdProvider>
            <Routes>
              <Route path="/" element={<Cards />} />
              <Route element={<PrivateRoute login={false} />}>
                <Route element={<Login />} path="/login" />
                <Route element={<SignUp />} path="/signup" />
              </Route>
              <Route element={<PrivateRoute login={true} />}>
                <Route element={<Post />} path="/post" />
                <Route element={<Attribute />} path="/post/attribute" />
                <Route element={<Profile />} path="/profile" />
              </Route>
            </Routes>
          </CreateAdProvider>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
