import React, { useEffect, useState } from "react";
import HoverButton from "../../Common/HoverButton/HoverButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { convertDate } from "../../../utils/convertDate";
import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
import Pagination from "../../Common/Pagination/Pagination";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    applicationID: item?.applicationID,
    borrower: item?.borrower,
    createdDate: convertDate(item?.createdDate),
    lastUpdated: convertDate(item?.lastUpdated),
    applicationStatus: item?.applicationStatus,
  }));
}

const LoanApplication = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const navigate = useNavigate();
  const { loanApplications, loading, loanApplicationsTotalElements } =
    useSelector((state) => state.smeLoans);

  const [pageSize, setPageSize] = useState(10);

  const dispatcherFunction = (currentPage, pageSize) => {
    // dispatch(getPendingLoans({ page: currentPage, size: pageSize }));
  };

  const searchOptions = [
    { label: "Borrower Name", value: "borrowerName" },
    { label: "Unique ID", value: "uid" },
  ];

  const columns = [
    { label: "Application ID", field: "applicationID" },
    { label: "Borrower Name", field: "borrower" },
    { label: "Created Date", field: "createdDate" },
    { label: "Last Updated", field: "lastUpdated" },
    { label: "Status", field: "applicationStatus" },
  ];

  const loanApplicationsData = transformData(loanApplications);

  const handleSearch = () => {
    // dispatch(getLoansByField({ field: searchBy, value: searchValue }));
    setSearchBy("");
    setSearchValue("");
  };

  const handleReset = () => {
    setSearchBy("");
    setSearchValue("");
    // dispatch(getPendingLoans({ page: 0, size: 20 }));
  };

  const handleNewApplication = () => {
    // dispatch(addDirector({ loanOfficer }));
    navigate(`/loan/loan-origination-system/sme/loans/add-loan`);
  };

  const handleEditApplication = () => {
    // dispatch(addDirector({ loanOfficer }));
    navigate(`/loan/loan-origination-system/sme/loans/add-loan`);
  };

  const renderActionList = (rowData) => {
    if (rowData.applicationStatus === "Submitted") {
      return <div className="py-6">-</div>;
    }
    return (
      <div className="flex justify-center gap-4 px-5">
        <Button
          onClick={handleEditApplication}
          buttonIcon={PencilIcon}
          circle={true}
          className={`mt-4 h-fit self-center`}
        />
        <Button
          onClick={handleEditApplication}
          buttonIcon={TrashIcon}
          circle={true}
          className={`mt-4 h-fit self-center`}
        />
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-3`}>
      <div className="grid grid-cols-4 gap-5 items-center">
        <div className="text-xl font-semibold">Loan Applications</div>
        <div></div>
        <div></div>
        <div className="flex justify-end gap-2 h-12">
          <HoverButton
            icon={PlusIcon}
            text="New Application"
            onClick={handleNewApplication}
          />
        </div>
      </div>
      <ContainerTile className={`flex justify-between gap-5 align-middle`}>
        <div className="w-[45%]">
          <InputSelect
            labelName="Search By"
            inputName="searchBy"
            inputOptions={searchOptions}
            inputValue={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          />
        </div>
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
        </div>

        <div className="flex align-middle gap-5">
          <Button
            buttonName={"Search"}
            onClick={handleSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
          <Button
            buttonName={"Reset"}
            onClick={handleReset}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
        </div>
      </ContainerTile>
      <ExpandableTable
        columns={columns}
        data={loanApplicationsData}
        loading={loading}
        ListAction={renderActionList}
      />
      <Pagination
        totalElements={loanApplicationsTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
    </div>
  );
};

export default LoanApplication;
