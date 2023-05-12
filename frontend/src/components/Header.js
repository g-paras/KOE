import React from "react";
// import { useContext } from "react";
import { Link } from "react-router-dom";
// import OlxLogo from "./OlxLogo";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";

import chickenImage from "src/shared/assets/chicken.png";
import logo from "src/shared/assets/logo.png";
import stateUrls from "src/shared/constants/StateUrls";

// import bookmarkOutline from "../images/bookmark-outline.svg";
// import profileIcon from "../images/person-circle-outline.svg";
// import settingsIcon from "../images/settings-outline.svg";
// import logoutIcon from "../images/log-out-outline.svg";
// import personIcon from "../images/person-outline.svg";
// import adIcon from "../images/reader-outline.svg";
// import AuthContext from "../contexts/AuthContext";
// import {  useState } from "react";

const Header = () => {
  // const { token, logoutUser } = useContext(AuthContext);
  // const [query, setQuery] = useState("");

  return (
    <div className="w-full">
      <nav className="px-4 py-3 bg-gray-100 flex justify-between items-center space-x-4">
        <Link to="/" className="inline-block ">
          <img className="h-12" src={logo} alt="KIET Online Exchange" />
        </Link>

        <div className="flex-1 hidden md:inline-flex">
          <input
            className="flex-1 px-3 py-2 border-2 border-gray-700 rounded-l-md"
            placeholder="Search Items"
          />
          <button className="px-3 py-2 bg-gray-700 border-2 border-gray-700 rounded-r-md">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Menu as="div" className="relative inline-block my-auto text-left">
            <Menu.Button className="rounded-full block">
              <img src={chickenImage} className='h-12 w-12' alt="chicken" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      href="/account-settings"
                    >
                      Account settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      href="/account-settings"
                    >
                      Documentation
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>

          <Link
            to={stateUrls.CREATE_PRODUCT}
            className="inline-block rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <span className="inline-block m-1 rounded-full px-3 py-2 bg-white font-semibold">+ SELL</span>
          </Link>
        </div>

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav flex-2 pr-3">
          <li className="input-group input-group-lg search flex-2">
            <input
              type="text"
              className="form-control"
              placeholder="Find Quantum,Books and more...."
              // value={query}
              // onChange={(e) => setQuery(e.target.value)}
            />
            <div className="input-group-append">
              <Link
                // to={`/product/search/${query}`}
                to='search'
                className="btn btn-dark"
                type="button"
              >
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
              </Link>
            </div>
          </li>
        </ul>
        <form className="form-inline">
          {token ? (
          <div class="dropdown">
            <a href="#" id="imageDropdown" data-toggle="dropdown">
               <img src={profileIcon} className="profile" alt="ProfileAvatar" />
            </a>
            <ul className="dropdown-menu" role="menu" aria-labelledby="imageDropdown" >
              <li role="presentation">
                <Link to="/profile" className="dropdown-item">
                   <img src={personIcon} width={20} alt="" /> Profile
                </Link></li>
              <li role="presentation">
                <Link to="/bookmarks" className="dropdown-item">
                   <img src={bookmarkOutline} width={20} alt="" /> Bookmarks
                </Link>
              </li>
              <li role="presentation">
                 <button className="dropdown-item">
                   <img src={settingsIcon} width={20} alt="" /> Settings
                </button>
              </li>
              <li role="presentation">
                 <Link to="/my-ads" className="dropdown-item">
                   <img src={adIcon} width={20} alt="" /> My Ads
                 </Link>
              </li>
              <li role="presentation">
                 <button className="dropdown-item" onClick={logoutUser}>
                   <img src={logoutIcon} width={20} alt="" /> Logout
                </button>
              </li>
            </ul>
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
      </div> */}
      </nav>
      <div className="flex md:hidden px-4 py-2">
        <input
          className="flex-1 px-3 py-2 border-2 border-gray-800 rounded-l-md"
          placeholder="Search Items"
        />
        <button className="px-3 py-2 bg-gray-800 border-2 border-gray-800 rounded-r-md">
          <MagnifyingGlassIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Header;
