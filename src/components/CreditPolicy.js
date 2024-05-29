import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InequalityNumber from "./InequalityNumber";
import MaxFinAmtTen from "./MaxFinAmtTen";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import LengthofService from "./LengthOfService";
import TagsComp from "./TagsComp";
import CityCard from "./CityCard";
import OccupationCard from "./OccupationCard";
import { Passed } from "./Toasts";
import toast, { Toaster } from "react-hot-toast";

const options = [
  { value: "DAILY", label: "DAILY" },
  { value: "WEEKLY", label: "WEEKLY" },
  { value: "MONTHLY", label: "MONTHLY" },
  { value: "YEARLY", label: "YEARLY" },
];

const operatorOptions = [
  { value: "==", label: "==" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

const CreditPolicy = () => {
  const { projectId } = useParams();
  // Equation
  const [RBPInputList, setRBPInputList] = useState([]);
  const [data, setData] = useState([]);
  const [RBPData, setRBPData] = useState([]);
  const [RBPOperators, setRBPOperators] = useState([]);
  const [LOSData, setLOSData] = useState([]);
  const [LOSOperators, setLOSOperators] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [occupationData, setOccupationData] = useState([]);
  const [FAWTData, setFAWTData] = useState([]);
  const [firstRiskBasedPricingOperator, setfirstRiskBasedPricingOperator] =
    useState([]);
  const [secondRiskBasedPricingOperator, setsecondRiskBasedPricingOperator] =
    useState([]);
  const [allRuleData, setAllRuleData] = useState([]);
  const [firstRiskBasedPricing, setfirstRiskBasedPricing] = useState("");
  const [secondRiskBasedPricing, setsecondRiskBasedPricing] = useState("");
  const [interestRate, setinterestRate] = useState("");
  const [selectedPeriodType, setselectedPeriodType] = useState([]);

  const [inputList, setInputList] = useState([
    {
      firstRiskBasedPricing: "",
      secondRiskBasedPricing: "",
      interestRate: "",
      interestPeriodType: "",
      projectId: projectId,
      ruleName: "0",
      fieldType: "Employer",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleSelectChange = (propName, index, selectedOption) => {
    const list = [...inputList];
    list[index][propName] = selectedOption.value;
    setInputList(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/all-rule-policy",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      setAllRuleData(data);

      // Find the required rules from the fetched data
      const riskBasedPricingEquation = data.find(
        (rule) => rule.name === "riskBasedPricingEquation"
      );
      const city = data.find((rule) => rule.name === "city");
      const occupation = data.find((rule) => rule.name === "employmentSector");
      const financeRules = data.find(
        (rule) => rule.name === "financeAmountWithTenure"
      );

      // Update state for riskBasedPricingEquation
      const filteredData = riskBasedPricingEquation?.rules.filter(
        (item) => item.projectId === projectId
      );
      setRBPInputList(filteredData || []);
      setData(filteredData || []);

      // Update state for lengthOfService
      setFAWTData(financeRules?.rules || []);

      setCityData(city?.rules || []);
      setOccupationData(occupation?.rules || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (allRuleData.length === 0) {
      console.log("Fetching data");
    } else {
      console.log(allRuleData);
      const riskBasedPricing = allRuleData.find(
        (rule) => rule.name === "riskBasedPricing"
      );
      // setRBPData(riskBasedPricing?.rules || []);
      const filteredData = riskBasedPricing?.rules.filter(
        (item) => item.projectId === projectId
      );
      setInputList(filteredData || []);
      const formattedfirstRiskBasedPricingOperator = {
        value: riskBasedPricing?.operators.firstRiskBasedPricingOperator,
        label: riskBasedPricing?.operators.firstRiskBasedPricingOperator,
      };
      const formattedsecondRiskBasedPricingOperator = {
        value: riskBasedPricing?.operators.secondRiskBasedPricingOperator,
        label: riskBasedPricing?.operators.secondRiskBasedPricingOperator,
      };
      setfirstRiskBasedPricingOperator(formattedfirstRiskBasedPricingOperator);
      setsecondRiskBasedPricingOperator(
        formattedsecondRiskBasedPricingOperator
      );
      const lengthOfService = allRuleData.find(
        (rule) => rule.name === "lengthOfService"
      );
      const filteredLOSData = lengthOfService?.rules.filter(
        (item) => item.projectId === projectId
      );
      setLOSData(filteredLOSData || []);
      setLOSOperators(lengthOfService?.operators);
    }
  }, [allRuleData]);

  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken");
    const postData = {
      operators: {
        firstRiskBasedPricingOperator: firstRiskBasedPricingOperator.value,
        secondRiskBasedPricingOperator: secondRiskBasedPricingOperator.value,
      },
      riskBasedPricingRules: [
        {
          firstRiskBasedPricing: firstRiskBasedPricing,
          secondRiskBasedPricing: secondRiskBasedPricing,
          interestRate: interestRate,
          interestPeriodType: selectedPeriodType.value,
          projectId: projectId,
          ruleName: "0",
          fieldType: "Employer",
        },
      ],
    };

    try {
      const postResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/risk-based-pricing-rule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Added Successfully"}
            message={"The item has been added successfully"}
          />
        ));
      }

      fetchData();
      setfirstRiskBasedPricing("");
      setsecondRiskBasedPricing("");
      setinterestRate("");
      setselectedPeriodType([]);
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleDelete = async (ruleName) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/risk-based-pricing-rule/${ruleName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Delete request failed");
      } else if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Delete Successful"}
            message={"The item was deleted successfully"}
          />
        ));
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = async (newEntry) => {
    try {
      const response = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/risk-based-pricing-rule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        }
      );
      if (!response.ok) {
        throw new Error("Post request failed");
      }
      // Refresh the data after a successful post
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRBP = async () => {
    const token = localStorage.getItem("authToken");

    const postData = {
      operators: {
        firstRiskBasedPricingOperator: firstRiskBasedPricingOperator.value,
        secondRiskBasedPricingOperator: secondRiskBasedPricingOperator.value,
      },
      riskBasedPricingRules: inputList,
    };
    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/risk-based-pricing-rule",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      }
      // Refresh the data after a successful update
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  // Equation
  const handleInputChange = (index, fieldName, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [fieldName]: value };
    setData(newData);
  };

  const handleUpdate = async (index) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/risk-based-pricing-equation-rule",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            riskBasedPricingEquationRules: [data[index]],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      } else if (response.ok) {
        fetchData();
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Update Successful"}
            message={"The item was updated successfully"}
          />
        ));
      }

      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <MaxFinAmtTen FAWTData={FAWTData} fetchData={fetchData} />
      <div className="border-b border-gray-300 pb-8 my-8">
        <div className=" text-center my-4 text-lg">
          Risk Based Pricing = [(Credit Score*A%) + (Employment Sector*B%) +
          (*Length of Service*C%) + (*Cities*D%)]
        </div>
        <div className="flex justify-center">
          <table className="divide-y divide-gray-300 w-5/6">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">A</th>
                <th className="py-3.5 px-2 text-center text-gray-900">B</th>
                <th className="py-3.5 px-2 text-center text-gray-900">C</th>
                <th className="py-3.5 px-2 text-center text-gray-900">D</th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item, index) => (
                <>
                  <tr
                    key={item.ruleName || index}
                    className="divide-x divide-gray-200 text-center"
                  >
                    <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                      <input
                        type="number"
                        name="a_Weight"
                        id="a_Weight"
                        value={item.a_Weight}
                        onChange={(e) =>
                          handleInputChange(index, "a_Weight", e.target.value)
                        }
                        className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.54"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                      <input
                        type="number"
                        name="b_Weight"
                        id="b_Weight"
                        value={item.b_Weight}
                        onChange={(e) =>
                          handleInputChange(index, "b_Weight", e.target.value)
                        }
                        className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                        placeholder="0.54"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                      <input
                        type="number"
                        name="c_Weight"
                        id="c_Weight"
                        value={item.c_Weight}
                        onChange={(e) =>
                          handleInputChange(index, "c_Weight", e.target.value)
                        }
                        className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                        placeholder="0.54"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                      <input
                        type="number"
                        name="d_Weight"
                        id="d_Weight"
                        value={item.d_Weight}
                        onChange={(e) =>
                          handleInputChange(index, "d_Weight", e.target.value)
                        }
                        className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                        placeholder="0.54"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleUpdate(index)}
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <CheckCircleIcon
                          className="-ml-0.5 h-5 w-5"
                          aria-hidden="true"
                        />
                        Save
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-center justify-between">
          <div className="text-lg">Risk Based Pricing</div>
          <button
            onClick={handleAddFields}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex gap-8 mt-2 items-end border-b border-gray-300 pb-6 mb-6">
          <div className="mb-3">
            <label htmlFor="firstRiskBasedPricing" className="block">
              Minimum Risk Based Pricing
            </label>
            <div className="flex gap-4">
              <Select
                className="min-w-20"
                options={operatorOptions}
                value={firstRiskBasedPricingOperator}
                onChange={(firstRiskBasedPricingOperator) =>
                  setfirstRiskBasedPricingOperator(
                    firstRiskBasedPricingOperator
                  )
                }
                isSearchable={false}
              />
              <input
                type="number"
                name="firstRiskBasedPricing"
                value={firstRiskBasedPricing}
                onChange={(e) => setfirstRiskBasedPricing(e.target.value)}
                placeholder={"0.5"}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="secondRiskBasedPricing" className="block">
              Maximum Risk Based Pricing
            </label>
            <div className="flex gap-4">
              <Select
                className="min-w-20"
                options={operatorOptions}
                value={secondRiskBasedPricingOperator}
                onChange={(secondRiskBasedPricingOperator) =>
                  setsecondRiskBasedPricingOperator(
                    secondRiskBasedPricingOperator
                  )
                }
                isSearchable={false}
              />
              <input
                type="number"
                name="secondRiskBasedPricing"
                value={secondRiskBasedPricing}
                onChange={(e) => setsecondRiskBasedPricing(e.target.value)}
                placeholder={"2"}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="interestRate" className="block">
              Simple Interest
            </label>
            <input
              type="number"
              name="interestRate"
              value={interestRate}
              onChange={(e) => setinterestRate(e.target.value)}
              className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="4000"
            />
          </div>
          <div className="relative mb-3">
            <label htmlFor="interestPeriodType" className="block">
              PER
            </label>
            <Select
              className="w-36"
              options={options}
              name="interestPeriodType"
              value={selectedPeriodType}
              onChange={(selectedOption) =>
                setselectedPeriodType(selectedOption)
              }
              isSearchable={false}
            />
          </div>
        </div>
        {inputList.map((item, index) => (
          <>
            <div key={index} className="flex gap-8 mt-2 items-end">
              <div className="mb-3">
                <label htmlFor="firstRiskBasedPricing" className="block">
                  Minimum Risk Based Pricing
                </label>
                <div className="flex gap-4">
                  <Select
                    className="min-w-20"
                    options={operatorOptions}
                    value={firstRiskBasedPricingOperator}
                    onChange={(firstRiskBasedPricingOperator) =>
                      setfirstRiskBasedPricingOperator(
                        firstRiskBasedPricingOperator
                      )
                    }
                    isSearchable={false}
                  />
                  <input
                    type="number"
                    name="firstRiskBasedPricing"
                    value={item.firstRiskBasedPricing}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={"0.5"}
                    className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="secondRiskBasedPricing" className="block">
                  Maximum Risk Based Pricing
                </label>
                <div className="flex gap-4">
                  <Select
                    className="min-w-20"
                    options={operatorOptions}
                    value={secondRiskBasedPricingOperator}
                    onChange={(secondRiskBasedPricingOperator) =>
                      setsecondRiskBasedPricingOperator(
                        secondRiskBasedPricingOperator
                      )
                    }
                    isSearchable={false}
                  />
                  <input
                    type="number"
                    name="secondRiskBasedPricing"
                    value={item.secondRiskBasedPricing}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={"2"}
                    className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="interestRate" className="block">
                  Simple Interest
                </label>
                <input
                  type="number"
                  name="interestRate"
                  value={item.interestRate}
                  onChange={(e) => handleChange(e, index)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
              <div className="relative mb-3">
                <label htmlFor="interestPeriodType" className="block">
                  PER
                </label>
                <Select
                  className="w-36"
                  options={options}
                  name="interestPeriodType"
                  value={[
                    {
                      label: item.interestPeriodType,
                      value: item.interestPeriodType,
                    },
                  ]}
                  onChange={(selectedOption) =>
                    handleSelectChange(
                      "interestPeriodType",
                      index,
                      selectedOption
                    )
                  }
                  isSearchable={false}
                />
              </div>
              <button
                onClick={() => handleDelete(item.ruleName)}
                type="button"
                className="mb-3 w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </>
        ))}
        <div className="text-right mt-5">
          <button
            type="button"
            onClick={handleUpdateRBP}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </div>
      </div>
      <LengthofService
        LOSData={LOSData}
        operatorOptions={operatorOptions}
        LOSOperators={LOSOperators}
        fetchData={fetchData}
        projectId={projectId}
      />
      <div className="flex gap-10">
        <CityCard cityData={cityData} fetchData={fetchData} />
        <OccupationCard occupationData={occupationData} fetchData={fetchData} />
      </div>
    </>
  );
};

export default CreditPolicy;
