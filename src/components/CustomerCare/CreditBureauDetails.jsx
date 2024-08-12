import React, { useState, Suspense } from "react";
import LoadingState from "../LoadingState/LoadingState";
const CustomerAddress = React.lazy(() => import("./CustomerAddress"));
const CreditInstrument = React.lazy(() => import("./CreditInstrument"));
const DefaultDetails = React.lazy(() => import("./DefaultDetails"));
const Score = React.lazy(() => import("./Score"));
const DownloadReports = React.lazy(() => import("./DownloadReports"));

const tabComponents = {
  "customer-address": CustomerAddress,
  "credit-instruments": CreditInstrument,
  "default-details": DefaultDetails,
  score: Score,
  "download-reports": DownloadReports,
};

const tabs = [
  { id: "customer-address", label: "Customer Addresses" },
  { id: "credit-instruments", label: "Credit Instruments" },
  { id: "default-details", label: "Default Details" },
  { id: "score", label: "Score" },
  { id: "download-reports", label: "Download Reports" },
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
  const [activeTab, setActiveTab] = useState("customer-address");
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
