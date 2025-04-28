import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector, useDispatch } from "react-redux";
import {
  getFullLoanDetails,
  getLoanHistory,
  getLoanHistoryByField,
  getLoanAgreement,
  uploadSignedLoanAgreement,
  generateLoanApplicationId,
  getRefinanceDetails,
  getRepaymentHistory,
  getDisbursementFile,
  getLoanStatement,
  getOutrightSettlement,
  closeLoan,
} from "../../../redux/Slices/personalLoansSlice";
import Button from "../../Common/Button/Button";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import InputFile from "../../Common/InputFile/InputFile";
import Pagination from "../../Common/Pagination/Pagination";
import FullLoanDetailModal from "../FullLoanDetailModal";
import RepaymentHistoryModal from "../RepaymentHistoryModal";
import { convertDate } from "../../../utils/convertDate";
import { useNavigate, useParams } from "react-router-dom";
import CardInfo from "../../Common/CardInfo/CardInfo";
import ViewDocumentsModal from "./ViewDocumentsModal";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  UserIcon,
  ReceiptRefundIcon,
  ArrowPathIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { FiInfo } from "react-icons/fi";
import convertToReadableString from "../../../utils/convertToReadableString";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import store from "../../../redux/store";
import ActionOption from "../../Common/ActionOptions/ActionOption";
import { generateRefundApplicationId } from "../../../redux/Slices/personalRefundSlice";

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
  const {
    loanHistory,
    paymentHistory,
    loading,
    loanHistoryTotalElements,
    fullLoanDetails,
  } = useSelector((state) => state.personalLoans);
  const [showModal, setShowModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [showRepaymentModal, setRepaymentModal] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);
  const [plhSearchValue, setPlhSearchValue] = useState("");
  const [plhSearchBy, setPlhSearchBy] = useState("");
  const [signedAgreement, setSignedAgreement] = useState("");
  const { uniqueID } = useParams();
  // Pagination state
  const [pageSize, setPageSize] = useState(10);

  // Decode the BorrowerId to restore its original value
  const decodedUniqueID = decodeURIComponent(uniqueID);

  useEffect(() => {
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(getLoanHistory({ page: currentPage, size: pageSize }));
  };

  const loanHistoryData = transformData(loanHistory);

  const handleSearch = async () => {
    await dispatch(
      validateForm({ plhSearchBy: plhSearchBy, plhSearchValue: plhSearchValue })
    );
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        getLoanHistoryByField({ field: plhSearchBy, value: plhSearchValue })
      );
    }
    // setPlhSearchBy("");
    // setPlhSearchValue("");
  };

  const handleReset = () => {
    setPlhSearchBy("");
    setPlhSearchValue("");
    dispatch(getLoanHistory({ page: 0, size: pageSize }));
    navigate(`/loan/loan-origination-system/personal/loans/loan-history`);
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
    const printUrl = `/loan-agreement/${loanId}/${uid}`;
    window.open(printUrl, "_blank");
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

  const handleRefinanceLoan = async (loanId, uid, uniqueID) => {
    await dispatch(getRefinanceDetails({ loanId, uid, uniqueID })).unwrap();
    const loanApplicationId = await dispatch(
      generateLoanApplicationId()
    ).unwrap();
    navigate(
      `/loan/loan-origination-system/personal/loans/add-loan/new/${loanApplicationId}`
    );
  };

  const handleCloseLoan = async (loanId, uid) => {
    const closeLoanPayload = {
      loanId: loanId,
      userId: uid,
    };
    await dispatch(closeLoan(closeLoanPayload)).unwrap();
    handleReset();
  };

  const handleInitiateRefund = async (loanId, uid) => {
    const refundApplicationId = await dispatch(
      generateRefundApplicationId()
    ).unwrap();
    navigate(
      `/loan/loan-origination-system/personal/refund/add-refund/new/${refundApplicationId}/${loanId}/${uid}`
    );
  };

  const handleDisbursementFile = async (loanId, uid) => {
    const printUrl = `/disbursement/${loanId}/${uid}`;
    window.open(printUrl, "_blank");
    await dispatch(getDisbursementFile({ loanId, uid })).unwrap();
  };

  const searchOptions = [
    { label: "Borrower Name", value: "borrowerName" },
    { label: "Loan ID", value: "loanId" },
    { label: "Unique ID", value: "uniqueID" },
  ];

  const columns = [
    { label: "Loan ID", field: "loanId", copy: true },
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrowerName" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
    { label: "Loan Status", field: "loanStatus" },
  ];

  const handleFileChange = async (e, loanId) => {
    const fileUploadParams = {
      loanId: loanId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    setSignedAgreement(e.target.value);
    const { files } = e.target;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);
      await dispatch(
        uploadSignedLoanAgreement({ formData, fileUploadParams })
      ).unwrap();
      handleReset();
    }
  };

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

  const renderExpandedRow = (rowData) => {
    const { loanStatus } = rowData;

    const filteredUserNavigation = userNavigation.filter((item) => {
      if (["PENDING", "CANCELED"].includes(loanStatus)) {
        return !excludedForPendingOrCanceled.includes(item.name);
      }
      return true;
    });
    return (
      <div className="text-sm text-gray-600 border-y-2 py-5 px-2">
        <div className="grid grid-cols-2 gap-4">
          <CardInfo
            cardIcon={UserIcon}
            cardTitle="Borrower Information"
            className={"bg-white border-border-gray-primary border"}
            colorText={"text-blue-primary"}
          >
            <div className="grid grid-cols-2 border-b border-border-gray-primary pb-3 mb-3">
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
            className={"bg-white border-border-gray-primary border"}
            colorText={"text-blue-primary"}
          >
            <div className="grid grid-cols-2 border-b border-border-gray-primary pb-3 mb-3">
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
            <div className="grid grid-cols-3 border-b border-border-gray-primary pb-3 mb-3">
              <div>
                <div className="text-gray-500">Tenure</div>
                <div className="font-semibold">
                  {rowData.numberOfTenure} {rowData.perLoanDuration}
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
            <div className="flex gap-5 flex-wrap">
              <div
                className="text-blue-600 font-semibold cursor-pointer flex gap-2"
                onClick={() =>
                  handleFullLoanDetails(rowData.loanId, rowData.uid)
                }
              >
                <CalendarDaysIcon className="-ml-0.5 h-5 w-5" /> View EMI
                Schedule
              </div>
              <div
                className="text-blue-600 font-semibold cursor-pointer flex gap-2"
                onClick={() => handleRepaymentHistory(rowData.loanId)}
              >
                <CalendarDaysIcon className="-ml-0.5 h-5 w-5" /> View Repayment
                History
              </div>
            </div>
          </CardInfo>
        </div>
        <div className="bg-white p-3 shadow-md border-border-gray-primary border rounded-md my-5">
          <div className="font-semibold text-xl mb-3">
            Verified Documents{" "}
            <span className="font-light text-xs">
              (
              {rowData?.verifiedDocuments?.filter((doc) => doc.verified).length}{" "}
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
          <div className="bg-white p-3 shadow rounded-md my-5 border-border-gray-primary border">
            <div className="font-semibold text-xl mb-3">
              Loan Action History
            </div>
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
        <div className="flex justify-between items-end">
          {rowData.verifiedDocuments.some(
            (doc) => doc.documentKey === "SIGNED_LOAN_AGREEMENT" && doc.verified
          ) ? (
            <div>&nbsp;</div>
          ) : (
            <div>
              <InputFile
                placeholder="Upload Signed Agreement"
                inputName={"signedAgreement"}
                inputValue={signedAgreement}
                onChange={(e) => handleFileChange(e, rowData.loanId)}
              />
            </div>
          )}
          <div className="flex justify-end gap-2 px-5">
            {(rowData.loanStatus === "ACTIVATED" ||
              rowData.loanStatus === "CLOSED") && (
              <div className="">
                <Button
                  buttonName={"Initiate Refund"}
                  onClick={() =>
                    handleInitiateRefund(
                      rowData.loanId,
                      rowData.uid,
                    )
                  }
                  rectangle={true}
                  buttonIcon={ReceiptRefundIcon}
                  buttonType="tertiary"
                />
              </div>
            )}
            {(rowData.loanStatus === "ACTIVATED" ||
              rowData.loanStatus === "LATE") && (
              <div className="flex gap-2">
                <Button
                  buttonName={"Refinance Loan"}
                  onClick={() =>
                    handleRefinanceLoan(
                      rowData.loanId,
                      rowData.uid,
                      rowData.uniqueID
                    )
                  }
                  rectangle={true}
                  buttonIcon={ArrowPathIcon}
                  buttonType="tertiary"
                />
                <Button
                  buttonName={"Close Loan via Wallet"}
                  onClick={() => handleCloseLoan(rowData.loanId, rowData.uid)}
                  rectangle={true}
                  buttonIcon={WalletIcon}
                  buttonType="tertiary"
                />
              </div>
            )}
            <div>
              <ActionOption
                userNavigation={filteredUserNavigation}
                actionID={rowData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile className={`flex justify-between gap-5 align-middle`}>
        <div className="w-[45%]">
          <InputSelect
            labelName="Search By"
            inputName="plhSearchBy"
            inputOptions={searchOptions}
            inputValue={plhSearchBy}
            onChange={(e) => setPlhSearchBy(e.target.value)}
            disabled={false}
            isValidation={true}
          />
        </div>
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="plhSearchValue"
            inputValue={plhSearchValue}
            onChange={(e) => setPlhSearchValue(e.target.value)}
            required
            disabled={false}
            isValidation={true}
          />
        </div>

        <div className="flex align-middle gap-5">
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
        data={loanHistoryData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
      />
      {decodedUniqueID === "undefined" && (
        <Pagination
          totalElements={loanHistoryTotalElements}
          dispatcherFunction={dispatcherFunction}
          pageSize={pageSize}
        />
      )}
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
      />
    </div>
  );
};

export default LoanHistory;
