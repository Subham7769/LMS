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

function FamilyDetails() {
  const { familyDetails, loading, error } = useSelector(
    (state) => state.userProductTesting
  );
  const { userID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBorrowerDetails(userID));
  }, [dispatch, userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateFamilyDetailsField({ name, value }));
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  console.log(familyDetails);

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
          />
          {/* No. of Domestic Workers */}
          <InputNumber
            labelName="No. of Domestic Workers"
            inputName="noOfDomesticWorkers"
            inputValue={familyDetails?.noOfDomesticWorkers}
            onChange={handleChange}
            placeHolder="1"
            required
          />
          {/* No. of Children */}
          <InputNumber
            labelName="No. of Children"
            inputName="noOfChildren"
            inputValue={familyDetails?.noOfChildren}
            onChange={handleChange}
            placeHolder="3"
            required
          />
          {/* Total Dependents */}
          <InputNumber
            labelName="Total Dependents"
            inputName="totalDependent"
            inputValue={familyDetails?.totalDependent}
            onChange={handleChange}
            placeHolder="4"
            required
          />
          {/* Dependents in Private School */}
          <InputNumber
            labelName="Dependents in Private School"
            inputName="noOfDependentsInPrivateSchools"
            inputValue={familyDetails?.noOfDependentsInPrivateSchools}
            onChange={handleChange}
            placeHolder="2"
          />
          {/* Dependents in Public School */}
          <InputNumber
            labelName="Dependents in Public School"
            name="noOfDependentsInPublicSchools"
            value={familyDetails?.noOfDependentsInPublicSchools}
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
            onClick={() =>
              dispatch(updateFamilyDetails({ familyDetails, userID }))
            }
            rectangle={true}
          />
        </div>
      </ContainerTile>
    </>
  );
}

export default FamilyDetails;
