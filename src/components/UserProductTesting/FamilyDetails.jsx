import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import { maritalOptions, booleanOptions } from "../../data/OptionsData";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  updateFamilyDetailsField,
  getBorrowerDetails,
  updateFamilyDetails,
} from "../../redux/Slices/userProductTestingSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearValidationError,
  setValidationError,
  validateFormFields,
} from "../../redux/Slices/validationSlice";

function FamilyDetails() {
  const { familyDetails, loading, error } = useSelector(    (state) => state.userProductTesting  );
  const { validationError } = useSelector((state) => state.validation);
  const { userID } = useParams();
  const dispatch = useDispatch();
  const fields = ["maritalStatus", "noOfDomesticWorkers","noOfChildren","totalDependent"];

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
    dispatch(updateFamilyDetailsField({ name, value }));
  };


  const handleUpdate = ({ familyDetails, userID }) =>{
    const isValid = validateFormFields(fields, familyDetails, dispatch);
    if (isValid) {
      dispatch(updateFamilyDetails({ familyDetails, userID }))
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
      <h2
        className="mb-5 px-3 py-2 hover:bg-gray-100 rounded-md w-1/5 cursor-pointer"
        title="Family Details"
      >
        <b>Family Details</b>
      </h2>
      <ContainerTile>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Marital Status */}
          <InputSelect
            labelName="Marital Status"
            inputName="maritalStatus"
            className="focus:ring focus:ring-blue-600 pb-2"
            inputOptions={maritalOptions}
            inputValue={familyDetails?.maritalStatus}
            onChange={handleChange}
            showError={validationError.maritalStatus}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, maritalStatus: false })
              )
            }
          />
          {/* No. of Domestic Workers */}
          <InputNumber
            labelName="No. of Domestic Workers"
            inputName="noOfDomesticWorkers"
            inputValue={familyDetails?.noOfDomesticWorkers}
            onChange={handleChange}
            placeHolder="1"
            required
            showError={validationError.noOfDomesticWorkers}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, noOfDomesticWorkers: false })
              )
            }
          />
          {/* No. of Children */}
          <InputNumber
            labelName="No. of Children"
            inputName="noOfChildren"
            inputValue={familyDetails?.noOfChildren}
            onChange={handleChange}
            placeHolder="3"
            required
            showError={validationError.noOfChildren}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, noOfChildren: false })
              )
            }
          />
          {/* Total Dependents */}
          <InputNumber
            labelName="Total Dependents"
            inputName="totalDependent"
            inputValue={familyDetails?.totalDependent}
            onChange={handleChange}
            placeHolder="4"
            required
            showError={validationError.totalDependent}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, totalDependent: false })
              )
            }
          />
          {/* Dependents in Private School */}
          <InputNumber
            labelName="Dependents in Private School"
            inputName="noOfDependentsInPrivateSchools"
            inputValue={familyDetails?.noOfDependentsInPrivateSchools}
            onChange={handleChange}
            placeHolder="2"
            // showError={validationError.totalDependent}
            // onFocus={() =>
            //   dispatch(
            //     setValidationError({ ...validationError, totalDependent: false })
            //   )
            // }
          />
          <InputNumber
            labelName="Dependents in Public School"
            inputName="noOfDependentsInPublicSchools"
            inputValue={familyDetails?.noOfDependentsInPublicSchools}
            onChange={handleChange}
            placeHolder="2"
            // showError={validationError.totalDependent}
            // onFocus={() =>
            //   dispatch(
            //     setValidationError({ ...validationError, totalDependent: false })
            //   )
            // }
          />
          {/* Bread Winner */}
          <InputSelect
            labelName="Bread Winner"
            inputName="breadWinner"
            inputOptions={booleanOptions}
            inputValue={familyDetails?.breadWinner}
            onChange={handleChange}
            // showError={validationError.totalDependent}
            // onFocus={() =>
            //   dispatch(
            //     setValidationError({ ...validationError, totalDependent: false })
            //   )
            // }
          />
        </form>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName={"Update"}
            onClick={() => handleUpdate({ familyDetails, userID }) }
            rectangle={true}
          />
        </div>
      </ContainerTile>
    </>
  );
}

export default FamilyDetails;
