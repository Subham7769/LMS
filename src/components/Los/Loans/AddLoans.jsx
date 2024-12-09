import React, { useState } from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputFile from "../../Common/InputFile/InputFile"; // Assuming InputFile component for file upload
import InputTextArea from "../../Common/InputTextArea/InputTextArea"; // Assuming InputFile component for file upload

const AddLoans = () => {
  const [formData, setFormData] = useState({
    loanProduct: "",
    borrower: "",
    loanNumber: "",
    disbursedBy: "",
    principalAmount: "",
    loanReleaseDate: "",
    interestMethod: "",
    interestType: "",
    loanInterest: "",
    interestPer: "",
    loanDuration: "",
    durationPer: "",
    repaymentCycle: "",
    numberOfRepayments: "",
    decimalPlaces: "",
    interestStartDate: "",
    firstRepaymentDate: "",
    firstRepaymentAmount: "",
    lastRepaymentAmount: "",
    overrideMaturityDate: "",
    overrideRepaymentAmount: "",
    proRataBasis: "",
    interestChargeSchedule: "",
    principalChargeSchedule: "",
    balloonRepaymentAmount: "",
    moveFirstRepaymentDays: "",
    automaticPayments: "",
    timeToPostBetween: "",
    cashOrBank: "",
    extendLoanAfterMaturity: "",
    interestType: "",
    calculateInterestOn: "",
    loanInterestRateAfterMaturity: "",
    recurringPeriodAfterMaturity: "",
    per: "",
    includeFeesAfterMaturity: "",
    loanStatusPastMaturity: "",
    applyToDate: "",
    loanStatus: "",
    selectGuarantors: "",
    loanTitle: "",
    description: "",
    loanFiles: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  return (
    <div className="flex flex-col gap-5 mt-5">
      <ContainerTile className="grid grid-cols-1 md:grid-cols-4 gap-5" heading={"General Loan Details"} collapsible={true}>
        {/* General Loan Details */}
        <h2 className="col-span-4 text-lg font-bold  -mt-1">General Loan Details</h2>
        <InputSelect
          labelName="Loan Product"
          inputName="loanProduct"
          inputOptions={[{ value: "Personal Loan", label: "Personal Loan" }]} // Populate dynamically
          inputValue={formData.loanProduct}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Borrower"
          inputName="borrower"
          inputOptions={[{ value: "John Doe", label: "John Doe" }]} // Populate dynamically
          inputValue={formData.borrower}
          onChange={handleInputChange}
        />
        <InputNumber
          labelName="Loan id"
          inputName="loanNumber"
          inputValue={formData.loanNumber}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Disbursed By"
          inputName="disbursedBy"
          inputOptions={[{ value: "Bank", label: "Bank" }]} // Populate dynamically
          inputValue={formData.disbursedBy}
          onChange={handleInputChange}
        />
        <InputNumber
          labelName="Principal Amount"
          inputName="principalAmount"
          inputValue={formData.principalAmount}
          onChange={handleInputChange}
        />
        <div className="col-span-1">
          <InputDate
            labelName="Loan Release Date"
            inputName="loanReleaseDate"
            inputValue={formData.loanReleaseDate}
            onChange={handleInputChange}
          />
        </div>
        <InputSelect
          labelName="Interest Method"
          inputName="interestMethod"
          inputOptions={[
            { value: "Flat", label: "Flat" },
            { value: "Reducing", label: "Reducing" },
          ]}
          inputValue={formData.interestMethod}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Interest Type"
          inputName="interestType"
          inputOptions={[
            { value: "Fixed", label: "Fixed" },
            { value: "Variable", label: "Variable" },
          ]}
          inputValue={formData.interestType}
          onChange={handleInputChange}
        />
        <InputText
          labelName="Loan Interest %"
          inputName="loanInterest"
          inputValue={formData.loanInterest}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Per"
          inputName="interestPer"
          inputOptions={[
            { value: "Year", label: "Year" },
            { value: "Month", label: "Month" },
          ]}
          inputValue={formData.interestPer}
          onChange={handleInputChange}
        />
        <InputNumber
          labelName="Loan Duration"
          inputName="loanDuration"
          inputValue={formData.loanDuration}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Per"
          inputName="durationPer"
          inputOptions={[
            { value: "Year", label: "Year" },
            { value: "Month", label: "Month" },
          ]}
          inputValue={formData.durationPer}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Repayment Cycle"
          inputName="repaymentCycle"
          inputOptions={[
            { value: "Monthly", label: "Monthly" },
            { value: "Quarterly", label: "Quarterly" },
          ]}
          inputValue={formData.repaymentCycle}
          onChange={handleInputChange}
        />
        <InputNumber
          labelName="Number of Repayments"
          inputName="numberOfRepayments"
          inputValue={formData.numberOfRepayments}
          onChange={handleInputChange}
        />
      </ContainerTile>
      <ContainerTile className="grid grid-cols-1 md:grid-cols-4 gap-5" heading={"Advanced Settings"} collapsible={true}>
        {/* Advanced Settings */}
        <h2 className="col-span-4 text-lg font-bold -mt-1">Advanced Settings</h2>
        <InputSelect
          labelName="Decimal Places"
          inputName="decimalPlaces"
          inputOptions={[
            { value: "2", label: "2" },
            { value: "3", label: "3" },
          ]}
          inputValue={formData.decimalPlaces}
          onChange={handleInputChange}
        />
        <div className="col-span-1">
          <InputDate
            labelName="Interest Start Date"
            inputName="interestStartDate"
            inputValue={formData.interestStartDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <InputDate
            labelName="First Repayment Date"
            inputName="firstRepaymentDate"
            inputValue={formData.firstRepaymentDate}
            onChange={handleInputChange}
          />
        </div>
        <InputNumber
          labelName="First Repayment Amount"
          inputName="firstRepaymentAmount"
          inputValue={formData.firstRepaymentAmount}
          onChange={handleInputChange}
        />
        <InputNumber
          labelName="Last Repayment Amount"
          inputName="lastRepaymentAmount"
          inputValue={formData.lastRepaymentAmount}
          onChange={handleInputChange}
        />
        <div className="col-span-1">
          <InputDate
            labelName="Override Maturity Date"
            inputName="overrideMaturityDate"
            inputValue={formData.overrideMaturityDate}
            onChange={handleInputChange}
          />
        </div>
        <InputNumber
          labelName="Override Each Repayment Amount to"
          inputName="overrideRepaymentAmount"
          inputValue={formData.overrideRepaymentAmount}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Calculate Interest on Pro-Rata Basis"
          inputName="proRataBasis"
          inputOptions={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          inputValue={formData.proRataBasis}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Interest charge Schedule"
          inputName="interestChargeSchedule"
          inputOptions={[
            { value: "Flat", label: "Flat" },
            { value: "Reducing", label: "Reducing" },
          ]}
          inputValue={formData.interestChargeSchedule}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Principal charge Schedule"
          inputName="principalChargeSchedule"
          inputOptions={[
            { value: "Equal", label: "Equal" },
            { value: "Balloon", label: "Balloon" },
          ]}
          inputValue={formData.principalChargeSchedule}
          onChange={handleInputChange}
        />
        <InputNumber
          labelName="Balloon Repayment Amount"
          inputName="balloonRepaymentAmount"
          inputValue={formData.balloonRepaymentAmount}
          onChange={handleInputChange}
        />
        <InputNumber
          labelName="Move First Repayment Days"
          inputName="moveFirstRepaymentDays"
          inputValue={formData.moveFirstRepaymentDays}
          onChange={handleInputChange}
        />
      </ContainerTile>
      <ContainerTile className="grid grid-cols-1 md:grid-cols-4 gap-5" heading={"Automated Payments"} collapsible={true}>
        {/* Automated Payments */}
        <h2 className="col-span-4 text-lg font-bold -mt-1">
          Automated Payments
        </h2>

        <InputSelect
          labelName="Add Automatic Payments?"
          inputName="automaticPayments"
          inputOptions={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          inputValue={formData.automaticPayments}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Post Automatic Payments Between"
          inputName="timeToPostBetween"
          inputOptions={[
            { value: "Morning", label: "Morning (6AM-12PM)" },
            { value: "Afternoon", label: "Afternoon (12PM-6PM)" },
          ]}
          inputValue={formData.timeToPostBetween}
          onChange={handleInputChange}
        />
        <InputSelect
          labelName="Cash or Bank?"
          inputName="cashOrBank"
          inputOptions={[
            { value: "Cash", label: "Cash" },
            { value: "Bank", label: "Bank" },
          ]}
          inputValue={formData.cashOrBank}
          onChange={handleInputChange}
        />
      </ContainerTile>
      <ContainerTile className="grid grid-cols-1 md:grid-cols-4 gap-5" heading={"Extend Loan After Maturity Until Fully Paid"} collapsible={true}>
        {/* Extend Loan After Maturity */}

        <h2 className="col-span-4 text-lg font-bold -mt-1">
        Extend Loan After Maturity Until Fully Paid
        </h2>
        <InputSelect
          labelName="Extend Loan After Maturity"
          inputName="extendLoanAfterMaturity"
          inputOptions={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          inputValue={formData.extendLoanAfterMaturity}
          onChange={handleInputChange}
        />

        {/* Interest Type */}
        <InputSelect
          labelName="Interest Type"
          inputName="interestType"
          inputOptions={[
            { value: "Fixed", label: "Fixed" },
            { value: "Variable", label: "Variable" },
          ]}
          inputValue={formData.interestType}
          onChange={handleInputChange}
        />

        {/* Calculate Interest On */}
        <InputSelect
          labelName="Calculate Interest on"
          inputName="calculateInterestOn"
          inputOptions={[
            { value: "Principal", label: "Principal" },
            { value: "Outstanding", label: "Outstanding" },
          ]}
          inputValue={formData.calculateInterestOn}
          onChange={handleInputChange}
        />

        {/* Loan Interest Rate After Maturity % */}
        <InputText
          labelName="Loan Interest Rate After Maturity %"
          inputName="loanInterestRateAfterMaturity"
          inputValue={formData.loanInterestRateAfterMaturity}
          onChange={handleInputChange}
        />

        {/* Recurring Period After Maturity */}
        <InputText
          labelName="Recurring Period After Maturity"
          inputName="recurringPeriodAfterMaturity"
          inputValue={formData.recurringPeriodAfterMaturity}
          onChange={handleInputChange}
        />

        {/* Per */}
        <InputSelect
          labelName="Per"
          inputName="per"
          inputOptions={[
            { value: "Month", label: "Month" },
            { value: "Year", label: "Year" },
          ]}
          inputValue={formData.per}
          onChange={handleInputChange}
        />

        {/* Include Fees After Maturity */}
        <InputSelect
          labelName="Include Fees After Maturity"
          inputName="includeFeesAfterMaturity"
          inputOptions={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          inputValue={formData.includeFeesAfterMaturity}
          onChange={handleInputChange}
        />

        {/* Keep the loan status as Past Maturity */}
        <InputSelect
          labelName="Loan status Past Maturity"
          inputName="loanStatusPastMaturity"
          inputOptions={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          inputValue={formData.loanStatusPastMaturity}
          onChange={handleInputChange}
        />

        {/* (Optional) Apply to the following date */}
        <InputText
          labelName="Apply to the date (Optional)"
          inputName="applyToDate"
          inputValue={formData.applyToDate}
          onChange={handleInputChange}
        />

        {/* Loan Status */}
        <InputSelect
          labelName="Loan Status"
          inputName="loanStatus"
          inputOptions={[
            { value: "Active", label: "Active" },
            { value: "Past Due", label: "Past Due" },
            { value: "Closed", label: "Closed" },
          ]}
          inputValue={formData.loanStatus}
          onChange={handleInputChange}
        />

        {/* Select Guarantors */}
        <InputText
          labelName="Select Guarantors"
          inputName="selectGuarantors"
          inputValue={formData.selectGuarantors}
          onChange={handleInputChange}
        />

        {/* Loan Title */}
        <InputText
          labelName="Loan Title"
          inputName="loanTitle"
          inputValue={formData.loanTitle}
          onChange={handleInputChange}
        />

        {/* Description */}

        <InputTextArea
          labelName="Description"
          inputName="description"
          inputValue={formData.description}
          onChange={handleInputChange}
          rowCount={3}
        />

        {/* Loan Files */}

        <InputFile
          labelName="Loan Files"
          inputName="loanFiles"
          onChange={handleFileUpload}
          accept=".jpg,.png"
          placeholder="Click or drag to upload"
        />
      </ContainerTile>

      {/* Save Button */}
      <div className="flex justify-center col-span-4">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all flex items-center"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddLoans;
