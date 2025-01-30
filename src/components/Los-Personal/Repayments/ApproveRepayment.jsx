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
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import FullLoanDetailModal from "../FullLoanDetailModal";
import { convertDate } from "../../../utils/convertDate";
import CardInfo from "../../Common/CardInfo/CardInfo";
import calculateAging from "../../../utils/calculateAging";


function transformData(inputArray) {
  return inputArray.map((item) => ({
    ...item,
    collectionDate: convertDate(item?.collectionDate),
    aging: calculateAging(item?.loanCreationDate),
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
  const loading2 = useSelector((state) => state.personalLoans.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoanModal, setShowLoanModal] = useState(false);
  // Pagination state & Functionality
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [filteredRepayments, setFilteredRepayments] = useState([]);

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
    <div className="text-sm text-gray-600 border-y-2 py-5">
      <div className="grid grid-cols-3 gap-4">
        <CardInfo
          cardTitle="Payment Details"
          className={"bg-white border-gray-300 border"}
          cardIcon={CurrencyDollarIcon}
          color={"blue"}
        >
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">Loan Product</div>
            <div className="font-semibold">{rowData.description}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">Transaction ID</div>
            <div className="flex">
              <div className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-[100px]">
                {rowData.transactionId}
              </div>
              <ClipboardDocumentListIcon
                onClick={() => copyToClipboard(rowData.transactionId)}
                className="-ml-0.5 h-5 w-5 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">Original Loan Amount</div>
            <div className="font-semibold">{rowData.originalLoanAmount}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">Outstanding Balance</div>
            <div className="font-semibold">{rowData.outstandingBalance}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">Due Date</div>
            <div className="font-semibold">{rowData.dueDate}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">Status</div>
            <div className="text-xs bg-black text-white py-1 px-2 rounded">
              {rowData.status}
            </div>
          </div>
        </CardInfo>
        <CardInfo
          cardTitle="Borrower Profile"
          className={"bg-white border-gray-300 border"}
          cardIcon={UserIcon}
          color={"blue"}
        >
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">Name</div>
            <div className="text-gray-700">{rowData.borrowerProfile.name}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">User ID</div>
            <div className="text-gray-700">{rowData.userId}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">Email</div>
            <div className="text-gray-700">{rowData.borrowerProfile.email}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-gray-500">Phone</div>
            <div className="text-gray-700">{rowData.borrowerProfile.phone}</div>
          </div>
        </CardInfo>
        <CardInfo
          cardTitle="Recent Payments"
          className={"bg-white border-gray-300 border"}
          cardIcon={ClockIcon}
          color={"blue"}
        >
          {rowData.paymentsData.map((payment) => (
            <div className="flex justify-between mb-2 border-b border-gray-300 pb-3">
              <div>
                <div className="text-black font-semibold">
                  {payment.paymentDate}
                </div>
                <div className="font-light">{payment.paymentType}</div>
              </div>
              <div className="text-right">
                <div className="text-black font-semibold">
                  {payment.paymentAmount}
                </div>
                <div className="border border-gray-200 rounded shadow py-1 px-2 text-xs text-black">
                  {payment.paymentStatus}
                </div>
              </div>
            </div>
          ))}
        </CardInfo>
      </div>
      <div className="w-full flex justify-end gap-2 px-5 mt-5">
        <button
          onClick={() => handleFullLoanDetails(rowData.loan, rowData.userId)}
          className="flex gap-x-1.5 items-center px-2.5 py-2 bg-white shadow-md text-blue-600 rounded-md hover:shadow transition-colors"
        >
          <CalendarDaysIcon className="-ml-0.5 h-5 w-5" />
          View EMI Schedule
        </button>
        <button
          onClick={() => handleReject(rowData.transactionId)}
          className="flex gap-x-1.5 items-center px-2.5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <FiXCircle className="-ml-0.5 h-5 w-5" />
          Reject
        </button>
        <button
          onClick={() => handleApprove(rowData.transactionId)}
          className="flex gap-x-1.5 items-center px-2.5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          <FiCheckCircle className="-ml-0.5 h-5 w-5" />
          Approve
        </button>
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
          />
        </div>
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => handleSearchFilter(e.target.value)}
            required
          />
        </div>

        <div className="flex align-middle gap-5">
          <Button
            buttonName={"Search"}
            onClick={SearchRepaymentByFieldSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
          <Button
            buttonName={"Reset"}
            onClick={handleResetSearchBy}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
        </div>
      </ContainerTile>

      <ExpandableTable
        columns={ApproveRepaymentColumns}
        data={transformedRepaymentData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
        error={error}
      />
      <Pagination
        totalElements={approveRepaymentTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
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
