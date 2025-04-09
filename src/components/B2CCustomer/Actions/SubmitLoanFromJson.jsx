import { validateForm } from "../../../redux/Slices/validationSlice";
import {
  saveDraftLoanData,
  submitLoan,
} from "../../../redux/Slices/personalLoansSlice";
import store from "../../../redux/store";
import { sanitizeUid } from "../../../utils/sanitizeUid";

const flattenToSimpleObject = (nestedObject) => {
  const result = {};

  const recurse = (current) => {
    for (const key in current) {
      if (typeof current[key] === "object" && current[key] !== null) {
        recurse(current[key]);
      } else {
        result[key] = current[key];
      }
    }
  };

  recurse(nestedObject);
  return result;
};

/**
 * Submits loan data programmatically using JSON input.
 * Reuses the exact logic used in the AddLoans form submission.
 *
 * @param {object} loanJson - The loan data to submit (structured like addLoanData).
 * @param {function} dispatch - The Redux dispatch function.
 * @param {function} navigate - React Router's navigate function.
 */
export const SubmitLoanFromJson = async (loanJson, dispatch, navigate) => {
  try {
    const sanitizedUniqueID = sanitizeUid(
      loanJson.generalLoanDetails.uniqueID
    );

    const updatedLoanData = {
      ...loanJson,
      generalLoanDetails: {
        ...loanJson.generalLoanDetails,
        borrowerId: sanitizedUniqueID,
      },
    };

    // Validate data
    await dispatch(
      validateForm(flattenToSimpleObject(updatedLoanData))
    );

    const state = store.getState();
    const isValid = state.validation.isValid;

    if (isValid) {
      await dispatch(saveDraftLoanData(updatedLoanData)).unwrap();
      await dispatch(
        submitLoan({
          ...updatedLoanData.generalLoanDetails,
          documents: updatedLoanData.documents,
          loanApplicationId: updatedLoanData.loanApplicationId,
          refinanceDetails: updatedLoanData.refinanceDetails,
        })
      ).unwrap();

      navigate(
        "/loan/loan-origination-system/personal/loans/loan-offers"
      );
    } else {
      console.warn("Loan data validation failed.");
    }
  } catch (error) {
    console.error("Error submitting loan from JSON:", error);
  }
};
