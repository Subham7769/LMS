import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  updateBorrowerUpdateField,
  resetUpdateBorrowerData,
  updateBorrowerInfo,
} from "../../../redux/Slices/borrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateBorrowerFields from "./AddUpdateBorrowerFields";
import { useNavigate, useParams } from "react-router-dom";
const UpdateBorrower = () => {
  const isValid = useSelector((state) => state.validation.isValid);
  const { updateBorrowerData, error, loading } = useSelector(
    (state) => state.borrowers
  );
  const dispatch = useDispatch();
  const { uid } = useParams();
  const navigate = useNavigate();

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

    if (isValid) {
      dispatch(
        updateBorrowerInfo({ borrowerData: restUpdateBorrowerData, uid })
      );
    }
    navigate(`/loan/loan-origination-system/personal/borrowers/view-borrower`);
  };

  const handleCancel = () => {
    dispatch(resetUpdateBorrowerData());
    navigate(`/loan/loan-origination-system/personal/borrowers/view-borrower`);
  };

  return (
    <>
      <AddUpdateBorrowerFields
        BorrowerData={updateBorrowerData}
        handleChangeReducer={updateBorrowerUpdateField}
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
