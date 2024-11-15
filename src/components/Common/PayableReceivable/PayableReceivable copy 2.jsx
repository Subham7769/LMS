import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaUpload, FaSpinner } from "react-icons/fa";

const InvoiceApplication = () => {
  const [formData, setFormData] = useState({
    invoiceId: "",
    date: "",
    status: "pending",
    amount: "",
    file: null
  });

  const [applications, setApplications] = useState([
    {
      id: 1,
      invoiceId: "INV001",
      date: "2024-01-15",
      status: "pending",
      amount: "5000"
    },
    {
      id: 2,
      invoiceId: "INV002",
      date: "2024-01-16",
      status: "approved",
      amount: "7500"
    }
  ]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "invoiceId":
        if (!value) newErrors.invoiceId = "Invoice ID is required";
        else delete newErrors.invoiceId;
        break;
      case "amount":
        if (!value || isNaN(value)) newErrors.amount = "Enter valid amount";
        else delete newErrors.amount;
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleFileUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newApplication = {
        id: applications.length + 1,
        ...formData
      };
      setApplications((prev) => [...prev, newApplication]);
      setFormData({
        invoiceId: "",
        date: "",
        status: "pending",
        amount: "",
        file: null
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    if (selectedApplication?.id === id) setSelectedApplication(null);
  };

  const handleEdit = (application) => {
    setFormData(application);
  };

  const handleStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Seller Information Form</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  aria-invalid={errors.invoiceId ? "true" : "false"}
                />
                {errors.invoiceId && (
                  <p className="mt-1 text-sm text-red-600" role="alert">{errors.invoiceId}</p>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  aria-invalid={errors.amount ? "true" : "false"}
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600" role="alert">{errors.amount}</p>
                )}
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Upload PDF
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin h-5 w-5" />
              ) : (
                "Submit Application"
              )}
            </button>
          </form>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Submitted Applications</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.invoiceId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${app.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(app)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-purple-600 hover:text-purple-900 bg-purple-100 px-3 py-1 rounded-md text-sm"
                        >
                          Invoice Discounting
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {selectedApplication && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Invoice ID</p>
                <p className="text-lg font-medium">{selectedApplication.invoiceId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="text-lg font-medium">{selectedApplication.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-lg font-medium">${selectedApplication.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-medium capitalize">{selectedApplication.status}</p>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => handleStatus(selectedApplication.id, "approved")}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <FaCheck className="inline-block mr-2" /> Approve
              </button>
              <button
                onClick={() => handleStatus(selectedApplication.id, "rejected")}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <FaTimes className="inline-block mr-2" /> Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceApplication;