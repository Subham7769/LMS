import React, { useState } from "react";
import Step1Welcome from "./Step1Welcome";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step1OtpVerification from "./Step1OtpVerification";
import Step1RegistrationSuccess from "./Step1RegistrationSuccess";

const Step1Container = () => {
  const [subStep, setSubStep] = useState(0);

  const next = () => setSubStep((prev) => Math.min(prev + 1, 3));
  const back = () => setSubStep((prev) => Math.max(prev - 1, 0));

  const renderSubStep = () => {
    switch (subStep) {
      case 0:
        return <Step1Welcome onNext={next} />;
      case 1:
        return <Step1PersonalInfo onNext={next} onBack={back} />;
      case 2:
        return <Step1OtpVerification onNext={next} onBack={back} />;
      case 3:
        return <Step1RegistrationSuccess onBack={back} />;
      default:
        return null;
    }
  };

  return <div>{renderSubStep()}</div>;
};

export default Step1Container;
