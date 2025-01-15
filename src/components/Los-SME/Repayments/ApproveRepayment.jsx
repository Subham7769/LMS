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
} from "../../../redux/Slices/smeRepaymentsSlice";
import Pagination from "../../Common/Pagination/Pagination";

const ApproveRepayment = () => {
  const dispatch = useDispatch();
  const {
    approveRepaymentData,
    approveRepaymentTotalElements,
    loading,
    error,
  } = useSelector((state) => state.smeRepayments);
  const [searchTerm, setSearchTerm] = useState("");

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
    await dispatch(
      getRepayments({ pageSize: pageSize, pageNumber: 0 })
    ).unwrap();
  };

  const handleReject = async (transactionId) => {
    await dispatch(rejectRepayment({ transactionId })).unwrap();
    dispatch(getRepayments({ pageSize: pageSize, pageNumber: 0 }));
  };

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-3 md:grid-cols-[80%_20%] gap-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 py-5">
            {/* Additional Information */}
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Installment Id:
              </p>
              <p className="text-sm text-gray-600">{rowData.installmentId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">Request Id:</p>
              <p className="text-sm text-gray-600">{rowData.requestId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Transaction Id:
              </p>
              <p className="text-sm text-gray-600">{rowData.transactionId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Description:
              </p>
              <p className="text-sm text-gray-600">{rowData.description}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end flex-col gap-4 p-5">
          <Button
            buttonName={"Approve"}
            onClick={() => handleApprove(rowData.transactionId)}
            rectangle={true}
            className={`bg-green-700`}
          />
          <Button
            buttonName={"Reject"}
            onClick={() => handleReject(rowData.transactionId)}
            rectangle={true}
            className={`bg-red-600 text-white rounded-md hover:bg-red-700 `}
            disabled={rowData.approvalStatus === "No"}
          />
        </div>
      </div>
    </div>
  );
  console.log(filteredRepayments.length);

  // Filter Repayments Based on Search Value
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
    applyFilters(); // Apply filters
  };

  const handleResetSearchBy = () => {
    if (searchBy || searchValue) {
      setSearchBy("");
      setSearchValue("");
      setFilteredRepayments(approveRepaymentData); // Reset to original data
    } else {
      dispatch(getRepayments({ pageNumber: 0, pageSize: 10 }));
    }
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
        data={filteredRepayments}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
        error={error}
      />
      <Pagination
        totalElements={approveRepaymentTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
    </div>
  );
};

export default ApproveRepayment;
