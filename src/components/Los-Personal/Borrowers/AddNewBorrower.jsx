import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  resetBorrowerData,
  resetBorrowerFile,
  registerBorrower,
  updateAddBorrowerField,
  uploadBorrowerPhotoFile,
  getDraftBorrowerByID,
} from "../../../redux/Slices/personalBorrowersSlice";
import { draftBorrowerInfo } from "../../../redux/Slices/personalBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateBorrowerFields from "./AddUpdateBorrowerFields";
import store from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const AddNewBorrowers = () => {
  // const isValid = useSelector((state) => state.validation.isValid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { borrowerProfileDraftId } = useParams();
  const { addBorrowerData, error, loading } = useSelector(
    (state) => state.personalBorrowers
  );

  useEffect(() => {
    dispatch(getDraftBorrowerByID(borrowerProfileDraftId));
  }, [borrowerProfileDraftId]);

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
          navigate(
            `/loan/loan-origination-system/personal/borrowers/view-borrower`
          );
        });
    }
  };

  const handleDraft = () => {
    const addDraftBorrowerData = {
      borrowerType: "PERSONAL_BORROWER",
      borrowerProfileDraftId: (borrowerProfileDraftId ? borrowerProfileDraftId : nanoid()),
      personalBorrowerProfileDraft: { ...addBorrowerData },
    };
    if (addDraftBorrowerData.personalBorrowerProfileDraft.personalDetails.firstName !== "") {

      dispatch(draftBorrowerInfo(addDraftBorrowerData));
      navigate(`/loan/loan-origination-system/personal/borrowers/add-borrower`);
      dispatch(resetBorrowerData());
    }else{
      toast.error("First Name is required");
    }
  };

  const handleCancel = () => {
    navigate(`/loan/loan-origination-system/personal/borrowers/add-borrower`);
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
          buttonType="destructive"
          loading={loading}
        />
        <Button
          buttonName="Cancel"
          onClick={handleCancel}
          buttonType="destructive"
          rectangle={true}
          loading={loading}
        />
        <Button
          buttonName="Save Draft"
          onClick={handleDraft}
          rectangle={true}
          buttonType={"secondary"}
          loading={loading}
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

export default AddNewBorrowers;
