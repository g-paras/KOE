import React, { useState, createContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const notify = (mssg, props = {}) => toast(mssg, props);

  const [token, setToken] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const addToken = (token) => {
    localStorage.setItem("token-asdf84efofnalsd", token);
    setToken(token);
  };

  const logoutUser = () => {
    setToken("");
    setProfileData(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    async function fetchData() {
      let localToken = localStorage.getItem("token-asdf84efofnalsd");
      if (localToken !== null) setToken(localToken);
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        notify,
        token,
        addToken,
        logoutUser,
        profileData,
        setProfileData,
      }}
    >
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </AuthContext.Provider>
  );
};

export default AuthContext;
