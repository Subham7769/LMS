import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Tab from "../../Common/Tab/Tab";

const Transfer = () => {
  const { userID } = useParams();
  const [activeTab, setActiveTab] = useState("self");

  const tabs = [
    {
      id: "self",
      path: `/deposit/savings/accounts/${userID}/transfer/self`,
      label: "Self",
    },
    {
      id: "internal",
      path: `/deposit/savings/accounts/${userID}/transfer/internal`,
      label: "Internal",
    },
  ];
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-4 ">
        <ul className="flex flex-wrap">
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
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Transfer;
