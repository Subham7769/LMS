import React, { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdInfo, MdWarning, MdError } from "react-icons/md";

const NotificationWindow = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const notifications = [
    {
      id: 1,
      type: "info",
      title: "System Update",
      time: "2 hours ago",
      message: "A new system update is available. Please review the changes and update your system.",
      icon: <MdInfo className="text-blue-500" />
    },
    {
      id: 2,
      type: "warning",
      title: "Storage Alert",
      time: "5 hours ago",
      message: "Your storage is almost full. Consider clearing some space to ensure optimal performance.",
      icon: <MdWarning className="text-yellow-500" />
    },
    {
      id: 3,
      type: "error",
      title: "Connection Error",
      time: "1 day ago",
      message: "Failed to connect to the server. Please check your internet connection and try again.",
      icon: <MdError className="text-red-500" />
    }
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case "info":
        return "bg-blue-50 border-blue-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "error":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="relative inline-block">
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={toggleNotifications}
        aria-label="Toggle notifications"
        aria-expanded={showNotifications}
        aria-controls="notification-panel"
      >
        <div className="relative">
          <IoNotifications className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notifications.length}
          </span>
        </div>
      </button>

      {showNotifications && (
        <div
          id="notification-panel"
          className="absolute -right-1000 mt-2 w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ease-in-out transform origin-top-right"
          role="region"
          aria-label="Notifications panel"
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${getNotificationClass(notification.type)} border-l-4 transition-colors duration-200`}
              >
                <button
                  className="w-full px-4 py-3 flex items-center justify-between focus:outline-none focus:bg-gray-50"
                  onClick={() => toggleAccordion(notification.id)}
                  aria-expanded={expandedId === notification.id}
                  aria-controls={`notification-content-${notification.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0">{notification.icon}</span>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </span>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                  {expandedId === notification.id ? (
                    <IoMdArrowDropup className="w-5 h-5 text-gray-500" />
                  ) : (
                    <IoMdArrowDropdown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <div
                  id={`notification-content-${notification.id}`}
                  className={`px-4 pb-3 text-sm text-gray-600 transition-all duration-200 ${
                    expandedId === notification.id ? "block" : "hidden"
                  }`}
                  role="region"
                >
                  {notification.message}
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationWindow;