import React, { useContext } from "react";

import AuthContext from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ login }) => {
  const { token } = useContext(AuthContext);
  if (login) return token ? <Outlet /> : <Navigate to="/login" />;
  else return token ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
