import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import Pagination from "../../Common/Pagination/Pagination";
import { convertDate } from "../../../utils/convertDate";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import convertToReadableString from "../../../utils/convertToReadableString";
import {
  CheckCircleIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import CardInfo from "../../Common/CardInfo/CardInfo";
import calculateAging from "../../../utils/calculateAging";
import ViewDocumentsModal from "../Loans/ViewDocumentsModal";
import store from "../../../redux/store";
import {
  clearValidationError,
  updateValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import ViewBorrowerDetailsModal from "../Borrowers/ViewBorrowerDetailsModal";
import {
  approveRejectRefund,
  getPendingRefunds,
  getPendingRefundsByField,
} from "../../../redux/Slices/personalRefundSlice";
import RejectModal from "../RejectModal";
import { downloadDocumentFile, previewDocumentFile } from "../../../redux/Slices/personalLoansSlice";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    aging: calculateAging(item?.creationDate),
    status: convertToTitleCase(item?.status),
  }));
}

const ApproveRefunds = () => {
  const dispatch = useDispatch();
  const { approveRefund, loading, approveRefundTotalElements } = useSelector(
    (state) => state.personalRefund
  );
  const { userData, roleName } = useSelector((state) => state.auth);
  const { validationError } = useSelector((state) => state.validation);
  const [filteredApproveLoansData, setFilteredApproveLoansData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);
  const [palSearchValue, setPalSearchValue] = useState("");
  const [palSearchBy, setPalSearchBy] = useState("");
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [selectedBorrowerData, setSelectedBorrowerData] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  // Pagination state
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(
      getPendingRefunds({
        page: currentPage,
        size: pageSize,
        getPayload: { roleNames: [roleName] },
      })
    );
  };

  const handleSearch = async () => {
    //if empty palSearchBy or palSearchValue then display a message (otherwise API will return java runtime error)
    await dispatch(
      validateForm({ palSearchBy: palSearchBy, palSearchValue: palSearchValue })
    );
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        getPendingRefundsByField({
          fieldName: palSearchBy,
          value: palSearchValue,
        })
      );
    }

    // setPalSearchBy("");
    // setPalSearchValue("");
  };

  const handleReset = () => {
    setPalSearchBy("");
    setPalSearchValue("");
    setCurrentPage(0);
    dispatch(
      getPendingRefunds({
        page: 0,
        size: pageSize,
        getPayload: { roleNames: [roleName] },
      })
    );
  };

  const handleApprove = async (rowData) => {
    console.log(rowData);
    const approveRefundPayload = {
      refundProcessId: rowData.refundProcessId,
      status: "APPROVED",
      userName: userData.username,
    };

    await dispatch(approveRejectRefund(approveRefundPayload)).unwrap();
    await dispatch(
      getPendingRefunds({
        page: 0,
        size: 20,
        getPayload: { roleNames: [roleName] },
      })
    ).unwrap();
  };

  const handleReject = async (rowData) => {
    setCurrentRowData(rowData);
    setShowModal(true); // Show modal
  };

  const closeRejectModal = () => {
    setShowModal(false);
  };

  const handleRejection = async (rowData) => {
    const rejectRefundPayload = {
      refundProcessId: rowData.refundProcessId,
      status: "REJECTED",
      userName: userData.username,
    };
    console.log(rejectRefundPayload);
    let isValid = true;
    if (rejectionReason === "") {
      dispatch(
        updateValidationError({ ...validationError, rejectionReason: true })
      );
      isValid = false;
    }
    if (isValid) {
      await dispatch(approveRejectRefund(rejectRefundPayload)).unwrap();
      await dispatch(
        getPendingRefunds({
          page: 0,
          size: 20,
          getPayload: { roleNames: [roleName] },
        })
      ).unwrap();
      closeRejectModal();
      setRejectionReason("");
    }
  };

  const handleViewDocuments = (documents) => {
    setDocumentsData(documents);
    setDocumentsLoanModal(true);
  };

  const closeViewDocumentModal = () => {
    setDocumentsLoanModal(false);
  };

  const handleRefundForm = async (refundProcessId) => {
    const printUrl = `/refund-form/${refundProcessId}`;
    window.open(printUrl, "_blank");
    await dispatch(getRefundForm(refundProcessId)).unwrap();
  };

  // Function to handle opening the modal
  const handleViewProfile = (e, uid) => {
    e.preventDefault();
    // If you already have the uid, simply pass it on.
    setSelectedBorrowerData(uid);
    setIsViewPopupOpen(true);
  };

  const searchOptions = [
    { label: "Borrower Name", value: "borrowerName" },
    { label: "Unique ID", value: "uniqueID" },
    { label: "Refund Application ID", value: "refundApplicationId" },
    { label: "Loan ID", value: "loanId" },
  ];

  const columns = [
    { label: "Refund App. ID", field: "refundApplicationId" },
    { label: "Borrower Name", field: "borrowerName" },
    { label: "Unique ID", field: "uniqueID", copy: true },
    { label: "Loan ID", field: "loanId", copy: true },
    { label: "Amount", field: "refundAmount" },
    { label: "Status", field: "status" },
    { label: "Aging", field: "aging" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="border-y-2 dark:border-gray-500 py-5 px-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-md p-3 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60">
          <div className="flex justify-between items-baseline mb-3 text-sky-800 dark:text-sky-500">
            <div className="text-xl font-semibold flex gap-2 items-center">
              <UserCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Borrower Information{" "}
              <p
                className="text-[10px] text-gray-600 dark:text-gray-300 -mb-2 cursor-pointer underline"
                onClick={(e) => handleViewProfile(e, rowData.borrowerId)}
              >
                View Borrower Profile
              </p>
            </div>
          </div>
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
        </div>
        <CardInfo
          cardIcon={CurrencyDollarIcon}
          cardTitle="Refund Information"
          className={
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60"
          }
          colorText={"text-sky-800 dark:text-sky-500"}
        >
          <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-500 pb-3 mb-3">
            <div>
              <div className="">Cause of Refund</div>
              <div className="font-semibold">{rowData?.causeOfRefund}</div>
            </div>
            <div>
              <div className="">Related PaySlip Month</div>
              <div className="font-semibold">{rowData.relatedPaySlipMonth}</div>
            </div>
          </div>
        </CardInfo>
      </div>
      <div className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60 text-gray-800 dark:text-gray-100 rounded-lg shadow-md my-5">
        <div className="font-semibold text-xl mb-3">
          Verified Documents{" "}
          <span className="font-light text-xs">
            ({rowData?.documents?.length} documents)
          </span>
        </div>
        <div className="flex gap-10">
          {rowData?.documents
            ?.filter((doc) => doc.verified) // Filter only verified documents
            .map((doc) => (
              <div className="flex gap-1.5" key={doc.docId}>
                <CheckCircleIcon className="-ml-0.5 h-5 w-5 text-green-600" />{" "}
                {convertToTitleCase(doc.documentKey)}
              </div>
            ))}
        </div>
      </div>
      {rowData?.refundActionDetailsList && (
        <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60 text-gray-800 dark:text-gray-100 rounded-lg shadow-md p-3 my-5">
          <div className="font-semibold text-xl mb-3">
            Refund Action History
          </div>
          {rowData?.refundActionDetailsList.map((action, index) => {
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
                sentence = `Refund has been ${convertToReadableString(
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
      <div className="w-full flex justify-end gap-2 px-5">
        <Button
          buttonName={"Download Refund Form"}
          onClick={() => handleRefundForm(rowData.refundProcessId)}
          buttonIcon={NewspaperIcon}
          buttonType="tertiary"
        />
        <Button
          buttonName={"View Documents"}
          onClick={() => handleViewDocuments(rowData.documents)}
          buttonIcon={FiInfo}
          buttonType="tertiary"
        />
        {roleName != "ROLE_LOAN_OFFICER" && (
          <>
            <Button
              buttonName={"Reject"}
              onClick={() => handleReject(rowData)}
              buttonIcon={FiXCircle}
              buttonType="destructive"
            />
            <Button
              buttonName={"Approve"}
              onClick={() => handleApprove(rowData)}
              buttonType="success"
              buttonIcon={FiCheckCircle}
            />
          </>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    const filteredApproveLoansDataFunction = () => {
      if (!approveRefund) return [];

      const filteredData = approveRefund.filter(
        (item) =>
          // Exclude object if any loanItem has recommendedBy or rejectedBy matching userData.username
          !item?.refundActionDetailsList?.some(
            (loanItem) =>
              loanItem?.recommendedBy === userData.username ||
              loanItem?.rejectedBy === userData.username
          )
      );

      return transformData(filteredData);
    };

    setFilteredApproveLoansData(filteredApproveLoansDataFunction());
  }, [approveRefund, roleName, userData]);

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile
        className={`p-5 md:flex justify-between gap-5 align-middle`}
      >
        <div className="w-full md:w-[45%] mb-2">
          <InputSelect
            labelName="Search By"
            inputName="palSearchBy"
            inputOptions={searchOptions}
            inputValue={palSearchBy}
            onChange={(e) => setPalSearchBy(e.target.value)}
            disabled={false}
            isValidation={true}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="palSearchValue"
            inputValue={palSearchValue}
            onChange={(e) => setPalSearchValue(e.target.value)}
            disabled={false}
            isValidation={true}
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
        data={filteredApproveLoansData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
        ListName="List of pending refunds"
        ListNameLength={approveRefundTotalElements}
      />
      <Pagination
        totalElements={approveRefundTotalElements}
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
      <ViewDocumentsModal
        isOpen={showDocumentsModal}
        onClose={closeViewDocumentModal}
        documents={documentsData}
        downloadDocumentFile={downloadDocumentFile}
        previewDocumentFile={previewDocumentFile}
      />
      {isViewPopupOpen && selectedBorrowerData && (
        <ViewBorrowerDetailsModal
          uid={selectedBorrowerData} // pass only the uid
          onClose={() => setIsViewPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default ApproveRefunds;
