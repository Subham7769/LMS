import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiDownload, FiCheckCircle, FiXCircle } from "react-icons/fi";

const InvoiceDashboard = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [invoices, setInvoices] = useState([
    {
      id: "INV-2024-001",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      status: "Pending",
      amount: 2500.00,
      company: "Tech Solutions Inc",
      contact: "John Doe",
      email: "john@techsolutions.com",
      phone: "+1-555-0123",
      address: "123 Business Ave, Tech City, TC 12345",
      items: [
        { description: "Web Development", amount: 1500 },
        { description: "UI/UX Design", amount: 1000 }
      ]
    },
    {
      id: "INV-2024-002",
      date: "2024-01-20",
      dueDate: "2024-02-20",
      status: "Approved",
      amount: 3750.00,
      company: "Digital Dynamics",
      contact: "Jane Smith",
      email: "jane@digitaldynamics.com",
      phone: "+1-555-0124",
      address: "456 Tech Park, Innovation City, IC 67890",
      items: [
        { description: "Cloud Services", amount: 2250 },
        { description: "Maintenance", amount: 1500 }
      ]
    }
  ]);

  const handleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleApprove = (id) => {
    setInvoices(invoices.map(invoice =>
      invoice.id === id ? { ...invoice, status: "Approved" } : invoice
    ));
  };

  const handleReject = (id) => {
    setInvoices(invoices.map(invoice =>
      invoice.id === id ? { ...invoice, status: "Rejected" } : invoice
    ));
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Invoice Management Dashboard</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto" role="table">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Invoice ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Company</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <React.Fragment key={invoice.id}>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleExpand(invoice.id)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      aria-label={expandedRow === invoice.id ? "Collapse row" : "Expand row"}
                    >
                      {expandedRow === invoice.id ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${invoice.status === "Approved" ? "bg-green-100 text-green-800" : invoice.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.company}</td>
                </tr>
                {expandedRow === invoice.id && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="px-6 py-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-800">Contact Details</h3>
                          <p className="text-sm text-gray-600">Contact: {invoice.contact}</p>
                          <p className="text-sm text-gray-600">Email: {invoice.email}</p>
                          <p className="text-sm text-gray-600">Phone: {invoice.phone}</p>
                          <p className="text-sm text-gray-600">Address: {invoice.address}</p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(invoice.id)}
                              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                              disabled={invoice.status === "Approved"}
                            >
                              <FiCheckCircle className="mr-2" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(invoice.id)}
                              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                              disabled={invoice.status === "Rejected"}
                            >
                              <FiXCircle className="mr-2" />
                              Reject
                            </button>
                          </div>
                          <button
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            onClick={() => window.alert("PDF viewer would open here")}
                          >
                            <FiDownload className="mr-2" />
                            View PDF
                          </button>
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-800 mb-2">Invoice Items</h4>
                            {invoice.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm text-gray-600 py-1">
                                <span>{item.description}</span>
                                <span>${item.amount.toFixed(2)}</span>
                              </div>
                            ))}
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
  );
};

export default InvoiceDashboard;