import React, { useEffect, useState } from "react";
import Accordion from "../../Common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import {
  countryOptions,
  districtOptions,
  locationOptions,
} from "../../../data/CountryData";
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
import DynamicForm from "../../Common/DynamicForm/DynamicForm";
import { isValidationFailed } from "../../../utils/isValidationFailed";

const AddUpdateShareholderFields = ({
  BorrowerData,
  handleChangeReducer,
  sectionRefs,
}) => {
  const dispatch = useDispatch();
  const [filteredLocations1, setFilteredLocations1] = useState([]);
  const [filteredDistrictLocations1, setFilteredDistrictLocations1] = useState(
    []
  );

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

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
      "gender",
      "maritalStatus",
      "uniqueIDType",
      "uniqueID",
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
      maxSelectableDate: yesterday,
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
      type: "text",
      validation: true,
      maxLength: 10,
    },
    {
      labelName: "Mobile 2",
      inputName: "mobile2",
      type: "text",
      validation: false,
      maxLength: 10,
    },
    {
      labelName: "Landline Phone",
      inputName: "landlinePhone",
      type: "text",
      validation: false,
      maxLength: 10,
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

  //   Validation Error Object from Validation slice to check Error state
  const validationError = useSelector(
    (state) => state.validation.validationError
  );

  return (
    <>
      <div
        ref={(el) => {
          if (sectionRefs && sectionRefs.current) {
            sectionRefs.current["personalDetails"] = el;
          }
        }}
      >
        <Accordion
          heading={"Personal Details"}
          renderExpandedContent={() => (
            <DynamicForm
              details={BorrowerData.personalDetails}
              config={personalDetailsConfig}
              sectionName={"personalDetails"}
              handleInputChange={handleInputChange}
            />
          )}
          isOpen={true}
          error={isValidationFailed(validationError, personalDetailsConfig)}
        />
      </div>
      <div
        ref={(el) => {
          if (sectionRefs && sectionRefs.current) {
            sectionRefs.current["contactDetails"] = el;
          }
        }}
      >
        <Accordion
          heading={"Contact Details"}
          renderExpandedContent={() => (
            <DynamicForm
              details={BorrowerData.contactDetails}
              config={contactDetailsConfig}
              sectionName={"contactDetails"}
              handleInputChange={handleInputChange}
            />
          )}
          error={isValidationFailed(validationError, contactDetailsConfig)}
        />
      </div>
    </>
  );
};

export default AddUpdateShareholderFields;
