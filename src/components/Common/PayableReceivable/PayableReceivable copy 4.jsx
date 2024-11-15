import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiDownload, FiCheck, FiX, FiEye } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";

const InvoiceDashboard = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState({});

  const dummyInvoices = [
    {
      id: "INV-2024-001",
      issuedDate: "2024-01-15",
      dueDate: "2024-02-15",
      paidDate: "2024-01-20",
      status: "Approved",
      amount: 2500.00,
      company: "Tech Solutions Inc.",
      items: [
        { description: "Web Development", quantity: 1, rate: 1500, amount: 1500 },
        { description: "UI/UX Design", quantity: 2, rate: 500, amount: 1000 }
      ]
    },
    {
      id: "INV-2024-002",
      issuedDate: "2024-01-18",
      dueDate: "2024-02-18",
      paidDate: null,
      status: "Pending",
      amount: 3750.00,
      company: "Digital Dynamics Ltd.",
      items: [
        { description: "Cloud Services", quantity: 3, rate: 1000, amount: 3000 },
        { description: "Support Hours", quantity: 5, rate: 150, amount: 750 }
      ]
    }
  ];

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleApprove = async (id) => {
    setLoading({ ...loading, [id]: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // API call would go here
      console.log(`Approved invoice ${id}`);
    } finally {
      setLoading({ ...loading, [id]: false });
    }
  };

  const handleReject = async (id) => {
    setLoading({ ...loading, [id]: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // API call would go here
      console.log(`Rejected invoice ${id}`);
    } finally {
      setLoading({ ...loading, [id]: false });
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Invoice Management Dashboard</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto" role="table">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyInvoices.map((invoice) => (
              <React.Fragment key={invoice.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleExpandRow(invoice.id)}
                        className="mr-2 focus:outline-none"
                        aria-label={expandedRow === invoice.id ? "Collapse row" : "Expand row"}
                      >
                        {expandedRow === invoice.id ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {invoice.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <p><span className="font-medium">Issued:</span> {invoice.issuedDate}</p>
                      <p><span className="font-medium">Due:</span> {invoice.dueDate}</p>
                      {invoice.paidDate && <p><span className="font-medium">Paid:</span> {invoice.paidDate}</p>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {invoice.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(invoice.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center disabled:opacity-50"
                        disabled={loading[invoice.id]}
                        aria-label="Approve invoice"
                      >
                        {loading[invoice.id] ? <BiLoaderAlt className="animate-spin" /> : <FiCheck />}
                      </button>
                      <button
                        onClick={() => handleReject(invoice.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center disabled:opacity-50"
                        disabled={loading[invoice.id]}
                        aria-label="Reject invoice"
                      >
                        {loading[invoice.id] ? <BiLoaderAlt className="animate-spin" /> : <FiX />}
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center"
                        aria-label="View PDF"
                      >
                        <FiEye className="mr-1" /> PDF
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === invoice.id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Invoice Items</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoice.items.map((item, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2">{item.description}</td>
                                  <td className="px-4 py-2">{item.quantity}</td>
                                  <td className="px-4 py-2">${item.rate.toFixed(2)}</td>
                                  <td className="px-4 py-2">${item.amount.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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