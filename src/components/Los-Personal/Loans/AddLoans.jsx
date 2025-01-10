import React, { useEffect, useState } from "react";
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
} from "../../../redux/Slices/personalLoansSlice";
import {
  clearValidationError,
  setFields,
} from "../../../redux/Slices/validationSlice";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

const AddLoans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loanApplicationId } = useParams();
  const { addLoanData, loading } = useSelector((state) => state.personalLoans);
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
    await dispatch(validateForm(flattenToSimpleObject(addLoanData)));
    console.log(addLoanData);
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      await dispatch(submitLoan(addLoanData)).unwrap();
      navigate("/loan/loan-origination-system/personal/loans/loan-offers");
    }
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
      {/* Save Button */}
      <div className="flex justify-end mt-5 gap-x-5">
        <Button
          buttonName="Save Draft"
          onClick={() => dispatch(saveDraftLoanData(addLoanData))}
          rectangle={true}
          className={"bg-gray-900 hover:bg-gray-700"}
        />
        <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
      </div>
    </>
  );
};

export default AddLoans;
