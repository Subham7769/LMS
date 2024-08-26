import { useLocation, Link, useParams, Outlet } from "react-router-dom";

const UserInfoTabs = () => {
  const { userID } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: `/user/${userID}/user-eligibilty`, label: "Eligibility" },
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

export default UserInfoTabs;
