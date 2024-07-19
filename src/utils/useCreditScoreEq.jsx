import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useCreditScoreEq = () => {
  const [CreditScoreEqData, setCreditScoreEqData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCreditScoreEqInfo();
  }, []);

  async function getCreditScoreEqInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/cse-temp",
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
      const CreditScoreDetails = await data.json();

      // Transform the Product data to the desired format
      const formattedCreditScoreEqData = CreditScoreDetails.map(
        ({ creditScoreEqTempId, name }) => ({
          name: name.replace(/-/g, " "),
          href: "/credit-score/" + creditScoreEqTempId,
        })
      );

      setCreditScoreEqData(formattedCreditScoreEqData);
      // console.log(CreditScoreEqData);
    } catch (error) {
      console.error(error);
    }
  }
  return CreditScoreEqData;
};

export default useCreditScoreEq;
