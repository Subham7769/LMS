import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useUserInfo = (url, methodType) => {
  const [subscriberListNew, setSubscriberList] = useState([]);
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  useEffect(() => {
    getBorrowerInfo();
  }, []);

  async function getBorrowerInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/" +
          userID +
          url,
        {
          method: methodType,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 404) {
        console.log("User Not Found"); // Clear the token
        navigate("/user"); // Redirect to login page
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
      setSubscriberList(json);
    } catch (error) {
      console.error(error);
    }
  }
  // console.log(subscriberListNew);
  return subscriberListNew;
};

export default useUserInfo;
