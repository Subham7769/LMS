import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../Common/Button/Button";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import InputFile from "../../Common/InputFile/InputFile";
import Pagination from "../../Common/Pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import CardInfo from "../../Common/CardInfo/CardInfo";
import ViewDocumentsModal from "../Loans/ViewDocumentsModal";
import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import store from "../../../redux/store";
import {
  getRefundHistoryByField,
  getRefundistory,
  uploadSignedRefundRequest,
} from "../../../redux/Slices/personalRefundSlice";
import calculateAging from "../../../utils/calculateAging";
import { convertDate } from "../../../utils/convertDate";
import convertToReadableString from "../../../utils/convertToReadableString";
import ViewBorrowerDetailsModal from "../Borrowers/ViewBorrowerDetailsModal";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    aging: calculateAging(item?.creationDate),
    status: convertToTitleCase(item?.status),
  }));
}

const RefundHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refundHistory, refundHistoryTotalElements, loading } = useSelector(
    (state) => state.personalRefund
  );
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);
  const [plhSearchValue, setPlhSearchValue] = useState("");
  const [plhSearchBy, setPlhSearchBy] = useState("");
  const [signedAgreement, setSignedAgreement] = useState("");
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [selectedBorrowerData, setSelectedBorrowerData] = useState(null);
  const { uniqueID } = useParams();
  // Pagination state
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  // Decode the BorrowerId to restore its original value
  const decodedUniqueID = decodeURIComponent(uniqueID);

  useEffect(() => {
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(getRefundistory({ page: currentPage, size: pageSize }));
  };

  const refundHistoryData = transformData(refundHistory);

  const handleSearch = async () => {
    await dispatch(
      validateForm({ plhSearchBy: plhSearchBy, plhSearchValue: plhSearchValue })
    );
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        getRefundHistoryByField({ field: plhSearchBy, value: plhSearchValue })
      );
    }
    // setPlhSearchBy("");
    // setPlhSearchValue("");
  };

  const handleReset = () => {
    setPlhSearchBy("");
    setPlhSearchValue("");
    setCurrentPage(0);
    dispatch(getRefundistory({ page: 0, size: pageSize }));
    navigate(`/loan/loan-origination-system/personal/refund/refund-history`);
  };

  const handleViewDocuments = (documents) => {
    setDocumentsData(documents);
    setDocumentsLoanModal(true);
  };

  const closeViewDocumentModal = () => {
    setDocumentsLoanModal(false);
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
    { label: "Loan ID", value: "loanId" },
    { label: "Unique ID", value: "uniqueID" },
    { label: "Refund Application ID", value: "refundApplicationId" },
  ];

  const columns = [
    {
      label: "Refund App. ID",
      field: "refundApplicationId",
      copy: true,
    },
    { label: "Borrower", field: "borrowerName" },
    { label: "Unique ID", field: "uniqueID" },
    { label: "Loan ID", field: "loanId", copy: true },
    { label: "Refund Amount", field: "refundAmount" },
    { label: "Status", field: "status" },
    { label: "Aging", field: "aging" },
  ];

  const handleFileChange = async (e, refundProcessId) => {
    const fileUploadParams = {
      refundProcessId: refundProcessId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    setSignedAgreement(e.target.value);
    const { files } = e.target;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);
      await dispatch(
        uploadSignedRefundRequest({ formData, fileUploadParams })
      ).unwrap();
      handleReset();
    }
  };

  const userNavigation = [
    {
      name: "Documents",
      action: (rowData) => handleViewDocuments(rowData.documents),
    },
  ];

  const renderExpandedRow = (rowData) => {
    return (
      <div className="border-y-2 dark:border-gray-500 py-5 px-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="shadow-md p-3 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60">
            <div className="flex justify-between items-baseline mb-3 text-sky-800 dark:text-sky-500">
              <div className="text-xl font-semibold flex gap-2 items-center">
                <UserCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
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
                <div className="font-semibold">
                  {rowData.relatedPaySlipMonth}
                </div>
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
        <div className="flex justify-between items-end">
          {rowData.documents.some(
            (doc) =>
              doc.documentKey === "SIGNED_LOAN_REFUND_REQUEST" && doc.verified
          ) ? (
            <div>&nbsp;</div>
          ) : (
            <div>
              <InputFile
                placeholder="Upload Signed Refund Request"
                inputName={"signedAgreement"}
                inputValue={signedAgreement}
                onChange={(e) => handleFileChange(e, rowData.refundProcessId)}
              />
            </div>
          )}
          <div className="flex justify-end gap-2 px-5">
            <div>
              {/* <ActionOption
                userNavigation={userNavigation}
                actionID={rowData}
                align={"right"}
              /> */}
              <Button
                buttonName={"Documents"}
                onClick={() => handleViewDocuments(rowData.documents)}
                buttonType="secondary"
              />
            </div>
          </div>
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
        data={refundHistoryData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
        ListName="List of all refunds"
        ListNameLength={refundHistoryTotalElements}
      />
      {decodedUniqueID === "undefined" && (
        <Pagination
          totalElements={refundHistoryTotalElements}
          dispatcherFunction={dispatcherFunction}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      <ViewDocumentsModal
        isOpen={showDocumentsModal}
        onClose={closeViewDocumentModal}
        documents={documentsData}
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

export default RefundHistory;
