import React, { createContext, useContext, useState } from "react";

const ActiveTabContext = createContext();

export const useActiveTab = () => {
  return useContext(ActiveTabContext);
};

export const ActiveTabProvider = ({ children, setActiveTab }) => {
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    period: "",
    repayment: "",
    email: "",
    basicPay: "",
    borrowerId: "",
    interestRate: 0,
  });
  const [preOfferSteps, setPreOfferSteps] = useState([0,1,2])
  const [subStep, setSubStep] = useState(0);
  console.log(subStep)

  const next = () => setSubStep((prev) => Math.min(prev + 1, preOfferSteps.length - 1));
  const back = () => setSubStep((prev) => Math.max(prev - 1, 0));
  return (
    <ActiveTabContext.Provider value={{ formData, setFormData, subStep, setSubStep, next, back, preOfferSteps }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
