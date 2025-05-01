import React, { useState } from "react";

const SalaryVerification = ({ onNext }) => {
  const [formData, setFormData] = useState({
    employeeId: "EMP987654",
    fullName: "Subham Jain",
    employerName: "PhotonMatters Inc.",
    salaryAmount: "25000",
    salaryPeriod: "Monthly",
  });

  const disabled = true; // Set this to false if you want fields to be editable

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Salary Verification Data:", formData);
    onNext(); // move to Credit History
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Stepper */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Step 2 of 4</p>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div className="bg-teal-600 h-2 rounded-full w-1/2" />
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-medium mb-6">
          {["AML Verification", "Salary Verification", "Credit History", "Completion"].map(
            (step, idx) => (
              <span key={idx} className={idx === 1 ? "text-teal-600" : ""}>
                {step}
              </span>
            )
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            disabled={disabled}
            className="w-full mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={disabled}
            className="w-full mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Employer Name</label>
          <input
            type="text"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
            disabled={disabled}
            className="w-full mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary Amount (SAR)</label>
          <input
            type="number"
            name="salaryAmount"
            value={formData.salaryAmount}
            onChange={handleChange}
            disabled={disabled}
            className="w-full mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary Period</label>
          <input
            type="text"
            name="salaryPeriod"
            value={formData.salaryPeriod}
            onChange={handleChange}
            placeholder="e.g. Monthly"
            disabled={disabled}
            className="w-full mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SalaryVerification;
