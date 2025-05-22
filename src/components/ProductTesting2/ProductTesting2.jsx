import React, { useState, Suspense, useEffect } from "react";
import LoadingState from "../LoadingState/LoadingState";
import Tab from "../Common/Tab/Tab";
import { Outlet, useLocation } from "react-router-dom";

const ProductTesting2 = () => {
  const [activeTab, setActiveTab] = useState("loan-application");
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      id: "loan-application",
      path: "loan-application",
      label: "Asset Financing Application",
    },
    // {
    //   id: "add-loan",
    //   path: "add-loan",
    //   label: "Add Loan",
    // },
    {
      id: "inspection-verification",
      path: "inspection-verification",
      label: "Inspection & Verification",
    },
    {
      id: "loan-offers",
      path: "loan-offers",
      label: "Equipment financing offer",
    },
    {
      id: "approve-loans",
      path: "approve-loans",
      label: "Financing Approval",
    },
    {
      id: "loan-history",
      path: "loan-history",
      label: "Portfolio Management",
    },
    // {
    //   id: "collateral-register",
    //   path: "/loan/loan-origination-system/personal/loans/collateral-register",
    //   label: "Collateral Register",
    // },
  ];

  useEffect(() => {
    let active = tabs.find((tab) => currentPath.includes(tab.id));

    // If currentPath includes "add-loan", force "loan-application" as active
    if (currentPath.includes("add-loan")) {
      setActiveTab("loan-application");
    } else if (active) {
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

export default ProductTesting2;
