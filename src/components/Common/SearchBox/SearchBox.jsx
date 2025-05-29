import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import { useDispatch } from "react-redux";
import store from "../../../redux/store";
import { fetchAccountDetailsById } from "../../../redux/Slices/accountsSlice";
import SearchView from "./SearchView";
import { toast } from "react-toastify";

const SearchBox = () => {
  const location = useLocation();
  const [borrowerID, setBorrowerID] = useState("A85677655");
  const navigate = useNavigate();
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
      if (data.status === 404 || data.status === 400) {
        toast("Borrower Not Found")
        return;
      } else {
        navigate("/loan/customer-care/" + borrowerID + "/personal-info");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function checkBorrowerInfoProductTesting(borrowerID) {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_USER_PRODUCT_TESTING_REGISTRATION_RESULT_GET
        }${borrowerID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 404 || data.status === 400) {
        toast("User Not Found");
        return;
      }
      else {
        navigate("/loan/product-testing/term-loan/" + borrowerID + "/loan-config");
      }
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
      toast("Borrower Not Found")
    } else {
      navigate(`/deposit/savings/accounts/${borrowerID}/summary`);
    }
  }

  const handleClick = async () => {
    // Remove slashes from borrowerID
    const sanitizedBorrowerID = borrowerID.replace(/[\/\\]/g, "");

    await dispatch(validateForm({ sanitizedBorrowerID }));
    const state = store.getState();
    const isValid = state.validation.isValid;

    if (isValid) {
      if (location.pathname === "/loan/customer-care") {
        checkBorrowerInfoCustomerCare(sanitizedBorrowerID);
      } else if (location.pathname === "/loan/product-testing/term-loan") {
        checkBorrowerInfoProductTesting(sanitizedBorrowerID);
      } else if (location.pathname === "/deposit/savings/accounts") {
        checkBorrowerInfoAccountDetails(sanitizedBorrowerID);
      } else {
        checkBorrowerInfoOverdraftLoanOffer(sanitizedBorrowerID);
      }
    }
  };

  const CustomerCareSearchIDArray = [
    "For individuals: Passport (AB123456) or NRC (12/AHKANA(N)123456)",
    "For companies: Business Registration (87654321) or Tax ID",
    "Enter the exact ID number used during borrower/company registration",
  ];

  const CustomerCareSearchShowArray = [
    "Complete customer profile and details",
    "Loan application history and status",
    "Active and past loan records",
    "Repayment history and schedule",
    "Previous rejection records",
  ];

  const ProductTestingSearchIDArray = [
    "For individuals: Passport (AB123456) or NRC (12/AHKANA(N)123456)",
    "For companies: Business Registration (87654321) or Tax ID",
    "Enter the exact ID number used during borrower/company registration",
  ];

  const ProductTestingSearchShowArray = [
    "Available loan products based on eligibility",
    "Maximum loan amounts and terms",
    "Interest rates and fees",
  ];

  return (
    <div>
      {location.pathname === "/loan/customer-care" ? (
        <SearchView
          heading="Customer Care - Borrower Search"
          subHeading="Search registered borrowers or companies using their identification numbers"
          borrowerID={borrowerID}
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
          onChange={(e) => setBorrowerID(e.target.value)}
          handleSearch={handleClick}
          searchIDArray={ProductTestingSearchIDArray}
          searchShowArray={ProductTestingSearchShowArray}
        />
      )}
    </div>
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
