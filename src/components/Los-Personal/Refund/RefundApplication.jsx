import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  TrashIcon,
  PencilIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/20/solid";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { convertDate } from "../../../utils/convertDate";
import Pagination from "../../Common/Pagination/Pagination";
import {
  generateRefundApplicationId,
  getRefundApplications,
  getRefundApplicationsByID,
  cancelRefundApplicationsByID,
  cloneRefundApplicationsByID,
  getRefundApplicationByField,
  resetRefundData,
  updateRefundField,
  getOpenLoans,
} from "../../../redux/Slices/personalRefundSlice";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { hasViewOnlyAccessGroup3 } from "../../../utils/roleUtils";
import store from "../../../redux/store";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import { AddIcon, DeleteIcon, EditIcon } from "../../../assets/icons";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    refundApplicationId: item?.refundApplicationId,
    uniqueID: item?.refundDetails?.uniqueID,
    borrowerId: item?.refundDetails?.borrowerId,
    borrowerName: item?.refundDetails?.borrowerName,
    creationDate: convertDate(item?.creationDate),
    lastUpdate: item?.lastUpdate ? convertDate(item?.lastUpdate) : " - ",
    status: convertToTitleCase(item?.status),
    refundAmount: item?.refundDetails?.refundAmount,
  }));
}

const RefundApplication = () => {
  const dispatch = useDispatch();
  const [plaSearchValue, setPlaSearchValue] = useState("");
  const [plaSearchBy, setPlaSearchBy] = useState("");
  const navigate = useNavigate();
  const {
    refundApplications,
    refundApplicationsTotalElements,
    openLoans,
    loading,
  } = useSelector((state) => state.personalRefund);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getOpenLoans());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(getRefundApplications({ page: currentPage, size: pageSize }));
  };

  const searchOptions = [
    { label: "Refund Application ID", value: "refundApplicationId" },
    { label: "Unique ID", value: "uniqueID" },
  ];

  const columns = [
    { label: "Refund App. ID", field: "refundApplicationId" },
    { label: "Borrower Name", field: "borrowerName" },
    { label: "Unique ID", field: "uniqueID" },
    { label: "Refund Amount", field: "refundAmount" },
    { label: "Created Date", field: "creationDate" },
    { label: "Last Updated", field: "lastUpdate" },
    { label: "Status", field: "status" },
  ];

  const refundApplicationsData = transformData(refundApplications);

  const handleSearch = async () => {
    await dispatch(
      validateForm({ plaSearchBy: plaSearchBy, plaSearchValue: plaSearchValue })
    );
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        getRefundApplicationByField({
          field: plaSearchBy,
          value: plaSearchValue,
        })
      );
    }
    // setPlaSearchBy("");
    // setPlaSearchValue("");
  };

  const handleReset = () => {
    setPlaSearchBy("");
    setPlaSearchValue("");
    setCurrentPage(0);
    dispatch(getRefundApplications({ page: 0, size: 10 }));
  };

  const handleNewApplication = async () => {
    dispatch(resetRefundData());
    try {
      const refundApplicationId = await dispatch(
        generateRefundApplicationId()
      ).unwrap();
      navigate(
        `/loan/loan-origination-system/personal/refund/add-refund/new/${refundApplicationId}`
      );
    } catch (error) {
      console.error("Failed to generate loan application ID:", error);
    }
  };

  const handleEditApplication = async (rowData) => {
    navigate(
      `/loan/loan-origination-system/personal/refund/add-refund/${rowData?.refundApplicationId}`
    );
    await dispatch(
      getRefundApplicationsByID(rowData?.refundApplicationId)
    ).unwrap();
  };

  const handleRejectApplication = async (refundApplicationId) => {
    await dispatch(cancelRefundApplicationsByID(refundApplicationId)).unwrap();
    dispatch(getRefundApplications({ page: 0, size: 20 }));
  };

  const renderActionList = (rowData) => {
    if (rowData.status === "Approved" || hasViewOnlyAccessGroup3(roleName)) {
      return <div className="flex gap-4 px-5">-</div>;
    }
    return (
      <div className="flex gap-4 ">
        {rowData.status !== "Submitted" && (
          <Button
            onClick={() => handleEditApplication(rowData)}
            buttonIcon={EditIcon}
            className={``}
            buttonType="secondary"
          />
        )}
        {rowData.status !== "Rejected" && (
          <Button
            onClick={() => handleRejectApplication(rowData.refundApplicationId)}
            buttonIcon={DeleteIcon}
            className={``}
            buttonType="destructive"
          />
        )}
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-3`}>
      <div className="grid grid-cols-2 gap-5 items-center">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          Refund Applications
        </h1>
        <div className="flex justify-end gap-2 h-12">
          {!hasViewOnlyAccessGroup3(roleName) && (
            <Button
              buttonIcon={AddIcon}
              buttonName="New Application"
              onClick={handleNewApplication}
              disabled={openLoans.length < 1}
            />
          )}
        </div>
      </div>
      <ContainerTile
        className={`p-5 md:flex justify-between gap-5 align-middle`}
      >
        <div className="w-full md:w-[45%] mb-2">
          <InputSelect
            labelName="Search By"
            inputName="SearchBy"
            inputOptions={searchOptions}
            inputValue={plaSearchBy}
            onChange={(e) => setPlaSearchBy(e.target.value)}
            disabled={false}
            isValidation={true}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="plaSearchValue"
            inputValue={plaSearchValue}
            onChange={(e) => setPlaSearchValue(e.target.value)}
            isValidation={true}
            disabled={false}
          />
        </div>

        <div className="flex align-middle gap-5 justify-end">
          <Button
            buttonName={"Search"}
            onClick={handleSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
            buttonType="secondary"
          />
          <Button
            buttonName={"Reset"}
            onClick={handleReset}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
            buttonType="tertiary"
          />
        </div>
      </ContainerTile>
      <ExpandableTable
        columns={columns}
        data={refundApplicationsData}
        loading={loading}
        ListAction={renderActionList}
        ListName="List of draft refund applications"
        ListNameLength={refundApplicationsTotalElements}
      />
      <Pagination
        totalElements={refundApplicationsTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default RefundApplication;
