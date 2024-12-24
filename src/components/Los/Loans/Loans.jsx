import React, { useState, Suspense } from "react";
import LoadingState from "../../LoadingState/LoadingState";
import Tab from "../../Common/Tab/Tab";

const AddLoans = React.lazy(() => import("./AddLoans"));
const LoanHistory = React.lazy(() => import("./LoanHistory"));
const ApproveLoans = React.lazy(() => import("./ApproveLoans"));
const CollateralRegister = React.lazy(() => import("./CollateralRegister"));

const tabs = [
  { id: "add-loan", label: "Add Loan" },
  { id: "approve-loans", label: "Approve Loans" },
  { id: "loan-history", label: "Loan History" },
  // { id: "collateral-register", label: "Collateral Register" },
];

const loanComponents = {
  "add-loan": AddLoans,
  "loan-history": LoanHistory,
  "approve-loans": ApproveLoans,
  // "collateral-register": CollateralRegister,
};


const Loans = () => {
  const [activeTab, setActiveTab] = useState("add-loan");
  const ActiveComponent = loanComponents[activeTab];

  return (
    <div className="mt-4">
      {/* Tab Navigation */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-5">
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

export default Loans;
