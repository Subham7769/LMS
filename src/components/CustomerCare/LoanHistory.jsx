import React, { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputSelect from "../Common/InputSelect/InputSelect";
import CardInfo from "../Common/CardInfo/CardInfo";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";
import { loanStatusOptionsNew } from "../../data/OptionsData";
import { convertDate } from "../../utils/convertDate";
import convertToTitleCase from "../../utils/convertToTitleCase";
import {
  getFullLoanDetails,
  getLoanAgreement,
  fetchBorrowerDataLoanHistory,
  getRepaymentHistory,
  getLoanStatement,
  getOutrightSettlement,
  getDisbursementFile,
  downloadDocumentFile,
  previewDocumentFile,
} from "../../redux/Slices/personalLoansSlice";
import ViewDocumentsModal from "../Los-Personal/Loans/ViewDocumentsModal";
import FullLoanDetailModal from "../Los-Personal/FullLoanDetailModal";
import ActionOption from "../Common/ActionOptions/ActionOption";
import RepaymentHistoryModal from "../Los-Personal/RepaymentHistoryModal";

const LoanHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subID } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [showRepaymentModal, setRepaymentModal] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);
  const {
    borrowerLoanHistory,
    fullLoanDetails,
    paymentHistory,
    error,
    loading,
  } = useSelector((state) => state.personalLoans);

  function transformData(inputArray) {
    return inputArray.map((item) => ({
      ...item,
      loanProduct: item?.loanProductName?.replace(/_/g, " "),
      loanReleaseDate: convertDate(item?.loanReleaseDate),
    }));
  }

  useEffect(() => {
    dispatch(fetchBorrowerDataLoanHistory({ subID }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredLoans(borrowerLoanHistory);
  }, [borrowerLoanHistory]);

  const [filteredLoans, setFilteredLoans] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const loanHistoryData = transformData(filteredLoans);

  const handleChange = (e) => {
    const selectedOption = e.target.value;
    console.log(selectedOption);
    setSelectedOption(selectedOption);
    if (selectedOption === "") {
      setFilteredLoans(borrowerLoanHistory);
    } else {
      const filterData = borrowerLoanHistory.filter((loan) => {
        return loan.loanStatus === selectedOption;
      });
      setFilteredLoans(filterData);
    }
  };

  const handleFullLoanDetails = async (loanId, uid) => {
    setShowModal(true);
    await dispatch(getFullLoanDetails({ loanId, uid })).unwrap();
  };

  const handleRepaymentHistory = async (loanId) => {
    setRepaymentModal(true);
    await dispatch(getRepaymentHistory({ loanId })).unwrap();
  };

  const closeFullLoanDetailModal = () => {
    setShowModal(false);
  };

  const closeRepaymentHistoryModal = () => {
    setRepaymentModal(false);
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

  const handleLoanStatement = async (loanId, uid) => {
    const printUrl = `/loan-statement/${loanId}/${uid}`;
    window.open(printUrl, "_blank");
    await dispatch(getLoanStatement({ loanId, uid })).unwrap();
  };

  const handleOutrightSettlement = async (loanId, uid) => {
    const printUrl = `/outright-settlement/${loanId}/${uid}`;
    window.open(printUrl, "_blank");
    await dispatch(getOutrightSettlement({ loanId, uid })).unwrap();
  };

  const handleDisbursementFile = async (loanId, uid) => {
    const printUrl = `/disbursement/${loanId}/${uid}`;
    window.open(printUrl, "_blank");
    await dispatch(getDisbursementFile({ loanId, uid })).unwrap();
  };

  const columns = [
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrowerName" },
    { label: "Disbursed By", field: "disbursedBy" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
    { label: "Loan Status", field: "loanStatus" },
  ];

  const userNavigation = [
    {
      name: "Loan Statement",
      action: (rowData) => handleLoanStatement(rowData.loanId, rowData.uid),
    },
    {
      name: "Outright Settlement",
      action: (rowData) =>
        handleOutrightSettlement(rowData.loanId, rowData.uid),
    },
    {
      name: "Loan Agreement",
      action: (rowData) => handleLoanAgreement(rowData.loanId, rowData.uid),
    },
    {
      name: "Disbursement File",
      action: (rowData) => handleDisbursementFile(rowData.loanId, rowData.uid),
    },
    {
      name: "Documents",
      action: (rowData) => handleViewDocuments(rowData.verifiedDocuments),
    },
  ];

  const excludedForPendingOrCanceled = [
    "Loan Statement",
    "Disbursement File",
    "Outright Settlement",
  ];

  const renderExpandedRow = (rowData) => (
    <div className="border-y-2 dark:border-gray-600 py-5 px-2">
      <div className="grid grid-cols-2 gap-4">
        <CardInfo
          cardIcon={UserIcon}
          cardTitle="Borrower Information"
          className={
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60"
          }
          colorText={"text-sky-800 dark:text-sky-500"}
        >
          <div className="grid grid-cols-2 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-500 pb-3 mb-3">
            <div>
              <div className="">Employment</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.employerName}
              </div>
              <div className=" font-light text-xs">
                {rowData?.borrowerDetails?.employmentDuration}
              </div>
            </div>
            <div>
              <div className="">Monthly Income</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.monthlyIncome}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 text-gray-800 dark:text-gray-100">
            <div>
              <div className="">Credit Score</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.creditScore}
              </div>
            </div>
            <div>
              <div className="">Active Loans</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.activeLoans}
              </div>
            </div>
            <div>
              <div className="">Payment History</div>
              <div className="font-semibold">
                {rowData?.borrowerDetails?.paymentHistory}
              </div>
            </div>
          </div>
        </CardInfo>
        <CardInfo
          cardIcon={CurrencyDollarIcon}
          cardTitle="Loan Information"
          className={
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60"
          }
          colorText={"text-sky-800 dark:text-sky-500"}
        >
          <div className="grid grid-cols-2 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-500 pb-3 mb-3">
            <div>
              <div className="">Disbursed Amount</div>
              <div className="font-semibold">{rowData?.disbursedAmount}</div>
            </div>
            <div>
              <div className="">Interest Rate</div>
              <div className="font-semibold">
                {rowData.loanInterest}% {rowData.interestMethod} per{" "}
                {rowData.perLoanInterest}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-500 pb-3 mb-3">
            <div>
              <div className="">Tenure</div>
              <div className="font-semibold">
                {rowData.numberOfTenure} {rowData.perLoanDuration}
              </div>
            </div>
            <div>
              <div className="">Monthly EMI</div>
              <div className="font-semibold">{rowData.monthlyEMI}</div>
            </div>
            <div>
              <div className="">First Payment</div>
              <div className="font-semibold">
                {convertDate(rowData.firstEmiPayment)}
              </div>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div
              className="text-sky-700 dark:text-sky-600 font-semibold cursor-pointer flex gap-2"
              onClick={() => handleFullLoanDetails(rowData.loanId, rowData.uid)}
            >
              <CalendarDaysIcon className="-ml-0.5 h-5 w-5" /> View EMI Schedule
            </div>
            <div
              className="text-sky-700 dark:text-sky-600 font-semibold cursor-pointer flex gap-2"
              onClick={() => handleRepaymentHistory(rowData.loanId)}
            >
              <CalendarDaysIcon className="-ml-0.5 h-5 w-5" /> View Repayment
              History
            </div>
          </div>
        </CardInfo>
      </div>
      <div className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60 text-gray-800 dark:text-gray-100 rounded-lg shadow-md my-5">
        <div className="font-semibold text-xl mb-3 ">
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
    </div>
  );
  const ListAction = (rowData) => {
    const { loanStatus } = rowData;
    const filteredUserNavigation = userNavigation.filter((item) => {
      if (["Pending", "Canceled"].includes(loanStatus)) {
        return !excludedForPendingOrCanceled.includes(item.name);
      }
      return true;
    });
    return (
      <ActionOption
        userNavigation={filteredUserNavigation}
        actionID={rowData}
        align={"right"}
      />
    );
  };

  return (
    <div className={`flex flex-col gap-3`}>
      <div className="flex justify-end mb-3">
        <div className="w-52 xl:w-xs">
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
      <ExpandableTable
        columns={columns}
        data={loanHistoryData}
        renderExpandedRow={renderExpandedRow}
        ListAction={ListAction}
        loading={loading}
      />
      <FullLoanDetailModal
        isOpen={showModal}
        onClose={closeFullLoanDetailModal}
        loanDetails={fullLoanDetails}
        loading={loading}
      />
      <RepaymentHistoryModal
        isOpen={showRepaymentModal}
        onClose={closeRepaymentHistoryModal}
        paymentHistory={paymentHistory}
        loading={loading}
      />
      <ViewDocumentsModal
        isOpen={showDocumentsModal}
        onClose={closeViewDocumentModal}
        documents={documentsData}
        downloadDocumentFile={downloadDocumentFile}
        previewDocumentFile={previewDocumentFile}
      />
    </div>
  );
};

export default LoanHistory;
