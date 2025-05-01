import React from "react";

const LoanEstimate = ({ onNext, onBack }) => {
  // You can replace these static values with dynamic props later
  const estimate = {
    maxLoanAmount: 50000,
    monthlyEMI: 1200,
    loanPeriod: 48,
  };

  return (
    <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-4">
      {/* Stepper */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Step 2 of 4</p>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div className="bg-teal-600 h-2 rounded-full w-2/4" />
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-medium mb-6">
          {["Initial Details", "Loan Estimate", "Identity Verification", "Completion"].map(
            (step, idx) => (
              <span key={idx} className={idx === 1 ? "text-teal-600" : ""}>
                {step}
              </span>
            )
          )}
        </div>
      </div>

      {/* Form Section */}
      <h2 className="text-xl font-semibold mb-4">Loan Estimate</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Loan Amount (SAR)
          </label>
          <input
            type="number"
            value={estimate.maxLoanAmount}
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
            value={estimate.monthlyEMI}
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
            value={estimate.loanPeriod}
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
