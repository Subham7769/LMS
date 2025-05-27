import React from "react";
import { CheckCircle } from "lucide-react";
import Stepper from "../../Common/Stepper/Stepper";
// API to return full details of a given loan 


const NafathNumber = ({ onNext }) => {

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={2} steps={["Identity Verification","Verification Code","AML Verification", "Salary Verification", "Credit History", "Completion"]} />

      {/* Completion Message */}
      <div className="bg-white rounded-xl shadow-sm border p-6 text-center space-y-6">
        <CheckCircle className="text-emerald-500 mx-auto w-12 h-12" />
        <div>
          <h2 className="text-xl font-semibold">Your Nafath Verification Code is!</h2>
        </div>
        <p className="text-gray-600 mt-4 text-8xl font-bold ">
          11
        </p>
        {/* Dashboard Button */}
        <button
          onClick={() => { onNext() }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md font-semibold w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NafathNumber;
