import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { loanOfficer, ApproveRepaymentColumns } from "../../../data/LosData";
import { useDispatch, useSelector } from "react-redux";
import {
  getRepayments,
  approveRepayment,
  rejectRepayment,
} from "../../../redux/Slices/personalRepaymentsSlice";

const ApproveRepayment = () => {
  const dispatch = useDispatch();
  const { approveRepaymentData,loading, error } = useSelector(
    (state) => state.personalRepayments
  );

useEffect(()=>{
  if (approveRepaymentData.length < 1) {
    dispatch(getRepayments({ pageSize : 10, pageNumber : 0}));
  }
},[dispatch])

  const handleApprove = (transactionId) => {
    dispatch(approveRepayment({ transactionId })).unwrap()
    dispatch(getRepayments({ pageSize : 10, pageNumber : 0}))
  };
  const handleReject = (transactionId) => {
    dispatch(rejectRepayment({ transactionId })).unwrap()
    dispatch(getRepayments({ pageSize : 10, pageNumber : 0}))
  };
  const [allStaff, setAllStaff] = useState("");

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
        <div className="w-[80%]">
        <InputSelect
          labelName="All Staff"
          inputName="allStaff"
          inputOptions={loanOfficer}
          inputValue={allStaff}
          onChange={(e) => setAllStaff(e.target.value)}
        />

        </div>
        <div className="flex gap-5 justify-end">
          <Button
            buttonName={"Search"}
            onClick={() => {}}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
          <Button
            buttonName={"Reset"}
            onClick={() => {}}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
        </div>
      </ContainerTile>

      <ExpandableTable
        columns={ApproveRepaymentColumns}
        data={approveRepaymentData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ApproveRepayment;
