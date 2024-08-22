import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { RowChanged, Warning } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import DynamicName from "../Common/DynamicName/DynamicName";
import Button from "../Common/Button/Button";
import { tenureTypeOptions, options } from "../../data/OptionsData";
import ProductInputFields from "./ProductInputFields";
import { fetchProductData } from "../../redux/Slices/sidebarSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  fetchData,
  setFormData,
  updateFormField,
  updateInterestTenure,
  deleteInterestTenure,
  saveProductData,
  updateProductName,
  deleteLoanProduct,
} from "../../redux/Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const LoanProductConfig = () => {
  const { productType, loanProId, projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sort & Pagination
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const { formData, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchData(productType));
  }, [dispatch, productType]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(updateFormField({ name, value: fieldValue }));
  };

  const handleInterestChange = (index, field, eventOrValue) => {
    const value = eventOrValue?.target
      ? eventOrValue.target.value
      : eventOrValue;
    dispatch(updateInterestTenure({ index, field, value }));
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

  const toggleEdit = (index) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  console.log(formData);

  const handleDelete = (indexInPage) => {
    const absoluteIndex = indexOfFirstItem + indexInPage;
    dispatch(deleteInterestTenure({ index: absoluteIndex }));

    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Not Yet Deleted!"}
        message={"Please click the save button to confirm removal of entry"}
      />
    ));
  };

  const handleSave = async () => {
    try {
      // Dispatch the saveProductData thunk with necessary parameters
      dispatch(saveProductData({ loanProId, formData }));
      // toast.custom((t) => <RowChanged t={t} toast={toast} />);
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleProductNameChange = async (newName) => {
    toast.loading("Updating name, please wait...", { duration: 3000 });
    try {
      await dispatch(
        updateProductName({
          loanProId,
          newName,
        })
      );
      navigate(
        `/product/${newName}/loan-product-config/${projectId}/${loanProId}`
      );
      dispatch(fetchData(newName));
      dispatch(fetchProductData());
    } catch (error) {
      console.error("Failed to update product name:", error);
    }
  };

  const handleDeleteLoanProduct = async () => {
    try {
      await dispatch(deleteLoanProduct(loanProId)).unwrap();
      await dispatch(fetchProductData());
      navigate("/product");
    } catch (error) {
      console.error("Failed to delete loan product:", error);
      // Optionally handle the error in the UI
    }
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

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
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

  // Sort the items based on sortConfig
  const sortedItems = [...formData?.interestEligibleTenure].sort((a, b) => {
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
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Not Yet Saved"}
        message={"Please click the save button to confirm changes"}
      />
    ));
  }

  const columns = [
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
    { label: "Actions", key: "actions", sortable: false }, // No sorting for actions
  ];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center mb-5">
        <DynamicName
          initialName={formData.productType}
          onSave={handleProductNameChange}
        />
        <Button
          buttonIcon={TrashIcon}
          onClick={() => handleDeleteLoanProduct(loanProId)}
          circle={true}
          className={
            "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
          }
        />
      </div>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <ProductInputFields formData={formData} handleChange={handleChange} />
        <div>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    onClick={
                      column.sortable ? () => handleSort(column.key) : null
                    }
                    className={column.sortable ? "cursor-pointer" : ""}
                  >
                    <div className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider flex">
                      {column.label}{" "}
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputText
                          inputName={`interestRate-${index}`}
                          inputValue={item.interestRate}
                          onChange={(e) =>
                            handleInterestChange(
                              index,
                              "interestRate",
                              e.target.value
                            )
                          }
                          placeHolder="2%"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.interestRate}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputSelect
                          inputOptions={options}
                          inputName={`interestPeriodType-${index}`}
                          inputValue={item.interestPeriodType}
                          onChange={(selectedOption) =>
                            handleInterestChange(
                              index,
                              "interestPeriodType",
                              selectedOption
                            )
                          }
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.interestPeriodType
                            ? item.interestPeriodType
                            : ""}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputNumber
                          inputName={`loanTenure-${index}`}
                          inputValue={item.loanTenure}
                          onChange={(e) =>
                            handleInterestChange(
                              index,
                              "loanTenure",
                              e.target.value
                            )
                          }
                          placeHolder="3"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.loanTenure}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputSelect
                          inputOptions={tenureTypeOptions}
                          inputName={`loanTenureType-${index}`}
                          inputValue={item.loanTenureType}
                          onChange={(selectedOption) =>
                            handleInterestChange(
                              index,
                              "loanTenureType",
                              selectedOption
                            )
                          }
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.loanTenureType ? item.loanTenureType : ""}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputNumber
                          inputName={`repaymentTenure-${index}`}
                          inputValue={item.repaymentTenure}
                          onChange={(e) =>
                            handleInterestChange(
                              index,
                              "repaymentTenure",
                              e.target.value
                            )
                          }
                          placeHolder="3"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.repaymentTenure}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputSelect
                          inputOptions={tenureTypeOptions}
                          inputName={`repaymentTenureType-${index}`}
                          inputValue={item.repaymentTenureType}
                          onChange={(selectedOption) =>
                            handleInterestChange(
                              index,
                              "repaymentTenureType",
                              selectedOption
                            )
                          }
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.repaymentTenureType
                            ? item.repaymentTenureType
                            : ""}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                      <button onClick={() => toggleEdit(index)} type="button">
                        {editingIndex === index ? (
                          <div
                            onClick={informUser}
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
                        onClick={() => handleDelete(index)}
                        circle={true}
                      />
                    </td>
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
          ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : ""}
        `}
              disabled={currentPage === 1}
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
              ? "bg-gray-300 cursor-not-allowed"
              : ""
          }
        `}
              disabled={currentPage === totalPages || currentItems.length < 1}
            />
          </div>
          <div className="text-right mt-5">
            <Button
              buttonIcon={CheckCircleIcon}
              buttonName="Save"
              onClick={handleSave}
              rectangle={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanProductConfig;
