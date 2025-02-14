import React, { useState } from "react";
import {
  FiUpload,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
} from "react-icons/fi";
import convertToReadableString from "../../utils/convertToReadableString";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";

const CashReceivable = () => {
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
    setApplications(
      applications.filter(
        (application) => application.applicationId !== applicationId
      )
    );
    if (selectedApplication?.applicationId === applicationId)
      setSelectedApplication(null);
  };

  const handleEdit = (application) => {
    setFormData({
      applicationId: application.applicationId,
      date: application.date,
      amount: application.amount,
      applicationStatus: application.applicationStatus,
      file: null,
    });
  };

  const columns = [
    { label: "Application Id", field: "applicationId" },
    { label: "Date", field: "applicationUploadDate" },
    { label: "Amount", field: "invoiceAmount" },
    { label: "Status", field: "applicationStatus" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-3 md:grid-cols-[80%_20%] gap-4">
        <div className="space-y-2 text-sm text-gray-600 p-5">
          <div className="grid grid-cols-2 gap-4 py-5">
            <div className="flex justify-between">
              <p className="font-semibold">Company Name:</p>
              <p>{rowData.companyName || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Company ID:</p>
              <p>{rowData.companyId || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Application ID:</p>
              <p>{rowData.applicationId || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Upload Date:</p>
              <p>{rowData.applicationUploadDate || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Due Date:</p>
              <p>{rowData.applicationDueDate || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Days Left:</p>
              <p>{rowData.daysLeftFromDueDate || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Approval Status:</p>
              <p>{rowData.approvalStatus || "No"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Payment Status:</p>
              <p>{rowData.paymentStatus || "Unpaid"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Invoice Amount:</p>
              <p>{rowData.invoiceAmount || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Financed Amount:</p>
              <p>{rowData.financedAmount || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Net Outstanding:</p>
              <p>{rowData.netOutstanding || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Interest Due:</p>
              <p>{rowData.interestDue || "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center align-middle flex-col gap-4 p-5">
          <button
            onClick={() =>
              window.alert("Invoice Discounting would takes place here")
            }
            className={`flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400`}
            disabled={rowData.invoiceDiscountingStatus === "Yes"}
          >
            <FiCheckCircle className="mr-2" />
            Invoice Discounting
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

  const ListAction = ({ id, application }) => {
    console.log(id);
    return (
      <td className="flex justify-center align-middle text-sm text-gray-800 ">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(id);
          }}
          title="Edit"
          className="text-indigo-600 hover:text-indigo-900 mr-3 disabled:text-gray-600"
          disabled={application.applicationStatus === "approved"}
        >
          <FiEdit2 className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
          title="Delete"
          className="text-red-600 hover:text-red-900 disabled:text-gray-600"
          disabled={application.applicationStatus === "approved"}
        >
          <FiTrash2 className="h-5 w-5" />
        </button>
      </td>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mx-auto space-y-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Invoice Application Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.keys(formData).map(
                (field) =>
                  field !== "file" && (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700">
                        {convertToReadableString(
                          field.replace(/([A-Z])/g, " $1")
                        )}
                      </label>
                      <input
                        type={field.includes("Date") ? "date" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border-border-gray-primary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                          errors[field] ? "border-red-500" : ""
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
                <label className="block text-sm font-medium text-gray-700">
                  Upload Invoice
                </label>
                <div className="relative border-2 border-dashed border-border-gray-primary rounded-lg p-4 text-center bg-background-light-secondary hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  <FiUpload className="mx-auto text-gray-400 mb-2" size={24} />
                  <span className="text-sm text-gray-500">
                    Click or drag to upload
                  </span>
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
            <div className="flex justify-center col-span-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all flex items-center"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Applications Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <ExpandableTable
              columns={columns}
              data={applications}
              renderExpandedRow={renderExpandedRow}
              ListAction={ListAction}
              ActionId={"applicationId"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashReceivable;
