import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useGlobalConfig = (url) => {
  const [globalInfo, setGlobalInfo] = useState([]);
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  useEffect(() => {
    getGlobalConfigInfo();
  }, []);

  async function getGlobalConfigInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/" + url,
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
      const json = await data.json();
      // console.log(json);
      setGlobalInfo(json);
    } catch (error) {
      console.error(error);
    }
  }
  // console.log(subscriberListNew);
  return globalInfo;
};

export default useGlobalConfig;
