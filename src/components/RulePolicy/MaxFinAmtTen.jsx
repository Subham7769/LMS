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
import { Passed, Warning } from "../Toasts";
import { useParams } from "react-router-dom";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRulePolicyData,
  setInputList,
  updateFinanceAmountWithTenureRules,
  updateInputListItem,
  setMaxFinAmtRules,
  createMaxFinAmtEntry,
  deleteMaxFinAmtEntry,
  clearInputListItem,
} from "../../redux/Slices/rulePolicySlice";
import ListTable from "../Common/ListTable/ListTable";
import { MaxFinAmtHeaderList } from "../../data/RulePolicyData";

const MaxFinAmtTen = ({ FAWTData }) => {
  const { rulePolicyId } = useParams();
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const dispatch = useDispatch();
  const inputList = useSelector((state) => state.rulePolicy.inputList);
  const maxFinAmtRules = useSelector(
    (state) => state.rulePolicy.maxFinAmtRules
  );

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
    dispatch(setInputList(filteredData));
  }, [FAWTData]);

  const handleRuleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setMaxFinAmtRules({ [name]: value, rulePolicyTempId: rulePolicyId })
    );
  };

  const handleChange = (e, index) => {
    const absoluteIndex = indexOfFirstItem + index;
    const { name, value } = e.target;
    dispatch(updateInputListItem({ index: absoluteIndex, name, value })); // Dispatch the update action
  };

  const handleClear = (index) => {
    const absoluteIndex = indexOfFirstItem + index;
    dispatch(clearInputListItem(absoluteIndex));
  };

  const handleDelete = async (indexInPage) => {
    const absoluteIndex = indexOfFirstItem + indexInPage;
    const ruleToDelete = inputList[absoluteIndex];
    try {
      await dispatch(
        deleteMaxFinAmtEntry({
          rulePolicyId,
          ruleName: ruleToDelete.ruleName,
        })
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
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateFinanceAmountWithTenureRules(inputList)).unwrap();
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
      console.error("Error during update:", error);
    }
  };

  const CreateEntry = async () => {
    try {
      await dispatch(createMaxFinAmtEntry()).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Create Successful"}
          message={"The item was created successfully"}
        />
      ));
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      console.error("Error during create:", error);
    }
  };

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

  const ActionList = [
    {
      icon: PencilIcon,
      circle: true,
      action: handleUpdate,
    },
    {
      icon: TrashIcon,
      circle: true,
      action: handleDelete,
    },
  ];
  const tableDataWithoutId = currentItems.map(
    ({ ruleName, rulePolicyTempId, fieldType, ...rest }) => rest
  );
  console.log(currentItems);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
        <div className="text-lg mb-5">Max Finance Amount With Tenure</div>
        <div className="grid grid-cols-3 gap-5 items-end">
          <InputNumber
            labelName={"Amount"}
            inputName={"financeAmount"}
            inputValue={maxFinAmtRules.financeAmount}
            onChange={handleRuleChange}
            placeHolder={"999"}
          />
          <InputNumber
            labelName={"Tenure"}
            inputName={"tenure"}
            inputValue={maxFinAmtRules.tenure}
            onChange={handleRuleChange}
            placeHolder={"6"}
          />
          <Button buttonIcon={PlusIcon} onClick={CreateEntry} circle={true} />
        </div>
        <div className="mt-6">
          <ListTable
            ListHeader={MaxFinAmtHeaderList}
            ListItem={tableDataWithoutId}
            ListAction={ActionList}
            handleEditableFields={handleChange}
            Sortable={true}
          />
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
      </ContainerTile>
    </>
  );
};

export default MaxFinAmtTen;
// shadow-md bg-gray-100 rounded-xl p-6
