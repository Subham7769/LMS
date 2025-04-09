import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../../../utils/Transition";

import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/Slices/authSlice.js";
import useOnline from "../../../utils/useOnline";
import { fetchRoles } from "../../../redux/Slices/userManagementSlice.js";
import UserAvatar from '../../../assets/image/user-avatar-32.png';
import convertToTitleCase from "../../../utils/convertToTitleCase.js";


const UserProfile = ({ align }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const isOnline = useOnline();
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  

  const userNavigation = [
    { name: "Settings", href: "#", action: () => {} },
    { name: "Sign Out", href: "/login", action: () => dispatch(logout()) },
  ];

  return (
    <div className="relative flex gap-2">
      <button
        ref={trigger}
        className="relative flex justify-center items-center group p-1 text-text-light-tertiary"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {/* <UserCircleIcon className="h-8 w-8" /> */}
        <img
          className="w-8 h-8 rounded-full"
          src={UserAvatar}
          width="32"
          height="32"
          alt="User"
        />
        <span
          title={isOnline ? "Internet Access" : "No Internet Access"}
          className={`absolute bottom-1 left-6 h-3 w-3 ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }  rounded-full text-xs text-white flex items-center justify-center`}
        ></span>
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium dark:text-gray-100 group-hover:text-text-light-primary dark:group-hover:text-white transition-colors duration-200">
            {localStorage.getItem("username")}
          </span>
          <ChevronDownIcon className="h-4 w-4 ml-1" />
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {localStorage.getItem("username")}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">
              {convertToTitleCase(roleName)}
            </div>
          </div>
          <ul>
            {userNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="font-medium text-sm text-violet-quaternary hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                  onClick={item.action}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default UserProfile;
