import React, { useState, Suspense } from "react";
import LoadingState from "../../LoadingState/LoadingState";

const LoanDetails = React.lazy(() => import("./LoanDetails"));
const LoanHistory = React.lazy(() => import("./LoanHistory"));

const loanTabs = [
  { id: "loan-details", label: "Loan Details" },
  { id: "loan-history", label: "Loan History" },
];

const loanComponents = {
  "loan-details": LoanDetails,
  "loan-history": LoanHistory,
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

const Loans = () => {
  const [activeTab, setActiveTab] = useState("loan-details");
  const ActiveComponent = loanComponents[activeTab];

  return (
    <div className="mt-4">
      <div className="flex mb-10">
        {loanTabs.map((tab) => (
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

export default Loans;
