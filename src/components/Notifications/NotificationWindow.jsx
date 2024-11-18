import React, { useState, useRef, useEffect, } from "react";
import { Link } from "react-router-dom";
import Button from "../Common/Button/Button";
import { IoIosArrowDown } from "react-icons/io";
import { MdInfo, MdOutlineAddTask } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { fetchNotifications } from "../../redux/Slices/notificationSlice"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";



const NotificationWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const notificationRef = useRef(null);
  const { notifications, error, loading } = useSelector((state) => state.notification)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch]);

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

  function getTimeDifference(requestedAt) {
    const currentTime = new Date(); // Current time in local timezone
    const requestedTime = new Date(requestedAt); // Requested time in UTC

    if (isNaN(requestedTime.getTime())) {
      return "Invalid date format.";
    }

    // Convert both times to UTC for comparison
    const currentTimeUtc = currentTime.getTime(); // Time in milliseconds (UTC)
    const requestedTimeUtc = requestedTime.getTime(); // Time in milliseconds (UTC)

    const timeDifferenceMs = currentTimeUtc - requestedTimeUtc;

    if (timeDifferenceMs < 0) {
      return "Requested time is in the future.";
    }

    const minutes = Math.floor(timeDifferenceMs / (1000 * 60));
    const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
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
            {loading ? (
              <div className="flex flex-col gap-3 animate-pulse px-5 py-3">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">
                <p>Oops! Something went wrong. Please try again later.</p>
              </div>
            ) :
              notifications.map((notification) => (
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
                        notification.type === "UPDATE" ? <AiOutlineSetting className="text-orange-500" size={24} /> :
                          notification.type === "NEW" ? <MdOutlineAddTask className="text-green-500" size={24} /> :
                            <MdInfo className="text-blue-500" size={24} />
                      }
                    </div>
                    <div className="flex-grow text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">
                          {notification.type === "UPDATE" ? `Config UPDATE` : notification.type === "NEW" ? `New ${notification.sectionName}` : `New Update`}
                        </h3>
                        <span className="flex gap-5">
                          {notification.notificationStatus === "unread" && <span className="mt-2 h-2 w-2 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"></span>}
                          <IoIosArrowDown
                            className={`transform transition-transform duration-200 ${expandedItems.includes(notification.notificationId) ? "rotate-180" : ""
                              }`}
                          />
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{getTimeDifference(notification.requestedAt)}</p>
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
                      {notification.type === "UPDATE" ? (
                        <>
                          You have received an approval request for {notification.type} in <Link to={notification.routingLink}><b >{notification.subSectionName} </b></Link> {notification.sectionName}.
                        </>
                      ) : notification.type === "NEW" ? (
                        <>
                          You have received an approval request for newly created {notification.sectionName}{" "}
                          <Link to={notification.routingLink}><b>{notification.subSectionName}</b></Link>.
                        </>
                      ) : (
                        "You have received a new approval request."
                      )}
                    </p>
                    {notification.type === "UPDATE" ? (
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
              ))
            }
          </div>

          <div className="p-3 border-t border-gray-200">
            <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>)
}



export default NotificationWindow;