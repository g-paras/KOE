import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import OlxLogo from "./OlxLogo";

import bookmarkOutline from "../images/bookmark-outline.svg";
import profileIcon from "../images/person-circle-outline.svg";
import settingsIcon from "../images/settings-outline.svg";
import logoutIcon from "../images/log-out-outline.svg";
import personIcon from "../images/person-outline.svg";
import adIcon from "../images/reader-outline.svg";
import AuthContext from "../contexts/AuthContext";

const Header = () => {
  const { token, logoutUser } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white ">
      <Link to="/" className="navbar-brand logo">
        <OlxLogo></OlxLogo>
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
        <form className="form-inline">
          {token ? (
            <div className="wrapper mb-3 mr-2">
              <input id="toggler" type="checkbox" className="drop" />
              <label htmlFor="toggler">
                <img src={profileIcon} className="profile" alt="ProfileAvatar" />
              </label>
              <div className="dropdown">
                <Link to="/profile" className="dropdown-item">
                  <img src={personIcon} width={20} alt="" /> Profile
                </Link>
                <Link to="/bookmarks" className="dropdown-item">
                  <img src={bookmarkOutline} width={20} alt="" /> Bookmarks
                </Link>
                <button className="dropdown-item">
                  <img src={settingsIcon} width={20} alt="" /> Settings
                </button>
                <Link to="/my-ads" className="dropdown-item">
                  <img src={adIcon} width={20} alt="" /> My Ads
                </Link>
                <button className="dropdown-item" onClick={logoutUser}>
                  <img src={logoutIcon} width={20} alt="" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="mr-sm-2 login">
              {" "}
              Login{" "}
            </Link>
          )}
          <Link to="/post" className="sell">
            <span>+ SELL</span>
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Header;
