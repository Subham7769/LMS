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

function EmploymentDetails() {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { EmploymentDetails, loading, error } = useSelector(
    (state) => state.userProductTesting
  );

  useEffect(() => {
    dispatch(getBorrowerDetails(userID));
  }, [dispatch, userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateEmploymentDetailsField({ name, value }));
  };

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
          />
          {/* Basic Wage */}
          <InputNumber
            labelName="Basic Wage"
            inputName="basicWage"
            placeHolder="4000"
            inputValue={EmploymentDetails?.basicWage}
            onChange={handleChange}
            required
          />
          {/* Housing Allowance */}
          <InputNumber
            labelName="Housing Allowance"
            inputName="housingAllowance"
            placeHolder="1000"
            inputValue={EmploymentDetails?.housingAllowance}
            onChange={handleChange}
            required
          />
          {/* Employer Name */}
          <InputText
            labelName="Employer Name"
            inputName="employerName"
            placeHolder="John"
            inputValue={EmploymentDetails?.employerName}
            onChange={handleChange}
            required
          />
          {/* Working Months */}
          <InputNumber
            labelName="Working Months"
            inputName="workingMonths"
            placeHolder="24"
            inputValue={EmploymentDetails?.workingMonths}
            onChange={handleChange}
            required
          />
          {/* Employment Status */}
          <InputText
            labelName="Employment Status"
            inputName="employmentStatus"
            placeHolder="Unemployed"
            inputValue={EmploymentDetails?.employmentStatus}
            onChange={handleChange}
            required
          />
          {/* Establishment Activity */}
          <InputText
            labelName="Establishment Activity"
            inputName="establishmentActivity"
            placeHolder="Developer"
            inputValue={EmploymentDetails?.establishmentActivity}
            onChange={handleChange}
            required
          />
        </form>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName={"Update"}
            onClick={() =>
              dispatch(updateEmploymentDetails({ EmploymentDetails, userID }))
            }
            rectangle={true}
          />
        </div>
      </ContainerTile>
    </>
  );
}

export default EmploymentDetails;
