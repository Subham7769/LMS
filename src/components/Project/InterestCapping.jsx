import React from "react";
import { interestPeriodOptions } from "../../data/OptionsData";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import { useOutletContext } from "react-router-dom";

const InterestCapping = () => {
  const { projectData, handleChange } = useOutletContext();

  // console.log(projectData)

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Interest Capping
      </h2>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-5`}>
        {/* Flat Interest Rate */}
        <InputNumber
          labelName={"Flat Interest Rate"}
          inputName={"flatInterestRate"}
          inputValue={projectData?.flatInterestRate}
          onChange={handleChange}
          inputValuePercentage={true}
          placeHolder={"6"}
          isValidation={true}
        />

        {/* Interest Period Unit */}
        <InputSelect
          labelName={"Interest Period Unit"}
          inputName={"interestPeriodUnit"}
          inputOptions={interestPeriodOptions}
          inputValue={projectData?.interestPeriodUnit}
          onChange={handleChange}
          isValidation={true}
        />

        {/* Interest Rate Period */}
        <InputNumber
          labelName={"Interest Rate Period"}
          inputName={"interestRatePeriod"}
          inputValue={projectData?.interestRatePeriod}
          onChange={handleChange}
          placeHolder={"30"}
          isValidation={true}
        />

        <InputNumber
          labelName={"Max Attempts"}
          inputName={"maxPaymetAttemps"}
          inputValue={projectData?.maxPaymetAttemps}
          onChange={handleChange}
          placeHolder={"2"}
          isValidation={true}
        />
        <InputNumber
          labelName={"Total Open Loans"}
          inputName={"openLoanAmount"}
          inputValue={projectData?.openLoanAmount}
          onChange={handleChange}
          placeHolder={"2"}
          isValidation={true}
        />
      </div>
    </>
  );
};

export default InterestCapping;
