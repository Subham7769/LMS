import {
  useLocation,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { TrashIcon } from "@heroicons/react/20/solid";
import DynamicName from "./Common/DynamicName/DynamicName";
import toast from "react-hot-toast";

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
  ];

  async function getProductInfo(newName) {
    toast.loading("Updating name, please wait...", { duration: 3000 });
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/${productType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for token expiration or invalid token
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }

      const productConfigDetails = await response.json();

      // Replace the data of the field
      productConfigDetails.productType = newName;

      // Rename disableRac to isDisableRac and keep its value
      productConfigDetails.isDisableRac = productConfigDetails.disableRac;
      delete productConfigDetails.disableRac;

      // Submit the updated data back using PUT request
      const updateResponse = await fetch(
        `http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/${loanProId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productConfigDetails),
        }
      );

      // Check if the update was successful
      if (updateResponse.ok) {
        toast.success("Name Updated, redirecting...");
        navigate(
          `/product/${newName}/loan-product-config/${projectId}/${loanProId}`
        );
        window.location.reload();
      } else {
        console.error(
          "Failed to update product info",
          await updateResponse.text()
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const handleDelete = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/${deleteURL}`,
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
        <div className="mb-4">
          <DynamicName initialName={productType} onSave={getProductInfo} />
        </div>
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
