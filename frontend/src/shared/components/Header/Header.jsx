import React, { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  FunnelIcon,
  ArrowRightOnRectangleIcon,
  BookmarkSquareIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";

import userAvatar from "src/shared/assets/user.png";
import logo from "src/shared/assets/logo.png";
import stateUrls from "src/shared/constants/StateUrls";
import BaseContext from "src/shared/contexts/BaseContext";
import commonUtils from "src/shared/utils/commonUtils";

const Header = (props) => {
  const { hideSearchBar = false } = props;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const { authenticated, avatar } = useContext(BaseContext);

  const logout = useCallback(() => {
    commonUtils.removeAuthToken();
    navigate(0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery && searchQuery.trim() !== "")
      navigate({
        pathname: stateUrls.HOME,
        search: `?${new URLSearchParams({ query: searchQuery }).toString()}`,
      });
  };

  return (
    <div className="w-full">
      <nav className="px-4 md:px-8 py-3 bg-gray-100 flex justify-between items-center space-x-4">
        <Link to={stateUrls.HOME} className="inline-block ">
          <img className="h-12" src={logo} alt="KIET Online Exchange" />
        </Link>

        {!hideSearchBar && (
          <form
            onSubmit={handleSubmit}
            className="flex-1 hidden md:inline-flex max-w-xl mx-auto"
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1"
              placeholder="Search Items"
            />
            <button className="px-3 py-2 bg-gray-600 border-2 border-gray-600 rounded-r-md">
              <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            </button>
          </form>
        )}

        <div className="flex items-center space-x-4">
          <Menu as="div" className="relative inline-block my-auto text-left">
            <Menu.Button className="rounded-full block">
              <img
                src={avatar || userAvatar}
                className="h-12 w-12"
                alt="chicken"
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              {authenticated ? (
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        to={stateUrls.MY_PROFILE}
                      >
                        <UserCircleIcon className="w-5 mr-2" /> Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        to={stateUrls.MY_ADS}
                      >
                        <FunnelIcon className="w-5 mr-2" /> My Ads
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        to={stateUrls.BOOKMARKS}
                      >
                        <BookmarkSquareIcon className="w-5 mr-2" /> Bookmarks
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        to={stateUrls.SETTINGS}
                      >
                        <Cog6ToothIcon className="w-5 mr-2" /> Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item className="lg:hidden">
                    {({ active }) => (
                      <Link
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        to={stateUrls.CREATE_PRODUCT}
                      >
                        <ArrowUpOnSquareStackIcon className="w-5 mr-2" /> Sell
                        Item
                      </Link>
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
                        <ArrowLeftOnRectangleIcon className="w-5 mr-2" /> Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              ) : (
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        to={stateUrls.LOGIN}
                      >
                        <ArrowRightOnRectangleIcon className="w-5 mr-2" /> Login
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        to={stateUrls.CREATE_PRODUCT}
                      >
                        <ArrowUpOnSquareStackIcon className="w-5 mr-2" /> Sell
                        Item
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              )}
            </Menu.Items>
          </Menu>

          <Link
            to={stateUrls.CREATE_PRODUCT}
            className="hidden lg:inline-block rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <span className="inline-block m-1 rounded-full px-3 py-2 bg-white font-semibold">
              + SELL
            </span>
          </Link>
        </div>
      </nav>
      {!hideSearchBar && (
        <form onSubmit={handleSubmit} className="flex md:hidden px-4 py-2">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring-1"
            placeholder="Search Items"
          />
          <button className="px-3 py-2 bg-gray-600 border-2 border-gray-600 rounded-r-md">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Header;
