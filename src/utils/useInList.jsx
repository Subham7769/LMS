import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useInList = () => {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/concurrent-loans/config/in-list",
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

      const Details = await data.json();
      setData(Details.inList);
    } catch (error) {
      console.error(error);
    }
  }

  return Data;
};

export default useInList;
