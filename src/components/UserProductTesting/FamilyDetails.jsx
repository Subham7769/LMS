import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

function FamilyDetails() {
  const { familyDetails, loading, error } = useSelector(
    (state) => state.userProductTesting
  );
  const { userID } = useParams();
  const dispatch = useDispatch();

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
    dispatch(updateFamilyDetailsField({ name, value }));
  };

  const handleUpdate = async ({ familyDetails, userID }) => {
    await dispatch(validateForm(familyDetails));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(updateFamilyDetails({ familyDetails, userID }));
    }
  };

  return (
    <>
      <ContainerTile loading={loading} error={error}>
        <h2 className="mb-5 py-2">
          <b>Family Details</b>
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Marital Status */}
          <InputSelect
            labelName="Marital Status"
            inputName="maritalStatus"
            className="focus:ring focus:ring-blue-600 pb-2"
            inputOptions={maritalOptions}
            inputValue={familyDetails?.maritalStatus}
            onChange={handleChange}
            isValidation={true}
          />
          {/* No. of Domestic Workers */}
          <InputNumber
            labelName="No. of Domestic Workers"
            inputName="noOfDomesticWorkers"
            inputValue={familyDetails?.noOfDomesticWorkers}
            onChange={handleChange}
            placeHolder="1"
            required
            isValidation={true}
          />
          {/* No. of Children */}
          <InputNumber
            labelName="No. of Children"
            inputName="noOfChildren"
            inputValue={familyDetails?.noOfChildren}
            onChange={handleChange}
            placeHolder="3"
            required
            isValidation={true}
          />
          {/* Total Dependents */}
          <InputNumber
            labelName="Total Dependents"
            inputName="totalDependent"
            inputValue={familyDetails?.totalDependent}
            onChange={handleChange}
            placeHolder="4"
            required
            isValidation={true}
          />
          {/* Dependents in Private School */}
          <InputNumber
            labelName="Dependents in Private School"
            inputName="noOfDependentsInPrivateSchools"
            inputValue={familyDetails?.noOfDependentsInPrivateSchools}
            onChange={handleChange}
            placeHolder="2"
          />
          <InputNumber
            labelName="Dependents in Public School"
            inputName="noOfDependentsInPublicSchools"
            inputValue={familyDetails?.noOfDependentsInPublicSchools}
            onChange={handleChange}
            placeHolder="2"
          />
          {/* Bread Winner */}
          <InputSelect
            labelName="Bread Winner"
            inputName="breadWinner"
            inputOptions={booleanOptions}
            inputValue={familyDetails?.breadWinner}
            onChange={handleChange}
          />
        </form>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName={"Update"}
            onClick={() => handleUpdate({ familyDetails, userID })}
            rectangle={true}
          />
        </div>
      </ContainerTile>
    </>
  );
}

export default FamilyDetails;
