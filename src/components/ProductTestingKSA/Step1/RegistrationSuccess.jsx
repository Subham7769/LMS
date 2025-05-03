import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useActiveTab } from "../ActiveTabContext";
import Stepper from "../../Common/Stepper/Stepper";
import { useSelector } from "react-redux";

const Step1RegistrationSuccess = () => {
  const navigate = useNavigate();
  const { setActiveTab} = useActiveTab();
  const {registrationDetails} = useSelector(state => state.productTestingKSA)
  

  const gotoPreEligibilityCheck = () => {
    setActiveTab("pre-eligibility-check"); // Set the active tab to "pre-eligibility-check"
    navigate(`/loan/product-testing-KSA/pre-eligibility-check`); // Navigate to the pre-eligibility check page
  }

  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-md mt-10">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={4} steps={["Welcome", "Personal Info", "OTP Verification", "Completion"]} />

      <div className="text-center">

        <CheckCircle2 className="text-green-600 w-14 h-14 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Registration Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Your account has been successfully created.
        </p>


        {/* User Details */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 mb-6 border">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Full Name</span>
              <span>{registrationDetails.fullName}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Email</span>
              <span>{registrationDetails.email}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Phone Number</span>
              <span>{registrationDetails.mobile}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Nationality</span>
              <span>{registrationDetails.nationality}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">ID Number</span>
              <span>{registrationDetails.userId}</span>
            </div>
          </div>
        </div>


        <button
          onClick={gotoPreEligibilityCheck}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Pre Eligibility Check
        </button>
      </div>
    </div>
  );
};

export default Step1RegistrationSuccess;
