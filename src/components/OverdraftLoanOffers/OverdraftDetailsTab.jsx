
import React, { useState, Suspense } from "react";
import LoadingState from "../LoadingState/LoadingState";
const GeneralDetails = React.lazy(() => import("./GeneralDetails"));
const OutstandingDetails = React.lazy(() => import("./OutstandingDetails"));
const PIFDetails = React.lazy(() => import("./PIFDetails"));
  
  const tabComponents = {
    "general-details": GeneralDetails,
    "outstanding-details": OutstandingDetails,
    "pif-details": PIFDetails,
  };
  
  const tabs = [
    { id: "general-details", label: "General Details"  },
    { id: "outstanding-details", label: "Outstanding Details" },
    { id: "pif-details", label: "PIF Details" },
  ];
  
  const Tab = ({ id, label, activeTab, setActiveTab }) => (
    <div className="px-2">
      <div
        className={`py-1 px-1.5 cursor-pointer rounded text-[16px] ${
          activeTab === id
            ? "text-white bg-indigo-500 "
            : "text-indigo-500 hover:bg-gray-200 hover:text-indigo-900 hover:font-medium"
        }`}
        onClick={() => setActiveTab(id)}
      >
        {label}
      </div>
    </div>
  );
  
  const CreditBureauDetails = () => {
    const [activeTab, setActiveTab] = useState("general-details");
    const ActiveComponent = tabComponents[activeTab];
  
    return (
      <div className="mt-4">
        <div className="flex mb-10">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
        <Suspense fallback={<LoadingState />}>
          <ActiveComponent />
        </Suspense>
      </div>
    );
  };
  
  export default CreditBureauDetails;
  