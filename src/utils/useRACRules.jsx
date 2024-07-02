import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const useRacRules = (url1, url2) => {
  const [RACRulesInfo, setRACRulesInfo] = useState([]);
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const { racID } = useParams();

  useEffect(() => {
    getRACRulesInfo();
  }, [racID]);

  async function getRACRulesInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/rac/" +
          racID +
          url1 +
          url2,
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
      setRACRulesInfo(json);
      // console.log(RACRulesInfo);
    } catch (error) {
      console.error(error);
    }
  }
  // console.log(subscriberListNew);
  return RACRulesInfo;
};

export default useRacRules;
