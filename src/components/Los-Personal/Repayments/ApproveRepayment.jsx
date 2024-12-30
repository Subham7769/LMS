import React, { useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { loanOfficer, ApproveRepaymentColumns } from "../../../data/LosData";
import { useDispatch, useSelector } from "react-redux";

const ApproveRepayment = () => {
  const dispatch = useDispatch();
  const { approveRepaymentData } = useSelector(
    (state) => state.personalRepayments
  );
  const [allStaff, setAllStaff] = useState("");

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-3 md:grid-cols-[80%_20%] gap-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 py-5">
            {/* Additional Information */}
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Payment Reference:
              </p>
              <p className="text-sm text-gray-600">
                {rowData.paymentReference}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">Remarks:</p>
              <p className="text-sm text-gray-600">{rowData.remarks}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">Contact:</p>
              <p className="text-sm text-gray-600">{rowData.contact}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end flex-col gap-4 p-5">
          <button
            onClick={() => handleApprove(rowData.applicationId)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={rowData.approvalStatus === "Yes"}
          >
            <FiCheckCircle className="mr-2" />
            Approve
          </button>
          <button
            onClick={() => handleReject(rowData.applicationId)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            disabled={rowData.approvalStatus === "No"}
          >
            <FiXCircle className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile className={`grid grid-cols-[85%_15%] gap-5`}>
        <InputSelect
          labelName="All Staff"
          inputName="allStaff"
          inputOptions={loanOfficer}
          inputValue={allStaff}
          onChange={(e) => setAllStaff(e.target.value)}
        />
        <div className="flex gap-5">
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
      />
    </div>
  );
};

export default ApproveRepayment;
