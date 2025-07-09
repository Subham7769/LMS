import React from "react";
import { ChevronRight } from "lucide-react";
import Stepper from "../../Common/Stepper/Stepper";
import Button from "../../Common/Button/Button"

const Step1Welcome = ({ onNext }) => {

  const GetStarted = () => {
    onNext();
  }
  return (
    <>
      <div className="flex justify-end items-center mb-4">
        <Button
          buttonName="Register Account"
          buttonType="secondary"
          onClick={GetStarted}
        />
      </div>

      {/* Stepper */}
      <Stepper
        title={"KSA Financing"}
        currentStep={1}
        steps={["Welcome", "Personal Info", "OTP Verification", "Completion"]}
      />

      <div className="text-center mb-6">
        <div className="mx-auto w-10 h-10 bg-violet-700/20 rounded-full flex items-center justify-center mb-3">
          <span className="text-violet-700 text-xl">🧾</span>
        </div>
        <h2 className="text-lg font-semibold">Welcome to KSA Financing</h2>
        <p className="text-sm text-gray-500 mb-6">
          Your path to Shariah-compliant financing solutions
        </p>

        <div className="text-left space-y-4 mb-6">
          {[
            {
              title: "Create Your Account",
              desc: "Register with your basic information",
            },
            {
              title: "Pre-Eligibility Check",
              desc: "Quick verification of your basic details",
            },
            {
              title: "Eligibility Verification",
              desc: "Thorough assessment of your qualification",
            },
            {
              title: "Loan Application",
              desc: "Complete your financing request",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="text-violet-600 font-bold">{index + 1}</div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700/50 transition">
          <span className="text-sm font-medium">
            Registration takes just 2 minutes
          </span>
          <ChevronRight className="w-4 h-4 text-violet-600" />
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <Button
          buttonName="Get Started"
          buttonType="primary"
          onClick={GetStarted}
        />
      </div>

      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <span className="text-violet-600 font-medium cursor-pointer">Login</span>
      </p>
    </>
  );
};

export default Step1Welcome;
