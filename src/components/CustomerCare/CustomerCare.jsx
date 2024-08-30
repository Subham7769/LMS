import { Outlet, Link, useParams, useLocation } from "react-router-dom";

const CustomerCare = () => {
  const { subID } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const roleName = localStorage.getItem("roleName");

  const tabs = [
    { path: `/customer-care/${subID}/personal-info`, label: "Personal Info" },
    { path: `/customer-care/${subID}/credit-profile`, label: "Credit Profile" },
    { path: `/customer-care/${subID}/kyc-details`, label: "KYC Details" },
    {
      path: `/customer-care/${subID}/loan-payment-history`,
      label: "Loan & Payment History",
    },
    {
      path: `/customer-care/${subID}/rejection-history`,
      label: "Rejection History",
    },
    {
      path: `/customer-care/${subID}/credit-bureau-details`,
      label: "Credit Bureau Details",
    },
    { path: `/user-product-testing/${subID}/eligibilty`, label: "Back to User Page" },
  ];

  return (
    <div className="mt-4 text-sm">
      <div className="flex justify-between">
        <div className="flex mb-10">
          {tabs.slice(0, 6).map((tab) => (
            roleName === "ROLE_CUSTOMER_CARE_USER" && tab.label === "Credit Bureau Details" ? <></> :
              (<div className=" px-2 " key={tab.path}>
                <Link
                  to={tab.path}
                  className={`py-1 px-1.5 text-[16px] rounded ${currentPath === tab.path
                      ? "text-white bg-indigo-500 "
                      : "text-indigo-600 hover:bg-gray-200 hover:text-indigo-700 hover:font-medium"
                    }`}
                >
                  {tab.label}
                </Link>
              </div>)
          ))}
        </div>
        {
          roleName === "ROLE_CUSTOMER_CARE_MANAGER" || roleName === "ROLE_CUSTOMER_CARE_USER" ? "" : <div className="px-2">
            <Link
              to={tabs[6].path}
              className={`bg-gray-500 rounded py-1 px-1.5 text-[16px] ${currentPath === tabs[6].path
                  ? "text-white bg-indigo-500 rounded"
                  : "text-white hover:border-b hover:bg-indigo-600 hover:font-medium"
                }`}
            >
              {tabs[6].label}
            </Link>
          </div>
        }

      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerCare;
