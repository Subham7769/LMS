import React, { useEffect, useState } from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputEmail from "../../Common/InputEmail/InputEmail";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import Accordion from "../../Common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { countryOptions, districtOptions, locationOptions } from "../../../data/CountryData";
import {
  maritalStatus,
  title,
  gender,
  uniqueIDType,
} from "../../../data/LosData";
import {
  setFields,
  clearValidationError,
} from "../../../redux/Slices/validationSlice";

const AddUpdateShareholderFields = ({ BorrowerData, handleChangeReducer}) => {
  const dispatch = useDispatch();
  const [filteredLocations1, setFilteredLocations1] = useState([]);
  const [filteredDistrictLocations1, setFilteredDistrictLocations1] = useState(
      []
    );

  useEffect(() => {
    setFilteredLocations1(
      locationOptions[BorrowerData.contactDetails.country] || []
    );
    setFilteredDistrictLocations1(
      districtOptions[BorrowerData.contactDetails.province] || []
    );
  }, [
    BorrowerData.contactDetails.country,
    BorrowerData.contactDetails.province,
  ]);

  useEffect(() => {
    const keysArray = [
      "title",
      "firstName",
      "surname",
      "uniqueIDType",
      "uniqueID",
      "gender",
      "maritalStatus",
      "nationality",
      "dateOfBirth",
      "placeOfBirth",
      "mobile1",
      "street",
      "residentialArea",
      "country",
      "email",
    ];
    dispatch(setFields(keysArray));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    // Use section to update the correct part of the state
    dispatch(
      handleChangeReducer({ section, field: name, value, type, checked })
    );
  };

  const handleFileUpload = (e, section) => {
    const { name, value, type, checked,files } = e.target;
console.log(name)
    dispatch(
      handleChangeReducer({ section, field: name, value: files[0], type})
    );
  };

  //   All Fields Configuration
  const personalDetailsConfig = [
    {
      labelName: "Title",
      inputName: "title",
      type: "select",
      options: title,
      validation: true,
    },
    {
      labelName: "First Name",
      inputName: "firstName",
      type: "text",
      validation: true,
    },
    {
      labelName: "Surname",
      inputName: "surname",
      type: "text",
      validation: true,
    },
    {
      labelName: "Other Name",
      inputName: "otherName",
      type: "text",
      validation: false,
    },
    {
      labelName: "Gender",
      inputName: "gender",
      type: "select",
      options: gender,
      validation: true,
    },
    {
      labelName: "Marital Status",
      inputName: "maritalStatus",
      type: "select",
      options: maritalStatus,
      validation: true,
    },
    {
      labelName: "Unique ID Type",
      inputName: "uniqueIDType",
      type: "select",
      options: uniqueIDType,
      validation: true,
    },
    {
      labelName: "Unique ID",
      inputName: "uniqueID",
      type: "text",
      validation: true,
    },
    {
      labelName: "Nationality",
      inputName: "nationality",
      type: "select",
      options: countryOptions,
      validation: true,
      searchable: true,
    },
    {
      labelName: "Date of Birth",
      inputName: "dateOfBirth",
      type: "date",
      validation: true,
    },
    {
      labelName: "Place of Birth",
      inputName: "placeOfBirth",
      type: "text",
      validation: true,
    },
    {
      labelName: "Shareholding Percentage",
      inputName: "shareholdingPercentage",
      type: "number",
      validation: false,
    },
  ];
  const contactDetailsConfig = [
    {
      labelName: "Mobile 1",
      inputName: "mobile1",
      type: "number",
      validation: true,
    },
    {
      labelName: "Mobile 2",
      inputName: "mobile2",
      type: "number",
      validation: false,
    },
    {
      labelName: "Landline Phone",
      inputName: "landlinePhone",
      type: "text",
      validation: false,
    },
    {
      labelName: "House Number",
      inputName: "houseNumber",
      type: "text",
      validation: false,
    },
    {
      labelName: "Street",
      inputName: "street",
      type: "text",
      validation: true,
    },
    {
      labelName: "Residential Area",
      inputName: "residentialArea",
      type: "text",
      validation: true,
    },
    {
      labelName: "Country",
      inputName: "country",
      type: "select",
      options: countryOptions,
      validation: true,
      searchable: true,
    },
    {
      labelName: "Province / State",
      inputName: "province",
      type: "select",
      options: filteredLocations1,
      validation: false,
      searchable: true,
    },
    {
      labelName: "District",
      inputName: "district",
      type: "select",
      options: filteredDistrictLocations1,
      validation: false,
      searchable: true,
    },
    { labelName: "Email", inputName: "email", type: "email", validation: true },
    {
      labelName: "Post Box",
      inputName: "postBox",
      type: "text",
      validation: false,
    },
  ];

  // Generate the Form Field
  const personalDetailsInputNames = personalDetailsConfig.map(
    (field) => field.inputName
  );
  const contactDetailsInputNames = contactDetailsConfig.map(
    (field) => field.inputName
  );

  // Rendering Input Fields
  const renderDetails = (details, config, sectionName) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {config.map((field, index) => {
        switch (field.type) {
          case "text":
            return (
              <InputText
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName)}
                placeHolder={`Enter ${field.labelName}`}
                isValidation={field.validation || false}
                disabled={field.disabled || false}
              />
            );
          case "number":
            return (
              <InputNumber
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName)}
                placeHolder={`Enter ${field.labelName}`}
                isValidation={field.validation || false}
                disabled={field.disabled || false}
              />
            );
          case "select":
            return (
              <InputSelect
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputOptions={field.options}
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName)}
                isValidation={field.validation || false}
                searchable={field.searchable || false}
                disabled={field.disabled || false}
              />
            );
          case "date":
            return (
              <div className="col-span-1" key={index}>
                <InputDate
                  labelName={field.labelName}
                  inputName={field.inputName}
                  inputValue={details[field.inputName]}
                  onChange={(e) => handleInputChange(e, sectionName)}
                  isValidation={field.validation || false}
                  isDisabled={field.disabled || false}
                />
              </div>
            );
          case "email":
            return (
              <InputEmail
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName)}
                placeHolder={`Enter ${field.labelName}`}
                isValidation={field.validation || false}
              />
            );
          case "file":
            return (
              <InputFile
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleFileUpload(e, sectionName)}
                accept={field.accept || "*"}
                isValidation={field.validation || false}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );

  // Dedicated UI Components Creation
  const personalDetails = (personalDetails) =>
    renderDetails(personalDetails, personalDetailsConfig, "personalDetails");

  const contactDetails = (contactDetails) =>
    renderDetails(contactDetails, contactDetailsConfig, "contactDetails");

  //   Validation Error Object from Validation slice to check Error state
  const validationError = useSelector(
    (state) => state.validation.validationError
  );

  //   Validation Checks
  const isValidationFailed = (validationError, sectionInputFields) => {
    // Iterate over fields and check if any corresponding error is true
    return sectionInputFields.some((field) => validationError[field] === true);
  };

  return (
    <>
      <Accordion
        heading={"Personal Details"}
        renderExpandedContent={() =>
          personalDetails(BorrowerData.personalDetails)
        }
        isOpen={true}
        error={isValidationFailed(validationError, personalDetailsInputNames)}
      />
      <Accordion
        heading={"Contact Details"}
        renderExpandedContent={() =>
          contactDetails(BorrowerData.contactDetails)
        }
        error={isValidationFailed(validationError, contactDetailsInputNames)}
      />
    </>
  );
};

export default AddUpdateShareholderFields;
