import { Link } from "react-router-dom";
import OlxLogo from "./OlxLogo";

const Login = ({
  handleSubmit,
  handleChange,
  formData,
  formError,
  emailVerificationMessage,
  message,
  btnRef,
}) => {
  return (
    <form
      className="card auth-card input-field"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="login-image"><OlxLogo></OlxLogo></div>
      <h2>Login</h2>
      {emailVerificationMessage && (
        <p>
          Your account is not verified,
          <br /> please verify your account or <br />
          <Link to="/resend-verification-email">click here</Link> to resend
          verification email
        </p>
      )}
      {message && <p>{message}</p>}
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
        <br />
        {formError.username.map((error, id) => (
          <p key={id} className="text-danger mb-0">
            *{error}
          </p>
        ))}
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
        <br />
        {formError.password.map((error, id) => (
          <p key={id} className="text-danger mb-0">
            *{error}
          </p>
        ))}
      </div>
      <div className="text-center w-100">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div>
        <button ref={btnRef} className="primary" type="submit">
          Login
        </button>
      </div>

      <p>
        Don't have an accout? <Link to="/signup">Signup here</Link>
      </p>
    </form>
  );
};

export default Login;
