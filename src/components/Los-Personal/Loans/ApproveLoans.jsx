import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  approveLoan,
  getLoansByField,
  getPendingLoans,
} from "../../../redux/Slices/personalLoansSlice";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import { useNavigate } from "react-router-dom";
import LoanRejectModal from "./LoanRejectModal";
import Pagination from "../../Common/Pagination/Pagination";
import { convertDate } from "../../../utils/convertDate";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    loanProduct: item?.loanProductName?.replace(/_/g, " "),
    borrower: item?.borrowerName,
    disbursedBy: item?.disbursedBy,
    principalAmount: item?.principalAmount,
    loanReleaseDate: convertDate(item?.loanReleaseDate),
    interestMethod: item?.interestMethod,
    loanInterest: item?.loanInterest,
    interestPer: item?.perLoanInterest,
    loanDuration: item?.loanDuration,
    durationPer: item?.perLoanDuration,
    repaymentCycle: item?.repaymentCycle,
    numberOfTenure: item?.numberOfTenure,
    loanId: item?.loanId,
    uid: item?.uid,
    // loanFiles: item.loanFiles,
  }));
}

const ApproveLoans = () => {
  const dispatch = useDispatch();
  const { approveLoans, loading, approveLoansTotalElements } = useSelector(
    (state) => state.personalLoans
  );
  const [showModal, setShowModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const navigate = useNavigate();

  // Pagination state

  const [pageSize, setPageSize] = useState(10);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(getPendingLoans({ page: currentPage, size: pageSize }));
  };

  const approveLoansData = transformData(approveLoans);

  const handleSearch = () => {
    dispatch(getLoansByField({ field: searchBy, value: searchValue }));
    setSearchBy("");
    setSearchValue("");
  };

  const handleReset = () => {
    setSearchBy("");
    setSearchValue("");
    dispatch(getPendingLoans({ page: 0, size: 20 }));
  };

  const handleApprove = async (rowData) => {
    const approveLoanPayload = {
      amount: rowData.principalAmount,
      applicationStatus: "APPROVED",
      loanId: rowData.loanId,
      uid: rowData.uid,
    };
    await dispatch(approveLoan(approveLoanPayload)).unwrap();
    await dispatch(getPendingLoans({ page: 0, size: 20 })).unwrap();
    navigate(`/loan/loan-origination-system/personal/loans/loan-history`);
  };

  const handleReject = async (rowData) => {
    setCurrentRowData(rowData);
    setShowModal(true); // Show modal
  };

  const closeRejectModal = () => {
    setShowModal(false);
  };

  const searchOptions = [
    { label: "Borrower Name", value: "borrowerName" },
    { label: "Unique ID", value: "uid" },
  ];

  const columns = [
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrower" },
    { label: "Disbursed By", field: "disbursedBy" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
  ];
  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-3 md:grid-cols-[80%_20%] gap-4">
        <div className="space-y-2">
          <div className="grid grid-cols-3">
            <div className="flex justify-between border-r border-gray-300 py-2 px-4">
              <p className="text-sm font-semibold text-gray-600">
                Interest Method:
              </p>
              <p className="text-sm text-gray-600">{rowData.interestMethod}</p>
            </div>
            <div className="flex justify-between border-r border-gray-300 py-2 px-4">
              <p className="text-sm font-semibold text-gray-600">
                Loan Interest %:
              </p>
              <p className="text-sm text-gray-600">{rowData.loanInterest}</p>
            </div>
            <div className="flex justify-between border-r border-gray-300 py-2 px-4">
              <p className="text-sm font-semibold text-gray-600">
                Per (Loan Interest):
              </p>
              <p className="text-sm text-gray-600">{rowData.interestPer}</p>
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
              <p className="text-sm font-semibold text-gray-600">
                Loan Duration:
              </p>
              <p className="text-sm text-gray-600">{rowData.loanDuration}</p>
            </div>
            <div className="flex justify-between border-r border-gray-300 py-2 px-4">
              <p className="text-sm font-semibold text-gray-600">
                Per (Loan Duration):
              </p>
              <p className="text-sm text-gray-600">{rowData.durationPer}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start  flex-col gap-4 px-5">
          <button
            onClick={() => handleApprove(rowData)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={rowData.approvalStatus === "Yes"}
          >
            <FiCheckCircle className="mr-2" />
            Approve
          </button>
          <button
            onClick={() => handleReject(rowData)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            disabled={rowData.approvalStatus === "No"}
          >
            <FiXCircle className="mr-2" />
            Reject
          </button>
          {/* <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => window.alert("PDF viewer would open here")}
          >
            <FiDownload className="mr-2" />
            View PDF
          </button> */}
        </div>
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
        data={approveLoansData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
      />
      <Pagination
        totalElements={approveLoansTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
      <LoanRejectModal
        isOpen={showModal}
        onClose={closeRejectModal}
        userDetails={currentRowData}
      />
    </div>
  );
};

export default ApproveLoans;
