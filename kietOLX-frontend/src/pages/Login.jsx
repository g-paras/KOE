import React, { useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { AUTH, BASE_URL } from "../utils/constants";
import AuthContext from "../contexts/AuthContext";
import Login from "../components/Login";
import { emailValidator } from "../utils/validators";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState({ username: [], password: [] });
  const [emailVerificationMessage, setEmailVerificationMessage] = useState(false);

  const btnRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const message = location.state?.message;

  const { addToken } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError((prev) => setFormError({ ...prev, [e.target.name]: [] }));
  };

  const validate = () => {
    if (!formData.username) {
      setFormError((prev) => ({ ...prev, username: ["Username is required"] }));
      return false;
    }
    if (emailValidator(formData.username)) {
      setFormError((prev) => ({ ...prev, username: ["Enter a valid username"] }));
    }
    if (!formData.password) {
      setFormError((prev) => ({ ...prev, password: ["Password is required"] }));
      return false;
    }

    return true;
  };

  const loginUser = () => {
    axios
      .post(BASE_URL + AUTH, {
        ...formData,
      })
      .then((res) => {
        addToken(res.data.token);
        toast.success("Login successfull");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("Invalid credentials");
        } else if (err.response.status === 500) {
          toast.error("Internal server error");
        } else if (err.response.status === 412) {
          setEmailVerificationMessage(true);
        } else {
          toast.error("Something went wrong");
        }
        setFormData({ ...formData, password: "" });
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      toast.info("Loggin in...");
      btnRef.current.innerHTML = "Logging in...";
      btnRef.current.disabled = true;
      loginUser();
      btnRef.current.innerHTML = "Login";
      btnRef.current.disabled = false;
    }
  };

  return (
    <div className="mycard">
      <Login
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        formError={formError}
        emailVerificationMessage={emailVerificationMessage}
        message={message}
        btnRef={btnRef}
      />
    </div>
  );
};

export default LoginPage;
