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
    <>
      <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Suspense fallback={<LoadingState />}>
        <ActiveComponent />
      </Suspense>
    </>
  );
};

export default Notifications;
