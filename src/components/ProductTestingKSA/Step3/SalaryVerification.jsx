import React, { useEffect, useState } from "react";
import Stepper from "../../Common/Stepper/Stepper";
import { useDispatch } from "react-redux";
import { useActiveTab } from "../ActiveTabContext";
import { useSelector } from "react-redux";
import { getBorrowerSalaryDetails, verifyBorrowerSalaryDetails } from "../../../redux/Slices/ProductTestingKSA";
// get borrower employment info

// API for salary check

const SalaryVerification = ({ onNext,onBack }) => {

  const { salaryDetails } = useSelector(state => state.productTestingKSA)

  const dispatch = useDispatch();
  const { userId } = useActiveTab();

  useEffect(() => {
    // Fetch the salary details when the component mounts
    dispatch(getBorrowerSalaryDetails({ userId }))
  }, [userId])



  const disabled = true; // Set this to false if you want fields to be editable


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(verifyBorrowerSalaryDetails({ userId })).unwrap();
    onNext(); // move to Credit History
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={2} steps={["AML Verification", "Salary Verification", "Credit History", "Completion"]} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">Your Employment Details</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please check your employment details
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={salaryDetails.employeeId}
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
            value={salaryDetails.fullName}
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
            value={salaryDetails.employerName}
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
            value={salaryDetails.totalSalary}
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
            value={salaryDetails.salaryPeriod}
            placeholder="e.g. Monthly"
            disabled={disabled}
            className="w-full mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"
            required
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => { onBack() }}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 mt-4 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalaryVerification;
