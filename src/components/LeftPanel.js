import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, count: "5", current: true },
  {
    name: "Group",
    href: "/group",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Engineering", href: "#" },
      { name: "Human Resources", href: "#" },
      { name: "Customer Success", href: "#" },
    ],
  },
  {
    name: "RAC",
    href: "/rac",
    icon: FolderIcon,
    count: "12",
    current: false,
  },
  {
    name: "Product",
    href: "/product",
    icon: CalendarIcon,
    count: "20+",
    current: false,
  },
  {
    name: "Scheme",
    href: "/scheme",
    icon: DocumentDuplicateIcon,
    current: false,
    children: [
      { name: "GraphQL API", href: "#" },
      { name: "iOS App", href: "#" },
      { name: "Android App", href: "#" },
      { name: "New Customer Portal", href: "#" },
    ],
  },
  {
    name: "Notifications",
    href: "/notification",
    icon: ChartPieIcon,
    current: false,
  },
];
const teams = [
  { id: 1, name: "Expense", href: "/expense", initial: "E", current: false },
  { id: 2, name: "Tailwind", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LeftPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState(navigation);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (index) => {
    const updatedNavItems = navItems.map((item, i) => {
      return {
        ...item,
        current: i === index ? true : false,
      };
    });
    setNavItems(updatedNavItems);
  };

  return (
    <>
      <div
        className={`border-r border-gray-200 text-left flex flex-col pl-4 gap-y-5 transform duration-1000 ease-in-out ${
          isOpen ? "w-72" : "w-16"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
        <nav className="flex flex-1 flex-col">
          <ul
            role="list"
            className={`flex flex-1 flex-col ${isOpen ? "gap-y-7" : "gap-y-0"}`}
          >
            <li>
              <ul role="list" className="space-y-1">
                {navItems.map((item, index) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        to={item.href}
                        onClick={() => handleItemClick(index)}
                        className={classNames(
                          item.current
                            ? " text-indigo-600"
                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <div className="relative w-full">
                          <div
                            className={`grow flex justify-between text-left opacity-0 transform duration-1000 ease-in-out ${
                              isOpen
                                ? "translate-x-0 opacity-100"
                                : "translate-x-px"
                            }`}
                          >
                            <div className="mx-3">{item.name}</div>
                            {item.count ? (
                              <div
                                className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                                aria-hidden="true"
                              >
                                {item.count}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Disclosure as="div">
                        {({ open }) => (
                          <>
                            <Link to={item.href}>
                              <Disclosure.Button
                                onClick={() => handleItemClick(index)}
                                className={classNames(
                                  item.current
                                    ? " text-indigo-600"
                                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                  "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                )}
                              >
                                <item.icon
                                  className="h-6 w-6 shrink-0 text-gray-400"
                                  aria-hidden="true"
                                />
                                <div className="relative w-full">
                                  <div
                                    className={`grow flex justify-between text-left opacity-0 transform duration-1000 ease-in-out ${
                                      isOpen
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-px opacity-0"
                                    }`}
                                  >
                                    <div className="mx-3">{item.name}</div>
                                    <ChevronRightIcon
                                      className={classNames(
                                        open
                                          ? "rotate-90 text-gray-500"
                                          : "text-gray-400",
                                        "ml-auto h-5 w-5 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </Disclosure.Button>
                            </Link>
                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                              {item.children.map((subItem) => (
                                <li key={subItem.name}>
                                  {/* 44px */}
                                  <Disclosure.Button
                                    as="a"
                                    href={subItem.href}
                                    className={classNames(
                                      subItem.current
                                        ? "text-indigo-600"
                                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                      "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 mx-3"
                                    )}
                                  >
                                    {subItem.name}
                                  </Disclosure.Button>
                                </li>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </li>
            <li>
              {isOpen ? (
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your teams
                </div>
              ) : null}
              <ul role="list" className="mt-2 space-y-1">
                {teams.map((team) => (
                  <li key={team.name}>
                    <Link
                      to={team.href}
                      className={classNames(
                        team.current
                          ? "bg-gray-50 text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <span
                        className={classNames(
                          team.current
                            ? "text-indigo-600 border-indigo-600"
                            : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                        )}
                      >
                        {team.initial}
                      </span>
                      <div className="relative">
                        <span
                          className={`text-left opacity-0 transform duration-1000 ease-in-out ${
                            isOpen
                              ? "translate-x-0 opacity-100"
                              : "translate-x-full"
                          }`}
                        >
                          {team.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="-mx-6 mt-auto">
              <Link
                to="/"
                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
              >
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="sr-only">Your profile</span>
                <div className="relative">
                  <span
                    className={`text-left opacity-0 transform duration-1000 ease-in-out ${
                      isOpen ? "opacity-100" : "translate-x-full"
                    }`}
                  >
                    Tom Cook
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default LeftPanel;
