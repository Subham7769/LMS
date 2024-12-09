import React from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";

const LoanHistory = () => {
  const applications = [
    {
      loanId: "INV001",
      applicationUploadDate: "2024-11-15",
      applicationDueDate: "2024-12-15",
      applicationStatus: "rejected",
      loanAmount: "50000",
      companyName: "ABC Corp",
      companyId: "C001",
      daysLeftFromDueDate: "30",
      approvalStatus: "No",
      paymentStatus: "Unpaid",
      financedAmount: "0",
      netOutstanding: "50000",
      interestDue: "0",
      file: "invoice1.pdf",
    },
    {
      loanId: "INV002",
      applicationUploadDate: "2024-11-10",
      applicationDueDate: "2024-12-10",
      applicationStatus: "Approved",
      loanAmount: "30000",
      companyName: "XYZ Ltd",
      companyId: "C002",
      daysLeftFromDueDate: "25",
      approvalStatus: "No",
      paymentStatus: "Unpaid",
      financedAmount: "0",
      netOutstanding: "30000",
      interestDue: "0",
      file: "invoice2.pdf",
    },
    {
      loanId: "INV003",
      applicationUploadDate: "2024-11-19",
      applicationDueDate: "2024-12-21",
      applicationStatus: "Approved",
      loanAmount: "38000",
      companyName: "QWERTY Ltd",
      companyId: "C056",
      daysLeftFromDueDate: "53",
      approvalStatus: "No",
      paymentStatus: "Unpaid",
      financedAmount: "0",
      netOutstanding: "38000",
      interestDue: "12",
      file: "invoice3.pdf",
    },
  ];

  const columns = [
    { label: "Company Name", field: "companyName" },
    { label: "Company Id", field: "companyId" },
    { label: "Loan Id", field: "loanId" },
    { label: "Date", field: "applicationUploadDate" },
    { label: "Amount", field: "loanAmount" },
    { label: "Status", field: "applicationStatus"},
  ];

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between">
          <p className="font-semibold">Financed Amount:</p>
          <p>{rowData.financedAmount}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Due Date:</p>
          <p>{rowData.applicationDueDate}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Days Left:</p>
          <p>{rowData.daysLeftFromDueDate}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Approval Status:</p>
          <p>{rowData.applicationStatus}</p>
        </div>
      </div>
    </div>
  );

  return (
    <ExpandableTable
      columns={columns}
      data={applications}
      renderExpandedRow={renderExpandedRow}
    />
  );
};

export default LoanHistory;
