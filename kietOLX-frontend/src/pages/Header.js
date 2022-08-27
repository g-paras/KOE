import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../images/glo.gif";
import profile from "../images/profile.png";
import AuthContext from "../contexts/AuthContext";

const Header = () => {
  const { token, logoutUser } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <Link to="/" className="navbar-brand logo">
        <img src={logo} alt="logo" />
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav flex-2 pr-3">
          <li className="input-group input-group-lg search flex-2">
            <input
              type="text"
              className="form-control"
              placeholder="Find Quantum,Books and more...."
            />
            <div className="input-group-append">
              <button className="btn btn-dark" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          {token === "" ? (
            <Link to="/login" className="mr-sm-2 login">
              {" "}
              Login{" "}
            </Link>
          ) : (
            <div className="wrapper">
              <input id="toggler" type="checkbox" className="drop" />
              <label htmlFor="toggler">
                <img src={profile} className="profile" alt="ProfileAvatar" />
              </label>
              <div className="dropdown">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <button className="dropdown-item">Settings</button>
                <button className="dropdown-item">My Ads</button>
                <button className="dropdown-item" onClick={logoutUser}>
                  Logout
                </button>
              </div>
            </div>
          )}
          <Link to="/post" className="sell">
            {/* <img src={sell} alt="sell" /> */}
            <span>+ SELL</span>
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Header;
