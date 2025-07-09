import React, { useState, Suspense, useEffect } from "react";
import LoadingState from "../../LoadingState/LoadingState";
import Tab from "../../Common/Tab/Tab";
import { Outlet, useLocation } from "react-router-dom";


const Repayments = () => {
  const [activeTab, setActiveTab] = useState("add-bulk-repayment");
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      id: "add-bulk-repayment",
      path: "/loan/loan-origination-system/sme/repayments/add-bulk-repayment",
      label: "Add Bulk Repayment",
    },
    {
      id: "upload-repayment",
      path: "/loan/loan-origination-system/sme/repayments/upload-repayment",
      label: "Upload Repayment",
    },
    {
      id: "approve-repayment",
      path: "/loan/loan-origination-system/sme/repayments/approve-repayment",
      label: "Approve Repayment",
    },
  ];

  useEffect(() => {
    const active = tabs.find((tab) => currentPath.includes(tab.id)); // Check if path contains tab.id
    if (active) {
      setActiveTab(active.id);
    }
  }, [location, tabs]);

  return (
    <>
      <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Suspense fallback={<LoadingState />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Repayments;
