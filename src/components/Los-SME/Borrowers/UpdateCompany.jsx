import React, { useEffect, useId, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  handleChangeUpdateCompanyField,
  resetUpdateCompanyData,
  updateCompanyBorrowerInfo,
  fetchAllCompanyBorrowersByLoanOfficer,
  draftCompanyBorrowerInfo,
  registerCompanyBorrower,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateCompanyBorrowerFields from "./AddUpdateCompanyBorrowerFields";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import { toast } from "react-toastify";

const UpdateCompany = () => {
  const { updateCompanyData, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  const dispatch = useDispatch();
  const { uid, borrowerProfileDraftId } = useParams();
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

  const handleDraftUpdate = () => {
    const addDraftCompanyData = {
      borrowerProfileDraftId: borrowerProfileDraftId,
      borrowerType: "COMPANY_BORROWER",
      companyBorrowerProfileDraft: { ...updateCompanyData },
    };
    if (addDraftCompanyData.companyBorrowerProfileDraft.companyDetails.companyName !== "") {

      dispatch(draftCompanyBorrowerInfo(addDraftCompanyData)).unwrap()
      dispatch(
        fetchAllCompanyBorrowersByLoanOfficer({
          page: 0,
          size: 20,
          loanOfficer,
        })
      );
      navigate(`/loan/loan-origination-system/sme/borrowers/add-company`);
    } else {
      toast.error("Company Name Required");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the validation action
    await dispatch(validateForm(flattenToSimpleObject(updateCompanyData)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure

    if (isValid) {
      let addCompanyData = {};
      if (borrowerProfileDraftId) {
        addCompanyData = { ...updateCompanyData, borrowerProfileDraftId }
      } else {
        addCompanyData = updateCompanyData
      }
      dispatch(registerCompanyBorrower(addCompanyData)).then((action) => {
        if (action.type.endsWith("fulfilled")) {
          navigate('/loan/loan-origination-system/sme/borrowers/add-director');
        }
        dispatch(resetUpdateCompanyData())
      });
    }

  };

  const handleBorrowerUpdate = async (uid) => {
    if (uid) {
      const { registrationDate, ...restUpdateCompanyData } = updateCompanyData;
      // console.log(restUpdateCompanyData)
      await dispatch(
        validateForm(flattenToSimpleObject(restUpdateCompanyData))
      );

      // Access the updated state directly using getState
      const state = store.getState(); // Ensure 'store' is imported from your Redux setup
      const isValid = state.validation.isValid; // Adjust based on your state structure
      if (isValid) {
        dispatch(updateCompanyBorrowerInfo({ UpdateCompanyData: restUpdateCompanyData, uid, })).unwrap();
        dispatch(fetchAllCompanyBorrowersByLoanOfficer({ page: 0, size: 20, loanOfficer, }));
        navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
        dispatch(resetUpdateCompanyData());
      }
    } else {
      // incase of update the draft
      handleDraft();
      dispatch(resetUpdateCompanyData());
      navigate(`/loan/loan-origination-system/sme/borrowers/add-company`);
    }
  };

  const handleCancel = () => {
    dispatch(resetUpdateCompanyData());
    if (uid) {
      navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
    } else {
      navigate(`/loan/loan-origination-system/sme/borrowers/add-company`);
    }
  };

  return (
    <>
      <AddUpdateCompanyBorrowerFields
        BorrowerData={updateCompanyData}
        handleChangeReducer={handleChangeUpdateCompanyField}
      />
      <div className="flex justify-end gap-5 col-span-4 mx-10">
        <Button
          buttonName="Cancel"
          onClick={handleCancel}
          rectangle={true}
          className={"bg-red-500 hover:bg-red-600"}
          loading={loading}
        />
        {borrowerProfileDraftId && (<>
          <Button
            buttonName="Update Draft"
            onClick={handleDraftUpdate}
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
        </>
        )}
        {uid && <Button
          buttonName="Update"
          onClick={() => handleBorrowerUpdate(uid)}
          rectangle={true}
        />}
      </div>
    </>
  );
};

export default UpdateCompany;
