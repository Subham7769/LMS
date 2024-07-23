import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useProdGroupInfo = () => {
  const [ProdInfoData, setProdInfoData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProdInfo();
  }, []);

  async function getProdInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/concurrent-loans/config",
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

      const ProdDetails = await data.json();

      // Ensure ProdDetails is an array for uniform processing
      const ProdDetailsArray = Array.isArray(ProdDetails)
        ? ProdDetails
        : [ProdDetails];

      // Transform the Product data to the desired format
      const formattedProdInfoData = ProdDetailsArray.map(({ configId }) => ({
        name: configId.replace(/-/g, " "),
        href: "/product_group/" + configId,
      }));

      setProdInfoData(formattedProdInfoData);
    } catch (error) {
      console.error(error);
    }
  }

  return ProdInfoData;
};

export default useProdGroupInfo;
