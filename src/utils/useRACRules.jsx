import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const useRacRules = (url1, url2) => {
  const [RACRulesInfo, setRACRulesInfo] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { racID } = useParams();

  useEffect(() => {
    getRACRulesInfo();
  }, [racID]);

  async function getRACRulesInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/${racID}${url1}${url2}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const json = text ? JSON.parse(text) : [];
      setRACRulesInfo(json);
    } catch (error) {
      console.error("Error fetching RAC rules:", error);
      setError(error.message);
    }
  }

  return { RACRulesInfo, error };
};

export default useRacRules;
