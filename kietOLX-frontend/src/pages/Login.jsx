import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AUTH, BASE_URL } from "../constants";

const Login = ({addToken}) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL + AUTH, formData)
      .then((res) => {
        addToken(res.data.token);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Email: </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={(e) => handleChange(e)}
          />@kiet.edu
        </div>
        <div>
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
          <button type="submit">Login</button>
        </div>
      </form>
      <p>Don't have an accout? <Link to="/signup">Signup here</Link></p>
    </div>
  );
};

export default Login;
