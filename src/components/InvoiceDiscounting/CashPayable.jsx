import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";

const CashPayable = () => {
  const [invoices, setInvoices] = useState([
    {
      applicationId: "APP001",
      invoiceId: "INV001",
      applicationUploadDate: "2024-11-15",
      applicationDueDate: "2024-12-15",
      applicationStatus: "rejected",
      invoiceDiscountingStatus: "Yes",
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
      applicationId: "APP002",
      invoiceId: "INV002",
      applicationUploadDate: "2024-11-10",
      applicationDueDate: "2024-12-10",
      applicationStatus: "Pending",
      invoiceDiscountingStatus: "No",
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
  ]);

  const handleApprove = (id) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.applicationId === id
          ? { ...invoice, approvalStatus: "Yes" }
          : invoice
      )
    );
  };

  const handleReject = (id) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.applicationId === id
          ? { ...invoice, approvalStatus: "No" }
          : invoice
      )
    );
  };

  const columns = [
    { label: "Company Name", field: "companyName" },
    { label: "Application ID", field: "applicationId" },
    { label: "Upload Date", field: "applicationUploadDate" },
    { label: "Amount", field: "invoiceAmount" },
    { label: "Status", field: "applicationStatus" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-3 md:grid-cols-[80%_20%] gap-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 py-5">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">Company ID:</p>
              <p className="text-sm text-gray-600">{rowData.companyId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">Due Date:</p>
              <p className="text-sm text-gray-600">
                {rowData.applicationDueDate}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">Days Left:</p>
              <p className="text-sm text-gray-600">
                {rowData.daysLeftFromDueDate}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Approval Status:
              </p>
              <p className="text-sm text-gray-600">{rowData.approvalStatus}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Payment Status:
              </p>
              <p className="text-sm text-gray-600">{rowData.paymentStatus}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Financed Amount:
              </p>
              <p className="text-sm text-gray-600">{rowData.financedAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Net Outstanding:
              </p>
              <p className="text-sm text-gray-600">{rowData.netOutstanding}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Interest Due:
              </p>
              <p className="text-sm text-gray-600">{rowData.interestDue}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end  flex-col gap-4 p-5">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Cash Payable Management
          </h1>

          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <ExpandableTable
              columns={columns}
              data={invoices}
              renderExpandedRow={renderExpandedRow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashPayable;
