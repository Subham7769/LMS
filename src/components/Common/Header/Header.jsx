import React, { useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BoltIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import UserImg from "../../../assets/image/user.png";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import useOnline from "../../../utils/useOnline";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NotificationWindow from "../../Notifications/NotificationWindow";

const UserMenu = ({ userNavigation, isOnline }) => (
  <Menu as="div" className="relative">
    <div className="flex items-center gap-2">
      <Menu.Button className="relative flex rounded-full p-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img className="h-6 w-6 rounded-full" src={UserImg} alt="User" />
        <span
          title={isOnline ? "Internet Access" : "No Internet Access"}
          className={`absolute bottom-0 right-0 h-3 w-3 ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }  rounded-full text-xs text-white flex items-center justify-center`}
        ></span>
      </Menu.Button>
      <div className="text-gray-500">
        Hello, {localStorage.getItem("username")}
      </div>
    </div>
    <Transition
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <Link
                to={item.href}
                className={`block px-4 py-2 text-sm ${
                  active ? "bg-gray-100 text-gray-700" : "text-gray-700"
                }`}
                onClick={item.action}
              >
                {item.name}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
);

const Header = () => {
  const isOnline = useOnline();
  const userNavigation = useMemo(
    () => [
      // { name: "Your Profile", href: "#" },
      // { name: "Settings", href: "#" },
      { name: "Sign out", href: "/login", action: () => localStorage.clear() },
    ],
    []
  );

  return (
    <header
      className="shadow-md sticky h-14 top-0 left-0 bg-white z-50 flex items-center justify-between"
      id="navBarId"
    >
      <ToastContainer />
      {/* logo */}
      <div className="w-1/3 flex shrink-0 items-center">
        {/* <img
          className={`h-8 ${open ? "w-auto" : "w-10 h-auto"} ml-5`}
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <BoltIcon
          className={`h-8 ${
            open ? "w-auto" : "w-10 h-auto"
          } ml-5 text-indigo-500`}
        />
      </div>
      <div className="flex justify-center w-1/3">
        <div>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          {/* Uncomment and customize the search input if needed */}
          {/* <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Search"
              type="search"
            />
          </div> */}
        </div>
      </div>
      <div className="px-8 py-3 relative flex justify-end items-center gap-5 w-1/3">
        <ElementErrorBoundary>
          <NotificationWindow />
        </ElementErrorBoundary>
        <ElementErrorBoundary>
          <UserMenu userNavigation={userNavigation} isOnline={isOnline} />
        </ElementErrorBoundary>
      </div>
    </header>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <Header {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
