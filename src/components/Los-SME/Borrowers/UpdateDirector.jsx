import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  handleChangeUpdateDirectorField,
  resetUpdateDirectorData,
  updateDirectorInfo,
  fetchAllCompanyBorrowersByLoanOfficer,
  fetchCompanyDetails,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateDirectorFields from "./AddUpdateDirectorFields";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";

const UpdateDirector = () => {
  const {companyId,updateDirectorData, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  const dispatch = useDispatch();
  const { uid } = useParams();
  const navigate = useNavigate();
  const loanOfficer = localStorage.getItem("username");


  console.log(updateDirectorData);

  const handleUpdate = async (uid) => {
    await dispatch(validateForm(flattenToSimpleObject(updateDirectorData)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure
    if (isValid) {
      dispatch(updateDirectorInfo({ updateDirectorData, uid }))
        .unwrap()
        .then(() => {
          dispatch(fetchAllCompanyBorrowersByLoanOfficer({ page: 0, size: 20, loanOfficer }))
            .unwrap()
            .then(() => {
              dispatch(fetchCompanyDetails({ companyId }));
            });
          navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
        });
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
      <div className="flex justify-end gap-5 col-span-4">
        <Button
          buttonName="Cancel"
          onClick={handleCancel}
          buttonType="destructive"
        />
        <Button
          buttonName="Update"
          onClick={() => handleUpdate(uid)}
        />
      </div>
    </>
  );
};

export default UpdateDirector;
