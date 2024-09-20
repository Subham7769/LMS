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
  resetFormData,
  updateRule,
} from "../../redux/Slices/dbrSlice";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Passed, Warning } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import DynamicName from "../Common/DynamicName/DynamicName";
import Table from "./Table";
import { operatorOptions, empOptions } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import CloneModal from "../Common/CloneModal/CloneModal";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const DebtBurdenConfig = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dbcTempId } = useParams();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Redux state selectors
  const rules = useSelector((state) => state.dbrConfig.rules);
  const operators = useSelector((state) => state.dbrConfig.operators);
  const name = useSelector((state) => state.dbrConfig.name);
  const loading = useSelector((state) => state.dbrConfig.loading);
  const currentPage = useSelector((state) => state.dbrConfig.currentPage);
  const isModalOpen = useSelector((state) => state.dbrConfig.isModalOpen);
  const formData = useSelector((state) => state.dbrConfig.formData);

  const [editingIndex, setEditingIndex] = useState(null);
  const [dbrRules, setDbrRules] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchRules(dbcTempId));
    dispatch(fetchName(dbcTempId));
  }, [dbcTempId, dispatch]);

  useEffect(() => {
    if (rules.length != 0) {
      setDbrRules(rules);
    }
  }, [rules]);

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
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Page Changed"}
        message={`You have switched to page: ${newPage}`}
      />
    ));
  };

  const handleItemDelete = (index) => {
    const authToken = localStorage.getItem("authToken");
    const ruleToDelete = rules[indexOfFirstItem + index];

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
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Deleting Successful"}
            message={"The item was deleted successfully"}
          />
        ));
      }
    });
  };

  const toggleEdit = (index) => {
    setEditingIndex(editingIndex === index ? null : index);
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
    try {
      const resultAction = await dispatch(
        createCloneDBC({ dbcTempId, cloneDBCName })
      );

      if (createCloneDBC.fulfilled.match(resultAction)) {
        const newDbcTempId = resultAction.payload;
        navigate("/dbr-config/" + newDbcTempId);
      } else {
        console.error(
          "Failed to create clone:",
          resultAction.payload || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during clone creation:", error);
    }
  };

  const updateNameHandler = (newName) => {
    dispatch(updateName({ dbcTempId, newName }));
  };

  const addNewRule = () => {
    dispatch(addRule({ operators, formData, dbcTempId }))
      .unwrap()
      .then((response) => {
        console.log("Rule added successfully:", response);
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Adding Successful"}
            message={"The item was added successfully"}
          />
        ));
        dispatch(resetFormData());
      })
      .catch((error) => {
        console.error("Failed to add rule:", error);
      });
  };

  const deleteCurrentDBC = async () => {
    try {
      const resultAction = await dispatch(deleteDBC(dbcTempId));

      if (deleteDBC.fulfilled.match(resultAction)) {
        navigate("/dbr-config");
      } else {
        console.error(
          "Failed to delete DBC:",
          resultAction.payload || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const handleTableChange = () => {
    dispatch(updateRule({ dbrRules, operators, dbcTempId }))
      .unwrap()
      .then((updatedRules) => {
        // Log the successful update or perform any other action with the updated rules
        console.log("Update successful:", updatedRules);
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Update Successful"}
            message={"The item was updated successfully"}
          />
        ));
      })
      .catch((error) => {
        // Handle errors that occurred during the update process
        console.error("Failed to update rule:", error);
        toast.error("Failed to update the item. Please try again.");
      });
  };

  const handleChangeDBC = (index, field, value) => {
    const absoluteIndex = indexOfFirstItem + index;
    const newRules = JSON.parse(JSON.stringify(rules));
    newRules[absoluteIndex][field] = value;
    setDbrRules(newRules);
  };

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

  const sortedItems = [...dbrRules].sort((a, b) => {
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
  const totalPages = Math.ceil(dbrRules.length / itemsPerPage);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4 flex items-center justify-between">
        <DynamicName initialName={name} onSave={updateNameHandler} />
        <div className="flex gap-4">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button
            buttonIcon={TrashIcon}
            onClick={() => deleteCurrentDBC(dbcTempId)}
            circle={true}
          />
        </div>
      </div>
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createClone}
        initialName={name}
      />
      <ContainerTile>
        <div className="grid grid-cols-10 gap-2 items-end mt-2 border-b pb-5 mb-2">
          <div className="relative">
            <InputSelect
              labelName="Min Net"
              inputValue={operators?.firstNetIncomeBracketInSARuleOperator}
              inputOptions={operatorOptions}
              onChange={handleOperatorChange}
              inputName="firstNetIncomeBracketInSARuleOperator"
            />
          </div>
          <div className="relative">
            <InputNumber
              inputName={`startNetIncomeBracketInSARule`}
              inputValue={formData?.startNetIncomeBracketInSARule}
              onChange={handleInputChange}
              placeHolder="10000"
            />
          </div>
          <div className="relative">
            <InputSelect
              labelName="Max Net"
              inputValue={operators?.secondNetIncomeBracketInSARuleOperator}
              inputOptions={operatorOptions}
              onChange={handleOperatorChange}
              inputName="secondNetIncomeBracketInSARuleOperator"
            />
          </div>
          <div className="relative">
            <InputNumber
              inputName={`endNetIncomeBracketInSARule`}
              inputValue={formData?.endNetIncomeBracketInSARule}
              onChange={handleInputChange}
              placeHolder="20000"
            />
          </div>
          <div className="relative">
            <InputText
              labelName="Product Level"
              inputName={`productLevel`}
              inputValue={formData?.productLevel}
              onChange={handleInputChange}
              placeHolder="33%"
            />
          </div>
          <div className="relative">
            <InputText
              labelName="Consumer DBR"
              inputName={`consumerDBR`}
              inputValue={formData?.consumerDBR}
              onChange={handleInputChange}
              placeHolder="65%"
            />
          </div>
          <div className="relative">
            <InputText
              labelName="GDBR (Without MTG)"
              inputName={`gdbrWithoutMTG`}
              inputValue={formData?.gdbrWithoutMTG}
              onChange={handleInputChange}
              placeHolder="65%"
            />
          </div>
          <div className="relative">
            <InputSelect
              labelName="Employer Retired"
              inputName={`employerRetired`}
              inputValue={formData?.employerRetired}
              onChange={handleInputChange}
              inputOptions={empOptions}
            />
          </div>
          <div className="relative">
            <InputText
              labelName="GDBR (including MTG)"
              inputName={`gdbrWithMTG`}
              inputValue={formData?.gdbrWithMTG}
              onChange={handleInputChange}
              placeHolder="65%"
            />
          </div>
          <div className="w-8">
            <Button buttonIcon={PlusIcon} onClick={addNewRule} circle={true} />
          </div>
        </div>
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
              informUser={informUser}
              informUser1={informUser1}
              TrashIcon={TrashIcon}
              PencilIcon={PencilIcon}
              empOptions={empOptions}
            />
          </div>

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
          <div className="text-right ">
            <button
              type="button"
              onClick={handleTableChange}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default DebtBurdenConfig;
