import { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Passed, Warning } from "./Toasts";
import { useParams } from "react-router-dom";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputNumber from "./Common/InputNumber/InputNumber";

const MaxFinAmtTen = ({ FAWTData, fetchData }) => {
  const [inputList, setInputList] = useState([]);
  const [newAmount, setNewAmount] = useState("");
  const [newTenure, setNewTenure] = useState("");
  const { rulePolicyId } = useParams();
  const authToken = localStorage.getItem("authToken");
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [maxFinAmtRules, setMaxFinAmtRules] = useState({
    ruleName: "0",
    fieldType: "Employer",
    rulePolicyTempId: rulePolicyId,
    financeAmount: "",
    tenure: "",
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

  useEffect(() => {
    const filteredData = FAWTData.filter(
      (item) => item.rulePolicyTempId === rulePolicyId
    );
    setInputList(filteredData);
  }, [FAWTData]);

  const handleRuleChange = (e) => {
    const { name, value } = e.target;
    setMaxFinAmtRules((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleClear = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleDelete = (index) => {
    const ruleToDelete = inputList[index];
    fetch(
      `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/${rulePolicyId}/finance-amount-with-tenure-rule/${ruleToDelete.ruleName}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        } else {
          console.log("Empty response");
        }
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        fetchData();
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Delete Successful"}
            message={"The item was deleted successfully"}
          />
        ));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const handleUpdate = (index) => {
    const payload = {
      financeAmountWithTenureRules: inputList.map((item, idx) => ({
        ruleName: inputList[idx].ruleName,
        fieldType: "Employer",
        rulePolicyTempId: rulePolicyId,
        financeAmount: item.financeAmount,
        tenure: item.tenure,
      })),
    };

    fetch(
      `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/finance-amount-with-tenure-rule`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else if (response.ok) {
          toast.custom((t) => (
            <Passed
              t={t}
              toast={toast}
              title={"Update Successful"}
              message={"The item was updated successfully"}
            />
          ));
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        } else {
          console.log("Empty response");
        }
        console.log("Data successfully updated:", data);
        fetchData();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleSave = () => {
    const payload = {
      financeAmountWithTenureRules: [
        {
          ...maxFinAmtRules,
        },
      ],
    };

    fetch(
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/finance-amount-with-tenure-rule",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else if (response.ok) {
          toast.custom((t) => (
            <Passed
              t={t}
              toast={toast}
              title={"Adding Successful"}
              message={"The item was added successfully"}
            />
          ));
          setNewAmount("");
          setNewTenure("");
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        } else {
          console.log("Empty response");
        }
        console.log("Data successfully saved:", data);
        fetchData();
      })
      .catch((error) => console.error("Error saving data:", error));
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

  // Sorting function
  const sortedItems = [...inputList].sort((a, b) => {
    if (sortConfig.key) {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;

      // If the key is a date, compare as dates
      if (key === "date") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return dateA < dateB
          ? -1 * direction
          : dateA > dateB
          ? 1 * direction
          : 0;
      }

      // If the key is a number, compare as numbers
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return (a[key] - b[key]) * direction;
      }

      // For string comparison
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return a[key].localeCompare(b[key]) * direction;
      }

      // Fallback comparison
      return a[key] < b[key]
        ? -1 * direction
        : a[key] > b[key]
        ? 1 * direction
        : 0;
    }

    return 0;
  });

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Determine total number of pages
  const totalPages = Math.ceil(inputList.length / itemsPerPage);

  // If the new items should always be on top, regardless of the sort key
  const newItemsOnTop = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  };

  // Apply new items on top sorting if required
  if (sortConfig.key !== "date") {
    sortedItems.sort(newItemsOnTop);
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 mx-auto max-w-[660px] border border-red-600">
        <div className="flex items-center justify-between">
          <div className="text-lg">Max Finance Amount With Tenure</div>
        </div>
        <div className="flex gap-5 items-end mt-5">
          <div className="relative">
            {/* <label
              htmlFor={`amount`}
              className="bg-white px-1 text-xs text-gray-900"
            >
              Amount
            </label>
            <input
              type="number"
              name="financeAmount"
              id={`financeAmount`}
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="999"
            /> */}
            <InputNumber
              labelName={"Amount"}
              inputName={"financeAmount"}
              inputValue={maxFinAmtRules.financeAmount}
              onChange={handleRuleChange}
              placeHolder={"999"}
            />
          </div>
          <div className="relative">
            {/* <label
              htmlFor={`tenure`}
              className="bg-white px-1 text-xs text-gray-900"
            >
              Tenure
            </label>
            <input
              type="number"
              name="tenure"
              id={`tenure`}
              value={newTenure}
              onChange={(e) => setNewTenure(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="6"
            /> */}
            <InputNumber
              labelName={"Tenure"}
              inputName={"tenure"}
              inputValue={maxFinAmtRules.tenure}
              onChange={handleRuleChange}
              placeHolder={"6"}
            />
          </div>
          <button
            onClick={handleSave}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4">
          <table className="divide-y divide-gray-200 w-full">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" onClick={() => handleSort("financeAmount")}>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Amount {getSortIcon("financeAmount")}
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("tenure")}>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Tenure {getSortIcon("tenure")}
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
              {currentItems.length < 1 ? (
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
                        <input
                          type="number"
                          name="financeAmount"
                          id={`financeAmount-${index}`}
                          value={item.financeAmount}
                          onChange={(e) => handleChange(e, index)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="999"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.financeAmount}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          name="tenure"
                          id={`tenure-${index}`}
                          value={item.tenure}
                          onChange={(e) => handleChange(e, index)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="6"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.tenure}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                      <button onClick={() => toggleEdit(index)} type="button">
                        {editingIndex === index ? (
                          <div
                            onClick={() => handleUpdate(index)}
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
                      {item.fieldType === "" || item.ruleName === "" ? (
                        <button
                          onClick={() => handleClear(index)}
                          type="button"
                          className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(index)}
                          type="button"
                          className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center gap-5 items-center">
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

export default MaxFinAmtTen;
