import React from "react";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useOutletContext } from "react-router-dom";

const LatePenalty = () => {
  const { projectData, handleChange } = useOutletContext();

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Late Penalty
      </h2>
      <div className={"grid grid-cols-1 md:grid-cols-3 gap-5 mb-5"}>
        {/* Late EMI Penalty */}
        <InputText
          labelName={"Late EMI Penalty"}
          inputName={"lateEmiPenaltyFactor"}
          inputValue={projectData?.lateEmiPenaltyFactor}
          onChange={handleChange}
          placeHolder={"6"}
          isValidation={true}
        />
        {/* Late Repayment Penalty */}
        <InputText
          labelName={"Late Repayment Penalty (%)"}
          inputName={"lateRepaymentPenalty"}
          inputValue={projectData?.lateRepaymentPenalty}
          onChange={handleChange}
          placeHolder={"10"}
          isValidation={true}
        />
        {/* Late Penalty Period  */}
        <InputNumber
          labelName={"Penalty Period (Days)"}
          inputName={"latePenaltyPeriod"}
          inputValue={projectData?.latePenaltyPeriod}
          onChange={handleChange}
          placeHolder={"30"}
          isValidation={true}
        />
        {/* Early Repayment Discount */}
        <InputText
          labelName={"Early Repayment Discount"}
          inputName={"earlyRepaymentDiscount"}
          inputValue={projectData?.earlyRepaymentDiscount}
          onChange={handleChange}
          placeHolder={"0"}
          isValidation={true}
        />
      </div>
    </>
  );
};

export default LatePenalty;
