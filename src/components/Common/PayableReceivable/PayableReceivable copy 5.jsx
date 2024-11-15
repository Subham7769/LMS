import React, { useState } from "react";
import { FiDownload, FiEye, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { MdOutlineApproval, MdOutlineCancel } from "react-icons/md";

const InvoiceDashboard = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const dummyInvoices = [
    {
      id: "INV-2024-001",
      invoiceDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "pending",
      amount: 2500.00,
      company: "Tech Solutions Inc.",
      items: [
        { description: "Web Development Services", amount: 1500.00 },
        { description: "UI/UX Design", amount: 1000.00 }
      ],
      notes: "Project phase 1 completion"
    },
    {
      id: "INV-2024-002",
      invoiceDate: "2024-01-20",
      dueDate: "2024-02-20",
      status: "approved",
      amount: 3750.00,
      company: "Digital Dynamics LLC",
      items: [
        { description: "Cloud Infrastructure Setup", amount: 2250.00 },
        { description: "Security Implementation", amount: 1500.00 }
      ],
      notes: "Monthly maintenance services"
    }
  ];

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    console.log(`Invoice ${id} status changed to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Invoice Management Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dummyInvoices.map((invoice) => (
                  <React.Fragment key={invoice.id}>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleRow(invoice.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          aria-label={expandedRows.includes(invoice.id) ? "Collapse row" : "Expand row"}
                        >
                          {expandedRows.includes(invoice.id) ? (
                            <FiChevronDown className="w-5 h-5" />
                          ) : (
                            <FiChevronRight className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.invoiceDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${invoice.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleStatusChange(invoice.id, "approved")}
                          className="text-green-600 hover:text-green-900 bg-green-100 p-2 rounded-full transition-colors duration-200"
                          aria-label="Approve invoice"
                        >
                          <MdOutlineApproval className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(invoice.id, "rejected")}
                          className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-full transition-colors duration-200"
                          aria-label="Reject invoice"
                        >
                          <MdOutlineCancel className="w-5 h-5" />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900 bg-blue-100 p-2 rounded-full transition-colors duration-200"
                          aria-label="View PDF"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 bg-gray-100 p-2 rounded-full transition-colors duration-200"
                          aria-label="Download invoice"
                        >
                          <FiDownload className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                    {expandedRows.includes(invoice.id) && (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 bg-gray-50">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Itemized Breakdown</h4>
                              <div className="space-y-2">
                                {invoice.items.map((item, index) => (
                                  <div key={index} className="flex justify-between text-sm text-gray-600">
                                    <span>{item.description}</span>
                                    <span>${item.amount.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                              <p className="text-sm text-gray-600">{invoice.notes}</p>
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

export default InvoiceDashboard;