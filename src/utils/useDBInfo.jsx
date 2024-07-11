import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useDBInfo = () => {
  const [DBCData, setDBCData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getDBInfo();
  }, []);

  async function getDBInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/dbc-temp/",
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
      const dbcDetails = await data.json();

      // Transform the Debt Burden Config data to the desired format
      const formattedDBCData = dbcDetails.map(({ name, dbcTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/newdbc/" + dbcTempId,
      }));

      setDBCData(formattedDBCData);
    } catch (error) {
      console.error(error);
    }
  }
  return DBCData;
};

export default useDBInfo;
