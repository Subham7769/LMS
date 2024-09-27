import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  getBorrowerDetails,
  updateEmploymentDetailsField,
  updateEmploymentDetails,
} from "../../redux/Slices/userProductTestingSlice";
import {
  clearValidationError,
  setValidationError,
  validateFormFields,
} from "../../redux/Slices/validationSlice";

function EmploymentDetails() {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { EmploymentDetails, loading, error } = useSelector(
    (state) => state.userProductTesting
  );
  const { validationError } = useSelector((state) => state.validation);
  const fields = ["fullName", "basicWage","housingAllowance","employerName","workingMonths","employmentStatus","establishmentActivity"];


  useEffect(() => {
    dispatch(getBorrowerDetails(userID));
    const initialValidationError = {};
    fields.forEach((field) => {
      initialValidationError[field] = false; // Set all fields to false initially
    });
    dispatch(setValidationError(initialValidationError));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateEmploymentDetailsField({ name, value }));
  };

  const handleUpdate = ({ EmploymentDetails, userID }) =>{
    const isValid = validateFormFields(fields, EmploymentDetails, dispatch);
    if (isValid) {
      dispatch(updateEmploymentDetails({ EmploymentDetails, userID }))
    }
  }

  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-5 px-3 py-2 hover:bg-gray-100 rounded-md w-1/5 cursor-pointer">
        <b>Employment Details</b>
      </h2>
      <ContainerTile>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Full Name */}
          <InputText
            labelName="Full Name"
            inputName="fullName"
            placeHolder="John Doe"
            inputValue={EmploymentDetails?.fullName}
            onChange={handleChange}
            required
            showError={validationError.fullName}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, fullName: false })
              )
            }
          />
          {/* Basic Wage */}
          <InputNumber
            labelName="Basic Wage"
            inputName="basicWage"
            placeHolder="4000"
            inputValue={EmploymentDetails?.basicWage}
            onChange={handleChange}
            required
            showError={validationError.basicWage}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, basicWage: false })
              )
            }
          />
          {/* Housing Allowance */}
          <InputNumber
            labelName="Housing Allowance"
            inputName="housingAllowance"
            placeHolder="1000"
            inputValue={EmploymentDetails?.housingAllowance}
            onChange={handleChange}
            required
            showError={validationError.housingAllowance}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, housingAllowance: false })
              )
            }
          />
          {/* Employer Name */}
          <InputText
            labelName="Employer Name"
            inputName="employerName"
            placeHolder="John"
            inputValue={EmploymentDetails?.employerName}
            onChange={handleChange}
            required
            showError={validationError.employerName}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, employerName: false })
              )
            }
          />
          {/* Working Months */}
          <InputNumber
            labelName="Working Months"
            inputName="workingMonths"
            placeHolder="24"
            inputValue={EmploymentDetails?.workingMonths}
            onChange={handleChange}
            required
            showError={validationError.workingMonths}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, workingMonths: false })
              )
            }
          />
          {/* Employment Status */}
          <InputText
            labelName="Employment Status"
            inputName="employmentStatus"
            placeHolder="Unemployed"
            inputValue={EmploymentDetails?.employmentStatus}
            onChange={handleChange}
            required
            showError={validationError.employmentStatus}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, employmentStatus: false })
              )
            }
          />
          {/* Establishment Activity */}
          <InputText
            labelName="Establishment Activity"
            inputName="establishmentActivity"
            placeHolder="Developer"
            inputValue={EmploymentDetails?.establishmentActivity}
            onChange={handleChange}
            required
            showError={validationError.establishmentActivity}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, establishmentActivity: false })
              )
            }
          />
        </form>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName={"Update"}
            onClick={() =>
              handleUpdate({ EmploymentDetails, userID })
            }
            rectangle={true}
          />
        </div>
      </ContainerTile>
    </>
  );
}

export default EmploymentDetails;
