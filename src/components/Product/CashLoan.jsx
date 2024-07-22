import {
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { TrashIcon } from "@heroicons/react/20/solid";
import DynamicName from "../Common/DynamicName/DynamicName";
import toast from "react-hot-toast";
import Button from "../Common/Button/Button";

const CashLoan = () => {
  const { productType, projectId, loanProId } = useParams();
  const navigate = useNavigate();

  async function getProductInfo(newName) {
    toast.loading("Updating name, please wait...", { duration: 3000 });
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/${productType}`,
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
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/${loanProId}`,
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
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/${deleteURL}`,
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
    <>
      <div className="flex justify-between items-center mb-2">
          <DynamicName initialName={productType} onSave={getProductInfo} />
          <Button buttonIcon={TrashIcon} onClick={() => handleDelete(loanProId)} circle={true} className={'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600'} />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default CashLoan;
