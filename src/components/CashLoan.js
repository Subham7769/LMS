import {
  useLocation,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { TrashIcon } from "@heroicons/react/20/solid";

const CashLoan = () => {
  const location = useLocation();
  const { productType, projectId, loanProId } = useParams();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const tabs = [
    {
      path:
        "/product/" +
        productType +
        "/loan-product-config/" +
        projectId +
        "/" +
        loanProId,
      label: "Product Config",
    },
    {
      path:
        "/product/" +
        productType +
        "/credit-score/" +
        projectId +
        "/" +
        loanProId,
      label: "Credit Score",
    },
    {
      path:
        "/product/" +
        productType +
        "/debt-burden-config/" +
        projectId +
        "/" +
        loanProId,
      label: "Debt Burden Config",
    },
    {
      path:
        "/product/" +
        productType +
        "/credit-policy/" +
        projectId +
        "/" +
        loanProId,
      label: "Credit Policy",
    },
    {
      path:
        "/product/" +
        productType +
        "/blocked-employer/" +
        projectId +
        "/" +
        loanProId,
      label: "Blocked Employer",
    },
  ];

  const handleDelete = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/configs/loan-products/${deleteURL}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the item");
      }
      navigate("/product");
      // Refresh the page after navigation
      window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-baseline">
        <h2 className="mb-5">
          Name: <b>{productType.replace(/_/g, " ")}</b>
        </h2>
        <button
          onClick={() => handleDelete(loanProId)}
          type="button"
          className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

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
