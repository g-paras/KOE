import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import OlxLogo from "../components/OlxLogo";

import { BASE_URL, REGISTER } from "../utils/constants";
import login from "../images/glo.gif";
import { passwordValidator } from "../utils/validators";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password1: "",
    password2: "",
  });
  const [formError, setFormError] = useState({
    username: [],
    firstName: [],
    lastName: [],
    password1: [],
    password2: [],
  });

  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError((prev) => ({ ...prev, [e.target.name]: [] }));
  };

  const validate = () => {
    const pattern = /^[a-z]{2,15}\.[0-9]{4}[a-z]{2,3}[0-9]{2,4}$/i;
    if (!formData.username) {
      setFormError((prev) => ({ ...prev, username: ["Email is requried"] }));
      return false;
    }
    if (!pattern.test(formData.username)) {
      setFormError((prev) => ({
        ...prev,
        username: ["Enter a valid kiet email"],
      }));
      return false;
    }
    if (!formData.firstName) {
      setFormError((prev) => ({
        ...prev,
        firstName: ["First Name is requried"],
      }));
      return false;
    }
    if (!formData.lastName) {
      setFormError((prev) => ({ ...prev, lastName: ["Last Name is requried"] }));
      return false;
    }
    if (passwordValidator(formData.password1)) {
      setFormError((prev) => ({
        ...prev,
        password1: [passwordValidator(formData.password1)],
      }));
      return false;
    }
    if (passwordValidator(formData.password2)) {
      setFormError((prev) => ({
        ...prev,
        password2: [passwordValidator(formData.password2)],
      }));
      return false;
    }
    if (formData.password1 !== formData.password2) {
      setFormError((prev) => ({
        ...prev,
        password2: ["Password does not match"],
      }));
      return false;
    }
    return true;
  };

  const registerUser = () => {
    toast.info("Registering user, Please wait...");
    setDisabled(true);
    let postData = {
      username: formData.username,
      email: formData.username + "@kiet.edu",
      password: formData.password1,
      first_name: formData.firstName,
      last_name: formData.lastName,
    };
    axios
      .post(BASE_URL + REGISTER, postData)
      .then((res) => {
        toast.success("Registration successfull");
        navigate("/login");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      registerUser();
    }
  };

  return (
    <div>
      <form
        className="card auth-card input-field"
        onSubmit={(e) => handleSubmit(e)}
      >
        <fieldset disabled={disabled}>
        <div className="login-image"><OlxLogo></OlxLogo></div>
          <h2>SignUp</h2>
          <div className="input-group1">
            <label htmlFor="email">Email: </label>
            <input
              className={`mail ${
                formError.username.length ? "border border-danger" : ""
              }`}
              type="text"
              name="username"
              placeholder="email"
              value={formData.username}
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
              className={`${
                formError.firstName.length ? "border border-danger" : ""
              }`}
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
              className={`${
                formError.lastName.length ? "border border-danger" : ""
              }`}
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
                formError.password1.length || formError.password
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
              className={`${
                formError.password2.length ? "border border-danger" : ""
              }`}
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
