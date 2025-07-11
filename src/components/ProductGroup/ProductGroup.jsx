import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import TagInput from "../TagInput/TagInput";
import InputNumber from "../Common/InputNumber/InputNumber";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { toast } from "react-toastify";
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
  validateForm,
  validateUserRole,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { CheckIcon } from "../../assets/icons";

const ProductGroup = () => {
  const dispatch = useDispatch();
  const { productGroupData, productTypeOptions, loading, error } = useSelector(
    (state) => state.productGroup
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchPGroups());
    dispatch(fetchLoanProducts());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(handleChangeDispatch({ name, value }));
    }
  };

  const handleUpdatePGName = async (updatePGName) => {
    dispatch(setFormData({ name: "configName", value: updatePGName }));
    const state = store.getState();
    const productGroupData = state.productGroup.productGroupData;
    await dispatch(updateProductGroup(productGroupData)).unwrap();
    await dispatch(fetchProdGroupData()).unwrap();
  };

  const handleTagInputChange = (e) => {
    const { name, value } = e.target;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(setFormData({ name, value }));
    }
  };

  const addTag = async () => {
    const limit = productGroupData.limit;
    const product = productGroupData.product;
    await dispatch(validateForm(productGroupData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const newTag = { product, limit };
      if (
        productGroupData.tags.some(
          (existingTag) => existingTag.product === newTag.product
        )
      ) {
        toast.warn("This product already exists!");
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
    const dataToValidate = {
      percentageFromEmi,
      hardLimit,
      renewInDays,
    };
    await dispatch(validateForm(dataToValidate));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const isValid2 = validateUserRole(activeLoansCount, dispatch);
    if (!isValid2) {
      toast.warn("Add atleast 1 product");
    }
    if (isValid && isValid2) {
      await dispatch(updateProductGroup(productGroupData)).unwrap();
      await dispatch(fetchProdGroupData()).unwrap();
    }
  };

  return (
    <>
      <DynamicHeader
        itemName={productGroupData?.configName}
        handleNameUpdate={handleUpdatePGName}
        loading={loading}
      />
      <ContainerTile loading={loading} className={"pt-5"}>
        <div className="mt-5 grid grid-cols-3 gap-4 mb-2 px-5">
          <InputNumber
            labelName="Percentage from Equated Installments"
            inputName="percentageFromEmi"
            inputValue={productGroupData?.overDuePercentage?.percentageFromEmi}
            onChange={handleInputChange}
            isValidation={true}
          />
          <InputNumber
            labelName="Hard Limit"
            inputName="hardLimit"
            inputValue={productGroupData?.carbonFinanceHardLimit?.hardLimit}
            onChange={handleInputChange}
            isValidation={true}
          />
          <InputNumber
            labelName="Renew In Days"
            inputName="renewInDays"
            inputValue={productGroupData?.carbonRenewCreditTp?.renewInDays}
            onChange={handleInputChange}
            isValidation={true}
          />
        </div>
        <div className="border-b pb-5 px-5">
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
            isValidation2={true}
            isValidation3={true}
            tagsPerRow={2}
          />
        </div>
        {!hasViewOnlyAccess(roleName) && (
          <div className="text-center md:text-right p-5">
            <Button
              buttonIcon={CheckIcon}
              buttonName="Save"
              onClick={handleUpdate}
            />
          </div>
        )}
      </ContainerTile>
    </>
  );
};

export default ProductGroup;
