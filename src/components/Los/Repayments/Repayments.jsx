import React, { useState, Suspense } from "react";
import LoadingState from "../../LoadingState/LoadingState";
import Tab from "../../Common/Tab/Tab";

const AddBulkRepayment = React.lazy(() => import("./AddBulkRepayment"));
const UploadRepayment = React.lazy(() => import("./UploadRepayment"));
const ApproveRepayment = React.lazy(() => import("./ApproveRepayment"));

const tabs = [
  { id: "add-bulk-repayment", label: "Add Bulk Repayment" },
  { id: "upload-repayment", label: "Upload Repayment" },
  { id: "approve-repayment", label: "Approve Repayment" },
];

const repaymentComponents = {
  "add-bulk-repayment": AddBulkRepayment,
  "upload-repayment": UploadRepayment,
  "approve-repayment": ApproveRepayment,
};


const Repayments = () => {
  const [activeTab, setActiveTab] = useState("upload-repayment");
  const ActiveComponent = repaymentComponents[activeTab];

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
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              to={tab.to}
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

export default Repayments;
