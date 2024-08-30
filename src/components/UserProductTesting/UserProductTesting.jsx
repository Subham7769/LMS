import { useLocation, Link, useParams, Outlet } from "react-router-dom";

const UserProductTesting = () => {
  const { userID } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: `/user-product-testing/${userID}/eligibilty`, label: "Eligibility" },
    { path: `/user-product-testing/${userID}/register`, label: "Register" },
    { path: `/user-product-testing/${userID}/loan-config`, label: "Loan Config" },
    { path: `/user-product-testing/${userID}/disbursement-status`, label: "Disbursement Status" },
    { path: `/user-product-testing/${userID}/backend-repayment`, label: "Backend Repayments" },
    { path: `/user-product-testing/${userID}/family-details`, label: "Family Details" },
    { path: `/user-product-testing/${userID}/employment-details`, label: "Employment Details" },
  ];

  return (
    <div className="mt-4">
      <div className="flex mb-10">
        {tabs.map((tab) => (
          <div className="px-2" key={tab.path}>
            <Link
              to={tab.path}
              className={`py-1 px-1.5 text-[16px] rounded ${
                currentPath === tab.path
                  ? "text-white bg-indigo-500 "
                  : "text-indigo-500  hover:bg-gray-200 hover:text-indigo-900 hover:font-medium"
              }`}
            >
              {tab.label}
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserProductTesting;
