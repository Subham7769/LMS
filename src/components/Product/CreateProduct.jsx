import useRACInfo from "../../utils/useRACInfo";
import { useEffect, useState } from "react";
import {
  PlusIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import useAllProjectInfo from "../../utils/useAllProjectInfo";
import useDBInfo from "../../utils/useDBInfo";
import useBEInfo from "../../utils/useBEInfo";
import useCreditScoreEq from "../../utils/useCreditScoreEq";
import useRulePolicy from "../../utils/useRulePolicy";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import InputNumber from "../Common/InputNumber/InputNumber";
import useTCLInfo from "../../utils/useTCLInfo";
import Button from "../Common/Button/Button";

import {
  options,
  tenureOptions,
  recoveryOptions,
  tenureTypeOptions,
} from "../../data/OptionsData";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { productName } = useParams();
  // Custom Hooks
  const RACDataInfo = useRACInfo();
  const DBRConfigInfo = useDBInfo();
  const BEDataInfo = useBEInfo();
  const RPDataInfo = useRulePolicy();
  const CSDataInfo = useCreditScoreEq();
  const ProjectDataInfo = useAllProjectInfo();
  const TCLDataInfo = useTCLInfo();


  const [formData, setFormData] = useState({
    id:"0",
    blockEmployersTempId: "",
    creditScoreEqTempId: "",
    creditScoreEtTempId: "663c8ec2-33fd-4388-8c46-695098bdbd74",
    dbcTempId: "",
    disableRac: false,
    eligibleCustomerType: "",
    fee: "",
    interestEligibleTenure: [],
    loanProductId:"0",
    managementFeeVat: "",
    numberOfEmisForEarlySettlement: "",
    productType: productName,
    projectId: "",
    racId: "",
    refinancedWith: false,
    rulePolicyTempId: "",
    tclFileId: "",
  });

  // Options
  const [dbrOptions, setDbrOptions] = useState([]);
  const [beOptions, setBeOptions] = useState([]);
  const [rpOptions, setRpOptions] = useState([]);
  const [csOptions, setCsOptions] = useState([]);
  const [racOptions, setRacOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [TCLOptions, setTCLOptions] = useState([]);


  // Entries State
  const [interestEligibleTenure, setInterestEligibleTenure] = useState(
    {
      interestRate: "",
      interestPeriodType: "",
      loanTenure: "",
      loanTenureType: "",
      repaymentTenure: "",
      repaymentTenureType: ""
    })

  const handleChangeInterestEligibleTenure = (e) => {
    const { name, value } = e.target;
    setInterestEligibleTenure((prevState) => ({ ...prevState, [name]: value }));
  }
  useEffect(() => {
    const formattedRACData = RACDataInfo.map(({ name, href }) => ({
      value: href.replace("/newrac/", ""),
      label: name,
    }));
    const formattedCSData = CSDataInfo.map(({ name, href }) => ({
      value: href.replace("/credit-score/", ""),
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

    setRacOptions(formattedRACData);
    setDbrOptions(finalData);
    setProjectOptions(formattedProjectData);
    setBeOptions(formattedBEData);
    setRpOptions(rpData);
    setCsOptions(formattedCSData);
    setTCLOptions(formattedTCLData);

  }, [
    RACDataInfo,
    DBRConfigInfo,
    ProjectDataInfo,
    BEDataInfo,
    RPDataInfo,
    CSDataInfo,
    TCLDataInfo,
  ]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
      console.log(formData);
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
      console.log(formData);
    }
  };

  const handleAddFields = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      interestEligibleTenure: [...prevFormData.interestEligibleTenure, interestEligibleTenure],
    }));
    setInterestEligibleTenure(
      {
        interestRate: "",
        interestPeriodType: "",
        loanTenure: "",
        loanTenureType: "",
        repaymentTenure: "",
        repaymentTenureType: ""
      })
  };

  const handleDelete = (index) => {
    const deleteList = [...formData.interestEligibleTenure];
    deleteList.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      interestEligibleTenure: deleteList,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    try {
      // Filter out objects with empty fields
      const filteredInterestEligibleTenure =
        formData.interestEligibleTenure.filter(
          (item) => item.interestRate &&
            item.interestPeriodType &&
            item.loanTenure &&
            item.loanTenureType &&
            item.repaymentTenure &&
            item.repaymentTenureType
        );
      const { recoveryType, ...postData } = { ...formData }
      // Create a copy of formData with filtered interestEligibleTenure
      const filteredFormData = {
        ...postData,
        interestEligibleTenure: filteredInterestEligibleTenure,
      };

      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filteredFormData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Success"}
            message={"Product Created Successfully !!"}
          />
        ));
        setTimeout(() => {
          navigate("/product/");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  console.log(formData)

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-5">
        <b
          title={productName}
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          {productName}
        </b>
      </h2>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="border-b border-gray-300 pb-5">
          <div className="grid grid-cols-5 gap-5 items-end pb-2">
            <div className="relative">
              <InputSelect
                labelName="Eligible Customer Type"
                inputOptions={tenureOptions}
                inputName="eligibleCustomerType"
                inputValue={
                  formData.eligibleCustomerType
                    ? formData.eligibleCustomerType
                    : ""
                }
                onChange={handleChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="RAC"
                inputOptions={racOptions}
                inputName="racId"
                inputValue={formData.racId}
                onChange={handleChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Project"
                inputOptions={projectOptions}
                inputName="projectId"
                inputValue={formData.projectId}
                onChange={handleChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="TCL"
                inputOptions={TCLOptions}
                inputName="tclFileId"
                inputValue={formData.tclFileId}
                onChange={handleChange}
                isSearchable={false}
              />
            </div>
            <div className="relative mt-1">
              <InputSelect
                inputOptions={recoveryOptions}
                labelName="Recovery Type"
                inputName="recoveryType"
                inputValue={formData.recoveryType}
                onChange={handleChange}
                isSearchable={false}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 items-end mb-4">
            <div className="relative">
              <InputSelect
                labelName="DBR Config"
                inputOptions={dbrOptions}
                inputName="dbcTempId"
                inputValue={formData.dbcTempId}
                onChange={handleChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Blocked Employer"
                inputOptions={beOptions}
                inputName="blockEmployersTempId"
                inputValue={formData.blockEmployersTempId}
                onChange={handleChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Rule Policy"
                inputOptions={rpOptions}
                inputName="rulePolicyTempId"
                inputValue={formData.rulePolicyTempId}
                onChange={handleChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Credit Score Rule"
                inputOptions={csOptions}
                inputName="creditScoreEqTempId"
                inputValue={formData.creditScoreEqTempId}
                onChange={handleChange}
                isSearchable={false}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 items-end">
            <div className="relative mt-4">
              <InputText
                labelName="Processing Fee"
                inputName="fee"
                inputValue={formData.fee}
                onChange={handleChange}
                placeHolder="1%"
              />
            </div>
            <div className="relative mt-4">
              <InputText
                labelName="Management Fee Vat"
                inputName="managementFeeVat"
                inputValue={formData.managementFeeVat}
                onChange={handleChange}
                placeHolder="15%"
              />
            </div>
            <div className="relative mt-4">
              <InputNumber
                labelName="No. of Installments For Early Settlement"
                inputName="numberOfEmisForEarlySettlement"
                inputValue={formData.numberOfEmisForEarlySettlement}
                onChange={handleChange}
                placeHolder="3"
              />
            </div>

            <div className="relative mb-2">
              <InputCheckbox
                labelName="Refinanced With"
                inputChecked={formData.refinancedWith}
                onChange={handleChange}
                inputName="refinancedWith"
              />
            </div>
            <div className="relative mb-2">
              <InputCheckbox
                labelName="Disable RAC"
                inputChecked={formData.disableRac}
                onChange={handleChange}
                inputName="disableRac"
              />
            </div>
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
            <Button buttonIcon={PlusIcon} onClick={handleAddFields} circle={true} />
          </div>

        </div>
        <div>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Simple Interest",
                  "PER",
                  "Tenure",
                  "Tenure Type",
                  "Repayment Tenure",
                  "Repayment Tenure Type",
                  "Actions",
                ].map((item, index) => (
                  <th scope="col" key={index}>
                    <div className={`py-3 text-center text-[12px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer`}>
                      {item}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.interestEligibleTenure.length < 1 ||
                formData.interestEligibleTenure.every(
                  (item) => !item.interestRate && !item.interestPeriodType && !item.loanTenure && !item.loanTenureType && !item.repaymentTenure && !item.repaymentTenureType
                ) ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Data To Show Yet
                  </td>
                </tr>
              ) : (
                formData.interestEligibleTenure
                  .filter((item) => item.interestRate && item.interestPeriodType && item.loanTenure && item.loanTenureType && item.repaymentTenure && item.repaymentTenureType)
                  .map((item, index) => (
                    <tr key={index} className="text-gray-900 text-sm sm:text-sm sm:leading-6 text-center">
                      <td className="py-2 whitespace-nowrap">
                        {item.interestRate}
                      </td>
                      <td className="py-2 whitespace-nowrap">
                        {item.interestPeriodType}
                      </td>
                      <td className="py-2 whitespace-nowrap">
                        {item.loanTenure}
                      </td>
                      <td className="py-2 whitespace-nowrap">
                        {item.loanTenureType}
                      </td>
                      <td className="py-2 whitespace-nowrap">
                        {item.repaymentTenure}
                      </td>
                      <td className="py-2 whitespace-nowrap">
                        {item.repaymentTenureType}
                      </td>
                      <td className="py-2">
                        <Button buttonIcon={TrashIcon} onClick={() => handleDelete(index)} circle={true} className={"bg-red-600 p-2 hover:bg-red-500 focus-visible:outline-red-600"}/>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        <div className="text-right mt-5">
          <Button buttonIcon={CheckCircleIcon} buttonName={"Save"} onClick={handleSave} rectangle={true}  />
        </div>
      </div >
    </>
  );
};

export default CreateProduct;
