import React, { useState, Suspense } from "react";
import LoadingState from "../LoadingState/LoadingState";

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
  { id: "ProjectNotifications", label: "Project" },
  { id: "RecoveryNotifications", label: "Recovery" },
];

const Tab = ({ id, label, activeTab, setActiveTab }) => (
  <div className="px-2">
    <div
      className={`py-1 px-2 cursor-pointer rounded text-[16px] whitespace-nowrap ${
        activeTab === id
          ? "text-white bg-indigo-500"
          : "text-indigo-500 hover:bg-gray-200 hover:text-indigo-900 hover:font-medium"
      }`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </div>
  </div>
);

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("ProductNotifications");
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="mt-4">
      <div className="flex flex-wrap w-full items-center mb-10 gap-2">
        {tabs.map((tab) => (
          <Tab
            key={`${tab.id}-${tab.label}`}
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

export default Notifications;
