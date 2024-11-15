import React, { useState } from "react";
import { FiUpload, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

const InvoiceApplication = () => {
  const [formData, setFormData] = useState({
    invoiceId: "",
    date: "",
    amount: "",
    status: "pending",
    file: null
  });

  const [applications, setApplications] = useState([
    {
      id: 1,
      invoiceId: "INV001",
      date: "2024-01-15",
      amount: "50000",
      status: "pending"
    },
    {
      id: 2,
      invoiceId: "INV002",
      date: "2024-01-16",
      amount: "75000",
      status: "approved"
    }
  ]);

  const [errors, setErrors] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, file });
      setErrors({ ...errors, file: "" });
    } else {
      setErrors({ ...errors, file: "Please upload a PDF file" });
    }
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "invoiceId":
        if (!value) newErrors.invoiceId = "Invoice ID is required";
        else newErrors.invoiceId = "";
        break;
      case "amount":
        if (!value) newErrors.amount = "Amount is required";
        else if (isNaN(value)) newErrors.amount = "Amount must be a number";
        else newErrors.amount = "";
        break;
      case "date":
        if (!value) newErrors.date = "Date is required";
        else newErrors.date = "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newApplication = {
        id: applications.length + 1,
        ...formData,
        status: "pending"
      };
      setApplications([...applications, newApplication]);
      setFormData({
        invoiceId: "",
        date: "",
        amount: "",
        status: "pending",
        file: null
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleStatus = (id, status) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="invoiceId" className="block text-sm font-medium text-gray-700">
                  Invoice ID
                </label>
                <input
                  type="text"
                  id="invoiceId"
                  name="invoiceId"
                  value={formData.invoiceId}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.invoiceId ? "border-red-500" : ""}`}
                  aria-label="Invoice ID"
                />
                {errors.invoiceId && (
                  <p className="text-red-500 text-xs mt-1">{errors.invoiceId}</p>
                )}
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.date ? "border-red-500" : ""}`}
                  aria-label="Date"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.amount ? "border-red-500" : ""}`}
                  aria-label="Amount"
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Upload PDF
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                          onChange={handleFileUpload}
                          aria-label="Upload PDF"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF up to 10MB</p>
                  </div>
                </div>
                {errors.file && (
                  <p className="text-red-500 text-xs mt-1">{errors.file}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("invoiceId")}
                  >
                    <div className="flex items-center">
                      Invoice ID
                      {sortConfig.key === "invoiceId" && (
                        sortConfig.direction === "ascending" ? <BsArrowUp className="ml-1" /> : <BsArrowDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      {sortConfig.key === "date" && (
                        sortConfig.direction === "ascending" ? <BsArrowUp className="ml-1" /> : <BsArrowDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center">
                      Amount
                      {sortConfig.key === "amount" && (
                        sortConfig.direction === "ascending" ? <BsArrowUp className="ml-1" /> : <BsArrowDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    onClick={() => setSelectedApplication(application)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.invoiceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${application.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          application.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : application.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(application.id);
                          }}
                          className="text-red-600 hover:text-red-900"
                          aria-label="Delete application"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle invoice discounting
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                          aria-label="Invoice discounting"
                        >
                          Invoice Discounting
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section - Application Details */}
        {selectedApplication && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Application Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Invoice ID</p>
                <p className="mt-1">{selectedApplication.invoiceId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="mt-1">{selectedApplication.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Amount</p>
                <p className="mt-1">${selectedApplication.amount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="mt-1">{selectedApplication.status}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handleStatus(selectedApplication.id, "approved")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FiCheck className="mr-2" /> Approve
              </button>
              <button
                onClick={() => handleStatus(selectedApplication.id, "rejected")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FiX className="mr-2" /> Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceApplication;