import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Cards from "./pages/Cards";
import MyAds from "./pages/MyAds";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Bookmark from "./pages/Bookmark";
import Header from "./components/Header";
import Attribute from "./pages/Attribute";
import RequireAuth from "./routes/RequireAuth";
import ProductSearch from "./pages/ProductSearch";
import ChangePassword from "./pages/ChangePassword";
import AnonymousRoute from "./routes/AnonymousRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CreateAdProvider } from "./contexts/PostContext";
import EmailVerification from "./pages/EmailVerification";
import RequestForgotPassword from "./pages/RequestForgotPassword";
import ResendEmailVerification from "./pages/ResendEmailVerification";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <CreateAdProvider>
            <Routes>
              <Route path="/" element={<Cards />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route
                path="/product/search/:query"
                element={<ProductSearch />}
              />

              <Route element={<AnonymousRoute />}>
                <Route element={<Login />} path="/login" />
                <Route element={<SignUp />} path="/signup" />
              </Route>

              <Route element={<RequireAuth />}>
                <Route element={<Post />} path="/post" />
                <Route element={<MyAds />} path="/my-ads" />
                <Route element={<Bookmark />} path="/bookmarks" />
                <Route element={<Attribute />} path="/post/attribute" />
                <Route element={<Profile />} path="/profile" />
              </Route>

              <Route
                element={<EmailVerification />}
                path="/verify-email/:token"
              />
              <Route
                element={<ResendEmailVerification />}
                path="/resend-verification-email"
              />
              <Route
                element={<RequestForgotPassword />}
                path="/forgot-password"
              />
              <Route
                element={<ChangePassword />}
                path="/change-password/:uid/:token"
              />
              <Route element={<NotFound />} path="/*" />
            </Routes>
          </CreateAdProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
