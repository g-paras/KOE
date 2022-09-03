import axios from "axios";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import login from "../images/glo.gif";
import { BASE_URL, RESEND_VERIFICATION_EMAIL } from "../utils/constants";

const ResendEmailVerification = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const btnRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.info("Processing request");
    btnRef.current.disabled = true;

    const formData = new FormData();
    formData.append("email", email);

    axios
      .post(BASE_URL + RESEND_VERIFICATION_EMAIL, formData)
      .then((res) => {
        console.log(res.data);
        navigate("/login", {
          state: {
            message:
              res.data?.message ||
              "Please check your email for verification link",
          },
          replace: true,
        });
      })
      .catch((err) => {
        btnRef.current.disabled = false;
        if (err.response) {
          switch (err.response.status) {
            case 400:
              setError("Provided email is not an valid email address");
              break;
            case 404:
              setError("No user with this email exists");
              break;
            default:
              setError("Something went wrong");
              break;
          }
        } else if (err.request) {
          toast.error("Connection error, Please try later");
        } else {
          toast.error("Sorry, we are unable to process request");
        }
      });
  };

  return (
    <form className="card auth-card input-field" onSubmit={handleSubmit}>
      <img className="login-image" src={login} alt="login" />
      <h2>Resend Verification Email</h2>
      <div className="input-group1 mt-4">
        <label htmlFor="username">Email: </label>
        <input
          className="mail"
          type="text"
          name="username"
          placeholder="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="mailName">@kiet.edu</span>
        {error && <p className="mt-2 mb-0 text-danger">{error}</p>}
      </div>

      <div>
        <button ref={btnRef} className="primary" type="submit">
          Send Verification Link
        </button>
      </div>

      <p>
        Account already verified? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
};

export default ResendEmailVerification;
