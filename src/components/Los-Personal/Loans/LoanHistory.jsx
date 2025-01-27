import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector, useDispatch } from "react-redux";
import {
  getFullLoanDetails,
  getLoanHistory,
  getLoanHistoryByField,
  getLoanAgreement,
} from "../../../redux/Slices/personalLoansSlice";
import Button from "../../Common/Button/Button";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import Pagination from "../../Common/Pagination/Pagination";
import FullLoanDetailModal from "./FullLoanDetailModal";
import { convertDate } from "../../../utils/convertDate";
import { useNavigate, useParams } from "react-router-dom";
import CardInfo from "../../Common/CardInfo/CardInfo";
import ViewDocumentsModal from "./ViewDocumentsModal";
import { CalendarDaysIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    loanProduct: item?.loanProductName?.replace(/_/g, " "),
    loanReleaseDate: convertDate(item?.loanReleaseDate),
  }));
}

const LoanHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loanHistory, loading, loanHistoryTotalElements, fullLoanDetails } =
    useSelector((state) => state.personalLoans);
  const [showModal, setShowModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);
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
    setShowModal(true);
    await dispatch(getFullLoanDetails({ loanId, uid })).unwrap();
  };

  const closeFullLoanDetailModal = () => {
    setShowModal(false);
  };

  const handleViewDocuments = (verifiedDocuments) => {
    setDocumentsData(verifiedDocuments);
    setDocumentsLoanModal(true);
  };

  const closeViewDocumentModal = () => {
    setDocumentsLoanModal(false);
  };

  const handleLoanAgreement = async (loanId, uid) => {
    navigate(
      `/loan/loan-origination-system/personal/loans/loan-agreement/${loanId}/${uid}`
    );
    await dispatch(getLoanAgreement({ loanId, uid })).unwrap();
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
    <div className="text-sm text-gray-600 border-y-2 py-5 px-2">
      <div className="grid grid-cols-2 gap-4">
        <CardInfo cardTitle="Borrower Information" className={"bg-white"}>
          <div className="grid grid-cols-2 border-b border-gray-300 pb-3 mb-3">
            <div>
              <div className="text-gray-500">Employment</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.employerName}
              </div>
              <div className="text-gray-500 font-light text-xs">
                {rowData?.borrowerDetails?.employmentDuration}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Monthly Income</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.monthlyIncome}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div>
              <div className="text-gray-500">Credit Score</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.creditScore}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Active Loans</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.activeLoans}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Payment History</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.paymentHistory}
              </div>
            </div>
          </div>
        </CardInfo>
        <CardInfo cardTitle="Loan Information" className={"bg-white"}>
          <div className="grid grid-cols-2 border-b border-gray-300 pb-3 mb-3">
            <div>
              <div className="text-gray-500">Principal Amount</div>
              <div className="font-semibold">{rowData.principalAmount}</div>
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
              <div className="font-semibold">{rowData.monthlyEMI}</div>
            </div>
            <div>
              <div className="text-gray-500">First Payment</div>
              <div className="font-semibold">
                {convertDate(rowData.firstEmiPayment)}
              </div>
            </div>
          </div>
          <div
            className="text-blue-600 font-semibold cursor-pointer flex gap-2"
            onClick={() => handleFullLoanDetails(rowData.loanId, rowData.uid)}
          >
            <CalendarDaysIcon className="-ml-0.5 h-5 w-5" /> View EMI Schedule
          </div>
        </CardInfo>
      </div>
      <div className="bg-white p-3 shadow rounded-md my-5">
        <div className="font-semibold text-xl mb-3">
          Verified Documents{" "}
          <span className="font-light text-xs">
            ({rowData?.verifiedDocuments?.length} documents)
          </span>
        </div>
        <div className="flex gap-10">
          {rowData?.verifiedDocuments
            ?.filter((doc) => doc.verified) // Filter only verified documents
            .map((doc) => (
              <div className="flex gap-1.5" key={doc.docId}>
                <CheckCircleIcon className="-ml-0.5 h-5 w-5 text-green-600" />{" "}
                {convertToTitleCase(doc.documentKey)}
              </div>
            ))}
        </div>
      </div>
      <div className="w-full flex justify-end gap-2 px-5">
        <button
          onClick={() => handleLoanAgreement(rowData.loanId, rowData.uid)}
          className="px-2.5 py-2 bg-white shadow-md text-blue-600 rounded-md hover:shadow transition-colors border border-gray-300"
        >
          View Loan Agreement
        </button>
        <button
          onClick={() => handleViewDocuments(rowData.verifiedDocuments)}
          className="flex gap-x-1.5 items-center px-2.5 py-2 bg-white shadow-md text-blue-600 rounded-md hover:shadow transition-colors border border-gray-300"
        >
          <FiInfo className="-ml-0.5 h-5 w-5" />
          View Documents
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
        loading={loading}
      />
      <ViewDocumentsModal
        isOpen={showDocumentsModal}
        onClose={closeViewDocumentModal}
        documents={documentsData}
      />
    </div>
  );
};

export default LoanHistory;
