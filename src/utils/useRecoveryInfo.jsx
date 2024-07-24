import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useRecoveryInfo = () => {
  const [RecoveryInfoData, setRecoveryInfoData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRecoveryInfo();
  }, []);

  async function getRecoveryInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-temp",
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
      const RecoveryDetails = await data.json();

      // Transform the Product data to the desired format
      const formattedRecoveryInfoData = RecoveryDetails.map(
        ({ name, recoveryEquationTempId }) => ({
          name: name.replace(/-/g, " "),
          href: "/recovery/" + recoveryEquationTempId,
        })
      );

      setRecoveryInfoData(formattedRecoveryInfoData);
    } catch (error) {
      console.error(error);
    }
  }
  return RecoveryInfoData;
};

export default useRecoveryInfo;
