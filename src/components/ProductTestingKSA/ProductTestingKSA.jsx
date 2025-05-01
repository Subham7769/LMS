import React, { useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import Tab from "../Common/Tab/Tab";
import { ActiveTabProvider } from "./ActiveTabContext";  // Import the context

const ProductTestingKSA = () => {
  const { userID } = useParams();
  const [activeTab, setActiveTab] = useState("create-account");

  const tabs = [
    {
      id: "create-account",
      label: "Create Your Account",
      to: `/loan/product-testing-KSA/create-account`,
    },
    {
      id: "pre-eligibility-check",
      label: "Pre-Eligibility Check",
      to: `/loan/product-testing-KSA/pre-eligibility-check`,
    },
    {
      id: "eligibility-verification",
      label: "Eligibility Verification",
      to: `/loan/product-testing-KSA/eligibility-verification`,
    },
    {
      id: "loan-application",
      label: "Loan Application",
      to: `/loan/product-testing-KSA/loan-application`,
    },
  ];

  return (
    <ActiveTabProvider setActiveTab={setActiveTab}>  {/* Wrap with provider */}
      <div className="mt-4">
        {/* Tab Navigation */}
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
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

        {/* Content Rendering */}
        <div className="mt-4">
          <Outlet /> {/* Child components will now have access to setActiveTab */}
        </div>
      </div>
    </ActiveTabProvider>
  );
};

export default ProductTestingKSA;
