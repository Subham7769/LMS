import React from "react";
import Stepper from "../../Common/Stepper/Stepper";
import { useSelector } from "react-redux";
import { useActiveTab } from "../ActiveTabContext";

// API for Max Loan amount check

const LoanEstimate = ({ onNext, onBack }) => {
    const { loanEstimate, loading, error } = useSelector(state => state.productTestingKSA)
    const { userId } = useActiveTab();

  return (
    <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-4">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={2} steps={["Initial Details", "Loan Estimate", "Identity Verification", "Completion"]} />

      {/* Form Section */}
      <h2 className="text-xl font-semibold mb-4">Loan Estimate</h2>
      <p className="text-sm text-gray-600 mb-6">
        Based on your salary details, you will be provided with a Loan Estimate for Pre-Eligibility check with KSA.
      </p>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Loan Amount (SAR)
          </label>
          <input
            type="number"
            value={loanEstimate.maxLoanAmount}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            EMI Monthly Payment (SAR)
          </label>
          <input
            type="number"
            value={loanEstimate.emiMonthlyPayment}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loan Period (Months)
          </label>
          <input
            type="number"
            value={loanEstimate.tenure}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoanEstimate;
