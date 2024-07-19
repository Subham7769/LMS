import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useTCLInfo = () => {
  const [TCLInfoData, setTCLInfoData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getTCLInfo();
  }, []);

  async function getTCLInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/tcl/all-tcl",
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
      const TCLDetails = await data.json();

      // Transform the Product data to the desired format
      const formattedTCLInfoData = TCLDetails.map(
        ({ tclId, tclName }) => ({
          name: tclName.replace(/_/g, " "),
          href: "/tcl/" + tclId,
        })
      );

      setTCLInfoData(formattedTCLInfoData);
      // console.log(TCLInfoData);
    } catch (error) {
      console.error(error);
    }
  }
  return TCLInfoData;
};

export default useTCLInfo;
