import React, { useState } from "react";

const employmentOptions = [
  "Government",
  "Private",
  "Semi-Government",
  "Self-Employed",
];

const InitialDetails = ({ onNext }) => {
  const [formData, setFormData] = useState({
    salary: "",
    sector: "",
    servicePeriod: "",
    monthlyInstallments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Initial Details Submitted:", formData);
    onNext();
  };

  return (
    <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-4">
      {/* Stepper */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Step 1 of 4</p>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div className="bg-teal-600 h-2 rounded-full w-1/4" />
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-medium mb-6">
          {["Initial Details", "Loan Estimate", "Identity Verification", "Completion"].map(
            (step, idx) => (
              <span key={idx} className={idx === 0 ? "text-teal-600" : ""}>
                {step}
              </span>
            )
          )}
        </div>
      </div>

      {/* Form Section */}
      <h2 className="text-xl font-semibold mb-2">Pre Eligibility Check</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Monthly Salary (SAR)
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. 8000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employment Sector
          </label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Sector</option>
            {employmentOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Period (in months)
          </label>
          <input
            type="number"
            name="servicePeriod"
            value={formData.servicePeriod}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. 24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monthly Installments (SAR)
          </label>
          <input
            type="number"
            name="monthlyInstallments"
            value={formData.monthlyInstallments}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. 2000"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-teal-600 text-white py-2 rounded-lg mt-6 hover:bg-teal-700 transition"
      >
        Check my eligibility
      </button>
    </div>
  );
};

export default InitialDetails;
