import React, { Suspense, useEffect, useState } from "react";
import { useParams, Outlet, useLocation } from "react-router-dom";
import Tab from "../Common/Tab/Tab";
import { ActiveTabProvider } from "./ActiveTabContext";  // Import the context
import LoadingState from "../LoadingState/LoadingState";

const ProductTestingKSA = () => {
  const { userID } = useParams();
  const [activeTab, setActiveTab] = useState("create-account");
  const location = useLocation();
  const currentPath = location.pathname;


  const tabs = [
    {
      id: "create-account",
      label: "Create Your Account",
      path: `/loan/product-testing-KSA/create-account`,
    },
    {
      id: "pre-eligibility-check",
      label: "Pre-Eligibility Check",
      path: `/loan/product-testing-KSA/pre-eligibility-check`,
    },
    {
      id: "eligibility-verification",
      label: "Eligibility Verification",
      path: `/loan/product-testing-KSA/eligibility-verification`,
    },
    {
      id: "loan-application",
      label: "Loan Application",
      path: `/loan/product-testing-KSA/loan-application`,
    },
  ];

   useEffect(() => {
      const active = tabs.find((tab) => currentPath.includes(tab.id)); // Check if path contains tab.id
      if (active) {
        setActiveTab(active.id);
      }
    }, [location, tabs]);

  return (
    <>
      <ActiveTabProvider setActiveTab={setActiveTab}>
        <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Suspense fallback={<LoadingState />}>
          <Outlet />
        </Suspense>
      </ActiveTabProvider>
    </>
  );
};

export default ProductTestingKSA;
