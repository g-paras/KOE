import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Cards from "./pages/Cards";
import Header from "./pages/Header";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Attribute from "./pages/Attribute";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
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
              <Route path="/product/:productId" element={<Product />} />
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
