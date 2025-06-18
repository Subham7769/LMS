import React, { useEffect, useState } from "react";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";
import { useSelector, useDispatch } from "react-redux";
import {
  getFullLoanDetails,
  getLoanHistory,
  getLoanHistoryByField,
  getLoanAgreement,
  generateLoanApplicationId,
  getRefinanceDetails,
  getRepaymentHistory,
  downloadDocumentFile,
  previewDocumentFile,
} from "../../redux/Slices/southAfricaSmeLoansSlice";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputFile from "../Common/InputFile/InputFile";
import Pagination from "../Common/Pagination/Pagination";
import { convertDate } from "../../utils/convertDate";
import { useNavigate, useParams } from "react-router-dom";
import CardInfo from "../Common/CardInfo/CardInfo";
import ViewDocumentsModal from "../Los-Personal/Loans/ViewDocumentsModal";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  UserIcon,
  WalletIcon,
  ArrowPathIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import convertToTitleCase from "../../utils/convertToTitleCase";
import convertToReadableString from "../../utils/convertToReadableString";
import {
  closeLoan,
  getDisbursementFile,
  getLoanStatement,
  getOutrightSettlement,
  uploadSignedLoanAgreement,
} from "../../redux/Slices/personalLoansSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import ActionOption from "../Common/ActionOptions/ActionOption";
import FullLoanDetailModal from "../Los-Personal/FullLoanDetailModal";
import RepaymentHistoryModal from "../Los-Personal/RepaymentHistoryModal";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    loanProduct: convertToTitleCase(item?.loanProductName),
    loanReleaseDate: convertDate(item?.loanReleaseDate),
    loanStatus: convertToTitleCase(item?.loanStatus),
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
  } = useSelector((state) => state.southAfricaSmeLoans);
  const [showModal, setShowModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [showRepaymentModal, setRepaymentModal] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);
  const [slhSearchValue, setSlhSearchValue] = useState("");
  const [slhSearchBy, setSlhSearchBy] = useState("");
  const [signedAgreement, setSignedAgreement] = useState("");
  const { uniqueID } = useParams();
  // Pagination state
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  // Decode the BorrowerId to restore its original value
  const decodedUniqueID = decodeURIComponent(uniqueID);

  console.log(paymentHistory);

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
      validateForm({ slhSearchBy: slhSearchBy, slhSearchValue: slhSearchValue })
    );
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        getLoanHistoryByField({ field: slhSearchBy, value: slhSearchValue })
      );
    }
    // setSlhSearchBy("");
    // setSlhSearchValue("");
  };

  const handleReset = () => {
    setSlhSearchBy("");
    setSlhSearchValue("");
    setCurrentPage(0);
    dispatch(getLoanHistory({ page: 0, size: pageSize }));
    navigate(`/loan/loan-origination-system/sme/loans/loan-history`);
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
    const printUrl = `/loan-agreement-sme/${loanId}/${uid}`;
    window.open(printUrl, "_blank");
    await dispatch(getLoanAgreement({ loanId, uid })).unwrap();
  };

  const handleLoanStatement = async (loanId, uid) => {
    const printUrl = `/loan-statement-sme/${loanId}/${uid}`;
    window.open(printUrl, "_blank");
    await dispatch(getLoanStatement({ loanId, uid })).unwrap();
  };

  const handleOutrightSettlement = async (loanId, uid) => {
    const printUrl = `/outright-settlement-sme/${loanId}/${uid}`;
    window.open(printUrl, "_blank");
    await dispatch(getOutrightSettlement({ loanId, uid })).unwrap();
  };

  const handleRefinanceLoan = async (loanId, uid, uniqueID) => {
    await dispatch(getRefinanceDetails({ loanId, uid, uniqueID })).unwrap();
    const loanApplicationId = await dispatch(
      generateLoanApplicationId()
    ).unwrap();
    navigate(
      `/loan/loan-origination-system/sme/loans/add-loan/new/${loanApplicationId}`
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

  const handleDisbursementFile = async (loanId, uid) => {
    const printUrl = `/disbursement-sme/${loanId}/${uid}`;
    window.open(printUrl, "_blank");
    await dispatch(getDisbursementFile({ loanId, uid })).unwrap();
  };

  const searchOptions = [
    { label: "Borrower Name", value: "borrowerName" },
    { label: "Loan ID", value: "loanId" },
    { label: "Borrower Serial No.", value: "uniqueID" },
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
    // {
    //   name: "Loan Statement",
    //   action: (rowData) => handleLoanStatement(rowData.loanId, rowData.uid),
    // },
    // {
    //   name: "Outright Settlement",
    //   action: (rowData) =>
    //     handleOutrightSettlement(rowData.loanId, rowData.uid),
    // },
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
          <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-500 pb-3 mb-3">
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
          <div className="grid grid-cols-3">
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
          <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-500 pb-3 mb-3">
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
          <div className="grid grid-cols-3 border-b border-gray-300 dark:border-gray-500 pb-3 mb-3">
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
        <div className="col-span-2">
          {rowData?.refinanceDetails && (
            <CardInfo
              cardIcon={BanknotesIcon}
              cardTitle="Refinancing Details"
              className={
                "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60"
              }
              colorText={"text-sky-800 dark:text-sky-500"}
            >
              {rowData?.refinanceDetails.map((refinance) => (
                <div className="grid grid-cols-4 pb-3">
                  <div>
                    <div className="">Loan Id</div>
                    <div className="font-semibold">{refinance.loanId}</div>
                  </div>
                  <div>
                    <div className="">Refinance Amount</div>
                    <div className="font-semibold">
                      {" "}
                      {refinance.refinanceAmount}
                    </div>
                  </div>
                </div>
              ))}
            </CardInfo>
          )}
        </div>
      </div>
      <div className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60 text-gray-800 dark:text-gray-100 rounded-lg shadow-md my-5">
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
        <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60 text-gray-800 dark:text-gray-100 rounded-lg shadow-md p-3 my-5">
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
              <div
                key={index}
                className="border-b dark:border-gray-500 pb-2 mb-2"
              >
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
          {rowData.loanStatus === "Activated" && (
            <div>
              <Button
                buttonName={"Refinance Loan"}
                onClick={() =>
                  handleRefinanceLoan(
                    rowData.loanId,
                    rowData.uid,
                    rowData.uniqueID
                  )
                }
                buttonIcon={ArrowPathIcon}
                buttonType="tertiary"
              />
              <Button
                buttonName={"Close Loan via Wallet"}
                onClick={() => handleCloseLoan(rowData.loanId, rowData.uid)}
                buttonIcon={WalletIcon}
                buttonType="tertiary"
              />
            </div>
          )}
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
      <ContainerTile
        className={`p-5 md:flex justify-between gap-5 align-middle`}
      >
        <div className="w-full md:w-[45%] mb-2">
          <InputSelect
            labelName="Search By"
            inputName="slhSearchBy"
            inputOptions={searchOptions}
            inputValue={slhSearchBy}
            onChange={(e) => setSlhSearchBy(e.target.value)}
            disabled={false}
            isValidation={true}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="slhSearchValue"
            inputValue={slhSearchValue}
            onChange={(e) => setSlhSearchValue(e.target.value)}
            isValidation={true}
            disabled={false}
          />
        </div>
        <div className="flex align-middle gap-5 justify-end">
          <Button
            buttonName={"Search"}
            onClick={handleSearch}
            className={`mt-4 h-fit self-center`}
            buttonType="secondary"
          />
          <Button
            buttonName={"Reset"}
            onClick={handleReset}
            className={`mt-4 h-fit self-center`}
            buttonType="tertiary"
          />
        </div>
      </ContainerTile>
      <ExpandableTable
        columns={columns}
        data={loanHistoryData}
        renderExpandedRow={renderExpandedRow}
        ListAction={ListAction}
        loading={loading}
        ListName="List of all loans"
        ListNameLength={loanHistoryTotalElements}
      />
      {decodedUniqueID === "undefined" && (
        <Pagination
          totalElements={loanHistoryTotalElements}
          dispatcherFunction={dispatcherFunction}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
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
        downloadDocumentFile={downloadDocumentFile}
        previewDocumentFile={previewDocumentFile}
      />
    </div>
  );
};

export default LoanHistory;
