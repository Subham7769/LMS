import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

function EmploymentDetails() {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { EmploymentDetails, loading, error } = useSelector(
    (state) => state.userProductTesting
  );

  useEffect(() => {
    dispatch(getBorrowerDetails(userID));
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

  const handleUpdate = async ({ EmploymentDetails, userID }) => {
    await dispatch(validateForm(EmploymentDetails));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(updateEmploymentDetails({ EmploymentDetails, userID }));
    }
  };

  return (
    <>
      <ContainerTile loading={loading} error={error}>
        <h2 className="mb-5 py-2">
          <b>Employment Details</b>
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Full Name */}
          <InputText
            labelName="Full Name"
            inputName="fullName"
            placeHolder="John Doe"
            inputValue={EmploymentDetails?.fullName}
            onChange={handleChange}
            required
            isValidation={true}
          />
          {/* Basic Wage */}
          <InputNumber
            labelName="Basic Wage"
            inputName="basicWage"
            placeHolder="4000"
            inputValue={EmploymentDetails?.basicWage}
            onChange={handleChange}
            required
            isValidation={true}
          />
          {/* Housing Allowance */}
          <InputNumber
            labelName="Housing Allowance"
            inputName="housingAllowance"
            placeHolder="1000"
            inputValue={EmploymentDetails?.housingAllowance}
            onChange={handleChange}
            required
            isValidation={true}
          />
          {/* Employer Name */}
          <InputText
            labelName="Employer Name"
            inputName="employerName"
            placeHolder="John"
            inputValue={EmploymentDetails?.employerName}
            onChange={handleChange}
            required
            isValidation={true}
          />
          {/* Working Months */}
          <InputNumber
            labelName="Working Months"
            inputName="workingMonths"
            placeHolder="24"
            inputValue={EmploymentDetails?.workingMonths}
            onChange={handleChange}
            required
            isValidation={true}
          />
          {/* Employment Status */}
          <InputText
            labelName="Employment Status"
            inputName="employmentStatus"
            placeHolder="Unemployed"
            inputValue={EmploymentDetails?.employmentStatus}
            onChange={handleChange}
            required
            isValidation={true}
          />
          {/* Establishment Activity */}
          <InputText
            labelName="Establishment Activity"
            inputName="establishmentActivity"
            placeHolder="Developer"
            inputValue={EmploymentDetails?.establishmentActivity}
            onChange={handleChange}
            required
            isValidation={true}
          />
        </form>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName={"Update"}
            onClick={() => handleUpdate({ EmploymentDetails, userID })}
            rectangle={true}
          />
        </div>
      </ContainerTile>
    </>
  );
}

export default EmploymentDetails;
