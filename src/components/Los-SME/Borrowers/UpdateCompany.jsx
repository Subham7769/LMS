import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  updateCompanyUpdateField,
  resetUpdateCompanyData,
  updateBorrowerInfo,
  fetchAllBorrowers,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateBorrowerFields from "./AddUpdateBorrowerFields";
import { useNavigate, useParams } from "react-router-dom";
const UpdateCompany = () => {
  const isValid = useSelector((state) => state.validation.isValid);
  const { updateBorrowerData, error, loading } = useSelector(
    (state) => state.smeBorrowers
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
      ).unwrap();
            dispatch(fetchAllBorrowers({ page: 0, size: 20 }));
    }
    navigate(`/loan/loan-origination-system/personal/borrowers/view-borrower`);
  };

  const handleCancel = () => {
    dispatch(resetUpdateCompanyData());
    navigate(`/loan/loan-origination-system/personal/borrowers/view-borrower`);
  };

  return (
    <>
      <AddUpdateBorrowerFields
        BorrowerData={updateBorrowerData}
        handleChangeReducer={updateCompanyUpdateField}
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

export default UpdateCompany;
