import React, { useEffect, useState } from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputEmail from "../../Common/InputEmail/InputEmail";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputFile from "../../Common/InputFile/InputFile";
import Accordion from "../../Common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import {
  countryOptions,
  districtOptions,
  locationOptions,
} from "../../../data/CountryData";
import {
  maritalStatus,
  workType,
  ministriesOptions,
  title,
  gender,
  accountType,
  uniqueIDType,
  relationshipOptions,
} from "../../../data/LosData";
import {
  setFields,
  clearValidationError,
} from "../../../redux/Slices/validationSlice";
import {
  BankNameOptions,
  BranchNameOptions,
  bankBranches,
} from "../../../data/BankData";

const AddUpdateBorrowerFields = ({
  BorrowerData,
  handleChangeReducer,
  handleFileReset,
  handleFileUpload,
}) => {
  const dispatch = useDispatch();
  const [filteredLocations1, setFilteredLocations1] = useState([]);
  const [filteredLocations2, setFilteredLocations2] = useState([]);
  const [filteredDistrictLocations1, setFilteredDistrictLocations1] = useState(
    []
  );
  const [filteredDistrictLocations2, setFilteredDistrictLocations2] = useState(
    []
  );
  const [filteredBranchNameOptions, setFilteredBranchNameOptions] = useState(
    []
  );
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1); 
  // console.log(BorrowerData);

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
      "employer",
      "occupation",
      "employmentLocation",
      "workStartDate",
      "employeeNo",
      "workType",
      "bankName",
      "accountName",
      "accountType",
      "branch",
      "branchCode",
      "sortCode",
      "accountNo",
      "kinTitle",
      "kinSurname",
      // "kinNrcNo",
      "kinGender",
      "kinRelationship",
      "kinMobile1",
      // "kinEmail",
      "kinStreet",
      "kinResidentialArea",
      "kinCountry",
      "kinEmployer",
      "kinOccupation",
      "creditScore",
      "freeCashInHand",
      "grossSalary",
    ];
    dispatch(setFields(keysArray));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  useEffect(() => {
    setFilteredLocations1(
      locationOptions[BorrowerData.contactDetails.country] || []
    );
    setFilteredLocations2(
      locationOptions[BorrowerData.nextOfKinDetails.kinCountry] || []
    );
    setFilteredDistrictLocations1(
      districtOptions[BorrowerData.contactDetails.province] || []
    );
    setFilteredDistrictLocations2(
      districtOptions[BorrowerData.nextOfKinDetails.kinProvince] || []
    );
    setFilteredBranchNameOptions(
      BranchNameOptions[BorrowerData.bankDetails.bankName] || []
    );
  }, [
    BorrowerData.contactDetails.country,
    BorrowerData.nextOfKinDetails.kinCountry,
    BorrowerData.contactDetails.province,
    BorrowerData.nextOfKinDetails.kinProvince,
    BorrowerData.bankDetails.bankName,
  ]);

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    // Use section to update the correct part of the state
    dispatch(
      handleChangeReducer({ section, field: name, value, type, checked })
    );
  };

  const handleFileUploads = (e) => {
    const { files } = e.target;

    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);

      // Dispatch the upload action with the FormData
      dispatch(
        handleFileUpload({
          formData,
          authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
        })
      );
    }
  };

  // console.log(BorrowerData.otherDetails);

  const handleFileRemove = (section) => {
    console.log("customerPhotoId remove");
    dispatch(
      handleFileReset({
        section,
        field: "customerPhotoId",
        value: "",
        type: "file",
      })
    );
  };

  useEffect(() => {
    dispatch(
      handleChangeReducer({
        section: "bankDetails",
        field: "branchCode",
        value: "",
      })
    );

    dispatch(
      handleChangeReducer({
        section: "bankDetails",
        field: "sortCode",
        value: "",
      })
    );
  }, [BorrowerData.bankDetails.bankName]);

  useEffect(() => {
    if (!BorrowerData.bankDetails.bankName || !BorrowerData.bankDetails.branch)
      return;

    const branch = bankBranches.find(
      (b) =>
        b.bankName === BorrowerData.bankDetails.bankName &&
        b.branchName === BorrowerData.bankDetails.branch
    );

    if (branch) {
      dispatch(
        handleChangeReducer({
          section: "bankDetails",
          field: "branchCode",
          value: branch.branchCode,
        })
      );

      dispatch(
        handleChangeReducer({
          section: "bankDetails",
          field: "sortCode",
          value: branch.sortCode,
        })
      );
    }
  }, [BorrowerData.bankDetails.bankName, BorrowerData.bankDetails.branch]);

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
      maxSelectableDate:yesterday,
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
  const employmentDetailsConfig = [
    {
      labelName: "Work Type",
      inputName: "workType",
      type: "select",
      options: workType,
      validation: true,
    },
    {
      labelName: "Ministry",
      inputName: "ministry",
      type: "select",
      options: ministriesOptions,
      validation: true,
      searchable: true,
    },
    {
      labelName: "Employer",
      inputName: "employer",
      type: "text",
      validation: true,
    },
    {
      labelName: "Occupation",
      inputName: "occupation",
      type: "text",
      validation: true,
    },
    {
      labelName: "Employee No.",
      inputName: "employeeNo",
      type: "text",
      validation: true,
    },
    {
      labelName: "Work Start Date",
      inputName: "workStartDate",
      type: "date",
      validation: true,
    },
    {
      labelName: "Work Phone Number",
      inputName: "workPhoneNumber",
      type: "text",
      validation: false,
    },
    {
      labelName: "Work Physical Address",
      inputName: "workPhysicalAddress",
      type: "text",
      validation: false,
    },
    {
      labelName: "Location",
      inputName: "employmentLocation",
      type: "text",
      validation: true,
    },
    {
      labelName: "District",
      inputName: "employmentDistrict",
      type: "text",
      validation: false,
    },
  ];
  const incomeOnPaySlipConfig = [
    {
      labelName: "Basic Pay",
      inputName: "basicPay",
      type: "number",
      validation: false,
    },
    {
      labelName: "Housing Allowance",
      inputName: "housingAllowance",
      type: "number",
      validation: false,
    },
    {
      labelName: "Transport Allowance",
      inputName: "transportAllowance",
      type: "number",
      validation: false,
    },
    {
      labelName: "Rural/Remote Hardship Allowance",
      inputName: "ruralHardshipAllowance",
      type: "number",
      validation: false,
    },
    {
      labelName: "Infectious Health Risk",
      inputName: "infectiousHealthRisk",
      type: "number",
      validation: false,
    },
    {
      labelName: "Health Shift Allowance",
      inputName: "healthShiftAllowance",
      type: "number",
      validation: false,
    },
    {
      labelName: "Interface Allowance",
      inputName: "interfaceAllowance",
      type: "number",
      validation: false,
    },
    {
      labelName: "Responsibility Allowance",
      inputName: "responsibilityAllowance",
      type: "number",
      validation: false,
    },
    {
      labelName: "Double Class Allowance",
      inputName: "doubleClassAllowance",
      type: "number",
      validation: false,
    },
    {
      labelName: "Acting Allowance",
      inputName: "actingAllowance",
      type: "number",
      validation: false,
    },
    {
      labelName: "Other Allowances",
      inputName: "otherAllowances",
      type: "number",
      validation: false,
    },
  ];
  const deductionOnPaySlipConfig = [
    {
      labelName: "Total Deductions on payslip",
      inputName: "totalDeductionsOnPayslip",
      type: "number",
      validation: false,
    },
    {
      labelName: "Total deductions not on Payslip",
      inputName: "totalDeductionsNotOnPayslip",
      type: "number",
      validation: false,
    },
  ];
  const bankDetailsConfig = [
    {
      labelName: "Name of Bank",
      inputName: "bankName",
      type: "select",
      options: BankNameOptions,
      validation: true,
      searchable: true,
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
      type: "select",
      options: filteredBranchNameOptions,
      validation: true,
      searchable: true,
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
  const nextOfKinConfig = [
    {
      labelName: "Title",
      inputName: "kinTitle",
      type: "select",
      options: title,
      validation: true,
    },
    {
      labelName: "Surname",
      inputName: "kinSurname",
      type: "text",
      validation: true,
    },
    { labelName: "Other Name", inputName: "kinOtherName", type: "text" },
    {
      labelName: "NRC No.",
      inputName: "kinNrcNo",
      type: "text",
      validation: false,
    },
    {
      labelName: "Gender",
      inputName: "kinGender",
      type: "select",
      options: gender,
      validation: true,
    },
    {
      labelName: "Relationship",
      inputName: "kinRelationship",
      type: "select",
      options: relationshipOptions,
      validation: false,
      searchable: true,
    },
    {
      labelName: "Mobile 1",
      inputName: "kinMobile1",
      type: "number",
      validation: true,
    },
    { labelName: "Mobile 2", inputName: "kinMobile2", type: "number" },
    {
      labelName: "Email",
      inputName: "kinEmail",
      type: "email",
      validation: false,
    },
    { labelName: "House No.", inputName: "kinHouseNo", type: "text" },
    {
      labelName: "Street",
      inputName: "kinStreet",
      type: "text",
      validation: true,
    },
    {
      labelName: "Residential Area",
      inputName: "kinResidentialArea",
      type: "text",
      validation: true,
    },

    {
      labelName: "Country",
      inputName: "kinCountry",
      type: "select",
      options: countryOptions,
      validation: true,
      searchable: true,
    },
    {
      labelName: "Province / State",
      inputName: "kinProvince",
      type: "select",
      options: filteredLocations2,
      searchable: true,
    },
    {
      labelName: "District",
      inputName: "kinDistrict",
      type: "select",
      options: filteredDistrictLocations2,
      searchable: true,
    },
    {
      labelName: "Employer",
      inputName: "kinEmployer",
      type: "text",
      validation: true,
    },
    {
      labelName: "Occupation",
      inputName: "kinOccupation",
      type: "text",
      validation: true,
    },
    { labelName: "Location", inputName: "kinLocation", type: "text" },
    {
      labelName: "Work Phone Number",
      inputName: "kinWorkPhoneNumber",
      type: "text",
    },
  ];
  const otherDetailsConfig = [
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
    },
    {
      labelName: "Source of Repayment",
      inputName: "sourceOfRepayment",
      type: "text",
    },
    // Uncomment this if you decide to include the file input field
    {
      labelName: "Customer Photo",
      inputName: "customerPhotoId",
      type: "file",
      validation: false,
      accept: "image/*",
    },
  ];

  // Generate the Form Field
  const personalDetailsInputNames = personalDetailsConfig.map(
    (field) => field.inputName
  );
  const contactDetailsInputNames = contactDetailsConfig.map(
    (field) => field.inputName
  );
  const employmentDetailsInputNames = employmentDetailsConfig.map(
    (field) => field.inputName
  );
  const incomeOnPaySlipInputNames = incomeOnPaySlipConfig.map(
    (field) => field.inputName
  );
  const deductionOnPaySlipInputNames = deductionOnPaySlipConfig.map(
    (field) => field.inputName
  );
  const bankDetailsInputNames = bankDetailsConfig.map(
    (field) => field.inputName
  );
  const nextOfKinInputNames = nextOfKinConfig.map((field) => field.inputName);
  const otherDetailsInputNames = otherDetailsConfig.map(
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
                  minSelectableDate={field.minSelectableDate || null}
                  maxSelectableDate={field.maxSelectableDate || null}
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
                disabled={field.disabled || false}
              />
            );
          case "file":
            return (
              <InputFile
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleFileUploads(e)}
                onDelete={() => handleFileRemove(sectionName)}
                accept={field.accept || "*"}
                isValidation={field.validation || false}
                disabled={field.disabled || false}
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

  const employmentDetails = (employmentDetails) =>
    renderDetails(
      employmentDetails,
      employmentDetailsConfig,
      "employmentDetails"
    );

  const incomeOnPaySlip = (incomeOnPaySlip) =>
    renderDetails(incomeOnPaySlip, incomeOnPaySlipConfig, "incomeOnPaySlip");

  const deductionOnPaySlip = (deductionOnPaySlip) =>
    renderDetails(
      deductionOnPaySlip,
      deductionOnPaySlipConfig,
      "deductionOnPaySlip"
    );

  const bankDetails = (bankDetails) =>
    renderDetails(bankDetails, bankDetailsConfig, "bankDetails");

  const nextOfKinDetails = (nextOfKinData) =>
    renderDetails(nextOfKinData, nextOfKinConfig, "nextOfKinDetails");

  const otherDetails = (otherDetails) =>
    renderDetails(otherDetails, otherDetailsConfig, "otherDetails");

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
      <Accordion
        heading={"Employment Details"}
        renderExpandedContent={() =>
          employmentDetails(BorrowerData.employmentDetails)
        }
        error={isValidationFailed(validationError, employmentDetailsInputNames)}
      />
      <Accordion
        heading={`Salary Details`}
        renderExpandedContent={() => (
          <>
            <Accordion
              heading={"Income on PaySlip"}
              renderExpandedContent={() =>
                incomeOnPaySlip(BorrowerData.incomeOnPaySlip)
              }
              error={isValidationFailed(
                validationError,
                incomeOnPaySlipInputNames
              )}
            />
            <Accordion
              heading={"Deduction"}
              renderExpandedContent={() =>
                deductionOnPaySlip(BorrowerData.deductionOnPaySlip)
              }
              error={isValidationFailed(
                validationError,
                deductionOnPaySlipInputNames
              )}
            />
          </>
        )}
      />

      <Accordion
        heading={"Bank Details"}
        renderExpandedContent={() => bankDetails(BorrowerData.bankDetails)}
        error={isValidationFailed(validationError, bankDetailsInputNames)}
      />
      <Accordion
        heading={"Next of Kin Details"}
        renderExpandedContent={() =>
          nextOfKinDetails(BorrowerData.nextOfKinDetails)
        }
        error={isValidationFailed(validationError, nextOfKinInputNames)}
      />
      <Accordion
        heading={"Other Details"}
        renderExpandedContent={() => otherDetails(BorrowerData.otherDetails)}
        error={isValidationFailed(validationError, otherDetailsInputNames)}
      />
    </>
  );
};

export default AddUpdateBorrowerFields;
