import React, { useEffect, useState } from "react";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  approveLoan,
  downloadDocumentFile,
  getFullLoanDetails,
  getLoanAgreement,
  getLoansByField,
  getPendingLoans,
  previewDocumentFile,
  rejectLoan,
} from "../../redux/Slices/southAfricaSmeLoansSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import { useNavigate } from "react-router-dom";
import Pagination from "../Common/Pagination/Pagination";
import { convertDate } from "../../utils/convertDate";
import convertToTitleCase from "../../utils/convertToTitleCase";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  UserIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import CardInfo from "../Common/CardInfo/CardInfo";
import calculateAging from "../../utils/calculateAging";
import convertToReadableString from "../../utils/convertToReadableString";
import store from "../../redux/store";
import {
  clearValidationError,
  updateValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import FullLoanDetailModal from "../Los-Personal/FullLoanDetailModal";
import RejectModal from "../Los-Personal/RejectModal";
import ViewDocumentsModal from "../Los-Personal/Loans/ViewDocumentsModal";

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
    useSelector((state) => state.southAfricaSmeLoans);
  const { userData, roleName } = useSelector((state) => state.auth);
  const { validationError } = useSelector((state) => state.validation);
  const [filteredApproveLoansData, setFilteredApproveLoansData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);
  const [salSearchValue, setSalSearchValue] = useState("");
  const [salSearchBy, setSalSearchBy] = useState("");
  const navigate = useNavigate();
  const [isDownPaymentPaid, setIsDownPaymentPaid] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(
      getPendingLoans({
        page: currentPage,
        size: pageSize,
        getPayload: { roleNames: [roleName] },
      })
    );
  };

  const handleSearch = async () => {
    await dispatch(
      validateForm({ salSearchBy: salSearchBy, salSearchValue: salSearchValue })
    );
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        getLoansByField({
          field: salSearchBy,
          value: salSearchValue,
          getPayload: { roleNames: [roleName] },
        })
      );
    }
    // setSalSearchBy("");
    // setSalSearchValue("");
  };

  const handleReset = () => {
    setSalSearchBy("");
    setSalSearchValue("");
    setCurrentPage(0);
    dispatch(
      getPendingLoans({
        page: 0,
        size: pageSize,
        getPayload: { roleNames: [roleName] },
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
      roleName: [roleName],
      isDownPaymentPaid,
    };

    await dispatch(approveLoan(approveLoanPayload)).unwrap();
    await dispatch(
      getPendingLoans({
        page: 0,
        size: 20,
        getPayload: { roleNames: [roleName] },
      })
    ).unwrap();
    // if (rowData?.rolePermissions?.finalApprove) {
    //   navigate(`/loan/loan-origination-system/sme/loans/loan-history`);
    // }
    setIsDownPaymentPaid(null);
  };

  const handleReject = async (rowData) => {
    setCurrentRowData(rowData);
    setShowModal(true); // Show modal
    setIsDownPaymentPaid(null);
  };

  const closeRejectModal = () => {
    setShowModal(false);
  };

  const handleRejection = async (rowData) => {
    const rejectLoanPayload = {
      amount: rowData.principalAmount,
      applicationStatus: "REJECTED",
      loanId: rowData.loanId,
      uid: rowData.uid,
      rejectionReason: rejectionReason,
      username: userData.username,
      roleName: [roleName],
    };
    console.log(rejectLoanPayload);
    let isValid = true;
    if (rejectionReason === "") {
      dispatch(
        updateValidationError({ ...validationError, rejectionReason: true })
      );
      isValid = false;
    }
    if (isValid) {
      await dispatch(rejectLoan(rejectLoanPayload)).unwrap();
      await dispatch(
        getPendingLoans({
          page: 0,
          size: 20,
          getPayload: { roleNames: [roleName] },
        })
      ).unwrap();
      onClose();
      navigate(`/loan/product-testing2/loan-history`);
      setRejectionReason("");
    }
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

  const searchOptions = [
    { label: "Borrower Name", value: "borrowerName" },
    { label: "Borrower Serial No.", value: "uniqueID" },
  ];

  const columns = [
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrowerName" },
    { label: "Loan Id", field: "loanId" },
    { label: "Borrower Serial No.", field: "uid" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
    { label: "Aging", field: "aging" },
  ];

  useEffect(() => {
    const filteredApproveLoansDataFunction = () => {
      if (!approveLoans) return [];

      const filteredData = approveLoans.filter(
        (item) =>
          // Exclude object if any loanItem has recommendedBy or rejectedBy matching userData.username
          !item?.loanActionDetailsList?.some(
            (loanItem) =>
              loanItem?.recommendedBy === userData.username ||
              loanItem?.rejectedBy === userData.username
          )
      );

      return transformData(filteredData);
    };

    setFilteredApproveLoansData(filteredApproveLoansDataFunction());
  }, [approveLoans, roleName, userData]);

  const renderExpandedRow = (rowData) => {
    console.log(rowData);
    return (
      <div className="text-sm dark:border-gray-600 border-y-2 py-5 px-2">
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
            <div
              className="text-blue-600 font-semibold cursor-pointer flex gap-2"
              onClick={() => handleFullLoanDetails(rowData.loanId, rowData.uid)}
            >
              <CalendarDaysIcon className="-ml-0.5 h-5 w-5" /> View EMI Schedule
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
                      <div className="">Refinancing Entity</div>
                      <div className="font-semibold"> {refinance.name}</div>
                    </div>
                    <div>
                      <div className="">Refinance Amount</div>
                      <div className="font-semibold">
                        {" "}
                        {refinance.refinanceAmount}
                      </div>
                    </div>
                    <div>
                      <div className="">Installment On PaySlip</div>
                      <div className="font-semibold">
                        {" "}
                        {refinance.installmentOnPaySlip}
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
          <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60 text-gray-800 dark:text-gray-100 rounded-lg shadow-md p-3 my-5">
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
        <div className="w-full flex justify-end gap-2 px-5">
          {rowData.loanProductName.toLowerCase().includes("asset") && (
            <div className="flex items-center mb-3">
              <InputCheckbox
                labelName={"Is Down Payment Paid?"}
                inputName={"isDownPaymentPaid"}
                inputChecked={isDownPaymentPaid}
                onChange={(e) => setIsDownPaymentPaid(e.target.checked)}
              />
            </div>
          )}
          <Button
            buttonName={"View Loan Agreement"}
            onClick={() => handleLoanAgreement(rowData.loanId, rowData.uid)}
            rectangle={true}
            buttonIcon={NewspaperIcon}
            buttonType="tertiary"
          />
          <Button
            buttonName={"View Documents"}
            onClick={() => handleViewDocuments(rowData.verifiedDocuments)}
            rectangle={true}
            buttonIcon={FiInfo}
            buttonType="tertiary"
          />
          {rowData?.rolePermissions?.reject && (
            <>
              <Button
                buttonName={"Reject"}
                onClick={() => handleReject(rowData)}
                rectangle={true}
                buttonIcon={FiXCircle}
                buttonType="destructive"
              />
              <Button
                buttonName={
                  rowData?.rolePermissions?.finalApprove
                    ? "Approve"
                    : "Recommend"
                }
                onClick={() => handleApprove(rowData)}
                rectangle={true}
                buttonIcon={FiCheckCircle}
                buttonType="success"
                disabled={
                  rowData.loanProductName.toLowerCase().includes("asset")
                    ? !isDownPaymentPaid
                    : false
                }
              />
            </>
          )}
        </div>
      </div>
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
            inputName="salSearchBy"
            inputOptions={searchOptions}
            inputValue={salSearchBy}
            onChange={(e) => setSalSearchBy(e.target.value)}
            disabled={false}
            isValidation={true}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="salSearchValue"
            inputValue={salSearchValue}
            onChange={(e) => setSalSearchValue(e.target.value)}
            isValidation={true}
            disabled={false}
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
        data={filteredApproveLoansData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
        ListName="List of pending loans"
        ListNameLength={approveLoansTotalElements}
      />
      <Pagination
        totalElements={approveLoansTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <RejectModal
        isOpen={showModal}
        onClose={closeRejectModal}
        userDetails={currentRowData}
        handleRejection={handleRejection}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
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
        downloadDocumentFile={downloadDocumentFile}
        previewDocumentFile={previewDocumentFile}
      />
    </div>
  );
};

export default ApproveLoans;
