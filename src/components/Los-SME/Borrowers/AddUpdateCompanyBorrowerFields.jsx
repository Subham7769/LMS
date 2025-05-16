import React, { useEffect, useState } from "react";
import Accordion from "../../Common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import {
  countryOptions,
  districtOptions,
  locationOptions,
} from "../../../data/CountryData";
import {
  accountType,
  natureOfCompanyOptions,
  industriesOptions,
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
import { useLocation } from "react-router-dom";

const AddUpdateCompanyBorrowerFields = ({
  BorrowerData,
  handleChangeReducer,
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
  const location = useLocation();

  const isUpdateCompany = location.pathname.includes('update-company');
  const isDraftCompany = location.pathname.includes('update-company/draft');

  const loanOfficer = localStorage.getItem("username");
  useEffect(() => {
    setFilteredLocations1(
      locationOptions[BorrowerData.companyDetails.countryOfRegistration] || []
    );
    setFilteredLocations2(
      locationOptions[BorrowerData.companyContactDetails.country] || []
    );
    setFilteredDistrictLocations1(
      districtOptions[BorrowerData.companyDetails.province] || []
    );
    setFilteredDistrictLocations2(
      districtOptions[BorrowerData.companyContactDetails.province] || []
    );
    setFilteredBranchNameOptions(
      BranchNameOptions[BorrowerData.bankDetails.bankName] || []
    );
  }, [
    BorrowerData.companyDetails.countryOfRegistration,
    BorrowerData.companyContactDetails.country,
    BorrowerData.companyDetails.province,
    BorrowerData.companyContactDetails.province,
    BorrowerData.bankDetails.bankName,
  ]);

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
      "registeredDistrict",
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
      // "freeCashInHand",
      "grossSalary",
      // "shareholdingStructure",
    ];
    dispatch(setFields(keysArray));
    if (!BorrowerData.companyDetails.loanOfficer) {
      dispatch(
        handleChangeReducer({
          section: "companyDetails",
          field: "loanOfficer",
          value: loanOfficer,
        })
      );
    }
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
      searchable: true,
    },
    {
      labelName: "Industry",
      inputName: "industry",
      type: "select",
      options: industriesOptions,
      validation: true,
      searchable: true,
    },
    // {
    //   labelName: "Industry",
    //   inputName: "industry",
    //   type: "text",
    //   validation: true,
    // },
    {
      labelName: "Nature of Business",
      inputName: "natureOfBusiness",
      type: "text",
      validation: true,
    },
    {
      labelName: "Company Registration No.",
      inputName: "companyRegistrationNo",
      type: "text",
      validation: true,
      disabled: isUpdateCompany && !isDraftCompany,
    },
    {
      labelName: "Borrower Serial No.",
      inputName: "companyUniqueId",
      type: "text",
      validation: true,
    },
    {
      labelName: "Date of Registration",
      inputName: "dateOfIncorporation",
      type: "date",
      validation: true,
    },
    {
      labelName: "Country of Registration",
      inputName: "countryOfRegistration",
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
      validation: true,
      searchable: true,
    },
    {
      labelName: "District",
      inputName: "registeredDistrict",
      type: "select",
      options: filteredDistrictLocations1,
      validation: true,
      searchable: true,
    },
    {
      labelName: "Location of HQ",
      inputName: "locationOfHQ",
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
      options: filteredLocations2,
      validation: true,
      searchable: true,
    },
    {
      labelName: "District",
      inputName: "district",
      type: "select",
      options: filteredDistrictLocations2,
      validation: true,
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

  const companyOtherDetailsConfig = [
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
      labelName: "Free Cash In Hand",
      inputName: "freeCashInHand",
      type: "number",
      validation: false,
    },
    {
      labelName: "Trade Union",
      inputName: "tradeUnion",
      type: "text",
      validation: false,
    },
    // {
    //   labelName: "Shareholding Structure",
    //   inputName: "shareholdingStructure",
    //   type: "text",
    //   validation: false,
    // },
    // {
    //   labelName: "Customer Photo",
    //   inputName: "customerPhotoId",
    //   type: "file",
    //   accept: "image/*",
    //   validation: false,
    // },
  ];

  //   Validation Error Object from Validation slice to check Error state
  const validationError = useSelector(
    (state) => state.validation.validationError
  );

  return (
    <>
      <Accordion
        heading={"General Details"}
        renderExpandedContent={() => (
          // companyDetails(BorrowerData.companyDetails)
          <DynamicForm
            details={BorrowerData.companyDetails}
            config={companyDetailsConfig}
            sectionName={"companyDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        isOpen={true}
        error={isValidationFailed(validationError, companyDetailsConfig)}
      />

      <Accordion
        heading={"Contact Preferences"}
        renderExpandedContent={() => (
          <DynamicForm
            details={BorrowerData.companyContactDetails}
            config={companyContactDetailsConfig}
            sectionName={"companyContactDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        error={isValidationFailed(validationError, companyContactDetailsConfig)}
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
        heading={"Miscellaneous Information"}
        renderExpandedContent={() => (
          <DynamicForm
            details={BorrowerData.companyOtherDetails}
            config={companyOtherDetailsConfig}
            sectionName={"companyOtherDetails"}
            handleInputChange={handleInputChange}
            handleFileUploads={handleFileUpload}
          />
        )}
        error={isValidationFailed(validationError, companyOtherDetailsConfig)}
      />
    </>
  );
};

export default AddUpdateCompanyBorrowerFields;
