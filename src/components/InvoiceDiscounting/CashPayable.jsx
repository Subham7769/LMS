import React, { useState } from "react";
import { FiUpload, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import convertToReadableString from "../../utils/convertToReadableString";

const CashPayable = () => {
  const [formData, setFormData] = useState({
    applicationId: "",
    applicationUploadDate: "",
    applicationDueDate: "",
    applicationStatus: "Pending",
    invoiceAmount: "",
    companyName: "",
    companyId: "",
    daysLeftFromDueDate: "",
    approvalStatus: "No",
    paymentStatus: "Unpaid",
    financedAmount: "",
    netOutstanding: "",
    interestDue: "",
    file: null,
  });

  const [applications, setApplications] = useState([
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
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "file") {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    if (!formData.file) newErrors.file = "Please upload an invoice file";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      const newApplication = { ...formData, file: formData.file.name };
      setApplications([...applications, newApplication]);
      setFormData({
        applicationId: "",
        applicationUploadDate: "",
        applicationDueDate: "",
        applicationStatus: "Pending",
        invoiceAmount: "",
        companyName: "",
        companyId: "",
        daysLeftFromDueDate: "",
        approvalStatus: "No",
        paymentStatus: "Unpaid",
        financedAmount: "",
        netOutstanding: "",
        interestDue: "",
        file: null,
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleDelete = (applicationId) => {
    setApplications(applications.filter(application => application.applicationId !== applicationId));
    if (selectedApplication?.applicationId === applicationId) setSelectedApplication(null);
  };

  const handleEdit = (application) => {
    setFormData({
      applicationId: application.applicationId,
      date: application.date,
      amount: application.amount,
      applicationStatus: application.applicationStatus,
      file: null
    });
  };

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(applications.map(application =>
      application.applicationId === applicationId ? { ...application, applicationStatus: newStatus } : application
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Invoice Application Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData).map(
                (field) =>
                  field !== "file" && (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700">
                        {convertToReadableString(field.replace(/([A-Z])/g, " $1"))}
                      </label>
                      <input
                        type={field.includes("Date") ? "date" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors[field] ? "border-red-500" : ""
                          }`}
                        aria-label={field}
                      />
                      {errors[field] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  )
              )}
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Invoice</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  <FiUpload className="mx-auto text-gray-400 mb-2" size={24} />
                  <span className="text-sm text-gray-500">Click or drag to upload</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {errors.file && (
                  <p className="text-red-500 text-sm mt-1">{errors.file}</p>
                )}
              </div>

            </div>
            <div className="flex justify-center col-span-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all flex items-center"
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Id</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Discounting</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr
                    key={application.applicationId}
                    onClick={() => setSelectedApplication(application)}
                    className="hover:bg-gray-50 cursor-pointer text-xs font-medium"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{application.applicationId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{application.applicationUploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${application.invoiceAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex  leading-5 font-semibold rounded-full ${application.applicationStatus === "approved"
                          ? "bg-green-100 text-green-800"
                          : application.applicationStatus === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {application.applicationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 px-3 py-1 rounded-md text-sm disabled:bg-gray-100 disabled:text-gray-900"
                        disabled={application.applicationStatus !== "approved"}
                      >
                        Invoice Discounting
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">

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
                          handleDelete(application.applicationId);
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
                <p className="mt-1 text-sm text-gray-900">{selectedApplication.applicationId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="mt-1 text-sm text-gray-900">{selectedApplication.applicationUploadDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Amount</p>
                <p className="mt-1 text-sm text-gray-900">${selectedApplication.invoiceAmount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="mt-1 text-sm text-gray-900">{selectedApplication.applicationStatus}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end align-middle space-x-3">
            <p className="mt-2">Demo Button </p>
              <button
                onClick={() => handleStatusChange(selectedApplication.applicationId, "approved")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FiCheck className="mr-2" /> Approve
              </button>
              <button
                onClick={() => handleStatusChange(selectedApplication.applicationId, "rejected")}
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

export default CashPayable;