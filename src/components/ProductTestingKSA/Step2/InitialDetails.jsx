import React, { useState } from "react";
import Stepper from "../../Common/Stepper/Stepper";
import { useActiveTab } from "../ActiveTabContext";
import { useDispatch } from "react-redux";
import { checkFinanceEligibility } from "../../../redux/Slices/ProductTestingKSA";

// API for Max Finance amount check

const employmentOptions = [
  "Government",
  "Private",
  "Semi-Government",
  "Self-Employed",
];

const InitialDetails = ({ onNext }) => {
  const [formData, setFormData] = useState({
    salary: "",
    employmentSector: "",
    workingMonths: "",
    monthlyInstallment: "",
  });

  const dispatch = useDispatch();
  const { userId } = useActiveTab();

console.log(userId)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async() => {
    console.log("Initial Details Submitted:", formData);
    await dispatch(checkFinanceEligibility({ ...formData, userId })).unwrap();
    onNext();
  };

  return (
    <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-4">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={1} steps={["Initial Details", "Loan Estimate", "Identity Verification", "Completion"]} />


      <div className="space-y-3">
        {/* Form */}
        <h2 className="text-lg font-semibold mb-2">Salary Details</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please enter your salary details for Pre-Eligibility check with KSA
        </p>
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
            name="employmentSector"
            value={formData.employmentSector}
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
            name="workingMonths"
            value={formData.workingMonths}
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
            name="monthlyInstallment"
            value={formData.monthlyInstallment}
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
