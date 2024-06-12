import { useLocation, Link, Outlet, useParams } from "react-router-dom";

const CashLoan = () => {
  const location = useLocation();
  const { productType, projectId } = useParams();
  const currentPath = location.pathname;

  const tabs = [
    {
      path: "/product/" + productType + "/loan-product-config/" + projectId,
      label: "Product Config",
    },
    {
      path: "/product/" + productType + "/credit-score/" + projectId,
      label: "Credit Score",
    },
    {
      path: "/product/" + productType + "/debt-burden-config/" + projectId,
      label: "Debt Burden Config",
    },
    {
      path: "/product/" + productType + "/credit-policy/" + projectId,
      label: "Credit Policy",
    },
    {
      path: "/product/" + productType + "/blocked-employer/" + projectId,
      label: "Blocked Employer",
    },
  ];

  return (
    <div className="mt-4">
      <h2 className="mb-5">
        Name: <b>{productType.replace(/_/g, " ")}</b>
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

export default CashLoan;
