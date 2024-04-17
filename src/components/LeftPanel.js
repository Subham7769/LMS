import { useState } from "react";
import { NavLink } from "react-router-dom";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const Menus = [
  { title: "Home", href: "/", icon: HomeIcon, count: "5", current: true },
  {
    title: "RAC",
    href: "/rac",
    icon: ClipboardDocumentCheckIcon,
    current: false,
    submenu: true,
    submenuItems: [
      { title: "Cash Loan RAC", href: "/rac/cash-loan/rmc" },
      { title: "BNPL RAC", href: "/slidenav" },
      { title: "Overdraft RAC", href: "/slidenav" },
    ],
    isOpen: false,
  },
  {
    title: "Product",
    href: "/product/cash-loan/loan-product-config",
    icon: AdjustmentsHorizontalIcon,
    current: false,
    spacing: false,
    submenu: true,
    submenuItems: [
      {
        title: "Cash Loan",
        href: "/product/cash-loan/loan-product-config",
      },
      { title: "BNPL", href: "/slidenav" },
      { title: "Overdraft", href: "/slidenav" },
    ],
    isOpen: false,
  },
  {
    title: "Group",
    href: "/group/1",
    icon: UsersIcon,
    current: false,
    spacing: false,
    submenu: true,
    submenuItems: [
      {
        title: "Group 1",
        href: "/group/1",
      },
      { title: "Group 2", href: "/group/2" },
      { title: "Group 3", href: "/group/3" },
    ],
    isOpen: false,
  },
  {
    title: "Global Config",
    href: "/global-config/cp",
    icon: Cog6ToothIcon,
    current: false,
    spacing: false,
    submenu: true,
    submenuItems: [
      { title: "Credit Policy", href: "/global-config/cp", current: false },
      {
        title: "Liabilities Matrix",
        href: "/global-config/liability-matrix",
        current: false,
      },
      {
        title: "Risk Grading Cal",
        href: "/global-config/risk-grade-cal",
        current: false,
      },
      {
        title: "Minimum Expense",
        href: "/global-config/bare-min-exp",
        current: false,
      },
      {
        title: "Notification Text",
        href: "/global-config/notification-text",
        current: false,
      },
      {
        title: "System Config",
        href: "/global-config/system-config",
        current: false,
      },
    ],
    isOpen: false,
  },
  {
    title: "Customer Care",
    href: "/customer-care",
    icon: UsersIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LeftPanel = () => {
  const [open, setOpen] = useState(true);
  const [submenuStates, setSubmenuStates] = useState(
    Menus.map((menu) => (menu.submenu ? { isOpen: false } : null))
  );
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const toggleSubmenu = (index) => {
    setSubmenuStates(
      Menus.map((menu, i) =>
        i === index && menu.submenu
          ? { isOpen: !submenuStates[index].isOpen }
          : submenuStates[i]
      )
    );
  };
  return (
    <>
      <div
        id="leftPanelId"
        className={`z-[4] fixed bg-white h-full top-0 left-0 border-r border-gray-200 text-left flex flex-col pl-4  transform duration-1000 ease-in-out ${
          open ? "w-60" : "w-16"
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
          <div className="-mr-3 absolute top-60">
            <div className="bg-indigo-600 h-6 w-6 rounded-full p-1">
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
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
                  className="h-4 w-4 text-white"
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
        <ul className="pt-2 pr-1.5">
          {Menus.map((menu, index) => (
            <div key={menu.title}>
              <NavLink to={menu.href} className="text-gray-500 ">
                <li
                  key={menu.title}
                  className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md hover:bg-gray-100 hover:text-indigo-600`}
                >
                  <span className="text-2xl block float-left">
                    <menu.icon className={classNames("h-6 w-6 shrink-0")} />
                  </span>
                  <span
                    className={classNames(
                      `text-base font-medium flex-1 duration-200 ${
                        !open && "hidden"
                      }`
                    )}
                  >
                    {menu.title}
                  </span>
                  {menu.submenu && open && (
                    <ChevronRightIcon
                      className={classNames(
                        submenuStates[index]?.isOpen
                          ? "rotate-90 text-gray-500"
                          : "text-gray-400",
                        "h-5 w-5 shrink-0"
                      )}
                      onClick={() => toggleSubmenu(index)}
                    />
                  )}
                </li>
              </NavLink>
              {menu.submenu && submenuStates[index]?.isOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, subIndex) => (
                    <div key={submenuItem.title}>
                      <NavLink to={submenuItem.href} className="text-gray-500">
                        <li
                          key={submenuItem.title}
                          className="text-sm flex items-center gap-x-4 cursor-pointer p-2 px-12 rounded-md hover:bg-gray-100 hover:text-indigo-600"
                        >
                          {submenuItem.title}
                        </li>
                      </NavLink>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LeftPanel;
