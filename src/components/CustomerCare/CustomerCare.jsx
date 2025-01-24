import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import Tab from "../Common/Tab/Tab";
import { useState } from "react";

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
      path: `/loan/product-testing/term-loan/${subID}/eligibilty`,
      label: "Back to User Page",
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-4 ">
        <ul className="flex flex-wrap">
          {tabs
            .slice(0, 3)
            .map((tab) =>
              roleName === "ROLE_CUSTOMER_CARE_USER" &&
              tab.label === "Credit Bureau Details" ? (
                <></>
              ) : (
                <Tab
                  id={tab.id}
                  label={tab.label}
                  to={tab.path}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              )
            )}
        </ul>
        {roleName === "ROLE_CUSTOMER_CARE_MANAGER" ||
        roleName === "ROLE_CUSTOMER_CARE_USER" ? (
          ""
        ) : (
          <div className="px-2">
            <Link
              to={tabs[3].path}
              className={`bg-gray-500 rounded py-1 px-1.5 text-[16px] ${
                currentPath === tabs[3].path
                  ? "text-white bg-indigo-500 rounded"
                  : "text-white hover:border-b hover:bg-indigo-600 hover:font-medium"
              }`}
            >
              {tabs[3].label}
            </Link>
          </div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerCare;
