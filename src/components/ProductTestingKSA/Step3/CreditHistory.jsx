import React, { useState } from "react";

const CreditHistory = ({ onNext }) => {
  const [consentGiven, setConsentGiven] = useState(false);

  const creditCheckPoints = [
    "Current Loans",
    "Credit Card Usage",
    "Payment Defaults",
    "Loan Repayment History",
    "Outstanding Balances",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consentGiven) {
      console.log("User gave consent for SIMAH check");
      onNext(); // Proceed to Completion
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Stepper */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Step 3 of 4</p>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div className="bg-teal-600 h-2 rounded-full w-3/4" />
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-medium mb-6">
          {["AML Verification", "Salary Verification", "Credit History", "Completion"].map(
            (step, idx) => (
              <span key={idx} className={idx === 2 ? "text-teal-600" : ""}>
                {step}
              </span>
            )
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Read-only Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value="Mohammed Al Saud"
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">National ID / Iqama</label>
          <input
            type="text"
            value="1234567890"
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value="1990-01-01"
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Credit Info Box */}
        <div className="p-4 border border-teal-500 bg-teal-50 rounded-md">
          <h3 className="text-teal-700 font-medium mb-2">
            We will check the following details with SIMAH:
          </h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            {creditCheckPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Consent */}
        <div className="flex items-start gap-2 mt-4">
          <input
            type="checkbox"
            id="consent"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
            I authorize KSA to check my credit history with SIMAH.
          </label>
        </div>

        <button
          type="submit"
          className={`w-full mt-4 py-2 rounded-md text-white transition ${
            consentGiven ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!consentGiven}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default CreditHistory;
