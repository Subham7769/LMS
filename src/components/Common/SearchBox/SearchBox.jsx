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
import SearchView from "./SearchView";

const SearchBox = () => {
  const location = useLocation();
  const [borrowerID, setBorrowerID] = useState("7777777");
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
          import.meta.env.VITE_USER_PRODUCT_TESTING_REGISTRATION_RESULT_GET
        }${borrowerID}`,
        {
          method: "GET",
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
      navigate(
        "/loan/product-testing/term-loan/" + borrowerID + "/loan-config"
      );
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



  const CustomerCareSearchIDArray = [
    "For individuals: Passport (AB123456) or NRC (12/AHKANA(N)123456)",
    "For companies: Business Registration (87654321) or Tax ID",
    "Enter the exact ID number used during borrower/company registration"
  ];

  const CustomerCareSearchShowArray = [
    "Complete customer profile and details",
    "Loan application history and status",
    "Active and past loan records",
    "Repayment history and schedule",
    "Previous rejection records"
  ];
  const ProductTestingSearchIDArray = [
    "For individuals: Passport (AB123456) or NRC (12/AHKANA(N)123456)",
    "For companies: Business Registration (87654321) or Tax ID",
    "Enter the exact ID number used during borrower/company registration"
  ];

  const ProductTestingSearchShowArray = [
    "Available loan products based on eligibility",
    "Maximum loan amounts and terms",
    "Interest rates and fees",
  ];

  return (
    <>
      {/* <div className="flex items-center gap-5 justify-center mt-10">
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
      </div> */}
      {/* {borrowerNotFound && (
        <div className="text-red-600 mt-4 text-center p-5 bg-red-300 ">
          User Not Found or Invalid ID
        </div>
      )} */}

      {
        <div>
          {location.pathname === "/loan/customer-care" ? (
            <SearchView
              heading="Customer Care - Borrower Search"
              subHeading="Search registered borrowers or companies using their identification numbers"
              borrowerID={borrowerID}
              borrowerNotFound={borrowerNotFound}
              onChange={(e) => setBorrowerID(e.target.value)}
              handleSearch={handleClick}
              searchIDArray={CustomerCareSearchIDArray}
              searchShowArray={CustomerCareSearchShowArray}
            />
          ) : location.pathname === "/deposit/savings/accounts" ? (
            <SearchView
              heading="Accounts - Borrower Search"
              subHeading="Search registered borrowers or companies using their identification numbers"
              borrowerID={borrowerID}
              borrowerNotFound={borrowerNotFound}
              onChange={(e) => setBorrowerID(e.target.value)}
              handleSearch={handleClick}
              searchIDArray={["ID1", "ID2", "ID3"]}
              searchShowArray={["Info1", "Info2", "Info3"]}
            />
          ) : location.pathname === "/loan/product-testing/term-loan" ? (
            <SearchView
              heading="Product Testing - Borrower Search"
              subHeading="Search registered borrowers or companies using their identification numbers"
              borrowerID={borrowerID}
              borrowerNotFound={borrowerNotFound}
              onChange={(e) => setBorrowerID(e.target.value)}
              handleSearch={handleClick}
              searchIDArray={ProductTestingSearchIDArray}
              searchShowArray={ProductTestingSearchShowArray}
            />
          ) : (
            <SearchView
              heading="Product Testing - Borrower Search"
              subHeading="Search registered borrowers or companies using their identification numbers"
              borrowerID={borrowerID}
              borrowerNotFound={borrowerNotFound}
              onChange={(e) => setBorrowerID(e.target.value)}
              handleSearch={handleClick}
              searchIDArray={ProductTestingSearchIDArray}
              searchShowArray={ProductTestingSearchShowArray}
            />
          )}
        </div>
      }
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
