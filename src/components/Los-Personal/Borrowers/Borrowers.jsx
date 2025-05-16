import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingState from "../../LoadingState/LoadingState";
import Tab from "../../Common/Tab/Tab";

const Borrowers = () => {
  const [activeTab, setActiveTab] = useState("add-borrower");
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      id: "add-borrower",
      path: "/loan/loan-origination-system/personal/borrowers/add-borrower",
      label: "Add Borrower",
    },
    {
      id: "view-borrower",
      path: "/loan/loan-origination-system/personal/borrowers/view-borrower",
      label: "View Borrower",
    },
  ];

  // Update activeTab based on the current route
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

export default Borrowers;
