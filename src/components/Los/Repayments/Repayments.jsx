import React, { useState, Suspense } from "react";
import LoadingState from "../../LoadingState/LoadingState";
import Tab from "../../Common/Tab/Tab";

const RepaymentDetails = React.lazy(() => import("./RepaymentDetails"));
const RepaymentHistory = React.lazy(() => import("./RepaymentHistory"));

const tabs = [
  { id: "repayment-details", label: "Repayment Details" },
  { id: "repayment-history", label: "Repayment History" },
];

const repaymentComponents = {
  "repayment-details": RepaymentDetails,
  "repayment-history": RepaymentHistory,
};


const Repayments = () => {
  const [activeTab, setActiveTab] = useState("repayment-details");
  const ActiveComponent = repaymentComponents[activeTab];

  return (
    <div className="mt-4">
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
              to={tab.to}
            />
          ))}
        </ul>
      </div>

      <Suspense fallback={<LoadingState />}>
        <ActiveComponent />
      </Suspense>
    </div>
  );
};

export default Repayments;
