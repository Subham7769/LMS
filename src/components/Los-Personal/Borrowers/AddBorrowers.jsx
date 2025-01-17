import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  resetBorrowerData,
  resetBorrowerFile,
  registerBorrower,
  updateAddBorrowerField,
  uploadBorrowerPhotoFile,
} from "../../../redux/Slices/personalBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateBorrowerFields from "./AddUpdateBorrowerFields";
import store from "../../../redux/store";
import { useNavigate } from "react-router-dom";
const AddBorrowers = () => {
  // const isValid = useSelector((state) => state.validation.isValid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addBorrowerData, error, loading } = useSelector(
    (state) => state.personalBorrowers
  );

  if (!addBorrowerData.personalDetails.loanOfficer) {
    const loanOfficer = localStorage.getItem("username");
    dispatch(
      updateAddBorrowerField({
        section: "personalDetails",
        field: "loanOfficer",
        value: loanOfficer,
      })
    );
  }

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

    // Dispatch the validation action
    await dispatch(validateForm(flattenToSimpleObject(addBorrowerData)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure

    if (isValid) {
      dispatch(registerBorrower(addBorrowerData))
      .unwrap()
      .then(() => {
        navigate(`/loan/loan-origination-system/personal/borrowers/view-borrower`);
      })
    }
  };

  return (
    <>
      <AddUpdateBorrowerFields
        BorrowerData={addBorrowerData}
        handleChangeReducer={updateAddBorrowerField}
        handleFileReset={resetBorrowerFile}
        handleFileUpload={uploadBorrowerPhotoFile}
      />
      <div className="flex justify-end gap-5 col-span-4 mx-10">
        <Button
          buttonName="Reset"
          onClick={() => dispatch(resetBorrowerData())}
          rectangle={true}
          className={"bg-red-500 hover:bg-red-600"}
        />
        <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
      </div>
    </>
  );
};

export default AddBorrowers;
