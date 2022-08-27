import { Link } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { BASE_URL, REGISTER } from "../utils/constants";
import login from "../images/glo.gif";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password1: "",
    password2: "",
  });
  const [formError, setFormError] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password1: "",
    password2: "",
  });
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Registering user, Please wait...");
    setDisabled(true);
    let postData = {
      username: formData.email,
      email: formData.email + "@kiet.edu",
      password: formData.password1,
      first_name: formData.firstName,
      last_name: formData.lastName,
    };
    axios
      .post(BASE_URL + REGISTER, postData)
      .then((res) => {
        console.log(res.data);
        toast.success("Registration successfull");
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          setFormError({ ...formError, ...err.response.data });
        }
        console.log(err);
        toast.error("Something went wrong!");
      });
    setDisabled(false);
  };

  return (
    <div>
      <form
        className="card auth-card input-field"
        onSubmit={(e) => handleSubmit(e)}
      >
        <fieldset disabled={disabled}>
          <img className="login-image" src={login} alt="login" />
          <h2>SignUp</h2>
          <div className="input-group1">
            <label htmlFor="email">Email: </label>
            <input
              className={`mail ${
                formError.username ? "border border-danger" : ""
              }`}
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
            <span className="mailName">@kiet.edu</span>
            <div>
              {formError?.username &&
                formError?.username?.map((error) => (
                  <div className="text-danger">*{error}</div>
                ))}
            </div>
          </div>
          <div className="input-group1">
            <label htmlFor="firstName">FirstName: </label>
            <input
              className={`${formError.firstName ? "border border-danger" : ""}`}
              type="text"
              name="firstName"
              placeholder="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange(e)}
            />
            <div>
              {formError?.firstName &&
                formError?.firstName?.map((error) => (
                  <div className="text-danger">*{error}</div>
                ))}
            </div>
          </div>
          <div className="input-group1">
            <label htmlFor="lastName">LastName: </label>
            <input
              type="text"
              name="lastName"
              placeholder="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange(e)}
              className={`${formError.lastName ? "border border-danger" : ""}`}
            />
            <div>
              {formError?.lastName &&
                formError?.lastName?.map((error) => (
                  <div className="text-danger">*{error}</div>
                ))}
            </div>
          </div>
          <div className="input-group1">
            <label htmlFor="password1">Enter Password: </label>
            <input
              className={`${
                formError.password1 || formError.password
                  ? "border border-danger"
                  : ""
              }`}
              type="password"
              name="password1"
              placeholder="password1"
              value={formData.password1}
              onChange={(e) => handleChange(e)}
            />
            <div>
              {formError?.password1 &&
                formError?.password1?.map((error) => (
                  <div className="text-danger">*{error}</div>
                ))}
              {formError?.password &&
                formError?.password?.map((error) => (
                  <div className="text-danger">*{error}</div>
                ))}
            </div>
          </div>
          <div className="input-group1">
            <label htmlFor="password2">Re-enter Password: </label>
            <input
              className={`${formError.password2 ? "border border-danger" : ""}`}
              type="password"
              name="password2"
              placeholder="password2"
              value={formData.password2}
              onChange={(e) => handleChange(e)}
            />
            <div>
              {formError?.password2 &&
                formError?.password2?.map((error) => (
                  <div className="text-danger">*{error}</div>
                ))}
            </div>
          </div>
          <div>
            <button className="primary" type="submit">
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
