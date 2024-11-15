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
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import Table from "./Table";
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

const DebtBurdenConfig = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dbcTempId } = useParams();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Redux state selectors
  const { name, loading, error, currentPage, isModalOpen, dbrData, allDBRData } =
    useSelector((state) => state.dbrConfig);
  const { userData } = useSelector((state) => state.auth);
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
    toast.warn(`You have switched to page: ${newPage}`);
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
    navigate("/dbr-config/" + resultAction);
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
    navigate("/dbr-config");
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

  // Determine total number of pages
  const totalPages = Math.ceil(allDBRData?.dbrRules.length / itemsPerPage);

  return (
    <>
      <DynamicHeader
        itemName={name}
        handleNameUpdate={updateNameHandler}
        handleClone={handleClone}
        handleDelete={() => deleteCurrentDBC(dbcTempId)}
        loading={loading}
        error={error}
      />
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createClone}
        initialName={name}
      />
      <ContainerTile
        loading={loading}
        error={error}
      >
        {roleName !== "ROLE_VIEWER" ? (
          <div className="grid grid-cols-10 gap-2 items-end mt-2 border-b pb-5 mb-2">
            <div className="relative">
              <InputSelect
                labelName="Min Net"
                inputValue={
                  allDBRData?.operators?.firstNetIncomeBracketInSARuleOperator
                }
                inputOptions={operatorOptions}
                onChange={handleOperatorChange}
                inputName="firstNetIncomeBracketInSARuleOperator"
                isValidation={true}
              />
            </div>
            <div className="relative">
              <InputNumber
                inputName={`startNetIncomeBracketInSARule`}
                inputValue={dbrData?.startNetIncomeBracketInSARule}
                onChange={handleInputChange}
                placeHolder="10000"
                isValidation={true}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Max Net"
                inputValue={
                  allDBRData?.operators?.secondNetIncomeBracketInSARuleOperator
                }
                inputOptions={operatorOptions}
                onChange={handleOperatorChange}
                inputName="secondNetIncomeBracketInSARuleOperator"
                isValidation={true}
              />
            </div>
            <div className="relative">
              <InputNumber
                inputName={`endNetIncomeBracketInSARule`}
                inputValue={dbrData?.endNetIncomeBracketInSARule}
                onChange={handleInputChange}
                placeHolder="20000"
                isValidation={true}
              />
            </div>
            <div className="relative">
              <InputText
                labelName="Product Level"
                inputName={`productLevel`}
                inputValue={dbrData?.productLevel}
                onChange={handleInputChange}
                placeHolder="33%"
                isValidation={true}
              />
            </div>
            <div className="relative">
              <InputText
                labelName="Consumer DBR"
                inputName={`consumerDBR`}
                inputValue={dbrData?.consumerDBR}
                onChange={handleInputChange}
                placeHolder="65%"
                isValidation={true}
              />
            </div>
            <div className="relative">
              <InputText
                labelName="GDBR (Without MTG)"
                inputName={`gdbrWithoutMTG`}
                inputValue={dbrData?.gdbrWithoutMTG}
                onChange={handleInputChange}
                placeHolder="65%"
                isValidation={true}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Employer Retired"
                inputName={`employerRetired`}
                inputValue={dbrData?.employerRetired}
                onChange={handleInputChange}
                inputOptions={empOptions}
                isValidation={true}
              />
            </div>
            <div className="relative">
              <InputText
                labelName="GDBR (including MTG)"
                inputName={`gdbrWithMTG`}
                inputValue={dbrData?.gdbrWithMTG}
                onChange={handleInputChange}
                placeHolder="65%"
                isValidation={true}
              />
            </div>
            <div className="w-8">
              <Button
                buttonIcon={PlusIcon}
                onClick={addNewRule}
                circle={true}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div>
          <div className="w-full">
            <Table
              handleChange={handleChangeDBC}
              handleDelete={handleItemDelete}
              handleSort={handleSort}
              toggleEdit={toggleEdit}
              editingIndex={editingIndex}
              currentItems={currentItems}
              getSortIcon={getSortIcon}
              TrashIcon={TrashIcon}
              PencilIcon={PencilIcon}
              empOptions={empOptions}
            />
          </div>
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
          {roleName !== "ROLE_VIEWER" ? (
            <div className="text-right ">
              <button
                type="button"
                onClick={handleTableChange}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </ContainerTile>
    </>
  );
};

export default DebtBurdenConfig;
