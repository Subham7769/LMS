import React, { useState } from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import { tenureTypeOptions } from "../../data/OptionsData";
import { PlusIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addInterestTenure } from "../../redux/Slices/productSlice";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { useOutletContext } from "react-router-dom";
import {
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { setUpdateMap } from "../../redux/Slices/notificationSlice";
import { validateForm } from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

const InterestTenure = () => {
  const { productData, handleChange } = useOutletContext();
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

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    toast(`You have switched to page: ${newPage}`);
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

  // Determine total number of pages
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  function informUser() {
    toast.warn("Please click the save button to confirm changes");
  }

  let columns = [
    { label: "Simple Interest", key: "interestRate", sortable: true },
    { label: "PER", key: "interestPeriodType", sortable: true },
    { label: "Loan Tenure", key: "LoanTenure", sortable: true },
    { label: "Loan Tenure Type", key: "tenureType", sortable: true },
    { label: "Repayment Tenure", key: "RepaymentTenure", sortable: true },
    {
      label: "Repayment Tenure Type",
      key: "RepaymentTenureType",
      sortable: true,
    },
  ];

  // Conditionally add the "Actions" column if roleName has view only access
  if (!hasViewOnlyAccess(roleName)) {
    columns.push({ label: "Actions", key: "actions", sortable: false });
  }

  return (
    <div className="flex flex-col gap-5">
      {!hasViewOnlyAccess(roleName) ? (
        <div className="grid grid-cols-7 gap-5 items-end border-t-2 py-5">
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
          <div className="flex justify-center align-middle">
            <Button
              buttonIcon={PlusIcon}
              onClick={handleAddFields}
              circle={true}
              buttonType="secondary"
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <table className="w-full divide-y divide-gray-200 border border-border-gray-primary">
        <thead className="bg-background-light-secondary">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                onClick={column.sortable ? () => handleSort(column.key) : null}
                className={column.sortable ? "cursor-pointer" : ""}
              >
                <div className="px-6 py-3 text-left text-[10px] font-medium text-text-light-primary uppercase tracking-wider flex">
                  {column.label} {column.sortable && getSortIcon(column.key)}
                </div>
              </th>
            ))}
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
            currentItems?.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
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
                  ) : (
                    <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {item?.interestRate}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
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
                  ) : (
                    <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {item?.interestPeriodType ? item?.interestPeriodType : ""}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
                    <InputNumber
                      inputName={"loanTenure"}
                      inputValue={item?.loanTenure}
                      onChange={(e) =>
                        handleInterestChange(
                          index,
                          "loanTenure",
                          e.target.value
                        )
                      }
                      placeHolder="3"
                      isValidation={true}
                      isIndex={item?.dataIndex}
                    />
                  ) : (
                    <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {item?.loanTenure}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
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
                  ) : (
                    <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {item?.loanTenureType ? item?.loanTenureType : ""}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
                    <InputNumber
                      // inputName={`repaymentTenure-${index}`}
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
                      // showError={validationError.repaymentTenure}
                      // onFocus={() =>
                      //   dispatch(
                      //     setValidationError({
                      //       ...validationError,
                      //       repaymentTenure: false,
                      //     })
                      //   )
                      // }
                    />
                  ) : (
                    <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {item?.repaymentTenure}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
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
                  ) : (
                    <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {item?.repaymentTenureType
                        ? item?.repaymentTenureType
                        : ""}
                    </span>
                  )}
                </td>
                {!hasViewOnlyAccess(roleName) ? (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
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
                          className="w-9 h-9 rounded-full bg-gray-500 p-2 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                        >
                          <CheckCircleIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-500 p-2 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                      )}
                    </button>
                    <Button
                      buttonIcon={TrashIcon}
                      onClick={() => handleDelete(index)}
                      circle={true}
                      buttonType="destructive"
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
        <Button
          buttonIcon={ChevronLeftIcon}
          onClick={
            currentPage === 1
              ? () => {}
              : () => handlePageChange(currentPage - 1)
          }
          rectangle={true}
          className={`
                ${
                  currentPage === 1
                    ? "bg-background-light-primary cursor-not-allowed"
                    : ""
                }
              `}
          disabled={currentPage === 1}
          buttonType="secondary"
        />

        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          buttonIcon={ChevronRightIcon}
          onClick={
            currentPage === totalPages || currentItems.length < 1
              ? () => {}
              : () => handlePageChange(currentPage + 1)
          }
          rectangle={true}
          className={`
                ${
                  currentPage === totalPages || currentItems.length < 1
                    ? "bg-background-light-primary cursor-not-allowed"
                    : ""
                }
              `}
          disabled={currentPage === totalPages || currentItems.length < 1}
          buttonType="secondary"
        />
      </div>
    </div>
  );
};

export default InterestTenure;
