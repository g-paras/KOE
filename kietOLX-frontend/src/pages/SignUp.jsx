import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, REGISTER } from "../constants";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password1: "",
    password2: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let postData = {
      username: formData.email,
      email: formData.email + "@kiet.edu",
      password: formData.password1,
      first_name: formData.firstName,
      last_name: formData.lastName,
    }
    axios
      .post(BASE_URL + REGISTER, postData)
      .then((res) => {
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
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />@kiet.edu
        </div>
        <div>
          <label htmlFor="firstName">FirstName: </label>
          <input
            type="text"
            name="firstName"
            placeholder="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="lastName">LastName: </label>
          <input
            type="text"
            name="lastName"
            placeholder="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="password1">Enter Password: </label>
          <input
            type="password"
            name="password1"
            placeholder="password1"
            value={formData.password1}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="password2">Re-enter Password: </label>
          <input
            type="password"
            name="password2"
            placeholder="password2"
            value={formData.password2}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default SignUp;
