import React, { useState } from "react";
import LoanHistory from "./LoanHistory";
import PaymentHistory from "./PaymentHistory";
import Tab from "../Common/Tab/Tab";

const LoanNPaymentHist = () => {
  const [activeTab, setActiveTab] = useState("loan-history");

  const tabs = [
    { id: "loan-history", label: "Loan History"},
    { id: "payment-history", label: "Payment History" },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </ul>
      </div>

      {/* Content based on active tab */}
      <div className="mt-4">
        {activeTab === "loan-history" ? <LoanHistory /> : <PaymentHistory />}
      </div>
    </div>
  );
};

export default LoanNPaymentHist;
