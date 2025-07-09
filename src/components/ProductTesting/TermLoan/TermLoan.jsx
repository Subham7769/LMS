import React, { Suspense, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import Tab from "../../Common/Tab/Tab";
import LoadingState from "../../LoadingState/LoadingState";

const TermLoan = () => {
  const { userID } = useParams();
  const [activeTab, setActiveTab] = useState("loan-config");

  const tabs = [
    // {
    //   id: "eligibility",
    //   label: "Eligibility",
    //   to: `/loan/product-testing/term-loan/${userID}/eligibilty`,
    // },
    // {
    //   id: "register",
    //   label: "Register",
    //   to: `/loan/product-testing/term-loan/${userID}/register`,
    // },
    {
      id: "loan-config",
      label: "Loan Config",
      to: `/loan/product-testing/term-loan/${userID}/loan-config`,
    },
    // {
    //   id: "disbursement-status",
    //   label: "Disbursement Status",
    //   to: `/loan/product-testing/term-loan/${userID}/disbursement-status`,
    // },
    // {
    //   id: "backend-repayment",
    //   label: "Backend Repayments",
    //   to: `/loan/product-testing/term-loan/${userID}/backend-repayment`,
    // },
    // {
    //   id: "family-details",
    //   label: "Family Details",
    //   to: `/loan/product-testing/term-loan/${userID}/family-details`,
    // },
    // {
    //   id: "employment-details",
    //   label: "Employment Details",
    //   to: `/loan/product-testing/term-loan/${userID}/employment-details`,
    // },
  ];

  return (
    <>
      {/* Tab Navigation */}
      <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Suspense fallback={<LoadingState />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default TermLoan;
