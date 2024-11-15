import React, { useState } from "react";
import { FiUpload, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

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
      id: "INV001",
      date: "2024-01-15",
      amount: "50000",
      status: "pending",
      file: "invoice1.pdf"
    },
    {
      id: "INV002",
      date: "2024-01-16",
      amount: "75000",
      status: "approved",
      file: "invoice2.pdf"
    }
  ]);

  const [errors, setErrors] = useState({});
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.invoiceId) newErrors.invoiceId = "Invoice ID is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.file) newErrors.file = "Please upload an invoice file";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      const newApplication = {
        id: formData.invoiceId,
        date: formData.date,
        amount: formData.amount,
        status: "pending",
        file: formData.file.name
      };
      setApplications([...applications, newApplication]);
      setFormData({
        invoiceId: "",
        date: "",
        amount: "",
        status: "pending",
        file: null
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleDelete = (id) => {
    setApplications(applications.filter(app => app.id !== id));
    if (selectedApplication?.id === id) setSelectedApplication(null);
  };

  const handleEdit = (application) => {
    setFormData({
      invoiceId: application.id,
      date: application.date,
      amount: application.amount,
      status: application.status,
      file: null
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Invoice Application Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Invoice ID</label>
                <input
                  type="text"
                  name="invoiceId"
                  value={formData.invoiceId}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.invoiceId ? 'border-red-500' : ''}`}
                  aria-label="Invoice ID"
                />
                {errors.invoiceId && <p className="text-red-500 text-sm mt-1">{errors.invoiceId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.date ? 'border-red-500' : ''}`}
                  aria-label="Date"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.amount ? 'border-red-500' : ''}`}
                  aria-label="Amount"
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Invoice</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="sr-only"
                          aria-label="Upload PDF"
                        />
                      </label>
                    </div>
                    {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Submitted Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    onClick={() => setSelectedApplication(application)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{application.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{application.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${application.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${application.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(application);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(application.id);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Application Details */}
        {selectedApplication && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Invoice ID</p>
                <p className="mt-1 text-sm text-gray-900">{selectedApplication.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="mt-1 text-sm text-gray-900">{selectedApplication.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Amount</p>
                <p className="mt-1 text-sm text-gray-900">${selectedApplication.amount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="mt-1 text-sm text-gray-900">{selectedApplication.status}</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => handleStatusChange(selectedApplication.id, "approved")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FiCheck className="mr-2" /> Approve
              </button>
              <button
                onClick={() => handleStatusChange(selectedApplication.id, "rejected")}
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