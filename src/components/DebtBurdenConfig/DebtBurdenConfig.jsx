import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRules,
  fetchName,
  updateName,
  createCloneDBC,
  addRule,
  deleteDBC,
  handleChange,
  toggleModal,
  setCurrentPage,
  deleteRule,
  updateOperator,
  updateDbrRules,
  resetdbrData,
  updateRule,
} from "../../redux/Slices/dbrConfigSlice";
import { toast } from "react-toastify";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { operatorOptions, empOptions } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import CloneModal from "../Common/CloneModal/CloneModal";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "../../assets/icons";
import PaginationClassic from "../Common/Pagination/PaginationClassic";
import ListTableClassic from "../Common/ListTable/ListTableClassic";

const DebtBurdenConfig = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dbcTempId } = useParams();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Redux state selectors
  const {
    name,
    loading,
    error,
    currentPage,
    isModalOpen,
    dbrData,
    allDBRData,
  } = useSelector((state) => state.dbrConfig);
  const { userData } = useSelector((state) => state.auth);
  const { validationError } = useSelector((state) => state.validation);
  const roleName = userData?.roles[0]?.name;

  const [editingIndex, setEditingIndex] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchRules(dbcTempId));
    dispatch(fetchName(dbcTempId));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dbcTempId, dispatch]);

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === column && sortConfig.direction === "desc") {
      direction = ""; // This will reset the sort
    }
    setSortConfig({ key: column, direction });
  };

  const handleOperatorChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateOperator({ name, value }));
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleItemDelete = (index) => {
    const authToken = localStorage.getItem("authToken");
    const ruleToDelete = allDBRData?.dbrRules[indexOfFirstItem + index];

    if (!ruleToDelete) {
      console.error("No rule found to delete at this index.");
      return;
    }

    dispatch(
      deleteRule({
        index,
        ruleName: ruleToDelete.ruleName,
        dbcTempId,
        authToken,
      })
    ).then((response) => {
      if (response.error) {
        console.error("Error deleting rule:", response.error);
      } else {
        console.log("Rule deleted successfully.");
        dispatch(fetchRules(dbcTempId));
        dispatch(setCurrentPage(1));
      }
    });
  };

  const toggleEdit = async (index) => {
    const absoluteIndex = index + indexOfFirstItem;
    if (editingIndex !== null) {
      const dbrTableData = allDBRData.dbrRules[absoluteIndex];
      await dispatch(validateForm(dbrTableData));
      const state = store.getState();
      const isValid = state.validation.isValid;
      if (isValid) {
        informUser();
        setEditingIndex(editingIndex === index ? null : index);
      } else {
        return;
      }
    } else {
      setEditingIndex(editingIndex === index ? null : index);
      informUser1();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      handleChange({ name, value: type === "checkbox" ? checked : value })
    );
  };

  const handleClone = () => {
    dispatch(toggleModal());
  };

  const closeModal = () => {
    dispatch(toggleModal());
  };

  const createClone = async (cloneDBCName) => {
    const resultAction = await dispatch(
      createCloneDBC({ dbcTempId, cloneDBCName })
    ).unwrap();
    navigate("/loan/dbr-config/" + resultAction);
  };

  const updateNameHandler = (newName) => {
    dispatch(updateName({ dbcTempId, newName }));
  };

  const addNewRule = async () => {
    const operators = allDBRData?.operators;
    await dispatch(validateForm(operators));
    const stateAfterOp = store.getState();
    const isValidOp = stateAfterOp.validation.isValid;
    await dispatch(validateForm(dbrData));
    const stateAfterDbr = store.getState();
    const isValidDbr = stateAfterDbr.validation.isValid;
    console.log(isValidDbr + " ---- " + isValidOp);
    if (!isValidOp) {
      toast.warn("Please fill Net Income operators!!");
    }
    if (isValidDbr && isValidOp) {
      dispatch(addRule({ operators, dbrData, dbcTempId }))
        .unwrap()
        .then(() => {
          dispatch(resetdbrData());
        });
    }
  };

  const deleteCurrentDBC = async () => {
    await dispatch(deleteDBC(dbcTempId)).unwrap();
    navigate("/loan/dbr-config");
  };

  const handleTableChange = () => {
    dispatch(updateRule(allDBRData))
      .unwrap()
      .then((updatedRules) => {
        // Log the successful update or perform any other action with the updated rules
        console.log("Update successful:", updatedRules);
        dispatch(fetchRules(dbcTempId));
      });
  };

  const handleChangeDBC = (index, field, value) => {
    const absoluteIndex = indexOfFirstItem + index;
    const newRules = JSON.parse(JSON.stringify(allDBRData?.dbrRules));
    newRules[absoluteIndex][field] = value;
    console.log(newRules);
    dispatch(updateDbrRules(newRules));
  };

  function informUser() {
    toast.warn("Switched to View Mode");
  }

  function informUser1() {
    toast.warn("Switched to Edit Mode");
  }

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

  const sortedItems = [...allDBRData?.dbrRules].sort((a, b) => {
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

  const ListHeader = [
    {
      name: "Min Net Income Bracket",
      sortKey: "startNetIncomeBracketInSARule",
    },
    { name: "Max Net Income Bracket", sortKey: "endNetIncomeBracketInSARule" },
    { name: "Product Level", sortKey: "productLevel" },
    { name: "Consumer DBR", sortKey: "consumerDBR" },
    { name: "GDBR (Without MTG)", sortKey: "gdbrWithoutMTG" },
    { name: "Employer Retired", sortKey: "employerRetired" },
    { name: "GDBR (with MTG)", sortKey: "gdbrWithMTG" },
  ];

  if (!hasViewOnlyAccess(roleName)) {
    ListHeader.push({ name: "Actions", sortKey: null });
  }

  return (
    <>
      <DynamicHeader
        itemName={name}
        handleNameUpdate={updateNameHandler}
        handleClone={handleClone}
        handleDelete={() => deleteCurrentDBC(dbcTempId)}
        loading={loading}
      />
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createClone}
        initialName={name}
      />
      <ContainerTile loading={loading} className={"p-5"}>
        {!hasViewOnlyAccess(roleName) && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end mt-2 mb-5">
            <InputSelect
              labelName="Min Net Income"
              inputValue={
                allDBRData?.operators?.firstNetIncomeBracketInSARuleOperator
              }
              inputOptions={operatorOptions}
              onChange={handleOperatorChange}
              inputName="firstNetIncomeBracketInSARuleOperator"
              isValidation={true}
            />
            <InputNumber
              inputName={`startNetIncomeBracketInSARule`}
              inputValue={dbrData?.startNetIncomeBracketInSARule}
              onChange={handleInputChange}
              placeHolder="10000"
              isValidation={true}
            />
            <InputSelect
              labelName="Max Net Income"
              inputValue={
                allDBRData?.operators?.secondNetIncomeBracketInSARuleOperator
              }
              inputOptions={operatorOptions}
              onChange={handleOperatorChange}
              inputName="secondNetIncomeBracketInSARuleOperator"
              isValidation={true}
            />
            <InputNumber
              inputName={`endNetIncomeBracketInSARule`}
              inputValue={dbrData?.endNetIncomeBracketInSARule}
              onChange={handleInputChange}
              placeHolder="20000"
              isValidation={true}
            />
            <InputSelect
              labelName="Employer Retired"
              inputName={`employerRetired`}
              inputValue={dbrData?.employerRetired}
              onChange={handleInputChange}
              inputOptions={empOptions}
              isValidation={true}
            />
            <InputText
              labelName="Product Level"
              inputName={`productLevel`}
              inputValue={dbrData?.productLevel}
              onChange={handleInputChange}
              placeHolder="33%"
              isValidation={true}
            />
            <InputText
              labelName="Consumer DBR"
              inputName={`consumerDBR`}
              inputValue={dbrData?.consumerDBR}
              onChange={handleInputChange}
              placeHolder="65%"
              isValidation={true}
            />
            <InputText
              labelName="GDBR (Without MTG)"
              inputName={`gdbrWithoutMTG`}
              inputValue={dbrData?.gdbrWithoutMTG}
              onChange={handleInputChange}
              placeHolder="65%"
              isValidation={true}
            />
            <InputText
              labelName="GDBR (with MTG)"
              inputName={`gdbrWithMTG`}
              inputValue={dbrData?.gdbrWithMTG}
              onChange={handleInputChange}
              placeHolder="65%"
              isValidation={true}
            />
            <div className="">
              <Button
                buttonIcon={AddIcon}
                buttonName="Add"
                onClick={addNewRule}
                buttonType="secondary"
              />
            </div>
          </div>
        )}
        <ListTableClassic
          ListName="DBR Rules"
          ListNameLength={currentItems.length}
          ListHeader={ListHeader}
          handleSort={handleSort}
          getSortIcon={getSortIcon}
        >
          {currentItems?.map((rule, index) => (
            <tr key={rule.ruleName || index}>
              {[
                {
                  value: rule?.startNetIncomeBracketInSARule?.trim(),
                  type: "number",
                  name: "startNetIncomeBracketInSARule",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.endNetIncomeBracketInSARule?.trim(),
                  type: "number",
                  name: "endNetIncomeBracketInSARule",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.productLevel?.trim(),
                  type: "text",
                  name: "productLevel",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.consumerDBR?.trim(),
                  type: "text",
                  name: "consumerDBR",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.gdbrWithoutMTG?.trim(),
                  type: "text",
                  name: "gdbrWithoutMTG",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.employerRetired,
                  type: "select",
                  name: "employerRetired",
                  options: empOptions,
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.gdbrWithMTG?.trim(),
                  type: "text",
                  name: "gdbrWithMTG",
                  dataIndex: rule?.dataIndex,
                },
              ].map((col, idx) => (
                <td key={idx} className="px-4 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
                    col.type === "select" ? (
                      <InputSelect
                        inputValue={col.value}
                        inputOptions={col.options}
                        onChange={(selected) =>
                          handleChangeDBC(
                            index,
                            col.name,
                            selected.target.value
                          )
                        }
                      />
                    ) : (
                      <input
                        type={col.type}
                        name={`${col.name}${index}`}
                        id={`${col.name}${index}`}
                        className={`form-input w-full dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed 
                            ${
                              validationError[`${col.name}_${col.dataIndex}`]
                                ? "border-red-300"
                                : ""
                            } 
                            `}
                        value={col.value}
                        onChange={(e) =>
                          handleChangeDBC(index, col.name, e.target.value)
                        }
                        placeholder="Enter value"
                        onFocus={() =>
                          dispatch(
                            setValidationError(`${col.name}_${col.dataIndex}`)
                          )
                        }
                      />
                    )
                  ) : (
                    <span>{col.value}</span>
                  )}
                </td>
              ))}
              {!hasViewOnlyAccess(roleName) && (
                <td className="p-4 flex gap-2 justify-center">
                  <Button
                    buttonIcon={editingIndex === index ? CheckIcon : EditIcon}
                    buttonType="secondary"
                    onClick={() => toggleEdit(index)}
                  />
                  <Button
                    buttonIcon={DeleteIcon}
                    onClick={() => handleItemDelete(index)}
                    buttonType="destructive"
                  />
                </td>
              )}
            </tr>
          ))}
        </ListTableClassic>
        {currentItems.length > 0 && (
          <PaginationClassic
            sortedItems={sortedItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        {!hasViewOnlyAccess(roleName) && (
          <div className="text-right pt-4 mt-5 border-t border-gray-200 dark:border-gray-700/60">
            <Button
              buttonIcon={CheckIcon}
              buttonName="Update"
              onClick={handleTableChange}
              buttonType="primary"
            />
          </div>
        )}
      </ContainerTile>
    </>
  );
};

export default DebtBurdenConfig;
