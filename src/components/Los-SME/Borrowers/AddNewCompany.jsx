import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  resetCompanyData,
  draftCompanyBorrowerInfo,
  registerCompanyBorrower,
  handleChangeAddCompanyField,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateCompanyBorrowerFields from "./AddUpdateCompanyBorrowerFields";
import store from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const AddNewCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addCompanyData, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  // console.log(addCompanyData)

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
    return result;
  }

  if (!addCompanyData.companyDetails.loanOfficer) {
    const loanOfficer = localStorage.getItem("username");
    dispatch(
      handleChangeAddCompanyField({
        section: "companyDetails",
        field: "loanOfficer",
        value: loanOfficer,
      })
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the validation action
    await dispatch(validateForm(flattenToSimpleObject(addCompanyData)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure

    if (isValid) {
      dispatch(registerCompanyBorrower(addCompanyData)).then((action) => {
        if (action.type.endsWith("fulfilled")) {
          navigate('/loan/loan-origination-system/sme/borrowers/add-director');
        }
        dispatch(resetCompanyData())
      });
      
    }

  };

  const handleDraft = () => {
    const addDraftCompanyData = {
      borrowerType: "COMPANY_BORROWER",
      borrowerProfileDraftId: nanoid(),
      companyBorrowerProfileDraft: { ...addCompanyData },
    }
    dispatch(draftCompanyBorrowerInfo(addDraftCompanyData))
    navigate(`/loan/loan-origination-system/sme/borrowers/add-company`);
    dispatch(resetCompanyData())
  }
  
  return (
    <>
      <AddUpdateCompanyBorrowerFields
        BorrowerData={addCompanyData}
        handleChangeReducer={handleChangeAddCompanyField}
      />
      <div className="flex justify-end gap-5 col-span-4 mx-10">
        <Button
          buttonName="Reset"
          onClick={() => dispatch(resetCompanyData())}
          rectangle={true}
          className={"bg-red-500 hover:bg-red-600"}
        />
        <Button
          buttonName="Save Draft"
          onClick={handleDraft}
          rectangle={true}
          buttonType={"secondary"}
        />
        <Button
          buttonName="Submit"
          onClick={handleSubmit}
          rectangle={true}
          loading={loading}
        />

      </div>
    </>
  );
};

export default AddNewCompany;
