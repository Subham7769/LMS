import React from "react";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";
import PrintView from "../Common/PrintView/PrintView";

const ApplicationsTable = () => {
  const applications = [
    {
      applicationId: "INV001",
      applicationUploadDate: "2024-11-15",
      applicationDueDate: "2024-12-15",
      applicationStatus: "rejected",
      invoiceAmount: "50000",
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
      applicationId: "INV002",
      applicationUploadDate: "2024-11-10",
      applicationDueDate: "2024-12-10",
      applicationStatus: "Pending",
      invoiceAmount: "30000",
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
      applicationId: "INV003",
      applicationUploadDate: "2024-11-19",
      applicationDueDate: "2024-12-21",
      applicationStatus: "Approved",
      invoiceAmount: "38000",
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
    { label: "Invoice Id", field: "applicationId" },
    { label: "Date", field: "applicationUploadDate" },
    { label: "Amount", field: "invoiceAmount" },
    { label: "Status", field: "applicationStatus", bg: "bg-slate-400" },
    { label: "Company Name", field: "companyName" },
    { label: "Company Id", field: "companyId" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <h3 className="font-semibold text-gray-800">Invoice Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between">
          <p className="font-semibold">Company ID:</p>
          <p>{rowData.companyId}</p>
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
    <PrintView>
      <ExpandableTable
        columns={columns}
        data={applications}
        renderExpandedRow={renderExpandedRow}
      />
    </PrintView>
  );
};

export default ApplicationsTable;
