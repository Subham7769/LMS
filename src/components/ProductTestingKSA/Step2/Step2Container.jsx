import React, { useState } from "react";
import InitialDetails from "./InitialDetails.jsx";
import LoanEstimate from "./LoanEstimate";
import IdentityVerification from "./IdentityVerification";
import Completion from "./Completion";

const PreEligibilityContainer = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => Math.min(prev + 1, 3));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return <InitialDetails onNext={next} />;
      case 1:
        return <LoanEstimate onNext={next} onBack={back} />;
      case 2:
        return <IdentityVerification onNext={next} onBack={back} />;
      case 3:
        return <Completion onBack={back} />;
      default:
        return null;
    }
  };

  return <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow border-2">{renderStep()}</div>;
};

export default PreEligibilityContainer;
