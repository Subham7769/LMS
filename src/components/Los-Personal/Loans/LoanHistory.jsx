import React, { Children, useEffect, useState } from "react";
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
  downloadDocumentFile,
  previewDocumentFile,
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
  CurrencyDollarIcon,
  UserIcon,
  ReceiptRefundIcon,
  ArrowPathIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import convertToReadableString from "../../../utils/convertToReadableString";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import store from "../../../redux/store";
import ActionOption from "../../Common/ActionOptions/ActionOption";
import { generateRefundApplicationId } from "../../../redux/Slices/personalRefundSlice";

import { initiateDebtCollectionWorkflow } from "../../../utils/camundaService";
import useConfirm from "../../../hooks/useConfirm";

import {toast} from "react-toastify";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    loanProduct: item?.loanProductName?.replace(/_/g, " "),
    loanReleaseDate: convertDate(item?.loanReleaseDate),
    loanStatus: convertToTitleCase(item?.loanStatus),
  }));
}

const LoanHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirm, ConfirmDialog } = useConfirm();

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
  const [currentPage, setCurrentPage] = useState(0);

  // Decode the BorrowerId to restore its original value
  const decodedUniqueID = decodeURIComponent(uniqueID);

  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const userName = userData?.username || "";

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
    setCurrentPage(0);
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

  // const handleDebtCollection = async (loanId, uid) => {
  //   console.log(loanId + uid);
    
  //   navigate(`/workflow/workflow-list?loanId=${loanId}&uid=${uid}`);
  // };

  const handleDebtCollection = async (loanId, uid) => {
    console.log("hdfdfdfdf")
    const ok = await confirm(
      "Start Debt Collection",
      "This Process will handle the pending loan installment payment. <br /> Are you sure you want to start the Debt Collection for this loan?"
    );
    if (!ok) return;

    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 5);

    // Format to 'YYYY-MM-DD' (Camunda-friendly ISO format)
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    const payload = {
      loanId: loanId ? loanId : "LHP20000030LUS",
      email: 'umesh.kshirsagar@gmail.com',
      fullName: 'Full Name',
      customerType: "Personal",
      paymentHistory: "Good",
      accountNumber:"ACC293030",
      daysPastDue:10,
      amountDue:1000,
      dueDate:formattedDueDate,
      assignedUser:userName,
      // etc.
    };

    try {
      console.log("hdfdfdfdf")
      await initiateDebtCollectionWorkflow(payload);
      toast.success("Workflow started successfully!");
    } catch (error) {
      toast.error("Failed to start workflow:" + error);
    }
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
    {
        name: "Debt Collection",
        action: (rowData) => handleDebtCollection(rowData.loanId, rowData.uid),
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
          {(rowData.loanStatus === "Activated" ||
            rowData.loanStatus === "Closed") && (
            <div className="">
              <Button
                buttonName={"Initiate Refund"}
                onClick={() =>
                  handleInitiateRefund(rowData.loanId, rowData.uid)
                }
                buttonIcon={ReceiptRefundIcon}
                buttonType="tertiary"
              />
            </div>
          )}
          {(rowData.loanStatus === "Activated" ||
            rowData.loanStatus === "Late") && (
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
            inputName="plhSearchBy"
            inputOptions={searchOptions}
            inputValue={plhSearchBy}
            onChange={(e) => setPlhSearchBy(e.target.value)}
            disabled={false}
            isValidation={true}
          />
        </div>
        <div className="w-full md:w-[45%]">
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

        <div className="flex align-middle gap-5 justify-end">
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


      <ConfirmDialog />
    </div>

    
      
  );
};

export default LoanHistory;
