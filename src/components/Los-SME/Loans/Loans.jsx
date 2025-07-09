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
    let active = tabs.find((tab) => currentPath.includes(tab.id));

    // If currentPath includes "add-loan", force "loan-application" as active
    if (currentPath.includes("add-loan")) {
      setActiveTab("loan-application");
    } else if (active) {
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

export default Loans;
