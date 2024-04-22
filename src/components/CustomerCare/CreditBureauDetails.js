import { useState } from "react";
import CustomerAddress from "./CustomerAddress";
import CreditInstrument from "./CreditInstrument";
import DefaultDetails from "./DefaultDetails";
import Score from "./Score";
import DownloadReports from "./DownloadReports";

const CreditBureauDetails = () => {
  const [activeTab, setActiveTab] = useState("customer-address");

  return (
    <div className="mt-4">
      <div className="flex mb-10">
        <div className="border-r border-gray-400 px-2">
          <div
            className={`py-1 px-1.5 cursor-pointer ${
              activeTab === "customer-address"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveTab("customer-address")}
          >
            Customer Addresses
          </div>
        </div>
        <div className="border-r border-gray-400 px-2">
          <div
            className={`py-1 px-1.5 cursor-pointer ${
              activeTab === "credit-instruments"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveTab("credit-instruments")}
          >
            Credit Instruments
          </div>
        </div>
        <div className="border-r border-gray-400 px-2">
          <div
            className={`py-1 px-1.5 cursor-pointer ${
              activeTab === "default-details"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveTab("default-details")}
          >
            Default Details
          </div>
        </div>
        <div className="border-r border-gray-400 px-2">
          <div
            className={`py-1 px-1.5 cursor-pointer ${
              activeTab === "score"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveTab("score")}
          >
            Score
          </div>
        </div>
        <div className="px-2">
          <div
            className={`py-1 px-1.5 cursor-pointer ${
              activeTab === "download-reports"
                ? "text-white bg-indigo-500 rounded"
                : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
            }`}
            onClick={() => setActiveTab("download-reports")}
          >
            Download Reports
          </div>
        </div>
      </div>
      <div className="">
        {activeTab === "customer-address" && <CustomerAddress />}
        {activeTab === "credit-instruments" && <CreditInstrument />}
        {activeTab === "default-details" && <DefaultDetails />}
        {activeTab === "score" && <Score />}
        {activeTab === "download-reports" && <DownloadReports />}
      </div>
    </div>
  );
};

export default CreditBureauDetails;
