import React, { useState, Suspense } from "react";
import LoadingState from "../../LoadingState/LoadingState";

const RepaymentDetails = React.lazy(() => import("./RepaymentDetails"));
const RepaymentHistory = React.lazy(() => import("./RepaymentHistory"));

const repaymentTabs = [
  { id: "repayment-details", label: "Repayment Details" },
  { id: "repayment-history", label: "Repayment History" },
];

const repaymentComponents = {
  "repayment-details": RepaymentDetails,
  "repayment-history": RepaymentHistory,
};

const Tab = ({ id, label, activeTab, setActiveTab }) => (
  <div className="px-2">
    <div
      className={`py-1 px-1.5 cursor-pointer rounded text-[16px] ${
        activeTab === id
          ? "text-white bg-indigo-500"
          : "text-indigo-500 hover:bg-gray-200 hover:text-indigo-900 hover:font-medium"
      }`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </div>
  </div>
);

const Repayments = () => {
  const [activeTab, setActiveTab] = useState("repayment-details");
  const ActiveComponent = repaymentComponents[activeTab];

  return (
    <div className="mt-4">
      <div className="flex mb-10">
        {repaymentTabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      <Suspense fallback={<LoadingState />}>
        <ActiveComponent />
      </Suspense>
    </div>
  );
};

export default Repayments;
