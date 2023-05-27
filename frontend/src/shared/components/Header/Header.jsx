import React, { useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";

import chickenImage from "src/shared/assets/chicken.png";
import logo from "src/shared/assets/logo.png";
import stateUrls from "src/shared/constants/StateUrls";
import BaseContext from "src/shared/contexts/BaseContext";
import commonUtils from "src/shared/utils/commonUtils";

const Header = (props) => {
  const { hideSearchBar = false } = props;
  const navigate = useNavigate();

  const { authenticated } = useContext(BaseContext);

  const logout = useCallback(() => {
    commonUtils.removeAuthToken();
    navigate(0);
  }, []);

  return (
    <div className="w-full">
      <nav className="px-4 md:px-8 py-3 bg-gray-100 flex justify-between items-center space-x-4">
        <Link to={stateUrls.HOME} className="inline-block ">
          <img className="h-12" src={logo} alt="KIET Online Exchange" />
        </Link>

        {!hideSearchBar && (
          <div className="flex-1 hidden md:inline-flex max-w-xl mx-auto">
            <input
              className="flex-1 px-3 py-2 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1"
              placeholder="Search Items"
            />
            <button className="px-3 py-2 bg-gray-600 border-2 border-gray-600 rounded-r-md">
              <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <Menu as="div" className="relative inline-block my-auto text-left">
            <Menu.Button className="rounded-full block">
              <img src={chickenImage} className="h-12 w-12" alt="chicken" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {authenticated ? (
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
                        My Ads
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={logout}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              ) : (
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        href="/login"
                      >
                        Login
                      </a>
                    )}
                  </Menu.Item>
                </div>
              )}
            </Menu.Items>
          </Menu>

          <Link
            to={stateUrls.CREATE_PRODUCT}
            className="inline-block rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <span className="inline-block m-1 rounded-full px-3 py-2 bg-white font-semibold">
              + SELL
            </span>
          </Link>
        </div>
      </nav>
      {!hideSearchBar && (
        <div className="flex md:hidden px-4 py-2">
          <input
            className="flex-1 px-3 py-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring-1"
            placeholder="Search Items"
          />
          <button className="px-3 py-2 bg-gray-600 border-2 border-gray-600 rounded-r-md">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
