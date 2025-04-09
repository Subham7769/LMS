import React, { useEffect, useState } from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import Button from "../Common/Button/Button";

import {
  interestMethodOptions,
  options,
  tenureOptions,
  tenureTypeOptions,
} from "../../data/OptionsData";
import { PlusIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addInterestTenure } from "../../redux/Slices/productSlice";
import { hasViewOnlyAccess } from "../../utils/roleUtils";

const ProductInputFields = ({ productData, handleChange }) => {
  // Sidebar Redux Data
  const RACDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "RAC")[0]
        ?.submenuItems
  );
  const DynamicRACDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Decision Engine")[0]
        ?.submenuItems
  );

  const DBRConfigInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "DBR Config")[0]
        ?.submenuItems
  );
  const RPDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Rule Policy")[0]
        ?.submenuItems
  );
  const CSDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Credit Score")[0]
        ?.submenuItems
  );
  const CSETDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter(
        (item) => item.title === "Eligible Tenure"
      )[0]?.submenuItems
  );
  const loanApprovalDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter(
        (item) => item.title === "Approval Config"
      )[0]?.submenuItems
  );
  const documentConfigDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter(
        (item) => item.title === "Document Config"
      )[0]?.submenuItems
  );
  const ProjectDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Loan Schema")[0]
        ?.submenuItems
  );
  const TCLDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "TCL")[0]
        ?.submenuItems
  );
  const RecoveryDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Recovery")[0]
        ?.submenuItems
  );
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.auth);
  const roleName = userData?.roles[0]?.name;

  // console.log(ProjectDataInfo);

  // Entries State
  const [interestEligibleTenure, setInterestEligibleTenure] = useState({
    interestRate: "",
    interestPeriodType: "",
    loanTenure: "",
    loanTenureType: "",
    repaymentTenure: "",
    repaymentTenureType: "",
  });

  const handleChangeInterestEligibleTenure = (e) => {
    const { name, value } = e.target;
    setInterestEligibleTenure((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddFields = () => {
    if (
      Object.values(interestEligibleTenure).every(
        (field) => String(field).trim() !== ""
      )
    ) {
      dispatch(addInterestTenure(interestEligibleTenure));
      setInterestEligibleTenure({
        interestRate: "",
        interestPeriodType: "",
        loanTenure: "",
        loanTenureType: "",
        repaymentTenure: "",
        repaymentTenureType: "",
      });
      return;
    } else {
      toast.error("All Fields Required!");
      return;
    }
  };

  // Reusable function for formatting dropdown data
  function formateDataDropDown(replacerString, data) {
    const formattedData = data?.map(({ name, href }) => ({
      value: href.replace(replacerString, ""),
      label: name,
    }));

    // Append the "None" option to the formatted data
    if (
      replacerString == "/loan/tcl/" ||
      replacerString == "/loan/recovery/" ||
      replacerString == "/loan/blocked-employer/" ||
      replacerString == "/loan/rule-policy/"
    )
      formattedData?.push({
        value: "null",
        label: "None",
      });

    return formattedData;
  }
  useEffect(() => { }, [
    DBRConfigInfo,
    ProjectDataInfo,
    RPDataInfo,
    TCLDataInfo,
    RecoveryDataInfo,
  ]);
  return (
    <div className="flex flex-col gap-5">

      <div className="grid grid-cols-5 gap-5 items-end">
        <InputSelect
          labelName="Eligible Customer Type"
          inputOptions={tenureOptions}
          inputName="eligibleCustomerType"
          inputValue={
            productData?.eligibleCustomerType
              ? productData?.eligibleCustomerType
              : ""
          }
          onChange={handleChange}
          isValidation={true}
          disabled={hasViewOnlyAccess(roleName)}
        />
        <InputSelect
          labelName="RAC"
          inputOptions={formateDataDropDown(
            "/loan/dynamic-rac/",
            RACDataInfo ? RACDataInfo : DynamicRACDataInfo
          )}
          inputName="racId"
          inputValue={productData?.racId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="Loan Schema"
          inputOptions={formateDataDropDown(
            "/loan/project/",
            ProjectDataInfo
          )}
          inputName="projectId"
          inputValue={productData?.projectId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="TCL"
          inputOptions={formateDataDropDown("/loan/tcl/", TCLDataInfo)}
          inputName="tclFileId"
          inputValue={productData?.tclFileId}
          onChange={handleChange}
        // isValidation={true}
        // isClearable={true}
        />
        <InputSelect
          inputOptions={formateDataDropDown(
            "/loan/recovery/",
            RecoveryDataInfo
          )}
          labelName="Recovery Type"
          inputName="recoveryEquationTempId"
          inputValue={productData?.recoveryEquationTempId}
          onChange={handleChange}
        // isValidation={true}
        // isClearable={true}
        />

        <InputSelect
          labelName="DBR Config"
          inputOptions={formateDataDropDown(
            "/loan/dbr-config/",
            DBRConfigInfo
          )}
          inputName="dbcTempId"
          inputValue={productData?.dbcTempId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="Rule Policy"
          inputOptions={formateDataDropDown("/loan/rule-policy/", RPDataInfo)}
          inputName="rulePolicyTempId"
          inputValue={productData?.rulePolicyTempId}
          onChange={handleChange}
        // isValidation={true}
        // isClearable={true}
        />
        <InputSelect
          labelName="Credit Score"
          inputOptions={formateDataDropDown(
            "/loan/credit-score/",
            CSDataInfo
          )}
          inputName="creditScoreEqTempId"
          inputValue={productData?.creditScoreEqTempId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="Eligible Tenure"
          inputOptions={formateDataDropDown(
            "/loan/credit-score-eligible-tenure/",
            CSETDataInfo
          )}
          inputName="creditScoreEtTempId"
          inputValue={productData?.creditScoreEtTempId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="Approval Config"
          inputOptions={formateDataDropDown(
            "/loan/loan-approval/",
            loanApprovalDataInfo
          )}
          inputName="approvalsConfigurationsTempId"
          inputValue={productData?.approvalsConfigurationsTempId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="Document Config"
          inputOptions={formateDataDropDown(
            "/loan/document-config/",
            documentConfigDataInfo
          )}
          inputName="dynamicDocumentTempId"
          inputValue={productData?.dynamicDocumentTempId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputNumber
          labelName="No. of Early Settlement Installments"
          inputName="numberOfEmisForEarlySettlement"
          inputValue={productData?.numberOfEmisForEarlySettlement}
          onChange={handleChange}
          placeHolder="3"
          isValidation={true}
        />
        <InputSelect
          labelName="Interest Method"
          inputOptions={interestMethodOptions}
          inputName="interestMethod"
          inputValue={productData?.interestMethod}
          onChange={handleChange}
          isValidation={true}
        />
      </div>

      {/* Upfront Fee */}
      <div>
        <span className="p-2 py-1 block w-fit bg-gray-200 rounded-t-md">Upfront Fee</span>
        <div className="border-t-2">
          <div className="grid grid-cols-5 gap-5 items-end py-2 ">
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
              labelName="Application Fee Vat"
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
      </div>

      {/* Options */}
      <div>
        <span className="p-2 py-1 block w-fit bg-gray-200 rounded-t-md">Options</span>
        <div className="border-t-2 py-2">
          <div className="grid grid-cols-5 gap-5 items-end py-2 ">
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


      {!hasViewOnlyAccess(roleName) ? (
        <div className="grid grid-cols-7 gap-5 items-end border-t-2 py-5">
          <InputText
            labelName="Simple Interest"
            inputName="interestRate"
            inputValue={interestEligibleTenure?.interestRate}
            onChange={handleChangeInterestEligibleTenure}
            placeHolder="2%"
          />
          <InputSelect
            labelName="Per"
            inputOptions={tenureTypeOptions}
            inputName="interestPeriodType"
            inputValue={interestEligibleTenure?.interestPeriodType}
            onChange={handleChangeInterestEligibleTenure}
          />
          <InputNumber
            labelName="Tenure"
            inputName="loanTenure"
            inputValue={interestEligibleTenure?.loanTenure}
            onChange={handleChangeInterestEligibleTenure}
            placeHolder="3"
          />
          <InputSelect
            labelName="Tenure Type"
            inputValue={interestEligibleTenure?.loanTenureType}
            inputOptions={tenureTypeOptions}
            inputName="loanTenureType"
            onChange={handleChangeInterestEligibleTenure}
          />
          <InputNumber
            labelName="Repayment Tenure"
            inputName="repaymentTenure"
            inputValue={interestEligibleTenure?.repaymentTenure}
            onChange={handleChangeInterestEligibleTenure}
            placeHolder="0"
          />
          <InputSelect
            labelName="Repayment Tenure Type"
            inputName="repaymentTenureType"
            inputOptions={tenureTypeOptions}
            inputValue={interestEligibleTenure?.repaymentTenureType}
            onChange={handleChangeInterestEligibleTenure}
          />
          <div className="flex justify-center align-middle">
            <Button
              buttonIcon={PlusIcon}
              onClick={handleAddFields}
              circle={true}
              buttonType="secondary"
            />
          </div>
        </div>
      ) : (
        ""
      )
      }
    </div>
  );
};

export default ProductInputFields;
