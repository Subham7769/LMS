import { useState, useRef, useEffect } from "react";
import { BsBell } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineSetting } from "react-icons/ai";

const NotificationWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const notificationRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "New Email Received",
      time: "2 minutes ago",
      description:
        "You have received a new email from John regarding the project update.",
      icon: <MdOutlineMarkEmailRead className="text-blue-500" size={24} />,
    },
    {
      id: 2,
      title: "Order Confirmed",
      time: "1 hour ago",
      description:
        "Your order #12345 has been confirmed and is being processed.",
      icon: <AiOutlineShoppingCart className="text-green-500" size={24} />,
    },
    {
      id: 3,
      title: "System Update",
      time: "3 hours ago",
      description: "System maintenance will be performed tonight at 2 AM EST.",
      icon: <AiOutlineSetting className="text-orange-500" size={24} />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAccordion = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleAccordion(id);
    }
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        className="p-2 rounded-full hover:bg-background-light-secondary transition-colors duration-200 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle notifications"
        aria-expanded={isOpen}
      >
        <BsBell size={24} className="text-gray-600" />
        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
          3
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ease-in-out transform origin-top-right z-50">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Notifications
            </h2>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <button
                  className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleAccordion(notification.id)}
                  onKeyDown={(e) => handleKeyDown(e, notification.id)}
                  aria-expanded={expandedItems.includes(notification.id)}
                  aria-controls={`notification-content-${notification.id}`}
                >
                  <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                  <div className="flex-grow text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800">
                        {notification.title}
                      </h3>
                      <IoIosArrowDown
                        className={`transform transition-transform duration-200 ${
                          expandedItems.includes(notification.id)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                </button>
                <div
                  id={`notification-content-${notification.id}`}
                  className={`px-4 py-2 bg-gray-50 transition-all duration-200 ${
                    expandedItems.includes(notification.id)
                      ? "max-h-24 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  role="region"
                  aria-labelledby={`notification-${notification.id}`}
                >
                  <p className="text-sm text-gray-600">
                    {notification.description}
                  </p>
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

export default NotificationWindow;
