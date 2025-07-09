import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import Tab from "../Common/Tab/Tab";
import { Suspense, useState } from "react";
import LoadingState from "../LoadingState/LoadingState";

const CustomerCare = () => {
  const { subID } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const roleName = localStorage.getItem("roleName");
  const [activeTab, setActiveTab] = useState("personal-info");

  const tabs = [
    {
      id: "personal-info",
      path: `/loan/customer-care/${subID}/personal-info`,
      label: "Personal Info",
    },
    // {
    //   id: "credit-profile",
    //   path: `/loan/customer-care/${subID}/credit-profile`,
    //   label: "Credit Profile",
    // },
    // {
    //   id: "kyc-details",
    //   path: `/loan/customer-care/${subID}/kyc-details`,
    //   label: "KYC Details",
    // },
    {
      id: "loan-payment-history",
      path: `/loan/customer-care/${subID}/loan-payment-history`,
      label: "Loan & Payment History",
    },
    {
      id: "rejection-history",
      path: `/loan/customer-care/${subID}/rejection-history`,
      label: "Rejection History",
    },
    // {
    //   id: "credit-bureau-details",
    //   path: `/loan/customer-care/${subID}/credit-bureau-details`,
    //   label: "Credit Bureau Details",
    // },
    {
      id: "back-to-user-page",
      path: `/loan/product-testing/term-loan/${subID}/loan-config`,
      label: "Back to User Page",
    },
  ];

  return (
    <>
      <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Suspense fallback={<LoadingState />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default CustomerCare;
