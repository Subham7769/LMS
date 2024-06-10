import { useState } from "react";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";

const BorrowerInfoTabs = () => {
  const { subID } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: `/borrower/${subID}/personal-info`, label: "Personal Info" },
    { path: `/borrower/${subID}/credit-profile`, label: "Credit Profile" },
    { path: `/borrower/${subID}/kyc`, label: "KYC Details" },
    {
      path: `/borrower/${subID}/loanNpayment`,
      label: "Loan & Payment History",
    },
    {
      path: `/borrower/${subID}/rejection-history`,
      label: "Rejection History",
    },
    {
      path: `/borrower/${subID}/credit-bureau-details`,
      label: "Credit Bureau Details",
    },
    { path: `/user/${subID}/user-info`, label: "Back to User Page" },
  ];

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <div className="flex mb-10">
          {tabs.slice(0, 6).map((tab) => (
            <div className="border-r border-gray-400 px-2" key={tab.path}>
              <Link
                to={tab.path}
                className={`py-1 px-1.5 ${
                  currentPath === tab.path
                    ? "text-white bg-indigo-500 rounded"
                    : "text-indigo-500 hover:border-b hover:border-red-600 hover:text-indigo-700 hover:font-medium"
                }`}
              >
                {tab.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="px-2">
          <Link
            to={tabs[6].path}
            className={`bg-gray-500 rounded py-1 px-1.5 ${
              currentPath === tabs[6].path
                ? "text-white bg-indigo-500 rounded"
                : "text-white hover:border-b hover:border-red-600 hover:font-medium"
            }`}
          >
            {tabs[6].label}
          </Link>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default BorrowerInfoTabs;
