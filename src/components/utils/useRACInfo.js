import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useRACInfo = () => {
  const [RACData, setRACData] = useState([]);
  const { racID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getRACInfo();
  }, []);

  async function getRACInfo() {
    try {
      const token =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluLTE1IiwiZXhwIjoxNzE1MTcxOTUxfQ.naMfg8jq_fs5qVnL8zBXrwtVj07H1eYCcI-M9An1Acm0ybYl1vGTGjS9CCV9alUoeWB0izKKFFZMys3_gF7rYg";
      const data = await fetch(
        "http://194.163.172.33:32299/carbon-product-service/xtracash/rules/rac/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 404) {
        console.log("The resource you were trying to reach is not found"); // Clear the token
        // navigate("/create-rac"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        console.log("Check for token expiration or invalid token");
        // localStorage.removeItem("authToken"); // Clear the token
        // navigate("/create-rac"); // Redirect to login page
        return; // Stop further execution
      }
      const racDetails = await data.json();
      console.log(racDetails);
      setRACData(racDetails);
    } catch (error) {
      console.error(error);
    }
  }
  return RACData;
};

export default useRACInfo;
