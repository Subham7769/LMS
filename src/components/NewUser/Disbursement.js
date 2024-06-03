import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Disbursement = () => {
  const [loanData, setloanData] = useState([]);
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const { userID } = useParams();
  const url = "/loans";
  //   const loanData = useUserInfo(url);
  //   const loanData = useBorrowerInfo(url);
  useEffect(() => {
    getBorrowerInfo();
  }, []);

  async function getBorrowerInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/borrowers/" +
          userID +
          url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 404) {
        console.log("Borrower Not Found"); // Clear the token
        navigate("/customer-care"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const json = await data.json();
      // console.log(json);
      setloanData(json);
    } catch (error) {
      console.error(error);
    }
  }
  if (loanData.length === 0) {
    return (
      <>
        <div>Fetching Data</div>
      </>
    );
  }
  console.log(loanData);
  return <div>Disbursement</div>;
};

export default Disbursement;
