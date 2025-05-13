import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import { ApproveRepaymentColumns } from "../../../data/LosData";
import { useDispatch, useSelector } from "react-redux";
import {
  getRepayments,
  approveRepayment,
  rejectRepayment,
  fetchRepaymentByField,
} from "../../../redux/Slices/personalRepaymentsSlice";
import { getFullLoanDetails } from "../../../redux/Slices/personalLoansSlice";
import Pagination from "../../Common/Pagination/Pagination";
import {
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ClockIcon,
  CalendarDaysIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import FullLoanDetailModal from "../FullLoanDetailModal";
import { convertDate } from "../../../utils/convertDate";
import CardInfo from "../../Common/CardInfo/CardInfo";
import calculateAging from "../../../utils/calculateAging";
import { EditorRolesApproveRepayment } from "../../../data/RoleBasedAccessAndView";
import { AccessChecker } from "../../../utils/AccessChecker";
import exportToExcel from "../../../utils/exportToExcel";
import convertToTitleCase from "../../../utils/convertToTitleCase";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    collectionDate: convertDate(item?.collectionDate),
    aging: calculateAging(item?.collectionDate),
    method: convertToTitleCase(item?.method),
  }));
}

const ApproveRepayment = () => {
  const dispatch = useDispatch();
  const {
    approveRepaymentData,
    approveRepaymentTotalElements,
    loading,
    error,
  } = useSelector((state) => state.personalRepayments);
  const { fullLoanDetails } = useSelector((state) => state.personalLoans);
  const { roleName } = useSelector((state) => state.auth);
  const loading2 = useSelector((state) => state.personalLoans.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoanModal, setShowLoanModal] = useState(false);
  // Pagination state & Functionality
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [filteredRepayments, setFilteredRepayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(getRepayments({ pageNumber: currentPage, pageSize: pageSize }));
  };

  useEffect(() => {
    setFilteredRepayments(approveRepaymentData);
  }, [approveRepaymentData]);

  useEffect(() => {
    const updatedRepayments = approveRepaymentData.filter((repayment) =>
      [
        repayment.userId,
        repayment.loan,
        repayment.collectionBy,
        repayment.accounting,
        repayment.method,
        repayment.transactionId,
        repayment.installmentId,
        repayment.requestId,
      ].some(
        (field) =>
          field &&
          field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRepayments(updatedRepayments);
  }, [searchTerm, approveRepaymentData]);

  const handleApprove = async (transactionId) => {
    await dispatch(approveRepayment({ transactionId })).unwrap();
    dispatch(getRepayments({ pageSize: pageSize, pageNumber: 0 }));
  };

  const handleReject = async (transactionId) => {
    await dispatch(rejectRepayment({ transactionId })).unwrap();
    dispatch(getRepayments({ pageSize: pageSize, pageNumber: 0 }));
  };

  const transformedRepaymentData = transformData(filteredRepayments);

  const copyToClipboard = async (transactionId) => {
    try {
      await navigator.clipboard.writeText(transactionId);
      toast.success("ID was copied successfully!");
    } catch (err) {
      toast.error("The ID was not copied!");
    }
  };

  const renderExpandedRow = (rowData) => (
    <div className="text-sm border-y-2 dark:border-gray-600 py-5">
      <div className="grid grid-cols-3 gap-4">
        <CardInfo
          cardTitle="Payment Details"
          className={
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60"
          }
          cardIcon={CurrencyDollarIcon}
          colorText={"text-sky-800 dark:text-sky-500"}
        >
          <div className="text-gray-800 dark:text-gray-100">
            <div className="flex justify-between mb-2">
              <div className="">Loan Product</div>
              <div className="font-semibold">{rowData?.description}</div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Transaction ID</div>
              <div className="flex">
                <div className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-[100px]">
                  {rowData?.transactionId}
                </div>
                <ClipboardDocumentListIcon
                  onClick={() => copyToClipboard(rowData?.transactionId)}
                  className="-ml-0.5 h-5 w-5 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Original Loan Amount</div>
              <div className="font-semibold">{rowData?.originalLoanAmount}</div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Outstanding Balance</div>
              <div className="font-semibold">
                {rowData?.outstandingBalance?.toFixed(2)}
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Due Date</div>
              <div className="font-semibold">
                {convertDate(rowData?.dueDate)}
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Status</div>
              <div className="text-xs bg-gray-900 dark:bg-gray-500 text-white py-1 px-2 rounded">
                {rowData?.status}
              </div>
            </div>
          </div>
        </CardInfo>
        <CardInfo
          cardTitle="Borrower Profile"
          className={
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60"
          }
          cardIcon={UserIcon}
          colorText={"text-sky-800 dark:text-sky-500"}
        >
          <div className="text-gray-800 dark:text-gray-100">
            <div className="flex justify-between mb-2">
              <div className="">Name</div>
              <div className="font-semibold">
                {rowData?.borrowerProfile?.name}
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">User ID</div>
              <div className="font-semibold">{rowData?.userId}</div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Email</div>
              <div className="font-semibold">
                {rowData?.borrowerProfile?.email}
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Phone</div>
              <div className="font-semibold">
                {rowData?.borrowerProfile?.phone}
              </div>
            </div>
          </div>
        </CardInfo>
        <CardInfo
          cardTitle="Recent Payments"
          className={
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700/60"
          }
          cardIcon={ClockIcon}
          colorText={"text-sky-800 dark:text-sky-500"}
        >
          {rowData.paymentsData.slice(-3).map((payment) => (
            <div className="flex justify-between mb-2 border-b border-gray-300 pb-3 text-gray-800 dark:text-gray-100">
              <div>
                <div className="font-semibold">
                  {convertDate(payment.paymentDate)}
                </div>
                <div className="font-light">{payment.paymentType}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {payment.paymentAmount}
                </div>
                <div className="border border-gray-200 rounded shadow py-1 px-2 text-xs">
                  {payment.paymentStatus}
                </div>
              </div>
            </div>
          ))}
        </CardInfo>
      </div>
      <div className="w-full flex justify-end gap-2 px-5 mt-5">
        <Button
          buttonName={"View EMI Schedule"}
          onClick={() => handleFullLoanDetails(rowData.loan, rowData.userId)}
          rectangle={true}
          buttonIcon={CalendarDaysIcon}
          buttonType="tertiary"
        />

        {AccessChecker(EditorRolesApproveRepayment, roleName) && (
          <>
            <Button
              buttonName={"Reject"}
              onClick={() => handleReject(rowData.transactionId)}
              buttonIcon={FiXCircle}
              buttonType="destructive"
            />
            <Button
              buttonName={"Approve"}
              onClick={() => handleApprove(rowData.transactionId)}
              buttonIcon={FiCheckCircle}
              buttonType="success"
            />
          </>
        )}
      </div>
    </div>
  );

  const applyFilters = () => {
    const filtered = approveRepaymentData.filter((repayment) => {
      let matchesSearchValue = "";
      if (searchBy) {
        matchesSearchValue = searchValue
          ? repayment[searchBy]
            ?.toLowerCase()
            .includes(searchValue.toLowerCase())
          : true;
      } else {
        matchesSearchValue = searchValue
          ? [
            repayment.userId,
            repayment.loan,
            repayment.collectionBy,
            repayment.accounting,
            repayment.method,
            repayment.transactionId,
            repayment.installmentId,
            repayment.requestId,
          ].some((field) =>
            field?.toLowerCase().includes(searchValue.toLowerCase())
          )
          : true;
      }

      return matchesSearchValue;
    });

    setFilteredRepayments(filtered);
  };

  // Trigger Filtering on Search Value Change
  useEffect(() => {
    applyFilters();
  }, [searchValue]);

  const handleSearchFilter = (term) => {
    setSearchValue(term);
  };

  const handleResetSearchBy = () => {
    setSearchBy("");
    setSearchValue("");
    setCurrentPage(0);
    dispatch(getRepayments({ pageNumber: 0, pageSize: 20 }));
    
  };

  const handleFullLoanDetails = async (loanId, uid) => {
    setShowLoanModal(true);
    await dispatch(getFullLoanDetails({ loanId, uid })).unwrap();
  };

  const closeFullLoanDetailModal = () => {
    setShowLoanModal(false);
  };

  const searchOptions = [
    { label: "User Id", value: "userId" },
    { label: "Loan Id", value: "loan" },
    { label: "Collection By", value: "collectionBy" },
    { label: "Accounting", value: "accounting" },
    { label: "Method", value: "method" },
    { label: "Transaction Id", value: "transactionId" },
    { label: "Installment Id", value: "installmentId" },
    { label: "Request Id", value: "requestId" },
  ];

  const SearchRepaymentByFieldSearch = () => {
    dispatch(fetchRepaymentByField({ field: searchBy, value: searchValue }));
    setSearchBy("");
    setSearchValue("");
  };

    // Define the mapping for repayment data excel file fields
    const repaymentMapping = {
      amount: "Amount",
      collectionDate: "Collection Date",
      "borrowerProfile.userId": "User ID",
      loan: "Loan Id",
      collectionBy: "Collected By",
      method: "Method",
      accounting: "Accounting",
    };

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile
        className={`p-5 md:flex justify-between gap-5 align-middle`}
      >
        <div className="w-full md:w-[45%] mb-2">
          <InputSelect
            labelName="Search By"
            inputName="searchBy"
            inputOptions={searchOptions}
            inputValue={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            disabled={false}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => handleSearchFilter(e.target.value)}
            required
            disabled={false}
          />
        </div>

        <div className="flex align-middle gap-5 justify-end">
          <Button
            buttonName={"Search"}
            onClick={SearchRepaymentByFieldSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
            buttonType="secondary"
          />
          <Button
            buttonName={"Reset"}
            onClick={handleResetSearchBy}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
            buttonType="tertiary"
          />
        </div>
      </ContainerTile>
      {approveRepaymentData.length > 0 && (
        <div className="flex justify-end">
          <Button
            buttonName={"Export Excel"}
            onClick={() =>
              exportToExcel(
                approveRepaymentData,
                repaymentMapping,
                "Repayment_Data.xlsx"
              )
            }
            rectangle={true}
            buttonIcon={DocumentArrowDownIcon}
            // buttonType="tertiary"
          />
        </div>
      )}

      <ExpandableTable
        columns={ApproveRepaymentColumns}
        data={transformedRepaymentData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
        ListName="List of pending repayments"
        ListNameLength={approveRepaymentTotalElements}
      />
      <Pagination
        totalElements={approveRepaymentTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <FullLoanDetailModal
        isOpen={showLoanModal}
        onClose={closeFullLoanDetailModal}
        loanDetails={fullLoanDetails}
        loading={loading2}
      />
    </div>
  );
};

export default ApproveRepayment;
