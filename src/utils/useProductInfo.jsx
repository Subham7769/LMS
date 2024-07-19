import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useProductInfo = () => {
  const [ProductData, setProductData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProductInfo();
  }, []);

  async function getProductInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const ProductDetails = await data.json();

      // Transform the Product data to the desired format
      const formattedProductData = ProductDetails.map(
        ({ productType, projectId, loanProductId }) => ({
          name: productType.replace(/_/g, " "),
          href:
            "/product/" +
            productType +
            "/loan-product-config/" +
            projectId +
            "/" +
            loanProductId,
        })
      );

      setProductData(formattedProductData);
      // console.log(ProductData);
    } catch (error) {
      console.error(error);
    }
  }
  return ProductData;
};

export default useProductInfo;
