import React from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
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
    applicationStatus: item.applicationStatus,
  }));
}

const LoanHistory = () => {
  const { loanHistory } = useSelector((state) => state.loans);

  const loanHistoryData = transformData(loanHistory);

  const columns = [
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrower" },
    { label: "Disbursed By", field: "disbursedBy" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
    { label: "Status", field: "applicationStatus" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-2 gap-4">
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
          <p className="text-sm text-gray-600">{rowData.numberOfTenure}</p>
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
          <p className="text-sm font-semibold text-gray-600">Loan Duration:</p>
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
  );

  return (
    <ExpandableTable
      columns={columns}
      data={loanHistoryData}
      renderExpandedRow={renderExpandedRow}
    />
  );
};

export default LoanHistory;
