import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsHistory } from "../../redux/Slices/notificationSlice";
import InputSelect from "../Common/InputSelect/InputSelect";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { convertDate } from "../../utils/convertDate";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";
import convertToReadableString from "../../utils/convertToReadableString";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    fieldName: item?.fieldName ? convertToReadableString(item?.fieldName) : "-",
  }));
}


const ProductNotifications = () => {
  const { notificationsHistory, error, loading } = useSelector(
    (state) => state.notification // Ensure state structure matches
  );
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

  const notificationsHistoryData = transformData(notificationsHistoryFiltered);

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
    );
  };
  return (
    <>
      <div className="flex justify-end mb-3">
        <div className="w-52 xl:w-xs">
          <InputSelect
            labelName="Status"
            inputOptions={filterOptions}
            inputName="StatusFilter"
            inputValue={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>
      <ContainerTile loading={loading} error={error}>
        <ExpandableTable
          columns={columns}
          data={notificationsHistoryData}
          renderExpandedRow={renderExpandedRow}
          loading={loading}
          ListName="List of product notifications"
          ListNameLength={notificationsHistoryFiltered.length}
        />
      </ContainerTile>
    </>
  );
};

export default ProductNotifications;
