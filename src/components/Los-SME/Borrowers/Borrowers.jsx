import React, { Suspense, useEffect, useState } from "react";
import { Outlet, Link, useLocation, useParams } from "react-router-dom";
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
      id: "view-company",
      path: "/loan/loan-origination-system/sme/borrowers/view-company",
      label: "View Company",
    },
    // { id: "update-borrower", path: "/loan/loan-origination-system/personal/borrowers/update-borrower/:uid", label: "Update Borrower" },
    // { id: "add-borrower-group", path: "/borrowers/add-borrower-group", label: "Add Borrower Group" },
    // { id: "view-borrower-group", path: "/borrowers/view-borrower-group", label: "View Borrower Group" },
  ];

  // Update activeTab based on the current route
  useEffect(() => {
    const active = tabs.find((tab) => currentPath.includes(tab.id)); // Check if path contains tab.id
    if (active) {
      setActiveTab(active.id);
    }
  }, [location, tabs]);

  return (
    <div className="mt-4">
      {/* Tab Navigation */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-4">
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

      {/* Content Rendering */}
      <div className="mt-4">
        <Suspense fallback={<LoadingState />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Borrowers;
