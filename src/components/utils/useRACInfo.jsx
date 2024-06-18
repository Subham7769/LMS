import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useRACInfo = () => {
  const [RACData, setRACData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRACInfo();
  }, []);

  async function getRACInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/xtracash/rules/rac/",
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
      const racDetails = await data.json();

      // Transform the RAC data to the desired format
      const formattedRACData = racDetails.map(({ name, racId }) => ({
        name,
        href: "/newrac/" + racId,
      }));

      setRACData(formattedRACData);
      // console.log(RACData);
    } catch (error) {
      console.error(error);
    }
  }
  return RACData;
};

export default useRACInfo;
