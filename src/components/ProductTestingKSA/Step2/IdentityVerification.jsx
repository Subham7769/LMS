import React from "react";
import NAFATH from "../../../assets/image/NAFATH.jpeg";
import Stepper from "../../Common/Stepper/Stepper";
import { useDispatch } from "react-redux";
import { useActiveTab } from "../ActiveTabContext";
import { verifyNafath } from "../../../redux/Slices/ProductTestingKSA";


const IdentityVerification = ({  nationalId, onNext, onBack }) => {
  // Simulated URL for Nafath redirection
  
  const dispatch = useDispatch();
  const { userId} = useActiveTab();
  
  const handleSubmit = async() => {
    await dispatch(verifyNafath({  nafathRandom: "11", userId })).unwrap();
    onNext()
  }

  return (
    <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-4">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={3} steps={["Initial Details", "Loan Estimate", "Identity Verification", "Completion"]} />

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
          value={userId}
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
          onClick={handleSubmit}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default IdentityVerification;
