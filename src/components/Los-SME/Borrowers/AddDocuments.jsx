import React, { useEffect, useState } from "react";
import Accordion from "../../Common/Accordion/Accordion";
import DocumentUploaderVerifier from "../../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";
import {
  setCompanyId,
  fetchAllCompanyBorrowersListByLoanOfficer,
  fetchCompanyDetails,
  handleChangeCompanyDocuments,
  fetchCompanyDocuments,
  uploadCompanyDocumentFile,
  deleteDocumentFile,
  handleChangeDirectorDocuments,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { useNavigate } from "react-router-dom";
const AddDocuments = () => {
  const isValid = useSelector((state) => state.validation.isValid);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    companyId,
    existingDirectorDetails,
    allCompanies,
    companyDocuments,
    error,
    loading,
  } = useSelector((state) => state.smeBorrowers);
  const loanOfficer = localStorage.getItem("username");

  useEffect(() => {
    dispatch(
      fetchCompanyDocuments({
        companyId,
        auth: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
      })
    );
  }, [companyId, dispatch]);

  useEffect(() => {
    if (allCompanies.length < 1) {
      dispatch(fetchAllCompanyBorrowersListByLoanOfficer({ loanOfficer }));
    }
  }, [dispatch]);

  const changeCompany = (e) => {
    dispatch(setCompanyId({ companyId: e.target.value }));
    dispatch(fetchCompanyDetails({ companyId: e.target.value }));
  };

  // Company
  const companyHandleFileChange = (e, index, directorId) => {
    const fileUploadParams = {
      companyBorrowerId: companyId,
      documentKey: companyDocuments[index].documentKey,
      verified: companyDocuments[index].verified,
      directorId: directorId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };

    const { name, value, type, checked, files } = e.target;

    dispatch(
      handleChangeCompanyDocuments({ field: name, value, type, checked, index })
    );

    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);

      // Dispatch the upload action with the FormData
      dispatch(uploadCompanyDocumentFile({ formData, fileUploadParams }));
    }
  };

  const companyHandleDeleteDocument = (docId) => {
    if (!docId) return;
    const fileDeleteParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    dispatch(deleteDocumentFile(fileDeleteParams));
  };

  const companyHandleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    // Use section to update the correct part of the state
    dispatch(
      handleChangeCompanyDocuments({ field: name, value, type, checked, index })
    );
  };

  const companyDocumentRequirements = (documents) => {
    return (
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {documents.map((document, index) => (
              <DocumentUploaderVerifier
                key={document.docId} // Unique key for React
                label={document.documentKey.replace(/_/g, " ")} // Convert documentKey to a more readable label
                inputFileName="docName"
                inputFileValue={document.docName}
                onFileChange={(e) => companyHandleFileChange(e, index)}
                onFileDelete={() => companyHandleDeleteDocument(document.docId)}
                checkboxName="verified"
                checkboxChecked={document.verified}
                onCheckboxChange={(e) => companyHandleInputChange(e, index)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Director
  const directorHandleFileChange = (e, index, directorId) => {
    const fileUploadParams = {
      companyBorrowerId: companyId,
      documentKey: companyDocuments[index].documentKey,
      verified: companyDocuments[index].verified,
      directorId: directorId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };

    const { name, value, type, checked, files } = e.target;

    dispatch(
      handleChangeCompanyDocuments({ field: name, value, type, checked, index })
    );

    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);

      // Dispatch the upload action with the FormData
      dispatch(uploadCompanyDocumentFile({ formData, fileUploadParams }));
    }
  };

  const directorHandleDeleteDocument = (docId) => {
    if (!docId) return;
    const fileDeleteParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
    };
    dispatch(deleteDocumentFile(fileDeleteParams));
  };

  const directorHandleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    // Use section to update the correct part of the state
    dispatch(
      handleChangeCompanyDocuments({ field: name, value, type, checked, index })
    );
  };

  const directorDocumentRequirements = (documents) => {
    return (
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {documents.map((document, index) => (
              <DocumentUploaderVerifier
                key={document.docId} // Unique key for React
                label={document.documentKey.replace(/_/g, " ")} // Convert documentKey to a more readable label
                inputFileName="docName"
                inputFileValue={document.docName}
                onFileChange={(e) => directorHandleFileChange(e, index)}
                onFileDelete={() => directorHandleDeleteDocument(document.docId)}
                checkboxName="verified"
                checkboxChecked={document.verified}
                onCheckboxChange={(e) => directorHandleInputChange(e, index)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const company = allCompanies.find((comp) => comp.value === companyId);

  const heading = company
    ? `${company.label} (${company.value})`
    : `Company not found (${companyId})`;

  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-5 items-center">
        <InputSelect
          labelName={"Company"}
          inputName={"companyId"}
          inputOptions={allCompanies}
          inputValue={companyId}
          onChange={changeCompany}
        />
        <div></div>
        <div></div>
        <div></div>
      </div>
      {companyId && (
        <div className=" flex flex-col mb-6">
          <p className="font-semibold mb-2">Existing Company Documents</p>
          <Accordion
            heading={`${heading}`}
            renderExpandedContent={() => (
              <div className="">
                {companyDocumentRequirements(companyDocuments)}
              </div>
            )}
          />
        </div>
      )}

      {existingDirectorDetails.length > 0 && companyId && (
        <div className=" flex flex-col mb-6">
          <p className="font-semibold mb-2">Existing Directors Documents</p>
          {existingDirectorDetails.map((director, index) => (
            <>
              <Accordion
                heading={`${director.personalDetails.title} 
                      ${director.personalDetails.firstName} 
                      ${director.personalDetails.surname} 
                      ${director.personalDetails.otherName}
                      (${director.personalDetails.uniqueID})
                      `}
                renderExpandedContent={() => (
                  <div className="px-5">
                    {directorDocumentRequirements(director.documents)}
                  </div>
                )}
              />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default AddDocuments;
