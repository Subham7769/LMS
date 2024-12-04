import React, { useState, Suspense } from "react";
import LoadingState from "../../LoadingState/LoadingState";
import Tab from "../../Common/Tab/Tab";

const ViewBorrowers = React.lazy(() => import("./ViewBorrowers"));
const AddBorrowers = React.lazy(() => import("./AddBorrowers"));
const AddBorrowersGroup = React.lazy(() => import("./AddBorrowersGroup"));
const ViewBorrowersGroup = React.lazy(() => import("./ViewBorrowersGroup"));

const tabs = [
  { id: "add-borrower", label: "Add Borrower" },
  { id: "view-borrower", label: "View Borrower" },
  { id: "add-borrower-group", label: "Add Borrower Group" },
  { id: "view-borrower-group", label: "View Borrower Group" },
];

const borrowerComponents = {
  "view-borrower": ViewBorrowers,
  "add-borrower": AddBorrowers,
  "view-borrower-group": ViewBorrowersGroup,
  "add-borrower-group": AddBorrowersGroup,
};

const Borrowers = () => {
  const [activeTab, setActiveTab] = useState("add-borrower-group");
  const ActiveComponent = borrowerComponents[activeTab];

  return (
    <div className="mt-4">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <Suspense fallback={<LoadingState />}>
          <ActiveComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default Borrowers;
