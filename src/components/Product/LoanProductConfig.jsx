import { useEffect, useState } from "react";
import {
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import { tenureTypeOptions, options } from "../../data/OptionsData";
import ProductInputFields from "./ProductInputFields";
import { fetchProductData } from "../../redux/Slices/sidebarSlice";
import {
  fetchData,
  updateProductDataField,
  updateInterestTenure,
  deleteInterestTenure,
  saveProductData,
  updateProductName,
  deleteLoanProduct,
} from "../../redux/Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import { toast } from "react-toastify";
import {
  clearUpdateMap,
  setUpdateMap,
} from "../../redux/Slices/notificationSlice";
import { fetchRoles } from "../../redux/Slices/userManagementSlice";
import { hasViewOnlyAccess } from "../../utils/roleUtils";

const LoanProductConfig = () => {
  const { productType, loanProId, projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sort & Pagination
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const { productData, loading, error } = useSelector((state) => state.product);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const { updateMap } = useSelector((state) => state.notification);
  const { roleData } = useSelector((state) => state.userManagement);

  useEffect(() => {
    dispatch(fetchData(productType));
    dispatch(fetchRoles());
    return () => {
      dispatch(clearValidationError());
      dispatch(clearUpdateMap());
    };
  }, [dispatch, productType]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(updateProductDataField({ name, value: fieldValue }));
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

  const handleSave = async () => {
    await dispatch(validateForm(productData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      try {
        if (roleName !== "ROLE_MAKER_ADMIN") {
          dispatch(saveProductData({ loanProId, productData, roleName }));
        } else {
          const updatedProductData = {
            ...productData,
            routingLink: `/loan/loan-product/${productType}/loan-product-config/${projectId}/${loanProId}`,
            updateMap: updateMap,
            section: "Product",
          };
          // console.log(updatedProductData);
          dispatch(
            saveProductData({
              loanProId,
              productData: updatedProductData,
              roleName,
            })
          );
        }

        // Dispatch the saveProductData thunk with necessary parameters

        // dispatch(saveProductData({ loanProId, updatedProductData, roleName }));
      } catch (error) {
        console.error("Failed to update data:", error);
      }
    }
  };

  const handleProductNameChange = async (newName) => {
    try {
      await dispatch(
        updateProductName({
          loanProId,
          newName,
        })
      );
      navigate(
        `/loan/loan-product/${newName}/loan-product-config/${projectId}/${loanProId}`
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
      navigate("/loan/loan-product");
    } catch (error) {
      console.error("Failed to delete loan product:", error);
      // Optionally handle the error in the UI
    }
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

  // console.log(updateMap);

  return (
    <>
      <DynamicHeader
        itemName={productData?.productType}
        handleNameUpdate={handleProductNameChange}
        handleDelete={() => handleDeleteLoanProduct(loanProId)}
        loading={loading}
        // error={error}
      />
      <ContainerTile loading={loading}>
        <ProductInputFields
          productData={productData}
          handleChange={handleChange}
        />
        <div className="">
          <table className="w-full divide-y divide-gray-200 border border-border-gray-primary">
            <thead className="bg-background-light-secondary">
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
                    <div className="px-6 py-3 text-left text-[10px] font-medium text-text-light-primary uppercase tracking-wider flex">
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
                          {item?.interestPeriodType
                            ? item?.interestPeriodType
                            : ""}
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

          {!hasViewOnlyAccess(roleName) ? (
            <div className="text-right mt-5">
              <Button
                buttonIcon={CheckCircleIcon}
                buttonName="Save"
                onClick={handleSave}
                rectangle={true}
                buttonType={"primary"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </ContainerTile>
    </>
  );
};

export default LoanProductConfig;
