import { useEffect } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import Button from "../Common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../redux/Slices/sidebarSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  setProductData,
  updateProductDataField,
  createProductData,
} from "../../redux/Slices/productSlice";
import store from "../../redux/store";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import ProductSidebar from "./ProductSidebar";
import { CheckIcon } from "../../assets/icons";
import { toast } from "react-toastify";
import {
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  CalculatorIcon,
  CpuChipIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";

const CreateNewProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productName } = useParams();
  const dispatch = useDispatch();
  const { productData, loading } = useSelector((state) => state.product);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(updateProductDataField({ name, value: fieldValue }));
  };

  useEffect(() => {
    if (productName) {
      dispatch(setProductData({ productType: productName }));
    }
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, productName]);

  const handleCreateProduct = async () => {
    await dispatch(validateForm(productData));
    const state = store.getState();
    const isValid = state.validation.isValid;

    if (isValid) {
      try {
        const newProductData = {
          ...productData,
          routingLink: `/loan/loan-product/${productName}/${productData.projectId}/product-config`,
          section: "Product",
        };

        const action = await dispatch(
          createProductData({ productData: newProductData, roleName })
        );

        if (createProductData.fulfilled.match(action)) {
          // ✅ Only navigate if the request was successful
          navigate(`/loan/loan-product/`);
          dispatch(fetchProductData());
        } else {
          console.error(
            "Failed to create product:",
            action.payload || action.error
          );
          // Optionally, display a toast notification here
        }
      } catch (error) {
        console.error("Error while creating product:", error);
      }
    } else {
      toast.error("Please fill all the required fields before saving.");
    }
  };

  const basePath = `/loan/loan-product/newProduct/${productName}`;

  const navItems = [
    {
      label: "Product Config",
      path: "/product-config",
      ButtonIcon: CpuChipIcon,
    },
    { label: "Eligibility", path: "/eligibility", ButtonIcon: CalculatorIcon },
    { label: "Upfront Fee", path: "/upfront-fee", ButtonIcon: BanknotesIcon },
    {
      label: "Options",
      path: "/options",
      ButtonIcon: EllipsisHorizontalCircleIcon,
    },
    {
      label: "Interest Tenure",
      path: "/interest-tenure",
      ButtonIcon: AdjustmentsHorizontalIcon,
    },
  ];

  const currentIndex = navItems.findIndex((item) =>
    location.pathname.includes(item.path)
  );
  const isLastPage = currentIndex === navItems.length - 1;

  const handleNext = () => {
    if (currentIndex < navItems.length - 1) {
      const nextPath = `${basePath}${navItems[currentIndex + 1].path}`;
      navigate(nextPath);
    }
  };

  return (
    <>
      <h1 className="mb-5">
        <b
          title={productName}
          className="mb-4 text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          {productName}
        </b>
      </h1>
      <ContainerTile loading={loading}>
        <div className="flex flex-col md:flex-row md:-mr-px">
          <ProductSidebar navItems={navItems} basePath={basePath} />
          <div className="flex-grow">
            <div className="p-5">
              <Outlet context={{ productData, handleChange }} />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700/60 px-6 py-5">
              <div className="text-right">
                {isLastPage ? (
                  <Button
                    buttonIcon={CheckIcon}
                    buttonName="Create"
                    onClick={handleCreateProduct}
                    buttonType="primary"
                    loading={loading}
                  />
                ) : (
                  <Button
                    buttonName="Next"
                    onClick={handleNext}
                    buttonType="secondary"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default CreateNewProduct;
