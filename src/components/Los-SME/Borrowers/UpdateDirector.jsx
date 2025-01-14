import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  handleChangeUpdateDirectorField,
  resetUpdateDirectorData,
  updateDirectorInfo,
  fetchAllCompanyBorrowers,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateDirectorFields from "./AddUpdateDirectorFields";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";

const UpdateDirector = () => {
  const { updateDirectorData, error, loading } = useSelector(
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
  console.log(updateDirectorData)

  const handleUpdate = async (uid) => {

    await dispatch(validateForm(flattenToSimpleObject(updateDirectorData)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure
    if (isValid) {
      dispatch(updateDirectorInfo({ updateDirectorData, uid }))
        .unwrap()
        .then(() => {
          dispatch(fetchAllCompanyBorrowers({ page: 0, size: 20, loanOfficer }));
          navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
        })
    }
  };

  const handleCancel = () => {
    dispatch(resetUpdateDirectorData());
    navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
  };

  return (
    <>
      <AddUpdateDirectorFields
        BorrowerData={updateDirectorData}
        handleChangeReducer={handleChangeUpdateDirectorField}
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

export default UpdateDirector;
