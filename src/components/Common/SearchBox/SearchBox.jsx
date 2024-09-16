import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const SearchBox = () => {
  const location = useLocation();
  const [borrowerID, setBorrowerID] = useState("3333333361");
  const [borrowerNotFound, setBorrowerNotFound] = useState(false);
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  async function checkBorrowerInfoCustomerCare(borrowerID) {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/borrowers/" +
          borrowerID,
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
        setBorrowerNotFound(true);
        navigate("/customer-care"); // Redirect to customer-care page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      navigate("/customer-care/" + borrowerID + "/personal-info");
      setBorrowerNotFound(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function checkBorrowerInfoUserProductTesting(borrowerID) {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/" +
          borrowerID +
          "/check-availability/14-11-1981",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 404) {
        console.log("User Not Found"); // Clear the token
        setBorrowerNotFound(true);
        navigate("/user-product-testing"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      navigate("/user-product-testing/" + borrowerID + "/eligibilty");
      setBorrowerNotFound(false);
    } catch (error) {
      console.error(error);
    }
  }

  function checkBorrowerInfoOverdraftLoanOffer(borrowerID) {
    navigate(`/overdraft-loan-offers/${borrowerID}/overdraft-offer`);
  }

  const handleClick = () => {
    {
      if (location.pathname === "/customer-care") {
        checkBorrowerInfoCustomerCare(borrowerID);
      } else if (location.pathname === "/user-product-testing") {
        checkBorrowerInfoUserProductTesting(borrowerID);
      } else {
        checkBorrowerInfoOverdraftLoanOffer(borrowerID);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-5 justify-center mt-10">
        <div>
          {location.pathname === "/customer-care"
            ? "Customer ID"
            : "Borrower ID"}
        </div>
        <div>
          <InputText
            inputName="borrowerID"
            inputValue={borrowerID}
            onChange={(e) => {
              setBorrowerID(e.target.value);
            }}
            placeHolder="1234567890"
          />
        </div>
        <div>
          <Button
            buttonName={"Search"}
            onClick={handleClick}
            rectangle={true}
          />
        </div>
      </div>
      {borrowerNotFound && (
        <div className="text-red-600 mt-4 text-center p-5 bg-red-300 ">
          Borrower Not Found or Invalid ID
        </div>
      )}
    </>
  );
};


// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <SearchBox {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
