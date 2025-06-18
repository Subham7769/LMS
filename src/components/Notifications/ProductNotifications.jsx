import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationsHistory,
  updateNotificationRequest,
} from "../../redux/Slices/notificationSlice";
import InputSelect from "../Common/InputSelect/InputSelect";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import DropdownFilter from "../Common/DropdownFilter/DropdownFilter";
import DatePickerWithRange from "../Common/DatePickerWithRange/DatePickerWithRange"; // uses Calendar inside
import { convertDate } from "../../utils/convertDate";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";
import convertToReadableString from "../../utils/convertToReadableString";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    fieldName: item?.fieldName ? convertToReadableString(item?.fieldName) : "-",
  }));
}

const dateOptions = [
  { label: "Last 7 Days", value: 7 },
  { label: "Last 30 Days", value: 30 },
  { label: "Last 2 Months", value: 60 },
  { label: "Last 6 Months", value: 180 },
  { label: "Last 12 Months", value: 365 },
];

const ProductNotifications = () => {
  const today = new Date();
  const [days, setDays] = useState(365);
  const [toDate, setToDate] = useState(today);
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 365);
    return d;
  });
  const [range, setRange] = useState({ from: fromDate, to: toDate });
  const { notificationsHistory, error, loading } = useSelector(
    (state) => state.notification // Ensure state structure matches
  );
  const [notificationsHistoryFiltered, setNotificationsHistoryFiltered] =
    useState(notificationsHistory);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const dispatch = useDispatch();
  const filterOptions = [
    {
      label: "ALL",
      value: "ALL",
    },
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
    if (statusFilter === "ALL") {
      setNotificationsHistoryFiltered(notificationsHistory);
    } else {
      setNotificationsHistoryFiltered(
        notificationsHistory.filter(
          (notification) => notification.status === statusFilter
        )
      );
    }
  }, [statusFilter, notificationsHistory]);

  // Handle row expand/collapse

  const handleDropdownSelect = (value) => {
    setDays(Number(value));
  };

  const handleDateRangeChange = (selectedRange) => {
    if (selectedRange?.from && selectedRange?.to) {
      setFromDate(selectedRange.from);
      setToDate(selectedRange.to);
      setRange(selectedRange);
    }
  };

  const notificationsHistoryData = transformData(notificationsHistoryFiltered);

  const handleApproveRequest = (rowData) => {
    // Clone and update the notification object
    let updatedNotification = {
      ...rowData,
      status: "APPROVED",
      productId: rowData.parentId,
    };
    dispatch(
      updateNotificationRequest({ updatedNotification, decision: "APPROVED" })
    );
  };

  const handleRejectRequest = (rowData) => {
    // Clone and update the notification object
    let updatedNotification = {
      ...rowData,
      status: "REJECTED",
      productId: rowData.parentId,
    };
    dispatch(
      updateNotificationRequest({ updatedNotification, decision: "REJECTED" })
    );
  };

  const columns = [
    { label: "Product Name", field: "subSectionName" },
    { label: "Field Name", field: "fieldName" },
    { label: "Type", field: "type" },
    { label: "Old Value", field: "oldValue" },
    { label: "New Value", field: "newValue" },
    { label: "Principal Amount", field: "principalAmount" },
    { label: "Status", field: "status" },
  ];

  const renderExpandedRow = (rowData) => {
    return (
      <>
        <div className="grid grid-cols-4 gap-4 text-[12px]">
          <div className="flex justify-between flex-col">
            <p className="font-semibold">Maker Name:</p>
            <p>{rowData.makerName || "N/A"}</p>
          </div>
          <div className="flex justify-between flex-col">
            <p className="font-semibold">Checker Name:</p>
            <p>{rowData.checkerName || "N/A"}</p>
          </div>
          <div className="flex justify-between flex-col">
            <p className="font-semibold">Checker At:</p>
            <p>{rowData.checkerAt || "N/A"}</p>
          </div>
          <div className="flex justify-between flex-col">
            <p className="font-semibold">Rejected Note:</p>
            <p>{rowData.rejectedNote || "N/A"}</p>
          </div>
          <div className="flex justify-between flex-col">
            <p className="font-semibold">Requested At:</p>
            <p>{convertDate(rowData.requestedAt) || "N/A"}</p>
          </div>
          <div className="flex justify-between flex-col">
            <p className="font-semibold">Type:</p>
            <p>{rowData.type || "N/A"}</p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-2 px-5">
          {rowData?.status === "CREATED" && (
            <>
              <Button
                buttonName={"Reject"}
                onClick={() => handleRejectRequest(rowData)}
                buttonIcon={FiXCircle}
                buttonType="destructive"
              />
              <Button
                buttonName={"Approve"}
                onClick={() => handleApproveRequest(rowData)}
                buttonIcon={FiCheckCircle}
                buttonType="success"
              />
            </>
          )}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mb-4">
        <div className="flex flex-row sm:flex-row gap-3 w-full sm:w-auto justify-start sm:justify-end">
          <DropdownFilter
            options={filterOptions}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
          />
          <DatePickerWithRange
            className="w-full sm:w-auto"
            range={range}
            setRange={handleDateRangeChange}
          />
        </div>
      </div>
      <ContainerTile loading={loading} error={error}>
        <ExpandableTable
          columns={columns}
          data={notificationsHistoryData}
          renderExpandedRow={renderExpandedRow}
          loading={loading}
          ListName="List of notifications"
          ListNameLength={notificationsHistoryFiltered.length}
        />
      </ContainerTile>
    </>
  );
};

export default ProductNotifications;
