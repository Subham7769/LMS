import { useLocation, Link, Outlet } from "react-router-dom";

const Overdraft = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      path: "/product/overdraft/loan-product-config/OVERDRAFT",
      label: "Product Configuration",
    },
    {
      path: "/product/overdraft/credit-score/283c8ec2-33fd-4388-8c46-695098bdbd74",
      label: "Credit Score",
    },
    {
      path: "/product/overdraft/debt-burden-config",
      label: "Debt Burden Config",
    },
    {
      path: "/product/overdraft/credit-policy/283c8ec2-33fd-4388-8c46-695098bdbd74",
      label: "Credit Policy",
    },
    {
      path: "/product/overdraft/blocked-employer/283c8ec2-33fd-4388-8c46-695098bdbd74",
      label: "Blocked Employer",
    },
  ];

  return (
    <div className="mt-4">
      <h2 className="mb-5">
        Name: <b>Overdraft</b>
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
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Overdraft;
