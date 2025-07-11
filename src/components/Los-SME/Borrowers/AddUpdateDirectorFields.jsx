import React, { useEffect, useRef, useState } from "react";
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
import DynamicForm from "../../Common/DynamicForm/DynamicForm";
import { isValidationFailed } from "../../../utils/isValidationFailed";
import { fetchAllBank } from "../../../redux/Slices/bankSlice";
import { useLocation } from "react-router-dom";

const AddUpdateDirectorFields = ({
  BorrowerData,
  handleChangeReducer,
  sectionRefs,
}) => {
  const dispatch = useDispatch();
  const [filteredLocations1, setFilteredLocations1] = useState([]);
  const [filteredLocations2, setFilteredLocations2] = useState([]);
  const [bankName, setBankName] = useState(null);
  const [branchName, setBranchName] = useState(null);
  const [filteredDistrictLocations1, setFilteredDistrictLocations1] = useState(
    []
  );
  const [filteredDistrictLocations2, setFilteredDistrictLocations2] = useState(
    []
  );
  const { bankOptions, bankBranchOptions, sortCodeBranchCodeOptions } =
    useSelector((state) => state.bank);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

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
  }, [
    BorrowerData.contactDetails.country,
    BorrowerData.nextOfKinDetails.kinCountry,
    BorrowerData.contactDetails.province,
    BorrowerData.nextOfKinDetails.kinProvince,
    BorrowerData.bankDetails.bankName,
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

      // "employer",
      // "occupation",
      // "employmentLocation",
      // "workStartDate",
      // "employeeNo",
      // "workType",

      // "bankName",
      // "accountName",
      // "accountType",
      // "branch",
      // "branchCode",
      // "sortCode",
      // "accountNo",

      // "kinTitle",
      // "kinSurname",
      // "kinNrcNo",
      // "kinGender",
      // "kinRelationship",
      // "kinMobile1",
      // "kinEmail",
      // "kinStreet",
      // "kinResidentialArea",
      // "kinCountry",
      // "kinEmployer",
      // "kinOccupation",

      "creditScore",
      "freeCashInHand",
      "grossSalary",
    ];

    dispatch(setFields(keysArray));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleInputChange = (e, section, index) => {
    const { name, value, type, label, checked } = e.target;
    // console.log(e.target);
    if (name === "bankName") {
      setBankName(value);
    } else if (name === "branch") {
      setBranchName(value);
    }

    // Use section to update the correct part of the state
    dispatch(
      handleChangeReducer({ section, field: name, value, type, checked, index })
    );
  };

  const location = useLocation();
  const isUpdateDirector = location.pathname.includes("update-director");

  // 1. Fetch all banks on mount
  useEffect(() => {
    if (!bankOptions.length) {
      dispatch(fetchAllBank());
    }
  }, []);

  // 2. Set initial bankName if in update mode
  useEffect(() => {
    if (isUpdateDirector && BorrowerData?.bankDetails?.bankName) {
      setBankName(BorrowerData.bankDetails.bankName);
    }
  }, [isUpdateDirector, BorrowerData?.bankDetails?.bankName]);

  // 3. Set initial branch if in update mode
  useEffect(() => {
    if (isUpdateDirector && BorrowerData?.bankDetails?.branch) {
      setBranchName(BorrowerData.bankDetails.branch);
    }
  }, [isUpdateDirector, BorrowerData?.bankDetails?.branch]);

  // 4. Reset branch-related fields when bankName changes
  const prevBankNameRef = useRef();

  useEffect(() => {
    const prevBankName = prevBankNameRef.current;
    const currentBankName = BorrowerData.bankDetails.bankName;

    if (prevBankName !== undefined && prevBankName !== currentBankName) {
      dispatch(
        handleChangeReducer({
          section: "bankDetails",
          field: "branch",
          value: "",
        })
      );

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
    }

    prevBankNameRef.current = currentBankName;
  }, [BorrowerData.bankDetails.bankName]);

  // 5. Set sortCode and branchCode based on selected branch
  useEffect(() => {
    if (!BorrowerData.bankDetails.bankName || !BorrowerData.bankDetails.branch)
      return;

    dispatch(
      handleChangeReducer({
        section: "bankDetails",
        field: "branchCode",
        value: sortCodeBranchCodeOptions[branchName]?.branchCode,
      })
    );

    dispatch(
      handleChangeReducer({
        section: "bankDetails",
        field: "sortCode",
        value: sortCodeBranchCodeOptions[branchName]?.sortCode,
      })
    );
  }, [BorrowerData.bankDetails.branch, branchName]);

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
      validation: false,
    },
    {
      labelName: "Employer",
      inputName: "employer",
      type: "text",
      validation: false,
    },
    {
      labelName: "Occupation",
      inputName: "occupation",
      type: "text",
      validation: false,
    },
    {
      labelName: "Employee No.",
      inputName: "employeeNo",
      type: "text",
      validation: false,
    },
    {
      labelName: "Work Start Date",
      inputName: "workStartDate",
      type: "date",
      validation: false,
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
      validation: false,
    },
    {
      labelName: "District",
      inputName: "employmentDistrict",
      type: "text",
      validation: false,
    },
  ];
  const bankDetailsConfig = [
    {
      labelName: "Name of Bank",
      inputName: "bankName",
      type: "select",
      options: bankOptions,
      validation: false,
      searchable: true,
    },
    {
      labelName: "Account Name",
      inputName: "accountName",
      type: "text",
      validation: false,
    },
    {
      labelName: "Account No.",
      inputName: "accountNo",
      type: "text",
      validation: false,
    },
    {
      labelName: "Type of Account",
      inputName: "accountType",
      type: "select",
      options: accountType,
      validation: false,
    },
    {
      labelName: "Branch",
      inputName: "branch",
      type: "select",
      options: bankBranchOptions[bankName],
      validation: false,
      searchable: true,
    },
    {
      labelName: "Branch Code",
      inputName: "branchCode",
      type: "text",
      validation: false,
    },
    {
      labelName: "Sort Code",
      inputName: "sortCode",
      type: "text",
      validation: false,
    },
  ];
  const nextOfKinConfig = [
    {
      labelName: "Title",
      inputName: "kinTitle",
      type: "select",
      options: title,
      validation: false,
    },
    {
      labelName: "Surname",
      inputName: "kinSurname",
      type: "text",
      validation: false,
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
      validation: false,
    },
    {
      labelName: "Relationship",
      inputName: "kinRelationship",
      type: "select",
      options: relationshipOptions,
      validation: false,
    },
    {
      labelName: "Mobile 1",
      inputName: "kinMobile1",
      type: "text",
      validation: false,
      maxLength: 10,
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
      validation: false,
    },
    {
      labelName: "Residential Area",
      inputName: "kinResidentialArea",
      type: "text",
      validation: false,
    },
    {
      labelName: "Country",
      inputName: "kinCountry",
      type: "select",
      options: countryOptions,
      validation: false,
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
      validation: false,
    },
    {
      labelName: "Occupation",
      inputName: "kinOccupation",
      type: "text",
      validation: false,
    },
    { labelName: "Location", inputName: "kinLocation", type: "text" },
    {
      labelName: "Work Phone Number",
      inputName: "kinWorkPhoneNumber",
      type: "text",
      maxLength: 10,
    },
  ];
  // const otherDetailsConfig = [
  //   {
  //     labelName: "Customer Photo",
  //     inputName: "customerPhotoId",
  //     type: "file",
  //     accept: "image/*",
  //     validation: false,
  //   },
  // ];

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
      </div>
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
      {/* <Accordion
        heading={"Other Details"}
        renderExpandedContent={() =>
          <DynamicForm
            details={BorrowerData.otherDetails}
            config={otherDetailsConfig}
            sectionName={"otherDetails"}
            handleInputChange={handleInputChange}
            handleFileUploads={handleFileUpload}
          />
        }
        error={isValidationFailed(validationError, otherDetailsConfig)}
      /> */}
    </>
  );
};

export default AddUpdateDirectorFields;
