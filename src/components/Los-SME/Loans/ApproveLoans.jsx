import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  approveLoan,
  getFullLoanDetails,
  getLoanAgreement,
  getLoansByField,
  getPendingLoans,
} from "../../../redux/Slices/smeLoansSlice";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import { useNavigate } from "react-router-dom";
import LoanRejectModal from "./LoanRejectModal";
import Pagination from "../../Common/Pagination/Pagination";
import { convertDate } from "../../../utils/convertDate";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import FullLoanDetailModal from "../../Los-Personal/FullLoanDetailModal";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import CardInfo from "../../Common/CardInfo/CardInfo";
import calculateAging from "../../../utils/calculateAging";
import ViewDocumentsModal from "./ViewDocumentsModal";
import convertToReadableString from "../../../utils/convertToReadableString";
import store from "../../../redux/store";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";

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
    useSelector((state) => state.smeLoans);
  const { userData, roleName } = useSelector((state) => state.auth);
  const [filteredApproveLoansData, setFilteredApproveLoansData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showDocumentsModal, setDocumentsLoanModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);
  const [salSearchValue, setSalSearchValue] = useState("");
  const [salSearchBy, setSalSearchBy] = useState("");
  const navigate = useNavigate();

  // Pagination state

  const [pageSize, setPageSize] = useState(10);

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

  const approveLoansData = transformData(approveLoans);

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
    dispatch(
      getPendingLoans({
        page: 0,
        size: 20,
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
  };

  const handleReject = async (rowData) => {
    setCurrentRowData(rowData);
    setShowModal(true); // Show modal
  };

  const closeRejectModal = () => {
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

      return approveLoans.filter(item =>
        // Exclude object if any loanItem has recommendedBy or rejectedBy matching userData.username
        !item?.loanActionDetailsList?.some(loanItem =>
          loanItem?.recommendedBy === userData.username || loanItem?.rejectedBy === userData.username
        )
      );
    };

    setFilteredApproveLoansData(filteredApproveLoansDataFunction());
  }, [approveLoans, roleName, userData]);

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
      <div className="bg-white p-3 shadow border-border-gray-primary border rounded-md my-5">
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
      <div className="w-full flex justify-end gap-2 px-5">
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
                rowData?.rolePermissions?.finalApprove ? "Approve" : "Recommend"
              }
              onClick={() => handleApprove(rowData)}
              rectangle={true}
              buttonIcon={FiCheckCircle}
            />
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile className={`flex justify-between gap-5 align-middle`}>
        <div className="w-[45%]">
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
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="salSearchValue"
            inputValue={salSearchValue}
            onChange={(e) => setSalSearchValue(e.target.value)}
            isValidation={true}
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
        data={filteredApproveLoansData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
      />
      <Pagination
        totalElements={approveLoansTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
      <LoanRejectModal
        isOpen={showModal}
        onClose={closeRejectModal}
        userDetails={currentRowData}
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
      />
    </div>
  );
};

export default ApproveLoans;
