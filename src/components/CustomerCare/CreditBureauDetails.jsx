import React, { useState, Suspense } from "react";
import LoadingState from "../LoadingState/LoadingState";
const CustomerAddress = React.lazy(() => import("./CustomerAddress"));
const CreditInstrument = React.lazy(() => import("./CreditInstrument"));
const DefaultDetails = React.lazy(() => import("./DefaultDetails"));
const Score = React.lazy(() => import("./Score"));
const DownloadReports = React.lazy(() => import("./DownloadReports"));
import Tab from "../Common/Tab/Tab";

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


const CreditBureauDetails = () => {
  const [activeTab, setActiveTab] = useState("customer-address");
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div>
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
      <Suspense fallback={<LoadingState />}>
        <ActiveComponent />
      </Suspense>
    </div>
  );
};

export default CreditBureauDetails;
