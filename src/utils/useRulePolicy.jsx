import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useRulePolicy = () => {
  const [RulePolicyData, setRulePolicyData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRulePolicyInfo();
  }, []);

  async function getRulePolicyInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp",
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
      const RulePolicyDetails = await data.json();

      // Transform the Product data to the desired format
      const formattedRulePolicyData = RulePolicyDetails.map(
        ({ rulePolicyTempId, name }) => ({
          name: name.replace(/-/g, " "),
          href: "/rule-policy/" + rulePolicyTempId,
        })
      );

      setRulePolicyData(formattedRulePolicyData);
      // console.log(RulePolicyData);
    } catch (error) {
      console.error(error);
    }
  }
  return RulePolicyData;
};

export default useRulePolicy;
