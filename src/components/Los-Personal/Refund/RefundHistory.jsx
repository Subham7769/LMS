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
  CalendarDaysIcon,
  CheckCircleIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  UserIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import store from "../../../redux/store";
import ActionOption from "../../Common/ActionOptions/ActionOption";
import {
  getRefundHistoryByField,
  getRefundistory,
  uploadSignedRefundRequest,
} from "../../../redux/Slices/personalRefundSlice";
import calculateAging from "../../../utils/calculateAging";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    aging: calculateAging(item?.creationDate),
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

  const searchOptions = [
    { label: "Borrower Name", value: "borrowerName" },
    { label: "Loan ID", value: "loanId" },
    { label: "Unique ID", value: "uniqueID" },
    { label: "Refund Application ID", value: "refundApplicationId" },
  ];

  const columns = [
    {
      label: "Refund Application ID",
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
      <div className="text-sm text-gray-600 border-y-2 py-5 px-2">
        <div className="grid grid-cols-2 gap-4">
          {/* <CardInfo
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
          </CardInfo> */}
          <CardInfo
            cardIcon={CurrencyDollarIcon}
            cardTitle="Refund Information"
            className={"bg-white border-border-gray-primary border"}
            colorText={"text-blue-primary"}
          >
            <div className="grid grid-cols-2 border-b border-border-gray-primary pb-3 mb-3">
              <div>
                <div className="text-gray-500">Cause of Refund</div>
                <div className="font-semibold">{rowData?.causeOfRefund}</div>
              </div>
              <div>
                <div className="text-gray-500">Related PaySlip Month</div>
                <div className="font-semibold">
                  {rowData.relatedPaySlipMonth}
                </div>
              </div>
            </div>
          </CardInfo>
        </div>
        <div className="bg-white p-3 shadow-md border-border-gray-primary border rounded-md my-5">
          <div className="font-semibold text-xl mb-3">
            Verified Documents{" "}
            <span className="font-light text-xs">
              ({rowData?.documents?.filter((doc) => doc.verified).length}{" "}
              documents)
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
        {/* {rowData?.loanActionDetailsList && (
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
        )} */}
        <div className="flex justify-between items-end">
          {rowData.documents.some(
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
            <div>
              <ActionOption
                userNavigation={userNavigation}
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
        data={refundHistoryData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
      />
      {decodedUniqueID === "undefined" && (
        <Pagination
          totalElements={refundHistoryTotalElements}
          dispatcherFunction={dispatcherFunction}
          pageSize={pageSize}
        />
      )}
      <ViewDocumentsModal
        isOpen={showDocumentsModal}
        onClose={closeViewDocumentModal}
        documents={documentsData}
      />
    </div>
  );
};

export default RefundHistory;
