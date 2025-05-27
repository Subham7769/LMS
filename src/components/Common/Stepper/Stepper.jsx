import React from "react";

const Stepper = ({
  title = "Heading",
  currentStep = 1,
  steps = ["A", "B", "C", "D", "E"],
}) => {
  const totalSteps = steps.length;
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <>
      <div className="overflow-x-auto mb-4">
        <div className="pb-2 min-w-max">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <div className="text-sm mb-2">
            Step {currentStep} of {totalSteps}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-violet-400 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* <div className="overflow-x-auto"> */}
            <div className="flex justify-between gap-6 items-center text-sm font-medium">
              {steps.map((label, index) => (
                <div
                  key={index}
                  className={` ${
                    index === currentStep - 1
                      ? "text-violet-700 dark:text-violet-500 font-semibold"
                      : index < currentStep - 1
                      ? "text-gray-800 dark:text-gray-300"
                      : "text-gray-400"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Stepper;
