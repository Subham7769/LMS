import { useEffect, useState } from "react";
import {
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { useParams, useNavigate, Outlet } from "react-router-dom";
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
import ProductSidebar from "./ProductSidebar";

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
    setCurrentPage(1);
    return () => {
      dispatch(clearValidationError());
      dispatch(clearUpdateMap());
    };
  }, [dispatch, productType]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(updateProductDataField({ name, value: fieldValue }));
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
            routingLink: `/loan/loan-product/${productType}/${projectId}/${loanProId}`,
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
      navigate(`/loan/loan-product/${newName}/${projectId}/${loanProId}`);
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
        <div className="bg-white dark:bg-gray-800 mb-8">
          <div className="flex flex-col md:flex-row md:-mr-px">
            <ProductSidebar />
            <div className="flex-grow">
              <div className="py-5 pl-5">
                <Outlet context={{ productData, handleChange }} />
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700/60">
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
            </div>
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default LoanProductConfig;
