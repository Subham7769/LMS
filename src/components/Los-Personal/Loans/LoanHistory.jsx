import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector, useDispatch } from "react-redux";
import {
  getFullLoanDetails,
  getLoanHistory,
  getLoanHistoryByField,
} from "../../../redux/Slices/personalLoansSlice";
import Button from "../../Common/Button/Button";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import Pagination from "../../Common/Pagination/Pagination";
import FullLoanDetailModal from "./FullLoanDetailModal";
import { convertDate } from "../../../utils/convertDate";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    loanProduct: item?.loanProductName?.replace(/_/g, " "),
    loanReleaseDate: convertDate(item?.loanReleaseDate),
  }));
}

const LoanHistory = () => {
  const dispatch = useDispatch();
  const { loanHistory, loading, loanHistoryTotalElements, fullLoanDetails } =
    useSelector((state) => state.personalLoans);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");

  // Pagination state
  const [pageSize, setPageSize] = useState(10);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(getLoanHistory({ page: currentPage, size: pageSize }));
  };

  const loanHistoryData = transformData(loanHistory);

  const handleSearch = () => {
    dispatch(getLoanHistoryByField({ field: searchBy, value: searchValue }));
    setSearchBy("");
    setSearchValue("");
  };

  const handleReset = () => {
    setSearchBy("");
    setSearchValue("");
    dispatch(getLoanHistory({ page: 0, size: pageSize }));
  };

  const handleFullLoanDetails = async (loanId, uid) => {
    await dispatch(getFullLoanDetails({ loanId, uid })).unwrap();
    if (!loading) {
      setShowModal(true);
    }
  };

  const closeFullLoanDetailModal = () => {
    setShowModal(false);
  };

  const searchOptions = [
    { label: "Borrower Name", value: "borrowerName" },
    { label: "Unique ID", value: "uid" },
  ];

  const columns = [
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrowerName" },
    { label: "Disbursed By", field: "disbursedBy" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
    // { label: "Status", field: "applicationStatus" },
    { label: "Loan Status", field: "loanStatus" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-4">
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            Interest Method:
          </p>
          <p className="text-sm text-gray-600">{rowData.interestMethod}</p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">Loan Interest :</p>
          <p className="text-sm text-gray-600">
            {rowData.loanInterest}% / {rowData.perLoanInterest}
          </p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            Repayment Cycle:
          </p>
          <p className="text-sm text-gray-600">{rowData.repaymentCycle}</p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            Number of Tenure:
          </p>
          <p className="text-sm text-gray-600">{rowData.numberOfTenure}</p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">Loan Duration:</p>
          <p className="text-sm text-gray-600">
            {rowData.loanDuration} {rowData.perLoanDuration}
          </p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            {rowData.rejectionReason ? "Rejection Reason" : ""}
          </p>
          <p className="text-sm text-gray-600">{rowData?.rejectionReason}</p>
        </div>
      </div>
      <div className="text-right">
        <Button
          buttonName={"More Details"}
          onClick={() => handleFullLoanDetails(rowData.loanId, rowData.uid)}
          rectangle={true}
        />
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col gap-3`}>
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
        data={loanHistoryData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
      />
      <Pagination
        totalElements={loanHistoryTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
      <FullLoanDetailModal
        isOpen={showModal}
        onClose={closeFullLoanDetailModal}
        loanDetails={fullLoanDetails}
      />
    </div>
  );
};

export default LoanHistory;
