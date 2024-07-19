import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaxFinAmtTen from "../MaxFinAmtTen";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import LengthofService from "./LengthOfService";
import CityCard from "./CityCard";
import OccupationCard from "./OccupationCard";
import { Passed, Warning } from "../Toasts";
import toast, { Toaster } from "react-hot-toast";
import LoadingState from "../LoadingState";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputNumber from "../Common/InputNumber/InputNumber";

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
  const { rulePolicyId } = useParams();
  // Equation
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
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([
    {
      id: "",
      rulePolicyTempId: rulePolicyId,
      name: "city",
      rules: [
        {
          ruleName: "",
          fieldType: "Employer",
          rulePolicyTempId: rulePolicyId,
          cityName: "",
          point: "",
        },
      ],
      operators: null,
    },
    {
      id: "",
      rulePolicyTempId: rulePolicyId,
      name: "creditScore",
      rules: [
        {
          ruleName: "",
          fieldType: "Employer",
          rulePolicyTempId: rulePolicyId,
          firstCreditScore: "",
          secondCreditScore: "",
          maxLoanAmount: "",
          residentMaxLoanAmount: "",
        },
      ],
      operators: {
        firstCreditScoreOperator: "",
        secondCreditScoreOperator: "",
      },
    },
    {
      id: "",
      rulePolicyTempId: rulePolicyId,
      name: "employmentSector",
      rules: [
        {
          ruleName: "",
          fieldType: "Employer",
          rulePolicyTempId: rulePolicyId,
          employmentSectorName: "",
          point: "",
        },
      ],
      operators: null,
    },
    {
      id: "",
      rulePolicyTempId: rulePolicyId,
      name: "maxFinanceAmount",
      rules: [
        {
          ruleName: "",
          fieldType: "",
          rulePolicyTempId: rulePolicyId,
          firstGrossSalary: "",
          secondGrossSalary: "",
          maxLoanAmount: "",
          residentMaxLoanAmount: "",
        },
      ],
      operators: {
        firstGrossSalaryOperator: "",
        secondGrossSalaryOperator: "",
      },
    },
    {
      id: "",
      rulePolicyTempId: rulePolicyId,
      name: "financeAmountWithTenure",
      rules: [
        {
          ruleName: "",
          fieldType: "Employer",
          rulePolicyTempId: rulePolicyId,
          financeAmount: "",
          tenure: "",
        },
      ],
      operators: null,
    },
    {
      id: "",
      rulePolicyTempId: rulePolicyId,
      name: "lengthOfService",
      rules: [
        {
          ruleName: "",
          fieldType: "",
          rulePolicyTempId: rulePolicyId,
          firstLengthOfService: "",
          secondLengthOfService: "",
          point: "",
        },
      ],
      operators: {
        firstLengthOfServiceOperator: "",
        secondLengthOfServiceOperator: "",
      },
    },
    {
      id: "",
      rulePolicyTempId: rulePolicyId,
      name: "riskBasedPricing",
      rules: [
        {
          ruleName: "",
          fieldType: "Employer",
          rulePolicyTempId: rulePolicyId,
          firstRiskBasedPricing: "",
          secondRiskBasedPricing: "",
          interestPeriodType: "",
          interestRate: "",
        },
      ],
      operators: {
        firstRiskBasedPricingOperator: "",
        secondRiskBasedPricingOperator: "",
      },
    },
    {
      id: "",
      rulePolicyTempId: rulePolicyId,
      name: "riskBasedPricingEquation",
      rules: [
        {
          ruleName: "",
          fieldType: "Employer",
          rulePolicyTempId: rulePolicyId,
          a_Weight: "",
          b_Weight: "",
          c_Weight: "",
          d_Weight: "",
        },
      ],
      operators: null,
    },
  ]);
  const [riskBasedPricing, setRiskBasedPricing] = useState({});
  const [riskBasedPricingEquation, setRiskBasedPricingEquation] = useState({});
  const [rules, setRules] = useState({
    ruleName: "0",
    fieldType: "Employer",
    rulePolicyTempId: rulePolicyId,
    a_Weight: "",
    b_Weight: "",
    c_Weight: "",
    d_Weight: "",
  });
  const [riskBasedPricingRules, setRiskBasedPricingRules] = useState({
    operators: {
      firstRiskBasedPricingOperator: "",
      secondRiskBasedPricingOperator: "",
    },
    riskBasedPricingRules: [
      {
        firstRiskBasedPricing: "",
        secondRiskBasedPricing: "",
        interestRate: "",
        interestPeriodType: "",
        ruleName: "0",
        rulePolicyTempId: rulePolicyId,
        fieldType: "Employer",
      },
    ],
  });

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === column && sortConfig.direction === "desc") {
      direction = ""; // This will reset the sort
    }
    setSortConfig({ key: column, direction });
  };

  const getSortIcon = (column) => {
    if (sortConfig.key === column) {
      if (sortConfig.direction === "asc") {
        return <FaSortAmountDown className="ml-2" />;
      } else if (sortConfig.direction === "desc") {
        return <FaSortAmountUp className="ml-2" />;
      }
    }
    return <FaSort className="ml-2" title="Sort Data" />;
  };

  const toggleEdit = (index) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  const [inputList, setInputList] = useState([
    {
      firstRiskBasedPricing: "",
      secondRiskBasedPricing: "",
      interestRate: "",
      interestPeriodType: "",
      rulePolicyTempId: rulePolicyId,
      ruleName: "0",
      fieldType: "Employer",
    },
  ]);

  const handleChangeRBP = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    setRiskBasedPricingEquation((prevState) => {
      return {
        ...prevState,
        rules: prevState.rules.map((rule) =>
          rule.ruleName === id ? { ...rule, [name]: value } : rule
        ),
      };
    });
  };

  const handleSelectChange = (propName, index, selectedOption) => {
    const list = [...inputList];
    list[index][propName] = selectedOption.value;
    setInputList(list);
  };

  useEffect(() => {
    fetchData();
  }, [rulePolicyId]);

  async function fetchData() {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/all-rule-policy/by-temp-id/" +
          rulePolicyId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        console.log("Loading false");
      }
      const data = await response.json();

      setAllRuleData(data);
      setFormData(data);

      // Find the required rules from the fetched data
      setRiskBasedPricingEquation({
        ...data.find((rule) => rule.name === "riskBasedPricingEquation"),
      });

      const city = data.find((rule) => rule.name === "city");
      const occupation = data.find((rule) => rule.name === "employmentSector");

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
      const financeRules = allRuleData.find(
        (rule) => rule.name === "financeAmountWithTenure"
      );
      const riskBasedPricing = allRuleData.find(
        (rule) => rule.name === "riskBasedPricing"
      );
      // setRBPData(riskBasedPricing?.rules || []);
      const filteredData = riskBasedPricing?.rules.filter(
        (item) => item.rulePolicyTempId === rulePolicyId
      );
      setFAWTData(financeRules?.rules || []);
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
        (item) => item.rulePolicyTempId === rulePolicyId
      );
      setLOSData(filteredLOSData || []);
      setLOSOperators(lengthOfService?.operators);
    }
  }, [allRuleData]);

  const handleAddFieldsRBP = async () => {
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
          ruleName: "0",
          rulePolicyTempId: rulePolicyId,
          fieldType: "Employer",
        },
      ],
    };

    try {
      const postResponse = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/risk-based-pricing-rule",
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
        fetchData();
        setfirstRiskBasedPricing("");
        setsecondRiskBasedPricing("");
        setinterestRate("");
        setselectedPeriodType([]);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleAddRBPE = async () => {
    const token = localStorage.getItem("authToken");
    const postData = {
      riskBasedPricingEquationRules: [
        {
          ...rules,
        },
      ],
    };

    try {
      const postResponse = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/risk-based-pricing-equation-rule",
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
        fetchData();
        setRules({
          ruleName: "0",
          fieldType: "Employer",
          rulePolicyTempId: rulePolicyId,
          a_Weight: "",
          b_Weight: "",
          c_Weight: "",
          d_Weight: "",
        });
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleDeleteRBPE = async (ruleName) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/${rulePolicyId}/risk-based-pricing-equation-rule/${ruleName}`,
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

  const handleDeleteRBP = async (ruleName) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/${rulePolicyId}/risk-based-pricing-rule/${ruleName}`,
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
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/risk-based-pricing-rule",
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
      } else if (postResponse.ok) {
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRBPE = async (index) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/risk-based-pricing-equation-rule",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            riskBasedPricingEquationRules: [
              riskBasedPricingEquation.rules[index],
            ],
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

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Page Changed"}
        message={`You have switched to page: ${newPage}`}
      />
    ));
  };

  function informUser() {
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Not Yet Saved"}
        message={"Please click the save button to confirm changes"}
      />
    ));
  }

  const sortedItems = [...inputList].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Determine total number of pages
  const totalPages = Math.ceil(inputList.length / itemsPerPage);

  // if (allRuleData.length === 0) {
  //   return <LoadingState />;
  // }

  const handleRuleChange = (e) => {
    const { name, value } = e.target;
    setRules((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <MaxFinAmtTen FAWTData={FAWTData} fetchData={fetchData} />
      {riskBasedPricingEquation ? (
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
                <tr className="divide-x divide-gray-200 text-center">
                  <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                    <InputNumber
                      inputName={"a_Weight"}
                      inputValue={rules.a_Weight}
                      onChange={handleRuleChange}
                      placeHolder={"0.54"}
                    />
                  </td>
                  <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                    <InputNumber
                      inputName={"b_Weight"}
                      inputValue={rules.b_Weight}
                      onChange={handleRuleChange}
                      placeHolder={"0.54"}
                    />
                  </td>
                  <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                    <InputNumber
                      inputName={"c_Weight"}
                      inputValue={rules.c_Weight}
                      onChange={handleRuleChange}
                      placeHolder={"0.54"}
                    />
                  </td>
                  <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                    <InputNumber
                      inputName={"d_Weight"}
                      inputValue={rules.d_Weight}
                      onChange={handleRuleChange}
                      placeHolder={"0.54"}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={handleAddRBPE}
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <CheckCircleIcon
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                      Add
                    </button>
                  </td>
                </tr>
                {riskBasedPricingEquation?.rules?.map((item, index) => (
                  <tr
                    key={item.ruleName || index}
                    className="divide-x divide-gray-200 text-center"
                  >
                    <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                      <InputNumber
                        inputName={"a_Weight"}
                        inputId={item.ruleName}
                        inputValue={item.a_Weight}
                        onChange={handleChange}
                        placeHolder={"0.54"}
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                      <InputNumber
                        inputName={"b_Weight"}
                        inputId={item.ruleName}
                        inputValue={item.b_Weight}
                        onChange={handleChange}
                        placeHolder={"0.54"}
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                      <InputNumber
                        inputName={"c_Weight"}
                        inputId={item.ruleName}
                        inputValue={item.c_Weight}
                        onChange={handleChange}
                        placeHolder={"0.54"}
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 px-5 text-gray-500">
                      <InputNumber
                        inputName={"d_Weight"}
                        inputId={item.ruleName}
                        inputValue={item.d_Weight}
                        onChange={handleChange}
                        placeHolder={"0.54"}
                      />
                    </td>
                    <td className="py-4 flex gap-2 px-4">
                      <button
                        type="button"
                        onClick={() => handleUpdateRBPE(index)}
                        className="block w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
                      >
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRBPE(item.ruleName)}
                        className="block w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-center justify-between">
          <div className="text-lg">Risk Based Pricing</div>
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
              {/* <SelectAndNumber
                labelName={"Minimum Risk Based Pricing"}
                inputSelectName={"firstRiskBasedPricingOperator"}
                inputSelectOptions={operatorOptions}
                inputSelectValue={
                  riskBasedPricingRules?.operators?.firstRiskBasedPricingOperator
                }
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"firstRiskBasedPricing"}
                // inputNumberid={formData?.dependentsRules?.rules[0]?.ruleName}
                inputNumberValue={
                  riskBasedPricingRules?.riskBasedPricingRules?.firstRiskBasedPricing
                }
                onChangeNumber={handleChange}
                placeHolderNumber={"4"}
              /> */}
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
          <button
            onClick={handleAddFieldsRBP}
            type="button"
            className="rounded-full mb-3 bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" onClick={() => handleSort("min")}>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Minimum Risk Based Pricing {getSortIcon("min")}
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("max")}>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Maximum Risk Based Pricing {getSortIcon("max")}
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("simp")}>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Simple Interest {getSortIcon("simp")}
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("per")}>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    PER {getSortIcon("per")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Data To Show Yet
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
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
                      ) : (
                        <div className="flex items-center justify-start ml-20 gap-5">
                          <span className="block border-r pr-5 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                            {firstRiskBasedPricingOperator.value}
                          </span>
                          <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                            {item.firstRiskBasedPricing}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
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
                            onChange={(e) => handleChangeRBP(e, index)}
                            placeholder={"2"}
                            className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-start ml-20 gap-5">
                          <span className="block border-r pr-5 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                            {secondRiskBasedPricingOperator.value}
                          </span>
                          <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                            {item.secondRiskBasedPricing}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          name="interestRate"
                          value={item.interestRate}
                          onChange={(e) => handleChangeRBP(e, index)}
                          className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="4000"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.interestRate}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
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
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.interestPeriodType}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                      <button onClick={() => toggleEdit(index)} type="button">
                        {editingIndex === index ? (
                          <div
                            onClick={informUser}
                            className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            <CheckCircleIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <PencilIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteRBP(item.ruleName)}
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
          <div className="mt-4 w-full flex justify-center gap-5 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-500"
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || currentItems.length === 0}
              className={`flex items-center px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-500"
              }`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
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
        rulePolicyId={rulePolicyId}
      />
      <div className="flex gap-10">
        <CityCard cityData={cityData} fetchData={fetchData} />
        <OccupationCard occupationData={occupationData} fetchData={fetchData} />
      </div>
    </>
  );
};

export default CreditPolicy;
