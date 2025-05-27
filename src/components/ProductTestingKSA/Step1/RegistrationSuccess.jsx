import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useActiveTab } from "../ActiveTabContext";
import Stepper from "../../Common/Stepper/Stepper";
import Button from "../../Common/Button/Button";
import { useSelector } from "react-redux";

const Step1RegistrationSuccess = ({onBack}) => {
  const navigate = useNavigate();
  const { setActiveTab } = useActiveTab();
  // const { registrationDetails } = useSelector(state => state.productTestingKSA)

  const registrationDetails = {
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    mobile: "+966123456789",
    nationality: "Saudi",
    userId: "1234567890",
  };

  const handleBack = () => {
    onBack();
  };

  const gotoPreEligibilityCheck = () => {
    setActiveTab("pre-eligibility-check"); // Set the active tab to "pre-eligibility-check"
    navigate(`/loan/product-testing-KSA/pre-eligibility-check`); // Navigate to the pre-eligibility check page
  };

  return (
    <>
      {/* Stepper */}
      <Stepper
        title={"KSA Financing"}
        currentStep={4}
        steps={["Welcome", "Personal Info", "OTP Verification", "Completion"]}
      />

      <div className="text-center">
        <CheckCircle2 className="text-green-500 w-14 h-14 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">
          Registration Successful!
        </h2>
        <p className="text-gray-500 mb-6">
          Your account has been successfully created.
        </p>

        {/* User Details */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-sm mb-6 border dark:border-gray-800">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between border-b dark:border-gray-500 py-2">
              <span className="font-medium">Full Name</span>
              <span>{registrationDetails?.fullName}</span>
            </div>
            <div className="flex justify-between border-b dark:border-gray-500 py-2">
              <span className="font-medium">Email</span>
              <span>{registrationDetails?.email}</span>
            </div>
            <div className="flex justify-between border-b dark:border-gray-500 py-2">
              <span className="font-medium">Phone Number</span>
              <span>{registrationDetails?.mobile}</span>
            </div>
            <div className="flex justify-between border-b dark:border-gray-500 py-2">
              <span className="font-medium">Nationality</span>
              <span>{registrationDetails?.nationality}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">ID Number</span>
              <span>{registrationDetails?.userId}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            buttonName="Back"
            buttonType="secondary"
            onClick={handleBack}
          />
          <Button
            buttonName="Pre Eligibility Check"
            onClick={gotoPreEligibilityCheck}
          />
        </div>
      </div>
    </>
  );
};

export default Step1RegistrationSuccess;
