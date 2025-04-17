import React from "react";
import InputText from "../Common/InputText/InputText";
import { useOutletContext } from "react-router-dom";

const RecurringFees = () => {
  const { projectData, handleChange } = useOutletContext();

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Recurring Fees
      </h2>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-5`}>
        <InputText
          labelName={"Service Fee"}
          inputName={"serviceFee"}
          inputValue={projectData?.serviceFee}
          onChange={handleChange}
          placeHolder={"Service Fee"}
          isValidation={true}
        />
        <InputText
          labelName={"Management Fee"}
          inputName={"managementFee"}
          inputValue={projectData?.managementFee}
          onChange={handleChange}
          placeHolder={"14%"}
          isValidation={true}
        />
        <InputText
          labelName={"Vat Fee"}
          inputName={"vatFee"}
          inputValue={projectData?.vatFee}
          onChange={handleChange}
          placeHolder={"15%"}
          isValidation={true}
        />
      </div>
    </>
  );
};

export default RecurringFees;
