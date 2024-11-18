import React, { useState } from "react";
import { FiUpload, FiSave } from "react-icons/fi";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    contactPersonName: "",
    companyName: "",
    companyId: null,
    companyTaxId: null,
    companyContactNo: "",
    companyEmail: "",
    bankAccount: "",
    bankName: "",
    crossedCheque: null,
    noOfEmployees: "",
    address: "",
    addressProof: null,
    photo: null,
    googleLocation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Registration successful!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Registration Page</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          {/* Input Fields */}
          {[
            { label: "Contact Person Name", name: "contactPersonName", type: "text" },
            { label: "Company Name", name: "companyName", type: "text" },
            { label: "Company Contact No.", name: "companyContactNo", type: "tel" },
            { label: "Company Email", name: "companyEmail", type: "email" },
            { label: "Bank Account", name: "bankAccount", type: "text" },
            { label: "Bank Name", name: "bankName", type: "text" },
            { label: "No. of Employees", name: "noOfEmployees", type: "number" },
            { label: "Google Location", name: "googleLocation", type: "url" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all px-4 py-2"
              />
            </div>
          ))}

          {/* File Uploads */}
          {[
            { label: "Company ID", name: "companyId" },
            { label: "Company Tax ID", name: "companyTaxId" },
            { label: "Crossed Cheque", name: "crossedCheque" },
            { label: "Address Proof", name: "addressProof" },
            { label: "Photo (Drag & Drop)", name: "photo" },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{field.label}</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                <FiUpload className="mx-auto text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-500">Click or drag to upload</span>
                <input
                  type="file"
                  name={field.name}
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".jpg,.png,.pdf"
                />
              </div>
            </div>
          ))}

          {/* Text Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all px-4 py-2"
              rows={3}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center col-span-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all flex items-center"
            >
              <FiSave className="mr-2" /> Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
