import React from "react";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import { useOutletContext } from "react-router-dom";

const Options = () => {
  const { productData, handleChange } = useOutletContext();
  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="p-2 py-1 block w-fit bg-gray-200 rounded-t-md">
          Options
        </span>
        <div className="border-t-2 py-2">
          <div className="grid grid-cols-6 gap-5 items-end py-2 ">
            <InputCheckbox
              labelName="Overdraft"
              inputChecked={productData?.overdraft}
              onChange={handleChange}
              inputName="overdraft"
            />

            <InputCheckbox
              labelName="Refinanced With"
              inputChecked={productData?.refinancedWith}
              onChange={handleChange}
              inputName="refinancedWith"
            />
            <InputCheckbox
              labelName="RTN"
              inputChecked={false}
              onChange={() => {}}
              inputName="refinancedWith"
            />
            <InputCheckbox
              labelName="Disable RAC"
              inputChecked={productData?.disableRac}
              onChange={handleChange}
              inputName="disableRac"
            />
            <InputCheckbox
              labelName="oneSettleLoan"
              inputChecked={productData?.oneSettleLoan}
              onChange={handleChange}
              inputName="oneSettleLoan"
            />
            <InputCheckbox
              labelName="Advance Discount"
              inputChecked={productData?.advanceDiscount}
              onChange={handleChange}
              inputName="advanceDiscount"
            />
          </div>
          {/* Newly added fields */}
          {productData?.overdraft && (
            <div className="grid grid-cols-5 gap-5 items-end ">
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
      </div>
    </div>
  );
};

export default Options;
