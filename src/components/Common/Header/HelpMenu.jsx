import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../../../utils/Transition";
import {
  DocumentationIcon,
  SupportIcon,
  ContactIcon,
} from "../../../assets/icons.jsx";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const HelpMenu = ({ align }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const helpNavigation = [
    {
      name: "Documentation",
      href: "#",
      icon: DocumentationIcon,
      action: () => {
        setDropdownOpen(!dropdownOpen);
        console.log("Going to documentation");
      },
    },
    {
      name: "Support Site",
      href: "#",
      icon: SupportIcon,
      action: () => {
        setDropdownOpen(!dropdownOpen);
        console.log("Going to support site");
      },
    },
    {
      name: "Contact us",
      href: "/support",
      icon: ContactIcon,
      action: () => {
        setDropdownOpen(!dropdownOpen);
        console.log("Going to contact us");
      },
    },
  ];

  return (
    <div className="relative inline-flex border-r pr-3 border-border-gray-secondary dark:border-gray-700/60">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center hover:bg-background-light-primary dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ${
          dropdownOpen && "bg-background-light-primary dark:bg-gray-800"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Need help?</span>
        <InformationCircleIcon className="h-5 w-5 text-gray-500/80" />
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
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-3">
            Need help?
          </div>
          <ul>
            {helpNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="font-medium text-sm text-violet-quaternary hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                  onClick={item.action}
                >
                  <item.icon className="w-3 h-3 fill-current text-violet-quaternary shrink-0 mr-2" />
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

export default HelpMenu;
