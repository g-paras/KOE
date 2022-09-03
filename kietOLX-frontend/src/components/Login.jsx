import { Link } from "react-router-dom";
import login from "../images/glo.gif";

const Login = ({
  handleSubmit,
  handleChange,
  formData,
  emailVerificationMessage,
  message,
  btnRef,
}) => {
  return (
    <form
      className="card auth-card input-field"
      onSubmit={(e) => handleSubmit(e)}
    >
      <img className="login-image" src={login} alt="login" />
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
      <div className="text-right">
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
