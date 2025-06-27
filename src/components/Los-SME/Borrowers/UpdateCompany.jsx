import React, { useRef } from "react";
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
import { validateFormNullCheck } from "../../../redux/Slices/validationSlice";
import AddUpdateCompanyBorrowerFields from "./AddUpdateCompanyBorrowerFields";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import { toast } from "react-toastify";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
import { fieldToSectionMapSMEBorrowersCompany } from "../../../data/fieldSectionMapData";

const UpdateCompany = () => {
  const { updateCompanyData, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  const dispatch = useDispatch();
  const { uid, borrowerProfileDraftId } = useParams();
  const navigate = useNavigate();
  const loanOfficer = localStorage.getItem("username");
  const sectionRefs = useRef({});

  const handleDraftUpdate = async () => {
    const addDraftCompanyData = {
      borrowerProfileDraftId: borrowerProfileDraftId,
      borrowerType: "COMPANY_BORROWER",
      companyBorrowerProfileDraft: { ...updateCompanyData },
    };

    if (
      addDraftCompanyData.companyBorrowerProfileDraft.companyDetails
        .companyName !== ""
    ) {
      try {
        // Dispatch the first action and wait for fulfillment
        await dispatch(draftCompanyBorrowerInfo(addDraftCompanyData)).unwrap();

        // Now dispatch the second action
        dispatch(
          fetchAllCompanyBorrowersByLoanOfficer({
            page: 0,
            size: 20,
            loanOfficer,
          })
        );

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
    await dispatch(
      validateFormNullCheck(flattenToSimpleObject(updateCompanyData))
    );

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure
    const firstInvalidKey = Object.keys(state.validation.validationError).find(
      (key) => state.validation.validationError[key]
    );
    if (firstInvalidKey) {
      const sectionName = fieldToSectionMapSMEBorrowersCompany[firstInvalidKey];
      const ref = sectionRefs.current[sectionName];
      if (ref?.scrollIntoView) {
        ref.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (isValid) {
      let addCompanyData = {};
      if (borrowerProfileDraftId) {
        addCompanyData = { ...updateCompanyData, borrowerProfileDraftId };
      } else {
        addCompanyData = updateCompanyData;
      }
      dispatch(registerCompanyBorrower(addCompanyData)).then((action) => {
        if (action.type.endsWith("fulfilled")) {
          navigate("/loan/loan-origination-system/sme/borrowers/add-director");
        }
        dispatch(resetUpdateCompanyData());
      });
    }
  };

  const handleBorrowerUpdate = async (uid) => {
    if (uid) {
      const { registrationDate, ...restUpdateCompanyData } = updateCompanyData;

      // Validate form first
      await dispatch(
        validateFormNullCheck(flattenToSimpleObject(restUpdateCompanyData))
      );

      // Get updated state for validation result
      const state = store.getState(); // Ensure 'store' is imported from your Redux setup
      const isValid = state.validation.isValid; // Adjust based on your validation state structure
      const firstInvalidKey = Object.keys(
        state.validation.validationError
      ).find((key) => state.validation.validationError[key]);
      if (firstInvalidKey) {
        const sectionName =
          fieldToSectionMapSMEBorrowersCompany[firstInvalidKey];
        const ref = sectionRefs.current[sectionName];
        if (ref?.scrollIntoView) {
          ref.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      if (isValid) {
        try {
          // First dispatcher - ensure success before continuing
          await dispatch(
            updateCompanyBorrowerInfo({
              UpdateCompanyData: restUpdateCompanyData,
              uid,
            })
          ).unwrap();

          // Second dispatcher - only runs if first one succeeds
          dispatch(
            fetchAllCompanyBorrowersByLoanOfficer({
              page: 0,
              size: 20,
              loanOfficer,
            })
          );

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
        sectionRefs={sectionRefs}
      />
      <div className="flex justify-end gap-5 col-span-4 mx-10">
        <Button
          buttonName="Cancel"
          onClick={handleCancel}
          rectangle={true}
          className={"bg-red-500 hover:bg-red-600"}
          loading={loading}
        />
        {borrowerProfileDraftId && (
          <>
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
        {uid && (
          <Button
            buttonName="Update"
            onClick={() => handleBorrowerUpdate(uid)}
            rectangle={true}
          />
        )}
      </div>
    </>
  );
};

export default UpdateCompany;
