import React from "react";
import Button from "../../Common/Button/Button";
import {
  resetCompanyData,
  draftCompanyBorrowerInfo,
  registerCompanyBorrower,
  handleChangeAddCompanyField,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateCompanyBorrowerFields from "./AddUpdateCompanyBorrowerFields";
import store from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";

const AddNewCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addCompanyData, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  // console.log(addCompanyData)

  if (!addCompanyData.companyDetails.loanOfficer) {
    const loanOfficer = localStorage.getItem("username");
    dispatch(
      handleChangeAddCompanyField({
        section: "companyDetails",
        field: "loanOfficer",
        value: loanOfficer,
      })
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the validation action
    await dispatch(validateForm(flattenToSimpleObject(addCompanyData)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure

    if (isValid) {
      dispatch(registerCompanyBorrower(addCompanyData)).then((action) => {
        if (action.type.endsWith("fulfilled")) {
          navigate('/loan/loan-origination-system/sme/borrowers/add-director');
        }
        dispatch(resetCompanyData())
      });

    }

  };

  const handleDraft = () => {
    const addDraftCompanyData = {
      borrowerType: "COMPANY_BORROWER",
      borrowerProfileDraftId: nanoid(),
      companyBorrowerProfileDraft: { ...addCompanyData },
    }
    if (addDraftCompanyData.companyBorrowerProfileDraft.companyDetails.companyName !== "") {

      dispatch(draftCompanyBorrowerInfo(addDraftCompanyData))
      navigate(`/loan/loan-origination-system/sme/borrowers/add-company`);
      dispatch(resetCompanyData())
    } else {
      toast.error("Company Name Required");
    }
  }

  const handleCancel = () => {
    navigate(`/loan/loan-origination-system/sme/borrowers/add-company`);
  };

  return (
    <>
      <AddUpdateCompanyBorrowerFields
        BorrowerData={addCompanyData}
        handleChangeReducer={handleChangeAddCompanyField}
      />
      <div className="flex justify-end gap-5 col-span-4">
        <Button
          buttonName="Reset"
          onClick={() => dispatch(resetCompanyData())}
          buttonType="destructive"
        />
        <Button
          buttonName="Cancel"
          onClick={handleCancel}
          buttonType="destructive"
          loading={loading}
        />
        <Button
          buttonName="Save Draft"
          onClick={handleDraft}
          buttonType={"secondary"}
        />
        <Button
          buttonName="Submit"
          onClick={handleSubmit}
          loading={loading}
        />

      </div>
    </>
  );
};

export default AddNewCompany;
