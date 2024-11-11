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

const operatorOptions = [
  { value: "==", label: "==" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

const LengthofService = ({ loading, error }) => {
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
    toast.warn(`You have switched to page: ${newPage}`);
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

  // Determine total number of pages
  const totalPages = Math.ceil(
    LOSInputList.lengthOfServiceRules.length / itemsPerPage
  );

  // console.log(LOSInputList);

  return (
    <>
      <ContainerTile
        loading={loading}
        error={error}
      >
        <div className="text-lg mb-4">Length of Service</div>
        {roleName !== "ROLE_VIEWER" ? (
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
            <div>
              <Button
                buttonIcon={PlusIcon}
                onClick={handleAddFields}
                circle={true}
              />
            </div>
          </div>
        ) : (
          ""
        )}

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
              {roleName !== "ROLE_VIEWER" ? (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              ) : (
                ""
              )}
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
                      <SelectAndNumber
                        inputSelectName={"firstLengthOfServiceOperator"}
                        inputSelectValue={
                          LOSInputList?.operators?.firstLengthOfServiceOperator
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
                      <div className="flex items-center justify-start ml-20 gap-5">
                        <span className="block border-r pr-5 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {
                            LOSInputList?.operators
                              ?.firstLengthOfServiceOperator
                          }
                        </span>
                        <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.firstLengthOfService}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingIndex === index ? (
                      <SelectAndNumber
                        inputSelectName={"secondLengthOfServiceOperator"}
                        inputSelectValue={
                          LOSInputList?.operators?.secondLengthOfServiceOperator
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
                      <div className="flex items-center justify-start ml-20 gap-5">
                        <span className="block border-r pr-5 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {
                            LOSInputList?.operators
                              ?.secondLengthOfServiceOperator
                          }
                        </span>
                        <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.secondLengthOfService}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                      <span className="block py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                        {item.point}
                      </span>
                    )}
                  </td>
                  {roleName !== "ROLE_VIEWER" ? (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                      <button onClick={() => toggleEdit(index)} type="button">
                        {editingIndex === index ? (
                          <div
                            // onClick={handleSave}
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
                      <Button
                        buttonIcon={TrashIcon}
                        onClick={() => handleDelete(item.ruleName)}
                        circle={true}
                      />
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="mt-4 w-full flex justify-center gap-5 items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-md ${currentPage === 1
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
            className={`flex items-center px-4 py-2 rounded-md ${currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
              }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </ContainerTile>
    </>
  );
};

export default LengthofService;
