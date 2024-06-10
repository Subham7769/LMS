import { useLocation, Link, Outlet } from "react-router-dom";

const BNPL = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      path: "/product/bnpl/loan-product-config/BNPL",
      label: "Product Config",
    },
    {
      path: "/product/bnpl/credit-score/4486edd6-8e24-46ce-b6ea-67d6a2c1032b",
      label: "Credit Score",
    },
    {
      path: "/product/bnpl/debt-burden-config",
      label: "Debt Burden Config",
    },
    {
      path: "/product/bnpl/credit-policy/4486edd6-8e24-46ce-b6ea-67d6a2c1032b",
      label: "Credit Policy",
    },
    {
      path: "/product/bnpl/blocked-employer/4486edd6-8e24-46ce-b6ea-67d6a2c1032b",
      label: "Blocked Employer",
    },
  ];

  return (
    <div className="mt-4">
      <h2 className="mb-5">
        Name: <b>BNPL</b>
      </h2>
      <div className="flex mb-5">
        {tabs.map((tab) => (
          <div className="border-r border-gray-400 px-2" key={tab.path}>
            <Link
              to={tab.path}
              className={`py-1 px-1.5 ${
                currentPath === tab.path
                  ? "text-white bg-indigo-500 rounded"
                  : "text-indigo-500 hover:border-b hover:border-gray-400 hover:text-indigo-700 hover:font-medium"
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

export default BNPL;
