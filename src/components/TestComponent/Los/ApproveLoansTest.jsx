import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  approveLoan,
  getFullLoanDetails,
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
import convertToTitleCase from "../../../utils/convertToTitleCase";
import FullLoanDetailModal from "./FullLoanDetailModal";
import { CalendarDaysIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    loanProduct: convertToTitleCase(item?.loanProductName),
    loanReleaseDate: convertDate(item?.loanReleaseDate),
  }));
}

const documents = [
  {
    docName: "",
    docId: "",
    verified: false,
    documentKey: "PAY_SLIP",
  },
  {
    docName: "",
    docId: "",
    verified: false,
    documentKey: "EMPLOYER_FROM",
  },
  {
    docName: "",
    docId: "",
    verified: false,
    documentKey: "BANK_STATEMENT",
  },
  {
    docName: "",
    docId: "",
    verified: false,
    documentKey: "ATM_CARD",
  },
];

const ApproveLoansTest = () => {
  const dispatch = useDispatch();
  const { approveLoans, loading, approveLoansTotalElements, fullLoanDetails } =
    useSelector((state) => state.personalLoans);
  const [showModal, setShowModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
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

  const handleFullLoanDetails = async (loanId, uid) => {
    setShowLoanModal(true);
    await dispatch(getFullLoanDetails({ loanId, uid })).unwrap();
  };

  const closeFullLoanDetailModal = () => {
    setShowLoanModal(false);
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
    { label: "Borrower", field: "borrowerName" },
    { label: "Disbursed By", field: "disbursedBy" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="text-sm text-gray-600 border-y-2 py-5 px-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-semibold text-xl mb-3">Borrower Information</div>
          <div className="bg-white p-3 shadow rounded-md">
            <div className="grid grid-cols-2 border-b border-gray-300 pb-3 mb-3">
              <div>
                <div className="text-gray-500">Employment</div>
                <div className="font-semibold">Tech Co Ltd</div>
                <div className="text-gray-500 font-light text-xs">3 years</div>
              </div>
              <div>
                <div className="text-gray-500">Monthly Income</div>
                <div className="font-semibold">$5000</div>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div>
                <div className="text-gray-500">Credit Score</div>
                <div className="font-semibold">720</div>
              </div>
              <div>
                <div className="text-gray-500">Active Loans</div>
                <div className="font-semibold">1</div>
              </div>
              <div>
                <div className="text-gray-500">Payment History</div>
                <div className="font-semibold">No Defaults</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="font-semibold text-xl  mb-3">Loan Information</div>
          <div className="bg-white p-3 shadow rounded-md">
            <div className="grid grid-cols-2 border-b border-gray-300 pb-3 mb-3">
              <div>
                <div className="text-gray-500">Principal Amount</div>
                <div className="font-semibold">${rowData.principalAmount}</div>
              </div>
              <div>
                <div className="text-gray-500">Interest Rate</div>
                <div className="font-semibold">
                  {rowData.loanInterest}% {rowData.interestMethod} per{" "}
                  {rowData.perLoanInterest}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-300 pb-3 mb-3">
              <div>
                <div className="text-gray-500">Tenure</div>
                <div className="font-semibold">
                  {rowData.loanDuration} {rowData.perLoanDuration}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Monthly EMI</div>
                <div className="font-semibold">$ 120</div>
              </div>
              <div>
                <div className="text-gray-500">First Payment</div>
                <div className="font-semibold">Feb 01</div>
              </div>
            </div>
            <div
              className="text-blue-600 font-semibold cursor-pointer flex gap-2"
              onClick={() => handleFullLoanDetails(rowData.loanId, rowData.uid)}
            >
              <CalendarDaysIcon className="-ml-0.5 h-5 w-5" /> View EMI Schedule
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 shadow rounded-md my-5">
        <div className="font-semibold text-xl mb-3">
          Verified Documents{" "}
          <span className="font-light text-xs">
            ({documents.length} documents)
          </span>
        </div>
        <div className="flex gap-10">
          {documents.map((doc) => (
            <div className="flex gap-1.5">
              <CheckCircleIcon className="-ml-0.5 h-5 w-5 text-green-600" />{" "}
              {convertToTitleCase(doc.documentKey)}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-end gap-2 px-5">
        <button
          onClick={() => handleFullLoanDetails(rowData.loanId, rowData.uid)}
          className="flex gap-x-1.5 items-center px-2.5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          <FiInfo className="-ml-0.5 h-5 w-5" />
          View Documents
        </button>
        <button
          onClick={() => handleReject(rowData.transactionId)}
          className="flex gap-x-1.5 items-center px-2.5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <FiXCircle className="-ml-0.5 h-5 w-5" />
          Reject
        </button>
        <button
          onClick={() => handleApprove(rowData.transactionId)}
          className="flex gap-x-1.5 items-center px-2.5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          <FiCheckCircle className="-ml-0.5 h-5 w-5" />
          Approve
        </button>
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
      <FullLoanDetailModal
        isOpen={showLoanModal}
        onClose={closeFullLoanDetailModal}
        loanDetails={fullLoanDetails}
        loading={loading}
      />
    </div>
  );
};

export default ApproveLoansTest;
