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
      id: "add-bulk-repayment",
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

export default Refund;
