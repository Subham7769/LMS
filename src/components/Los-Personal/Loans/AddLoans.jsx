import React from "react";
import AddLoanFields from "./AddLoanFields";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import { validateForm } from "../../../redux/Slices/validationSlice";
import {
  resetAddLoanData,
  submitLoan,
} from "../../../redux/Slices/personalLoansSlice";
import { useNavigate } from "react-router-dom";
import store from "../../../redux/store";

const AddLoans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addLoanData } = useSelector((state) => state.personalLoans);
  // const isValid = useSelector((state) => state.validation.isValid);

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
      await dispatch(submitLoan(addLoanData.generalDetails)).unwrap();
      navigate("/loan/loan-origination-system/personal/loans/loan-offers");
    }
  };

  return (
    <>
      <AddLoanFields addLoanData={addLoanData} />
      {/* Save Button */}
      <div className="flex justify-end mt-5 gap-x-5">
        <Button
          buttonName="Reset"
          onClick={() => dispatch(resetAddLoanData())}
          rectangle={true}
          className={"bg-red-600 hover:bg-red-500"}
        />
        <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
      </div>
    </>
  );
};

export default AddLoans;
