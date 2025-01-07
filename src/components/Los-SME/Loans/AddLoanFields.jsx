import React, { useEffect, useState } from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputEmail from "../../Common/InputEmail/InputEmail";
import InputCheckbox from "../../Common/InputCheckbox/InputCheckbox";
import InputFile from "../../Common/InputFile/InputFile"; // Assuming InputFile component for file upload
import InputTextArea from "../../Common/InputTextArea/InputTextArea"; // Assuming InputFile component for file upload
import Accordion from "../../Common/Accordion/Accordion";
import {
  fetchLoanProductData,
  updateLoanField,
} from "../../../redux/Slices/smeLoansSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompanyBorrowers } from "../../../redux/Slices/smeBorrowersSlice";
import {
  clearValidationError,
  setFields,
} from "../../../redux/Slices/validationSlice";

const AddLoanFields = ({ addLoanData }) => {
  const dispatch = useDispatch();
  const { allBorrowersData } = useSelector((state) => state.smeBorrowers);
  const { loanProductOptions } = useSelector((state) => state.smeLoans);
  const [borrowerOptions, setBorrowerOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchLoanProductData());
    dispatch(fetchAllCompanyBorrowers({ page: 0, size: 20 }));
    const keysArray = [
      "loanProduct",
      "borrower",
      "disbursedBy",
      "principalAmount",
      "loanReleaseDate",
      "interestMethod",
      "repaymentCycle",
      "loanInterest",
      "interestPer",
      "loanDuration",
      "durationPer",
      "numberOfTenure",
    ];
    dispatch(setFields(keysArray));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  useEffect(() => {
    const options = allBorrowersData.map((item) => ({
      label: `${item.borrowerProfile?.personalDetails?.title} ${item.borrowerProfile?.personalDetails?.surname} ${item.borrowerProfile?.personalDetails?.otherName}`,
      value: item.id,
    }));

    setBorrowerOptions(options);
  }, [allBorrowersData]);

  // Keys to process for document status
  const relevantKeys = ["requiredDocuments"];

  // Helper to calculate uploaded and verified documents
  const calculateDocumentStats = () => {
    let uploadedCount = 0;
    let verifiedCount = 0;

    // Loop through relevant document categories
    relevantKeys.forEach((key) => {
      const category = addLoanData[key];
      Object.keys(category).forEach((field) => {
        if (!field.endsWith("Verified") && category[field] !== null) {
          uploadedCount++;
        }

        if (field.endsWith("Verified") && category[field] === true) {
          verifiedCount++;
        }
      });
    });

    return { uploadedCount, verifiedCount };
  };

  const { uploadedCount, verifiedCount } = calculateDocumentStats();

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    // Use section to update the correct part of the state
    dispatch(
      updateLoanField({
        section,
        field: name,
        value: type === "file" ? value : value,
        type,
        checked,
      })
    );
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    dispatch(updateLoanField({ name, value: files[0].name }));
  };

  // All Fields Configuration
  const generalDetailsConfig = [
    {
      labelName: "Loan Product",
      inputName: "loanProduct",
      type: "select",
      options: loanProductOptions, // Dynamically populated
      validation: true,
    },
    {
      labelName: "Borrower",
      inputName: "borrower",
      type: "select",
      options: borrowerOptions, // Dynamically populated
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
        { value: "Flat", label: "Flat" },
        { value: "Reducing", label: "Reducing" },
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
      inputName: "interestPer",
      type: "select",
      options: [
        { value: "Year", label: "Year" },
        { value: "Month", label: "Month" },
      ],
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
      inputName: "durationPer",
      type: "select",
      options: [
        { value: "Year", label: "Year" },
        { value: "Month", label: "Month" },
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
  ];

  const profomaDetailsConfig = [
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
    },
    {
      labelName: "Amount of Proforma",
      inputName: "amountofProforma",
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
      inputName: "lastValutionDate",
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
      inputName: "contactperson",
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
      type: "number",
      validation: false,
    },
  ];

  const LHADetailsConfig = [
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

  const generalDetailsInputNames = generalDetailsConfig.map(
    (field) => field.inputName
  );
  const profomaDetailsInputNames = profomaDetailsConfig.map(
    (field) => field.inputName
  );
  const offTakerInputNames = offTakerConfig.map((field) => field.inputName);
  const supplierDetailsInputNames = supplierDetailsConfig.map(
    (field) => field.inputName
  );
  const collateralDetailsInputNames = collateralDetailsConfig.map(
    (field) => field.inputName
  );
  const LHADetailsInputNames = LHADetailsConfig.map((field) => field.inputName);

  const renderDetails = (details, config, sectionName) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {config.map((field, index) => {
        switch (field.type) {
          case "text":
            return (
              <InputText
                key={index}
                labelName={field.labelName}
                inputName={field.inputName}
                inputValue={details[field.inputName]}
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
                inputValue={details[field.inputName]}
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
                inputValue={details[field.inputName]}
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
                  inputValue={details[field.inputName]}
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
                inputValue={details[field.inputName]}
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
                inputValue={details[field.inputName]}
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
                inputValue={details[field.inputName]}
                onChange={(e) => handleInputChange(e, sectionName)}
                rowCount={field.rowCount || 3}
                isValidation={field.validation || false}
                placeHolder={`Enter ${field.labelName}`}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );

  // Dedicated UI Components
  const generalDetails = (generalDetails) =>
    renderDetails(generalDetails, generalDetailsConfig, "generalDetails");

  const profomaDetails = (profomaDetails) =>
    renderDetails(profomaDetails, profomaDetailsConfig, "profomaDetails");

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

  const LHADetails = (LHADetails) =>
    renderDetails(LHADetails, LHADetailsConfig, "LHADetails");

  const requiredDocuments = (requiredDocuments) => {
    return (
      <>
        <div className="flex justify-between items-center border-b border-gray-300 mb-3 pb-3">
          <div>Resolution to borrow</div>
          <div className="flex gap-x-5 items-baseline">
            <InputFile
              inputName="resolutionToBorrow"
              inputValue={requiredDocuments.resolutionToBorrow}
              onChange={(e) => handleInputChange(e, "requiredDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={requiredDocuments?.resolutionToBorrowVerified}
                onChange={(e) => handleInputChange(e, "requiredDocuments")}
                inputName="resolutionToBorrowVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-gray-300 mb-3 pb-3">
          <div>Purchase Order</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="purchaseOrder"
              inputValue={requiredDocuments.purchaseOrder}
              onChange={(e) => handleInputChange(e, "requiredDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={requiredDocuments?.purchaseOrderVerified}
                onChange={(e) => handleInputChange(e, "requiredDocuments")}
                inputName="purchaseOrderVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-gray-300 mb-3 pb-3">
          <div>Invoice</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="invoice"
              inputValue={requiredDocuments.invoice}
              onChange={(e) => handleInputChange(e, "requiredDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={requiredDocuments?.invoiceVerified}
                onChange={(e) => handleInputChange(e, "requiredDocuments")}
                inputName="invoiceVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-gray-300 mb-3 pb-3">
          <div>Profoma Invoice</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="profomaInvoice"
              inputValue={requiredDocuments.profomaInvoice}
              onChange={(e) => handleInputChange(e, "requiredDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={requiredDocuments?.profomaInvoiceVerified}
                onChange={(e) => handleInputChange(e, "requiredDocuments")}
                inputName="profomaInvoiceVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-gray-300 mb-3 pb-3">
          <div>Quotations from supplier</div>
          <div className="flex gap-x-5 items-baseline">
            <InputFile
              inputName="quotationsFromSupplier"
              inputValue={requiredDocuments.quotationsFromSupplier}
              onChange={(e) => handleInputChange(e, "requiredDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={requiredDocuments?.quotationsFromSupplierVerified}
                onChange={(e) => handleInputChange(e, "requiredDocuments")}
                inputName="quotationsFromSupplierVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-gray-300 mb-3 pb-3">
          <div>6 months Bank Statement</div>
          <div className="flex gap-x-5 items-baseline">
            <InputFile
              inputName="bankStatement"
              inputValue={requiredDocuments.bankStatement}
              onChange={(e) => handleInputChange(e, "requiredDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={requiredDocuments?.bankStatementVerified}
                onChange={(e) => handleInputChange(e, "requiredDocuments")}
                inputName="bankStatementVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-gray-300 mb-3 pb-3">
          <div>Credit Reference Bureau report</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="creditReferenceBureauReport"
              inputValue={requiredDocuments.creditReferenceBureauReport}
              onChange={(e) => handleInputChange(e, "requiredDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={
                  requiredDocuments?.creditReferenceBureauReportVerified
                }
                onChange={(e) => handleInputChange(e, "requiredDocuments")}
                inputName="creditReferenceBureauReportVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>Confirmation of Banking Details</div>
          <div className="flex gap-x-5 items-baseline">
            <InputFile
              inputName="confirmationOfBankingDetails"
              inputValue={requiredDocuments.confirmationOfBankingDetails}
              onChange={(e) => handleInputChange(e, "requiredDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={
                  requiredDocuments?.confirmationOfBankingDetailsVerified
                }
                onChange={(e) => handleInputChange(e, "requiredDocuments")}
                inputName="confirmationOfBankingDetailsVerified"
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
        renderExpandedContent={() => generalDetails(addLoanData.generalDetails)}
        isOpen={true}
        error={isValidationFailed(validationError, generalDetailsInputNames)}
      />
      <Accordion
        heading={"Profoma Details"}
        renderExpandedContent={() => profomaDetails(addLoanData.profomaDetails)}
        error={isValidationFailed(validationError, profomaDetailsInputNames)}
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
        renderExpandedContent={() => LHADetails(addLoanData.LHADetails)}
        error={isValidationFailed(validationError, LHADetailsInputNames)}
      />
      <Accordion
        heading={"Required Documents"}
        renderExpandedContent={() =>
          requiredDocuments(addLoanData.requiredDocuments)
        }
      />
      <div className="flex justify-between shadow bg-gray-50 border text-gray-600 rounded py-2 text-sm px-5">
        <div>{`${uploadedCount} of 8 documents uploaded`}</div>
        <div>{`${verifiedCount} documents verified`}</div>
      </div>
    </>
  );
};

export default AddLoanFields;
