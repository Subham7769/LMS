import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Common/Button/Button";
import { IoIosArrowDown } from "react-icons/io";
import { MdInfo, MdOutlineAddTask } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import {
  fetchNotifications,
  updateNotificationStatus,
  updateNotificationRequest,
} from "../../redux/Slices/notificationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import convertToReadableString from "../../utils/convertToReadableString";
import { BellIcon } from "@heroicons/react/24/outline";

const NotificationWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const notificationRef = useRef(null);
  const { notifications, error, loading } = useSelector(
    (state) => state.notification
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const dataInfo = useSelector((state) => state.sidebar.menus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      roleName !== "ROLE_LOAN_OFFICER" &&
      roleName !== "ROLE_CHIEF_EXECUTIVE_OFFICER" &&
      roleName !== "ROLE_MANAGEMENT_CREDIT_COMMITTEE" &&
      roleName !== "ROLE_BOARD"
    ) {
      dispatch(fetchNotifications());
    }
  }, [dispatch]);

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

  const toggleAccordion = (notificationId, notificationStatus) => {
    setExpandedItems((prev) =>
      prev.includes(notificationId)
        ? prev.filter((item) => item !== notificationId)
        : [...prev, notificationId]
    );
    if (notificationStatus === "unread" && roleName !== "ROLE_MAKER_ADMIN") {
      dispatch(updateNotificationStatus(notificationId));
    }
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

    const timeDifferenceMs = currentTimeUtc - (requestedTimeUtc - 10800000);

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
  }

  const handleApproveRequest = (notificationId, requestId) => {
    // Find the matching notification object
    const notification = notifications.find(
      (n) => n.notificationId === notificationId
    );

    // Clone and update the notification object
    let updatedNotification = { ...notification, status: "APPROVED" };

    // Handle updates array if the type is "UPDATE"
    if (updatedNotification.type === "UPDATE" && updatedNotification.updates) {
      updatedNotification.updates = updatedNotification.updates.map((n2) =>
        n2.requestId === requestId
          ? { ...n2, status: "APPROVED" } // Update the status of the matching request
          : n2
      );

      // Check if all the statuses in the updates array are either "APPROVED" or "REJECTED"
      const allCompleted = updatedNotification.updates.every(
        (update) => update.status === "APPROVED" || update.status === "REJECTED"
      );

      // Update the status outside the updates array if all are completed
      if (allCompleted) {
        updatedNotification.status = "COMPLETED";
      } else {
        updatedNotification.status = "CREATED";
      }
    }

    console.log(updatedNotification);
    dispatch(
      updateNotificationRequest({ updatedNotification, decision: "APPROVED" })
    );
  };

  const handleRejectRequest = (notificationId, requestId) => {
    console.log("Notification ID to approve:", notificationId);

    // Find the matching notification object
    const notification = notifications.find(
      (n) => n.notificationId === notificationId
    );

    // Clone and update the notification object
    let updatedNotification = { ...notification, status: "REJECTED" };

    // Handle updates array if the type is "UPDATE"
    if (updatedNotification.type === "UPDATE" && updatedNotification.updates) {
      updatedNotification.updates = updatedNotification.updates.map((n2) =>
        n2.requestId === requestId
          ? { ...n2, status: "REJECTED" } // Update the status of the matching request
          : n2
      );

      // Check if all the statuses in the updates array are either "APPROVED" or "REJECTED"
      const allCompleted = updatedNotification.updates.every(
        (update) => update.status === "APPROVED" || update.status === "REJECTED"
      );

      // Update the status outside the updates array if all are completed
      if (allCompleted) {
        updatedNotification.status = "COMPLETED";
      } else {
        updatedNotification.status = "CREATED";
      }
    }

    console.log(updatedNotification);
    dispatch(
      updateNotificationRequest({ updatedNotification, decision: "REJECTED" })
    );
  };

  // console.log(notifications);

  const extractValue = (numericKey, numericValue) => {
    const dataInfo2 = dataInfo.filter(
      (item) => item?.uniqueKey === numericKey
    )[0]?.submenuItems;

    if (!dataInfo2) {
      return numericValue; // Return null if no submenuItems are found
    }

    const matchingItem = dataInfo2.find((item) =>
      item.href.includes(numericValue)
    );

    return matchingItem ? matchingItem.name : "None";
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 transition-colors duration-200 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle notifications"
        aria-expanded={isOpen}
      >
        <BellIcon className="text-gray-500/80 h-5 w-5" />
        {notifications.length >= 1 && (
          <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute -right-48 lg:-right-20 mt-2 w-[80vw] lg:w-96 max-w-[96vw] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700/60 transition-all duration-200 ease-in-out transform origin-top-right z-50">
          <div className="p-4 py-3 ">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              Notifications
            </h2>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col gap-3 animate-pulse px-5 py-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">
                <p>Oops! Something went wrong. Please try again later.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.notificationId}
                  className="border-b border-gray-200 dark:border-gray-700/60 last:border-b-0"
                >
                  <Link
                    className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                    to="/loan/notifications"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="block text-sm mb-2">
                      📣{" "}
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {notification.type === "UPDATE"
                          ? `Config UPDATE`
                          : notification.type === "NEW"
                          ? `New ${notification.sectionName}`
                          : `New Update`}
                      </span>{" "}
                      {notification.type === "UPDATE" ? (
                        <>
                          You have{" "}
                          {roleName !== "ROLE_MAKER_ADMIN"
                            ? "received"
                            : "sent"}{" "}
                          an approval request for {notification.type} in{" "}
                          <Link to={notification.routingLink}>
                            {notification.subSectionName}
                          </Link>{" "}
                          {notification.sectionName}.
                        </>
                      ) : notification.type === "NEW" ? (
                        <>
                          You have{" "}
                          {roleName !== "ROLE_MAKER_ADMIN"
                            ? "received"
                            : "sent"}{" "}
                          an approval request for newly created{" "}
                          {notification.sectionName}{" "}
                          <Link to={notification.routingLink}>
                            <b>{notification.subSectionName}</b>
                          </Link>
                          .
                        </>
                      ) : (
                        "You have received a new approval request."
                      )}
                    </span>
                    <span className="block text-xs font-medium text-gray-400 dark:text-gray-500">
                      {getTimeDifference(notification.requestedAt)}
                    </span>
                  </Link>
                  {/* <button
                    className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors duration-200"
                    onClick={() =>
                      toggleAccordion(
                        notification.notificationId,
                        notification.notificationStatus
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, notification.notificationId)
                    }
                    aria-expanded={expandedItems.includes(
                      notification.notificationId
                    )}
                    aria-controls={`notification-content-${notification.notificationId}`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {notification.type === "UPDATE" ? (
                        <AiOutlineSetting
                          className="text-orange-500"
                          size={24}
                        />
                      ) : notification.type === "NEW" ? (
                        <MdOutlineAddTask
                          className="text-green-500"
                          size={24}
                        />
                      ) : (
                        <MdInfo className="text-blue-500" size={24} />
                      )}
                    </div>
                    <div className="flex-grow text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          {notification.type === "UPDATE"
                            ? `Config UPDATE`
                            : notification.type === "NEW"
                            ? `New ${notification.sectionName}`
                            : `New Update`}
                        </h3>
                        <span className="flex gap-5">
                          {notification.notificationStatus === "unread" && (
                            <span className="mt-2 h-2 w-2 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"></span>
                          )}
                          <IoIosArrowDown
                            className={`transform transition-transform duration-200 ${
                              expandedItems.includes(
                                notification.notificationId
                              )
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {getTimeDifference(notification.requestedAt)}
                      </p>
                    </div>
                  </button>
                  <div
                    id={`notification-content-${notification.notificationId}`}
                    className={`flex flex-col gap-1 px-4 bg-gray-50 dark:bg-gray-700/60 transition-all duration-200 ${
                      expandedItems.includes(notification.notificationId)
                        ? "max-h-fit opacity-100 py-4"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                    role="region"
                    aria-labelledby={`notification-${notification.notificationId}`}
                  >
                    <p className="text-sm">
                      {notification.type === "UPDATE" ? (
                        <>
                          You have{" "}
                          {roleName !== "ROLE_MAKER_ADMIN"
                            ? "received"
                            : "sent"}{" "}
                          an approval request for {notification.type} in{" "}
                          <Link to={notification.routingLink}>
                            <b>{notification.subSectionName} </b>
                          </Link>{" "}
                          {notification.sectionName}.
                        </>
                      ) : notification.type === "NEW" ? (
                        <>
                          You have{" "}
                          {roleName !== "ROLE_MAKER_ADMIN"
                            ? "received"
                            : "sent"}{" "}
                          an approval request for newly created{" "}
                          {notification.sectionName}{" "}
                          <Link to={notification.routingLink}>
                            <b>{notification.subSectionName}</b>
                          </Link>
                          .
                        </>
                      ) : (
                        "You have received a new approval request."
                      )}
                    </p>
                    {notification.type === "UPDATE" ? (
                      notification.updates.map((item, index) =>
                        item.status === "CREATED" ? (
                          <div
                            className="p-1 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                            id={item.fieldName + index}
                            key={item.requestId}
                          >
                            <p className="text-[14px]">
                              <b>{convertToReadableString(item.fieldName)}</b>
                            </p>
                            <div
                              className={
                                "flex justify-between align-middle text-[12px]"
                              }
                            >
                              <p>
                                <b>Old Value</b>
                                <br />
                                {extractValue(item.fieldName, item.oldValue)}
                              </p>
                              <p>
                                <b>New Value</b>
                                <br />
                                {extractValue(item.fieldName, item.newValue)}
                              </p>
                              {roleName !== "ROLE_MAKER_ADMIN" ? (
                                <div className="flex justify-center align-middle gap-2">
                                  <Button
                                    buttonName="Approve"
                                    buttonType="success"
                                    onClick={() =>
                                      handleApproveRequest(
                                        notification.notificationId,
                                        item.requestId
                                      )
                                    }
                                  />
                                  <Button
                                    buttonName="Reject"
                                    buttonType="destructive"
                                    onClick={() =>
                                      handleRejectRequest(
                                        notification.notificationId,
                                        item.requestId
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      )
                    ) : roleName !== "ROLE_MAKER_ADMIN" ? (
                      <div className="flex justify-evenly align-middle p-1 py-2">
                        <Button
                          buttonName="Approve"
                          buttonType="success"
                          onClick={() =>
                            handleApproveRequest(notification.notificationId)
                          }
                        />
                        <Button
                          buttonName="Reject"
                          buttonType="destructive"
                          onClick={() =>
                            handleRejectRequest(notification.notificationId)
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div> */}
                </div>
              ))
            )}
          </div>

          {/* <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <Link to="/loan/notifications">
              <button className="w-full text-center font-medium text-sm text-violet-500 dark:text-violet-400 transition-colors duration-200 cursor-pointer">
                Notifications History
              </button>
            </Link>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default NotificationWindow;
