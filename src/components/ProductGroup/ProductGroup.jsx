import React, { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import TagInput from "../TagInput/TagInput";
import DynamicName from "../Common/DynamicName/DynamicName";
import LoadingState from "../Common/Loader/Loader";
import InputNumber from "../Common/InputNumber/InputNumber";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed, Warning } from "../Toasts";
import {
  fetchLoanProducts,
  fetchPGroups,
  setFormData,
  updateProductGroup,
  handleChangeDispatch,
  deleteProductTag,
  addProductTag,
} from "../../redux/Slices/productGroupSlice";
import { fetchProdGroupData } from "../../redux/Slices/sidebarSlice";
import {
  clearValidationError,
  setValidationError,
  validateFormFields,
  validateUserRole,
} from "../../redux/Slices/validationSlice";

const ProductGroup = () => {
  const dispatch = useDispatch();
  const { productGroupData, productTypeOptions, loading } = useSelector(
    (state) => state.productGroup
  );
  const { validationError } = useSelector((state) => state.validation);
  const fields = [
    "percentageFromEmi",
    "hardLimit",
    "renewInDays",
    "userRole",
    "limit",
    "product",
  ];

  useEffect(() => {
    dispatch(fetchPGroups());
    dispatch(fetchLoanProducts());

    const initialValidationError = {};
    fields.forEach((field) => {
      initialValidationError[field] = false; // Set all fields to false initially
    });
    dispatch(setValidationError(initialValidationError));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeDispatch({ name, value }));
  };

  const handleUpdatePGName = (updatePGName) => {
    dispatch(setFormData({ name: "configName", value: updatePGName }));
  };

  const handleTagInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name, value }));
  };

  const addTag = () => {
    // console.log(tag);
    const limit = productGroupData.limit;
    const product = productGroupData.product;
    const isValid = validateFormFields(fields, { limit, product }, dispatch);
    if (isValid) {
      const newTag = { product, limit };
      if (
        productGroupData.tags.some(
          (existingTag) => existingTag.product === newTag.product
        )
      ) {
        toast.custom((t) => (
          <Warning t={t} toast={toast} title={"This product already exists!"} />
        ));
      } else {
        dispatch(addProductTag(newTag));
      }
    }
  };

  const deleteTag = (tag) => {
    dispatch(deleteProductTag(tag.product));
  };

  const handleUpdate = async () => {
    const percentageFromEmi =
      productGroupData?.overDuePercentage?.percentageFromEmi;
    const hardLimit = productGroupData?.financeHardLimit?.hardLimit;
    const renewInDays = productGroupData?.renewCreditReport?.renewInDays;
    const activeLoansCount = productGroupData?.activeLoansCount;
    const isValid = validateFormFields(
      fields,
      { percentageFromEmi, hardLimit, renewInDays },
      dispatch
    );
    const isValid2 = validateUserRole(activeLoansCount, dispatch);
    if (!isValid2) {
      toast.custom((t) => (
        <Failed
          t={t}
          toast={toast}
          title={"Alert"}
          message={"Add atleast 1 product"}
        />
      ));
    }
    if (isValid && isValid2) {
      await dispatch(updateProductGroup(productGroupData)).unwrap();
      await dispatch(fetchProdGroupData()).unwrap();
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-between mb-5">
        <DynamicName
          initialName={productGroupData?.configName}
          onSave={handleUpdatePGName}
        />
      </div>
      <ContainerTile>
        <div className="mt-5 grid grid-cols-3 gap-4 pb-2">
          <InputNumber
            labelName="Percentage from Equated Installments"
            inputName="percentageFromEmi"
            inputValue={productGroupData?.overDuePercentage?.percentageFromEmi}
            onChange={handleInputChange}
            showError={validationError?.percentageFromEmi}
            onFocus={() =>
              dispatch(
                setValidationError({
                  ...validationError,
                  percentageFromEmi: false,
                })
              )
            }
          />
          <InputNumber
            labelName="Finance Hard Limit"
            inputName="hardLimit"
            inputValue={productGroupData?.financeHardLimit?.hardLimit}
            onChange={handleInputChange}
            showError={validationError?.hardLimit}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, hardLimit: false })
              )
            }
          />
          <InputNumber
            labelName="Renew Credit Report"
            inputName="renewInDays"
            inputValue={productGroupData?.renewCreditReport?.renewInDays}
            onChange={handleInputChange}
            showError={validationError?.renewInDays}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, renewInDays: false })
              )
            }
          />
        </div>
        <div className="border-b pb-4 mb-2">
          <TagInput
            formData={productGroupData}
            handleChange={handleTagInputChange}
            inputSelectName={"product"}
            inputSelectLabel={"Add Products"}
            addTag={addTag}
            deleteTag={deleteTag}
            productTypeOptions={productTypeOptions}
            inputNumberName={"limit"}
            inputNumberLabel={"Max Product Limit"}
            showError2={validationError?.limit}
            onFocus2={() =>
              dispatch(
                setValidationError({
                  ...validationError,
                  limit: false,
                })
              )
            }
            showError3={validationError?.product}
            onFocus3={() =>
              dispatch(
                setValidationError({
                  ...validationError,
                  product: false,
                })
              )
            }
          />
        </div>
        <div className="text-center md:text-right mt-5">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName="Save"
            rectangle={true}
            onClick={handleUpdate}
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default ProductGroup;
