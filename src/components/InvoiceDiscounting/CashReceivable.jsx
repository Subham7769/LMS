import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiDownload, FiCheckCircle, FiXCircle } from "react-icons/fi";

const CashReceivable = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [invoices, setInvoices] = useState([
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
    }
  ]);

  const handleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleApprove = (id) => {
    setInvoices(invoices.map(invoice =>
      invoice.applicationId === id ? { ...invoice, approvalStatus: "Yes" } : invoice
    ));
  };

  const handleReject = (id) => {
    setInvoices(invoices.map(invoice =>
      invoice.applicationId === id ? { ...invoice, approvalStatus: "No" } : invoice
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cash Receivable Management</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto" role="table">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Application ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Upload Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Company Name</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <React.Fragment key={invoice.applicationId}>
                <tr className="border-b hover:bg-gray-50 transition-colors" onClick={() => handleExpand(invoice.applicationId)}>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleExpand(invoice.applicationId)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      aria-label={expandedRow === invoice.applicationId ? "Collapse row" : "Expand row"}
                    >
                      {expandedRow === invoice.applicationId ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.applicationId}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.applicationUploadDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${invoice.applicationStatus === "rejected" ? "bg-red-100 text-red-800" : invoice.applicationStatus === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                    >
                      {invoice.applicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">${parseFloat(invoice.invoiceAmount).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.companyName}</td>
                </tr>
                {expandedRow === invoice.applicationId && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="px-6 py-4">
                    <div className="grid grid-cols-3 md:grid-cols-[80%_20%] gap-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-800">Invoice Details</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-gray-600">Company ID:</p>
                              <p className="text-sm text-gray-600">{invoice.companyId}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-gray-600">Due Date:</p>
                              <p className="text-sm text-gray-600">{invoice.applicationDueDate}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-gray-600">Days Left:</p>
                              <p className="text-sm text-gray-600">{invoice.daysLeftFromDueDate}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-gray-600">Approval Status:</p>
                              <p className="text-sm text-gray-600">{invoice.approvalStatus}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-gray-600">Payment Status:</p>
                              <p className="text-sm text-gray-600">{invoice.paymentStatus}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-gray-600">Financed Amount:</p>
                              <p className="text-sm text-gray-600">{invoice.financedAmount}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-gray-600">Net Outstanding:</p>
                              <p className="text-sm text-gray-600">{invoice.netOutstanding}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-gray-600">Interest Due:</p>
                              <p className="text-sm text-gray-600">{invoice.interestDue}</p>
                            </div>
                          </div>

                        </div>
                        <div className="space-y-4">
                          <div className="w-full self-end flex justify-end  flex-col gap-5 p-5">
                            <button
                              onClick={() => handleApprove(invoice.applicationId)}
                              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                              disabled={invoice.approvalStatus === "Yes"}
                            >
                              <FiCheckCircle className="mr-2" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(invoice.applicationId)}
                              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                              disabled={invoice.approvalStatus === "No"}
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
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>

    </div>
  );
};

export default CashReceivable;
