import React, { useState } from "react";
import AMLVerification from "./AMLVerification";
import SalaryVerification from "./SalaryVerification";
import CreditHistory from "./CreditHistory";
import EligibilityCompletion from "./EligibilityCompletion";
import IdentityVerification from "./IdentityVerification";
import NafathNumber from "./NafathNumber";

const Step3Container = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => Math.min(prev + 1, 5));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return <IdentityVerification onNext={next} />;
      case 1:
        return <NafathNumber onNext={next} onBack={back} />;
      case 2:
        return <AMLVerification onNext={next} />;
      case 3:
        return <SalaryVerification onNext={next} onBack={back} />;
      case 4:
        return <CreditHistory onNext={next} onBack={back} />;
      case 5:
        return <EligibilityCompletion onBack={back} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow border-2">

      {renderStep()}
    </div>
  );
};

export default Step3Container;
