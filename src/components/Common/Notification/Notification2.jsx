import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdError } from "react-icons/md";

const NotificationPanel = () => {
  const [activeNotification, setActiveNotification] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(null);

  const dummyNotifications = [
    {
      id: 1,
      title: "New Message Received",
      time: "2 minutes ago",
      description: "John Doe sent you a new message regarding the project deadline.",
      type: "message"
    },
    {
      id: 2,
      title: "Meeting Reminder",
      time: "1 hour ago",
      description: "Team standup meeting starts in 15 minutes. Join via the provided link.",
      type: "reminder"
    },
    {
      id: 3,
      title: "System Update",
      time: "2 hours ago",
      description: "Important system maintenance scheduled for tonight at 2 AM EST.",
      type: "system"
    },
  ];

  const handleAccordionClick = (id) => {
    setActiveNotification(activeNotification === id ? null : id);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative inline-block">
      <button
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        onMouseEnter={handleMouseEnter}
        aria-label="Notifications"
      >
        <div className="relative">
          <IoNotificationsOutline className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {dummyNotifications.length}
          </span>
        </div>
      </button>

      {isHovered && (
        <div
          className="absolute -right-100 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 transform transition-all duration-300 ease-in-out z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="region"
          aria-label="Notifications panel"
        >
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {error ? (
              <div className="p-4 text-red-500 flex items-center justify-center">
                <MdError className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            ) : dummyNotifications.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">
                No new notifications
              </div>
            ) : (
              dummyNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <button
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleAccordionClick(notification.id)}
                    aria-expanded={activeNotification === notification.id}
                    aria-controls={`notification-content-${notification.id}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                      {activeNotification === notification.id ? (
                        <IoMdArrowDropup className="w-5 h-5 text-gray-500" />
                      ) : (
                        <IoMdArrowDropdown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  {activeNotification === notification.id && (
                    <div
                      id={`notification-content-${notification.id}`}
                      className="px-4 py-3 bg-gray-50 text-sm text-gray-600"
                    >
                      {notification.description}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-gray-200">
            <button
              className="w-full text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
              aria-label="Mark all as read"
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
