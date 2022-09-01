import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { AUTH, BASE_URL } from "../utils/constants";
import AuthContext from "../contexts/AuthContext";
import Login from "../components/Login";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const { addToken } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Loggin in...");

    axios
      .post(BASE_URL + AUTH, {
        ...formData,
        email: formData.username + "@kiet.edu",
      })
      .then((res) => {
        addToken(res.data.token);
        toast.success("Login successfull");
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("Invalid credentials");
        } else if (err.response.status === 500) {
          toast.error("Internal server error");
        } else {
          toast.error("Something went wrong");
        }
        setFormData({ ...formData, password: "" });
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <Login
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </div>
  );
};

export default LoginPage;
