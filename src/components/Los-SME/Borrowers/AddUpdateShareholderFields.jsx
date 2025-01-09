import React, { useEffect, useState } from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputEmail from "../../Common/InputEmail/InputEmail";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import Accordion from "../../Common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { countryOptions, locationOptions } from "../../../data/CountryData";
import {
  maritalStatus,
  workType,
  title,
  gender,
  accountType,
  uniqueIDType,
} from "../../../data/LosData";
import {
  setFields,
  clearValidationError,
} from "../../../redux/Slices/validationSlice";

const AddUpdateShareholderFields = ({
  BorrowerData,
  handleChangeReducer,
  index,
}) => {
  const dispatch = useDispatch();
  const [filteredLocations1, setFilteredLocations1] = useState([]);
  const [filteredLocations2, setFilteredLocations2] = useState([]);

  useEffect(() => {
    setFilteredLocations1(
      locationOptions[BorrowerData.contactDetails.country] || []
    );
  }, [BorrowerData.contactDetails.country]);

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

    const indexedKeysArray = keysArray.map((field) => `${field}_${index}`);

    dispatch(setFields(indexedKeysArray));
    return () => {
      dispatch(clearValidationError());
    };
  }, [index, dispatch]);

  const handleInputChange = (e, section, index) => {
    const { name, value, type, checked } = e.target;
    // Use section to update the correct part of the state
    dispatch(
      handleChangeReducer({ section, index, field: name, value, type, checked })
    );
  };

  const handleFileUpload = (e, section, index) => {
    const { name, value, type, checked, files } = e.target;
    console.log(name);
    dispatch(
      handleChangeReducer({
        section,
        index,
        field: name,
        value: files[0],
        type,
      })
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
    },
    {
      labelName: "Province / State",
      inputName: "province",
      type: "select",
      options: filteredLocations1,
      validation: false,
    },
    {
      labelName: "District",
      inputName: "district",
      type: "text",
      validation: false,
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
  const renderDetails = (details, config, sectionName, index) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {config.map((field, fieldIndex) => {
        switch (field.type) {
          case "text":
            return (
              <InputText
                key={fieldIndex}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName, index)}
                placeHolder={`Enter ${field.labelName}`}
                isValidation={field.validation || false}
                isIndex={fieldIndex}
              />
            );
          case "number":
            return (
              <InputNumber
                key={fieldIndex}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName, index)}
                placeHolder={`Enter ${field.labelName}`}
                isValidation={field.validation || false}
                isIndex={fieldIndex}
              />
            );
          case "select":
            return (
              <InputSelect
                key={fieldIndex}
                labelName={field.labelName}
                inputName={field.inputName}
                inputOptions={field.options}
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName, index)}
                isValidation={field.validation || false}
                isIndex={fieldIndex}
              />
            );
          case "date":
            return (
              <div className="col-span-1" key={fieldIndex}>
                <InputDate
                  labelName={field.labelName}
                  inputName={field.inputName}
                  inputValue={details[field.inputName]}
                  onChange={(e) => handleInputChange(e, sectionName, index)}
                  isValidation={field.validation || false}
                  isIndex={fieldIndex}
                />
              </div>
            );
          case "email":
            return (
              <InputEmail
                key={fieldIndex}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName, index)}
                placeHolder={`Enter ${field.labelName}`}
                isValidation={field.validation || false}
                isIndex={fieldIndex}
              />
            );
          case "file":
            return (
              <InputFile
                key={fieldIndex}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleFileUpload(e, sectionName, index)}
                accept={field.accept || "*"}
                isValidation={field.validation || false}
                isIndex={fieldIndex}
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
    renderDetails(
      personalDetails,
      personalDetailsConfig,
      "personalDetails",
      index
    );

  const contactDetails = (contactDetails) =>
    renderDetails(
      contactDetails,
      contactDetailsConfig,
      "contactDetails",
      index
    );

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
          personalDetails(BorrowerData.personalDetails, index)
        }
        isOpen={true}
        error={isValidationFailed(validationError, personalDetailsInputNames)}
      />
      <Accordion
        heading={"Contact Details"}
        renderExpandedContent={() =>
          contactDetails(BorrowerData.contactDetails, index)
        }
        error={isValidationFailed(validationError, contactDetailsInputNames)}
      />
    </>
  );
};

export default AddUpdateShareholderFields;
