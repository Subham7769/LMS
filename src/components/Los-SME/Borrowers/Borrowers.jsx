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
      id: "add-company",
      path: "/loan/loan-origination-system/sme/borrowers/add-company",
      label: "Add Company",
    },
    {
      id: "add-director",
      path: "/loan/loan-origination-system/sme/borrowers/add-director",
      label: "Add Director",
    },
    {
      id: "add-shareholder",
      path: "/loan/loan-origination-system/sme/borrowers/add-shareholder",
      label: "Add Shareholder",
    },
    {
      id: "add-documents",
      path: "/loan/loan-origination-system/sme/borrowers/add-documents",
      label: "Add/Edit Documents",
    },
    {
      id: "view-company",
      path: "/loan/loan-origination-system/sme/borrowers/view-company",
      label: "View Company",
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
