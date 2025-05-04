import React, { useState } from "react";
import Stepper from "../../Common/Stepper/Stepper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useActiveTab } from "../ActiveTabContext";
import { getCreditConsent } from "../../../redux/Slices/ProductTestingKSA";

// This API to get credit report from Simah after consent

const CreditHistory = ({ onNext,onBack }) => {
  const [consentGiven, setConsentGiven] = useState(false);
  const { AMLUserDetails } = useSelector(state => state.productTestingKSA)

  const dispatch = useDispatch();
  const { userId } = useActiveTab();

  const creditCheckPoints = [
    "Current Loans",
    "Credit Card Usage",
    "Payment Defaults",
    "Loan Repayment History",
    "Outstanding Balances",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (consentGiven) {
      console.log("User gave consent for SIMAH check");
      await dispatch(getCreditConsent({ userId }))
      onNext(); // Proceed to Completion
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={3} steps={["AML Verification", "Salary Verification", "Credit History", "Completion"]} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Read-only Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={AMLUserDetails.firstNameEn + " " + AMLUserDetails.middleNameEn + " " + AMLUserDetails.lastNameEn}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">National ID / Iqama</label>
          <input
            type="text"
            value={AMLUserDetails.idNumber}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={AMLUserDetails.dateOfBirth}
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


        <div className="flex justify-between mt-4">
          <button
            onClick={() => { onBack() }}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className={`px-4 mt-4 py-2 rounded-md text-white transition ${consentGiven ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!consentGiven}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditHistory;
