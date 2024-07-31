import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { Passed, Warning } from "../Toasts";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import SelectAndNumber from "../Common/SelectAndNumber/SelectAndNumber";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";

const LengthofService = ({
  LOSData,
  operatorOptions,
  LOSOperators,
  fetchData,
  rulePolicyId,
}) => {
  const [firstLengthOfServiceOperator, setfirstLengthOfServiceOperator] =
    useState([]);
  const [secondLengthOfServiceOperator, setsecondLengthOfServiceOperator] =
    useState([]);
  const [LOSInputList, setLOSInputList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [lengthOfService, setLengthOfService] = useState({
    operators: {
      firstLengthOfServiceOperator: "",
      secondLengthOfServiceOperator: "",
    },
    lengthOfServiceRules: [
      {
        firstLengthOfService: "",
        secondLengthOfService: "",
        point: "",
        rulePolicyTempId: rulePolicyId,
        ruleName: "0",
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

  useEffect(() => {
    if (LOSData.length === 0) {
      console.log("Fetching Data");
    } else {
      setLOSInputList(LOSData);
      const formattedfirstLengthOfServiceOperator = {
        value: LOSOperators?.firstLengthOfServiceOperator,
        label: LOSOperators?.firstLengthOfServiceOperator,
      };
      const formattedsecondLengthOfServiceOperator = {
        value: LOSOperators?.secondLengthOfServiceOperator,
        label: LOSOperators?.secondLengthOfServiceOperator,
      };
      setfirstLengthOfServiceOperator(formattedfirstLengthOfServiceOperator);
      setsecondLengthOfServiceOperator(formattedsecondLengthOfServiceOperator);
    }
  }, [LOSData]);

  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken");
    const postData = {
      ...lengthOfService,
    };

    try {
      const postResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/length-of-service-point-rule",
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
      setfirstLengthOfService("");
      setsecondLengthOfService("");
      setpoint("");
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...LOSInputList];
    list[index][name] = value;
    setLOSInputList(list);
  };

  const handleDelete = async (ruleName) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/${rulePolicyId}/length-of-service-point-rule/${ruleName}`,
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
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");

    const postData = {
      operators: {
        firstLengthOfServiceOperator: firstLengthOfServiceOperator.value,
        secondLengthOfServiceOperator: secondLengthOfServiceOperator.value,
      },
      lengthOfServiceRules: LOSInputList,
    };
    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/length-of-service-point-rule",
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
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Update Successful"}
            message={"The item was updated successfully"}
          />
        ));
        fetchData();
      }
      // Refresh the data after a successful update
    } catch (error) {
      console.error(error);
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

  const handleRuleChange = (e) => {
    const { name, value, id } = e.target;

    setLengthOfService((prevState) => {
      const isOperator = prevState.operators.hasOwnProperty(name);
      const isRuleField =
        prevState.lengthOfServiceRules[0].hasOwnProperty(name);

      if (isOperator) {
        // Update an operator
        return {
          ...prevState,
          operators: {
            ...prevState.operators,
            [name]: value,
          },
        };
      } else if (isRuleField) {
        // Update a rule
        console.log(isRuleField);
        return {
          ...prevState,
          lengthOfServiceRules: [
            {
              ...prevState.lengthOfServiceRules[0],
              [name]: value,
            },
          ],
        };
      }
    });
  };

  const sortedItems = [...LOSInputList].sort((a, b) => {
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
  const totalPages = Math.ceil(LOSInputList.length / itemsPerPage);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl p-6 bg-gray-100 my-6">
        <div className="text-lg">Length of Service</div>
        <div className="grid grid-cols-5 gap-8 mt-2 items-end border-b border-gray-300 pb-6 mb-6">
          <SelectAndNumber
            labelName={"Minimum Length Of Service"}
            inputSelectName={"firstLengthOfServiceOperator"}
            inputSelectValue={
              lengthOfService?.operators?.firstLengthOfServiceOperator
            }
            inputSelectOptions={operatorOptions}
            onChangeSelect={handleRuleChange}
            inputNumberName={"firstLengthOfService"}
            inputNumberValue={
              lengthOfService?.lengthOfServiceRules[0]?.firstLengthOfService
            }
            onChangeNumber={handleRuleChange}
            placeHolder={"0.5"}
          />
          <SelectAndNumber
            labelName={"Maximum Length Of Service"}
            inputSelectName={"secondLengthOfServiceOperator"}
            inputSelectValue={
              lengthOfService?.operators?.secondLengthOfServiceOperator
            }
            inputSelectOptions={operatorOptions}
            onChangeSelect={handleRuleChange}
            inputNumberName={"secondLengthOfService"}
            inputNumberValue={
              lengthOfService?.lengthOfServiceRules[0]?.secondLengthOfService
            }
            onChangeNumber={handleRuleChange}
            placeHolder={"0.5"}
          />
          <InputNumber
            labelName={"Point"}
            inputName={"point"}
            inputValue={lengthOfService?.lengthOfServiceRules[0]?.point}
            onChange={handleRuleChange}
            placeHolder={"4000"}
          />
          <div>
            <Button
              buttonIcon={PlusIcon}
              onClick={handleAddFields}
              circle={true}
            />
          </div>
        </div>
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                onClick={() => handleSort("firstLengthOfService")}
              >
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                  Minimum Length Of Service{" "}
                  {getSortIcon("firstLengthOfService")}
                </div>
              </th>
              <th
                scope="col"
                onClick={() => handleSort("secondLengthOfService")}
              >
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                  Maximum Length Of Service{" "}
                  {getSortIcon("secondLengthOfService")}
                </div>
              </th>
              <th scope="col" onClick={() => handleSort("point")}>
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                  Point {getSortIcon("point")}
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
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
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
                          value={firstLengthOfServiceOperator}
                          onChange={(firstLengthOfServiceOperator) =>
                            setfirstLengthOfServiceOperator(
                              firstLengthOfServiceOperator
                            )
                          }
                          isSearchable={false}
                        />
                        <input
                          type="number"
                          name="firstLengthOfService"
                          id="firstLengthOfService"
                          value={item.firstLengthOfService}
                          onChange={(e) => handleChange(e, index)}
                          placeholder={"1"}
                          className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-start ml-20 gap-5">
                        <span className="block border-r pr-5 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {firstLengthOfServiceOperator.value}
                        </span>
                        <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.firstLengthOfService}
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
                          value={secondLengthOfServiceOperator}
                          onChange={(secondLengthOfServiceOperator) =>
                            setsecondLengthOfServiceOperator(
                              secondLengthOfServiceOperator
                            )
                          }
                          isSearchable={false}
                        />
                        <input
                          type="number"
                          name="secondLengthOfService"
                          id="secondLengthOfService"
                          value={item.secondLengthOfService}
                          onChange={(e) => handleChange(e, index)}
                          placeholder={"4"}
                          className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-start ml-20 gap-5">
                        <span className="block border-r pr-5 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {secondLengthOfServiceOperator.value}
                        </span>
                        <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.secondLengthOfService}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingIndex === index ? (
                      <input
                        type="number"
                        name="point"
                        value={item.point}
                        onChange={(e) => handleChange(e, index)}
                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.4"
                      />
                    ) : (
                      <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                        {item.point}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                    <button onClick={() => toggleEdit(index)} type="button">
                      {editingIndex === index ? (
                        <div
                          onClick={handleSave}
                          className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <CheckCircleIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item.ruleName)}
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
    </>
  );
};

export default LengthofService;
