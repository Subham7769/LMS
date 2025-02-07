import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  approveLoan,
  getFullLoanDetails,
  getLoanAgreement,
  getLoansByField,
  getPendingLoans,
} from "../../../redux/Slices/smeLoansSlice";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import { useNavigate } from "react-router-dom";
import LoanRejectModal from "./LoanRejectModal";
import Pagination from "../../Common/Pagination/Pagination";
import { convertDate } from "../../../utils/convertDate";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import FullLoanDetailModal from "../../Los-Personal/FullLoanDetailModal";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import CardInfo from "../../Common/CardInfo/CardInfo";
import calculateAging from "../../../utils/calculateAging";
import ViewDocumentsModal from "./ViewDocumentsModal";
import convertToReadableString from "../../../utils/convertToReadableString";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    loanProduct: convertToTitleCase(item?.loanProductName),
    loanReleaseDate: convertDate(item?.loanReleaseDate),
    aging: calculateAging(item?.loanCreationDate),
  }));
}

const ApproveLoans = () => {
  const dispatch = useDispatch();
  const { approveLoans, loading, approveLoansTotalElements, fullLoanDetails } =
    useSelector((state) => state.smeLoans);
  const { userData } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const navigate = useNavigate();

  // Pagination state

  const [pageSize, setPageSize] = useState(10);
  const roleNames = userData.roles.map((role) => role.name); // Extract role names
  const roleName = userData?.roles[0]?.name;

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(
      getPendingLoans({
        page: currentPage,
        size: pageSize,
        getPayload: { roleNames: roleNames },
      })
    );
  };

  const approveLoansData = transformData(approveLoans);

  const handleSearch = () => {
    dispatch(
      getLoansByField({
        field: searchBy,
        value: searchValue,
        getPayload: { roleNames: roleNames },
      })
    );
    setSearchBy("");
    setSearchValue("");
  };

  const handleReset = () => {
    setSearchBy("");
    setSearchValue("");
    dispatch(
      getPendingLoans({
        page: 0,
        size: 20,
        getPayload: { roleNames: roleNames },
      })
    );
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
      applicationStatus: rowData?.rolePermissions?.finalApprove
        ? "APPROVED"
        : "RECOMMENDED",
      loanId: rowData.loanId,
      uid: rowData.uid,
      username: userData.username,
      roleName: roleNames,
    };

    await dispatch(approveLoan(approveLoanPayload)).unwrap();
    await dispatch(
      getPendingLoans({
        page: 0,
        size: 20,
        getPayload: { roleNames: roleNames },
      })
    ).unwrap();
    navigate(`/loan/loan-origination-system/sme/loans/loan-history`);
  };

  const handleReject = async (rowData) => {
    setCurrentRowData(rowData);
    setShowModal(true); // Show modal
  };

  const closeRejectModal = () => {
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
      `/loan/loan-origination-system/sme/loans/loan-agreement/${loanId}/${uid}`
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
    { label: "Borrower ID", field: "uid" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
    { label: "Aging", field: "aging" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="text-sm text-gray-600 border-y-2 py-5 px-2">
      <div className="grid grid-cols-2 gap-4">
        <CardInfo
          cardIcon={UserIcon}
          cardTitle="Borrower Information"
          className={"bg-white border-gray-300 border"}
          color="blue"
        >
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
        <CardInfo
          cardIcon={CurrencyDollarIcon}
          cardTitle="Loan Information"
          className={"bg-white border-gray-300 border"}
          color="blue"
        >
          <div className="grid grid-cols-2 border-b border-gray-300 pb-3 mb-3">
            <div>
              <div className="text-gray-500">Disbursed Amount</div>
              <div className="font-semibold">{rowData?.disbursedAmount}</div>
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
      <div className="bg-white p-3 shadow border-gray-300 border rounded-md my-5">
        <div className="font-semibold text-xl mb-3">
          Verified Documents{" "}
          <span className="font-light text-xs">
            ({rowData?.verifiedDocuments?.filter((doc) => doc.verified).length}{" "}
            documents)
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
      {rowData?.loanActionDetailsList && (
        <div className="bg-white p-3 shadow rounded-md my-5 border-gray-300 border">
          <div className="font-semibold text-xl mb-3">Loan Action History</div>
          {rowData?.loanActionDetailsList.map((action, index) => {
            const actionKeys = Object.keys(action);
            let sentence = "";

            actionKeys.forEach((key) => {
              if (key.includes("By")) {
                const role = convertToTitleCase(action[key]);

                // Finding the corresponding date key dynamically
                const baseKey = key.replace("By", "").toLowerCase(); // Normalize key
                const dateKey = actionKeys.find(
                  (k) =>
                    k.toLowerCase().includes(baseKey) &&
                    k.toLowerCase().includes("date")
                );

                const formattedDate = dateKey
                  ? `on ${convertDate(new Date(action[dateKey]))}`
                  : "";
                sentence = `Loan has been ${convertToReadableString(
                  key.replace("By", "")
                )} By ${role} ${formattedDate}`;
              }
            });

            return (
              <div key={index} className="border-b pb-2 mb-2">
                <p>{sentence}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="w-full flex justify-end gap-2 px-5">
        <button
          onClick={() => handleLoanAgreement(rowData.loanId, rowData.uid)}
          className="flex gap-x-1.5 items-center px-2.5 py-2 bg-white shadow-md text-blue-600 rounded-md hover:shadow transition-colors border border-gray-300"
        >
          <NewspaperIcon className="-ml-0.5 h-5 w-5" />
          View Loan Agreement
        </button>
        <button
          onClick={() => handleViewDocuments(rowData.verifiedDocuments)}
          className="flex gap-x-1.5 items-center px-2.5 py-2 bg-white shadow-md text-blue-600 rounded-md hover:shadow transition-colors border border-gray-300"
        >
          <FiInfo className="-ml-0.5 h-5 w-5" />
          View Documents
        </button>
        {rowData?.rolePermissions?.reject && (
          <>
            <button
              onClick={() => handleReject(rowData)}
              className="flex gap-x-1.5 items-center px-2.5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <FiXCircle className="-ml-0.5 h-5 w-5" />
              Reject
            </button>
            <button
              onClick={() => handleApprove(rowData)}
              className="flex gap-x-1.5 items-center px-2.5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              <FiCheckCircle className="-ml-0.5 h-5 w-5" />
              {rowData?.rolePermissions?.finalApprove ? "Approve" : "Recommend"}
            </button>
          </>
        )}
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
      <ViewDocumentsModal
        isOpen={showDocumentsModal}
        onClose={closeViewDocumentModal}
        documents={documentsData}
      />
    </div>
  );
};

export default ApproveLoans;
