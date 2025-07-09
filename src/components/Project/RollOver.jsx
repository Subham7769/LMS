import React from "react";
import { tenureTypeOptions } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import { useOutletContext } from "react-router-dom";

const RollOver = () => {
  const { projectData, handleChange } = useOutletContext();

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Roll Over
      </h2>
      <div className={"grid grid-cols-1 md:grid-cols-3 gap-5 mb-5"}>
        {/* Roll Over Interest Rate */}
        <InputNumber
          labelName={"Interest"}
          inputName={"rollOverInterestRate"}
          inputValue={projectData?.rollOverInterestRate}
          onChange={handleChange}
          inputValuePercentage={true}
          placeHolder={"6"}
          isValidation={true}
        />

        <InputNumber
          labelName="Tenure"
          inputName="rollOverTenure"
          inputValue={projectData?.rollOverTenure}
          onChange={handleChange}
          placeHolder="3"
        />
        <InputSelect
          labelName="Tenure Type"
          inputName="rollOverTenureType"
          inputValue={projectData?.rollOverTenureType}
          inputOptions={tenureTypeOptions}
          onChange={handleChange}
        />

        {/* Roll Over Period (Days) */}
        <InputNumber
          labelName={"Period (Days)"}
          inputName={"rollOverGracePeriod"}
          inputValue={projectData?.rollOverGracePeriod}
          onChange={handleChange}
          placeHolder={"30"}
          isValidation={true}
        />
        {/* RollOver Penalty Factor */}
        <InputText
          labelName={"Fixed Price"}
          inputName={"rollOverPenaltyFactor"}
          inputValue={projectData?.rollOverPenaltyFactor}
          onChange={handleChange}
          placeHolder={"0"}
          isValidation={true}
        />
      </div>
    </>
  );
};

export default RollOver;
