import React from "react";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useOutletContext } from "react-router-dom";

const GracePeriod = () => {
  const { projectData, handleChange } = useOutletContext();

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Grace Period
      </h2>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-5`}>
        {/* Grace Period For Down Payment (Days) */}
        <InputNumber
          labelName={"Down Payment Grace (Days)"}
          inputName={"downRepaymentGracePeriod"}
          inputValue={projectData?.downRepaymentGracePeriod}
          onChange={handleChange}
          placeHolder={"30"}
          isValidation={true}
        />

        {/* Grace Period For EMIs (Days) */}
        <InputNumber
          labelName={"EMIs Grace (Days)"}
          inputName={"emiRepaymentGracePeriod"}
          inputValue={projectData?.emiRepaymentGracePeriod}
          onChange={handleChange}
          placeHolder={"30"}
          isValidation={true}
        />

        {/* Loan Grace Period (Days) */}
        <InputNumber
          labelName={"Loan Grace (Days)"}
          inputName={"loanGracePeriod"}
          inputValue={projectData?.loanGracePeriod}
          onChange={handleChange}
          placeHolder={"30"}
          isValidation={true}
        />
      </div>
    </>
  );
};

export default GracePeriod;
