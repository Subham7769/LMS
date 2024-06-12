import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  UsersIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import useRACInfo from "./utils/useRACInfo";
import useAllProjectInfo from "./utils/useAllProjectInfo";

const MenusInitial = [
  { title: "Home", href: "/", icon: HomeIcon, count: "5", current: true },
  {
    title: "RAC",
    href: "/rac",
    icon: ClipboardDocumentCheckIcon,
    current: false,
    submenu: true,
    submenuItems: [
      { name: "Cash Loan RAC", href: "/rac/cash-loan/rmc" },
      { name: "BNPL RAC", href: "/rac/bnpl/rmc" },
      { name: "Overdraft RAC", href: "/rac/overdraft/rmc" },
    ],
    isOpen: false,
  },
  {
    title: "Project",
    href: "/project/loan-form",
    icon: CircleStackIcon,
    current: false,
    submenu: true,
    submenuItems: [
      { name: "Project 1", href: "/project/loan-form" },
      { name: "Project 2", href: "/project/loan-form/2" },
      { name: "Project 3", href: "/project/loan-form/3" },
    ],
    isOpen: false,
  },
  {
    title: "Product",
    href: "/product",
    icon: AdjustmentsHorizontalIcon,
    current: false,
    spacing: false,
    submenu: true,
    submenuItems: [
      {
        name: "Cash Loan",
        href: "/product/cash-loan/loan-product-config/CASH_LOAN",
      },
      {
        name: "BNPL",
        href: "/product/bnpl/loan-product-config/BNPL",
      },
      {
        name: "Overdraft",
        href: "/product/overdraft/loan-product-config/OVERDRAFT",
      },
    ],
    isOpen: false,
  },
  {
    title: "Group",
    href: "/group",
    icon: UsersIcon,
    current: false,
    spacing: false,
    submenu: true,
    submenuItems: [
      {
        name: "Group 1",
        href: "/group/1",
      },
      { name: "Group 2", href: "/group/2" },
      { name: "Group 3", href: "/group/3" },
    ],
    isOpen: false,
  },
  {
    title: "Business Rule",
    href: "/business-rule/1",
    icon: UsersIcon,
    current: false,
    spacing: false,
    submenu: true,
    submenuItems: [
      {
        name: "Business Rule 1",
        href: "/business-rule/1",
      },
      { name: "Business Rule 2", href: "/business-rule/2" },
      { name: "Business Rule 3", href: "/business-rule/3" },
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
      { name: "Credit Policy", href: "/global-config/cp", current: false },
      {
        name: "Liabilities Matrix",
        href: "/global-config/liability-matrix",
        current: false,
      },
      {
        name: "Risk Grading",
        href: "/global-config/risk-grade-cal",
        current: false,
      },
      {
        name: "Minimum Expense",
        href: "/global-config/bare-min-exp",
        current: false,
      },
      {
        name: "Notification Text",
        href: "/global-config/notification-text",
        current: false,
      },
      {
        name: "System Configuration",
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
  {
    title: "New User",
    href: "/user",
    icon: UsersIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LeftPanel = () => {
  const [open, setOpen] = useState(true);
  const [Menus, setMenus] = useState(MenusInitial);
  const RACDataInfo = useRACInfo();
  // console.log(RACDataInfo);
  useEffect(() => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.title === "RAC") {
          return {
            ...menu,
            submenuItems: RACDataInfo,
          };
        }
        return menu;
      })
    );
  }, [RACDataInfo]);
  const ProjectDataInfo = useAllProjectInfo();
  useEffect(() => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.title === "Project") {
          return {
            ...menu,
            submenuItems: ProjectDataInfo,
          };
        }
        return menu;
      })
    );
  }, [ProjectDataInfo]);

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
          open ? "w-64" : "w-16"
        }`}
      >
        <button onClick={toggleSidebar} className="flex justify-end">
          <div className="-right-3 absolute top-60">
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
        <ul className="pt-2 pr-3 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white scrollbar-track-white">
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
                    <div key={submenuItem.name}>
                      <NavLink to={submenuItem.href} className="text-gray-500">
                        <li
                          key={submenuItem.name}
                          className="text-sm flex items-center gap-x-4 cursor-pointer p-2 px-12 rounded-md hover:bg-gray-100 hover:text-indigo-600"
                        >
                          {submenuItem.name}
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
