import React, { useEffect, useMemo } from "react";
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
import { sectorOptions } from "../../../data/OptionsData";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import DocumentUploaderVerifier from "../../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";

const AddLoanFields = ({ addLoanData }) => {
  const dispatch = useDispatch();
  const { loanProductOptions, loanProductData } = useSelector(
    (state) => state.personalLoans
  );

  // console.log(addLoanData);

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

  const selectedLoanProduct = loanProductData.find(
    (product) =>
      product?.loanProductId === addLoanData?.generalLoanDetails?.loanProductId
  );

  // Generate unique loan tenure options combining loanTenure & loanTenureType
  const loanTenureOptions = useMemo(() => {
    if (!selectedLoanProduct) return [];

    const uniqueLoanTenure = new Set();

    return selectedLoanProduct.interestEligibleTenure
      .filter((tenure) => {
        const combinedValue = `${tenure.loanTenure} ${tenure.loanTenureType}`;
        if (uniqueLoanTenure.has(combinedValue)) return false;
        uniqueLoanTenure.add(combinedValue);
        return true;
      })
      .map((tenure) => ({
        label: `${tenure.loanTenure} ${tenure.loanTenureType}`,
        value: `${tenure.loanTenure} ${tenure.loanTenureType}`,
      }));
  }, [selectedLoanProduct]);

  // Generate unique repayment tenure options based on the selected loan duration
  const repaymentTenureOptions = useMemo(() => {
    if (!selectedLoanProduct || !addLoanData?.generalLoanDetails?.loanDuration)
      return [];

    const uniqueRepaymentTenure = new Set();

    return selectedLoanProduct.interestEligibleTenure
      .filter((tenure) => {
        // Only include repaymentTenure if loanTenure matches the selected loan duration
        const loanDurationMatch =
          `${tenure.loanTenure} ${tenure.loanTenureType}` ===
          addLoanData?.generalLoanDetails?.loanDuration;

        if (!loanDurationMatch) return false;

        const combinedRepayment = `${tenure.repaymentTenure} ${tenure.repaymentTenureType}`;

        if (uniqueRepaymentTenure.has(combinedRepayment)) return false;
        uniqueRepaymentTenure.add(combinedRepayment);
        return true;
      })
      .map((tenure) => ({
        label: `${tenure.repaymentTenure} ${tenure.repaymentTenureType}`,
        value: `${tenure.repaymentTenure} ${tenure.repaymentTenureType}`,
      }));
  }, [selectedLoanProduct, addLoanData?.generalLoanDetails?.loanDuration]); // Runs when addLoanData?.generalLoanDetails?.loanDuration changes

  // Calculate loanInterest based on selected loanDuration & repaymentTenure
  const loanInterestStr = useMemo(() => {
    const selectedLoanDuration = addLoanData?.generalLoanDetails?.loanDuration;
    const selectedRepaymentTenure =
      addLoanData?.generalLoanDetails?.repaymentTenureStr;

    if (
      !selectedLoanProduct ||
      !selectedLoanDuration ||
      !selectedRepaymentTenure
    )
      return "";

    // Find the matching interest rate and period type
    const matchingTenure = selectedLoanProduct.interestEligibleTenure.find(
      (tenure) =>
        `${tenure.loanTenure} ${tenure.loanTenureType}` ===
          selectedLoanDuration &&
        `${tenure.repaymentTenure} ${tenure.repaymentTenureType}` ===
          selectedRepaymentTenure
    );

    return matchingTenure
      ? `${matchingTenure.interestRate} PER ${matchingTenure.interestPeriodType} ${addLoanData?.generalLoanDetails?.interestMethod}`
      : "";
  }, [
    selectedLoanProduct,
    addLoanData?.generalLoanDetails?.loanDuration,
    addLoanData?.generalLoanDetails?.repaymentTenureStr,
  ]);

  useEffect(() => {
    if (!loanInterestStr) return;

    const [loanInterest, loanInterestTypeStr] = loanInterestStr.split(" PER "); // Extract interest & type
    const loanInterestType = loanInterestTypeStr
      ? loanInterestTypeStr.split(" ")[0]
      : ""; // Extract only YEAR

    dispatch(
      updateLoanField({
        section: "generalLoanDetails",
        field: "loanInterestStr",
        value: loanInterestStr,
      })
    );

    dispatch(
      updateLoanField({
        section: "generalLoanDetails",
        field: "loanInterest",
        value: loanInterest ? parseInt(loanInterest.replace("%", "").trim()) : "", // Remove "%" symbol
      })
    );

    dispatch(
      updateLoanField({
        section: "generalLoanDetails",
        field: "loanInterestType",
        value: loanInterestType.trim(), // Keep only the first word (YEAR)
      })
    );
  }, [loanInterestStr]);

  const interestMethod = useMemo(() => {
    return selectedLoanProduct?.interestMethod || "";
  }, [selectedLoanProduct]);

  useEffect(() => {
    if (!interestMethod) return;

    dispatch(
      updateLoanField({
        section: "generalLoanDetails",
        field: "interestMethod",
        value: interestMethod,
      })
    );
  }, [interestMethod]);

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
      labelName: "Loan Release Date",
      inputName: "loanReleaseDate",
      type: "date",
      validation: true,
    },
    {
      labelName: "Loan Duration",
      inputName: "loanDuration",
      type: "select",
      options: loanTenureOptions,
      validation: true,
    },
    {
      labelName: "Repayment Frequency",
      inputName: "repaymentTenureStr",
      type: "select",
      options: repaymentTenureOptions,
      validation: true,
    },
    {
      labelName: "Loan Interest %",
      inputName: "loanInterestStr",
      type: "text",
      validation: true,
      disabled: true,
    },
    {
      labelName: "Principal Amount",
      inputName: "principalAmount",
      type: "number",
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
      labelName: "Refinanced Loan Amount",
      inputName: "refinancedLoanAmount",
      type: "number",
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
                disabled={field.disabled || false}
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
