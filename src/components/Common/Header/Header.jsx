import React, { useMemo, useState, useRef, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon, BoltIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import UserImg from "../../../assets/image/user.png";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import useOnline from "../../../utils/useOnline";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"
import Button from "../Button/Button";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup, IoIosArrowDown } from "react-icons/io";
import { MdInfo, MdWarning, MdError, MdOutlineMarkEmailRead, MdOutlineAddTask, MdOutlineUpdate } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineSetting } from "react-icons/ai";
import { BsBell } from "react-icons/bs";

const NotificationWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const notificationRef = useRef(null);

  const notifications = [
    {
      notificationId: 1,
      notificationStatus: "unread",
      type: "Update",
      sectionName: "Product",
      subSectionName: "BNPL LOAN",
      time: "2 minutes ago",//left
      productID: "",
      routingLink: "/",
      updates: [
        {
          fieldName: "TCL",
          oldValue: "test123",
          newValue: "test555",
          status: "CREATED",
        },
        {
          fieldName: "TCL",
          oldValue: "test123",
          newValue: "test555",
          status: "CREATED",
        },
      ],
    },
    {
      notificationId: 3,
      notificationStatus: "read",
      type: "New",
      sectionName: "TCL",
      subSectionName: "OverDraft",
      time: "3 hours ago",//left
      productID: "",
      routingLink: "/",
      status: "CREATED",
    },
    {
      notificationId: 4,
      notificationStatus: "unread",
      type: "New",
      sectionName: "Product",
      subSectionName: "OverDraft",
      time: "5 hours ago",//left
      productID: "",
      routingLink: "/product/OVERDRAFT_LOAN/loan-product-config/283c8ec2-33fd-4388-8c46-695098bdbd74/3585f95a-9f8e-4560-87a9-da884bd4fdf8",
      status: "CREATED",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAccordion = (notificationId) => {
    setExpandedItems((prev) =>
      prev.includes(notificationId) ? prev.filter((item) => item !== notificationId) : [...prev, notificationId]
    );
  };

  const handleKeyDown = (event, notificationId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleAccordion(notificationId);
    }
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative"
        onMouseEnter={() => setIsOpen(!isOpen)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle notifications"
        aria-expanded={isOpen}
      >
        <BsBell size={24} className="text-gray-600" />
        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
          {notifications.length}
        </span>
      </button>

      {isOpen && (
        <div className="absolute -right-20 mt-2 w-96 max-w-[96vw] bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ease-in-out transform origin-top-right z-50">
          <div className="p-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.notificationId}
                className="border-b border-gray-100 last:border-b-0"
              >
                <button
                  className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleAccordion(notification.notificationId)}
                  onKeyDown={(e) => handleKeyDown(e, notification.notificationId)}
                  aria-expanded={expandedItems.includes(notification.notificationId)}
                  aria-controls={`notification-content-${notification.notificationId}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {
                      notification.type === "Update" ? <AiOutlineSetting className="text-orange-500" size={24} /> :
                        notification.type === "New" ? <MdOutlineAddTask className="text-green-500" size={24} /> :
                          <MdInfo className="text-blue-500" size={24} />
                    }
                  </div>
                  <div className="flex-grow text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800">
                        {notification.type === "Update" ? `Config Update` : notification.type === "New" ? `New ${notification.sectionName}` : `New Update`}
                      </h3>
                      <span className="flex gap-5">
                        {notification.notificationStatus === "unread" && <span className="mt-2 h-2 w-2 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"></span>}
                        <IoIosArrowDown
                          className={`transform transition-transform duration-200 ${expandedItems.includes(notification.notificationId) ? "rotate-180" : ""
                            }`}
                        />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                </button>
                <div
                  id={`notification-content-${notification.notificationId}`}
                  className={`flex flex-col gap-1 px-4 py-0 bg-gray-50 transition-all duration-200 ${expandedItems.includes(notification.notificationId)
                    ? "max-h-fit opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  role="region"
                  aria-labelledby={`notification-${notification.notificationId}`}
                >
                  <p className="text-sm text-gray-600">
                    {notification.type === "Update" ? (
                      <>
                        You have received an approval request for {notification.type} in <Link to={notification.routingLink}><b >{notification.subSectionName} </b></Link> {notification.sectionName}.
                      </>
                    ) : notification.type === "New" ? (
                      <>
                        You have received an approval request for newly created {notification.sectionName}{" "}
                        <Link to={notification.routingLink}><b>{notification.subSectionName}</b></Link>.
                      </>
                    ) : (
                      "You have received a new approval request."
                    )}
                  </p>
                  {notification.type === "Update" ? (
                    notification.updates.map((item, index) => (
                      <div className="p-1 border-b border-gray-200 last:border-b-0" id={item.fieldName + index}>
                        <p className="text-[14px]"><b>{item.fieldName}</b></p>
                        <div className={"flex justify-between align-middle text-[12px]"}>
                          <p>
                            <b>Old Value</b>
                            <br />
                            {item.oldValue}
                          </p>
                          <p>
                            <b>New Value</b>
                            <br />
                            {item.newValue}
                          </p>
                          <div className="flex justify-center align-middle gap-2">
                            <Button
                              buttonName="Approve"
                              className="text-[12px] bg-green-700 px-1 rounded-md"
                            />
                            <Button
                              buttonName="Reject"
                              className="text-[12px] bg-red-600 px-1 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-evenly align-middle p-1 py-2">
                      <Button
                        buttonName="Approve"
                        className="bg-green-700 p-2 py-1 rounded-md"
                      />
                      <Button
                        buttonName="Reject"
                        className="bg-red-600 p-2 py-1 rounded-md"
                      />
                    </div>
                  )
                  }

                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const UserMenu = ({ userNavigation }) => (
  <Menu as="div" className="relative">
    <div className="flex items-center gap-2">
      <Menu.Button className="relative flex rounded-full p-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img className="h-6 w-6 rounded-full" src={UserImg} alt="User" />
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
                className={`block px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-700" : "text-gray-700"
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
          className={`h-8 ${open ? "w-auto" : "w-10 h-auto"
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
        <span
          className="cursor-pointer text-[12px]"
          title={isOnline ? "Internet Access" : "No Internet Access"}
        >
          {isOnline ? "🟢" : "🔴"}
        </span>
        <ElementErrorBoundary>
          <NotificationWindow />
        </ElementErrorBoundary>
        <ElementErrorBoundary>
          <UserMenu userNavigation={userNavigation} />
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
