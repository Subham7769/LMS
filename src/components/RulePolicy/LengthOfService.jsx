import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import SelectAndNumber from "../Common/SelectAndNumber/SelectAndNumber";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  addLengthOfServiceRule,
  deleteLengthOfServiceRule,
  fetchRulePolicyData,
  setLengthOfService,
  updateLengthOfServiceRule,
  updateLOSInputList,
} from "../../redux/Slices/rulePolicySlice";
import { useNavigate, useParams } from "react-router-dom";
import { validateForm } from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { operatorOptions } from "../../data/OptionsData";
import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "../../assets/icons";
import PaginationClassic from "../Common/Pagination/PaginationClassic";

const LengthofService = ({ loading }) => {
  const dispatch = useDispatch();
  const { rulePolicyId } = useParams();
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const { LOSInputList, lengthOfService } = useSelector(
    (state) => state.rulePolicy
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const navigate = useNavigate();

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

  const toggleEdit = async (index) => {
    const absoluteIndex = index + indexOfFirstItem;
    const dataToValidate = LOSInputList.lengthOfServiceRules[absoluteIndex];
    if (editingIndex !== null) {
      await dispatch(validateForm(dataToValidate));
      const state = store.getState();
      const isValid = state.validation.isValid;
      if (isValid) {
        setEditingIndex(editingIndex === index ? null : index);
        handleSave();
      } else {
        return;
      }
    } else {
      setEditingIndex(editingIndex === index ? null : index);
    }
  };

  const handleAddFields = async () => {
    const operators = lengthOfService.operators;
    const lengthOfServiceRules = lengthOfService.lengthOfServiceRules[0];
    await dispatch(validateForm(operators));
    const stateAfterOp = store.getState();
    const isValidOp = stateAfterOp.validation.isValid;
    await dispatch(validateForm(lengthOfServiceRules));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (!isValidOp) {
      toast.warn("Please fill Length of Service operators!!");
    }
    if (isValid && isValidOp) {
      dispatch(addLengthOfServiceRule(navigate))
        .unwrap()
        .then(() => {
          dispatch(fetchRulePolicyData(rulePolicyId));
        });
    }
  };

  const handleChange = (e, index) => {
    console.log(LOSInputList.lengthOfServiceRules);
    const absoluteIndex = indexOfFirstItem + index;
    const { name, value } = e.target;
    dispatch(updateLOSInputList({ index: absoluteIndex, name, value }));
  };

  const handleDelete = async (ruleName) => {
    try {
      await dispatch(
        deleteLengthOfServiceRule({ rulePolicyId, ruleName })
      ).unwrap();
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    const postData = {
      operators: LOSInputList?.operators,
      lengthOfServiceRules: LOSInputList?.lengthOfServiceRules,
    };
    await dispatch(updateLengthOfServiceRule({ postData })).unwrap();
    dispatch(fetchRulePolicyData(rulePolicyId));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRuleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLengthOfService({ name, value, rulePolicyId }));
  };

  const sortedItems = [...LOSInputList.lengthOfServiceRules].sort((a, b) => {
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

  // console.log(LOSInputList);

  return (
    <>
      <ContainerTile loading={loading} className={"p-5"}>
        {!hasViewOnlyAccess(roleName) && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-2 items-end mb-6">
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
              isValidation={true}
              isValidation1={true}
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
              isValidation={true}
              isValidation1={true}
            />
            <InputNumber
              labelName={"Point"}
              inputName={"point"}
              inputValue={lengthOfService?.lengthOfServiceRules[0]?.point}
              onChange={handleRuleChange}
              placeHolder={"4000"}
              isValidation={true}
            />
            <div className="text-right md:text-left">
              <Button
                buttonIcon={AddIcon}
                buttonName="Add"
                onClick={handleAddFields}
                buttonType="secondary"
              />
            </div>
          </div>
        )}
        <div className="bg-white dark:bg-gray-800 shadow-md border rounded-xl relative mb-8">
          <header className="px-5 py-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Length of Service{" "}
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
                    onClick={() => handleSort("firstLengthOfService")}
                    className="px-4 py-4 whitespace-nowrap"
                  >
                    <div className="flex cursor-pointer items-center">
                      Minimum Length Of Service{" "}
                      {getSortIcon("firstLengthOfService")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort("secondLengthOfService")}
                    className="px-4 py-4 whitespace-nowrap"
                  >
                    <div className="flex cursor-pointer items-center">
                      Maximum Length Of Service{" "}
                      {getSortIcon("secondLengthOfService")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort("point")}
                    className="px-4 py-4 whitespace-nowrap"
                  >
                    <div className="flex cursor-pointer items-center">
                      Point {getSortIcon("point")}
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
                      <td className="px-4 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <SelectAndNumber
                            inputSelectName={"firstLengthOfServiceOperator"}
                            inputSelectValue={
                              LOSInputList?.operators
                                ?.firstLengthOfServiceOperator
                            }
                            inputSelectOptions={operatorOptions}
                            onChangeSelect={(selectedOption) =>
                              handleChange(selectedOption, index)
                            }
                            inputNumberName={"firstLengthOfService"}
                            inputNumberValue={item.firstLengthOfService}
                            onChangeNumber={(e) => handleChange(e, index)}
                            placeHolder={"0.5"}
                            isValidation={true}
                            isIndex={item.dataIndex}
                          />
                        ) : (
                          <div className="flex items-center gap-5">
                            <span className="block border-r pr-5 py-1.5">
                              {
                                LOSInputList?.operators
                                  ?.firstLengthOfServiceOperator
                              }
                            </span>
                            <span className="block py-1.5">
                              {item.firstLengthOfService}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <SelectAndNumber
                            inputSelectName={"secondLengthOfServiceOperator"}
                            inputSelectValue={
                              LOSInputList?.operators
                                ?.secondLengthOfServiceOperator
                            }
                            inputSelectOptions={operatorOptions}
                            onChangeSelect={(selectedOption) =>
                              handleChange(selectedOption, index)
                            }
                            inputNumberName={"secondLengthOfService"}
                            inputNumberValue={item.secondLengthOfService}
                            onChangeNumber={(e) => handleChange(e, index)}
                            placeHolder={"0.5"}
                            isValidation={true}
                            isIndex={item.dataIndex}
                          />
                        ) : (
                          <div className="flex items-center gap-5">
                            <span className="block border-r pr-5 py-1.5">
                              {
                                LOSInputList?.operators
                                  ?.secondLengthOfServiceOperator
                              }
                            </span>
                            <span className="block py-1.5">
                              {item.secondLengthOfService}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <InputNumber
                            inputName={"point"}
                            inputValue={item.point}
                            onChange={(e) => handleChange(e, index)}
                            placeHolder={"0.4"}
                            isValidation={true}
                            isIndex={item.dataIndex}
                          />
                        ) : (
                          <span>{item.point}</span>
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
                            onClick={() => handleDelete(item.ruleName)}
                            iconClassName="h-4 w-4"
                            buttonType="destructive"
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

export default LengthofService;
