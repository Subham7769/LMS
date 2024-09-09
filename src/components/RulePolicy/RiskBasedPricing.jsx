import ContainerTile from "../Common/ContainerTile/ContainerTile";
import SelectAndNumber from "../Common/SelectAndNumber/SelectAndNumber";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import Button from "../Common/Button/Button";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRulePolicyData,
  setPage,
  setSortConfig,
  updateRiskBasedPricingInput,
  updateRiskBasedPricing,
  addRiskBasedPricingRule,
  deleteRiskBasedPricingRule,
  updateRiskBasedPricingRules,
} from "../../redux/Slices/rulePolicySlice";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Passed, Warning } from "../Toasts";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SectionErrorBoundary from "../ErrorBoundary/SectionErrorBoundary";

const operatorOptions = [
  { value: "==", label: "==" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

const options = [
  { value: "DAILY", label: "DAILY" },
  { value: "WEEKLY", label: "WEEKLY" },
  { value: "MONTHLY", label: "MONTHLY" },
  { value: "YEARLY", label: "YEARLY" },
];

const RiskBasedPricing = () => {
  const dispatch = useDispatch();
  const { rulePolicyId } = useParams();
  const { riskBasedPricing, riskBasedPricingInput, currentPage, sortConfig } =
    useSelector((state) => state.rulePolicy);
  const [editingIndex, setEditingIndex] = useState(null);
  const itemsPerPage = 5;

  const handleRiskBasedPricingChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateRiskBasedPricingInput({ name, value, rulePolicyId }));
  };

  const handleChangeRBP = (e, index) => {
    const absoluteIndex = indexOfFirstItem + index;
    const { name, value } = e.target;
    dispatch(updateRiskBasedPricing({ index: absoluteIndex, name, value }));
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === column && sortConfig.direction === "desc") {
      direction = ""; // This will reset the sort
    }
    // setSortConfig({ key: column, direction });
    dispatch(setSortConfig({ key: column, direction }));
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

  const handlePageChange = (newPage) => {
    // setCurrentPage(newPage);
    dispatch(setPage(newPage));
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

  const sortedItems = [...riskBasedPricing.riskBasedPricingRules].sort(
    (a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }
  );

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Determine total number of pages
  const totalPages = Math.ceil(
    riskBasedPricing.riskBasedPricingRules.length / itemsPerPage
  );

  const handleAddFieldsRBP = () => {
    dispatch(addRiskBasedPricingRule(rulePolicyId))
      .unwrap()
      .then(() => {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Added Successfully"}
            message={"The item has been added successfully"}
          />
        ));
        dispatch(fetchRulePolicyData(rulePolicyId));
      })
      .catch((error) => {
        toast.custom((t) => (
          <Warning
            t={t}
            toast={toast}
            title={"Failed to Add"}
            message={`Failed to add: ${error.message}`}
          />
        ));
      });
  };

  const handleDeleteRBP = async (ruleName) => {
    try {
      await dispatch(
        deleteRiskBasedPricingRule({ rulePolicyId, ruleName })
      ).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Delete Successful"}
          message={"The item was deleted successfully"}
        />
      ));
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRBP = async () => {
    const postData = {
      operators: riskBasedPricing?.operators,
      riskBasedPricingRules: riskBasedPricing?.riskBasedPricingRules,
    };

    try {
      await dispatch(
        updateRiskBasedPricingRules({ rulePolicyId, postData })
      ).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Update Successful"}
          message={"The item was updated successfully"}
        />
      ));
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      toast.custom((t) => (
        <Warning
          t={t}
          toast={toast}
          title={"Update Failed"}
          message={`Failed to update: ${error.message}`}
        />
      ));
    }
  };

  const Content = () => (
    <table className="w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" onClick={() => handleSort("firstRiskBasedPricing")}>
            <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
              Minimum Risk Based Pricing {getSortIcon("firstRiskBasedPricing")}
            </div>
          </th>
          <th scope="col" onClick={() => handleSort("secondRiskBasedPricing")}>
            <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
              Maximum Risk Based Pricing {getSortIcon("secondRiskBasedPricing")}
            </div>
          </th>
          <th scope="col" onClick={() => handleSort("interestRate")}>
            <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
              Simple Interest {getSortIcon("interestRate")}
            </div>
          </th>
          <th scope="col" onClick={() => handleSort("interestPeriodType")}>
            <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
              PER {getSortIcon("interestPeriodType")}
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
            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
              No Data To Show Yet
            </td>
          </tr>
        ) : (
          currentItems.map((item, index) => (
            <tr key={index}>
              <td className="p-4 whitespace-nowrap">
                {editingIndex === index ? (
                  <div className="flex gap-4">
                    <Select
                      className="min-w-20"
                      options={operatorOptions}
                      value={[
                        {
                          label:
                            riskBasedPricing?.operators
                              ?.firstRiskBasedPricingOperator,
                          value:
                            riskBasedPricing?.operators
                              ?.firstRiskBasedPricingOperator,
                        },
                      ]}
                      onChange={(selectedOption) =>
                        handleChangeRBP(
                          {
                            target: {
                              name: "firstRiskBasedPricingOperator",
                              value: selectedOption.value,
                            },
                          },
                          index
                        )
                      }
                      isSearchable={false}
                    />
                    <input
                      type="number"
                      name="firstRiskBasedPricing"
                      value={item.firstRiskBasedPricing}
                      onChange={(e) => handleChangeRBP(e, index)}
                      placeholder={"0.5"}
                      className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-start ml-20 gap-5">
                    <span className="block border-r pr-5 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {
                        riskBasedPricing?.operators
                          ?.firstRiskBasedPricingOperator
                      }
                    </span>
                    <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {item.firstRiskBasedPricing}
                    </span>
                  </div>
                )}
              </td>
              <td className="p-4 whitespace-nowrap">
                {editingIndex === index ? (
                  <div className="flex gap-4">
                    <Select
                      className="min-w-20"
                      options={operatorOptions}
                      value={[
                        {
                          label:
                            riskBasedPricing?.operators
                              ?.secondRiskBasedPricingOperator,
                          value:
                            riskBasedPricing?.operators
                              ?.secondRiskBasedPricingOperator,
                        },
                      ]}
                      onChange={(selectedOption) =>
                        handleChangeRBP(
                          {
                            target: {
                              name: "secondRiskBasedPricingOperator",
                              value: selectedOption.value,
                            },
                          },
                          index
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
                      className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-start ml-20 gap-5">
                    <span className="block border-r pr-5 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {
                        riskBasedPricing?.operators
                          ?.secondRiskBasedPricingOperator
                      }
                    </span>
                    <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {item.secondRiskBasedPricing}
                    </span>
                  </div>
                )}
              </td>
              <td className="p-4 whitespace-nowrap">
                {editingIndex === index ? (
                  <input
                    type="number"
                    name="interestRate"
                    value={item.interestRate}
                    onChange={(e) => handleChangeRBP(e, index)}
                    className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="4000"
                  />
                ) : (
                  <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                    {item.interestRate}
                  </span>
                )}
              </td>
              <td className="p-4 whitespace-nowrap">
                {editingIndex === index ? (
                  <Select
                    className="w-32"
                    options={options}
                    name="interestPeriodType"
                    value={[
                      {
                        label: item.interestPeriodType,
                        value: item.interestPeriodType,
                      },
                    ]}
                    onChange={(selectedOption) =>
                      handleChangeRBP(
                        {
                          target: {
                            name: "interestPeriodType",
                            value: selectedOption.value,
                          },
                        },
                        index
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
              <td className="p-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                <button onClick={() => toggleEdit(index)} type="button">
                  {editingIndex === index ? (
                    <div
                      onClick={informUser}
                      className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
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
  );

  return (
    <>
      <ContainerTile>
        <div className="text-lg">Risk Based Pricing</div>
        <div className="grid grid-cols-5 gap-8 my-5 items-end">
          <SelectAndNumber
            labelName={"Minimum Risk Based Pricing"}
            inputSelectName={"firstRiskBasedPricingOperator"}
            inputSelectValue={
              riskBasedPricingInput?.operators?.firstRiskBasedPricingOperator
            }
            inputSelectOptions={operatorOptions}
            onChangeSelect={handleRiskBasedPricingChange}
            inputNumberName={"firstRiskBasedPricing"}
            inputNumberValue={
              riskBasedPricingInput?.riskBasedPricingRules[0]
                ?.firstRiskBasedPricing
            }
            onChangeNumber={handleRiskBasedPricingChange}
            placeHolder={"0.5"}
          />
          <SelectAndNumber
            labelName={"Maximum Risk Based Pricing"}
            inputSelectName={"secondRiskBasedPricingOperator"}
            inputSelectValue={
              riskBasedPricingInput?.operators?.secondRiskBasedPricingOperator
            }
            inputSelectOptions={operatorOptions}
            onChangeSelect={handleRiskBasedPricingChange}
            inputNumberName={"secondRiskBasedPricing"}
            inputNumberValue={
              riskBasedPricingInput?.riskBasedPricingRules[0]
                ?.secondRiskBasedPricing
            }
            onChangeNumber={handleRiskBasedPricingChange}
            placeHolder={"0.5"}
          />
          <InputNumber
            labelName={"Simple Interest"}
            inputName={"interestRate"}
            inputValue={
              riskBasedPricingInput?.riskBasedPricingRules[0]?.interestRate
            }
            onChange={handleRiskBasedPricingChange}
            placeHolder={"4000"}
          />
          <InputSelect
            labelName={"PER"}
            inputOptions={options}
            inputName={"interestPeriodType"}
            inputValue={
              riskBasedPricingInput?.riskBasedPricingRules[0]
                ?.interestPeriodType
            }
            onChange={handleRiskBasedPricingChange}
          />
          <div>
            <Button
              buttonIcon={PlusIcon}
              onClick={handleAddFieldsRBP}
              circle={true}
            />
          </div>
        </div>
        <SectionErrorBoundary>
          <Content />
        </SectionErrorBoundary>
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
        <div className="text-right ">
          <button
            type="button"
            onClick={handleUpdateRBP}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </div>
      </ContainerTile>
    </>
  );
};

export default RiskBasedPricing;
