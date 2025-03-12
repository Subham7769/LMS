import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector, useDispatch } from "react-redux";
import {
  getFullLoanDetails,
  getLoanHistory,
  getLoanHistoryByField,
  getLoanAgreement,
} from "../../../redux/Slices/smeLoansSlice";
import Button from "../../Common/Button/Button";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import InputFile from "../../Common/InputFile/InputFile";
import Pagination from "../../Common/Pagination/Pagination";
import FullLoanDetailModal from "../../Los-Personal/FullLoanDetailModal";
import { convertDate } from "../../../utils/convertDate";
import { useNavigate } from "react-router-dom";
import CardInfo from "../../Common/CardInfo/CardInfo";
import ViewDocumentsModal from "./ViewDocumentsModal";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { FiInfo } from "react-icons/fi";
import convertToReadableString from "../../../utils/convertToReadableString";
import { uploadSignedLoanAgreement } from "../../../redux/Slices/personalLoansSlice";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    loanProduct: convertToTitleCase(item?.loanProductName),
    loanReleaseDate: convertDate(item?.loanReleaseDate),
  }));
}

const LoanHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loanHistory, loading, loanHistoryTotalElements, fullLoanDetails } =
    useSelector((state) => state.smeLoans);
  const [showModal, setShowModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [documentsData, setDocumentsData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [signedAgreement, setSignedAgreement] = useState("");

  // Pagination state
  const [pageSize, setPageSize] = useState(10);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(getLoanHistory({ page: currentPage, size: pageSize }));
  };

  const loanHistoryData = transformData(loanHistory);

  const handleSearch = () => {
    dispatch(getLoanHistoryByField({ field: searchBy, value: searchValue }));
    // setSearchBy("");
    // setSearchValue("");
  };

  const handleReset = () => {
    setSearchBy("");
    setSearchValue("");
    dispatch(getLoanHistory({ page: 0, size: pageSize }));
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
    navigate(
      `/loan/loan-origination-system/sme/loans/loan-agreement/${loanId}/${uid}`
    );
    await dispatch(getLoanAgreement({ loanId, uid })).unwrap();
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

  const renderExpandedRow = (rowData) => (
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
      {rowData?.loanActionDetailsList && (
        <div className="bg-white p-3 shadow rounded-md my-5 border-border-gray-primary border">
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
      <div className="flex justify-between items-end">
        {rowData.verifiedDocuments.documentKey === "SIGNED_LOAN_AGREEMENT" ? (
          <div>
            <InputFile
              placeholder="Upload Signed Agreement"
              inputName={"signedAgreement"}
              inputValue={signedAgreement}
              onChange={(e) => handleFileChange(e, rowData.loanId)}
            />
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
        <div className="flex justify-end gap-2 px-5">
          <div>
            <Button
              buttonName={"View Loan Agreement"}
              onClick={() => handleLoanAgreement(rowData.loanId, rowData.uid)}
              rectangle={true}
              buttonIcon={NewspaperIcon}
              buttonType="tertiary"
            />
          </div>
          <div>
            <Button
              buttonName={"View Documents"}
              onClick={() => handleViewDocuments(rowData.verifiedDocuments)}
              rectangle={true}
              buttonIcon={FiInfo}
              buttonType="tertiary"
            />
          </div>
        </div>
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
            disabled={false}
          />
        </div>
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
            disabled={false}
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
      <Pagination
        totalElements={loanHistoryTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
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
