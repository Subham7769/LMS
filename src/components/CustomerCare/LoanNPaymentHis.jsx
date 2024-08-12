import { useState } from "react";
import LoanHistory from "./LoanHistory";
import PaymentHistory from "./PaymentHistory";

const Tab = ({ isActive, onClick, children }) => (
  <div
    className={`py-1 px-1.5 cursor-pointer rounded text-[16px] ${
      isActive
        ? "text-white bg-indigo-500 "
        : "text-indigo-500 hover:bg-gray-200 hover:text-indigo-900 hover:font-medium"
    }`}
    onClick={onClick}
  >
    {children}
  </div>
);

const LoanNPaymentHist = () => {
  const [isLoanVisible, setIsLoanVisible] = useState(true);

  return (
    <>
      <div className="flex mb-7">
        <div className=" px-2">
          <Tab isActive={isLoanVisible} onClick={() => setIsLoanVisible(true)}>
            Loan History
          </Tab>
        </div>
        <div className="px-2">
          <Tab
            isActive={!isLoanVisible}
            onClick={() => setIsLoanVisible(false)}
          >
            Payment History
          </Tab>
        </div>
      </div>
      {isLoanVisible ? <LoanHistory /> : <PaymentHistory />}
    </>
  );
};

export default LoanNPaymentHist;
