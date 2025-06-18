import React, { useEffect, useMemo, useState } from "react";
import Accordion from "../Common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { sectorOptions, lhaBranchOptions } from "../../data/OptionsData";
import {
  yesNoOptions,
  verificationStatus,
  inspectionTypeOptions,
  overallStatusOptions,
  overallConditionOptions,
  usageLevelOptions,
} from "../../data/LosData";
import DocumentUploaderVerifier from "../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";
import convertToTitleCase from "../../utils/convertToTitleCase";
import DynamicForm from "../Common/DynamicForm/DynamicForm";
import { isValidationFailed } from "../../utils/isValidationFailed";
import { currencyOptions } from "../../data/CountryData";

const InspectionVerificationFields = ({
  inspectionVerification,
  handleFileReset,
  handleFileUpload,
  handleChangeReducer,
}) => {
  const dispatch = useDispatch();
  const { loanProductOptions, loanProductData } = useSelector(
    (state) => state.southAfricaSmeLoans
  );
  // Helper to calculate uploaded and verified documents
  const calculateDocumentStats = () => {
    let uploadedCount = 0;
    let verifiedCount = 0;

    // Loop through the documents array
    inspectionVerification.documents.forEach((document) => {
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

  // All Fields Configuration
  const inspectionBasicsConfig = [
    {
      labelName: "Loan Application ID",
      inputName: "loanApplicationId",
      type: "text",
      disabled: true,
      validation: false,
    },
    {
      labelName: "Inspection Type",
      inputName: "inspectionType",
      type: "select",
      options: inspectionTypeOptions,
      validation: false,
      searchable: false,
    },
    {
      labelName: "Inspection Date",
      inputName: "inspectionDate",
      type: "date",
      validation: false,
    },
    {
      labelName: "Inspector",
      inputName: "inspector",
      type: "text",
      validation: false,
    },
    {
      labelName: "Overall Status",
      inputName: "overallStatus",
      type: "select",
      options: overallStatusOptions,
      validation: false,
      searchable: false,
    },
  ];

  const equipmentIdentificationConfig = [
    {
      labelName: "Make/Model Verification",
      type: "select",
      inputName: "makeModelVerified",
      options: yesNoOptions,
    },
    {
      labelName: "Serial Number/VIN",
      type: "text",
      inputName: "serialNumber",
      placeholder: "Enter Serial Number or VIN",
    },
    {
      labelName: "Serial Number Matches Application",
      type: "select",
      inputName: "serialNumberMatches",
      options: yesNoOptions,
    },
    {
      labelName: "Year of Manufacture",
      type: "text",
      inputName: "yearOfManufacture",
      placeholder: "Enter Year of Manufacture",
    },
    {
      labelName: "Equipment Photo",
      inputName: "equipmentPhoto",
      type: "file",
      validation: false,
      accept: "image/*",
    },
  ];

  const conditionAssessmentConfig = [
    {
      labelName: "Overall Condition Rating",
      inputName: "overallConditionRating",
      validation: false,
      type: "rangeCondition",
      inputLevels: ["Poor", "Fair", "Good", "Excellent"],
    },
    {
      labelName: "Hour Meter/Odometer Reading",
      inputName: "hourMeterReading",
      type: "text",
      validation: false,
    },
    {
      labelName: "Usage Level Assessment",
      inputName: "usageLevelAssessment",
      type: "select",
      options: usageLevelOptions,
      validation: false,
    },
    {
      labelName: "Hour Meter Photo",
      inputName: "hourMeterPhoto",
      type: "file",
      validation: false,
      accept: "image/*",
    },
  ];

  const keySystemsCheckConfig = [
    {
      type: "rangeCondition",
      labelName: "Engine Condition",
      inputName: "engineCondition",
      inputLevels: ["1", "2", "3", "4", "5"],
      validation: false,
    },
    {
      type: "rangeCondition",
      labelName: "Hydraulic System",
      inputName: "hydraulicSystem",
      inputLevels: ["1", "2", "3", "4", "5"],
      validation: false,
    },
    {
      type: "rangeCondition",
      labelName: "Electrical Systems",
      inputName: "electricalSystems",
      inputLevels: ["1", "2", "3", "4", "5"],
      validation: false,
    },
    {
      type: "rangeCondition",
      labelName: "Structural Integrity",
      inputName: "structuralIntegrity",
      inputLevels: ["1", "2", "3", "4", "5"],
      validation: false,
    },
    {
      type: "rangeCondition",
      labelName: "Attachments Condition",
      inputName: "attachmentsCondition",
      inputLevels: ["1", "2", "3", "4", "5"],
      validation: false,
    },
  ];

  const operationalVerificationConfig = [
    {
      labelName: "Start-up Test Performed",
      inputName: "startupTestPerformed",
      type: "select",
      options: yesNoOptions,
      validation: true,
    },
    {
      labelName: "Equipment Fully Operational",
      inputName: "equipmentFullyOperational",
      type: "select",
      options: yesNoOptions,
      validation: true,
    },
    {
      labelName: "Any Unusual Noises/Vibrations",
      inputName: "unusualNoisesVibrations",
      type: "select",
      options: yesNoOptions,
      validation: true,
    },
    {
      labelName: "Operational Test Video",
      inputName: "operationalTestVideo",
      type: "file", // Optional upload
      validation: false,
    },
  ];

  const valueImpactFactorsConfig = [
    {
      labelName: "Verified Equipment Value",
      inputName: "verifiedEquipmentValue",
      type: "select",
      options: currencyOptions,
      validation: true,
    },
    {
      labelName: "Value Variance from Application",
      inputName: "valueVariancePercentage",
      type: "text",
      validation: false,
    },
    {
      labelName: "Critical Issues Identified",
      inputName: "criticalIssuesIdentified",
      type: "select",
      options: yesNoOptions,
      validation: false,
    },
    {
      labelName: "Critical Issues Description",
      inputName: "criticalIssuesDescription",
      type: "textarea",
      conditionalField: "criticalIssuesIdentified", // show only when true
      validation: false,
    },
  ];

  const documentationCheckConfig = [
    {
      labelName: "Title/Ownership Verification",
      inputName: "titleOwnershipVerified",
      type: "select",
      options: yesNoOptions,
      validation: false,
    },
    {
      labelName: "Warranty Documentation",
      inputName: "warrantyDocumentationAvailable",
      type: "select",
      options: yesNoOptions,
      validation: false,
    },
    {
      labelName: "Insurance Requirements Met",
      inputName: "insuranceRequirementsMet",
      type: "select",
      options: yesNoOptions,
      validation: false,
    },
  ];

  const verificationOutcomeConfig = [
    {
      labelName: "Funding Recommendation",
      inputName: "fundingRecommendation",
      type: "select",
      options: [
        { label: "Approve", value: "approve" },
        { label: "Conditional", value: "conditional" },
        { label: "Decline", value: "decline" },
      ],
      validation: false,
    },
    {
      labelName: "Condition Requirements",
      inputName: "conditionRequirements",
      type: "textarea",
      validation: false,
    },
    {
      labelName: "Inspector Comments",
      inputName: "inspectorComments",
      type: "textarea",
      validation: false,
    },
    {
      labelName: "Digital Signature",
      inputName: "digitalSignature",
      type: "textarea",
      validation: true,
    },
  ];

  const validationError = useSelector(
    (state) => state.validation.validationError
  );

  const requiredDocuments = (documents) => {
    console.log(documents);
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

  const handleInputChange = (e, section, index) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      handleChangeReducer({ section, field: name, value, type, checked, index })
    );
  };

  const handleFileChange = (e, section, index) => {
    const fileUploadParams = {
      loanApplicationId:
        inspectionVerification.inspectionBasics.loanApplicationId,
      documentKey: inspectionVerification.documents[index].documentKey,
      verified: inspectionVerification.documents[index].verified,
      borrowerType: "COMPANY_BORROWER",
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };

    const { name, value, type, checked, files } = e.target;

    dispatch(
      handleChangeReducer({ section, field: name, value, type, checked, index })
    );

    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);

      // Dispatch the upload action with the FormData
      // console.log(fileUploadParams);
      // dispatch(uploadInspectionVerificationDocumentFile({ formData, fileUploadParams }));
    }
  };

  const handleDeleteDocument = (docId) => {
    if (!docId) return;
    const fileDeleteParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    // dispatch(deleteDocumentFile(fileDeleteParams));
  };

  const handleFileUploads = (e) => {
    const { files } = e.target;

    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);

      // Dispatch the upload action with the FormData
      // dispatch(
      //   handleFileUpload({
      //     formData,
      //     authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
      //   })
      // );
    }
  };

  const handleFileRemove = (section) => {
    console.log("customerPhotoId remove");
    // dispatch(
    //   handleFileReset({
    //     section,
    //     field: "customerPhotoId",
    //     value: "",
    //     type: "file",
    //   })
    // );
  };

  return (
    <>
      <Accordion
        heading={"Inspection Basics"}
        renderExpandedContent={() => (
          <DynamicForm
            details={inspectionVerification.inspectionBasics}
            config={inspectionBasicsConfig}
            sectionName={"inspectionBasics"}
            handleInputChange={handleInputChange}
          />
        )}
        isOpen={true}
        error={isValidationFailed(validationError, inspectionBasicsConfig)}
      />

      <Accordion
        heading={"Equipment Identification"}
        renderExpandedContent={() => (
          <DynamicForm
            details={inspectionVerification.equipmentIdentification}
            config={equipmentIdentificationConfig}
            sectionName={"equipmentIdentification"}
            handleInputChange={handleInputChange}
            handleFileUploads={handleFileUploads}
            handleFileRemove={handleFileRemove}
          />
        )}
        isOpen={false}
        error={isValidationFailed(validationError, inspectionBasicsConfig)}
      />

      <Accordion
        heading={"Condition Assessment"}
        renderExpandedContent={() => (
          <DynamicForm
            details={inspectionVerification.conditionAssessment}
            config={conditionAssessmentConfig}
            sectionName={"conditionAssessment"}
            handleInputChange={handleInputChange}
            handleFileUploads={handleFileUploads}
            handleFileRemove={handleFileRemove}
          />
        )}
        isOpen={false}
        error={isValidationFailed(validationError, inspectionBasicsConfig)}
      />

      <Accordion
        heading={"Key Systems Check"}
        renderExpandedContent={() => (
          <DynamicForm
            details={inspectionVerification.keySystemsCheck}
            config={keySystemsCheckConfig}
            sectionName={"keySystemsCheck"}
            handleInputChange={handleInputChange}
          />
        )}
        isOpen={false}
        error={isValidationFailed(validationError, inspectionBasicsConfig)}
      />
      <Accordion
        heading={"Operational Verification"}
        renderExpandedContent={() => (
          <DynamicForm
            details={inspectionVerification.operationalVerification}
            config={operationalVerificationConfig}
            sectionName={"operationalVerification"}
            handleInputChange={handleInputChange}
            handleFileUploads={handleFileUploads}
            handleFileRemove={handleFileRemove}
          />
        )}
        isOpen={false}
        error={isValidationFailed(validationError, inspectionBasicsConfig)}
      />
      <Accordion
        heading={"Value Impact Factors"}
        renderExpandedContent={() => (
          <DynamicForm
            details={inspectionVerification.valueImpactFactors}
            config={valueImpactFactorsConfig}
            sectionName={"valueImpactFactors"}
            handleInputChange={handleInputChange}
          />
        )}
        isOpen={false}
        error={isValidationFailed(validationError, inspectionBasicsConfig)}
      />

      <Accordion
        heading={"Documentation Check"}
        renderExpandedContent={() => (
          <DynamicForm
            details={inspectionVerification.documentationCheck}
            config={documentationCheckConfig}
            sectionName={"documentationCheck"}
            handleInputChange={handleInputChange}
          />
        )}
        isOpen={false}
        error={isValidationFailed(validationError, inspectionBasicsConfig)}
      />

      <Accordion
        heading={"Verification Outcome"}
        renderExpandedContent={() => (
          <DynamicForm
            details={inspectionVerification.verificationOutcome}
            config={verificationOutcomeConfig}
            sectionName={"verificationOutcome"}
            handleInputChange={handleInputChange}
          />
        )}
        isOpen={false}
        error={isValidationFailed(validationError, inspectionBasicsConfig)}
      />

      <Accordion
        heading={"Required Documents"}
        renderExpandedContent={() =>
          requiredDocuments(inspectionVerification.documents)
        }
      />
      <div className="flex justify-between shadow bg-gray-50 border text-gray-600 rounded py-2 text-sm px-5">
        <div>{`${uploadedCount} of ${inspectionVerification.documents.length} documents uploaded`}</div>
        <div>{`${verifiedCount} documents verified`}</div>
      </div>
    </>
  );
};

export default InspectionVerificationFields;
