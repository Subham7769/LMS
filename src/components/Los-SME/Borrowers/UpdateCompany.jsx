import React from "react";
import Button from "../../Common/Button/Button";
import {
  handleChangeUpdateCompanyField,
  resetUpdateCompanyData,
  updateCompanyBorrowerInfo,
  draftCompanyBorrowerInfo,
  registerCompanyBorrower,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateCompanyBorrowerFields from "./AddUpdateCompanyBorrowerFields";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import { toast } from "react-toastify";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";

const UpdateCompany = () => {
  const { updateCompanyData, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  const dispatch = useDispatch();
  const { uid, borrowerProfileDraftId } = useParams();
  const navigate = useNavigate();
  const loanOfficer = localStorage.getItem("username");

  const handleDraftUpdate = async () => {
    const addDraftCompanyData = {
      borrowerProfileDraftId: borrowerProfileDraftId,
      borrowerType: "COMPANY_BORROWER",
      companyBorrowerProfileDraft: { ...updateCompanyData },
    };
  
    if (addDraftCompanyData.companyBorrowerProfileDraft.companyDetails.companyName !== "") {
      try {
        // Dispatch the first action and wait for fulfillment
        await dispatch(draftCompanyBorrowerInfo(addDraftCompanyData)).unwrap();
  
        // Navigate after both actions complete
        navigate(`/loan/loan-origination-system/sme/borrowers/add-company`);
      } catch (error) {
        toast.error("Failed to update draft. Please try again.");
        console.error("Error updating draft:", error);
      }
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
  
      // Validate form first
      await dispatch(validateForm(flattenToSimpleObject(restUpdateCompanyData)));
  
      // Get updated state for validation result
      const state = store.getState(); // Ensure 'store' is imported from your Redux setup
      const isValid = state.validation.isValid; // Adjust based on your validation state structure
  
      if (isValid) {
        try {
          // First dispatcher - ensure success before continuing
          await dispatch(
            updateCompanyBorrowerInfo({ UpdateCompanyData: restUpdateCompanyData, uid })
          ).unwrap();

  
          // Navigate after both actions are completed
          navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
  
          // Reset form data
          dispatch(resetUpdateCompanyData());
        } catch (error) {
          toast.error("Failed to update borrower info. Please try again.");
          console.error("Error updating borrower:", error);
        }
      }
    } else {
      // In case of updating the draft
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
      <div className="flex justify-end gap-5 col-span-4">
        <Button
          buttonName="Cancel"
          onClick={handleCancel}
          buttonType="destructive"
          loading={loading}
        />
        {borrowerProfileDraftId && (<>
          <Button
            buttonName="Update Draft"
            onClick={handleDraftUpdate}
            buttonType={"secondary"}
            loading={loading}
          />
          <Button
            buttonName="Submit"
            onClick={handleSubmit}
            loading={loading}
          />
        </>
        )}
        {uid && <Button
          buttonName="Update"
          onClick={() => handleBorrowerUpdate(uid)}
        />}
      </div>
    </>
  );
};

export default UpdateCompany;
