import React from "react";
import NAFATH from "../../../assets/image/NAFATH.jpeg";


const IdentityVerification = ({ nationalId = "1234567890", onNext, onBack }) => {
  // Simulated URL for Nafath redirection

  return (
    <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-4">
      {/* Stepper */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Step 3 of 4</p>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div className="bg-teal-600 h-2 rounded-full w-3/4" />
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-medium mb-6">
          {["Initial Details", "Loan Estimate", "Identity Verification", "Completion"].map(
            (step, idx) => (
              <span key={idx} className={idx === 2 ? "text-teal-600" : ""}>
                {step}
              </span>
            )
          )}
        </div>
      </div>

      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-2">Identity Verification</h2>
      <p className="text-sm text-gray-600 mb-4">
        Please verify your identity using Nafath (Elm). Scan the QR code with the Nafath app to continue.
      </p>

      {/* National ID / Iqama */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">National ID / Iqama</label>
        <input
          type="text"
          value={nationalId}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
        />
      </div>

      {/* QR Code */}
      <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
        <img
          src={NAFATH} 
          alt="QR Code"
          className="w-32 h-32"
        />
      </div>

      <p className="text-xs text-gray-500 text-center mt-2">
        Scan this QR code using the Nafath app to verify your biometric identity.
      </p>

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

export default IdentityVerification;
