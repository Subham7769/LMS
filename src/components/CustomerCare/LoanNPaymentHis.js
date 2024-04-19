import { useState } from "react";
import LoanHistory from "./LoanHistory";
import PaymentHistory from "./PaymentHistory";

const LoanNPaymentHist = () => {
  const [isLoanVisible, setLoanVisible] = useState(true);
  return (
    <>
      <div className="flex mb-7">
        <div className="border-r border-gray-400 px-2">
          <div
            className={`py-1 px-1.5 cursor-pointer ${
              isLoanVisible
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setLoanVisible(true)}
          >
            Loan History
          </div>
        </div>
        <div className=" px-2">
          <div
            className={`py-1 px-1.5 cursor-pointer ${
              isLoanVisible
                ? "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
                : "text-white bg-indigo-500 rounded"
            }`}
            onClick={() => setLoanVisible(false)}
          >
            Payment History
          </div>
        </div>
      </div>
      {isLoanVisible ? <LoanHistory /> : <PaymentHistory />}
    </>
  );
};

export default LoanNPaymentHist;
