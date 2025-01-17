import React, { useEffect, useState } from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputEmail from "../../Common/InputEmail/InputEmail";
import InputFile from "../../Common/InputFile/InputFile";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import Accordion from "../../Common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { countryOptions, locationOptions } from "../../../data/CountryData";
import { accountType, natureOfCompanyOptions } from "../../../data/LosData";
import {
  setFields,
  clearValidationError,
} from "../../../redux/Slices/validationSlice";

const AddUpdateCompanyBorrowerFields = ({
  BorrowerData,
  handleChangeReducer,
}) => {
  const dispatch = useDispatch();
  const [filteredLocations1, setFilteredLocations1] = useState([]);

  useEffect(() => {
    setFilteredLocations1(
      locationOptions[BorrowerData.companyContactDetails.country] || []
    );
  }, [BorrowerData.companyContactDetails.country]);

  useEffect(() => {
    const keysArray = [
      "companyName",
      "companyShortName",
      "natureOfCompany",
      "companyUniqueId",
      "companyRegistrationNo",
      "countryOfRegistration",
      "dateOfIncorporation",
      "province",
      "district",
      "locationOfHQ",
      "industry",
      "natureOfBusiness",
      "numberOfPermanentEmployees",

      "mobile1",
      "street",
      "residentialArea",
      "country",
      "email",

      "bankName",
      "accountName",
      "accountType",
      "branch",
      "branchCode",
      "sortCode",
      "accountNo",

      "creditScore",
      "freeCashInHand",
      "grossSalary",
      "shareholdingStructure",
      "tradeUnion",
    ];
    dispatch(setFields(keysArray));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleInputChange = (e, section, index) => {
    const { name, value, type, checked } = e.target;
    // Use section to update the correct part of the state
    dispatch(
      handleChangeReducer({ section, field: name, value, type, checked, index })
    );
  };

  const handleFileUpload = (e, section) => {
    const { name, value, type, checked, files } = e.target;

    dispatch(
      handleChangeReducer({ section, field: name, value: files[0], type })
    );
  };

  //   All Fields Configuration
  const companyDetailsConfig = [
    {
      labelName: "Company Name",
      inputName: "companyName",
      type: "text",
      validation: true,
    },
    {
      labelName: "Company Short Name",
      inputName: "companyShortName",
      type: "text",
      validation: true,
    },
    {
      labelName: "Nature of Company",
      inputName: "natureOfCompany",
      type: "select",
      options: natureOfCompanyOptions,
      validation: true,
    },
    {
      labelName: "Company Unique Id",
      inputName: "companyUniqueId",
      type: "text",
      validation: true,
    },
    {
      labelName: "Company Registration No.",
      inputName: "companyRegistrationNo",
      type: "text",
      validation: true,
    },
    {
      labelName: "Country of Registration",
      inputName: "countryOfRegistration",
      type: "select",
      options: countryOptions,
      validation: true,
    },
    {
      labelName: "Date of Registration",
      inputName: "dateOfIncorporation",
      type: "date",
      validation: true,
    },
    {
      labelName: "Province / State",
      inputName: "province",
      type: "select",
      options: filteredLocations1,
      validation: true,
    },
    {
      labelName: "District",
      inputName: "district",
      type: "text",
      validation: true,
    },
    {
      labelName: "Location of HQ",
      inputName: "locationOfHQ",
      type: "text",
      validation: true,
    },
    {
      labelName: "Industry",
      inputName: "industry",
      type: "text",
      validation: true,
    },
    {
      labelName: "Nature of Business",
      inputName: "natureOfBusiness",
      type: "text",
      validation: true,
    },
    {
      labelName: "No. of Permanent Employees",
      inputName: "numberOfPermanentEmployees",
      type: "number",
      validation: true,
    },
  ];

  const companyContactDetailsConfig = [
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

  const bankDetailsConfig = [
    {
      labelName: "Name of Bank",
      inputName: "bankName",
      type: "text",
      validation: true,
    },
    {
      labelName: "Account Name",
      inputName: "accountName",
      type: "text",
      validation: true,
    },
    {
      labelName: "Account No.",
      inputName: "accountNo",
      type: "number",
      validation: true,
    },
    {
      labelName: "Type of Account",
      inputName: "accountType",
      type: "select",
      options: accountType,
      validation: true,
    },
    {
      labelName: "Branch",
      inputName: "branch",
      type: "text",
      validation: true,
    },
    {
      labelName: "Branch Code",
      inputName: "branchCode",
      type: "text",
      validation: true,
    },
    {
      labelName: "Sort Code",
      inputName: "sortCode",
      type: "text",
      validation: true,
    },
  ];

  const companyOtherDetailsConfig = [
    {
      labelName: "Free Cash In Hand",
      inputName: "freeCashInHand",
      type: "number",
      validation: true,
    },
    {
      labelName: "Monthly Revenue",
      inputName: "grossSalary",
      type: "number",
      validation: true,
    },
    {
      labelName: "Credit Score",
      inputName: "creditScore",
      type: "number",
      validation: true,
    },
    {
      labelName: "Reason for Borrowing",
      inputName: "reasonForBorrowing",
      type: "text",
      validation: true,
    },
    {
      labelName: "Source of Repayment",
      inputName: "sourceOfRepayment",
      type: "text",
      validation: true,
    },
    {
      labelName: "Trade Union",
      inputName: "tradeUnion",
      type: "text",
      validation: true,
    },
    {
      labelName: "Shareholding Structure",
      inputName: "shareholdingStructure",
      type: "text",
      validation: true,
    },
    // {
    //   labelName: "Customer Photo",
    //   inputName: "customerPhotoId",
    //   type: "file",
    //   accept: "image/*",
    //   validation: false,
    // },
  ];

  // Generate the Form Field
  const companyDetailsInputNames = companyDetailsConfig.map(
    (field) => field.inputName
  );

  const companyContactDetailsInputNames = companyContactDetailsConfig.map(
    (field) => field.inputName
  );

  const bankDetailsInputNames = bankDetailsConfig.map(
    (field) => field.inputName
  );

  const companyOtherDetailsInputNames = companyOtherDetailsConfig.map(
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
                placeHolder={field.labelName === "Credit Score" ? "Enter between 0 to 1" : `Enter ${field.labelName}`}
                isValidation={field.validation || false}
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
  const companyDetails = (companyDetails) =>
    renderDetails(companyDetails, companyDetailsConfig, "companyDetails");

  const companyContactDetails = (companyContactDetails) =>
    renderDetails(
      companyContactDetails,
      companyContactDetailsConfig,
      "companyContactDetails"
    );

  const bankDetails = (bankDetails) =>
    renderDetails(bankDetails, bankDetailsConfig, "bankDetails");

  const companyOtherDetails = (companyOtherDetails) =>
    renderDetails(
      companyOtherDetails,
      companyOtherDetailsConfig,
      "companyOtherDetails"
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
        heading={"General Details"}
        renderExpandedContent={() =>
          companyDetails(BorrowerData.companyDetails)
        }
        isOpen={true}
        error={isValidationFailed(validationError, companyDetailsInputNames)}
      />

      <Accordion
        heading={"Contact Details"}
        renderExpandedContent={() =>
          companyContactDetails(BorrowerData.companyContactDetails)
        }
        error={isValidationFailed(
          validationError,
          companyContactDetailsInputNames
        )}
      />

      <Accordion
        heading={"Bank Details"}
        renderExpandedContent={() => bankDetails(BorrowerData.bankDetails)}
        error={isValidationFailed(validationError, bankDetailsInputNames)}
      />

      <Accordion
        heading={"Other Details"}
        renderExpandedContent={() =>
          companyOtherDetails(BorrowerData.companyOtherDetails)
        }
        error={isValidationFailed(
          validationError,
          companyOtherDetailsInputNames
        )}
      />

    </>
  );
};

export default AddUpdateCompanyBorrowerFields;
