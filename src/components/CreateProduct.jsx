import useRACInfo from "../utils/useRACInfo";
import { useEffect, useState } from "react";
import {
  PlusIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "./Toasts";
import useAllProjectInfo from "../utils/useAllProjectInfo";
import useDBInfo from "../utils/useDBInfo";
import useBEInfo from "../utils/useBEInfo";
import useCreditScoreEq from "../utils/useCreditScoreEq";
import useRulePolicy from "../utils/useRulePolicy";
import InputSelect from "./Common/InputSelect/InputSelect";
import InputText from "./Common/InputText/InputText";
import InputCheckbox from "./Common/InputCheckbox/InputCheckbox";
import InputNumber from "./Common/InputNumber/InputNumber";
import {
  options,
  tenureOptions,
  tclOptionsInitial,
  recoveryOptions,
  tenureTypeOptions,
} from "../data/OptionsData";

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

  const [formData, setFormData] = useState({
    blockEmployersTempId: "",
    creditScoreEqTempId: "",
    creditScoreEtTempId: "",
    dbcTempId: "",
    isDisableRac: false,
    eligibleCustomerType: "",
    fee: "",
    interestEligibleTenure: [{ interestRate: "", tenure: "" }],
    interestPeriodType: "",
    managementFeeVat: "",
    numberOfEmisForEarlySettlement: "",
    productType: productName,
    projectId: "",
    racId: "",
    refinancedWith: false,
    rulePolicyTempId: "",
  });

  // Options
  const [dbrOptions, setDbrOptions] = useState([]);
  const [beOptions, setBeOptions] = useState([]);
  const [rpOptions, setRpOptions] = useState([]);
  const [csOptions, setCsOptions] = useState([]);
  const [racOptions, setRacOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);

  // Entries State
  const [newInterest, setNewInterest] = useState("");
  const [newTenure, setNewTenure] = useState("");

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

    setRacOptions(formattedRACData);
    setDbrOptions(finalData);
    setProjectOptions(formattedProjectData);
    setBeOptions(formattedBEData);
    setRpOptions(rpData);
    setCsOptions(formattedCSData);
  }, [
    RACDataInfo,
    DBRConfigInfo,
    ProjectDataInfo,
    BEDataInfo,
    RPDataInfo,
    CSDataInfo,
  ]);

  const handleInputChange = (e) => {
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
      interestEligibleTenure: [
        ...prevFormData.interestEligibleTenure,
        {
          interestRate: newInterest,
          tenure: newTenure,
        },
      ],
    }));
    setNewTenure("");
    setNewInterest("");
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
          (item) => item.interestRate || item.tenure
        );

      // Create a copy of formData with filtered interestEligibleTenure
      const filteredFormData = {
        ...formData,
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
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="RAC"
                inputOptions={racOptions}
                inputName="racId"
                inputValue={formData.racId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Project"
                inputOptions={projectOptions}
                inputName="projectId"
                inputValue={formData.projectId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="TCL"
                inputOptions={tclOptionsInitial}
                inputName="project"
                inputValue={formData.tcl}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative mt-1">
              <InputSelect
                inputOptions={recoveryOptions}
                labelName="Recovery Type"
                inputName="recoveryType"
                inputValue={formData.recoveryType}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Blocked Employer"
                inputOptions={beOptions}
                inputName="blockEmployersTempId"
                inputValue={formData.blockEmployersTempId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Rule Policy"
                inputOptions={rpOptions}
                inputName="rulePolicyTempId"
                inputValue={formData.rulePolicyTempId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Credit Score Rule"
                inputOptions={csOptions}
                inputName="creditScoreEqTempId"
                inputValue={formData.creditScoreEqTempId}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                placeHolder="1%"
              />
            </div>
            <div className="relative mt-4">
              <InputText
                labelName="Management Fee Vat"
                inputName="managementFeeVat"
                inputValue={formData.managementFeeVat}
                onChange={handleInputChange}
                placeHolder="15%"
              />
            </div>
            <div className="relative mt-4">
              <InputNumber
                labelName="No. of Installments For Early Settlement"
                inputName="numberOfEmisForEarlySettlement"
                inputValue={formData.numberOfEmisForEarlySettlement}
                onChange={handleInputChange}
                placeHolder="3"
              />
            </div>

            <div className="relative mb-2">
              <InputCheckbox
                labelName="Refinanced With"
                inputChecked={formData.refinancedWith}
                onChange={handleInputChange}
                inputName="refinancedWith"
              />
            </div>
            <div className="relative mb-2">
              <InputCheckbox
                labelName="Disable RAC"
                inputChecked={formData.isDisableRac}
                onChange={handleInputChange}
                inputName="isDisableRac"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5 items-end mt-5 border-b pb-5">
          <div className="relative">
            <InputText
              labelName="Simple Interest"
              inputName="interestRate"
              inputValue={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeHolder="2%"
            />
          </div>
          <div className="relative">
            <InputSelect
              labelName="PER"
              inputOptions={options}
              inputName="interestPeriodType"
              inputValue={formData.interestPeriodType}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <label htmlFor="tenure" className=" px-1 text-xs text-gray-900">
              Tenure
            </label>
            <InputNumber
              inputName="tenure"
              inputValue={newTenure}
              onChange={(e) => setNewTenure(e.target.value)}
              placeHolder="3"
            />
          </div>
          <div className="relative">
            <InputSelect
              labelName="Tenure Type"
              inputOptions={tenureTypeOptions}
              inputName="tenureType"
              isSearchable={false}
            />
          </div>
          <div className="relative mt-6">
            <button
              onClick={handleAddFields}
              type="button"
              className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
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
                  "Actions",
                ].map((item, index) => (
                  <th scope="col" key={index}>
                    <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                      {item}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.interestEligibleTenure.length < 1 ||
              formData.interestEligibleTenure.every(
                (item) => !item.interestRate && !item.tenure
              ) ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Data To Show Yet
                  </td>
                </tr>
              ) : (
                formData.interestEligibleTenure
                  .filter((item) => item.interestRate || item.tenure)
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.interestRate}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {formData.interestPeriodType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.tenure}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {""}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                        <button
                          onClick={() => handleDelete(index)}
                          type="button"
                          className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        <div className="text-right mt-5">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
