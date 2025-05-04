import React, { useState } from "react";
import LoanOffers from "./LoanOffers";
import DigitalContract from "./DigitalContract";
import PromissoryNote from "./PromissoryNote";
import IbanVerification from "./IbanVerification";
import LoanCompletion from "./LoanCompletion"; // You can use the existing completion component
import SalaryDeclaration from "./SalaryDeclaration";

const Step4Container = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => Math.min(prev + 1, 4));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return <SalaryDeclaration onNext={next} />;
      case 1:
        return <LoanOffers onNext={next} />;
      case 2:
        return <DigitalContract onNext={next} onBack={back} />;
      case 3:
        return <PromissoryNote onNext={next} onBack={back} />;
      case 4:
        return <IbanVerification onNext={next} onBack={back} />;
      case 5:
        return <LoanCompletion onBack={back} />;
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

export default Step4Container;
