import React from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
import { useSelector } from "react-redux";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    loanProduct: item.generalDetails.loanProduct,
    borrower: item.generalDetails.borrower,
    disbursedBy: item.generalDetails.disbursedBy,
    principalAmount: item.generalDetails.principalAmount,
    loanReleaseDate: item.generalDetails.loanReleaseDate,
    interestMethod: item.generalDetails.interestMethod,
    loanInterest: item.generalDetails.loanInterest,
    interestPer: item.generalDetails.interestPer,
    loanDuration: item.generalDetails.loanDuration,
    durationPer: item.generalDetails.durationPer,
    repaymentCycle: item.generalDetails.repaymentCycle,
    numberOfTenure: item.generalDetails.numberOfTenure,
    loanFiles: item.loanFiles,
  }));
}


const ApproveLoans = () => {
  const { approveLoans } = useSelector((state) => state.smeLoans);

  const approveLoansData = transformData(approveLoans);

  const columns = [
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrower" },
    { label: "Disbursed By", field: "disbursedBy" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
  ];
  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-3 md:grid-cols-[80%_20%] gap-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 py-5">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Interest Method:
              </p>
              <p className="text-sm text-gray-600">{rowData.interestMethod}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Repayment Cycle:
              </p>
              <p className="text-sm text-gray-600">{rowData.repaymentCycle}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Number of Tenure:
              </p>
              <p className="text-sm text-gray-600">
                {rowData.numberOfTenure}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Loan Interest %:
              </p>
              <p className="text-sm text-gray-600">{rowData.loanInterest}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Per (Loan Interest):
              </p>
              <p className="text-sm text-gray-600">{rowData.interestPer}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Loan Duration:
              </p>
              <p className="text-sm text-gray-600">{rowData.loanDuration}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Per (Loan Duration):
              </p>
              <p className="text-sm text-gray-600">{rowData.durationPer}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end  flex-col gap-4 p-5">
          <button
            onClick={() => handleApprove(rowData.loanProduct)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={rowData.approvalStatus === "Yes"}
          >
            <FiCheckCircle className="mr-2" />
            Approve
          </button>
          <button
            onClick={() => handleReject(rowData.loanProduct)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            disabled={rowData.approvalStatus === "No"}
          >
            <FiXCircle className="mr-2" />
            Reject
          </button>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => window.alert("PDF viewer would open here")}
          >
            <FiDownload className="mr-2" />
            View PDF
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ExpandableTable
      columns={columns}
      data={approveLoansData}
      renderExpandedRow={renderExpandedRow}
    />
  );
};

export default ApproveLoans;
