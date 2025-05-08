import React from "react";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useOutletContext } from "react-router-dom";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch";

const AdditionalSettings = () => {
  const { projectData, handleChange, clientIdsString, setClientIdsString } =
    useOutletContext();

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Additional Settings
      </h2>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 mb-5`}>
        <InputNumber
          labelName={"Loan Schema TCL"}
          toolTipText="Total Credit Limit (TCL) for the loan schema. This defines the maximum amount available to the borrower under this schema."
          inputName={"tclAmount"}
          inputValue={projectData?.tclAmount}
          onChange={handleChange}
          placeHolder={"2"}
          isValidation={true}
        />
        <InputText
          labelName={"Client Ids"}
          toolTipText="These are used for token generation, system identification and integration."
          inputName={"clientIds"}
          inputValue={clientIdsString}
          onChange={(e) => setClientIdsString(e.target.value)}
          placeHolder={"DEV-lmsClient"}
          isValidation={true}
        />
      </div>
      <section>
        <ul>
          <ToggleSwitch
            label="Early/Late Repayment"
            description="Enable configuration for early or late repayments."
            inputName="hasEarlyLateRepayment"
            inputChecked={projectData.hasEarlyLateRepayment}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Calculate Interest"
            description="Enable interest calculation for this product."
            inputName="calculateInterest"
            inputChecked={projectData.calculateInterest}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Include Fee in TCL"
            description="Include applicable fees in the Total Credit Limit."
            inputName="tclIncludeFee"
            inputChecked={projectData.tclIncludeFee}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Include Interest in TCL"
            description="Include calculated interest in the Total Credit Limit."
            inputName="tclIncludeInterest"
            inputChecked={projectData.tclIncludeInterest}
            onChange={handleChange}
          />
        </ul>
      </section>
    </>
  );
};

export default AdditionalSettings;
