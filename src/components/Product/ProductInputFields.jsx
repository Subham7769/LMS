import React, { useEffect, useState } from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import Button from "../Common/Button/Button";

import useAllProjectInfo from "../../utils/useAllProjectInfo";
import useDBInfo from "../../utils/useDBInfo";
import useBEInfo from "../../utils/useBEInfo";
import useCreditScoreEq from "../../utils/useCreditScoreEq";
import useRulePolicy from "../../utils/useRulePolicy";
import useRecoveryInfo from "../../utils/useRecoveryInfo";
import useTCLInfo from "../../utils/useTCLInfo";
import useRACInfo from "../../utils/useRACInfo";
import {
  options,
  tenureOptions,
  tenureTypeOptions,
} from "../../data/OptionsData";
import { PlusIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { Failed } from "../Toasts";
import { useCreditScoreEligibleTenure } from "../../utils/useCreditScoreEligibleTenure";

const ProductInputFields = ({ formData, handleChange, setFormData }) => {
  // Custom Hooks
  const RACDataInfo = useRACInfo();
  const DBRConfigInfo = useDBInfo();
  const BEDataInfo = useBEInfo();
  const RPDataInfo = useRulePolicy();
  const CSDataInfo = useCreditScoreEq();
  const CSETDataInfo = useCreditScoreEligibleTenure();
  const ProjectDataInfo = useAllProjectInfo();
  const TCLDataInfo = useTCLInfo();
  const RecoveryDataInfo = useRecoveryInfo();

  // Options
  const [dbrOptions, setDbrOptions] = useState([]);
  const [beOptions, setBeOptions] = useState([]);
  const [rpOptions, setRpOptions] = useState([]);
  const [csOptions, setCsOptions] = useState([]);
  const [csETOptions, setCsETOptions] = useState([]);
  const [racOptions, setRacOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [TCLOptions, setTCLOptions] = useState([]);
  const [recoveryOptions, setRecoveryOptions] = useState([]);

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
      setFormData((prevFormData) => ({
        ...prevFormData,
        interestEligibleTenure: [
          ...prevFormData.interestEligibleTenure,
          interestEligibleTenure,
        ],
      }));
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

  useEffect(() => {
    const formattedRACData = RACDataInfo.map(({ name, href }) => ({
      value: href.replace("/newrac/", ""),
      label: name,
    }));
    const formattedCSData = CSDataInfo.map(({ name, href }) => ({
      value: href.replace("/credit-score/", ""),
      label: name,
    }));
    const formattedCSETData = CSETDataInfo.map(({ name, href }) => ({
      value: href.replace("/credit-score-eligible-tenure/", ""),
      label: name,
    }));
    const finalData = DBRConfigInfo.map(({ name, href }) => ({
      value: href.replace("/newdbc/", ""),
      label: name,
    }));
    const formattedProjectData = ProjectDataInfo.map(({ name, href }) => ({
      value: href.replace("/project/", ""),
      label: name,
    }));
    const formattedBEData = BEDataInfo.map(({ name, href }) => ({
      value: href.replace("/blocked-employer/", ""),
      label: name,
    }));
    const rpData = RPDataInfo.map(({ name, href }) => ({
      value: href.replace("/rule-policy/", ""),
      label: name,
    }));
    const formattedTCLData = TCLDataInfo.map(({ name, href }) => ({
      value: href.replace("/tcl/", ""),
      label: name,
    }));
    const RecoveryData = RecoveryDataInfo.map(({ name, href }) => ({
      value: href.replace("/recovery/", ""),
      label: name,
    }));

    setRecoveryOptions(RecoveryData);
    setRacOptions(formattedRACData);
    setDbrOptions(finalData);
    setProjectOptions(formattedProjectData);
    setBeOptions(formattedBEData);
    setRpOptions(rpData);
    setCsOptions(formattedCSData);
    setCsETOptions(formattedCSETData);
    setTCLOptions(formattedTCLData);
  }, [
    RACDataInfo,
    DBRConfigInfo,
    ProjectDataInfo,
    BEDataInfo,
    RPDataInfo,
    CSDataInfo,
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
            isSearchable={false}
          />
          <InputSelect
            labelName="RAC"
            inputOptions={racOptions}
            inputName="racId"
            inputValue={formData.racId}
            onChange={handleChange}
            isSearchable={false}
          />
          <InputSelect
            labelName="Project"
            inputOptions={projectOptions}
            inputName="projectId"
            inputValue={formData.projectId}
            onChange={handleChange}
            isSearchable={false}
          />
          <InputSelect
            labelName="TCL"
            inputOptions={TCLOptions}
            inputName="tclFileId"
            inputValue={formData.tclFileId}
            onChange={handleChange}
            isSearchable={false}
          />
          <InputSelect
            inputOptions={recoveryOptions}
            labelName="Recovery Type"
            inputName="recoveryEquationTempId"
            isSearchable={false}
            inputValue={formData.recoveryEquationTempId}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-5 gap-5 items-end mb-4">
          <InputSelect
            labelName="DBR Config"
            inputOptions={dbrOptions}
            inputName="dbcTempId"
            inputValue={formData.dbcTempId}
            onChange={handleChange}
            isSearchable={false}
          />
          <InputSelect
            labelName="Blocked Employer"
            inputOptions={beOptions}
            inputName="blockEmployersTempId"
            inputValue={formData.blockEmployersTempId}
            onChange={handleChange}
            isSearchable={false}
          />
          <InputSelect
            labelName="Rule Policy"
            inputOptions={rpOptions}
            inputName="rulePolicyTempId"
            inputValue={formData.rulePolicyTempId}
            onChange={handleChange}
            isSearchable={false}
          />
          <InputSelect
            labelName="Credit Score Rule"
            inputOptions={csOptions}
            inputName="creditScoreEqTempId"
            inputValue={formData.creditScoreEqTempId}
            onChange={handleChange}
            isSearchable={false}
          />
          <InputSelect
            labelName="Credit Score Eligible Tenure"
            inputOptions={csETOptions}
            inputName="creditScoreEtTempId"
            inputValue={formData.creditScoreEtTempId}
            onChange={handleChange}
            isSearchable={false}
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
          inputOptions={tenureTypeOptions}
          inputName="loanTenureType"
          isSearchable={false}
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
