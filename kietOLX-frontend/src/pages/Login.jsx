import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { AUTH, BASE_URL } from "../utils/constants";

import login from "./Images/glo.gif";
import AuthContext from "../contexts/AuthContext";
const Login = () => {
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
      .post(BASE_URL + AUTH, formData)
      .then((res) => {
        addToken(res.data.token);
        toast.success("Login successfull");
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("Invalid credentials");
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <form
        className="card auth-card input-field"
        onSubmit={(e) => handleSubmit(e)}
      >
        <img className="login-image" src={login} alt="login" />
        <h2>Login</h2>
        <div className="input-group1">
          <label htmlFor="username">Email: </label>
          <input
            className="mail"
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={(e) => handleChange(e)}
          />
          <span className="mailName">@kiet.edu</span>
        </div>
        <div className="input-group1">
          <label htmlFor="password">Password: </label>

          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <button className="primary" type="submit">
            Login
          </button>
        </div>

        <p>
          Don't have an accout? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
