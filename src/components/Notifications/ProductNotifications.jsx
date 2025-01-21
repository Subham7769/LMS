import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsHistory } from "../../redux/Slices/notificationSlice";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import InputSelect from "../Common/InputSelect/InputSelect";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { convertDate } from "../../utils/convertDate";
const ProductNotifications = () => {
  const { notificationsHistory, error, loading } = useSelector(
    (state) => state.notification // Ensure state structure matches
  );
  const [expandedRow, setExpandedRow] = useState(null);
  const [notificationsHistoryFiltered, setNotificationsHistoryFiltered] =
    useState(notificationsHistory);
  const [statusFilter, setStatusFilter] = useState("APPROVED");
  const dispatch = useDispatch();
  const filterOptions = [
    {
      label: "APPROVED",
      value: "APPROVED",
    },
    {
      label: "REJECTED",
      value: "REJECTED",
    },
  ];

  console.log(notificationsHistory);

  // Fetch notifications history on component load
  useEffect(() => {
    dispatch(fetchNotificationsHistory());
  }, [dispatch]);

  useEffect(() => {
    setNotificationsHistoryFiltered(
      notificationsHistory.filter(
        (notification) => notification.status === statusFilter
      )
    );
  }, [statusFilter, notificationsHistory]);

  // Handle row expand/collapse
  const handleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <ContainerTile
      className="mx-auto space-y-8"
      loading={loading}
      error={error}
    >
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between align-middle mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mt-3">
            Notification History
          </h2>
          <div className="flex gap-5 w-1/8">
            <span className="mt-6">
              {notificationsHistoryFiltered.length + 1 + " results"}
            </span>
            <InputSelect
              labelName="Status"
              inputOptions={filterOptions}
              inputName="StatusFilter"
              inputValue={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto" role="table">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-600 font-semibold">
                <th className="px-6 py-4"></th>
                <th className="py-6 text-left">Product Name</th>
                <th className="px-6 py-4">Field Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Old Value</th>
                <th className="px-6 py-4">New Value</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {notificationsHistoryFiltered.map((notification) => (
                <React.Fragment key={`notification-${notification.id}`}>
                  <tr
                    className={`hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-800 text-center `}
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
                    <td className="py-4 text-left">
                      {notification.subSectionName || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {notification.fieldName || "N/A"}
                    </td>
                    <td className="px-6 py-4">{notification.type || "N/A"}</td>
                    <td className="px-6 py-4">
                      {notification?.oldValue || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {notification?.newValue || "N/A"}
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
                  </tr>
                  {expandedRow === notification.id && (
                    <tr className={`bg-gray-50 ${expandedRow && "border-2"}`}>
                      <td
                        colSpan="8"
                        className="px-6 py-4 pl-16 text-sm text-gray-600"
                      >
                        <div className="grid grid-cols-4 gap-4 text-[12px]">
                          <div className="flex justify-between flex-col">
                            <p className="font-semibold">Maker Name:</p>
                            <p>{notification.makerName || "N/A"}</p>
                          </div>
                          <div className="flex justify-between flex-col">
                            <p className="font-semibold">Checker Name:</p>
                            <p>{notification.checkerName || "N/A"}</p>
                          </div>
                          <div className="flex justify-between flex-col">
                            <p className="font-semibold">Checker At:</p>
                            <p>{notification.checkerAt || "N/A"}</p>
                          </div>
                          <div className="flex justify-between flex-col">
                            <p className="font-semibold">Rejected Note:</p>
                            <p>{notification.rejectedNote || "N/A"}</p>
                          </div>
                          <div className="flex justify-between flex-col">
                            <p className="font-semibold">Requested At:</p>
                            <p>
                              {convertDate(notification.requestedAt) || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between flex-col">
                            <p className="font-semibold">Type:</p>
                            <p>{notification.type || "N/A"}</p>
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
    </ContainerTile>
  );
};

export default ProductNotifications;
