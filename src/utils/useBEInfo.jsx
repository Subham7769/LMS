import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useBEInfo = () => {
  const [BEData, setBEData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getBEInfo();
  }, []);

  async function getBEInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/",
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
      const beDetails = await data.json();

      // Transform the Blocked Employer data to the desired format
      const formattedDBCData = beDetails.map(
        ({ name, blockEmployerTempId }) => ({
          name: name.replace(/-/g, " "),
          href: "/blocked-employer/" + blockEmployerTempId,
        })
      );

      setBEData(formattedDBCData);
    } catch (error) {
      console.error(error);
    }
  }
  return BEData;
};

export default useBEInfo;
