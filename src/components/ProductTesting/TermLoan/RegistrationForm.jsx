import React from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputDate from "../../Common/InputDate/InputDate";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistrationDetailsField } from "../../../redux/Slices/productTestingSlice";
import {
  booleanOptions,
  genderOptions,
  maritalOptions,
} from "../../../data/OptionsData";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { registrationDetails } = useSelector((state) => state.productTesting);
  const handleChange = (e) => {
    const { name, value } = e.target;

    const isResidenceField = Object.keys(
      registrationDetails.residenceDetails
    ).includes(name);
    const isMaritalField = Object.keys(
      registrationDetails.maritalDetails
    ).includes(name);

    if (isResidenceField) {
      dispatch(
        updateRegistrationDetailsField({
          name: `residenceDetails.${name}`,
          value,
        })
      );
    } else if (isMaritalField) {
      dispatch(
        updateRegistrationDetailsField({
          name: `maritalDetails.${name}`,
          value,
        })
      );
    } else {
      dispatch(updateRegistrationDetailsField({ name, value }));
    }
  };

  return (
    <>
      <ContainerTile className="mb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <InputText
            labelName="First Name"
            inputName="firstNameEn"
            inputValue={registrationDetails?.firstNameEn}
            onChange={handleChange}
            placeHolder={"John"}
            isValidation={true}
          />
          <InputText
            labelName="Last Name"
            inputName="lastNameEn"
            inputValue={registrationDetails?.lastNameEn}
            onChange={handleChange}
            placeHolder={"Cena"}
            isValidation={true}
          />
          <InputText
            labelName="Middle Name"
            inputName="middleNameEn"
            inputValue={registrationDetails?.middleNameEn}
            onChange={handleChange}
            placeHolder={"John"}
            isValidation={true}
          />
          <InputText
            labelName="First Name Ar"
            inputName="middleNameEn"
            inputValue={registrationDetails?.firstNameAr}
            onChange={handleChange}
            placeHolder={"John"}
            isValidation={true}
          />
          <InputText
            labelName="Last Name Ar"
            inputName="lastNameAr"
            inputValue={registrationDetails?.lastNameAr}
            onChange={handleChange}
            placeHolder={"Cena"}
            isValidation={true}
          />
          <InputText
            labelName="Middle Name Ar"
            inputName="middleNameAr"
            inputValue={registrationDetails?.middleNameAr}
            onChange={handleChange}
            placeHolder={"John"}
            isValidation={true}
          />
          <InputSelect
            labelName="Gender"
            inputName="gender"
            inputOptions={genderOptions}
            inputValue={registrationDetails?.gender}
            onChange={handleChange}
            isValidation={true}
          />
          <div className="col-span-1">
            <InputDate
              labelName="Date of Birth"
              inputName="dateOfBirth"
              inputValue={registrationDetails?.dateOfBirth}
              onChange={handleChange}
              isValidation={true}
            />
          </div>
          <InputText
            labelName="ID Type"
            inputName="idType"
            inputValue={registrationDetails?.idType}
            onChange={handleChange}
            placeHolder={"IQAMA ID"}
            isValidation={true}
          />
          <InputNumber
            labelName="ID Number"
            inputName="idNumber"
            inputValue={registrationDetails?.idNumber}
            onChange={handleChange}
            placeHolder={"123"}
            isValidation={true}
          />
          <div className="col-span-1">
            <InputDate
              labelName="ID Expiry Date"
              inputName="idExpiryDate"
              inputValue={registrationDetails?.idExpiryDate}
              onChange={handleChange}
              isValidation={true}
            />
          </div>
          <InputText
            labelName="Nationality"
            inputName="nationality"
            inputValue={registrationDetails?.nationality}
            onChange={handleChange}
            placeHolder={"Indian"}
            isValidation={true}
          />
          <InputNumber
            labelName="Nationality Id"
            inputName="nationalityId"
            inputValue={registrationDetails?.nationalityId}
            onChange={handleChange}
            placeHolder={"123"}
            isValidation={true}
          />
          <InputText
            labelName="Ocupation"
            inputName="occupation"
            inputValue={registrationDetails?.occupation}
            onChange={handleChange}
            placeHolder={"Business"}
            isValidation={true}
          />
        </div>
      </ContainerTile>
      <ContainerTile className="mb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <InputNumber
            labelName="Building Number"
            inputName="buildingNumber"
            inputValue={registrationDetails?.residenceDetails?.buildingNumber}
            onChange={handleChange}
            placeHolder={"123"}
            isValidation={true}
          />
          <InputText
            labelName="Street Name"
            inputName="streetName"
            inputValue={registrationDetails?.residenceDetails?.streetName}
            onChange={handleChange}
            placeHolder={"Kings' Road"}
            isValidation={true}
          />
          <InputText
            labelName="City"
            inputName="city"
            inputValue={registrationDetails?.residenceDetails?.city}
            onChange={handleChange}
            placeHolder={"Londan"}
            isValidation={true}
          />
          <InputNumber
            labelName="City Id"
            inputName="cityId"
            inputValue={registrationDetails?.residenceDetails?.cityId}
            onChange={handleChange}
            placeHolder={"123"}
            isValidation={true}
          />
          <InputText
            labelName="Neighborhood"
            inputName="neighborhood"
            inputValue={registrationDetails?.residenceDetails?.neighborhood}
            onChange={handleChange}
            placeHolder={"Carter Palace"}
            isValidation={true}
          />
          <InputNumber
            labelName="Post Office Box"
            inputName="postOfficeBox"
            inputValue={registrationDetails?.residenceDetails?.postOfficeBox}
            onChange={handleChange}
            placeHolder={"42211"}
            isValidation={true}
          />
          <InputNumber
            labelName="Additional Numbers"
            inputName="additionalNumbers"
            inputValue={
              registrationDetails?.residenceDetails?.additionalNumbers
            }
            onChange={handleChange}
            placeHolder={"123"}
            isValidation={true}
          />
          <InputNumber
            labelName="Unit Number"
            inputName="unitNumber"
            inputValue={registrationDetails?.residenceDetails?.unitNumber}
            onChange={handleChange}
            placeHolder={"1"}
            isValidation={true}
          />
          <InputSelect
            labelName="Rent"
            inputName="rent"
            inputOptions={booleanOptions}
            inputValue={registrationDetails?.residenceDetails?.rent}
            onChange={handleChange}
            isValidation={true}
          />
        </div>
      </ContainerTile>
      <ContainerTile className="mb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Marital Status */}
          <InputSelect
            labelName="Marital Status"
            inputName="maritalStatus"
            inputOptions={maritalOptions}
            inputValue={registrationDetails?.maritalDetails?.maritalStatus}
            onChange={handleChange}
            isValidation={true}
          />
          {/* No. of Domestic Workers */}
          <InputNumber
            labelName="No. of Domestic Workers"
            inputName="noOfDomesticWorkers"
            inputValue={
              registrationDetails?.maritalDetails?.noOfDomesticWorkers
            }
            onChange={handleChange}
            placeHolder="1"
            required
            isValidation={true}
          />
          {/* No. of Children */}
          <InputNumber
            labelName="No. of Children"
            inputName="noOfChildren"
            inputValue={registrationDetails?.maritalDetails?.noOfChildren}
            onChange={handleChange}
            placeHolder="3"
            required
            isValidation={true}
          />
          {/* Total Dependents */}
          <InputNumber
            labelName="Total Dependents"
            inputName="totalDependent"
            inputValue={registrationDetails?.maritalDetails?.totalDependent}
            onChange={handleChange}
            placeHolder="4"
            required
            isValidation={true}
          />
          {/* Dependents in Private School */}
          <InputNumber
            labelName="Dependents in Private School"
            inputName="noOfDependentsInPrivateSchools"
            inputValue={
              registrationDetails?.maritalDetails
                ?.noOfDependentsInPrivateSchools
            }
            onChange={handleChange}
            placeHolder="2"
          />
          <InputNumber
            labelName="Dependents in Public School"
            inputName="noOfDependentsInPublicSchools"
            inputValue={
              registrationDetails?.maritalDetails?.noOfDependentsInPublicSchools
            }
            onChange={handleChange}
            placeHolder="2"
          />
          {/* Bread Winner */}
          <InputSelect
            labelName="Bread Winner"
            inputName="breadWinner"
            inputOptions={booleanOptions}
            inputValue={registrationDetails?.maritalDetails?.breadWinner}
            onChange={handleChange}
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default RegistrationForm;
