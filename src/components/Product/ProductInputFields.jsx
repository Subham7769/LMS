import React, { useEffect, useState } from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import Button from "../Common/Button/Button";

import {
  options,
  tenureOptions,
  tenureTypeOptions,
} from "../../data/OptionsData";
import { PlusIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { Failed } from "../Toasts";
import { useDispatch, useSelector } from "react-redux";
import { addInterestTenure } from "../../redux/Slices/productSlice";

const ProductInputFields = ({ formData, handleChange }) => {
  // Sidebar Redux Data
  const RACDataInfo = useSelector(
    (state) =>
      state.sidebar.menus.filter((item) => item.title === "RAC")[0].submenuItems
  );
  const DBRConfigInfo = useSelector(
    (state) =>
      state.sidebar.menus.filter((item) => item.title === "DBR Config")[0]
        .submenuItems
  );
  const BEDataInfo = useSelector(
    (state) =>
      state.sidebar.menus.filter((item) => item.title === "Blocked Employer")[0]
        .submenuItems
  );
  const RPDataInfo = useSelector(
    (state) =>
      state.sidebar.menus.filter((item) => item.title === "Rule Policy")[0]
        .submenuItems
  );
  const CSDataInfo = useSelector(
    (state) =>
      state.sidebar.menus.filter((item) => item.title === "Credit Score")[0]
        .submenuItems
  );
  const CSETDataInfo = useSelector(
    (state) =>
      state.sidebar.menus.filter(
        (item) => item.title === "Credit Score Eligible Tenure"
      )[0].submenuItems
  );
  const ProjectDataInfo = useSelector(
    (state) =>
      state.sidebar.menus.filter((item) => item.title === "Project")[0]
        .submenuItems
  );
  const TCLDataInfo = useSelector(
    (state) =>
      state.sidebar.menus.filter((item) => item.title === "TCL")[0].submenuItems
  );
  const RecoveryDataInfo = useSelector(
    (state) =>
      state.sidebar.menus.filter((item) => item.title === "Recovery")[0]
        .submenuItems
  );

  const dispatch = useDispatch();

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
      toast.custom((t) => (
        <Failed
          t={t}
          toast={toast}
          title={"Failed"}
          message={"All Fields Required!"}
        />
      ));
      return;
    }
  };

  // Reusable function for formatting dropdown data
  function formateDataDropDown(replacerString, data) {
    return data.map(({ name, href }) => ({
      value: href.replace(replacerString, ""),
      label: name,
    }));
  }
  useEffect(() => {}, [
    DBRConfigInfo,
    ProjectDataInfo,
    BEDataInfo,
    RPDataInfo,
    TCLDataInfo,
    RecoveryDataInfo,
  ]);
  return (
    <>
      <div className="border-b border-gray-300 pb-5">
        <div className="grid grid-cols-5 gap-5 items-end pb-2">
          <InputSelect
            labelName="Eligible Customer Type"
            inputOptions={tenureOptions}
            inputName="eligibleCustomerType"
            inputValue={
              formData.eligibleCustomerType ? formData.eligibleCustomerType : ""
            }
            onChange={handleChange}
          />
          <InputSelect
            labelName="RAC"
            inputOptions={formateDataDropDown("/newrac/", RACDataInfo)}
            inputName="racId"
            inputValue={formData.racId}
            onChange={handleChange}
          />
          <InputSelect
            labelName="Project"
            inputOptions={formateDataDropDown("/project/", ProjectDataInfo)}
            inputName="projectId"
            inputValue={formData.projectId}
            onChange={handleChange}
          />
          <InputSelect
            labelName="TCL"
            inputOptions={formateDataDropDown("/tcl/", TCLDataInfo)}
            inputName="tclFileId"
            inputValue={formData.tclFileId}
            onChange={handleChange}
          />
          <InputSelect
            inputOptions={formateDataDropDown("/recovery/", RecoveryDataInfo)}
            labelName="Recovery Type"
            inputName="recoveryEquationTempId"
            inputValue={formData.recoveryEquationTempId}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-5 gap-5 items-end mb-4">
          <InputSelect
            labelName="DBR Config"
            inputOptions={formateDataDropDown("/newdbc/", DBRConfigInfo)}
            inputName="dbcTempId"
            inputValue={formData.dbcTempId}
            onChange={handleChange}
          />
          <InputSelect
            labelName="Blocked Employer"
            inputOptions={formateDataDropDown("/blocked-employer/", BEDataInfo)}
            inputName="blockEmployersTempId"
            inputValue={formData.blockEmployersTempId}
            onChange={handleChange}
          />
          <InputSelect
            labelName="Rule Policy"
            inputOptions={formateDataDropDown("/rule-policy/", RPDataInfo)}
            inputName="rulePolicyTempId"
            inputValue={formData.rulePolicyTempId}
            onChange={handleChange}
          />
          <InputSelect
            labelName="Credit Score"
            inputOptions={formateDataDropDown("/credit-score/", CSDataInfo)}
            inputName="creditScoreEqTempId"
            inputValue={formData.creditScoreEqTempId}
            onChange={handleChange}
          />
          <InputSelect
            labelName="Eligible Tenure"
            inputOptions={formateDataDropDown(
              "/credit-score-eligible-tenure/",
              CSETDataInfo
            )}
            inputName="creditScoreEtTempId"
            inputValue={formData.creditScoreEtTempId}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-5 gap-5 items-end">
          <InputText
            labelName="Processing Fee"
            inputName="fee"
            inputValue={formData.fee}
            onChange={handleChange}
            placeHolder="1%"
          />
          <InputText
            labelName="Management Fee Vat"
            inputName="managementFeeVat"
            inputValue={formData.managementFeeVat}
            onChange={handleChange}
            placeHolder="15%"
          />
          <InputNumber
            labelName="No. of Installments For Early Settlement"
            inputName="numberOfEmisForEarlySettlement"
            inputValue={formData.numberOfEmisForEarlySettlement}
            onChange={handleChange}
            placeHolder="3"
          />
          <InputCheckbox
            labelName="Overdraft"
            inputChecked={formData.overdraft}
            onChange={handleChange}
            inputName="overdraft"
          />
          <InputCheckbox
            labelName="Refinanced With"
            inputChecked={formData.refinancedWith}
            onChange={handleChange}
            inputName="refinancedWith"
          />
          <InputCheckbox
            labelName="Disable RAC"
            inputChecked={formData.disableRac}
            onChange={handleChange}
            inputName="disableRac"
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-5 items-end mt-5 border-b pb-5">
        <InputText
          labelName="Simple Interest"
          inputName="interestRate"
          inputValue={interestEligibleTenure.interestRate}
          onChange={handleChangeInterestEligibleTenure}
          placeHolder="2%"
        />
        <InputSelect
          labelName="Per"
          inputOptions={options}
          inputName="interestPeriodType"
          inputValue={interestEligibleTenure.interestPeriodType}
          onChange={handleChangeInterestEligibleTenure}
        />
        <InputNumber
          labelName="Tenure"
          inputName="loanTenure"
          inputValue={interestEligibleTenure.loanTenure}
          onChange={handleChangeInterestEligibleTenure}
          placeHolder="3"
        />
        <InputSelect
          labelName="Tenure Type"
          inputValue={interestEligibleTenure.loanTenureType}
          inputOptions={tenureTypeOptions}
          inputName="loanTenureType"
          onChange={handleChangeInterestEligibleTenure}
        />
        <InputNumber
          labelName="Repayment Tenure"
          inputName="repaymentTenure"
          inputValue={interestEligibleTenure.repaymentTenure}
          onChange={handleChangeInterestEligibleTenure}
          placeHolder="0"
        />
        <InputSelect
          labelName="Repayment Tenure Type"
          inputName="repaymentTenureType"
          inputOptions={tenureTypeOptions}
          inputValue={interestEligibleTenure.repaymentTenureType}
          onChange={handleChangeInterestEligibleTenure}
        />
        <div className="flex justify-center align-middle">
          <Button
            buttonIcon={PlusIcon}
            onClick={handleAddFields}
            circle={true}
          />
        </div>
      </div>
    </>
  );
};

export default ProductInputFields;
