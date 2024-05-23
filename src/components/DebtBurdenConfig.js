import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "./Toasts";

const empOptions = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
];

const operatorOptions = [
  { value: "==", label: "==" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

const API_URL =
  "https://lmscarbon.com/xc-tm-customer-care/xtracash/rules/debit-burden-cab-celling";
const authToken = localStorage.getItem("authToken");

const DebtBurdenConfig = () => {
  const [rules, setRules] = useState([]);
  const [operators, setOperators] = useState({
    firstNetIncomeBracketInSARuleOperator: ">=",
    secondNetIncomeBracketInSARuleOperator: "==",
  });
  const [openForm, setOpenForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [convertedSelection, setConvertedSelection] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const isEmployerRetired =
      selectedOption.value.toLowerCase() === "true" ? true : false;
    setConvertedSelection(isEmployerRetired);
  };

  function openFormComponent() {
    setOpenForm(true);
  }

  function closeForm() {
    setOpenForm(false);
  }

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setRules(data.dbrRules);
      setOperators(data.operators);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddRule = async () => {
    const newRules = [
      {
        ruleName: "0",
        projectId: rules[0].projectId,
        employerRetired: convertedSelection,
        startNetIncomeBracketInSARule:
          document.getElementById("startincome").value,
        endNetIncomeBracketInSARule: document.getElementById("endincome").value,
        productLevel: document.getElementById("productLevel").value,
        consumerDBR: document.getElementById("consumerDBR").value,
        gdbrWithoutMTG: document.getElementById("gdbrWOmtg").value,
        gdbrWithMTG: document.getElementById("gdbrWmtg").value,
      },
    ];

    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ operators, dbrRules: newRules }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.ok) {
        fetchRules();
        closeForm();
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Adding Successful"}
            message={"The item was added successfully"}
          />
        ));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (index) => {
    const ruleToDelete = rules[index];
    try {
      const response = await fetch(`${API_URL}/${ruleToDelete.ruleName}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        setRules(rules.filter((_, i) => i !== index));
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Delete Successful"}
            message={"The item was deleted successfully"}
          />
        ));
      }
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  const handleChange = async (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    setRules(newRules);

    // Make a PUT request to update the data
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ operators, dbrRules: newRules }),
      });
      if (response.ok) {
        console.log("Data updated successfully");
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
      console.error("Error updating data:", error);
    }
  };

  if (rules.length === 0) {
    return <>Fetching Data</>;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-center justify-between ">
          <div className="text-lg">Loans</div>
          <button
            type="button"
            onClick={openFormComponent}
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <label
              htmlFor={`firstNetIncomeBracketInSARuleOperator`}
              className="bg-white px-1 text-xs text-gray-900"
            >
              Rule 1
            </label>
            <Select
              className="w-24"
              value={operatorOptions.find(
                (option) =>
                  option.value ===
                  operators.firstNetIncomeBracketInSARuleOperator
              )}
              options={operatorOptions}
              onChange={(selected) =>
                setOperators({
                  ...operators,
                  firstNetIncomeBracketInSARuleOperator: selected.value,
                })
              }
              name="firstNetIncomeBracketInSARuleOperator"
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`secondNetIncomeBracketInSARuleOperator`}
              className="bg-white px-1 text-xs text-gray-900"
            >
              Rule 2
            </label>
            <Select
              className="w-24"
              value={operatorOptions.find(
                (option) =>
                  option.value ===
                  operators.secondNetIncomeBracketInSARuleOperator
              )}
              options={operatorOptions}
              onChange={(selected) =>
                setOperators({
                  ...operators,
                  secondNetIncomeBracketInSARuleOperator: selected.value,
                })
              }
              name="secondNetIncomeBracketInSARuleOperator"
              isSearchable={false}
            />
          </div>
        </div>
        {rules.map((rule, index) => (
          <div
            key={rule.ruleName || index}
            className="flex gap-2 items-end mt-2"
          >
            <div className="relative">
              <label
                htmlFor={`startincome${index}`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Start Net Income Bracket In SA Rule
              </label>
              <input
                type="number"
                name={`startincome${index}`}
                id={`startincome${index}`}
                className="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={rule.startNetIncomeBracketInSARule?.trim()}
                onBlur={(e) =>
                  handleChange(
                    index,
                    "startNetIncomeBracketInSARule",
                    e.target.value
                  )
                }
                placeholder="10000"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`endincome${index}`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                End Net Income Bracket In SA Rule
              </label>
              <input
                type="number"
                name={`endincome${index}`}
                id={`endincome${index}`}
                className="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={rule.endNetIncomeBracketInSARule?.trim()}
                onChange={(e) =>
                  handleChange(
                    index,
                    "endNetIncomeBracketInSARule",
                    e.target.value
                  )
                }
                placeholder="20000"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`productLevel${index}`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Product Level
              </label>
              <input
                type="text"
                name={`productLevel${index}`}
                id={`productLevel${index}`}
                className="block w-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={rule.productLevel.trim()}
                onChange={(e) =>
                  handleChange(index, "productLevel", e.target.value)
                }
                placeholder="33%"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`consumerDBR${index}`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Consumer DBR
              </label>
              <input
                type="text"
                name={`consumerDBR${index}`}
                id={`consumerDBR${index}`}
                className="block w-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={rule.consumerDBR.trim()}
                onChange={(e) =>
                  handleChange(index, "consumerDBR", e.target.value)
                }
                placeholder="65%"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`gdbrWOmtg${index}`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                GDBR (Without MTG)
              </label>
              <input
                type="text"
                name={`gdbrWOmtg${index}`}
                id={`gdbrWOmtg${index}`}
                className="block w-40 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={rule.gdbrWithoutMTG.trim()}
                onChange={(e) =>
                  handleChange(index, "gdbrWithoutMTG", e.target.value)
                }
                placeholder="65%"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`empRtr${index}`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Employer Retired
              </label>
              <Select
                className="w-28"
                value={empOptions.find(
                  (option) => option.value === rule.employerRetired
                )}
                options={empOptions}
                onChange={(selected) =>
                  handleChange(index, "employerRetired", selected.value)
                }
                id={`empRtr${index}`}
                name={`empRtr${index}`}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`gdbrWmtg${index}`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                GDBR (including MTG)
              </label>
              <input
                type="text"
                name={`gdbrWmtg${index}`}
                id={`gdbrWmtg${index}`}
                className="block w-40 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={rule.gdbrWithMTG.trim()}
                onChange={(e) =>
                  handleChange(index, "gdbrWithMTG", e.target.value)
                }
                placeholder="65%"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ))}
        {openForm && (
          <div className="flex gap-2 items-end mt-2">
            <div className="relative">
              <label
                htmlFor={`startincome`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Start Net Income Bracket In SA Rule
              </label>
              <input
                type="number"
                name={`startincome`}
                id={`startincome`}
                className="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="10000"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`endincome`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                End Net Income Bracket In SA Rule
              </label>
              <input
                type="number"
                name={`endincome`}
                id={`endincome`}
                className="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="20000"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`productLevel`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Product Level
              </label>
              <input
                type="text"
                name={`productLevel`}
                id={`productLevel`}
                className="block w-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="33%"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`consumerDBR`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Consumer DBR
              </label>
              <input
                type="text"
                name={`consumerDBR`}
                id={`consumerDBR`}
                className="block w-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="65%"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`gdbrWOmtg`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                GDBR (Without MTG)
              </label>
              <input
                type="text"
                name={`gdbrWOmtg`}
                id={`gdbrWOmtg`}
                className="block w-40 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="65%"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`empRtr`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                Employer Retired
              </label>
              <Select
                className="w-28"
                id={`empRtr`}
                name={`empRtr`}
                value={selectedOption}
                onChange={handleSelectChange}
                options={empOptions}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`gdbrWmtg`}
                className="bg-white px-1 text-xs text-gray-900"
              >
                GDBR (including MTG)
              </label>
              <input
                type="text"
                name={`gdbrWmtg`}
                id={`gdbrWmtg`}
                className="block w-40 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="65%"
              />
            </div>
            <button
              type="button"
              onClick={closeForm}
              className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
        <div className="text-right mt-5">
          <button
            type="button"
            onClick={handleAddRule}
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

export default DebtBurdenConfig;
