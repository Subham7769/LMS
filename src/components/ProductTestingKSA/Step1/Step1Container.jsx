import React, { useState } from "react";
import Welcome from "./Welcome";
import PersonalInfo from "./PersonalInfo";
import OtpVerification from "./OtpVerification";
import RegistrationSuccess from "./RegistrationSuccess";

const Step1Container = () => {
  const [subStep, setSubStep] = useState(0);

  const next = () => setSubStep((prev) => Math.min(prev + 1, 3));
  const back = () => setSubStep((prev) => Math.max(prev - 1, 0));

  const renderSubStep = () => {
    switch (subStep) {
      case 0:
        return <Welcome onNext={next} />;
      case 1:
        return <PersonalInfo onNext={next} onBack={back} />;
      case 2:
        return <OtpVerification onNext={next} onBack={back} />;
      case 3:
        return <RegistrationSuccess onBack={back} />;
      default:
        return null;
    }
  };

  return <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">{renderSubStep()}</div>;
};

export default Step1Container;
