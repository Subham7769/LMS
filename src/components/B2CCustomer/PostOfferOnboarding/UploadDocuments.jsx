import React, { useEffect, useState } from "react";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import DocumentUploaderVerifier from "../../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";
import InputCheckbox from "../../Common/InputCheckbox/InputCheckbox";
import { deleteDocumentFile, fetchLoanProductData, getDocsByIdnUsage, updateLoanField, updatePersonalBorrowerField, uploadDocumentFile } from "../../../redux/Slices/B2CLoansSlice";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { useDispatch, useSelector } from "react-redux";


function UploadDocuments({ documents }) {
  const dispatch = useDispatch();
  const { addLoanData, loading, fullLoanDetails, personalBorrower, loanProductData } = useSelector((state) => state.B2CLoans);

  console.log("addLoanData - ",addLoanData)
  console.log("personalBorrower - ",personalBorrower)


  const handleInputChange = (e, section, index) => {
    const { name, value, type, checked } = e.target;
    console.log(e)
    dispatch(updateLoanField({ section, field: name, value, type, checked, index }));
  };

  const handleFileChange = (e, section, index) => {
    const fileUploadParams = {
      loanApplicationId: addLoanData?.loanApplicationId,
      documentKey: addLoanData?.documents[index].documentKey,
      verified: addLoanData?.documents[index].verified,
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

  const handleDeleteDocument = (docId) => {
    if (!docId) return;
    const fileDeleteParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    dispatch(deleteDocumentFile(fileDeleteParams));
  };

  return (
    <div className="flex flex-col gap-5 justify-center align-middle">
      {documents.map((document, index) => (
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
      ))}
    </div>
  );
}

export default UploadDocuments;
