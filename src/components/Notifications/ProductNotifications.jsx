import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsHistory } from "../../redux/Slices/notificationSlice";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const ProductNotifications = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const { notificationsHistory, error, loading } = useSelector(
    (state) => state.notification // Ensure state structure matches
  );

  const dispatch = useDispatch();
  console.log(notificationsHistory);
  // Fetch notifications history on component load
  useEffect(() => {
    dispatch(fetchNotificationsHistory());
  }, [dispatch]);

  // Handle row expand/collapse
  const handleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Notification History
          </h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto" role="table">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-600 font-semibold">
                  <th className="px-6 py-4"></th>
                  <th className="px-6 py-4">
                    Subsection Name
                  </th>
                  <th className="px-6 py-4">
                    Old Value
                  </th>
                  <th className="px-6 py-4">
                    New Value
                  </th>
                  <th className="px-6 py-4">
                    Maker Name
                  </th>
                  <th className="px-6 py-4">
                    Status
                  </th>
                  <th className="px-6 py-4">
                    Checker Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {notificationsHistory.map((notification) => (
                  <React.Fragment key={`notification-${notification.id}`}>
                    <tr
                      className="hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-800"
                      onClick={() => handleExpand(notification.id)}
                    >
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleExpand(notification.id)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                          aria-expanded={expandedRow === notification.id}
                          aria-label={
                            expandedRow === notification.id
                              ? "Collapse row"
                              : "Expand row"
                          }
                        >
                          {expandedRow === notification.id ? (
                            <FiChevronUp />
                          ) : (
                            <FiChevronDown />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {notification.subSectionName}
                      </td>
                      <td className="px-6 py-4">
                        {/* {notification.oldValue} */}
                      </td>
                      <td className="px-6 py-4">
                        {/* {notification.newValue} */}
                      </td>
                      <td className="px-6 py-4">
                        {notification.makerName}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 inline-flex leading-5 font-semibold rounded-full ${
                            notification.status === "APPROVED"
                              ? "bg-green-100 text-green-800"
                              : notification.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {notification.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {notification.checkerName}
                      </td>
                    </tr>
                    {expandedRow === notification.id && (
                      <tr className="bg-gray-50">
                        <td colSpan="8" className="px-6 py-4">
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="grid grid-cols-2 gap-4 text-[12px]">
                              <div className="flex justify-between">
                                <p className="font-semibold">Checker At:</p>
                                <p>{notification.checkerAt || "N/A"}</p>
                              </div>
                              <div className="flex justify-between">
                                <p className="font-semibold">Rejected Note:</p>
                                <p>{notification.rejectedNote || "N/A"}</p>
                              </div>
                              <div className="flex justify-between">
                                <p className="font-semibold">Type:</p>
                                <p>{notification.type || "N/A"}</p>
                              </div>
                              <div className="flex justify-between">
                                <p className="font-semibold">Requested At:</p>
                                <p>{notification.requestedAt || "N/A"}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNotifications;
