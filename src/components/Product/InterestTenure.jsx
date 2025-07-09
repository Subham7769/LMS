import React, { useState } from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import { tenureTypeOptions } from "../../data/OptionsData";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addInterestTenure,
  deleteInterestTenure,
  updateInterestTenure,
} from "../../redux/Slices/productSlice";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { useOutletContext } from "react-router-dom";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { setUpdateMap } from "../../redux/Slices/notificationSlice";
import { validateForm } from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "../../assets/icons";
import convertToTitleCase from "../../utils/convertToTitleCase";
import PaginationClassic from "../Common/Pagination/PaginationClassic";
import ListTableClassic from "../Common/ListTable/ListTableClassic";

const InterestTenure = () => {
  const { productData } = useOutletContext();
  // Sidebar Redux Data
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.auth);
  const roleName = userData?.roles[0]?.name;

  // Sort & Pagination
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // console.log(ProjectDataInfo);

  // Entries State
  const [interestEligibleTenure, setInterestEligibleTenure] = useState({
    interestRate: "",
    interestPeriodType: "",
    loanTenure: "",
    loanTenureType: "",
    repaymentTenure: "",
    repaymentTenureType: "",
  });

  const handleChangeInterestEligibleTenure = (e) => {
    const { name, value } = e.target;
    setInterestEligibleTenure((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddFields = () => {
    if (
      Object.values(interestEligibleTenure).every(
        (field) => String(field).trim() !== ""
      )
    ) {
      dispatch(addInterestTenure(interestEligibleTenure));
      setInterestEligibleTenure({
        interestRate: "",
        interestPeriodType: "",
        loanTenure: "",
        loanTenureType: "",
        repaymentTenure: "",
        repaymentTenureType: "",
      });
      return;
    } else {
      toast.error("All Fields Required!");
      return;
    }
  };

  const handleInterestChange = (index, field, eventOrValue) => {
    const absoluteIndex = index + indexOfFirstItem;
    const value = eventOrValue?.target
      ? eventOrValue.target.value
      : eventOrValue;
    dispatch(updateInterestTenure({ index: absoluteIndex, field, value }));
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === column && sortConfig.direction === "desc") {
      direction = ""; // This will reset the sort
    }
    setSortConfig({ key: column, direction });
  };

  const toggleEdit = async (index) => {
    const absoluteIndex = index + indexOfFirstItem;
    if (editingIndex !== null) {
      const interestEligibleTenure =
        productData.interestEligibleTenure[absoluteIndex];
      // console.log(interestEligibleTenure);
      await dispatch(validateForm(interestEligibleTenure));
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
    }
  };

  const handleDelete = (indexInPage) => {
    const absoluteIndex = indexOfFirstItem + indexInPage;
    dispatch(deleteInterestTenure({ index: absoluteIndex }));
    toast.warn("Please click the save button to confirm removal of entry");
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

  // Sort the items based on sortConfig
  const sortedItems = [...productData?.interestEligibleTenure].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Calculate the indices for current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  function informUser() {
    toast.warn("Please click the save button to confirm changes");
  }

  let ListHeader = [
    { name: "Simple Interest", sortKey: null },
    { name: "Loan Tenure", sortKey: null },
    { name: "Repayment Tenure", sortKey: null },
  ];

  // Conditionally add the "Actions" column if roleName has view only access
  if (!hasViewOnlyAccess(roleName)) {
    ListHeader.push({ name: "Actions", sortKey: null });
  }

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Interest Tenure
      </h2>
      {!hasViewOnlyAccess(roleName) && (
        <>
          <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-3">
            Add New Interest and Tenure
          </h2>
          <div className="grid grid-cols-2 gap-5 items-end mb-5">
            <InputText
              labelName="Simple Interest"
              inputName="interestRate"
              inputValue={interestEligibleTenure?.interestRate}
              onChange={handleChangeInterestEligibleTenure}
              placeHolder="2%"
            />
            <InputSelect
              labelName="Per"
              inputOptions={tenureTypeOptions}
              inputName="interestPeriodType"
              inputValue={interestEligibleTenure?.interestPeriodType}
              onChange={handleChangeInterestEligibleTenure}
            />
            <InputNumber
              labelName="Tenure"
              inputName="loanTenure"
              inputValue={interestEligibleTenure?.loanTenure}
              onChange={handleChangeInterestEligibleTenure}
              placeHolder="3"
            />
            <InputSelect
              labelName="Tenure Type"
              inputValue={interestEligibleTenure?.loanTenureType}
              inputOptions={tenureTypeOptions}
              inputName="loanTenureType"
              onChange={handleChangeInterestEligibleTenure}
            />
            <InputNumber
              labelName="Repayment Tenure"
              inputName="repaymentTenure"
              inputValue={interestEligibleTenure?.repaymentTenure}
              onChange={handleChangeInterestEligibleTenure}
              placeHolder="0"
            />
            <InputSelect
              labelName="Repayment Tenure Type"
              inputName="repaymentTenureType"
              inputOptions={tenureTypeOptions}
              inputValue={interestEligibleTenure?.repaymentTenureType}
              onChange={handleChangeInterestEligibleTenure}
            />
            <div className="grid col-span-2 justify-end align-middle">
              <Button
                buttonIcon={AddIcon}
                buttonName="Add"
                onClick={handleAddFields}
                buttonType="secondary"
              />
            </div>
          </div>
        </>
      )}
      <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-3">
        Manage Existing Interest and Tenure
      </h2>
      <ListTableClassic
        ListName="Eligible Tenure"
        ListNameLength={productData?.interestEligibleTenure.length}
        ListHeader={ListHeader}
        handleSort={handleSort}
        getSortIcon={getSortIcon}
      >
        {currentItems?.map((item, index) => (
          <tr key={index}>
            <td className="p-4 whitespace-nowrap">
              {editingIndex === index ? (
                <div className="grid grid-cols-[40%_20%_40%] min-w-[225px] items-center text-center">
                  <InputText
                    inputName={"interestRate"}
                    inputValue={item?.interestRate}
                    onChange={(e) =>
                      handleInterestChange(
                        index,
                        "interestRate",
                        e.target.value
                      )
                    }
                    placeHolder="2%"
                    isValidation={true}
                    isIndex={item?.dataIndex}
                  />
                  Per
                  <InputSelect
                    inputOptions={tenureTypeOptions}
                    inputName={"interestPeriodType"}
                    inputValue={item?.interestPeriodType}
                    onChange={(selectedOption) =>
                      handleInterestChange(
                        index,
                        "interestPeriodType",
                        selectedOption
                      )
                    }
                    isValidation={true}
                    isIndex={item?.dataIndex}
                  />
                </div>
              ) : (
                <span className="">
                  {item?.interestRate} Per{" "}
                  {item?.interestPeriodType
                    ? convertToTitleCase(item?.interestPeriodType)
                    : ""}
                </span>
              )}
            </td>
            <td className="p-4 whitespace-nowrap">
              {editingIndex === index ? (
                <div className="grid grid-cols-[30%_70%] min-w-[180px] gap-2 items-center">
                  <InputNumber
                    inputName={"loanTenure"}
                    inputValue={item?.loanTenure}
                    onChange={(e) =>
                      handleInterestChange(index, "loanTenure", e.target.value)
                    }
                    placeHolder="3"
                    isValidation={true}
                    isIndex={item?.dataIndex}
                  />
                  <InputSelect
                    inputOptions={tenureTypeOptions}
                    inputName={"loanTenureType"}
                    inputValue={item?.loanTenureType}
                    onChange={(selectedOption) =>
                      handleInterestChange(
                        index,
                        "loanTenureType",
                        selectedOption
                      )
                    }
                    isValidation={true}
                    isIndex={item?.dataIndex}
                  />
                </div>
              ) : (
                <span className="">
                  {item?.loanTenure}{" "}
                  {item?.loanTenureType
                    ? convertToTitleCase(item?.loanTenureType)
                    : ""}
                </span>
              )}
            </td>
            <td className="p-4 whitespace-nowrap">
              {editingIndex === index ? (
                <div className="grid grid-cols-[30%_70%] min-w-[180px] gap-2 items-center">
                  <InputNumber
                    inputName={"repaymentTenure"}
                    inputValue={item?.repaymentTenure}
                    onChange={(e) =>
                      handleInterestChange(
                        index,
                        "repaymentTenure",
                        e.target.value
                      )
                    }
                    placeHolder="3"
                    isValidation={true}
                    isIndex={item?.dataIndex}
                  />
                  <InputSelect
                    inputOptions={tenureTypeOptions}
                    inputName={"repaymentTenureType"}
                    inputValue={item?.repaymentTenureType}
                    onChange={(selectedOption) =>
                      handleInterestChange(
                        index,
                        "repaymentTenureType",
                        selectedOption
                      )
                    }
                    isValidation={true}
                    isIndex={item?.dataIndex}
                  />
                </div>
              ) : (
                <span className="">
                  {item?.repaymentTenure}{" "}
                  {item?.repaymentTenureType
                    ? convertToTitleCase(item?.repaymentTenureType)
                    : ""}
                </span>
              )}
            </td>
            {!hasViewOnlyAccess(roleName) && (
              <td className="px-4 py-4 whitespace-nowrap flex gap-2">
                <button
                  onClick={() => {
                    toggleEdit(index);
                    dispatch(setUpdateMap("interestEligibleTenure"));
                  }}
                  type="button"
                >
                  {editingIndex === index ? (
                    <div
                      // onClick={informUser}
                      className="cursor-pointer btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-violet-400 hover:text-violet-500 dark:text-violet-500 dark:hover:text-violet-400"
                    >
                      <CheckIcon className="h-4 w-4" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="cursor-pointer btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                      <EditIcon className={"h-4 w-4"} />
                    </div>
                  )}
                </button>
                <Button
                  buttonIcon={DeleteIcon}
                  onClick={() => handleDelete(index)}
                  buttonType="destructive"
                  iconClassName="h-4 w-4"
                />
              </td>
            )
            }
          </tr>
        ))}
      </ListTableClassic>
      {currentItems.length > 0 && (
        <PaginationClassic
          sortedItems={sortedItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default InterestTenure;
