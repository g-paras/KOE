import { Route } from "react-router-dom";
import React from "react";

import Login from "src/pages/Login";
import SignUp from "src/pages/SignUp";
import EmailVerification from "src/pages/EmailVerification";
import RequestForgotPassword from "src/pages/RequestForgotPassword";
import ResendEmailVerification from "src/pages/ResendEmailVerification";
import ChangePassword from "src/pages/ChangePassword";
import AnonymousRoute from "src/routes/AnonymousRoute";

const AccountsRoutes = () => {
  return (
    <Route>
      <Route element={<AnonymousRoute />}>
        <Route element={<Login />} path="login" />
        <Route element={<SignUp />} path="signup" />
      </Route>
      <Route element={<EmailVerification />} path="/verify-email/:token" />
      <Route
        element={<ResendEmailVerification />}
        path="/resend-verification-email"
      />
      <Route element={<RequestForgotPassword />} path="/forgot-password" />
      <Route element={<ChangePassword />} path="/change-password/:uid/:token" />
    </Route>
  );
};

export default AccountsRoutes;
