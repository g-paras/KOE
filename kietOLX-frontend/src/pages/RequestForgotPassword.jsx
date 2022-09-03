import axios from "axios";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import login from "../images/glo.gif";
import { BASE_URL, REQUEST_RESET_PASSWORD } from "../utils/constants";

const RequestForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const btnRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    btnRef.current.disabled = true;
    setLoading(true);
    setError("");

    axios
      .post(BASE_URL + REQUEST_RESET_PASSWORD, formData)
      .then((res) => {
        console.log(res.data);
        navigate("/login", {
          state: { message: "We have mailed you instructions to reset password" },
        });
      })
      .catch((err) => {
        btnRef.current.disabled = false;
        setLoading(false);

        if (err.response) {
          setError(err?.response?.data?.message || "Invalid email");
        } else {
          toast.error("We are unable to process your request");
        }
      });
  };

  return (
    <form className="card auth-card input-field" onSubmit={handleSubmit}>
      <img className="login-image" src={login} alt="login" />
      <h2>Forgot Password</h2>
      <div className="input-group1 mt-4">
        <label htmlFor="username">Email address: </label>
        <input
          className="mail"
          type="text"
          name="username"
          placeholder="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <span className="mailName">@kiet.edu</span>
        {error && <p className="mt-2 mb-0 text-danger">*{error}</p>}
      </div>

      <div>
        <button ref={btnRef} className="primary" type="submit">
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </div>

      <p>
        <Link to="/login">Login</Link> or <Link to="/signup">Register</Link>
      </p>
    </form>
  );
};

export default RequestForgotPassword;
