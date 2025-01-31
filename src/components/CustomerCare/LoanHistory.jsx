import React, { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { CalendarDaysIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InputSelect from "../Common/InputSelect/InputSelect";
import CardInfo from "../Common/CardInfo/CardInfo";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";
import { loanStatusOptionsNew } from "../../data/OptionsData";
import { convertDate } from "../../utils/convertDate";
import convertToTitleCase from "../../utils/convertToTitleCase";
import { fetchBorrowerDataLoanHistory } from "../../redux/Slices/customerCareSlice";

import {
  getFullLoanDetails,
  getLoanAgreement,
} from "../../redux/Slices/personalLoansSlice";

import ViewDocumentsModal from "./ViewDocumentsModal";
import FullLoanDetailModal from "./FullLoanDetailModal";

const LoanHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subID } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);
  const { loanHistory, error, loading } = useSelector(
    (state) => state.customerCare
  );

  console.log(loanHistory);

  function transformData(inputArray) {
    return inputArray.map((item) => ({
      ...item,
      loanProduct: item?.loanProductName?.replace(/_/g, " "),
      loanReleaseDate: convertDate(item?.loanReleaseDate),
    }));
  }

  const { fullLoanDetails } = useSelector((state) => state.personalLoans);

  useEffect(() => {
    dispatch(fetchBorrowerDataLoanHistory({ subID }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredLoans(loanHistory);
  }, [loanHistory]);

  const [filteredLoans, setFilteredLoans] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const loanHistoryData = transformData(filteredLoans);

  const handleChange = (e) => {
    const selectedOption = e.target.value;
    console.log(selectedOption);
    setSelectedOption(selectedOption);
    if (selectedOption === "") {
      setFilteredLoans(loanHistory);
    } else {
      const filterData = loanHistory.filter((loan) => {
        return loan.loanStatus === selectedOption;
      });
      setFilteredLoans(filterData);
    }
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
    navigate(`/loan-agreement/${loanId}/${uid}`);
    await dispatch(getLoanAgreement({ loanId, uid })).unwrap();
  };

  const columns = [
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrowerName" },
    { label: "Disbursed By", field: "disbursedBy" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
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
      <div className="flex items-center  w-full justify-between">
        <div className="w-1/3">&nbsp;</div>
        <div className="w-1/3">&nbsp;</div>
        <div className="w-1/3 flex items-center justify-end">
          <div className="w-full">
            <InputSelect
              labelName="Select Loan Status"
              inputOptions={loanStatusOptionsNew}
              inputId="loanStatus"
              inputName="loanStatus"
              inputValue={selectedOption}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <ExpandableTable
        columns={columns}
        data={loanHistoryData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
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
