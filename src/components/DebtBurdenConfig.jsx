import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { Passed, Warning } from "./Toasts";
import LoadingState from "./LoadingState";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

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

const DebtBurdenConfig = () => {
  const navigate = useNavigate();
  const [rules, setRules] = useState([]);
  const [debtBurdenData, setDebtBurdenData] = useState([]);
  const [operators, setOperators] = useState({
    firstNetIncomeBracketInSARuleOperator: ">=",
    secondNetIncomeBracketInSARuleOperator: "==",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [convertedSelection, setConvertedSelection] = useState(null);
  const [newStartNet, setNewStartNet] = useState("");
  const [neEndNet, setNewEndNet] = useState("");
  const [newProductLevel, setNewProductLevel] = useState("");
  const [newConsumerDBR, setNewConsumerDBR] = useState("");
  const [newGDBR, setNewGDBR] = useState("");
  const [newRetired, setNewRetired] = useState([]);
  const [newIncMTG, setNewIncMTG] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

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

  const toggleEdit = (index) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const isEmployerRetired =
      selectedOption.value.toLowerCase() === "true" ? true : false;
    setConvertedSelection(isEmployerRetired);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/debit-burden-cab-celling",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const debtBurdenConfig = await data.json();
      setDebtBurdenData(debtBurdenConfig);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddRule = async () => {
    toast.loading("Adding...", {
      duration: 1000,
      position: "bottom-center",
    });
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
      const response = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/debit-burden-cab-celling",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ operators, dbrRules: newRules }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.ok) {
        fetchRules();
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Adding Successful"}
            message={"The item was added successfully"}
          />
        ));
        document.getElementById("startincome").value = "";
        document.getElementById("endincome").value = "";
        document.getElementById("productLevel").value = "";
        document.getElementById("consumerDBR").value = "";
        document.getElementById("gdbrWOmtg").value = "";
        document.getElementById("gdbrWmtg").value = "";
        setSelectedOption(null);
      } else if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (index) => {
    toast.loading("Deleting...", {
      duration: 1000,
      position: "bottom-center"
    });
    const authToken = localStorage.getItem("authToken");
    const ruleToDelete = rules[index];
    try {
      const response = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/debit-burden-cab-celling/" +
          ruleToDelete.ruleName,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
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
      } else if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  const handleChange = async (index, field, value) => {
    toast.loading("Updating...", {
      duration: 1000,
      position: "bottom-center",
    });
    const authToken = localStorage.getItem("authToken");
    const newRules = [...rules];
    newRules[index][field] = value;
    setRules(newRules);

    // Make a PUT request to update the data
    try {
      const response = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/debit-burden-cab-celling",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ operators, dbrRules: newRules }),
        }
      );
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
      } else if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    if (debtBurdenData.length === 0) {
      console.log("Fetching data");
    } else {
      console.log(debtBurdenData);
      setRules(debtBurdenData.dbrRules);
      setOperators(debtBurdenData.operators);
    }
  }, [debtBurdenData]);

  function informUser() {
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"View Mode"}
        message={"Switched to View Mode"}
      />
    ));
  }

  function informUser1() {
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Edit Mode"}
        message={"Switched to Edit Mode"}
      />
    ));
  }

  const sortedItems = [...rules].sort((a, b) => {
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
  const totalPages = Math.ceil(rules.length / itemsPerPage);

  if (debtBurdenData.length === 0) {
    return <LoadingState />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-center justify-between ">
          <div className="text-lg">Loans</div>
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
        <div className="flex gap-2 items-end mt-2 border-b pb-5 mb-2">
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
              onClick={handleAddRule}
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
                  {
                    name: "Start Net Income Bracket",
                    sortKey: "startNetIncomeBracketInSARule",
                  },
                  {
                    name: "End Net Income Bracket",
                    sortKey: "endNetIncomeBracketInSARule",
                  },
                  { name: "Product Level", sortKey: "productLevel" },
                  { name: "Consumer DBR", sortKey: "consumerDBR" },
                  { name: "GDBR (Without MTG)", sortKey: "gdbrWithoutMTG" },
                  { name: "Employer Retired", sortKey: "employerRetired" },
                  { name: "GDBR (Including MTG)", sortKey: "gdbrWithMTG" },
                  { name: "Actions", sortKey: null },
                ].map((column, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${
                      column.sortKey ? "" : ""
                    }`}
                    onClick={
                      column.sortKey
                        ? () => handleSort(column.sortKey)
                        : undefined
                    }
                  >
                    <div
                      className={`flex items-center ${
                        column.sortKey ? "justify-between" : ""
                      }`}
                    >
                      {column.name}
                      {column.sortKey && getSortIcon(column.sortKey)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rules.length < 1 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Data To Show Yet
                  </td>
                </tr>
              ) : (
                currentItems.map((rule, index) => (
                  <tr key={rule.ruleName || index}>
                    {[
                      {
                        value: rule.startNetIncomeBracketInSARule?.trim(),
                        type: "number",
                        name: "startNetIncomeBracketInSARule",
                      },
                      {
                        value: rule.endNetIncomeBracketInSARule?.trim(),
                        type: "number",
                        name: "endNetIncomeBracketInSARule",
                      },
                      {
                        value: rule.productLevel.trim(),
                        type: "text",
                        name: "productLevel",
                      },
                      {
                        value: rule.consumerDBR.trim(),
                        type: "text",
                        name: "consumerDBR",
                      },
                      {
                        value: rule.gdbrWithoutMTG.trim(),
                        type: "text",
                        name: "gdbrWithoutMTG",
                      },
                      {
                        value: rule.employerRetired,
                        type: "select",
                        name: "employerRetired",
                        options: empOptions,
                      },
                      {
                        value: rule.gdbrWithMTG.trim(),
                        type: "text",
                        name: "gdbrWithMTG",
                      },
                    ].map((col, idx) => (
                      <td key={idx} className="px-6 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          col.type === "select" ? (
                            <Select
                              className="w-full"
                              value={col.options.find(
                                (option) => option.value === col.value
                              )}
                              options={col.options}
                              onChange={(selected) =>
                                handleChange(index, col.name, selected.value)
                              }
                              isSearchable={false}
                            />
                          ) : (
                            <input
                              type={col.type}
                              name={`${col.name}${index}`}
                              id={`${col.name}${index}`}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={col.value}
                              onChange={(e) =>
                                handleChange(index, col.name, e.target.value)
                              }
                              placeholder="Enter value"
                            />
                          )
                        ) : (
                          <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                            {col.value}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-center">
                      <button onClick={() => toggleEdit(index)} type="button">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          {editingIndex === index ? (
                            <div onClick={informUser}>
                              <CheckCircleIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </div>
                          ) : (
                            <div onClick={informUser1}>
                              <PencilIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>
                      </button>
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
              disabled={currentPage === totalPages || currentItems.length < 1}
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
      </div>
    </>
  );
};

export default DebtBurdenConfig;
