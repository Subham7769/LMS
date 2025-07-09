import React from "react";
import Accordion from "../../Common/Accordion/Accordion";
import {
  deleteDocumentFile,
  getDocsByIdnUsage,
  getRefundApplicationDetails,
  updateRefundField,
  uploadDocumentFile,
} from "../../../redux/Slices/personalRefundSlice";
import { useDispatch, useSelector } from "react-redux";
import DocumentUploaderVerifier from "../../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import DynamicForm from "../../Common/DynamicForm/DynamicForm";
import InputCheckbox from "../../Common/InputCheckbox/InputCheckbox";
import { isValidationFailed } from "../../../utils/isValidationFailed";
import { CreditCardIcon } from "@heroicons/react/24/outline";

const AddRefundFields = ({ refundData, openLoans }) => {
  const dispatch = useDispatch();

  // Helper to calculate uploaded and verified documents
  const calculateDocumentStats = () => {
    let uploadedCount = 0;
    let verifiedCount = 0;

    // Loop through the documents array
    refundData?.documents?.forEach((document) => {
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

  const handleInputChange = async (e, section, index) => {
    const { name, value, type, checked } = e.target;

    if (name === "loanId") {
      const [loanId, userId] = value.split("@");

      try {
        const result = await dispatch(
          getRefundApplicationDetails({ userId, loanId })
        ).unwrap();
        const dynamicRefundDocTempId = result?.dynamicRefundDocTempId;

        if (dynamicRefundDocTempId) {
          dispatch(
            getDocsByIdnUsage({
              dynamicDocumentTempId: dynamicRefundDocTempId,
              usage: "BORROWER_OFFERS",
            })
          );
        }
      } catch (error) {
        console.error("Failed to fetch refund application details", error);
      }
    }

    dispatch(
      updateRefundField({ section, field: name, value, type, checked, index })
    );
  };

  const handleFileChange = (e, section, index) => {
    const fileUploadParams = {
      refundApplicationId: refundData?.refundApplicationId,
      documentKey: refundData?.documents[index].documentKey,
      verified: refundData?.documents[index].verified,
      borrowerType: "PERSONAL_BORROWER",
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    // console.log(e.target);
    const { name, value, type, checked, files } = e.target;

    dispatch(
      updateRefundField({ section, field: name, value, type, checked, index })
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
  const refundDetailsConfig = [
    {
      labelName: "Loan ID",
      inputName: "loanId",
      type: "select",
      options: openLoans,
      validation: true,
      searchable: true,
    },
    {
      labelName: "Refund Amount",
      inputName: "refundAmount",
      type: "text",
      validation: true,
    },
    {
      labelName: "Related Pay slip month",
      inputName: "relatedPaySlipMonth",
      type: "text",
      validation: true,
    },
    {
      labelName: "Cause of Refund",
      inputName: "causeOfRefund",
      type: "text",
      validation: true,
    },
  ];

  const validationError = useSelector(
    (state) => state.validation.validationError
  );

  const handleDeleteDocument = (docId) => {
    if (!docId) return;
    const fileDeleteParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    dispatch(deleteDocumentFile(fileDeleteParams));
  };

  const requirements = (documents) => {
    return documents.map((document, index) => (
      <React.Fragment key={document.documentKey}>
        {document.documentKey === "ATM_CARD" ? (
          <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 mb-3 pb-3">
            <div>ATM Card</div>
            <div className="flex gap-x-5 items-baseline">
              <CreditCardIcon className="h-5 w-5" aria-hidden="true" />
              <div>
                <InputCheckbox
                  labelName={"Verified"}
                  inputChecked={documents[index]?.verified}
                  onChange={(e) => handleInputChange(e, "documents", index)}
                  inputName="verified"
                />
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </React.Fragment>
    ));
  };

  return (
    <>
      <Accordion
        heading={"Refund Details"}
        renderExpandedContent={() => (
          <DynamicForm
            details={refundData?.refundDetails}
            config={refundDetailsConfig}
            sectionName={"refundDetails"}
            handleInputChange={handleInputChange}
            columnsPerRow={3}
          />
        )}
        isOpen={true}
        error={isValidationFailed(validationError, refundDetailsConfig)}
      />
      <Accordion
        heading={"Requirement"}
        renderExpandedContent={() => requirements(refundData?.documents)}
      />
      <div className="flex justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-lg shadow-sm py-2 text-sm px-5">
        <div>{`${uploadedCount} of ${refundData?.documents.length} documents uploaded`}</div>
        <div>{`${verifiedCount} documents verified`}</div>
      </div>
    </>
  );
};

export default AddRefundFields;
