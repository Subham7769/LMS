import React from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputCheckbox from "../../Common/InputCheckbox/InputCheckbox";
import InputFile from "../../Common/InputFile/InputFile"; // Assuming InputFile component for file upload
import InputTextArea from "../../Common/InputTextArea/InputTextArea"; // Assuming InputFile component for file upload
import Accordion from "../../Common/Accordion/Accordion";
import {
  deleteDocumentFile,
  updateLoanField,
  uploadDocumentFile,
} from "../../../redux/Slices/personalLoansSlice";
import { useDispatch, useSelector } from "react-redux";
import { tenureTypeOptions } from "../../../data/OptionsData";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import DocumentUploaderVerifier from "../../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";

const AddLoanFields = ({ addLoanData }) => {
  const dispatch = useDispatch();
  const { loanProductOptions } = useSelector((state) => state.personalLoans);

  // Helper to calculate uploaded and verified documents
  const calculateDocumentStats = () => {
    let uploadedCount = 0;
    let verifiedCount = 0;

    // Loop through the documents array
    addLoanData.documents.forEach((document) => {
      // Check if docName is not empty for uploaded count
      if (document.docName) {
        uploadedCount++;
      }

      // Check if verified is true for verified count
      if (document.verified === true) {
        verifiedCount++;
      }
    });

    return { uploadedCount, verifiedCount };
  };

  const { uploadedCount, verifiedCount } = calculateDocumentStats();

  const handleInputChange = (e, section, index) => {
    const { name, value, type, checked } = e.target;
    // Use section to update the correct part of the state
    dispatch(
      updateLoanField({ section, field: name, value, type, checked, index })
    );
  };

  const handleFileChange = (e, section, index) => {
    const fileUploadParams = {
      loanApplicationId: addLoanData.loanApplicationId,
      documentKey: addLoanData.documents[index].documentKey,
      verified: addLoanData.documents[index].verified,
      borrowerType: "PERSONAL_BORROWER",
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };

    const { name, value, type, checked, files } = e.target;

    dispatch(
      updateLoanField({ section, field: name, value, type, checked, index })
    );

    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);

      // Dispatch the upload action with the FormData
      // console.log(fileUploadParams);
      dispatch(uploadDocumentFile({ formData, fileUploadParams }));
    }
  };

  // All Fields Configuration
  const generalLoanDetailsConfig = [
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
      type: "number",
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

  const validationError = useSelector(
    (state) => state.validation.validationError
  );

  const generalLoanDetailsInputNames = generalLoanDetailsConfig.map(
    (field) => field.inputName
  );

  const renderDetails = (details, config, sectionName) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {config.map((field, index) => {
        const value = details[field.inputName] ?? ""; // Fallback to empty string
        switch (field.type) {
          case "text":
            return (
              <InputText
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={value}
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
                inputValue={value}
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
                inputValue={value}
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
                  inputValue={value}
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
                inputValue={value}
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
                inputValue={value}
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
                inputValue={value}
                onChange={(e) => handleInputChange(e, sectionName)}
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
  const generalLoanDetails = (generalLoanDetails) =>
    renderDetails(
      generalLoanDetails,
      generalLoanDetailsConfig,
      "generalLoanDetails"
    );

  // console.log(addLoanData);

  const handleDeleteDocument = (docId) => {
    if (!docId) return;
    const fileDeleteParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    dispatch(deleteDocumentFile(fileDeleteParams));
  };

  const requirements = (documents) => {
    return (
      <>
        <DocumentUploaderVerifier
          label="Payslips"
          inputFileName="docName"
          inputFileValue={documents[0]?.docName}
          onFileChange={(e) => handleFileChange(e, "documents", 0)}
          onFileDelete={() => handleDeleteDocument(documents[0]?.docId)}
          checkboxName="verified"
          checkboxChecked={documents[0]?.verified}
          onCheckboxChange={(e) => handleInputChange(e, "documents", 0)}
        />
        <DocumentUploaderVerifier
          label="Employer Pre-approval Form"
          inputFileName="docName"
          inputFileValue={documents[1]?.docName}
          onFileChange={(e) => handleFileChange(e, "documents", 1)}
          onFileDelete={() => handleDeleteDocument(documents[1]?.docId)}
          checkboxName="verified"
          checkboxChecked={documents[1]?.verified}
          onCheckboxChange={(e) => handleInputChange(e, "documents", 1)}
        />
        <DocumentUploaderVerifier
          label="Bank Statement"
          inputFileName="docName"
          inputFileValue={documents[2]?.docName}
          onFileChange={(e) => handleFileChange(e, "documents", 2)}
          onFileDelete={() => handleDeleteDocument(documents[2]?.docId)}
          checkboxName="verified"
          checkboxChecked={documents[2]?.verified}
          onCheckboxChange={(e) => handleInputChange(e, "documents", 2)}
        />
        <div className="flex justify-between items-center">
          <div>ATM Card</div>
          <div className="flex gap-x-5 items-baseline">
            <CreditCardIcon className="h-5 w-5" aria-hidden="true" />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={documents[3]?.verified}
                onChange={(e) => handleInputChange(e, "documents", 3)}
                inputName="verified"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  // Validation Checks
  const isValidationFailed = (errors, fields) => {
    // Iterate over fields and check if any corresponding error is true
    return fields.some((field) => errors[field] === true);
  };

  return (
    <>
      <Accordion
        heading={"General Loan Details"}
        renderExpandedContent={() =>
          generalLoanDetails(addLoanData?.generalLoanDetails)
        }
        isOpen={true}
        error={isValidationFailed(
          validationError,
          generalLoanDetailsInputNames
        )}
      />
      <Accordion
        heading={"Requirement"}
        renderExpandedContent={() => requirements(addLoanData.documents)}
      />
      <div className="flex justify-between shadow bg-gray-50 border text-gray-600 rounded py-2 text-sm px-5">
        <div>{`${uploadedCount} of 3 documents uploaded`}</div>
        <div>{`${verifiedCount} documents verified`}</div>
      </div>
    </>
  );
};

export default AddLoanFields;
