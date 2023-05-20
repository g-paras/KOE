import React, { useState, createContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import axios from "axios";
import { BASE_API, BASE_URL } from "../utils/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const notify = (mssg, props = {}) => toast(mssg, props);

  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [baseApiLoading, setBaseApiLoading] = useState(false);
  const [renderAll, setRenderAll] = useState(false);

  const addToken = (token) => {
    localStorage.setItem("token-asdf84efofnalsd", token);
    setToken(token);
  };

  const logoutUser = () => {
    setToken("");
    setProfileData(null);
    localStorage.removeItem("token-asdf84efofnalsd");
    navigate("/login");
    toast.success("Bye 🖐, see you soon...");
  };

  useEffect(() => {
    async function fetchData() {
      let localToken = localStorage.getItem("token-asdf84efofnalsd");
      if (localToken && !baseApiLoading) {
        setBaseApiLoading(true);
        axios
          .get(BASE_URL + BASE_API, {
            headers: {
              Authorization: `Token ${localToken}`,
            },
          })
          .then((res) => {
            if (res?.status === 200) setToken(localToken);
            setBaseApiLoading(false);
          })
          .catch(() => {
            setBaseApiLoading(false);
          });
      }
      setRenderAll(true);
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
      {baseApiLoading || !renderAll ? <Loader /> : children}
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
