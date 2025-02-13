import React, { useEffect } from "react";
import AddLoanFields from "./AddLoanFields";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import { validateForm } from "../../../redux/Slices/validationSlice";
import {
  saveDraftLoanData,
  submitLoan,
  getLoanApplicationsByID,
  fetchLoanProductData,
  setLoanApplicationId,
} from "../../../redux/Slices/smeLoansSlice";
import {
  clearValidationError,
  setFields,
} from "../../../redux/Slices/validationSlice";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
    </div>
  );
};

const AddLoans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loanApplicationId } = useParams();
  const { addLoanData, loading } = useSelector((state) => state.smeLoans);
  // const isValid = useSelector((state) => state.validation.isValid);

  useEffect(() => {
    dispatch(getLoanApplicationsByID(loanApplicationId));
    dispatch(fetchLoanProductData());
    const keysArray = [
      "borrowerId",
      "disbursedBy",
      "interestMethod",
      "loanDuration",
      "loanInterest",
      "loanProductId",
      "loanReleaseDate",
      "numberOfTenure",
      "perLoanDuration",
      "perLoanInterest",
      "principalAmount",
      "repaymentCycle",
    ];
    dispatch(setFields(keysArray));
    dispatch(setLoanApplicationId(loanApplicationId));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, loanApplicationId]);

  function flattenToSimpleObject(nestedObject) {
    const result = {};

    function recurse(current) {
      for (const key in current) {
        if (typeof current[key] === "object" && current[key] !== null) {
          recurse(current[key]);
        } else {
          result[key] = current[key];
        }
      }
    }

    recurse(nestedObject);
    console.log(result);
    return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(saveDraftLoanData(addLoanData)).unwrap();
    await dispatch(validateForm(flattenToSimpleObject(addLoanData)));
    console.log(addLoanData);
    const state = store.getState();
    const isValid = state.validation.isValid;
    const submitPayload = {
      ...addLoanData.generalLoanDetails,
      documents: addLoanData.documents,
      loanApplicationId: addLoanData.loanApplicationId,
      collateralDetails: addLoanData.collateralDetails,
      lhaDetails: addLoanData.lhaDetails,
      offTakerDetails: addLoanData.offTakerDetails,
      proformaDetails: addLoanData.proformaDetails,
      supplierDetails: addLoanData.supplierDetails,
    };
    if (isValid) {
      await dispatch(submitLoan(submitPayload)).unwrap();
      navigate("/loan/loan-origination-system/sme/loans/loan-offers");
    }
  };

  const handleDraft = async () => {
    await dispatch(saveDraftLoanData(addLoanData)).unwrap();
    navigate("/loan/loan-origination-system/sme/loans/loan-application");
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
        <ShimmerTable />
        <ShimmerTable />
        <ShimmerTable />
      </div>
    );
  }

  return (
    <>
      <div
        className={`border rounded-lg shadow-sm bg-gray-50 mb-3 hover:bg-indigo-50 px-4 py-4`}
      >
        <div className="text-gray-500">
          Loan Application ID: {addLoanData?.loanApplicationId}
        </div>
      </div>
      <AddLoanFields addLoanData={addLoanData} />
      {/* Resuable Button component not used because bg-gray-600 was not getting applied over bg-indigo-600 */}
      <div className="flex justify-end mt-5 gap-x-5">
        <button
          type="button"
          onClick={handleDraft}
          className={`rounded-md inline-flex items-center px-2.5 py-1.5 gap-x-1.5 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-background-light-primary shadow-sm hover:bg-gray-400 focus-visible:outline-gray-600 bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-white`}
        >
          <span className="text-center w-full">Save Draft</span>
        </button>
        <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
      </div>
    </>
  );
};

export default AddLoans;
