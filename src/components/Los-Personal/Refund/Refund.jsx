import React, { useState, Suspense, useEffect } from "react";
import LoadingState from "../../LoadingState/LoadingState";
import Tab from "../../Common/Tab/Tab";
import { Outlet, useLocation } from "react-router-dom";

const Refund = () => {
  const [activeTab, setActiveTab] = useState("refund-application");
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      id: "refund-application",
      path: "/loan/loan-origination-system/personal/refund/refund-application",
      label: "Refund Application",
    },
    {
      id: "approve-refund",
      path: "/loan/loan-origination-system/personal/refund/approve-refund",
      label: "Approve Refund",
    },
    {
      id: "refund-history",
      path: "/loan/loan-origination-system/personal/refund/refund-history",
      label: "Refund History",
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

export default Refund;
