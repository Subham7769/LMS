import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import {
  CalendarIcon,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Menus = [
  { title: "Home", href: "/", icon: HomeIcon, count: "5", current: true },
  {
    title: "RAC",
    href: "/rac",
    icon: FolderIcon,
    count: "12",
    current: false,
  },
  {
    title: "Product",
    href: "/product",
    icon: CalendarIcon,
    count: "20+",
    current: false,
    spacing: false,
    submenu: true,
    submenuItems: [
      { title: "Cash Loan", href: "/product/cash-loan/rmc" },
      { title: "BNPL", href: "#" },
      { title: "Overdraft", href: "#" },
    ],
  },
  {
    title: "Group",
    href: "/group",
    icon: UsersIcon,
    current: false,
  },
  {
    title: "Notifications",
    href: "/notification",
    icon: ChartPieIcon,
    current: false,
  },
  {
    id: 1,
    title: "Expense",
    href: "/expense",
    icon: UsersIcon,
    current: false,
    spacing: true,
  },
  { id: 2, title: "Tailwind", href: "#", icon: UsersIcon, current: false },
  { id: 3, title: "Workcation", href: "#", icon: UsersIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LeftPanel = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [navItems, setNavItems] = useState(Menus);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleItemClick = (index) => {
    const updatedNavItems = navItems.map((item, i) => {
      return {
        ...item,
        current: i === index ? true : false,
      };
    });
    setNavItems(updatedNavItems);
    console.log("handleClicked");
  };

  return (
    <>
      <div
        className={`border-r border-gray-200 text-left flex flex-col pl-4 gap-y-5 transform duration-1000 ease-in-out ${
          open ? "w-72" : "w-16"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>
        <button onClick={toggleSidebar} className="flex justify-end">
          <div className="-mr-4 absolute top-64">
            <div className="bg-indigo-600 h-8 w-8 rounded-full p-1">
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
                  className="h-6 w-6 text-white"
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
            </div>
          </div>
        </button>
        <ul className="pt-2">
          {navItems.map((menu, index) => (
            <>
              <Link
                to={menu.href}
                onClick={() => handleItemClick(index)}
                className={classNames(
                  menu.current ? " text-indigo-600" : "hover:text-indigo-600"
                )}
              >
                <li
                  key={menu.title}
                  className={`text-gray-500 text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md hover:bg-gray-100 hover:text-indigo-600 ${
                    menu.spacing ? "mt-9" : "mt-2"
                  }`}
                >
                  <span className="text-2xl block float-left">
                    <menu.icon
                      className={classNames(
                        menu.current
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                    />
                  </span>
                  <span
                    className={`text-base font-medium flex-1 duration-200 ${
                      !open && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                  {menu.submenu && open && (
                    <ChevronRightIcon
                      className={classNames(
                        submenuOpen
                          ? "rotate-90 text-gray-500"
                          : "text-gray-400",
                        "h-5 w-5 shrink-0"
                      )}
                      onClick={() => setSubmenuOpen(!submenuOpen)}
                    />
                  )}
                </li>
              </Link>
              {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, index) => (
                    <Link to={submenuItem.href}>
                      <li
                        key={submenuItem.title}
                        className="text-gray-500 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-12 rounded-md hover:bg-gray-100 hover:text-indigo-600"
                      >
                        {submenuItem.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LeftPanel;
