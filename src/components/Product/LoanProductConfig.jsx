import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import Button from "../Common/Button/Button";
import { fetchProductData } from "../../redux/Slices/sidebarSlice";
import {
  fetchData,
  updateProductDataField,
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
import { clearUpdateMap } from "../../redux/Slices/notificationSlice";
import { fetchRoles } from "../../redux/Slices/userManagementSlice";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import ProductSidebar from "./ProductSidebar";
import convertToTitleCase from "../../utils/convertToTitleCase";

const LoanProductConfig = () => {
  const { productType, loanProId, projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productData, loading, error } = useSelector((state) => state.product);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const { updateMap } = useSelector((state) => state.notification);

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
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(updateProductDataField({ name, value: fieldValue }));
    }
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
      navigate(
        `/loan/loan-product/${newName}/${projectId}/${loanProId}/product-config`
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

  const basePath = `/loan/loan-product/${productType}/${projectId}/${loanProId}`;

  const navItems = [
    { label: "Product Config", path: "/product-config" },
    { label: "Eligibility", path: "/eligibility" },
    { label: "Upfront Fee", path: "/upfront-fee" },
    { label: "Options", path: "/options" },
    { label: "Interest Tenure", path: "/interest-tenure" },
  ];

  return (
    <>
      <DynamicHeader
        itemName={convertToTitleCase(productData?.productType)}
        handleNameUpdate={handleProductNameChange}
        handleDelete={() => handleDeleteLoanProduct(loanProId)}
        loading={loading}
        // error={error}
      />
      <ContainerTile loading={loading}>
        <div className="flex flex-col md:flex-row md:-mr-px">
          <ProductSidebar navItems={navItems} basePath={basePath} />
          <div className="flex-grow">
            <div className="p-5">
              <Outlet context={{ productData, handleChange }} />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700/60 px-6 py-5">
              {!hasViewOnlyAccess(roleName) ? (
                <div className="text-right">
                  <Button
                    buttonIcon={CheckCircleIcon}
                    buttonName="Save"
                    onClick={handleSave}
                    rectangle={true}
                    buttonType={"success"}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default LoanProductConfig;
