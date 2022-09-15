import { Outlet, Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const AnonymousRoute = () => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default AnonymousRoute;
