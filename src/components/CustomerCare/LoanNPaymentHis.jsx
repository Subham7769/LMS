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
      <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content based on active tab */}
      <div className="mt-4">
        {activeTab === "loan-history" ? <LoanHistory /> : <PaymentHistory />}
      </div>
    </div>
  );
};

export default LoanNPaymentHist;
