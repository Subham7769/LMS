import ContainerTile from "../Common/ContainerTile/ContainerTile";
import SelectAndNumber from "../Common/SelectAndNumber/SelectAndNumber";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import Button from "../Common/Button/Button";
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
import { toast } from "react-toastify";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { validateForm } from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "../../assets/icons";
import PaginationClassic from "../Common/Pagination/PaginationClassic";
import { operatorOptions, options } from "../../data/OptionsData";

const RiskBasedPricing = ({ loading, error }) => {
  const dispatch = useDispatch();
  const { rulePolicyId } = useParams();
  const { riskBasedPricing, riskBasedPricingInput, currentPage, sortConfig } =
    useSelector((state) => state.rulePolicy);
  const [editingIndex, setEditingIndex] = useState(null);
  const itemsPerPage = 5;
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const navigate = useNavigate();

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

  const toggleEdit = async (index) => {
    const absoluteIndex = index + indexOfFirstItem;
    const dataToValidate =
      riskBasedPricing.riskBasedPricingRules[absoluteIndex];
    if (editingIndex !== null) {
      await dispatch(validateForm(dataToValidate));
      const state = store.getState();
      const isValid = state.validation.isValid;
      if (isValid) {
        console.log("Entered");
        setEditingIndex(editingIndex === index ? null : index);
        handleUpdateRBP();
      } else {
        return;
      }
    } else {
      setEditingIndex(editingIndex === index ? null : index);
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

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

  const handleAddFieldsRBP = async () => {
    const operators = riskBasedPricingInput.operators;
    const riskBasedPricingRules =
      riskBasedPricingInput.riskBasedPricingRules[0];
    await dispatch(validateForm(operators));
    const stateAfterOp = store.getState();
    const isValidOp = stateAfterOp.validation.isValid;
    await dispatch(validateForm(riskBasedPricingRules));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (!isValidOp) {
      toast.warn("Please fill Risk Pricing operators!!");
    }
    if (isValid && isValidOp) {
      dispatch(addRiskBasedPricingRule({ rulePolicyId, navigate }))
        .unwrap()
        .then(() => {
          dispatch(fetchRulePolicyData(rulePolicyId));
        });
    }
  };

  const handleDeleteRBP = async (ruleName) => {
    try {
      await dispatch(
        deleteRiskBasedPricingRule({ rulePolicyId, ruleName, navigate })
      ).unwrap();
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
    await dispatch(
      updateRiskBasedPricingRules({ rulePolicyId, postData, navigate })
    ).unwrap();
    dispatch(fetchRulePolicyData(rulePolicyId));
  };

  return (
    <>
      <ContainerTile loading={loading} className={"p-5"}>
        {!hasViewOnlyAccess(roleName) && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-8 mb-6 items-end">
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
              isValidation={true}
              isValidation1={true}
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
              isValidation={true}
              isValidation1={true}
            />
            <InputNumber
              labelName={"Simple Interest"}
              inputName={"interestRate"}
              inputValue={
                riskBasedPricingInput?.riskBasedPricingRules[0]?.interestRate
              }
              onChange={handleRiskBasedPricingChange}
              placeHolder={"10%"}
              isValidation={true}
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
              isValidation={true}
            />
            <div className="text-right xl:text-left sm:col-span-2 xl:col-span-1">
              <Button
                buttonIcon={AddIcon}
                buttonName="Add"
                onClick={handleAddFieldsRBP}
                buttonType="secondary"
              />
            </div>
          </div>
        )}
        <div className="bg-white dark:bg-gray-800 shadow-md border rounded-xl relative mb-8">
          <header className="px-5 py-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Risk Based Pricing{" "}
              <span className="text-gray-400 dark:text-gray-500 font-medium">
                {currentItems?.length}
              </span>
            </h2>
          </header>
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-gray-300">
              <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
                <tr>
                  <th
                    scope="col"
                    onClick={() => handleSort("firstRiskBasedPricing")}
                    className="px-4 py-4 whitespace-nowrap"
                  >
                    <div className="flex cursor-pointer items-center">
                      Minimum Risk Based Pricing{" "}
                      {getSortIcon("firstRiskBasedPricing")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort("secondRiskBasedPricing")}
                    className="px-4 py-4 whitespace-nowrap"
                  >
                    <div className="flex cursor-pointer items-center">
                      Maximum Risk Based Pricing{" "}
                      {getSortIcon("secondRiskBasedPricing")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort("interestRate")}
                    className="px-4 py-4 whitespace-nowrap"
                  >
                    <div className="flex cursor-pointer items-center">
                      Simple Interest {getSortIcon("interestRate")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort("interestPeriodType")}
                    className="px-4 py-4 whitespace-nowrap min-w-40"
                  >
                    <div className="flex cursor-pointer items-center">
                      PER {getSortIcon("interestPeriodType")}
                    </div>
                  </th>
                  {!hasViewOnlyAccess(roleName) && (
                    <th
                      scope="col"
                      className="px-4 py-4 whitespace-nowrap text-left"
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
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
                      <td className="px-4 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <SelectAndNumber
                            inputSelectName={"firstRiskBasedPricingOperator"}
                            inputSelectValue={
                              riskBasedPricing?.operators
                                ?.firstRiskBasedPricingOperator
                            }
                            inputSelectOptions={operatorOptions}
                            onChangeSelect={(selectedOption) =>
                              handleChangeRBP(selectedOption, index)
                            }
                            inputNumberName={"firstRiskBasedPricing"}
                            inputNumberValue={item.firstRiskBasedPricing}
                            onChangeNumber={(e) => handleChangeRBP(e, index)}
                            placeHolder={"0.5"}
                            isValidation={true}
                            isIndex={item.dataIndex}
                          />
                        ) : (
                          <div className="flex items-center gap-5">
                            <span className="block border-r pr-5 py-1.5">
                              {
                                riskBasedPricing?.operators
                                  ?.firstRiskBasedPricingOperator
                              }
                            </span>
                            <span className="block py-1.5">
                              {item.firstRiskBasedPricing}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <SelectAndNumber
                            inputSelectName={"secondRiskBasedPricingOperator"}
                            inputSelectValue={
                              riskBasedPricing?.operators
                                ?.secondRiskBasedPricingOperator
                            }
                            inputSelectOptions={operatorOptions}
                            onChangeSelect={(selectedOption) =>
                              handleChangeRBP(selectedOption, index)
                            }
                            inputNumberName={"secondRiskBasedPricing"}
                            inputNumberValue={item.secondRiskBasedPricing}
                            onChangeNumber={(e) => handleChangeRBP(e, index)}
                            placeHolder={"2"}
                            isValidation={true}
                            isIndex={item.dataIndex}
                          />
                        ) : (
                          <div className="flex items-center gap-5">
                            <span className="block border-r pr-5 py-1.5">
                              {
                                riskBasedPricing?.operators
                                  ?.secondRiskBasedPricingOperator
                              }
                            </span>
                            <span className="block py-1.5">
                              {item.secondRiskBasedPricing}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <InputNumber
                            inputName={"interestRate"}
                            inputValue={item.interestRate}
                            onChange={(e) => handleChangeRBP(e, index)}
                            placeHolder={"0.4"}
                            isValidation={true}
                            isIndex={item.dataIndex}
                          />
                        ) : (
                          <span>{item.interestRate}</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <InputSelect
                            inputOptions={options}
                            inputName={"interestPeriodType"}
                            inputValue={item?.interestPeriodType}
                            onChange={(selectedOption) =>
                              handleChangeRBP(selectedOption, index)
                            }
                          />
                        ) : (
                          <span>{item.interestPeriodType}</span>
                        )}
                      </td>
                      {!hasViewOnlyAccess(roleName) && (
                        <td className="px-4 py-4 whitespace-nowrap flex gap-2">
                          <button
                            onClick={() => toggleEdit(index)}
                            type="button"
                          >
                            {editingIndex === index ? (
                              <div className="cursor-pointer btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-violet-400 hover:text-violet-500 dark:text-violet-500 dark:hover:text-violet-400">
                                <CheckIcon
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              </div>
                            ) : (
                              <div className="cursor-pointer btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                                <EditIcon
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              </div>
                            )}
                          </button>
                          <Button
                            buttonIcon={DeleteIcon}
                            onClick={() => handleDeleteRBP(item.ruleName)}
                            buttonType="destructive"
                            iconClassName="h-4 w-4"
                          />
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {currentItems.length > 0 && (
          <PaginationClassic
            sortedItems={sortedItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </ContainerTile>
    </>
  );
};

export default RiskBasedPricing;
