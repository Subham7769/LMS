import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import { loanOfficer, ApproveRepaymentColumns } from "../../../data/LosData";
import { useDispatch, useSelector } from "react-redux";
import {
  getRepayments,
  approveRepayment,
  rejectRepayment,
} from "../../../redux/Slices/personalRepaymentsSlice";
import Pagination from "../../Common/Pagination/Pagination";


const ApproveRepayment = () => {
  const dispatch = useDispatch();
  const { approveRepaymentData,approveRepaymentTotalElements, loading, error } = useSelector(
    (state) => state.personalRepayments
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepayments, setFilteredRepayments] =useState(approveRepaymentData);

  // Pagination state & Functionality
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(getRepayments({ pageSize: pageSize, pageNumber: currentPage }));
  }, [dispatch, currentPage, pageSize]);

    useEffect(() => {
        if (approveRepaymentTotalElements) {
          setTotalPages(Math.ceil(approveRepaymentTotalElements / pageSize));
        }
      }, [approveRepaymentTotalElements, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const updatedRepayments = approveRepaymentData.filter((item) =>
      [
        item.amount,
        item.userId,
        item.method,
        item.collectionBy,
        item.accounting,
      ].some(
        (field) =>
          field &&
          field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRepayments(updatedRepayments);
  }, [searchTerm, approveRepaymentData]);

  const handleApprove = (transactionId) => {
    dispatch(approveRepayment({ transactionId })).unwrap();
    dispatch(getRepayments({ pageSize: 10, pageNumber: 0 }));
  };

  const handleReject = (transactionId) => {
    dispatch(rejectRepayment({ transactionId })).unwrap();
    dispatch(getRepayments({ pageSize: 10, pageNumber: 0 }));
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

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile className={`flex justify-between gap-5 align-middle`}>
        <div className="w-[95%]">
          {/* <InputSelect
            labelName="All Staff"
            inputName="allStaff"
            inputOptions={loanOfficer}
            inputValue={allStaff}
            onChange={(e) => setAllStaff(e.target.value)}
          /> */}
          <InputText
            labelName={"Search"}
            inputName={"searchTerm"}
            inputValue={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeHolder={`Enter Collected By, Method, Accounting,User Id,Amount`}
          />
        </div>
        <div className="flex gap-5 justify-end">
          {/* <Button
            buttonName={"Search"}
            onClick={() => {}}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          /> */}
          <Button
            buttonName={"Reset"}
            onClick={() => setSearchTerm("")}
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ApproveRepayment;
