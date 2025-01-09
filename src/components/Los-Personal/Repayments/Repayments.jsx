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
      path: "/loan/loan-origination-system/personal/repayments/add-bulk-repayment",
      label: "Add Bulk Repayment",
    },
    {
      id: "upload-repayment",
      path: "/loan/loan-origination-system/personal/repayments/upload-repayment",
      label: "Upload Repayment",
    },
    {
      id: "approve-repayment",
      path: "/loan/loan-origination-system/personal/repayments/approve-repayment",
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

export default Repayments;
