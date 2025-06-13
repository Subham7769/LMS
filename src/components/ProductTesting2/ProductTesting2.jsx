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
    const active = tabs.find((tab) => currentPath.includes(tab.id)); // Check if path contains tab.id
    if (active) {
      setActiveTab(active.id);
    }
  }, [location, tabs]);

  return (
    <>
      {/* Tab Navigation */}
      <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Suspense fallback={<LoadingState />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default ProductTesting2;
