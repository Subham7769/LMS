import React from "react";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputDate from "../../Common/InputDate/InputDate";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputFile from "../../Common/InputFile/InputFile"; // Assuming InputFile component for file upload
import InputTextArea from "../../Common/InputTextArea/InputTextArea"; // Assuming InputFile component for file upload
import Accordion from "../../Common/Accordion/Accordion";
import { updateLoanField } from "../../../redux/Slices/loansSlice";
import { useDispatch, useSelector } from "react-redux";

const AddLoans = () => {
  const dispatch = useDispatch();
  const { addLoanData } = useSelector((state) => state.loans);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    // Use section to update the correct part of the state
    dispatch(updateLoanField({ section, field: name, value }));
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    dispatch(updateLoanField({ name, value: files[0].name }));
  };

  const generalDetails = (generalDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <InputSelect
        labelName="Loan Product"
        inputName="loanProduct"
        inputOptions={[{ value: "Personal Loan", label: "Personal Loan" }]} // Populate dynamically
        inputValue={generalDetails.loanProduct}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <InputSelect
        labelName="Borrower"
        inputName="borrower"
        inputOptions={[{ value: "John Doe", label: "John Doe" }]} // Populate dynamically
        inputValue={generalDetails.borrower}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <InputSelect
        labelName="Disbursed By"
        inputName="disbursedBy"
        inputOptions={[{ value: "Bank", label: "Bank" }]} // Populate dynamically
        inputValue={generalDetails.disbursedBy}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <InputNumber
        labelName="Principal Amount"
        inputName="principalAmount"
        inputValue={generalDetails.principalAmount}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <div className="col-span-1">
        <InputDate
          labelName="Loan Release Date"
          inputName="loanReleaseDate"
          inputValue={generalDetails.loanReleaseDate}
          onChange={(e) => handleInputChange(e, "generalDetails")}
        />
      </div>
      <InputSelect
        labelName="Interest Method"
        inputName="interestMethod"
        inputOptions={[
          { value: "Flat", label: "Flat" },
          { value: "Reducing", label: "Reducing" },
        ]}
        inputValue={generalDetails.interestMethod}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <InputSelect
        labelName="Interest Type"
        inputName="generalDetailsInterestType"
        inputOptions={[
          { value: "Fixed", label: "Fixed" },
          { value: "Variable", label: "Variable" },
        ]}
        inputValue={generalDetails.generalDetailsInterestType}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <InputSelect
        labelName="Repayment Cycle"
        inputName="repaymentCycle"
        inputOptions={[
          { value: "Monthly", label: "Monthly" },
          { value: "Quarterly", label: "Quarterly" },
        ]}
        inputValue={generalDetails.repaymentCycle}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <InputText
        labelName="Loan Interest %"
        inputName="loanInterest"
        inputValue={generalDetails.loanInterest}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <InputSelect
        labelName="Per (Loan Interest)"
        inputName="interestPer"
        inputOptions={[
          { value: "Year", label: "Year" },
          { value: "Month", label: "Month" },
        ]}
        inputValue={generalDetails.interestPer}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <InputNumber
        labelName="Loan Duration"
        inputName="loanDuration"
        inputValue={generalDetails.loanDuration}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
      <InputSelect
        labelName="Per (Loan Duration)"
        inputName="durationPer"
        inputOptions={[
          { value: "Year", label: "Year" },
          { value: "Month", label: "Month" },
        ]}
        inputValue={generalDetails.durationPer}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />

      <InputNumber
        labelName="Number of Repayments"
        inputName="numberOfRepayments"
        inputValue={generalDetails.numberOfRepayments}
        onChange={(e) => handleInputChange(e, "generalDetails")}
      />
    </div>
  );

  const advanceSettings = (advanceSettings) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <InputSelect
        labelName="Decimal Places"
        inputName="decimalPlaces"
        inputOptions={[
          { value: "2", label: "2" },
          { value: "3", label: "3" },
        ]}
        inputValue={advanceSettings.decimalPlaces}
        onChange={(e) => handleInputChange(e, "advanceSettings")}
      />
      <div className="col-span-1">
        <InputDate
          labelName="Interest Start Date"
          inputName="interestStartDate"
          inputValue={advanceSettings.interestStartDate}
          onChange={(e) => handleInputChange(e, "advanceSettings")}
        />
      </div>
      <div className="col-span-1">
        <InputDate
          labelName="First Repayment Date"
          inputName="firstRepaymentDate"
          inputValue={advanceSettings.firstRepaymentDate}
          onChange={(e) => handleInputChange(e, "advanceSettings")}
        />
      </div>
      <InputNumber
        labelName="First Repayment Amount"
        inputName="firstRepaymentAmount"
        inputValue={advanceSettings.firstRepaymentAmount}
        onChange={(e) => handleInputChange(e, "advanceSettings")}
      />
      <InputNumber
        labelName="Last Repayment Amount"
        inputName="lastRepaymentAmount"
        inputValue={advanceSettings.lastRepaymentAmount}
        onChange={(e) => handleInputChange(e, "advanceSettings")}
      />
      <div className="col-span-1">
        <InputDate
          labelName="Override Maturity Date"
          inputName="overrideMaturityDate"
          inputValue={advanceSettings.overrideMaturityDate}
          onChange={(e) => handleInputChange(e, "advanceSettings")}
        />
      </div>
      <InputNumber
        labelName="Override Each Repayment Amount to"
        inputName="overrideRepaymentAmount"
        inputValue={advanceSettings.overrideRepaymentAmount}
        onChange={(e) => handleInputChange(e, "advanceSettings")}
      />
      <InputSelect
        labelName="Calculate Interest on Pro-Rata Basis"
        inputName="proRataBasis"
        inputOptions={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        inputValue={advanceSettings.proRataBasis}
        onChange={(e) => handleInputChange(e, "advanceSettings")}
      />
      <InputSelect
        labelName="Interest charge Schedule"
        inputName="interestChargeSchedule"
        inputOptions={[
          { value: "Flat", label: "Flat" },
          { value: "Reducing", label: "Reducing" },
        ]}
        inputValue={advanceSettings.interestChargeSchedule}
        onChange={(e) => handleInputChange(e, "advanceSettings")}
      />
      <InputSelect
        labelName="Principal charge Schedule"
        inputName="principalChargeSchedule"
        inputOptions={[
          { value: "Equal", label: "Equal" },
          { value: "Balloon", label: "Balloon" },
        ]}
        inputValue={advanceSettings.principalChargeSchedule}
        onChange={(e) => handleInputChange(e, "advanceSettings")}
      />
      <InputNumber
        labelName="Balloon Repayment Amount"
        inputName="balloonRepaymentAmount"
        inputValue={advanceSettings.balloonRepaymentAmount}
        onChange={(e) => handleInputChange(e, "advanceSettings")}
      />
      <InputNumber
        labelName="Move First Repayment Days"
        inputName="moveFirstRepaymentDays"
        inputValue={advanceSettings.moveFirstRepaymentDays}
        onChange={(e) => handleInputChange(e, "advanceSettings")}
      />
    </div>
  );

  const automatedPayments = (automatedPayments) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <InputSelect
        labelName="Add Automatic Payments?"
        inputName="automaticPayments"
        inputOptions={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        inputValue={automatedPayments.automaticPayments}
        onChange={(e) => handleInputChange(e, "automatedPayments")}
      />
      <InputSelect
        labelName="Post Automatic Payments Between"
        inputName="timeToPostBetween"
        inputOptions={[
          { value: "Morning", label: "Morning (6AM-12PM)" },
          { value: "Afternoon", label: "Afternoon (12PM-6PM)" },
        ]}
        inputValue={automatedPayments.timeToPostBetween}
        onChange={(e) => handleInputChange(e, "automatedPayments")}
      />
      <InputSelect
        labelName="Cash or Bank?"
        inputName="cashOrBank"
        inputOptions={[
          { value: "Cash", label: "Cash" },
          { value: "Bank", label: "Bank" },
        ]}
        inputValue={automatedPayments.cashOrBank}
        onChange={(e) => handleInputChange(e, "automatedPayments")}
      />
    </div>
  );

  const extendLoan = (extendLoan) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <InputSelect
        labelName="Extend Loan After Maturity"
        inputName="extendLoanAfterMaturity"
        inputOptions={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        inputValue={extendLoan.extendLoanAfterMaturity}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Interest Type */}
      <InputSelect
        labelName="Interest Type"
        inputName="extendLoanInterestType"
        inputOptions={[
          { value: "Fixed", label: "Fixed" },
          { value: "Variable", label: "Variable" },
        ]}
        inputValue={extendLoan.extendLoanInterestType}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Calculate Interest On */}
      <InputSelect
        labelName="Calculate Interest on"
        inputName="calculateInterestOn"
        inputOptions={[
          { value: "Principal", label: "Principal" },
          { value: "Outstanding", label: "Outstanding" },
        ]}
        inputValue={extendLoan.calculateInterestOn}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Loan Interest Rate After Maturity % */}
      <InputText
        labelName="Loan Interest Rate After Maturity %"
        inputName="loanInterestRateAfterMaturity"
        inputValue={extendLoan.loanInterestRateAfterMaturity}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Recurring Period After Maturity */}
      <InputText
        labelName="Recurring Period After Maturity"
        inputName="recurringPeriodAfterMaturity"
        inputValue={extendLoan.recurringPeriodAfterMaturity}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Per */}
      <InputSelect
        labelName="Per"
        inputName="per"
        inputOptions={[
          { value: "Month", label: "Month" },
          { value: "Year", label: "Year" },
        ]}
        inputValue={extendLoan.per}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Include Fees After Maturity */}
      <InputSelect
        labelName="Include Fees After Maturity"
        inputName="includeFeesAfterMaturity"
        inputOptions={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        inputValue={extendLoan.includeFeesAfterMaturity}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Keep the loan status as Past Maturity */}
      <InputSelect
        labelName="Loan status Past Maturity"
        inputName="loanStatusPastMaturity"
        inputOptions={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        inputValue={extendLoan.loanStatusPastMaturity}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* (Optional) Apply to the following date */}
      <InputText
        labelName="Apply to the date (Optional)"
        inputName="applyToDate"
        inputValue={extendLoan.applyToDate}
        onChange={(e) => handleInputChange(e, "extendLoan")}
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
        inputValue={extendLoan.loanStatus}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Select Guarantors */}
      <InputText
        labelName="Select Guarantors"
        inputName="selectGuarantors"
        inputValue={extendLoan.selectGuarantors}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Loan Title */}
      <InputText
        labelName="Loan Title"
        inputName="loanTitle"
        inputValue={extendLoan.loanTitle}
        onChange={(e) => handleInputChange(e, "extendLoan")}
      />

      {/* Description */}

      <InputTextArea
        labelName="Description"
        inputName="description"
        inputValue={extendLoan.description}
        onChange={(e) => handleInputChange(e, "extendLoan")}
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
    </div>
  );

  return (
    <>
      <Accordion
        heading={"General Loan Details"}
        renderExpandedContent={() => generalDetails(addLoanData.generalDetails)}
        isOpen={true}
      />
      <Accordion
        heading={"Advance Settings (optional)"}
        renderExpandedContent={() =>
          advanceSettings(addLoanData.advanceSettings)
        }
      />
      <Accordion
        heading={"Automated Payments (optional)"}
        renderExpandedContent={() =>
          automatedPayments(addLoanData.automatedPayments)
        }
      />
      <Accordion
        heading={"Extend Loan After Maturity Until Fully Paid (optional)"}
        renderExpandedContent={() => extendLoan(addLoanData.extendLoan)}
      />
      {/* Save Button */}
      <div className="flex justify-center col-span-4">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all flex items-center"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddLoans;
