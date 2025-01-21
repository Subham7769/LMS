import React, { useState, Suspense } from "react";
import LoadingState from "../LoadingState/LoadingState";
import Tab from "../Common/Tab/Tab";


const ProductNotifications = React.lazy(() => import("./ProductNotifications"));
const ProjectNotifications = React.lazy(() => import("./ProjectNotifications"));
const RecoveryNotifications = React.lazy(() => import("./RecoveryNotifications"));

const tabComponents = {
  ProductNotifications: ProductNotifications,
  ProjectNotifications: ProjectNotifications,
  RecoveryNotifications: RecoveryNotifications,
};

const tabs = [
  { id: "ProductNotifications", label: "Product" },
  // { id: "ProjectNotifications", label: "Project" },
  // { id: "RecoveryNotifications", label: "Recovery" },
];


const Notifications = () => {
  const [activeTab, setActiveTab] = useState("ProductNotifications");
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="mt-4">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-5">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <Tab
              key={`${tab.id}-${tab.label}`}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </ul>
      </div>
      <Suspense fallback={<LoadingState />}>
        <ActiveComponent />
      </Suspense>
    </div>
  );
};

export default Notifications;
