import { useReducer } from "react";
import { useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { BASE_URL, RESET_PASSWORD } from "../utils/constants";

import login from "../images/glo.gif";

const initialState = {
  password: "",
  rePassword: "",
  passwordError: false,
  rePasswordError: false,
};

const validatePassword = (password) => {
  const pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$"
  );
  return pattern.test(password);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PASSWORD":
      return {
        ...state,
        password: action.payload,
        passwordError: !validatePassword(action.payload),
      };
    case "RE_PASSWORD":
      return {
        ...state,
        rePassword: action.payload,
        rePasswordError: !validatePassword(action.payload),
      };
    default:
      return { ...state };
  }
};

const ChangePassword = () => {
  const { uid, token } = useParams();
  const [loading, setLoading] = useState(false);
  const btnRef = useRef();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      state.passwordError ||
      state.rePasswordError ||
      state.password !== state.rePassword
    )
      return;

    setLoading(true);
    btnRef.current.disabled = true;
    const formData = new FormData();

    formData.append("password", state.password);
    formData.append("re_password", state.rePassword);

    axios
      .post(BASE_URL + RESET_PASSWORD + uid + "/" + token + "/", formData)
      .then((res) => {
        console.log(res.data);
        navigate("/login", {
          state: { message: "You password has been changed successfully" },
          replace: true,
        });
      })
      .catch((err) => {
        setLoading(false);
        btnRef.current.disabled = false;
        console.log(err);
        toast.error("Sorry 😢, we are unable to process your request.");
      });
  };

  return (
    <form className="card auth-card input-field" onSubmit={handleSubmit}>
      <img className="login-image" src={login} alt="login" />
      <h2>Forgot Password</h2>
      <div className="input-group1 mt-2">
        <label htmlFor="password">Enter Password: </label>

        <input
          type="password"
          name="password"
          placeholder="password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "PASSWORD", payload: e.target.value })
          }
        />
        {state.passwordError && (
          <p className="text-danger mb-0">Enter valid password</p>
        )}
      </div>
      <div className="input-group1">
        <label htmlFor="password">Re-enter Password: </label>

        <input
          type="password"
          name="password"
          placeholder="password"
          value={state.rePassword}
          onChange={(e) =>
            dispatch({ type: "RE_PASSWORD", payload: e.target.value })
          }
        />
        {state.rePasswordError && (
          <p className="text-danger">Enter valid password</p>
        )}
        {!state.passwordError &&
          !state.rePasswordError &&
          state.password !== state.rePassword && (
            <p className="text-danger">Passwords does not match</p>
          )}
      </div>
      <ul className="text-left">
        <li>Password must be 8 digit long </li>
        <li>It must have a lowecase alphabet </li>
        <li>It must have a uppercase alphaber </li>
        <li>It mush have a digit </li>
        <li>It must have a special character</li>
      </ul>

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

export default ChangePassword;
