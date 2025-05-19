import React, { useEffect, useMemo, useState } from "react";
import Accordion from "../../Common/Accordion/Accordion";
import {
  deleteDocumentFile,
  updateLoanField,
  uploadDocumentFile,
} from "../../../redux/Slices/smeLoansSlice";
import { useDispatch, useSelector } from "react-redux";
import { sectorOptions, lhaBranchOptions } from "../../../data/OptionsData";
import DocumentUploaderVerifier from "../../Common/DocumentUploaderVerifier/DocumentUploaderVerifier";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import {
  countryOptions,
  districtOptions,
  locationOptions,
} from "../../../data/CountryData";
import DynamicForm from "../../Common/DynamicForm/DynamicForm";
import { isValidationFailed } from "../../../utils/isValidationFailed";

const AddLoanFields = ({ addLoanData }) => {
  const dispatch = useDispatch();
  const { loanProductOptions, loanProductData } = useSelector(
    (state) => state.smeLoans
  );
  const [filteredProvinces1, setFilteredProvinces1] = useState([]);
  const [filteredLocations1, setFilteredLocations1] = useState([]);
  const [filteredProvinces2, setFilteredProvinces2] = useState([]);
  const [filteredLocations2, setFilteredLocations2] = useState([]);

  useEffect(() => {
    setFilteredProvinces1(
      locationOptions[addLoanData.offTakerDetails.country] || []
    );
    setFilteredLocations1(
      districtOptions[addLoanData.offTakerDetails.province] || []
    );
    setFilteredProvinces2(
      locationOptions[addLoanData.supplierDetails.country] || []
    );
    setFilteredLocations2(
      districtOptions[addLoanData.supplierDetails.province] || []
    );
  }, [
    addLoanData.offTakerDetails.country,
    addLoanData.offTakerDetails.province,
    addLoanData.supplierDetails.country,
    addLoanData.supplierDetails.province,
  ]);

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

  const selectedLoanProduct = loanProductData.find(
    (product) =>
      product?.loanProductId === addLoanData?.generalLoanDetails?.loanProductId
  );

  console.log(selectedLoanProduct);

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

  // const interestMethod = useMemo(() => {
  //   return selectedLoanProduct?.interestMethod || "";
  // }, [selectedLoanProduct]);

  useEffect(() => {
    if (!selectedLoanProduct) return;

    dispatch(
      updateLoanField({
        section: "generalLoanDetails",
        field: "interestMethod",
        value: selectedLoanProduct?.interestMethod,
      })
    );
  }, [selectedLoanProduct]);

  const today = new Date();
  const { loanCreationDate, loanReleaseDate, firstEmiDate } =
    addLoanData.generalLoanDetails;

  // Helper to add months to a date
  const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };
  // Ensure loanCreationDate is set to today if not selected
  useEffect(() => {
    if (!loanCreationDate) {
      dispatch(
        updateLoanField({
          section: "generalLoanDetails",
          field: "loanCreationDate",
          value: new Date().toISOString().split("T")[0], // Setting default to today
        })
      );
    }
  }, [loanCreationDate, dispatch]);
  // Reset loanReleaseDate & firstEmiDate if loanCreationDate changes
  useEffect(() => {
    if (loanCreationDate) {
      dispatch(
        updateLoanField({
          section: "generalLoanDetails",
          field: "loanReleaseDate",
          value: "",
        })
      );
      dispatch(
        updateLoanField({
          section: "generalLoanDetails",
          field: "firstEmiDate",
          value: "",
        })
      );
    }
  }, [loanCreationDate, dispatch]);

  // Ensure loanReleaseDate ≥ loanCreationDate
  useEffect(() => {
    if (
      loanReleaseDate &&
      new Date(loanReleaseDate) < new Date(loanCreationDate)
    ) {
      dispatch(
        updateLoanField({
          section: "generalLoanDetails",
          field: "loanReleaseDate",
          value: "",
        })
      );
    }
  }, [loanCreationDate, loanReleaseDate, dispatch]);

  // Ensure firstEmiDate ≥ loanReleaseDate + 1 month
  useEffect(() => {
    const minFirstEmiDate = addMonths(new Date(loanReleaseDate), 1);
    if (firstEmiDate && new Date(firstEmiDate) < minFirstEmiDate) {
      dispatch(
        updateLoanField({
          section: "generalLoanDetails",
          field: "firstEmiDate",
          value: "",
        })
      );
    }
  }, [loanReleaseDate, firstEmiDate, dispatch]);

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
      labelName: "Borrower Serial No.",
      inputName: "uniqueID",
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
      labelName: "First EMI Date",
      inputName: "firstEmiDate",
      type: "date",
      minSelectableDate: loanReleaseDate
        ? addMonths(new Date(loanReleaseDate), 1)
        : today,
    },
    {
      labelName: "Reason for Borrowing",
      inputName: "reasonForBorrowing",
      type: "text",
      validation: true,
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
      type: "text",
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
      type: "text",
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
      type: "text",
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
      labelName: "Country",
      inputName: "country",
      type: "select",
      options: countryOptions,
      validation: false,
      searchable: true,
    },
    {
      labelName: "Province",
      inputName: "province",
      type: "select",
      options: filteredProvinces1,
      validation: false,
      searchable: true,
    },
    {
      labelName: "Location (Town/City)",
      inputName: "location",
      type: "select",
      options: filteredLocations1,
      validation: false,
      searchable: true,
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
      labelName: "Country",
      inputName: "country",
      type: "select",
      options: countryOptions,
      validation: false,
      searchable: true,
    },
    {
      labelName: "Province",
      inputName: "province",
      type: "select",
      options: filteredProvinces2,
      validation: false,
      searchable: true,
    },
    {
      labelName: "Location (Town/City)",
      inputName: "location",
      type: "select",
      options: filteredLocations2,
      validation: false,
      searchable: true,
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
      labelName: "Plot / Vehicle No",
      inputName: "plotVehicleNo",
      type: "text",
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
        heading={"General Loan Details"}
        renderExpandedContent={() => (
          <DynamicForm
            details={addLoanData.generalLoanDetails}
            config={generalLoanDetailsConfig}
            sectionName={"generalLoanDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        isOpen={true}
        error={isValidationFailed(validationError, generalLoanDetailsConfig)}
      />
      <Accordion
        heading={"Profoma Details"}
        renderExpandedContent={() => (
          <DynamicForm
            details={addLoanData.proformaDetails}
            config={proformaDetailsConfig}
            sectionName={"proformaDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        error={isValidationFailed(validationError, proformaDetailsConfig)}
      />
      <Accordion
        heading={"Off-Taker Details"}
        subHeading="(applicable to IDF and POF)"
        renderExpandedContent={() => (
          <DynamicForm
            details={addLoanData.offTakerDetails}
            config={offTakerConfig}
            sectionName={"offTakerDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        error={isValidationFailed(validationError, offTakerConfig)}
      />
      <Accordion
        heading={"Supplier Details"}
        subHeading="(Not applicable to IDF)"
        renderExpandedContent={() => (
          <DynamicForm
            details={addLoanData.supplierDetails}
            config={supplierDetailsConfig}
            sectionName={"supplierDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        error={isValidationFailed(validationError, supplierDetailsConfig)}
      />
      <Accordion
        heading={"Collateral Details"}
        renderExpandedContent={() => (
          <DynamicForm
            details={addLoanData.collateralDetails}
            config={collateralDetailsConfig}
            sectionName={"collateralDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        error={isValidationFailed(validationError, collateralDetailsConfig)}
      />
      <Accordion
        heading={"Loan Officer's Findings"}
        renderExpandedContent={() => (
          <DynamicForm
            details={addLoanData.lhaDetails}
            config={lhaDetailsConfig}
            sectionName={"lhaDetails"}
            handleInputChange={handleInputChange}
          />
        )}
        error={isValidationFailed(validationError, lhaDetailsConfig)}
      />
      <Accordion
        heading={"Required Documents"}
        renderExpandedContent={() => requiredDocuments(addLoanData.documents)}
      />
      <div className="flex justify-between shadow bg-gray-50 border text-gray-600 rounded py-2 text-sm px-5">
        <div>{`${uploadedCount} of ${addLoanData.documents.length} documents uploaded`}</div>
        <div>{`${verifiedCount} documents verified`}</div>
      </div>
    </>
  );
};

export default AddLoanFields;
