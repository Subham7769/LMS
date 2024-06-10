import { useLocation, Link, useParams, Outlet } from "react-router-dom";

const UserInfoTabs = () => {
  const { userID } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: `/user/${userID}/user-info`, label: "Eligibility" },
    { path: `/user/${userID}/register`, label: "Register" },
    { path: `/user/${userID}/loan-config`, label: "Loan Config" },
    { path: `/user/${userID}/disbursement`, label: "Disbursement Status" },
    { path: `/user/${userID}/repayment`, label: "Backend Repayments" },
    { path: `/user/${userID}/family-details`, label: "Family Details" },
    { path: `/user/${userID}/employment-details`, label: "Employment Details" },
  ];

  return (
    <div className="mt-4">
      <div className="flex mb-10">
        {tabs.map((tab) => (
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
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserInfoTabs;
