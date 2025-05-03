import React from "react";

const Stepper = ({ title = "Heading", currentStep=1, steps = ["A","B","C","D","E"] }) => {
  const totalSteps = steps.length;
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="rounded-xl py-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-sm text-gray-600 mb-2">Step {currentStep} of {totalSteps}</div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-emerald-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center text-sm font-medium">
        {steps.map((label, index) => (
          <div
            key={index}
            className={` ${
              index === currentStep - 1
                ? "text-emerald-600 font-semibold"
                : index < currentStep - 1
                ? "text-gray-800"
                : "text-gray-400"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
