import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  updateBorrowerUpdateField,
  resetUpdateBorrowerData,
  updateBorrowerInfo,
  fetchAllBorrowersByType,
  resetBorrowerFile,
  uploadBorrowerPhotoFile,
  fetchBorrowerInfo,
  registerBorrower,
} from "../../../redux/Slices/personalBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateBorrowerFields from "./AddUpdateBorrowerFields";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { nanoid } from "nanoid";
import { draftBorrowerInfo } from "../../../redux/Slices/personalBorrowersSlice";
import { toast } from "react-toastify";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";

const UpdateBorrower = () => {
  const { updateBorrowerData, error, loading } = useSelector(
    (state) => state.personalBorrowers
  );
  const dispatch = useDispatch();
  const { uid, borrowerProfileDraftId } = useParams();
  const navigate = useNavigate();

  console.log(uid)
  console.log(Object.keys(updateBorrowerData).length === 0)

  useEffect(() => {
    if (uid && Object.keys(updateBorrowerData).length === 0) {
      dispatch(fetchBorrowerInfo(uid));
    }
  }, [dispatch, uid]);


  const handleDraftUpdate = async () => {
    try {
      const addDraftBorrowerData = {
        borrowerType: "PERSONAL_BORROWER",
        borrowerProfileDraftId: (borrowerProfileDraftId ? borrowerProfileDraftId : nanoid()),
        personalBorrowerProfileDraft: { ...updateBorrowerData },
      };
      if (addDraftBorrowerData.personalBorrowerProfileDraft.personalDetails.firstName !== "") {

        // Wait for draftBorrowerInfo to complete successfully
        await dispatch(draftBorrowerInfo(addDraftBorrowerData)).unwrap();

        // After success, fetch updated borrower list
        dispatch(
          fetchAllBorrowersByType({
            page: 0,
            size: 20,
            borrowerType: "PERSONAL_BORROWER",
          })
        );

        // Navigate to the new borrower page
        navigate(`/loan/loan-origination-system/personal/borrowers/add-borrower`);

        // Reset borrower data
        dispatch(resetUpdateBorrowerData());
      } else {
        toast.error("First Name is required");
      }
    } catch (error) {
      console.error("Error updating draft:", error);
    }
  };

  const handleUpdateBorrower = async (uid) => {
    const { registrationDate, ...restUpdateBorrowerData } = updateBorrowerData;

    await dispatch(validateForm(flattenToSimpleObject(restUpdateBorrowerData)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure
    if (isValid) {
      await dispatch(
        updateBorrowerInfo({ borrowerData: restUpdateBorrowerData, uid })
      ).unwrap();
      dispatch(
        fetchAllBorrowersByType({
          page: 0,
          size: 20,
          borrowerType: "PERSONAL_BORROWER",
        })
      );
      navigate(
        `/loan/loan-origination-system/personal/borrowers/view-borrower`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the validation action
    await dispatch(validateForm(flattenToSimpleObject(updateBorrowerData)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure

    if (isValid) {
      let addBorrowerData = {};
      if (borrowerProfileDraftId) {
        addBorrowerData = { ...updateBorrowerData, borrowerProfileDraftId }
      } else {
        addBorrowerData = updateBorrowerData
      }
      dispatch(registerBorrower(addBorrowerData))
        .unwrap()
        .then(() => {
          navigate(
            `/loan/loan-origination-system/personal/borrowers/view-borrower`
          );
        });
    }
  };

  const handleCancel = () => {
    dispatch(resetUpdateBorrowerData());
    navigate(`/loan/loan-origination-system/personal/borrowers/view-borrower`);
  };

  if (Object.keys(updateBorrowerData).length === 0) {
    return <ContainerTile loading={loading} />; //
  }

  return (
    <>
      <AddUpdateBorrowerFields
        BorrowerData={updateBorrowerData}
        handleChangeReducer={updateBorrowerUpdateField}
        handleFileReset={resetBorrowerFile}
        handleFileUpload={uploadBorrowerPhotoFile}
      />
      <div className="flex justify-end gap-5 col-span-4 mx-10">
        <Button
          buttonName="Cancel"
          onClick={handleCancel}
          rectangle={true}
          className={"bg-red-500 hover:bg-red-600"}
          loading={loading}
        />
        {uid && <Button
          buttonName="Update"
          onClick={() => handleUpdateBorrower(uid)}
          rectangle={true}
          loading={loading}
        />}
        {borrowerProfileDraftId && (
          <>
            <Button
              buttonName="Update Draft"
              onClick={handleDraftUpdate}
              rectangle={true}
              loading={loading}
              buttonType={"secondary"}
            />
            <Button
              buttonName="Submit"
              onClick={handleSubmit}
              rectangle={true}
              loading={loading}
            />
          </>
        )
        }
      </div>
    </>
  );
};

export default UpdateBorrower;
