import React from "react";
import InputText from "../Common/InputText/InputText";
import { useOutletContext } from "react-router-dom";

const UpfrontFee = () => {
  // Sidebar Redux Data
  const { productData, handleChange } = useOutletContext();
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-end py-2 ">
        <InputText
          labelName="Processing Fee"
          inputName="fee"
          inputValue={productData?.fee}
          inputValuePercentage={true}
          onChange={handleChange}
          placeHolder="1%"
          isValidation={true}
        />
        <InputText
          labelName="Application Fee"
          inputName="managementFeeVat"
          inputValue={productData?.managementFeeVat}
          onChange={handleChange}
          placeHolder="15%"
          isValidation={true}
        />
        <InputText
          labelName="Insurance Fee"
          inputName="insuranceFee"
          inputValue={productData?.insuranceFee}
          onChange={handleChange}
          placeHolder="4%"
          isValidation={true}
        />
        <InputText
          labelName="Insurance Levy"
          inputName="insuranceLevy"
          inputValue={productData?.insuranceLevy}
          onChange={handleChange}
          placeHolder="3%"
          isValidation={true}
        />
      </div>
    </div>
  );
};

export default UpfrontFee;
