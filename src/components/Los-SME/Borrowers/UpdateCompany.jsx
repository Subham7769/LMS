import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  handleChangeUpdateCompanyField,
  // resetUpdateBorrowerData,
  updateCompanyBorrowerInfo,
  fetchAllCompanyBorrowers,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateCompanyBorrowerFields from "./AddUpdateCompanyBorrowerFields";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";

const UpdateBorrower = () => {
  const { updateBorrowerData, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  const dispatch = useDispatch();
  const { uid } = useParams();
  const navigate = useNavigate();
  const loanOfficer = localStorage.getItem("username");


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

  const handleUpdate = async (uid) => {
    const { registrationDate, ...restUpdateBorrowerData } = updateBorrowerData;

    await dispatch(validateForm(flattenToSimpleObject(restUpdateBorrowerData)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure
    if (isValid) {
      dispatch(
        updateCompanyBorrowerInfo({ borrowerData: restUpdateBorrowerData, uid })
      ).unwrap();
      dispatch(fetchAllCompanyBorrowers({ page: 0, size: 20, loanOfficer }));
    }
    navigate(`/loan/loan-origination-system/personal/borrowers/view-borrower`);
  };

  const handleCancel = () => {
    // dispatch(resetUpdateBorrowerData());
    navigate(`/loan/loan-origination-system/personal/borrowers/view-borrower`);
  };
console.log(updateBorrowerData)
  return (
    <>
      <AddUpdateCompanyBorrowerFields
        BorrowerData={updateBorrowerData}
        handleChangeReducer={handleChangeUpdateCompanyField}
      />
      <div className="flex justify-end gap-5 col-span-4 mx-10">
        <Button
          buttonName="Cancel"
          onClick={handleCancel}
          rectangle={true}
          className={"bg-red-500 hover:bg-red-600"}
        />
        <Button
          buttonName="Update"
          onClick={() => handleUpdate(uid)}
          rectangle={true}
        />
      </div>
    </>
  );
};

export default UpdateBorrower;
