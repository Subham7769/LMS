import React from "react";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useOutletContext } from "react-router-dom";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch";

const Options = () => {
  const { productData, handleChange } = useOutletContext();
  return (
    <div className="flex flex-col gap-5">
      <section>
        <ul>
          <ToggleSwitch
            label="Overdraft"
            description="Enable overdraft for this product."
            inputName="overdraft"
            inputChecked={productData?.overdraft}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Refinanced With"
            description="Indicates whether the loan is refinanced."
            inputName="refinancedWith"
            inputChecked={productData?.refinancedWith}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Disable RAC"
            description="Disable Risk Assessment Configuration."
            inputName="disableRac"
            inputChecked={productData?.disableRac}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="One Settle Loan"
            description="Allows only one settled loan per applicant."
            inputName="oneSettleLoan"
            inputChecked={productData?.oneSettleLoan}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Advance Discount"
            description="Enable discount on early payment."
            inputName="advanceDiscount"
            inputChecked={productData?.advanceDiscount}
            onChange={handleChange}
          />
        </ul>
      </section>
      {/* Newly added fields */}
      {productData?.overdraft && (
        <div className="grid grid-cols-3 gap-5 items-end ">
          <InputNumber
            labelName="Max. Overdraft Principle Limit"
            inputName="maxOverdraftPrincipalLimit"
            inputValue={productData?.maxOverdraftPrincipalLimit}
            onChange={handleChange}
            placeHolder="3"
          />

          <InputNumber
            labelName="Min. Overdraft Principle Limit"
            inputName="minOverdraftPrincipalLimit"
            inputValue={productData?.minOverdraftPrincipalLimit}
            onChange={handleChange}
            placeHolder="3"
          />

          <InputText
            labelName="Annual Fee"
            inputName="annualFee"
            inputValue={productData?.annualFee}
            onChange={handleChange}
            placeHolder="3"
          />

          <InputNumber
            labelName="Overdraft Product Period"
            inputName="overdraftProductPeriod"
            inputValue={productData?.overdraftProductPeriod}
            onChange={handleChange}
            placeHolder="3"
          />

          <InputNumber
            labelName="Overdraft Payment Principle Percentage"
            inputName="overDraftPaymentPrinciplePercentage"
            inputValue={productData?.overDraftPaymentPrinciplePercentage}
            onChange={handleChange}
            placeHolder="3"
          />
        </div>
      )}
    </div>
  );
};

export default Options;
