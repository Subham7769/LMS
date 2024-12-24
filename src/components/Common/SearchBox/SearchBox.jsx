import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import { useDispatch } from "react-redux";
import store from "../../../redux/store";
import { fetchAccountDetailsById } from "../../../redux/Slices/accountsSlice";

const SearchBox = () => {
  const location = useLocation();
  const [borrowerID, setBorrowerID] = useState("3333333361");
  const [borrowerNotFound, setBorrowerNotFound] = useState(false);
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  async function checkBorrowerInfoCustomerCare(borrowerID) {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_BORROWER_INFO}${borrowerID}`,
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
        navigate("/loan/customer-care"); // Redirect to customer-care page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      navigate("/loan/customer-care/" + borrowerID + "/personal-info");
      setBorrowerNotFound(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function checkBorrowerInfoProductTesting(borrowerID) {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${
          import.meta.env.VITE_USER_PRODUCT_TESTING
        }${borrowerID}/check-availability/14-11-1981`,
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
        navigate("/loan/product-testing/term-loan"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      navigate("/loan/product-testing/term-loan/" + borrowerID + "/eligibilty");
      setBorrowerNotFound(false);
    } catch (error) {
      console.error(error);
    }
  }

  function checkBorrowerInfoOverdraftLoanOffer(borrowerID) {
    navigate(
      `/loan/product-testing/overdraft-loan/${borrowerID}/overdraft-offer`
    );
  }

  async function checkBorrowerInfoAccountDetails(borrowerID) {
    await dispatch(fetchAccountDetailsById(borrowerID)).unwrap();
    const state = store.getState();
    const accountDetails = state.accounts.accountDetails;
    if (accountDetails.length == 0) {
      setBorrowerNotFound(true);
    } else {
      navigate(`/deposit/savings/accounts/${borrowerID}/summary`);
    }
  }

  const handleClick = async () => {
    await dispatch(validateForm({ borrowerID }));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      if (location.pathname === "/loan/customer-care") {
        checkBorrowerInfoCustomerCare(borrowerID);
      } else if (location.pathname === "/loan/product-testing/term-loan") {
        checkBorrowerInfoProductTesting(borrowerID);
      } else if (location.pathname === "/deposit/savings/accounts") {
        checkBorrowerInfoAccountDetails(borrowerID);
      } else {
        checkBorrowerInfoOverdraftLoanOffer(borrowerID);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div className="flex items-center gap-5 justify-center mt-10">
        <div>
          {location.pathname === "/loan/customer-care"
            ? "Customer ID"
            : location.pathname === "/deposit/savings/accounts"
            ? "User ID."
            : location.pathname === "/loan/product-testing/term-loan"
            ? "Term Loan Borrower ID"
            : "Overdraft Loan Borrower ID"}
        </div>
        <div>
          <InputText
            inputName="borrowerID"
            inputValue={borrowerID}
            onChange={(e) => {
              setBorrowerID(e.target.value);
            }}
            placeHolder="1234567890"
            isValidation={true}
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
          User Not Found or Invalid ID
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
