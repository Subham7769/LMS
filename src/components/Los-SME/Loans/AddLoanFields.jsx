import React from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputEmail from "../../Common/InputEmail/InputEmail";
import InputFile from "../../Common/InputFile/InputFile"; // Assuming InputFile component for file upload
import InputTextArea from "../../Common/InputTextArea/InputTextArea"; // Assuming InputFile component for file upload
import Accordion from "../../Common/Accordion/Accordion";
import {
  deleteDocumentFile,
  updateLoanField,
  uploadDocumentFile,
} from "../../../redux/Slices/smeLoansSlice";
import { useDispatch, useSelector } from "react-redux";
import { tenureTypeOptions, sectorOptions } from "../../../data/OptionsData";
import DocumentUploaderVerifier from "../../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";
import convertToTitleCase from "../../../utils/convertToTitleCase";

const AddLoanFields = ({ addLoanData }) => {
  const dispatch = useDispatch();
  const { loanProductOptions } = useSelector((state) => state.smeLoans);

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
      borrowerType: "COMPANY_BORROWER",
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

  const getTwoDaysFromNow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2); // Add 2 days
    return date.toISOString().split("T")[0]; // Format as yyyy-MM-dd
  };

  const getTodayDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0]; // Format as yyyy-MM-dd
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
      labelName: "Borrower Unique ID",
      inputName: "borrowerId",
      type: "text",
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
      labelName: "Number of Tenure",
      inputName: "numberOfTenure",
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
      labelName: "Sector",
      inputName: "sector",
      type: "select",
      options: sectorOptions,
      validation: false,
    },
    {
      labelName: "Refinanced Loan ID",
      inputName: "refinancedLoanId",
      type: "text",
      validation: false,
    },
    {
      labelName: "Branch",
      inputName: "branch",
      type: "text",
      validation: false,
    },
    {
      labelName: "Agent Name",
      inputName: "agentName",
      type: "text",
      validation: false,
    },
    // {
    //   labelName: "CO Name",
    //   inputName: "lhacoName",
    //   type: "text",
    //   validation: false,
    // },
  ];

  const proformaDetailsConfig = [
    {
      labelName: "Order No. ",
      inputName: "orderNo",
      type: "number",
      validation: false,
    },
    {
      labelName: "Order Date",
      inputName: "orderDate",
      type: "date",
      validation: false,
    },
    {
      labelName: "Amount of Order",
      inputName: "amountOfOrder",
      type: "number",
      validation: false,
    },
    {
      labelName: "Order Expiry Date",
      inputName: "orderExpiryDate",
      type: "date",
      validation: false,
      minSelectableDate: getTwoDaysFromNow(),
    },
    {
      labelName: "Proforma Invoice No.",
      inputName: "proformaInvoiceNo",
      type: "number",
      validation: false,
    },
    {
      labelName: "Proforma Invoice Date",
      inputName: "proformaInvoiceDate",
      type: "date",
      validation: false,
      maxSelectableDate: getTodayDate(),
    },
    {
      labelName: "Amount of Proforma",
      inputName: "amountOfProforma",
      type: "number",
      validation: false,
    },
    {
      labelName: "Proforma Expected date of payment",
      inputName: "proformaExpectedDateOfPayment",
      type: "date",
      validation: false,
    },
    {
      labelName: "Invoice No",
      inputName: "invoiceNo",
      type: "number",
      validation: false,
    },
    {
      labelName: "Invoice Date ",
      inputName: "invoiceDate",
      type: "date",
      validation: false,
      maxSelectableDate: getTodayDate(),
    },
    {
      labelName: "Amount of Invoice",
      inputName: "amountOfInvoice",
      type: "number",
      validation: false,
    },
    {
      labelName: "Invoice Expected date of payment ",
      inputName: "invoiceExpectedDateOfPayment",
      type: "date",
      validation: false,
    },
  ];

  const offTakerConfig = [
    {
      labelName: "Name of Company",
      inputName: "nameOfCompany",
      type: "text",
      validation: false,
    },
    {
      labelName: "Industry",
      inputName: "industry",
      type: "text",
      validation: false,
    },
    {
      labelName: "Nature of Business",
      inputName: "natureOfBusiness",
      type: "text",
      validation: false,
    },
    {
      labelName: "Location (Town/City)",
      inputName: "location",
      type: "text",
      validation: false,
    },
    {
      labelName: "Province",
      inputName: "province",
      type: "text",
      validation: false,
    },
    {
      labelName: "Country",
      inputName: "country",
      type: "text",
      validation: false,
    },
    {
      labelName: "Contact Person (full name)",
      inputName: "contactperson",
      type: "text",
      validation: false,
    },
    {
      labelName: "Position",
      inputName: "position",
      type: "text",
      validation: false,
    },
    {
      labelName: "Cell phone number",
      inputName: "cellPhoneNumber",
      type: "number",
      validation: false,
    },
  ];

  const supplierDetailsConfig = [
    {
      labelName: "Name of Company",
      inputName: "nameOfCompany",
      type: "text",
      validation: false,
    },
    {
      labelName: "Industry",
      inputName: "industry",
      type: "text",
      validation: false,
    },
    {
      labelName: "Nature of Business",
      inputName: "natureOfBusiness",
      type: "text",
      validation: false,
    },
    {
      labelName: "Location (Town/City)",
      inputName: "location",
      type: "text",
      validation: false,
    },
    {
      labelName: "Province",
      inputName: "province",
      type: "text",
      validation: false,
    },
    {
      labelName: "Country",
      inputName: "country",
      type: "text",
      validation: false,
    },
    {
      labelName: "Contact Person (full name)",
      inputName: "contactperson",
      type: "text",
      validation: false,
    },
    {
      labelName: "Position",
      inputName: "position",
      type: "text",
      validation: false,
    },
    {
      labelName: "Cell phone number",
      inputName: "cellPhoneNumber",
      type: "number",
      validation: false,
    },
    {
      labelName: "Postal Address",
      inputName: "postalAddress",
      type: "number",
      validation: false,
    },
    {
      labelName: "Physical Address",
      inputName: "physicalAddress",
      type: "text",
      validation: false,
    },
    {
      labelName: "Email Address",
      inputName: "emailAddress",
      type: "email",
      validation: false,
    },
    {
      labelName: "Phone Number",
      inputName: "phoneNumber",
      type: "number",
      validation: false,
    },
  ];

  const collateralDetailsConfig = [
    {
      labelName: "Collateral Type",
      inputName: "collateralType",
      type: "text",
      validation: false,
    },
    {
      labelName: "Market Value",
      inputName: "marketValue",
      type: "number",
      validation: false,
    },
    {
      labelName: "Last Valution Date",
      inputName: "lastValuationDate",
      type: "date",
      validation: false,
    },
    {
      labelName: "Insurance Status",
      inputName: "insuranceStatus",
      type: "text",
      validation: false,
    },
    {
      labelName: "Insurance Expiry Date",
      inputName: "insuranceExpiryDate",
      type: "date",
      validation: false,
    },
    {
      labelName: "Location Of Collateral",
      inputName: "locationOfCollateral",
      type: "text",
      validation: false,
    },
    {
      labelName: "Contact Person (full name)",
      inputName: "contactPerson",
      type: "text",
      validation: false,
    },
    {
      labelName: "Plot Vehicle No",
      inputName: "plotVehicleNo",
      type: "number",
      validation: false,
    },
    {
      labelName: "State Of Collateral",
      inputName: "stateOfCollateral",
      type: "text",
      validation: false,
    },
  ];

  const lhaDetailsConfig = [
    {
      labelName: "Loan Officer Findings",
      inputName: "loanOfficerFindings",
      type: "text",
      validation: false,
    },
    {
      labelName: "Business",
      inputName: "business",
      type: "text",
      validation: false,
    },
    {
      labelName: "Office",
      inputName: "office",
      type: "text",
      validation: false,
    },
    {
      labelName: "Business Operations",
      inputName: "businessOperations",
      type: "text",
      validation: false,
    },
    {
      labelName: "Collateral search results and other details",
      inputName: "otherDetails",
      type: "textarea",
      validation: false,
    },
    {
      labelName: "Other Comments",
      inputName: "otherComments",
      type: "textarea",
      validation: false,
    },
  ];

  const validationError = useSelector(
    (state) => state.validation.validationError
  );

  const generalLoanDetailsInputNames = generalLoanDetailsConfig.map(
    (field) => field.inputName
  );
  const proformaDetailsInputNames = proformaDetailsConfig.map(
    (field) => field.inputName
  );
  const offTakerInputNames = offTakerConfig.map((field) => field.inputName);
  const supplierDetailsInputNames = supplierDetailsConfig.map(
    (field) => field.inputName
  );
  const collateralDetailsInputNames = collateralDetailsConfig.map(
    (field) => field.inputName
  );
  const lhaDetailsInputNames = lhaDetailsConfig.map((field) => field.inputName);

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

  const proformaDetails = (proformaDetails) =>
    renderDetails(proformaDetails, proformaDetailsConfig, "proformaDetails");

  const offTakerDetails = (offTakerDetails) =>
    renderDetails(offTakerDetails, offTakerConfig, "offTakerDetails");

  const supplierDetails = (supplierDetails) =>
    renderDetails(supplierDetails, supplierDetailsConfig, "supplierDetails");

  const collateralDetails = (collateralDetails) =>
    renderDetails(
      collateralDetails,
      collateralDetailsConfig,
      "collateralDetails"
    );

  const lhaDetails = (lhaDetails) =>
    renderDetails(lhaDetails, lhaDetailsConfig, "lhaDetails");

  const handleDeleteDocument = (docId) => {
    if (!docId) return;
    const fileDeleteParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    dispatch(deleteDocumentFile(fileDeleteParams));
  };

  console.log(addLoanData);

  const requiredDocuments = (documents) => {
    return documents.map((document, index) => (
      <React.Fragment key={document.documentKey}>
        <DocumentUploaderVerifier
          label={convertToTitleCase(document.documentKey)}
          inputFileName="docName"
          inputFileValue={documents[index]?.docName}
          onFileChange={(e) => handleFileChange(e, "documents", index)}
          onFileDelete={() => handleDeleteDocument(documents[index]?.docId)}
          checkboxName="verified"
          checkboxChecked={documents[index]?.verified}
          onCheckboxChange={(e) => handleInputChange(e, "documents", index)}
        />
      </React.Fragment>
    ));
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
        heading={"Profoma Details"}
        renderExpandedContent={() =>
          proformaDetails(addLoanData?.proformaDetails)
        }
        error={isValidationFailed(validationError, proformaDetailsInputNames)}
      />
      <Accordion
        heading={"Off-Taker Details"}
        subHeading="(applicable to IDF and POF)"
        renderExpandedContent={() =>
          offTakerDetails(addLoanData.offTakerDetails)
        }
        error={isValidationFailed(validationError, offTakerInputNames)}
      />
      <Accordion
        heading={"Supplier Details"}
        subHeading="(Not applicable to IDF)"
        renderExpandedContent={() =>
          supplierDetails(addLoanData.supplierDetails)
        }
        error={isValidationFailed(validationError, supplierDetailsInputNames)}
      />
      <Accordion
        heading={"Collateral Details"}
        renderExpandedContent={() =>
          collateralDetails(addLoanData.collateralDetails)
        }
        error={isValidationFailed(validationError, collateralDetailsInputNames)}
      />
      <Accordion
        heading={"Loan Officer's Findings"}
        renderExpandedContent={() => lhaDetails(addLoanData.lhaDetails)}
        error={isValidationFailed(validationError, lhaDetailsInputNames)}
      />
      <Accordion
        heading={"Required Documents"}
        renderExpandedContent={() => requiredDocuments(addLoanData.documents)}
      />
      <div className="flex justify-between shadow bg-gray-50 border text-gray-600 rounded py-2 text-sm px-5">
        <div>{`${uploadedCount} of 8 documents uploaded`}</div>
        <div>{`${verifiedCount} documents verified`}</div>
      </div>
    </>
  );
};

export default AddLoanFields;
