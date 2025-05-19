import React, { useEffect, useMemo, useState } from "react";
import Accordion from "../../Common/Accordion/Accordion";
import {
  deleteDocumentFile,
  updateLoanField,
  uploadDocumentFile,
} from "../../../redux/Slices/smeLoansSlice";
import { useDispatch, useSelector } from "react-redux";
import { sectorOptions, lhaBranchOptions } from "../../../data/OptionsData";
import { yesNoOptions,verificationStatus, inspectionTypeOptions, overallStatusOptions } from "../../../data/LosData";
import DocumentUploaderVerifier from "../../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import DynamicForm from "../../Common/DynamicForm/DynamicForm";
import { isValidationFailed } from "../../../utils/isValidationFailed";

const InspectionVerificationFields = ({ inspectionVerification }) => {
  const dispatch = useDispatch();
  const { loanProductOptions, loanProductData } = useSelector(
    (state) => state.smeLoans
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

  const handleInputChange = (e, section, index) => {
    const { name, value, type, checked } = e.target;

    if (name === "repaymentTenureStr") {
      const [repaymentTenure, repaymentTenureType] = value.split(" "); // Extract number & type
      dispatch(
        updateLoanField({
          section: "generalLoanDetails",
          field: "repaymentTenure",
          value: repaymentTenure ? parseInt(repaymentTenure, 10) : null, // Convert to number
        })
      );
      dispatch(
        updateLoanField({
          section: "generalLoanDetails",
          field: "repaymentTenureType",
          value: repaymentTenureType || "",
        })
      );
    }

    dispatch(
      updateLoanField({ section, field: name, value, type, checked, index })
    );
  };

  const handleFileChange = (e, section, index) => {
    const fileUploadParams = {
      loanApplicationId: inspectionVerification.loanApplicationId,
      documentKey: inspectionVerification.documents[index].documentKey,
      verified: inspectionVerification.documents[index].verified,
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
    }
  ];

  const validationError = useSelector((state) => state.validation.validationError);

  const handleDeleteDocument = (docId) => {
    if (!docId) return;
    const fileDeleteParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    dispatch(deleteDocumentFile(fileDeleteParams));
  };

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

  return (
    <>
      <Accordion
        heading={"Inspection Basics"}
        renderExpandedContent={() =>
          <DynamicForm
            details={inspectionVerification.inspectionBasics}
            config={inspectionBasicsConfig}
            sectionName={"inspectionBasics"}
            handleInputChange={handleInputChange}
          />
        }
        isOpen={true}
        error={isValidationFailed(
          validationError,
          inspectionBasicsConfig
        )}
      />
     
      <Accordion
        heading={"Required Documents"}
        renderExpandedContent={() => requiredDocuments(inspectionVerification.documents)}
      />
      <div className="flex justify-between shadow bg-gray-50 border text-gray-600 rounded py-2 text-sm px-5">
        <div>{`${uploadedCount} of ${inspectionVerification.documents.length} documents uploaded`}</div>
        <div>{`${verifiedCount} documents verified`}</div>
      </div>
    </>
  );
};

export default InspectionVerificationFields;
