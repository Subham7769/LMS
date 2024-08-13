import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Passed, Warning } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import DynamicName from "../Common/DynamicName/DynamicName";
import Table from "./Table";
import { operatorOptions, empOptions } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import CloneModal from "../Common/CloneModal/CloneModal";
import { fetchDBRData } from "../../redux/Slices/sidebarSlice";
import { useDispatch } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const DebtBurdenConfig = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dbcTempId } = useParams();
  const [rules, setRules] = useState([]);
  const [debtBurdenData, setDebtBurdenData] = useState([]);
  const [operators, setOperators] = useState({
    firstNetIncomeBracketInSARuleOperator: "",
    secondNetIncomeBracketInSARuleOperator: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [name, setName] = useState("Fetching Name...");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    ruleName: "0",
    dbcTempId: dbcTempId,
    employerRetired: "",
    startNetIncomeBracketInSARule: "",
    endNetIncomeBracketInSARule: "",
    productLevel: "",
    consumerDBR: "",
    gdbrWithoutMTG: "",
    gdbrWithMTG: "",
  });

  console.log(formData);

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

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  useEffect(() => {
    fetchRules();
    fetchName();
    setFormData({
      ruleName: "0",
      dbcTempId: dbcTempId,
      employerRetired: "",
      startNetIncomeBracketInSARule: "",
      endNetIncomeBracketInSARule: "",
      productLevel: "",
      consumerDBR: "",
      gdbrWithoutMTG: "",
      gdbrWithMTG: "",
    });
  }, [dbcTempId]);

  const handleClone = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createCloneDBC = async (cloneDBCName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_DBR_CREATE_CLONE}${dbcTempId}/clone/${cloneDBCName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const dbcDetails = await data.json();
      console.log(dbcDetails);
      dispatch(fetchDBRData())

      navigate("/newdbc/" + dbcDetails.dbcTempId);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRules = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_DBR_READ}${dbcTempId}`,
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function fetchName() {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_DBR_NAME_READ}${dbcTempId}`,
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
      const retrievedname = await data.json();
      setName(retrievedname.name);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching name:", error);
    }
  }

  async function updateName(newName) {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_DBR_NAME_UPDATE}${dbcTempId}/name/${newName}`,
        {
          method: "PUT",
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
      } else if (data.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Update Successful"}
            message={"The name was updated successfully"}
          />
        ));

        fetchName();
      dispatch(fetchDBRData())

        // window.location.reload();
      }
    } catch (error) {
      console.error("Error Updating Name:", error);
    }
  }

  const deleteDBC = async (dbcTempId) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_DBR_DELETE}${dbcTempId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the item");
      }
      dispatch(fetchDBRData())
      
      navigate("/dbc");
      // Refresh the page after navigation
      // window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };

  const handleAddRule = async () => {
    toast.loading("Adding...", {
      duration: 1000,
      position: "bottom-center",
    });
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DBR_ADD_RULE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ operators: operators, dbrRules: [formData] }),
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
        setFormData({
          ruleName: "0",
          dbcTempId: dbcTempId,
          employerRetired: "",
          startNetIncomeBracketInSARule: "",
          endNetIncomeBracketInSARule: "",
          productLevel: "",
          consumerDBR: "",
          gdbrWithoutMTG: "",
          gdbrWithMTG: "",
        });
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
      position: "bottom-center",
    });
    const authToken = localStorage.getItem("authToken");
    const ruleToDelete = rules[indexOfFirstItem + index];
    console.log(ruleToDelete.ruleName);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DBR_DELETE}${dbcTempId}/${ruleToDelete.ruleName}`,
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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  const handleTableChange = async (index, field, value) => {
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
        `${import.meta.env.VITE_DBR_UPDATE}`,
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
      setLoading(true);
      console.log("Fetching data");
    } else {
      setRules(debtBurdenData?.dbrRules || []);
      setOperators(debtBurdenData?.operators || []);
    }
  }, [debtBurdenData, dbcTempId]);

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

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4 flex items-center justify-between">
        <DynamicName initialName={name} onSave={updateName} />
        <div className="flex gap-4">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button
            buttonIcon={TrashIcon}
            onClick={() => deleteDBC(dbcTempId)}
            circle={true}
          />
        </div>
      </div>
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createCloneDBC}
        initialName={name}
      />
      <ContainerTile>
        <div className="grid grid-cols-8 gap-2">
          <div className="relative">
            <InputSelect
              labelName={"Rule 1"}
              inputValue={operators.firstNetIncomeBracketInSARuleOperator}
              inputOptions={operatorOptions}
              onChange={(selected) =>
                setOperators({
                  ...operators,
                  firstNetIncomeBracketInSARuleOperator: selected.target.value,
                })
              }
              inputName="firstNetIncomeBracketInSARuleOperator"
            />
          </div>
          <div className="relative">
            <InputSelect
              labelName="Rule 2"
              inputValue={operators.secondNetIncomeBracketInSARuleOperator}
              inputOptions={operatorOptions}
              onChange={(selected) =>
                setOperators({
                  ...operators,
                  secondNetIncomeBracketInSARuleOperator: selected.target.value,
                })
              }
              inputName="secondNetIncomeBracketInSARuleOperator"
            />
          </div>
        </div>
        <div className="grid grid-cols-8 gap-2 items-end mt-2 border-b pb-5 mb-2">
          <div className="relative">
            <InputNumber
              labelName="Start Net"
              inputName={`startNetIncomeBracketInSARule`}
              inputValue={formData.startNetIncomeBracketInSARule}
              onChange={handleChange}
              placeHolder="10000"
            />
          </div>
          <div className="relative">
            <InputNumber
              labelName="End Net"
              inputName={`endNetIncomeBracketInSARule`}
              inputValue={formData.endNetIncomeBracketInSARule}
              onChange={handleChange}
              placeHolder="20000"
            />
          </div>
          <div className="relative">
            <InputText
              labelName="Product Level"
              inputName={`productLevel`}
              inputValue={formData.productLevel}
              onChange={handleChange}
              placeHolder="33%"
            />
          </div>
          <div className="relative">
            <InputText
              labelName="Consumer DBR"
              inputName={`consumerDBR`}
              inputValue={formData.consumerDBR}
              onChange={handleChange}
              placeHolder="65%"
            />
          </div>
          <div className="relative">
            <InputText
              labelName="GDBR (Without MTG)"
              inputName={`gdbrWithoutMTG`}
              inputValue={formData.gdbrWithoutMTG}
              onChange={handleChange}
              placeHolder="65%"
            />
          </div>
          <div className="relative">
            <InputSelect
              labelName="Employer Retired"
              inputName={`employerRetired`}
              inputValue={formData.employerRetired}
              onChange={handleChange}
              inputOptions={empOptions}
            />
          </div>
          <div className="relative">
            <InputText
              labelName="GDBR (including MTG)"
              inputName={`gdbrWithMTG`}
              inputValue={formData.gdbrWithMTG}
              onChange={handleChange}
              placeHolder="65%"
            />
          </div>
          <div className="w-8">
            <Button
              buttonIcon={PlusIcon}
              onClick={handleAddRule}
              circle={true}
            />
          </div>
        </div>
        <div>
          <div className="w-full">
            <Table
              handleChange={handleTableChange}
              handleDelete={handleDelete}
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
        </div>
      </ContainerTile>
    </>
  );
};

export default DebtBurdenConfig;