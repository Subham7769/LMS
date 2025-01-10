import React, { useState, Suspense, useEffect } from "react";
import LoadingState from "../../LoadingState/LoadingState";
import Tab from "../../Common/Tab/Tab";
import { Outlet, useLocation } from "react-router-dom";

const Loans = () => {
  const [activeTab, setActiveTab] = useState("loan-application");
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      id: "loan-application",
      path: "/loan/loan-origination-system/sme/loans/loan-application",
      label: "Loan Application",
    },
    // {
    //   id: "add-loan",
    //   path: "/loan/loan-origination-system/sme/loans/add-loan",
    //   label: "Add Loan",
    // },
    {
      id: "loan-offers",
      path: "/loan/loan-origination-system/sme/loans/loan-offers",
      label: "Loan Offers",
    },
    {
      id: "approve-loans",
      path: "/loan/loan-origination-system/sme/loans/approve-loans",
      label: "Approve Loans",
    },
    {
      id: "loan-history",
      path: "/loan/loan-origination-system/sme/loans/loan-history",
      label: "Loan History",
    },
    // {
    //   id: "collateral-register",
    //   path: "/loan/loan-origination-system/personal/loans/collateral-register",
    //   label: "Collateral Register",
    // },
  ];

  useEffect(() => {
    const active = tabs.find((tab) => currentPath.includes(tab.id)); // Check if path contains tab.id
    if (active) {
      setActiveTab(active.id);
    }
  }, [location, tabs]);

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
              to={tab.path}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <Suspense fallback={<LoadingState />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Loans;
