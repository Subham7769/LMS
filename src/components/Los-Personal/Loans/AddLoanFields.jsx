import React, { useEffect, useState } from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputFile from "../../Common/InputFile/InputFile"; // Assuming InputFile component for file upload
import InputTextArea from "../../Common/InputTextArea/InputTextArea"; // Assuming InputFile component for file upload
import Accordion from "../../Common/Accordion/Accordion";
import {
  fetchLoanProductData,
  updateLoanField,
} from "../../../redux/Slices/personalLoansSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBorrowers } from "../../../redux/Slices/personalBorrowersSlice";
import {
  clearValidationError,
  setFields,
} from "../../../redux/Slices/validationSlice";
import { tenureTypeOptions } from "../../../data/OptionsData";

const AddLoanFields = ({ addLoanData }) => {
  const dispatch = useDispatch();
  const { allBorrowersData } = useSelector((state) => state.personalBorrowers);
  const { loanProductOptions } = useSelector((state) => state.personalLoans);
  const [borrowerOptions, setBorrowerOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchLoanProductData());
    dispatch(fetchAllBorrowers({ page: 0, size: 20 }));
    const keysArray = [
      "borrowerId",
      "disbursedBy",
      "interestMethod",
      "loanDuration",
      "loanInterest",
      "loanProductId",
      "loanReleaseDate",
      "numberOfTenure",
      "perLoanDuration",
      "perLoanInterest",
      "principalAmount",
      "repaymentCycle",
    ];
    dispatch(setFields(keysArray));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  useEffect(() => {
    const options = allBorrowersData.map((item) => ({
      label: `${item.borrowerProfile?.personalDetails?.title} ${item.borrowerProfile?.personalDetails?.surname} ${item.borrowerProfile?.personalDetails?.otherName}`,
      value: item.uid,
    }));

    setBorrowerOptions(options);
  }, [allBorrowersData]);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    // Use section to update the correct part of the state
    dispatch(updateLoanField({ section, field: name, value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    dispatch(updateLoanField({ name, value: files[0].name }));
  };

  // All Fields Configuration
  const generalDetailsConfig = [
    {
      labelName: "Loan Product",
      inputName: "loanProductId",
      type: "select",
      options: loanProductOptions, // Dynamically populated
      validation: true,
    },
    {
      labelName: "Borrower",
      inputName: "borrowerId",
      type: "select",
      options: borrowerOptions, // Dynamically populated
      validation: true,
    },
    {
      labelName: "Disbursed By",
      inputName: "disbursedBy",
      type: "select",
      options: [{ value: "Bank", label: "Bank" }], // Static
      validation: true,
    },
    {
      labelName: "Principal Amount",
      inputName: "principalAmount",
      type: "number",
      validation: true,
    },
    {
      labelName: "Loan Release Date",
      inputName: "loanReleaseDate",
      type: "date",
      validation: true,
    },
    {
      labelName: "Interest Method",
      inputName: "interestMethod",
      type: "select",
      options: [
        { value: "FLAT", label: "FLAT" },
        { value: "REDUCING", label: "REDUCING" },
      ],
      validation: true,
    },
    {
      labelName: "Repayment Cycle",
      inputName: "repaymentCycle",
      type: "select",
      options: [
        { value: "Monthly", label: "Monthly" },
        { value: "Quarterly", label: "Quarterly" },
      ],
      validation: true,
    },
    {
      labelName: "Loan Interest %",
      inputName: "loanInterest",
      type: "text",
      validation: true,
    },
    {
      labelName: "Per (Loan Interest)",
      inputName: "perLoanInterest",
      type: "select",
      options: tenureTypeOptions,
      validation: true,
    },
    {
      labelName: "Loan Duration",
      inputName: "loanDuration",
      type: "number",
      validation: true,
    },
    {
      labelName: "Per (Loan Duration)",
      inputName: "perLoanDuration",
      type: "select",
      options: tenureTypeOptions,
      validation: true,
    },
    {
      labelName: "Number of Tenure",
      inputName: "numberOfTenure",
      type: "number",
      validation: true,
    },
  ];

  const advanceSettingsConfig = [
    {
      labelName: "Decimal Places",
      inputName: "decimalPlaces",
      type: "select",
      options: [
        { value: "2", label: "2" },
        { value: "3", label: "3" },
      ],
      validation: false,
    },
    {
      labelName: "Interest Start Date",
      inputName: "interestStartDate",
      type: "date",
      validation: false,
    },
    {
      labelName: "First Repayment Date",
      inputName: "firstRepaymentDate",
      type: "date",
      validation: false,
    },
    {
      labelName: "First Repayment Amount",
      inputName: "firstRepaymentAmount",
      type: "number",
      validation: false,
    },
    {
      labelName: "Last Repayment Amount",
      inputName: "lastRepaymentAmount",
      type: "number",
      validation: false,
    },
    {
      labelName: "Override Maturity Date",
      inputName: "overrideMaturityDate",
      type: "date",
      validation: false,
    },
    {
      labelName: "Override Each Repayment Amount to",
      inputName: "overrideRepaymentAmount",
      type: "number",
      validation: false,
    },
    {
      labelName: "Calculate Interest on Pro-Rata Basis",
      inputName: "proRataBasis",
      type: "select",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      validation: false,
    },
    {
      labelName: "Interest charge Schedule",
      inputName: "interestChargeSchedule",
      type: "select",
      options: [
        { value: "Flat", label: "Flat" },
        { value: "Reducing", label: "Reducing" },
      ],
      validation: false,
    },
    {
      labelName: "Principal charge Schedule",
      inputName: "principalChargeSchedule",
      type: "select",
      options: [
        { value: "Equal", label: "Equal" },
        { value: "Balloon", label: "Balloon" },
      ],
      validation: false,
    },
    {
      labelName: "Balloon Repayment Amount",
      inputName: "balloonRepaymentAmount",
      type: "number",
      validation: false,
    },
    {
      labelName: "Move First Repayment Days",
      inputName: "moveFirstRepaymentDays",
      type: "number",
      validation: false,
    },
  ];

  const automatedPaymentsConfig = [
    {
      labelName: "Add Automatic Payments?",
      inputName: "automaticPayments",
      type: "select",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      validation: false,
    },
    {
      labelName: "Post Automatic Payments Between",
      inputName: "timeToPostBetween",
      type: "select",
      options: [
        { value: "Morning", label: "Morning (6AM-12PM)" },
        { value: "Afternoon", label: "Afternoon (12PM-6PM)" },
      ],
      validation: false,
    },
    {
      labelName: "Cash or Bank?",
      inputName: "cashOrBank",
      type: "select",
      options: [
        { value: "Cash", label: "Cash" },
        { value: "Bank", label: "Bank" },
      ],
      validation: false,
    },
  ];

  const extendLoanConfig = [
    {
      labelName: "Extend Loan After Maturity",
      inputName: "extendLoanAfterMaturity",
      type: "select",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      validation: false,
    },
    {
      labelName: "Interest Type",
      inputName: "extendLoanInterestType",
      type: "select",
      options: [
        { value: "Fixed", label: "Fixed" },
        { value: "Variable", label: "Variable" },
      ],
      validation: false,
    },
    {
      labelName: "Calculate Interest on",
      inputName: "calculateInterestOn",
      type: "select",
      options: [
        { value: "Principal", label: "Principal" },
        { value: "Outstanding", label: "Outstanding" },
      ],
      validation: false,
    },
    {
      labelName: "Loan Interest Rate After Maturity %",
      inputName: "loanInterestRateAfterMaturity",
      type: "text",
      validation: false,
    },
    {
      labelName: "Recurring Period After Maturity",
      inputName: "recurringPeriodAfterMaturity",
      type: "text",
      validation: false,
    },
    {
      labelName: "Per",
      inputName: "per",
      type: "select",
      options: [
        { value: "Month", label: "Month" },
        { value: "Year", label: "Year" },
      ],
      validation: false,
    },
    {
      labelName: "Include Fees After Maturity",
      inputName: "includeFeesAfterMaturity",
      type: "select",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      validation: false,
    },
    {
      labelName: "Loan status Past Maturity",
      inputName: "loanStatusPastMaturity",
      type: "select",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      validation: false,
    },
    {
      labelName: "Apply to the date (Optional)",
      inputName: "applyToDate",
      type: "text",
      validation: false,
    },
    {
      labelName: "Loan Status",
      inputName: "loanStatus",
      type: "select",
      options: [
        { value: "Active", label: "Active" },
        { value: "Past Due", label: "Past Due" },
        { value: "Closed", label: "Closed" },
      ],
      validation: false,
    },
    {
      labelName: "Select Guarantors",
      inputName: "selectGuarantors",
      type: "text",
      validation: false,
    },
    {
      labelName: "Loan Title",
      inputName: "loanTitle",
      type: "text",
      validation: false,
    },
    {
      labelName: "Description",
      inputName: "description",
      type: "textarea",
      rowCount: 3,
      validation: false,
    },
    {
      labelName: "Loan Files",
      inputName: "loanFiles",
      type: "file",
      accept: ".jpg,.png",
      placeholder: "Click or drag to upload",
      validation: false,
    },
  ];

  const validationError = useSelector(
    (state) => state.validation.validationError
  );

  const generalDetailsInputNames = generalDetailsConfig.map(
    (field) => field.inputName
  );
  const advanceSettingsInputNames = advanceSettingsConfig.map(
    (field) => field.inputName
  );
  const automatedPaymentsInputNames = automatedPaymentsConfig.map(
    (field) => field.inputName
  );
  const extendLoanInputNames = extendLoanConfig.map((field) => field.inputName);

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
                placeHolder={`Enter ${field.labelName}`}
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
                onChange={(e) => handleFileChange(e, sectionName)}
                accept={field.accept || "*"}
                isValidation={field.validation || false}
              />
            );
          case "textarea":
            return (
              <InputTextArea
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
                onChange={(e) => handleFileChange(e, sectionName)}
                rowCount={field.rowCount || 3}
                isValidation={field.validation || false}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );

  // Dedicated UI Components
  const generalDetails = (generalDetails) =>
    renderDetails(generalDetails, generalDetailsConfig, "generalDetails");

  const advanceSettings = (advanceSettings) =>
    renderDetails(advanceSettings, advanceSettingsConfig, "advanceSettings");

  const automatedPayments = (automatedPayments) =>
    renderDetails(
      automatedPayments,
      automatedPaymentsConfig,
      "automatedPayments"
    );

  const extendLoan = (extendLoan) =>
    renderDetails(extendLoan, extendLoanConfig, "extendLoan");

  // Validation Checks
  const isValidationFailed = (errors, fields) => {
    // Iterate over fields and check if any corresponding error is true
    return fields.some((field) => errors[field] === true);
  };

  return (
    <>
      <Accordion
        heading={"General Loan Details"}
        renderExpandedContent={() => generalDetails(addLoanData.generalDetails)}
        isOpen={true}
        error={isValidationFailed(validationError, generalDetailsInputNames)}
      />
      {/* <Accordion
        heading={"Advance Settings (optional)"}
        renderExpandedContent={() =>
          advanceSettings(addLoanData.advanceSettings)
        }
        error={isValidationFailed(validationError, advanceSettingsInputNames)}
      />
      <Accordion
        heading={"Automated Payments (optional)"}
        renderExpandedContent={() =>
          automatedPayments(addLoanData.automatedPayments)
        }
        error={isValidationFailed(validationError, automatedPaymentsInputNames)}
      />
      <Accordion
        heading={"Extend Loan After Maturity Until Fully Paid (optional)"}
        renderExpandedContent={() => extendLoan(addLoanData.extendLoan)}
        error={isValidationFailed(validationError, extendLoanInputNames)}
      /> */}
    </>
  );
};

export default AddLoanFields;
