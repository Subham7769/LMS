import React, { useEffect, useState } from "react";
import Accordion from "../../Common/Accordion/Accordion";
import { toast } from "react-toastify";
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
import DynamicForm from "../../Common/DynamicForm/DynamicForm";
import { isValidationFailed } from "../../../utils/isValidationFailed";

import {
  setEmployerData,
  handleChangeEmployerData,
  fetchEmployerData,
  addEmployerData,
  updateEmployerData,
  deleteEmployerData,
} from "../../../redux/Slices/employerSlice";
import { useLocation } from "react-router-dom";

const AddUpdateBorrowerFields = ({
  BorrowerData,
  handleChangeReducer,
  handleFileReset,
  handleFileUpload,
}) => {
  const dispatch = useDispatch();
  const { employerData, allEmployerData, loading, error } = useSelector(
    (state) => state.employer
  );
  const location = useLocation();

  const isUpdateBorrower = location.pathname.includes("update-borrower");
  const isDraftBorrower = location.pathname.includes("update-borrower/draft");

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
  const [employerOptions, setEmployerOptions] = useState([]);
  // console.log(BorrowerData);
  const { menus } = useSelector((state) => state.sidebar);
  const [defaultAffordability, setDefaultAffordability] = useState([]);

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

      "workType",
      "occupation",
      "employeeNo",
      "workStartDate",
      "employmentLocation",

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
      // "kinRelationship",
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
    dispatch(fetchEmployerData());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  useEffect(() => {
    //create employer dropdown
    if (allEmployerData?.length) {
      const options = allEmployerData.map(({ employerId, employerName }) => ({
        value: employerName,
        label: employerName,
      }));
      setEmployerOptions(options);
    }
  }, [allEmployerData]);

  useEffect(() => {
    console.log(menus);
    //get the default affordability
    const result = menus
      .find((menu) => menu.title === "Affordability")
      ?.submenuItems?.find(
        (submenuItem) => submenuItem.name === "CRITERIA_DEFAULT_TEMP"
      );
    console.log(result);
    setDefaultAffordability(
      result
        ? {
            name: result.name,
            value: result.href.split("/").pop(),
          }
        : { name: "", value: "" }
    );
  }, [menus]);

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

  //Add new employer from the dropdown.
  const handleNewEmployer = async (inputValue, onChange) => {
    if (!defaultAffordability?.value) {
      toast.warning(
        "Default Affordibility not found, cannot create new employer"
      );
      return;
    }
    const employerData = {
      employerName: inputValue,
      affordabilityCriteriaTempId: defaultAffordability?.value,
    };

    // await dispatch(validateForm(employerData));
    // const state = store.getState();
    // const isValid = state.validation.isValid;
    // if (isValid) {
    //  dispatch(addEmployerData(employerData)).unwrap();
    // }
    dispatch(addEmployerData(employerData)).unwrap();
    const newOption = { value: inputValue, label: inputValue };
    setEmployerOptions((prev) => [...prev, newOption]); // Add new option to the list
    // Explicitly call onChange to update the selected value
    if (onChange) {
      onChange({
        target: {
          name: "employer", // Ensure this matches your input field name
          value: newOption.value, // Pass only the value
          selectedOption: newOption, // Optionally, store full selected option
        },
      });
    }
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
      disabled: isUpdateBorrower && !isDraftBorrower,
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
  ];
  const contactDetailsConfig = [
    {
      labelName: "Mobile 1",
      inputName: "mobile1",
      type: "text",
      maxLength:10,
      validation: true,
    },
    {
      labelName: "Mobile 2",
      inputName: "mobile2",
      type: "text",
      maxLength:10,
      validation: false,
    },
    {
      labelName: "Landline Phone",
      inputName: "landlinePhone",
      type: "text",
      maxLength: 10,
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
      type: "InputSelectCreatable",
      options: employerOptions,
      validation: true,
      searchable: true,
      onCreateOption: handleNewEmployer,
      setEmployerOptions: setEmployerOptions,
      clearable: true,
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
      maxLength: 10,
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
      type: "text",
      validation: false,
    },
    {
      labelName: "Housing Allowance",
      inputName: "housingAllowance",
      type: "text",
      validation: false,
    },
    {
      labelName: "Transport Allowance",
      inputName: "transportAllowance",
      type: "text",
      validation: false,
    },
    {
      labelName: "Rural/Remote Hardship Allowance",
      inputName: "ruralHardshipAllowance",
      type: "text",
      validation: false,
    },
    {
      labelName: "Infectious Health Risk",
      inputName: "infectiousHealthRisk",
      type: "text",
      validation: false,
    },
    {
      labelName: "Health Shift Allowance",
      inputName: "healthShiftAllowance",
      type: "text",
      validation: false,
    },
    {
      labelName: "Interface Allowance",
      inputName: "interfaceAllowance",
      type: "text",
      validation: false,
    },
    {
      labelName: "Responsibility Allowance",
      inputName: "responsibilityAllowance",
      type: "text",
      validation: false,
    },
    {
      labelName: "Double Class Allowance",
      inputName: "doubleClassAllowance",
      type: "text",
      validation: false,
    },
    {
      labelName: "Acting Allowance",
      inputName: "actingAllowance",
      type: "text",
      validation: false,
    },
    {
      labelName: "Other Allowances",
      inputName: "otherAllowances",
      type: "text",
      validation: false,
    },
  ];
  const deductionOnPaySlipConfig = [
    {
      labelName: "Total Deductions on payslip",
      inputName: "totalDeductionsOnPayslip",
      type: "text",
      validation: false,
    },
    {
      labelName: "Total deductions not on Payslip",
      inputName: "totalDeductionsNotOnPayslip",
      type: "text",
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
      type: "text",
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
      type: "text",
      maxLength: 10,
      validation: true,
    },
    {
      labelName: "Mobile 2",
      inputName: "kinMobile2",
      type: "text",
      maxLength: 10,
    },
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
      maxLength: 10,
    },
  ];
  const otherDetailsConfig = [
    {
      labelName: "Credit Score",
      inputName: "creditScore",
      type: "text",
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

  //   Validation Error Object from Validation slice to check Error state
  const validationError = useSelector(
    (state) => state.validation.validationError
  );

  return (
    <>
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
      <Accordion
        heading={"Contact Preferences"}
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
      <Accordion
        heading={"Professional Status"}
        renderExpandedContent={() => (
          <DynamicForm
            details={BorrowerData.employmentDetails}
            config={employmentDetailsConfig}
            sectionName={"employmentDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        error={isValidationFailed(validationError, employmentDetailsConfig)}
      />
      <Accordion
        heading={`Earnings Data`}
        renderExpandedContent={() => (
          <>
            <Accordion
              heading={"Income on PaySlip"}
              renderExpandedContent={() => (
                <DynamicForm
                  details={BorrowerData.incomeOnPaySlip}
                  config={incomeOnPaySlipConfig}
                  sectionName={"incomeOnPaySlip"}
                  handleInputChange={handleInputChange}
                />
              )}
              error={isValidationFailed(validationError, incomeOnPaySlipConfig)}
            />
            <Accordion
              heading={"Deduction"}
              renderExpandedContent={() => (
                <DynamicForm
                  details={BorrowerData.deductionOnPaySlip}
                  config={deductionOnPaySlipConfig}
                  sectionName={"deductionOnPaySlip"}
                  handleInputChange={handleInputChange}
                />
              )}
              error={isValidationFailed(
                validationError,
                deductionOnPaySlipConfig
              )}
            />
          </>
        )}
      />

      <Accordion
        heading={"Financial Accounts"}
        renderExpandedContent={() => (
          <DynamicForm
            details={BorrowerData.bankDetails}
            config={bankDetailsConfig}
            sectionName={"bankDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        error={isValidationFailed(validationError, bankDetailsConfig)}
      />
      <Accordion
        heading={"Family Reference"}
        renderExpandedContent={() => (
          <DynamicForm
            details={BorrowerData.nextOfKinDetails}
            config={nextOfKinConfig}
            sectionName={"nextOfKinDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        error={isValidationFailed(validationError, nextOfKinConfig)}
      />
      <Accordion
        heading={"Miscellaneous Information"}
        renderExpandedContent={() => (
          <DynamicForm
            details={BorrowerData.otherDetails}
            config={otherDetailsConfig}
            sectionName={"otherDetails"}
            handleInputChange={handleInputChange}
            handleFileUploads={handleFileUploads}
            handleFileRemove={handleFileRemove}
          />
        )}
        error={isValidationFailed(validationError, otherDetailsConfig)}
      />
    </>
  );
};

export default AddUpdateBorrowerFields;
