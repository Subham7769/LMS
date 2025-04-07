import React, { useEffect, useMemo } from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import Button from "../../Common/Button/Button";
import InputCheckbox from "../../Common/InputCheckbox/InputCheckbox";
import Accordion from "../../Common/Accordion/Accordion";
import {
  deleteDocumentFile,
  handleAddRefinance,
  handleDeleteRefinance,
  updateLoanField,
  uploadDocumentFile,
} from "../../../redux/Slices/personalLoansSlice";
import { useDispatch, useSelector } from "react-redux";
import { sectorOptions, lhaBranchOptions } from "../../../data/OptionsData";
import {
  CreditCardIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import DocumentUploaderVerifier from "../../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import DynamicForm from "../../Common/DynamicForm/DynamicForm";
import { isValidationFailed } from "../../../utils/isValidationFailed";

const AddLoanFields = ({ addLoanData }) => {
  const dispatch = useDispatch();
  const { loanProductOptions, loanProductData } = useSelector(
    (state) => state.personalLoans
  );

  // Helper to calculate uploaded and verified documents
  const calculateDocumentStats = () => {
    let uploadedCount = 0;
    let verifiedCount = 0;

    // Loop through the documents array
    addLoanData?.documents?.forEach((document) => {
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
    if (
      !selectedLoanProduct ||
      !addLoanData?.generalLoanDetails?.loanDurationStr
    )
      return [];

    // dispatch(
    //   updateLoanField({
    //     section: "generalLoanDetails",
    //     field: "repaymentTenureStr",
    //     value: "",
    //   })
    // );

    const uniqueRepaymentTenure = new Set();

    return selectedLoanProduct.interestEligibleTenure
      .filter((tenure) => {
        // Only include repaymentTenure if loanTenure matches the selected loan duration
        const loanDurationMatch =
          `${tenure.loanTenure} ${tenure.loanTenureType}` ===
          addLoanData?.generalLoanDetails?.loanDurationStr;

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
  }, [selectedLoanProduct, addLoanData?.generalLoanDetails?.loanDurationStr]); // Runs when addLoanData?.generalLoanDetails?.loanDurationStr changes

  // Calculate loanInterest based on selected loanDurationStr & repaymentTenure
  const loanInterestStr = useMemo(() => {
    const selectedLoanDuration =
      addLoanData?.generalLoanDetails?.loanDurationStr;
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
    addLoanData?.generalLoanDetails?.loanDurationStr,
    addLoanData?.generalLoanDetails?.repaymentTenureStr,
  ]);

  useEffect(() => {
    if (!addLoanData?.generalLoanDetails?.loanDurationStr) return;

    const [loanDuration, loanDurationType] =
      addLoanData?.generalLoanDetails?.loanDurationStr.split(" "); // Extract interest & type

    dispatch(
      updateLoanField({
        section: "generalLoanDetails",
        field: "loanDurationType",
        value: loanDurationType,
      })
    );

    dispatch(
      updateLoanField({
        section: "generalLoanDetails",
        field: "loanDuration",
        value: loanDuration ? parseFloat(loanDuration) : "", // Remove "%" symbol and preserves decimal
      })
    );
  }, [addLoanData?.generalLoanDetails?.loanDurationStr]);

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
        value: loanInterest ? parseFloat(loanInterest) : "", // Remove "%" symbol and preserves decimal
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


  const today = new Date();
  const { loanCreationDate, loanReleaseDate } = addLoanData.generalLoanDetails;

  // Ensure loanCreationDate is set to today if not selected
  useEffect(() => {
    if (!loanCreationDate) {
      dispatch(updateLoanField({
        section: "generalLoanDetails",
        field: "loanCreationDate",
        value: new Date().toISOString().split("T")[0], // Setting default to today
      }));
    }
  }, [loanCreationDate, dispatch]);

  // Reset loanReleaseDate  if loanCreationDate changes
  useEffect(() => {
    if (loanCreationDate) {
      dispatch(updateLoanField({
        section: "generalLoanDetails",
        field: "loanReleaseDate",
        value: "",
      }));
    }
  }, [loanCreationDate, dispatch]);

  // Ensure loanReleaseDate ≥ loanCreationDate
  useEffect(() => {
    if (loanReleaseDate && new Date(loanReleaseDate) < new Date(loanCreationDate)) {
      dispatch(updateLoanField({
        section: "generalLoanDetails",
        field: "loanReleaseDate",
        value: "",
      }));
    }
  }, [loanCreationDate, loanReleaseDate, dispatch]);


  // All Fields Configuration
  const generalLoanDetailsConfig = [
    {
      labelName: "Loan Product",
      inputName: "loanProductId",
      type: "select",
      options: loanProductOptions, // Dynamically populated
      validation: true,
      searchable: true,
    },
    {
      labelName: "Disbursed By",
      inputName: "disbursedBy",
      type: "select",
      options: [{ value: "Bank", label: "Bank" }], // Static
      validation: true,
    },
    {
      labelName: "Borrower Unique ID",
      inputName: "uniqueID",
      type: "text",
      validation: true,
    },
    {
      labelName: "Agent Name",
      inputName: "agentName",
      type: "text",
      validation: false,
    },
    {
      labelName: "Loan Duration",
      inputName: "loanDurationStr",
      type: "select",
      options: loanTenureOptions,
      validation: true,
      searchable: true,
    },
    {
      labelName: "Repayment Frequency",
      inputName: "repaymentTenureStr",
      type: "select",
      options: repaymentTenureOptions,
      validation: true,
      searchable: true,
    },
    {
      labelName: "Loan Interest %",
      inputName: "loanInterestStr",
      type: "text",
      validation: false,
      disabled: true,
    },
    {
      labelName: "Principal Amount",
      inputName: "principalAmount",
      type: "number",
      validation: true,
    },
    {
      labelName: "Loan Creation Date",
      inputName: "loanCreationDate",
      type: "date",
      validation: true,
    },
    {
      labelName: "Loan Release Date",
      inputName: "loanReleaseDate",
      type: "date",
      validation: true,
      minSelectableDate: loanCreationDate ? new Date(loanCreationDate) : today,
    },
    {
      labelName: "Branch",
      inputName: "branch",
      type: "select",
      options: lhaBranchOptions,
      validation: true,
      searchable: true,
    },
    {
      labelName: "Sector",
      inputName: "sector",
      type: "select",
      options: sectorOptions,
      validation: false,
      searchable: true,
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
          <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
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

  const refinanceDetails = (refinanceDetails) => (
    <>
      <div className="flex justify-end">
        <Button
          buttonIcon={PlusIcon}
          onClick={() => {
            dispatch(handleAddRefinance());
          }}
          circle={true}
          buttonType="secondary"
        />
      </div>
      {refinanceDetails.map((refinance, index) => (
        <div
          key={index}
          className="grid grid-cols-[repeat(5,_minmax(0,_1fr))_120px] gap-4 items-end mb-2"
        >
          <InputText
            labelName="Name"
            inputName="name"
            inputValue={refinance?.name}
            onChange={(e) => handleInputChange(e, "refinanceDetails", index)}
            disabled={false}
          />
          <InputText
            labelName="Loan ID"
            inputName="loanId"
            inputValue={refinance?.loanId}
            onChange={(e) => handleInputChange(e, "refinanceDetails", index)}
            disabled={false}
          />
          <InputNumber
            labelName="Installment On PaySlip"
            inputName="installmentOnPaySlip"
            inputValue={refinance?.installmentOnPaySlip}
            onChange={(e) => handleInputChange(e, "refinanceDetails", index)}
            disabled={false}
          />
          <InputNumber
            labelName="Refinance Amount"
            inputName="refinanceAmount"
            inputValue={refinance?.refinanceAmount}
            onChange={(e) => handleInputChange(e, "refinanceDetails", index)}
            disabled={false}
          />
          <div className="flex pb-2">
            <InputCheckbox
              labelName="Refinance"
              inputChecked={refinance?.refinanceYesNo}
              onChange={(e) => handleInputChange(e, "refinanceDetails", index)}
              inputName="refinanceYesNo"
            />
            <Button
              buttonIcon={TrashIcon}
              onClick={() => dispatch(handleDeleteRefinance(index))}
              circle={true}
              buttonType="destructive"
            />
          </div>
        </div>
      ))}
    </>
  );



  return (
    <>
      <Accordion
        heading={"General Loan Details"}
        renderExpandedContent={() =>
          <DynamicForm
            details={addLoanData.generalLoanDetails}
            config={generalLoanDetailsConfig}
            sectionName={"generalLoanDetails"}
            handleInputChange={handleInputChange}
          />
        }
        isOpen={true}
        error={isValidationFailed(
          validationError,
          generalLoanDetailsConfig
        )}
      />
      <Accordion
        heading={"Refinance Details"}
        renderExpandedContent={() =>
          refinanceDetails(addLoanData?.refinanceDetails)
        }
      />
      <Accordion
        heading={"Requirement"}
        renderExpandedContent={() => requirements(addLoanData.documents)}
      />
      <div className="flex justify-between shadow bg-gray-50 border text-gray-600 rounded py-2 text-sm px-5">
        <div>{`${uploadedCount} of ${addLoanData.documents.length} documents uploaded`}</div>
        <div>{`${verifiedCount} documents verified`}</div>
      </div>
    </>
  );
};

export default AddLoanFields;
