import React, { useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import Tab from "../../Common/Tab/Tab";

const TermLoan = () => {
  const { userID } = useParams();
  const [activeTab, setActiveTab] = useState("eligibility");

  const tabs = [
    {
      id: "eligibility",
      label: "Eligibility",
      to: `/product-testing/term-loan/${userID}/eligibilty`,
    },
    {
      id: "register",
      label: "Register",
      to: `/product-testing/term-loan/${userID}/register`,
    },
    {
      id: "loan-config",
      label: "Loan Config",
      to: `/product-testing/term-loan/${userID}/loan-config`,
    },
    {
      id: "disbursement-status",
      label: "Disbursement Status",
      to: `/product-testing/term-loan/${userID}/disbursement-status`,
    },
    {
      id: "backend-repayment",
      label: "Backend Repayments",
      to: `/product-testing/term-loan/${userID}/backend-repayment`,
    },
    {
      id: "family-details",
      label: "Family Details",
      to: `/product-testing/term-loan/${userID}/family-details`,
    },
    {
      id: "employment-details",
      label: "Employment Details",
      to: `/product-testing/term-loan/${userID}/employment-details`,
    },
  ];

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

      {/* Content Rendering */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default TermLoan;
